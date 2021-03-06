(function() {
    'use strict';

    angular
        .module('appgetewayApp')
        .controller('Tbc_frases_opcoesController', Tbc_frases_opcoesController);

    Tbc_frases_opcoesController.$inject = ['$scope', '$state', 'Tbc_frases_opcoes', 'Tbc_frases_opcoesSearch', 'ParseLinks', 'AlertService', 'paginationConstants', 'pagingParams','Tbc_frases'];

    function Tbc_frases_opcoesController ($scope, $state, Tbc_frases_opcoes, Tbc_frases_opcoesSearch, ParseLinks, AlertService, paginationConstants, pagingParams,Tbc_frases) {
        var vm = this;
        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.transition = transition;
        vm.itemsPerPage = paginationConstants.itemsPerPage;
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;
        vm.searchQuery = pagingParams.search;
        vm.currentSearch = pagingParams.search;
        vm.idFrase = pagingParams.idfrases;
        vm.Frases = Tbc_frases.get({id: pagingParams.idfrases})

        loadAll();
        function loadAll () {
            if (pagingParams.search) {
                Tbc_frases_opcoesSearch.query({
                    query: pagingParams.search,
                    page: pagingParams.page - 1,
                    size: vm.itemsPerPage,
                    sort: sort(),
                    idFrase: pagingParams.idfrases
                }, onSuccess, onError);
            } else {
                Tbc_frases_opcoes.query({
                    page: pagingParams.page - 1,
                    size: vm.itemsPerPage,
                    sort: sort(),
                    idFrase: pagingParams.idfrases
                }, onSuccess, onError);
            }
            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }
            function onSuccess(data, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                vm.tbc_frases_opcoes = data;
                vm.page = pagingParams.page;
                vm.idFrase = pagingParams.idfrases;
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

        function loadPage(page) {
            vm.page = page;
            vm.transition();
        }

        function transition() {

            $state.transitionTo($state.$current, {
                page: vm.page,
                sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                search: vm.currentSearch,
                idFrase: vm.idFrase
            });
        }

        function search(searchQuery) {
            if (!searchQuery){
                return vm.clear();
            }
            vm.links = null;
            vm.page = 1;
            vm.predicate = 'nome';
            vm.reverse = false;
            vm.currentSearch = searchQuery;
            vm.transition();
        }

        function clear() {
            vm.links = null;
            vm.page = 1;
            vm.predicate = 'id';
            vm.reverse = true;
            vm.currentSearch = null;
            vm.transition();
        }
    }
})();
