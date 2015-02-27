angular
    .module('ngCoreElementTable', [])
    .directive('coreTable', ['$rootScope', '$location', ($rootScope, $location) ->
        scope:
            pageQueryName: '@'
            rows: '=items'
            itemsPerPage: '=?'
            itemsCount: '=?'
            currentPage: '=?'
            displayedPages: '=?'
            changeUrl: '=?'
            changeUrlOnStart: '=?'
            itemsNotFound: '@'
            paginationEvent: '@'
        restrict: 'E'
        replace: true
        transclude: true
        templateUrl: '/angular-core-elements/src/table/table.html'
        controller: ($scope, $element, $attrs) ->
            $scope.cells = []
            $scope.cellElements = []
            $scope.pageQueryName = 'page' unless $scope.pageQueryName?
            $scope.paginationEvent = 'page.select' unless $scope.paginationEvent?
            $scope.itemsPerPage = 0 unless $scope.itemsPerPage?
            $scope.itemsCount = 0 unless $scope.itemsCount?
            $scope.currentPage = 1 unless $scope.currentPage?
            $scope.displayedPages = 5 unless $scope.displayedPages?
            $scope.changeUrl = false unless $scope.changeUrl?
            $scope.changeUrlOnStart = false unless $scope.changeUrl?
            $scope.itemsNotFound = 'Нет данных для отображения' unless $scope.itemsNotFound?
            parentScope = null

            $scope.$on('pagination', (event, pagination) ->
                $scope.itemsPerPage = pagination.itemsPerPage
                $scope.itemsCount = pagination.itemsCount
                $scope.createPages()
            )

            $scope.selectPage = (page) ->
                $scope.currentPage = page
                $scope.createPages()
                $location.search($scope.pageQueryName, $scope.currentPage) if $scope.changeUrl is true and $scope.changeUrlOnStart is true
                $rootScope.$broadcast($scope.paginationEvent, $scope.currentPage)

            $scope.createPages = ->
                $scope.pages = []
                start = Math.max(1, $scope.currentPage - Math.abs(Math.floor($scope.displayedPages / 2)));
                end = start + $scope.displayedPages - 1;
                totalPages = Math.ceil($scope.itemsCount / $scope.itemsPerPage)

                if end > totalPages
                    end = totalPages
                    start = Math.max(1, end - $scope.displayedPages + 1)

                end = start if start > end

                for i in [start..end]
                    $scope.pages.push(i);


            @add = (cell) -> $scope.cells.push(cell)
            @getCollectionName = -> $attrs.items
            @getParentScope = -> parentScope

            parentScope = $scope
            while parentScope isnt null and !parentScope.hasOwnProperty(@getCollectionName())
                parentScope = parentScope.$parent

            search = $location.search()
            if search[$scope.pageQueryName]?
                $scope.currentPage = parseInt(search[$scope.pageQueryName])

            $scope.selectPage($scope.currentPage) if $scope.itemsCount and $scope.itemsPerPage
            $scope.changeUrlOnStart = true
    ])
    .directive('coreCol', [ ->
        scope:
            name: '@'
            class: '@'
        restrict: 'E'
        require: '^coreTable'
        link: ($scope, $element, $attrs, $ctrl) ->
            $scope.content = $element.html();
            $ctrl.add($scope)
    ])
    .directive('coreCell', ['$compile', ($compile) ->
        restrict: 'A'
        require: '^coreTable'
        replace: true
        link: ($scope, $element, $attrs, $ctrl) ->
            reg = new RegExp('item', 'g')
            $element.append($scope.cell.content.replace(reg, "#{$ctrl.getCollectionName()}[#{$scope.$parent.i}]"))
            $compile($element.contents())($ctrl.getParentScope())
    ])