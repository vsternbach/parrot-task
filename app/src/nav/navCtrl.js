(function(){

  angular
       .module('parrot')
       .controller('navCtrl', ['$scope', navCtrl]);

  function navCtrl($scope) {
      var self = this;
        self.title = 'Tv Shows';
  }
})();
