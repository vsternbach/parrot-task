(function(){
  'use strict';

  angular.module('parrot')
         .service('seriesList', ['$resource', seriesList]);

  function seriesList ($resource) {
    return $resource('data/TV-Shows.txt', {}, {get: {
      isArray: true,
      transformResponse: function (data) {
        return data.split('\r\n');
      }
    }
    })
  }

})();
