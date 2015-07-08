angular.module('parrot', ['ngMaterial', 'ui.router', 'ngResource', 'highcharts-ng'])
	.config(function($mdThemingProvider, $stateProvider){

		$mdThemingProvider.theme('default')
			.primaryPalette('blue-grey')
			.accentPalette('red');

		$stateProvider
			.state('parrot', {
				url: '/',
				abstract: true,
				templateUrl: 'src/nav/nav.html',
				controller: 'navCtrl',
				controllerAs: 'ctrl'
			})
			.state('list', {
				parent: 'parrot',
				url: 'shows',
				controller: 'listCtrl',
				controllerAs: 'ctrl',
				templateUrl: 'src/list/list.html'
			})
			.state('detail', {
				parent: 'parrot',
				url: 'shows/:show',
				controller: 'detailCtrl',
				controllerAs: 'ctrl',
				templateUrl: 'src/detail/detail.html'
			})

	})
	.filter('offset', function() {
		return function(input, start) {
			start = parseInt(start, 10);
			return input.slice(start);
		};
	});