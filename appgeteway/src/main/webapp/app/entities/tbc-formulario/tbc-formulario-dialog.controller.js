(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .controller('Tbc_formularioDialogController', Tbc_formularioDialogController);

    Tbc_formularioDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Tbc_formulario', 'Tbc_instituicao', 'Tbc_sub_grupo', 'Tbc_tipo_cadastro','Tbc_status'];

    function Tbc_formularioDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Tbc_formulario, Tbc_instituicao, Tbc_sub_grupo, Tbc_tipo_cadastro, Tbc_status) {
        var vm = this;

        vm.tbc_formulario = entity;
        vm.clear = clear;
        vm.save = save;
        vm.tbc_instituicaos = Tbc_instituicao.query();
        vm.tbc_sub_grupos = Tbc_sub_grupo.query();
        vm.tbc_tipo_cadastros = Tbc_tipo_cadastro.query();
        vm.tbc_statuses = Tbc_status.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.tbc_formulario.id !== null) {
                Tbc_formulario.update(vm.tbc_formulario, onSaveSuccess, onSaveError);
            } else {
                Tbc_formulario.save(vm.tbc_formulario, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('appgetewayApp:tbc_formularioUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

    }
})();
