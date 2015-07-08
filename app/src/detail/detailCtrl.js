(function(){

  angular
       .module('parrot')
       .controller('detailCtrl', [
          '$sce', 'seriesList', '$resource','$mdSidenav', '$mdBottomSheet', '$log', '$scope',
          detailCtrl
       ]);

  function detailCtrl($sce, seriesList, $resource, $mdSidenav, $mdBottomSheet, $log, $scope) {
      var self = this;

      self.ratings = {
          "ratings": {
              "2015-06-20": 8.8,
              "2015-05-30": 9.3,
              "2015-05-31": 8.1,
              "2015-06-01": 8.7,
              "2015-06-02": 8.6,
              "2015-06-03": 9.2,
              "2015-05-25": 8.7,
              "2015-06-15": 9.7,
              "2015-06-16": 9.8,
              "2015-05-26": 9.5,
              "2015-05-27": 8.5,
              "2015-06-17": 8.6,
              "2015-06-18": 8.9,
              "2015-05-28": 9.7,
              "2015-06-19": 9.0,
              "2015-05-29": 9.0,
              "2015-06-10": 8.1,
              "2015-06-11": 8.4,
              "2015-06-12": 8.2,
              "2015-05-22": 8.6,
              "2015-05-23": 9.5,
              "2015-06-13": 9.7,
              "2015-06-14": 8.4,
              "2015-05-24": 9.2,
              "2015-06-04": 8.2,
              "2015-06-05": 9.8,
              "2015-06-06": 8.4,
              "2015-06-07": 8.2,
              "2015-06-08": 9.5,
              "2015-06-09": 9.2
          },
          "id": "82",
          "title": "Game Of Thrones",
          "country": "US"
      };
      self.show = {
          "id": 341,
          "url": "http://www.tvmaze.com/shows/341/aquarius",
          "name": "Aquarius",
          "type": "Scripted",
          "genres": ["Drama", "Crime"],
          "status": "Running",
          "runtime": 60,
          "premiered": "2015-05-28",
          "rating": {"average": 6},
          "weight": 6,
          "network": {
              "id": 1,
              "name": "NBC",
              "country": {"name": "United States", "code": "US", "timezone": "America/New_York"}
          },
          "webChannel": null,
          "externals": {"tvrage": 41728, "thetvdb": 281537},
          "image": {
              "medium": "http://tvmazecdn.com/uploads/images/medium_portrait/2/5331.jpg",
              "original": "http://tvmazecdn.com/uploads/images/original_untouched/2/5331.jpg"
          },
          "summary": "<p>It's 1967 and the era of free love, drug experimentation and Vietnam is in full effect. When the teenage daughter of a respected lawyer goes missing, LA Police Sergeant Sam Hodiak starts asking around. He soon discovers that the hippie kids he's questioning don't take kindly to cops, especially one with hair as short as his. Needing the help of someone they trust, he partners with rebellious undercover cop Brian Shafe, a man who's more comfortable rolling a joint than patrolling a beat. It's not long before they stumble upon a small-time cult leader seeking out vulnerable women to join his cause. From there, they follow this man's trail down a rabbit hole of drugs, sex, murder and cultural revolution.</p>",
          "_links": {
              "self": {"href": "http://api.tvmaze.com/shows/341"},
              "previousepisode": {"href": "http://api.tvmaze.com/episodes/163710"},
              "nextepisode": {"href": "http://api.tvmaze.com/episodes/163711"}
          },
          "desc": {}
      };
      self.data = [];
      angular.forEach(self.ratings.ratings, function (val, key) {
          var date = key.split('-');
          self.data.push({x: Date.UTC(date[0], date[1] - 1, date[2]), y: val});
      });
      self.data.sort(function (a, b) {
          return a.x - b.x;
      });
      self.chart1Type = 'area';
      $scope.$watch('ctrl.chart1Type', function (val) {
          self.chart1Config.options.chart.type = val;
      });
      self.chart1Config = {
          options: {
              chart: {
                  type: self.chart1Type
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

          series: [{
              data: self.data,
              name: 'Ratings for ' + self.show.name,
              color: '#96C0EE'
          }],
          title: {
              text: null
          },
          //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
          //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
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
              //width: 400,
              height: 200
          },
          func: function (chart) { // on complete
              //var xAxis = chart.xAxis[0],
              //    yAxis = chart.yAxis[0],
              //    top =  170,
              //    height = 22,
              //    options = {
              //        fill: '#F5F8FF'
              //    },
              //    start = 45;
			  //
              //chart.renderer.rect(
              //    start,
              //    top,
              //    xAxis.len-40,
              //    height
              //).attr(options).add();

          }
      };

      self.chart2Config = angular.copy(self.chart1Config);
      self.chart2Config.options.chart.type = 'column';
      self.chart2Config.series[0].color = '#33DFB6';

  }
})();
