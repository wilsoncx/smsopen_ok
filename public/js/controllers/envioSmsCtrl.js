app.controller('enviosmsCtrl', function ($scope, $filter, $http, Data) {
  function carregarClientes(){
    $http.get('api/clientes').success(function (data) {
  					$scope.clientes = data;
  				}).error(function (data, status) {
  					$scope.message = "Aconteceu um problema: " + data;
  				});
  			};

    function carregarGrupos(){
      $http.get('api/grupos').success(function (data) {
        $scope.grupos = data;
      }).error(function (data, status) {
        $scope.message = "Aconteceu um problema: " + data;
      });
    };
        function carregarCli(){
          $scope.pselect=[];
        };
        $scope.adicionarCliente = function (x) {
                $scope.pselect.push({nome: x.title, celular: x.description});
        };

        $scope.adicionarGrupo = function (gx) {
                $scope.pselect.push(gx);
        };

        $scope.scliente = function(z,y){
          for(var i=0;i<z.length;i++) {
          Data.post("msg/"+y+"/"+$scope.pselect[i].celular+"/"+$scope.pselect[i].nome);
            }
        };


        $scope.sgrupo = function(g,h){
          console.log(g);
            for (var o = 0; o < g.length; o++){
              console.log($scope.pselect[o].nome);
              for(var i = 0;i<$scope.pselect[o].cliente.length;i++) {
                Data.post("msg/"+h+"/"+$scope.pselect[o].cliente[i].celular+"/"+$scope.pselect[o].cliente[i].nome);
                }
            }
        };




        carregarClientes();
        carregarGrupos();
        carregarCli();
});
