app.controller('clientesCtrl', function ($scope, $filter, $modal, Data, $http) {
  function carregarClientes(){
    $http.get('api/clientes').success(function (data) {
            $scope.clientes = data;
          }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
          });
        };
    $scope.grupo = {};
    $http.get('api/grupos').then(function(gdata){
        $scope.grupos = gdata.data;
    });
    $scope.changeclienteStatus = function(cliente){
        cliente.status = (cliente.status=="Ativo" ? "Inativo" : "Ativo");
        $http.put("api/clientes/"+cliente.id, cliente);
    };
    $scope.deletecliente = function(cliente){
        if(confirm("Você realmente vai remover o cliente " + cliente.nome)){
            Data.delete("clientes/"+cliente.id).then(function(result){
                $scope.clientes = _.without($scope.clientes, _.findWhere($scope.clientes, {id:cliente.id}));
            });
        }
};
        $scope.sgrupo = function(cliente,grupo){
          confirm("Você vai adicionar um grupo !!");
          Data.post("clientes/"+cliente.id+"/"+grupo.id)
          delete $scope.clientes;
          carregarClientes();
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'templates/clienteEdit.html',
          controller: 'clientesEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.clientes.push(selectedObject);
                $scope.clientes = $filter('orderBy')($scope.clientes, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.nome = selectedObject.nome;
                p.celular = selectedObject.celular;
                p.email = selectedObject.email;
            }
        });
    };


 $scope.columns = [
                    {text:"ID",predicate:"id",sortable:true,dataType:"number"},
                    {text:"None",predicate:"nome",sortable:true},
                    {text:"Celular",predicate:"celular",sortable:true},
                    {text:"E-mail",predicate:"email",sortable:true},
                    {text:"Status",predicate:"status",sortable:true},
                    {text:"Ação",predicate:"",sortable:false}
                ];
carregarClientes();
});


app.controller('clientesEditCtrl', function ($scope, $modalInstance, item, Data, $http) {

  $scope.cliente = angular.copy(item);

        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id > 0) ? 'Editar  Cliente' : 'Adicionar clientes';
        $scope.buttonText = (item.id > 0) ? 'Atualizar Cliente' : 'Salvar Cliente';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.cliente);
        }

        $scope.savecliente = function (cliente) {
            cliente.uid = $scope.uid;
            if(cliente.id > 0){
                Data.put('clientes/'+cliente.id, cliente).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(cliente);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{

                cliente.status = 'Ativo';
                Data.post('clientes', cliente).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(cliente);
                        x.save = 'insert';
                        x.id = result.data;
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }
        };



});
