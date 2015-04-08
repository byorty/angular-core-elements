angular
    .module('ngCoreElementTable', [])
    .directive('coreTable', ['$rootScope', '$location', ($rootScope, $location) ->
        scope:
            pageQueryName: '@'
            items: '=?'
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
        controller: ['$scope', '$element', '$attrs', ($scope, $element, $attrs) ->
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
            parentScope = $scope

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
                    $scope.pages.push(i)

            @add = (cell) -> $scope.cells.push(cell)
            @getCollectionName = -> $attrs.items
            @getParentScope = -> parentScope

            while !parentScope.hasOwnProperty(@getCollectionName()) or (parentScope.hasOwnProperty(@getCollectionName()) and $scope.$id is parentScope.$id)
                parentScope = parentScope.$parent

            search = $location.search()
            if search[$scope.pageQueryName]?
                $scope.currentPage = parseInt(search[$scope.pageQueryName])

            $scope.selectPage($scope.currentPage) if $scope.itemsCount and $scope.itemsPerPage
            $scope.changeUrlOnStart = true

            if parentScope?
              parentScope.$watch(
                  @getCollectionName()
                  (newRows, oldRows, scope) =>
                      $scope.items = scope[@getCollectionName()] if scope[@getCollectionName()]? and $scope.items isnt scope[@getCollectionName()]
                  true
              )
        ]
    ])
    .directive('coreCol', [ ->
        scope:
            name: '@'
            class: '@'
        restrict: 'E'
        require: '^coreTable'
        compile: ($element, $attrs) ->
            content = $element.html()
            ($scope, $element, $attrs, $ctrl) ->
                $scope.content = content
                $ctrl.add($scope)
    ])
    .directive('coreCell', ['compileCell', (compileCell) ->
        restrict: 'A'
        require: '^coreTable'
        replace: true
        link: ($scope, $element, $attrs, $ctrl) ->
            compileCell($element, $scope.cell.content, "#{$ctrl.getCollectionName()}[#{$scope.$parent.i}]", $ctrl.getParentScope())
    ])
    .directive('coreDetails', [ ->
        scope:
            item: '='
        restrict: 'E'
        replace: true
        transclude: true
        templateUrl: '/angular-core-elements/src/table/details.html'
        controller: ['$scope', '$element', '$attrs', ($scope, $element, $attrs) ->
            $scope.rows = []
            parentScope = $scope

            @add = (row) -> $scope.rows.push(row)
            @getCollectionName = -> $attrs.item
            @getParentScope = -> parentScope

            while !parentScope.hasOwnProperty(@getCollectionName()) or (parentScope.hasOwnProperty(@getCollectionName()) and $scope.$id is parentScope.$id)
                parentScope = parentScope.$parent
        ]
    ])
    .directive('coreRow', [ ->
        scope:
            name: '@'
            class: '@'
            lblClass: '@'
            wrpClass: '@'
        restrict: 'E'
        require: '^coreDetails'
        compile: ($element, $attrs) ->
            content = $element.html()
            ($scope, $element, $attrs, $ctrl) ->
                $scope.lblClass = 'col-sm-2' unless $scope.lblClass?
                $scope.content = content
                $ctrl.add($scope)
    ])
    .directive('coreCompileRow', ['compileCell', (compileCell) ->
        restrict: 'A'
        require: '^coreDetails'
        link: ($scope, $element, $attrs, $ctrl) ->
            compileCell($element, $scope.row.content, $ctrl.getCollectionName(), $ctrl.getParentScope())
    ])
    .factory(
        'compileCell'
        ['$compile', ($compile) ->
            (element, content, replaced, parentScope) ->
                reg = new RegExp('item(?!s)', 'g')
                element.append(content.replace(reg, replaced))
                $compile(element.contents())(parentScope)
        ]
    )