(function(){
  'use strict';

  angular.module('parrot')
         .service('dataResource', ['$resource', '$sce', dataResource]);

  function dataResource ($resource, $sce) {
    return {
      shows: $resource('data/TV-Shows.txt', {}, {get: {
          cache: true,
          isArray: true,
          transformResponse: function (data) {
            return data.split('\r\n');
          }
        }
      }),
      showInfo: $resource('http://api.tvmaze.com/singlesearch/shows?q=:show', {}, {get: {
          cache: true,
          transformResponse: function (data) {
            data = angular.fromJson(data);
            data.desc = $sce.trustAsHtml(data.summary);
            data.formattedName = data.name.replace(/\s/g, '-');
            return data;
          }
        }
      }),
      showInfoExtended: $resource('http://api.tvmaze.com/shows/:id?embed[]=episodes&embed[]=cast', {}, {get: {
          cache: true,
          transformResponse: function (data) {
            data = angular.fromJson(data);
            data.desc = $sce.trustAsHtml(data.summary);
            data.formattedName = data.name.replace(/\s/g, '-');
            return data;
          }
        }
      }),
      showRatings: $resource('http://api.parrotanalytics.com/ratings?key=h0y3PiuUHytcS1p6mTO8&title=:show&period=:period', {}, {get: {
          cache: true,
          isArray: true,
          transformResponse: function (data) {
            data = angular.fromJson(data);
            var formattedData = [];
            angular.forEach(data.ratings, function (val, key) {
              var date = key.split('-');
              formattedData.push({x: Date.UTC(date[0], date[1] - 1, date[2]), y: val});
            });
            formattedData.sort(function (a, b) {
              return a.x - b.x;
            });
            return formattedData;
          }
        }
      })
    }
  }

})();
