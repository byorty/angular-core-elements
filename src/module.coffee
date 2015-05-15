'use strict';

angular
    .module('ngCoreElements', [
        'ngCoreElementAutocomplete',
        'ngCoreElementButton',
        'ngCoreElementDatepicker',
        'ngCoreElementDropdown',
        'ngCoreElementForm',
        'ngCoreElementModal',
        'ngCoreElementPanel',
        'ngCoreElementTable',
        'ngCoreElementNav',
    ])
    .factory('$service', [ ->
        class Service
            @getByPath = (path) ->
                serviceParts = path.split('.')
                method = if serviceParts.length == 2 then serviceParts[1] else 'save'
                injector = angular.element(document).injector()
                injector.get(serviceParts[0])[method]
    ])
    .directive('body', ['$rootScope', '$timeout', ($rootScope, $timeout) ->
        restrict: 'E'
        link: ($scope, $element) ->
            $element.bind('click', (event) ->
                $timeout(
                    ->
                        $rootScope.$broadcast(
                            'body.click',
                            target: event.target
                        )
                )
            )
    ])

Date.prototype.format = (format) ->
    returnStr = '';
    replace = Date.replaceChars;
    for i in [0..format.length]
        curChar = format.charAt(i);
        if i - 1 >= 0 and format.charAt(i - 1) == "\\"
            returnStr += curChar
        else if replace[curChar]
            returnStr += replace[curChar].call(@)
        else if curChar != "\\"
            returnStr += curChar
    return returnStr

Date.prototype.formatAsInt = (format) -> parseInt(@format(format))

Date.replaceChars =
    shortMonths : ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    longMonths : ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    shortDays : ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    longDays : ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
    d: ->
        day = parseInt(@getDate(), 10)
        day = '0' + day if day < 10
        return day
    D: -> Date.replaceChars.shortDays[@getDay()]
    j: -> @getDate()
    l: -> Date.replaceChars.longDays[@getDay()]
    N: -> @getDay() + 1
    S: -> (@getDate() % 10 == 1 && @getDate() != 11 ? 'st' : (@getDate() % 10 == 2 && @getDate() != 12 ? 'nd' : (@getDate() % 10 == 3 && @getDate() != 13 ? 'rd' : 'th')))
    w: -> @getDay()
    z: -> Math.ceil((@ - new Date(@getFullYear(), 0, 1)) / 86400000)
    W: ->
        d = new Date(@getFullYear(), 0, 1)
        return Math.ceil((((@ - d) / 86400000) + d.getDay() + 1) / 7)
    F: -> Date.replaceChars.longMonths[@getMonth()]
    m: ->
        month = parseInt(@getMonth(), 10) + 1
        if month < 10
            month = '0' + month
        return month
    M: -> Date.replaceChars.shortMonths[@getMonth()]
    n: -> @getMonth() + 1
    t: ->
        d = new Date()
        return new Date(d.getFullYear(), d.getMonth(), 0).getDate()
    L: ->
        year = @getFullYear()
        return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    o: ->
        d  = new Date(@valueOf())
        d.setDate(d.getDate() - ((@getDay() + 6) % 7) + 3)
        return d.getFullYear()
    Y: -> @getFullYear()
    y: -> ('' + @getFullYear()).substr(2)
    a: -> @getHours() < 12 ? 'am' : 'pm'
    A: -> @getHours() < 12 ? 'AM' : 'PM'
    B: -> Math.floor((((@getUTCHours() + 1) % 24) + @getUTCMinutes() / 60 + @getUTCSeconds() / 3600) * 1000 / 24)
    g: -> @getHours() % 12 || 12
    G: -> @getHours()
    h: -> ((@getHours() % 12 || 12) < 10 ? '0' : '') + (@getHours() % 12 || 12)
    H: -> (@getHours() < 10 ? '0' : '') + @getHours()
    i: -> (@getMinutes() < 10 ? '0' : '') + @getMinutes()
    s: -> (@getSeconds() < 10 ? '0' : '') + @getSeconds()
    u: ->
        m = @getMilliseconds()
        return (m < 10 ? '00' : (m < 100 ? '0' : '')) + m
    e: -> "Not Yet Supported"
    I: -> "Not Yet Supported"
    O: -> (-@getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(@getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(@getTimezoneOffset() / 60)) + '00'
    P: -> (-@getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(@getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(@getTimezoneOffset() / 60)) + ':00'
    T: ->
        m = @getMonth()
        @setMonth(0)
        result = @toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1')
        @setMonth(m)
        return result
    Z: -> -@getTimezoneOffset() * 60
    c: -> @format("Y-m-d\\TH:i:sP")
    r: -> @toString()
    U: -> @getTime() / 1000

Date.prototype.localeFormat = (str) ->
    replace = Date.replaceCharsLocale;
    for key, value of replace
        str = str.replace(new RegExp("#{key}"), replace[key].call(@))
    return str

Date.replaceCharsLocale =
    dd : ->
        day = parseInt(@getDate(), 10)
        if day < 10
            day = '0' + day
        return day
    d : -> parseInt(@getDate(), 10)
    MMM: -> Date.replaceChars.shortMonths[@getMonth()]
    MM: ->
        month = parseInt(@getMonth(), 10) + 1
        if month < 10
            month = '0' + month
        return month
    yyyy: -> @getFullYear()