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
                url = "#{$location.protocol()}://#{$location.host()}#{$location.path()}/"
                for i in [0..$scope.items.length - 1]
                    isActive = $scope.items[i].link? and new RegExp("^#{$scope.items[i].link}").test(url)
                    if $scope.items[i].subroutes?.length
                        for j in [0..$scope.items[i].subroutes.length - 1]
                            $scope.items[i].subroutes[j].active = new RegExp("^#{$scope.items[i].subroutes[j].link}").test(url)
                            isActive = true if $scope.items[i].subroutes[j].active and !isActive

                    $scope.items[i].active = isActive
                    if $scope.items[i].active
                        $scope.items[i].active = true
                        $rootScope.$broadcast(
                            $scope.subRoutesChangeEvent,
                            $scope.items[i].subroutes
                        )
            )
        ]
    ])
    .provider('ngCoreNavbar', ->
        @subRoutesChangeEvent = 'sub.items.change.event'
        @$get = =>
            subRoutesChangeEvent: @subRoutesChangeEvent
        return
    )
    .directive('coreSubNav', ['$location', 'ngCoreNavbar', ($location, ngCoreNavbar) ->
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
        ]
    ])