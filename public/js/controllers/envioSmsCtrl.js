app.controller('envioSmsCtrl', function ($scope, $filter, $modal, Data, $http) {

  $scope.cliente = {};

function carregarCli(){
  $scope.cli=[];
};

function carregarClientes(){
  $http.get('api/clientes').success(function (data) {
					$scope.clientes = data;
				}).error(function (data, status) {
					$scope.message = "Aconteceu um problema: " + data;
				});
			};
function carregarGrupos(){
  $scope.grupo = {};
  $http.get('api/grupos').success(function (data) {
          $scope.grupos = data;
        }).error(function (data, status) {
          $scope.message = "Aconteceu um problema: " + data;
  });
};
  $scope.scliente = function(z){
 console.log(z);
// console.log(z.nome);

   return z;
  //Data.post("msg/"+c.celular+"/"+c.nome)
};
$scope.adicionarCliente = function (gp) {
        console.log(gp);
        $scope.cli.push(gp);
};
carregarClientes();
carregarGrupos();
	carregarCli();

});
