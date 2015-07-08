(function(){

  angular
       .module('parrot')
       .controller('listCtrl', ['$sce', 'seriesList', '$resource', '$log', listCtrl]);

  function listCtrl($sce, seriesList, $resource, $log) {
      var self = this;

      self.shows = [];
      self.selected = null;
      seriesList.get().$promise.then(function(shows){
          angular.forEach(shows, function (show) {
              $resource('http://api.tvmaze.com/singlesearch/shows?q='+show).get().$promise.then(function(data){
                  data.desc = $sce.trustAsHtml(data.summary);
                  self.shows.push(data);
              })
          })
      });
      self.simulateQuery = false;
      self.isDisabled = false;
      self.selectedItem = null;
      self.querySearch = querySearch;
      self.selectedItemChange = selectedItemChange;
      self.searchTextChange = searchTextChange;

      // ******************************
      // Internal methods
      // ******************************

      function querySearch(query) {
          return query ? self.shows.filter(createFilterFor(query)) : self.shows;
      }

      function searchTextChange(text) {
          $log.info('Text changed to ' + text);
      }

      function selectedItemChange(item) {
          $log.info('Item changed to ' + JSON.stringify(item));
      }


      /**
       * Create filter function for a query string
       */
      function createFilterFor(query) {
          var lowercaseQuery = angular.lowercase(query);

          return function filterFn(show) {
              return (show.name.toLowerCase().indexOf(lowercaseQuery) === 0);
          };

      }
  }
})();
