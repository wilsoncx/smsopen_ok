app.controller('usuariosCtrl', function ($scope, $filter, $modal, Data, $http) {
    $scope.usuario = {};
    $http.get('api/usuarios').then(function(data){
        $scope.usuarios = data.data;
    });

    $scope.grupo = {};
    $http.get('api/grupos').then(function(gdata){
        $scope.grupos = gdata.data;
    });
    $scope.changeusuarioStatus = function(usuario){
        usuario.status = (usuario.status=="Ativo" ? "Inativo" : "Ativo");
        $http.put("api/usuarios/"+usuario.id, usuario);
    };
    $scope.deleteusuario = function(usuario){
        if(confirm("Vocï¿½ realmente vai remover o usuario " + usuario.nome)){
            Data.delete("usuarios/"+usuario.id).then(function(result){
                $scope.usuarios = _.without($scope.usuarios, _.findWhere($scope.usuarios, {id:usuario.id}));
            });
        }
};
        $scope.sgrupo = function(usuario,grupo){
          Data.post("usuarios/"+usuario.id+"/"+grupo.id)
          $scope.usuario.grupo.push(grupo);
          confirm("Vocï¿½ vai adicionar um grupo !!");

    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'templates/usuarioEdit.html',
          controller: 'usuariosEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.usuarios.push(selectedObject);
                $scope.usuarios = $filter('orderBy')($scope.usuarios, 'id', 'reverse');
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
                    {text:"E-mail",predicate:"email",sortable:true},
                    {text:"Fone",predicate:"fone",sortable:true},
                    {text:"Empresa",predicate:"empresa",sortable:true},
                    {text:"Status",predicate:"status",sortable:true},
                    {text:"Ação",predicate:"",sortable:false}
                ];

});


app.controller('usuariosEditCtrl', function ($scope, $modalInstance, item, Data, $http) {

  $scope.usuario = angular.copy(item);

        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id > 0) ? 'Editar  usuario' : 'Adicionar usuarios';
        $scope.buttonText = (item.id > 0) ? 'Atualizar usuario' : 'Salvar usuario';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.usuario);
        }

        $scope.saveusuario = function (usuario) {
            usuario.uid = $scope.uid;
            if(usuario.id > 0){
                Data.put('usuarios/'+usuario.id, usuario).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(usuario);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{

                usuario.status = 'Ativo';
                Data.post('usuarios', usuario).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(usuario);
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
