(function(){

  angular
       .module('parrot')
       .controller('detailCtrl', ['$scope', '$state', 'dataResource', detailCtrl]);

  function detailCtrl($scope, $state, dataResource) {
      var self = this,
          show = $state.params.show.replace(/-/g, ' ');

      var chartConfig = {
          options: {
              chart: {
              },
              legend: {
                  enabled: false
              },
              tooltip: {
                  style: {
                      padding: 10,
                      fontWeight: 'bold'
                  }
              }
          },
          series: [{}],
          title: {
              text: null
          },
          yAxis: {
              title: {text: null},
              gridLineColor: 'transparent',
              tickLength: 1,
              currentMin: 0,
              currentMax: 10
          },
          xAxis: {
              title: {text: null},
              type: 'datetime',
              labels: {
                  formatter: function () {
                      return Highcharts.dateFormat('%a %e/%m', this.value);
                  }
              },
              lineWidth: 0,
              minorGridLineWidth: 0,
              lineColor: 'transparent',
              minorTickLength: 0,
              tickLength: 0

          },
          size: {
              height: 200
          },
          func: function (chart) { // on complete
          }
      };

      self.chart1Type = 'area';
      self.chart2Type = 'column';
      self.chartPeriod = 30;

      self.show = dataResource.showInfo.get({show: show});
      self.show.$promise.then(function (show) {
          dataResource.showInfoExtended.get({id: show.id}).$promise.then(function(data) {
              self.show.seasons = data._embedded.episodes.pop().season;
              self.show.episodes = data._embedded.episodes.length;
          });
      });

      self.chart1Config = angular.copy(chartConfig);
      self.chart1Config.options.chart.type = self.chart1Type;
      self.chart1Config.series[0] = {
          color: '#96C0EE',
          data: null,
          name: 'Rating Timeseries for ' + self.show.name,
          marker: {
              states: {
                  hover: {
                      enabled: true
                  }
              },
              symbol: 'url(http://highcharts.com/demo/gfx/sun.png)'
          }
      };

      self.chart2Config = angular.copy(chartConfig);
      self.chart2Config.options.chart.type = self.chart2Type;
      self.chart2Config.series[0] = {
          color: '#33DFB6',
          data: null,
          name: 'Rating Average for ' + self.show.name
      };

      getRatings(self.chartPeriod);

      $scope.$watch('ctrl.chart1Type', function (val) {
          self.chart1Config.options.chart.type = val;
      });

      $scope.$watch('ctrl.chart2Type', function (val) {
          self.chart2Config.options.chart.type = val;
      });

      $scope.$watch('ctrl.chartPeriod', function (val) {
          getRatings(val)
      });

      function getRatings(period) {
          dataResource.showRatings.get({show: show, period: period}).$promise.then(function(data) {
              self.chart1Config.series[0].data = data;
              self.chart2Config.series[0].data = data;
          })
      }
  }
})();
