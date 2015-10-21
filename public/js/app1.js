app = new angular.module('app',['ngRoute' , 'ngResource', 'ui.bootstrap', 'ngAnimate' ]);

app.config(['$routeProvider',function($routeProvider){
  $routeProvider.
  when('/',{controller:'clientesCtrl',
  templateUrl:'templates/clientes.html'}).
  when('/usuarios',{controller:'userController',
  templateUrl:'templates/user.html'}).
  when('/cliente',
  {controller:'clientesCtrl',
  templateUrl:'templates/clientes.html'
})
.when('/cliente/novo',{controller:'addclienteController',
  templateUrl:'templates/addCliente.html'})
  .when('/cliente/:id',{
  controller:'editClienteController',
  templateUrl:'templates/editCliente.html'
}).
  when('/grupos',{controller:'grupoController',
  templateUrl:'templates/grupo.html'}).
  when('/mensagens',{controller:'mensagemController',
  templateUrl:'templates/grupo.html'}).
  when('/grupo_usuarios',{controller:'grupo_usuarioController',
  templateUrl:'templates/grupo_usuario.html'}).
  when('/login',{controller:'loginController',
  templateUrl:'templates/login.html'}).
  otherwise({redirectTo:'/'});
}]);
app.controller('mainController',function ($scope) {
  $scope.userName="Open";
});
