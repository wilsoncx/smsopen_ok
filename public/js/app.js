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
  }).
  when('/usuarios', {
    title: 'Usuarios',
    templateUrl: 'templates/usuarios.html',
    controller: 'usuariosCtrl'
  }).
  when('/msg', {
    title: 'Envio de SMS',
    templateUrl: 'templates/envioSms.html',
    controller: 'enviosmsCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });;
}]);
