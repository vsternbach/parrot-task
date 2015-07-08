(function(){

  angular
       .module('parrot')
       .controller('listCtrl', ['dataResource', listCtrl]);

  function listCtrl(dataResource) {
      var self = this;

      self.itemsPerPage = 10;
      self.currentPage = 0;

      self.shows = [];
      self.selectedItem = null;
      self.querySearch = querySearch;
      self.searchTextChange = searchTextChange;
      self.selectedItemChange = selectedItemChange;

      dataResource.shows.get().$promise.then(function(shows){
          self.totalPages = Math.ceil(shows.length/self.itemsPerPage) - 1;
          self.pageRange = Array.apply(null, {length: self.totalPages + 1}).map(Number.call, Number);

          angular.forEach(shows, function (show) {
              dataResource.showInfo.get({show: show}).$promise.then(function(data){
                  self.shows.push(data);
              })
          })
      });

      // ******************************
      // Pagination methods
      // ******************************

      self.prevPage = function() {
          if (self.currentPage > 0) {
              self.currentPage--;
          }
      };

      self.nextPage = function() {
          if (self.currentPage < self.totalPages) {
              self.currentPage++;
          }
      };

      // ******************************
      // Internal methods
      // ******************************

      function querySearch(query) {
          return query ? self.shows.filter(createFilterFor(query)) : self.shows;
      }

      function selectedItemChange(item) {
          self.filter = item ? {name: item.name} : null;
          self.currentPage = 0;
      }

      function searchTextChange(text) {
          //$log.info('Text changed to ' + text);
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
