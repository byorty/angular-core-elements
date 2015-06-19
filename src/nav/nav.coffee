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
        templateUrl: '/angular-core-elements/src/nav/subrouting-nav.html'
        controller: ['$scope', ($scope) ->
            $scope.items = null
            $scope.subRoutesChangeEvent = ngCoreNavbar.subRoutesChangeEvent unless $scope.subRoutesChangeEvent?

            $scope.$on($scope.subRoutesChangeEvent, (_, items) ->
                $scope.items = items
            )
        ]
    ])
    .directive('coreContentTabs', ['$compile', '$rootScope', 'ngCoreContentTabs', ($compile, $rootScope, ngCoreContentTabs) ->
        scope:
            class: '@'
        restrict: 'E'
        replace: true
        transclude: true
        templateUrl: '/angular-core-elements/src/nav/content-nav.html'
        controller: ['$scope', '$element', ($scope, $element) ->
            content = angular.element($element[0].querySelector('.content'))
            $scope.items = []
            $scope.class = ngCoreContentTabs.defaultClass unless $scope.class

            $scope.select = (item) ->
                content.empty().append(item.content)
                $compile(content.contents())($scope.$parent)

                for i in [0..$scope.items.length - 1]
                    $scope.items[i].active = if item.id is $scope.items[i].id then true else false

                $rootScope.$broadcast(
                    ngCoreContentTabs.activateEvent
                    item
                )

            @add = (name, active, content) ->
                item =
                    id: $scope.items.length + 1
                    name: name
                    active: active
                    content: content

                $scope.items.push(item)
                $scope.select(item) if active
        ]
    ])
    .provider('ngCoreContentTabs', ->
        @defaultClass = 'nav-tabs'
        @activateEvent = 'content.tabs.activate.event'
        @$get = =>
            activateEvent: @activateEvent
            defaultClass: @defaultClass
        return
    )
    .directive('coreContentTab', [ ->
        scope:
            name: '@'
            active: '=?'
        restrict: 'E'
        require: '^coreContentTabs'
        link: ($scope, $element, $attrs, $ctrl) ->
            throw new Error('name should be defined') unless $scope.name?
            $scope.active = false unless $scope.active?
            $ctrl.add($scope.name, $scope.active, $element.html())
            $element.remove()
    ])