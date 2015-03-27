angular
    .module('ngCoreElementAutocomplete', [])
    .directive('coreAutocomplete', ['$service', '$timeout', '$location', 'ngCoreAutocomplete', ($service, $timeout, $location, ngCoreAutocomplete) ->
        scope:
            service: '@'
            params: '=?'
            changeUrl: '=?'
            queryName: '@'
            paramName: '@'
            value: '=?'
            label: '@'
            lblClass: '@'
            wrpClass: '@'
            placeholder: '@'
            delay: '=?'
        restrict: 'E'
        replace: true
        templateUrl: '/angular-core-elements/src/autocomplete/autocomplete.html'
        controller: ['$scope', '$element', ($scope, $element) ->
            throw new Error('service should be defined') unless $scope.service?
            $scope.params = ngCoreAutocomplete.params unless $scope.params?
            $scope.changeUrl = ngCoreAutocomplete.changeUrl unless $scope.changeUrl?
            $scope.queryName = ngCoreAutocomplete.queryName unless $scope.queryName?
            $scope.paramName = ngCoreAutocomplete.paramName unless $scope.paramName?
            $scope.delay = ngCoreAutocomplete.delay unless $scope.delay?
#            $scope.search = if $scope.value? then $scope.value else null
#            $scope.search = $scope.value
            $scope.isOpen = false
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
                                    if $scope.search?.length
                                        $scope.params[$scope.paramName] = $scope.search
                                        $service.getByPath($scope.service)($scope.params, (resp) ->
                                            if resp.success && resp.items && resp.items.length
                                                $scope.items = resp.items

                                            $scope.isOpen = true
                                        )
                                    else
                                        $scope.isOpen = false
                                        $location.search($scope.queryName, null) if $scope.changeUrl

                                $scope.delay
                            )
            )
            $scope.$watch(
                'value'
                ->
                    isSelect = true
                    $scope.search = $scope.value
            )

            $scope.$on(
                'body.click',
                (event, args) ->
                    if $scope.isOpen and !$element[0].contains(args.target)
                        $scope.isOpen = false

            )

            $scope.onSearch = (search) -> $scope.search = search
            $scope.onSelect = (item) ->
                isSelect = true
                $scope.isOpen = false
                $scope.search = item.name
                $location.search($scope.queryName, item.id) if $scope.changeUrl
        ]
    ])
    .provider('ngCoreAutocomplete', ->
        @params = {}
        @changeUrl = false
        @queryName = 'query'
        @paramName = 'query'
        @delay = 1000
        @$get = =>
            params: @params
            changeUrl: @changeUrl
            queryName: @queryName
            paramName: @paramName
            delay: @delay
        return
    )