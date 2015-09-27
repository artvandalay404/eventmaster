var app = angular.module('events', []);

app.controller('MainCtrl', ['$scope',
	function($scope){
		$scope.test = 'Hello World!';
		$scope.posts = [
			 'post1',
			 'post2',
			 'post3',
			 'post4',
			 'post5'
		];

}]);

