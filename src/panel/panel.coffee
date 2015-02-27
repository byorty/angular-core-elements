angular
    .module('ngCoreElementPanel', [])
    .directive('corePanel', [ ->
        restrict: 'E'
        replace: true
        transclude: true
        templateUrl: '/angular-core-elements/src/panel/panel.html'
    ])
    .directive('corePanelHeader', ['$timeout', '$location', '$rootScope', ($timeout, $location, $rootScope)->
        scope:
            hasSearch: '=?'
            changeUrl: '=?'
            queryName: '@'
            delay: '=?'
            searchEvent: '@'
            placeholder: '@'
        require: '^corePanel'
        restrict: 'E'
        replace: true
        transclude: true
        templateUrl: '/angular-core-elements/src/panel/panel-header.html'
        controller: ($scope) ->
            $scope.form = {}
            $scope.queryName = 'search' unless $scope.queryName?
            $scope.changeUrl = true unless $scope.changeUrl?
            $scope.hasSearch = false unless $scope.hasSearch?
            $scope.delay = 1000 unless $scope.delay?
            $scope.searchEvent = 'panel.header.search' unless $scope.searchEvent?

            promise = null
            $scope.$watch(
                'form.search'
                ->
                    if $scope.form.search?
                        if promise? then $timeout.cancel(promise)
                        promise = $timeout(
                            ->
                                $rootScope.$broadcast($scope.searchEvent, $scope.form.search)
                                $scope.form.search = null if !$scope.form.search.length
                                if $scope.changeUrl
                                    $location.search($scope.queryName, $scope.form.search)
                                    $location.search('page', null)
                            $scope.delay
                        )
                true
            )
    ])