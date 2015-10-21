app.controller('gruposCtrl', function ($scope, $filter, $modal, Data, $http) {
    $scope.grupo = {};
    $http.get('api/grupos').then(function(data){
        $scope.grupos = data.data;
    });
    $scope.cliente = {};
    $http.get('api/clientes').then(function(cdata){
        $scope.cliente = cdata.data;
    });
    $scope.changegrupoStatus = function(grupo){
        grupo.status = (grupo.status=="Ativo" ? "Inativo" : "Ativo");
        $http.put("api/grupos/"+grupo.id, grupo);
    };
    $scope.deletegrupo = function(grupo){
        if(confirm("Você realmente vai remover o grupo " + grupo.nome)){
            Data.delete("grupos/"+grupo.id).then(function(result){
                $scope.grupos = _.without($scope.grupos, _.findWhere($scope.grupos, {id:grupo.id}));
            });
        }
    };
    $scope.scliente = function(grupo,cl){
      if(confirm("Você vai adicionar o cliente " + cl.originalObject.nome +   " ao grupo " + grupo.nome)){
        Data.post("grupos/"+grupo.id+"/"+cl.originalObject.id)
      };

  };
  $scope.rmCliente = function(grupo, c){
      if(confirm("Você realmente vai remover o cliente " + c.nome + " do grupo " + grupo.nome)){
          Data.delete("grupos/"+grupo.id+"/"+c.id).then(function(result){
              $scope.grupos.cliente = _.without($scope.grupos.cliente, _.findWhere($scope.grupos.cliente, {id:c.id}));
          });
      }
  };

    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'templates/grupoEdit.html',
          controller: 'gruposEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.grupos.push(selectedObject);
                $scope.grupos = $filter('orderBy')($scope.grupos, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.nome = selectedObject.nome;
            }
        });
    };


 $scope.columns = [
                    {text:"ID",predicate:"id",sortable:true,dataType:"number"},
                    {text:"None",predicate:"nome",sortable:true},
                    {text:"Status",predicate:"status",sortable:true},
                    {text:"Ação",predicate:"",sortable:false}
                ];

});



app.controller('gruposEditCtrl', function ($scope, $modalInstance, item, Data, $http) {

  $scope.grupo = angular.copy(item);

        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id > 0) ? 'Editar  grupo' : 'Adicionar grupos';
        $scope.buttonText = (item.id > 0) ? 'Atualizar grupo' : 'Salvar grupo';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.grupo);
        }

        $scope.savegrupo = function (grupo) {


            grupo.uid = $scope.uid;
            if(grupo.id > 0){
                Data.put('grupos/'+grupo.id, grupo).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(grupo);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{

                grupo.status = 'Ativo';
                Data.post('grupos', grupo).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(grupo);
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
