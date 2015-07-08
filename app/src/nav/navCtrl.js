(function(){

  angular
       .module('parrot')
       .controller('navCtrl', ['$scope', navCtrl]);

  function navCtrl($scope) {
      var self = this;
        self.title = 'Tv Shows';
      self.back = false;

      $scope.$on('$stateChangeSuccess', function (evt, toState, toParams, fromState, fromParams) {
          if (toParams.show) {
              self.title = toParams.show.replace(/-/g, ' ');
              self.back = true;
          }
          else {
              self.title = 'TV Shows';
              self.back = false;
          }
          
      });
  }
})();
