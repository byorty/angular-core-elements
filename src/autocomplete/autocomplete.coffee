angular
    .module('ngCoreElementAutocomplete', [])
    .directive('coreAutocomplete', ['$service', '$timeout', '$location', ($service, $timeout, $location) ->
        scope:
            service: '@'
            params: '=?'
            changeUrl: '=?'
            queryName: '@'
            paramName: '@'
            label: '@'
            lblClass: '@'
            wrpClass: '@'
            placeholder: '@'
            delay: '=?'
        restrict: 'E'
        replace: true
        templateUrl: '/angular-core-elements/src/autocomplete/autocomplete.html'
        controller: ['$scope', ($scope) ->
            throw new Error('service should be defined') unless $scope.service?
            $scope.params = {} unless $scope.params?
            $scope.changeUrl = false unless $scope.changeUrl?
            $scope.queryName = 'query' unless $scope.queryName?
            $scope.paramName = 'query' unless $scope.paramName?
            $scope.delay = 1000 unless $scope.delay?
            $scope.isOpen = false
            $scope.search = null
            $scope.items = null
            isSelect = false

            promise = null
            $scope.$watch(
                'search'
                ->
                    if isSelect
                        isSelect = false
                    else
                        if $scope.search?
                            if promise? then $timeout.cancel(promise)
                            promise = $timeout(
                                ->
                                    $scope.params[$scope.paramName] = $scope.search
                                    $service.getByPath($scope.service)($scope.params, (resp) ->
                                        if resp.success && resp.items && resp.items.length
                                            $scope.items = resp.items

                                        $scope.isOpen = true
                                    )
                                $scope.delay
                            )
            )

            $scope.onSearch = (search) -> $scope.search = search
            $scope.onSelect = (item) ->
                isSelect = true
                $scope.isOpen = false
                $scope.search = item.name
                $location.search($scope.queryName, item.id) if $scope.changeUrl
        ]
    ])