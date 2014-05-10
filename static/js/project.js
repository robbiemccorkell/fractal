angular.module('todo', ['ngRoute', 'firebase'])

.value('fbURL', 'https://fractal.firebaseio.com/')

.factory('Todos', function($firebase, fbURL) {
	return $firebase(new Firebase(fbURL));
})

.config(function($routeProvider) {
	$routeProvider
	.when('/fractal', {
		controller:'TodoCtrl',
		templateUrl:'view/list.html'
	})
	.otherwise({
		redirectTo:'/fractal'
	});
})

.controller('ListCtrl', function($scope, Projects) {
	$scope.projects = Projects;
})

.controller('TodoCtrl', function ($scope, $location, $timeout, Todos) {
	$scope.todos = Todos;
	
	$scope.addTodo = function() {
		$scope.todo.done = false;
		$scope.todos.$add($scope.todo, function() {
			$timeout(function() { $location.path('/'); });
		});
	};

	$scope.remaining = function() {
		var count = 0;
		angular.forEach($scope.todos, function(todo) {
			count += todo.done ? 0 : 1;
		});
		return count;
	};

	$scope.archive = function() {
		var oldTodos = $scope.todos;
		$scope.todos = [];
		angular.forEach(oldTodos, function(todo) {
			if (!todo.done) $scope.todos.push(todo);
		});
	};
})