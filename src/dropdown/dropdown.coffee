angular
    .module('ngCoreElementDropdown')
    .directive('coreDropdown', ['$location', '$rootScope', '$timeout', ($location, $rootScope, $timeout) ->
        scope:
            items: '='
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
        controller: ($scope) ->
            ANY_VALUE = '__ANY__'
            throw new Error('items should be defined') unless $scope.items?
            $scope.selectedItem = null
            $scope.isOpen = false
            $scope.changeUrl = false unless $scope.changeUrl?
            $scope.changeUrlOnStart = false unless $scope.changeUrlOnStart?
            $scope.queryName = 'dropdown' unless $scope.queryName?
            $scope.selectEvent = 'dropdown.select' unless $scope.selectEvent?
            $scope.hasAny = false unless $scope.hasAny?
            $scope.anyName = 'Любой' unless $scope.anyName?
            $scope.align = 'left' unless $scope.align?

            $scope.open = ->
                $scope.isOpen = if $scope.isOpen then false else true

            $scope.select = (item) ->
                $scope.isOpen = false
                $scope.selectedItem = item
                $rootScope.$broadcast($scope.selectEvent, $scope.selectedItem)
                $location.search($scope.queryName, $scope.selectedItem.id) if $scope.changeUrl is true and $scope.changeUrlOnStart is true and item.id isnt ANY_VALUE
                $location.search($scope.queryName, null) if $scope.changeUrl is true and $scope.changeUrlOnStart is true and item.id is ANY_VALUE

            selectDefault = ->
                search = $location.search()
                if $scope.queryName? and search[$scope.queryName]?
                    selectById(parseInt(search[$scope.queryName]))
                else
                    $scope.select($scope.items[0])
                $scope.changeUrlOnStart = true

            selectById = (id) ->
                for i, item of $scope.items
                    $scope.select(item) if item.id is id

            if $scope.hasAny
                $timeout( ->
                    $scope.items.unshift(
                        id: ANY_VALUE
                        name: $scope.anyName
                    )
                    selectDefault()
                )
            else
                selectDefault()
    ])