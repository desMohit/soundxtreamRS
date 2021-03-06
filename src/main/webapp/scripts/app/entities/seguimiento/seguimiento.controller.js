'use strict';

angular.module('soundxtreamappApp')
    .controller('SeguimientoController', function ($scope, $state, Seguimiento, SeguimientoSearch, ParseLinks) {

        $scope.seguimientos = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 0;
        $scope.loadAll = function() {
            Seguimiento.query({page: $scope.page, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                for (var i = 0; i < result.length; i++) {
                    $scope.seguimientos.push(result[i]);
                }
            });
        };
        $scope.reset = function() {
            $scope.page = 0;
            $scope.seguimientos = [];
            $scope.loadAll();
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            SeguimientoSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.seguimientos = result;
            }, function(response) {
                if(response.status === 404) {
                    $scope.loadAll();
                }
            });
        };

        $scope.refresh = function () {
            $scope.reset();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.seguimiento = {
                fecha: null,
                siguiendo: null,
                id: null
            };
        };
    });
