angular
    .module('ngCoreElementDropdown', [])
    .directive('coreDropdown', ['$location', '$rootScope', '$timeout', 'ngCoreDropdown', ($location, $rootScope, $timeout, ngCoreDropdown) ->
        scope:
            items: '='
            selected: '=?'
            name: '@'
            queryName: '@'
            label: '@'
            lblClass: '@'
            selectEvent: '@'
            changeUrl: '=?'
            changeUrlOnStart: '=?'
            wrpClass: '@'
            btnClass: '@'
            hasAny: '=?'
            anyName: '@'
            align: '@'
        restrict: 'E'
        replace: true
        templateUrl: '/angular-core-elements/src/dropdown/dropdown.html'
        controller: ['$scope', '$element', '$attrs', ($scope, $element, $attrs) ->
            ANY_VALUE = '__ANY__'
            $scope.isOpen = false
            $scope.changeUrl = ngCoreDropdown.changeUrl unless $scope.changeUrl?
            $scope.changeUrlOnStart = ngCoreDropdown.changeUrlOnStart unless $scope.changeUrlOnStart?
            $scope.queryName = ngCoreDropdown.queryName unless $scope.queryName?
            $scope.selectEvent = ngCoreDropdown.selectEvent unless $scope.selectEvent?
            $scope.hasAny = ngCoreDropdown.hasAny unless $scope.hasAny?
            $scope.anyName = ngCoreDropdown.anyName unless $scope.anyName?
            $scope.align = ngCoreDropdown.align unless $scope.align?

            $scope.open = ->
                $scope.isOpen = if $scope.isOpen then false else true

            $scope.select = (item) ->
                $scope.isOpen = false
                $scope.selected = item
                $rootScope.$broadcast($scope.selectEvent, $scope.selected)
                $location.search($scope.queryName, $scope.selected.id) if $scope.changeUrl is true and $scope.changeUrlOnStart is true and item.id isnt ANY_VALUE
                $location.search($scope.queryName, null) if $scope.changeUrl is true and $scope.changeUrlOnStart is true and item.id is ANY_VALUE

            $scope.selectById = (id) ->
                for i, item of $scope.items
                    $scope.select(item) if item.id is id

            $scope.$watch(
                'items'
                (newItems, oldItems) -> updateItems() if newItems isnt oldItems
            )

            $scope.$watch(
                'selected'
                (newSelected, oldSelected) ->
                    $scope.select($scope.selected) if newSelected isnt oldSelected and $scope.selected
                true
            )

            $scope.$on(
                'body.click',
                (event, args) ->
                    if $scope.isOpen and !$element[0].contains(args.target)
                        $scope.isOpen = false

            )

            hasItems = -> $scope.items?

            selectDefault = ->
                search = $location.search()
                if $scope.selected?
                    $scope.select($scope.selected)
                else if $scope.queryName? and search[$scope.queryName]?
                    $scope.selectById(parseInt(search[$scope.queryName]))
                else unless $attrs.selected?
                    $scope.select($scope.items[0])
                $scope.changeUrlOnStart = true if hasItems()

            updateItems = ->
                if $scope.hasAny
                    $timeout( ->
                        $scope.items.unshift(
                            id: ANY_VALUE
                            name: $scope.anyName
                        )
                        selectDefault()
                    )
                else selectDefault()

            updateItems() if hasItems()
        ]
    ])
    .provider('ngCoreDropdown', ->
        @changeUrl = false
        @changeUrlOnStart = false
        @queryName = 'dropdown'
        @selectEvent = 'dropdown.select'
        @hasAny = false
        @anyName = 'Любой'
        @align = 'left'
        @$get = =>
            changeUrl: @changeUrl
            changeUrlOnStart: @changeUrlOnStart
            queryName: @queryName
            selectEvent: @selectEvent
            hasAny: @hasAny
            anyName: @anyName
            align: @align
        return
    )