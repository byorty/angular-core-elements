angular
    .module('ngCoreElementNav', [])
    .directive('coreNavbar', ['$rootScope', '$location', 'ngCoreNavbar', ($rootScope, $location, ngCoreNavbar) ->
        scope:
            items: '='
            subRoutesChangeEvent: '@'
        restrict: 'E'
        replace: true
        templateUrl: '/angular-core-elements/src/nav/navbar.html'
        controller: ['$scope', ($scope) ->
            throw new Error('items should be defined') unless $scope.items?
            $scope.subRoutesChangeEvent = ngCoreNavbar.subRoutesChangeEvent unless $scope.subRoutesChangeEvent?

            $scope.$on('$routeChangeStart', ->
                regexp = new RegExp("^#{$location.protocol()}:#{$location.host()}//#{$location.path()}")
                for i in [0..$scope.items.length]
                    if $scope.items[i].link? and regexp.test($scope.items[i].link)
                        $scope.items[i].active = true
                        $rootScope.$broadcast(
                            $scope.subRoutesChangeEvent,
                            $scope.items[i].subitems
                        ) if $scope.items[i].subitems? and $scope.items[i].subitems.length
                    else
                        $scope.items[i].active = false
            )
        ]
    ])
    .provider('ngCoreNavbar', ->
        @subRoutesChangeEvent = 'sub.items.change.event'
        @$get = =>
            subRoutesChangeEvent: @subRoutesChangeEvent
        return
    )
    .directive('coreSubNav', ['ngCoreNavbar', (ngCoreNavbar) ->
        scope:
            subRoutesChangeEvent: '@'
        restrict: 'E'
        replace: true
        templateUrl: '/angular-core-elements/src/nav/nav.html'
        controller: ['$scope', ($scope) ->
            $scope.items = null
            $scope.subRoutesChangeEvent = ngCoreNavbar.subRoutesChangeEvent unless $scope.subRoutesChangeEvent?

            $scope.$on($scope.subRoutesChangeEvent, (_, items) ->
                $scope.items = items
            )
            $scope.$on('$routeChangeStart', ->
                regexp = new RegExp("^#{$location.protocol()}:#{$location.host()}//#{$location.path()}")
                for i in [0..$scope.items.length]
                    if $scope.items[i].link? and regexp.test($scope.items[i].link)
                        $scope.items[i].active = true
                    else
                        $scope.items[i].active = false
            )
        ]
    ])