angular
    .module('ngCoreElementDatepicker', [])
    .directive('coreDatepicker', ['$location', 'ngCoreDatepicker', '$timeout', ($location, ngCoreDatepicker, $timeout) ->
        changePicker = (newPicker, scope) ->
            scope.changeView = true
            scope.picker = newPicker
            scope.picker.setScope(scope)
            scope.picker.build()

        class AbstractPicker
            setScope: (@scope) ->
            prev: ->
                @scope.page--
                @build()

            next: ->
                @scope.page++
                @build()

            build: ->
            select: (item) ->
            isShowPageButtons: -> true
            isSelected: (item) -> true
            isCurrent: (item) -> true
            getItemClasses: (item) ->
                classes = []
                classes.push('current') if @isCurrent(item)
                classes.push('selected') if @isSelected(item)
                return classes

            getType: ->
            getHeaderMonth: -> @scope.current.format(@scope.headerMonthFormat)
            getHeaderYear: -> @scope.current.format(@scope.headerYearFormat)

        class YearsPicker extends AbstractPicker
            build: ->
                @startYear = @scope.now.formatAsInt('Y') + 15 * (@scope.page - 1)
                @endYear = @startYear + 15
                month = @scope.current.formatAsInt('n')
                day = @scope.current.formatAsInt('j')
                @scope.headers = []
                @scope.rows = []
                for i in [0..3]
                    row =
                        cells: []
                    for j in [0..3]
                        year = @startYear + (i * 4 + j)
                        row.cells.push(
                            name: year
                            year: year
                            month: month
                            day: day
                        )
                    @scope.rows.push(row)

            isSelected: (item) -> @scope.current.getFullYear() is item.year
            isCurrent: (item) -> @scope.now.getFullYear() is item.year
            select: (item) ->
                @scope.page = 0
                @scope.current.setFullYear(item.year)
                changePicker(new MonthsPicker(), @scope)

            getType: -> 'year'
            getHeaderMonth: ->
            getHeaderYear: -> "#{new Date(@startYear, 1, 1).format(@scope.headerYearFormat)} - #{new Date(@endYear, 1, 1).format(@scope.headerYearFormat)}"

        class MonthsPicker extends AbstractPicker
            build: ->
                year = @scope.current.formatAsInt('Y')
                day = @scope.current.formatAsInt('j')
                @scope.headers = []
                @scope.rows = []
                for i in [0..2]
                    row =
                        cells: []
                    for j in [0..3]
                        month = i * 4 + j
                        row.cells.push(
                            name: new Date(year, month, day).format('M')
                            year: year
                            month: month
                            day: day
                        )
                    @scope.rows.push(row)

            getType: -> 'month'
            getHeaderMonth: ->
            isShowPageButtons: -> false
            isSelected: (item) -> @scope.current.getMonth() is item.month
            isCurrent: (item) -> @scope.now.getMonth() is item.month
            select: (item) ->
                @scope.page = item.month + ((item.year - @scope.now.getFullYear()) * 12) - @scope.now.getMonth()
                changePicker(new DaysPicker(), @scope)

        class DaysPicker extends AbstractPicker
            build: ->
                @scope.current = new Date(
                    @scope.now.getFullYear()
                    @scope.now.getMonth() + @scope.page
                    @scope.now.getDate()
                )

                items = []
                prevDateObj = new DateObject(@scope.current, -1)
                currentDateObj = new DateObject(@scope.current)
                nextDateObj = new DateObject(@scope.current, 1)

                if currentDateObj.firstDayMonth isnt @scope.startDay
                    for day in [@scope.startDay..prevDateObj.lastDayMonth]
                        items.push(@createItem(
                            prevDateObj.date.getFullYear()
                            prevDateObj.date.getMonth()
                            prevDateObj.daysCount - prevDateObj.lastDayMonth + day
                        ))

                for day in [1..currentDateObj.daysCount]
                    items.push(@createItem(
                        currentDateObj.date.getFullYear()
                        currentDateObj.date.getMonth()
                        day
                    ))

                weeksCount = Math.ceil(items.length / 7)
                for day in [0..weeksCount * 7 - items.length]
                    nextDateObj.date.setDate(day + 1)
                    items.push(@createItem(
                        nextDateObj.date.getFullYear()
                        nextDateObj.date.getMonth()
                        nextDateObj.date.getDate()
                    ))

                @scope.rows = []
                for i in [0..weeksCount - 1]
                    row = cells: []
                    for j in [0..6]
                        row.cells.push(items[i * 7 + j])
                    @scope.rows.push(row)

                @scope.headers = []
                for i in [0..6]
                    date = new Date(items[i].year, items[i].month, items[i].day)
                    @scope.headers.push(date.format('D'))

            createItem: (year, month, day) ->
                name: day
                year: year
                month: month
                day: day

            getType: -> 'day'
            isSelected: (item) ->
                @scope.current.getFullYear() is item.year and
                    @scope.current.getMonth() is item.month and
                    @scope.current.getDate() is item.day

            isCurrent: (item) ->
                @scope.now.getFullYear() is item.year and
                    @scope.now.getMonth() is item.month and
                    @scope.now.getDate() is item.day

            select: (item) ->
                if @scope.current.getMonth() is item.month
                    @scope.current.setFullYear(item.year)
                    @scope.current.setMonth(item.month)
                    @scope.current.setDate(item.day)
                    @scope.value = @scope.current.format(@scope.format)
                    @scope.isOpen = false
                    $location.search(@scope.queryName, @scope.value) if @scope.changeUrl

            getItemClasses: (item) ->
                classes = super(item)
                classes.push('other-month') if @scope.current.getMonth() isnt item.month
                return classes

            class DateObject
                constructor: (@date, diff = 0) ->
                    @date = new Date(@date.getFullYear(), @date.getMonth() + diff, 1)
                    @daysCount = new Date(@date.getFullYear(), @date.getMonth() + 1, 0).getDate()
                    @firstDayMonth = new Date(@date.getFullYear(), @date.getMonth(), 1).getDay()
                    @lastDayMonth = new Date(@date.getFullYear(), @date.getMonth(), @daysCount).getDay()

        pickerByType =
            'year': YearsPicker,
            'month': MonthsPicker,
            'day': DaysPicker

        scope:
            current: '=?'
            type: '@'
            queryName: '@'
            changeUrl: '=?'
            changeUrlOnStart: '=?'
            startDay: '=?'
            headerMonthFormat: '@'
            headerYearFormat: '@'
            iconLeft: '@'
            iconRight: '@'
            format: '@'
            label: '@'
            lblClass: '@'
            name: '@'
        restrict: 'E'
        replace: true
        templateUrl: '/angular-core-elements/src/datepicker/datepicker.html'
        controller: ['$scope', '$element', ($scope, $element) ->
            $scope.page = 0
            $scope.isOpen = false
            $scope.value = null
            $scope.changeView = false
            $scope.now = new Date()
            $scope.type = ngCoreDatepicker.type unless $scope.type?
            $scope.startDay = ngCoreDatepicker.startDay unless $scope.startDay?
            $scope.changeUrl = ngCoreDatepicker.changeUrl unless $scope.changeUrl?
            $scope.changeUrlOnStart = ngCoreDatepicker.changeUrlOnStart unless $scope.changeUrlOnStart?
            $scope.queryName = ngCoreDatepicker.queryName unless $scope.queryName?
            $scope.headerMonthFormat = ngCoreDatepicker.headerMonthFormat unless $scope.headerMonthFormat?
            $scope.headerYearFormat = ngCoreDatepicker.headerYearFormat unless $scope.headerYearFormat?
            $scope.iconLeft = ngCoreDatepicker.iconLeft unless $scope.iconLeft?
            $scope.iconRight = ngCoreDatepicker.iconRight unless $scope.iconRight?
            $scope.format = ngCoreDatepicker.format unless $scope.format?

            if $scope.current?
                $scope.current = if typeof($scope.current) is 'string' then new Date($scope.current)
                $scope.value = $scope.current.format($scope.format)
            else
                search = $location.search()
                if search[$scope.queryName]? and search[$scope.queryName].length
                    $scope.current = new Date(search[$scope.queryName])
                    $scope.value = $scope.current.format($scope.format)
                else
                    $scope.current = new Date($scope.now.getFullYear(), $scope.now.getMonth(), $scope.now.getDate())

            $scope.open = -> $scope.isOpen = true
            $scope.selectMonth = -> changePicker(new MonthsPicker(), $scope)
            $scope.selectYear = ->
                $scope.page = 0
                changePicker(new YearsPicker(), $scope)

            $scope.$on(
                'body.click',
                (event, args) ->
                    if $scope.changeView
                        $scope.changeView = false
                    else if $scope.isOpen && !$scope.changeView and !$element[0].contains(args.target)
                        $scope.isOpen = false
            )

            changePicker(new pickerByType[$scope.type](), $scope) if pickerByType[$scope.type]
        ]
    ])
    .provider('ngCoreDatepicker', ->
        @type = 'day'
        @startDay = 1
        @changeUrl = false
        @changeUrlOnStart = false
        @queryName = 'datepicker'
        @headerMonthFormat = 'F'
        @headerYearFormat = 'Y'
        @iconLeft = 'glyphicon glyphicon-chevron-left'
        @iconRight = 'glyphicon glyphicon-chevron-right'
        @format = 'Y-m-d'
        @$get = =>
            type: @type
            startDay: @startDay
            changeUrl: @changeUrl
            changeUrlOnStart: @changeUrlOnStart
            queryName: @queryName
            headerMonthFormat: @headerMonthFormat
            headerYearFormat: @headerYearFormat
            iconLeft: @iconLeft
            iconRight: @iconRight
            format: @format
        return
    )