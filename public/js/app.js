var app = angular.module('openApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate', 'angucomplete']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      title: 'clientes',
      templateUrl: 'templates/clientes.html',
      controller: 'clientesCtrl'
    }).
     when('/grupos', {
          title: 'grupos',
          templateUrl: 'templates/grupos.html',
          controller: 'gruposCtrl'
        })
    .otherwise({
      redirectTo: '/'
    });;
}]);
