app.controller('testeCtrl', function ($scope, $filter, $http, Data) {
  function carregarClientes(){
    $http.get('api/clientes').success(function (data) {
  					$scope.clientes = data;
  				}).error(function (data, status) {
  					$scope.message = "Aconteceu um problema: " + data;
  				});
  			};

        function carregarCli(){
          $scope.pselect=[];

        };
        $scope.adicionarCliente = function (x) {
                console.log(x);
                $scope.pselect.push({nome: x.title, celular: x.description});
                console.log($scope.pselect);

        };

        $scope.scliente = function(z){
          for(var i=0;i<z.length;i++) {
            console.log($scope.pselect[i].celular);
            console.log($scope.pselect[i].nome);
          //  Data.post("msg/"+$scope.pselect[i].celular+"/"+$scope.pselect[i].nome)
            }

        };
        //autocomplete
        $scope.pesquisar = function(pesquisa){

        		// Se a pesquisa for vazia
        		if (pesquisa == ""){

        			// Retira o autocomplete
        			$scope.completing = false;

        		}else{

        			// Pesquisa no banco via AJAX
        			$http.get('api/clientes', { "data" : pesquisa}).
        	        success(function(data) {

        				// Coloca o autocomplemento
        				$scope.completing = true;

        				// JSON retornado do banco
        				$scope.pessoas = data;
        	        })
        	        .error(function(data) {
        				// Se deu algum erro, mostro no log do console
        				console.log("Ocorreu um erro no banco de dados ao trazer auto-ajuda da home");
        	        });
        		}
        	};

        //----------
        carregarClientes();
carregarCli();
});
