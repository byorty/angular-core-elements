angular
    .module('ngCoreElementForm', [])
    .directive('coreForm', ['$window', '$service', 'ngCoreForm', ($window, $service, ngCoreForm) ->
        scope:
            service: '@'
            cleanAfterSend: '=?'
            successRedirect: '@'
            successEvent: '@'
            beforeSendEvent: '@'
            sendEvent: '@'
            receiveEvent: '@'
            errorEvent: '@'
            preventSend: '@'
        restrict: 'E'
        replace: true
        transclude: true
        templateUrl: '/angular-core-elements/src/form/form.html'
        controller: ['$scope', ($scope) ->
            throw new Error('service should be defined') unless $scope.service?
            $scope.cleanAfterSend = ngCoreForm.cleanAfterSend unless $scope.cleanAfterSend?
            $scope.successEvent = ngCoreForm.successEvent unless $scope.successEvent?
            $scope.sendEvent = ngCoreForm.sendEvent unless $scope.sendEvent?
            $scope.receiveEvent = ngCoreForm.receiveEvent unless $scope.receiveEvent?
            $scope.errorEvent = ngCoreForm.errorEvent unless $scope.errorEvent?
            $scope.cleanAfterSendEvent = ngCoreForm.cleanAfterSendEvent
            $scope.preventSend = ngCoreForm.preventSend unless $scope.preventSend?
            $scope.error = null
            listeners = {}
            listeners[$scope.successEvent] = {}
            listeners[$scope.sendEvent] = {}
            listeners[$scope.receiveEvent] = {}
            listeners[$scope.errorEvent] = {}
            listeners[$scope.cleanAfterSendEvent] = {}

            trigger = (event, params) ->
                callback(params) for _, callback of listeners[event]

            @addListener = (event, name, callback) -> listeners[event][name] = (callback) unless listeners[event][name]?
            @getSuccessEvent = -> $scope.successEvent
            @getSendEvent = -> $scope.sendEvent
            @getReceiveEvent = -> $scope.receiveEvent
            @getErrorEvent = -> $scope.errorEvent
            @getCleanAfterSendEvent = -> $scope.cleanAfterSendEvent
            @send = ->
                params = {}
                trigger($scope.sendEvent, params)
                $scope.$emit($scope.sendEvent, params)
                if $scope.preventSend
                    trigger($scope.receiveEvent, null)
                    $scope.$emit($scope.receiveEvent, null)
                    return
                $service.getByPath($scope.service)(params, (resp) ->
                    trigger($scope.receiveEvent, resp)
                    $scope.$emit($scope.receiveEvent, resp)
                    if resp.success is true
                        trigger($scope.successEvent, resp)
                        $scope.$emit($scope.successEvent, resp)
                        $scope.$broadcast($scope.cleanAfterSendEvent, resp) if $scope.cleanAfterSend is true
                        $window.location.href = $scope.successRedirect if $scope.successRedirect?
                    else
                        $scope.$emit($scope.errorEvent, resp)
                        if resp.message?
                            $scope.error = resp.message

                        if resp.messages?
                            trigger($scope.errorEvent, resp)
                            errors = for name, message of resp.messages
                                "<div class=#{name}>#{message}</div>"
                            $scope.error = errors.join('');
                )
        ]
        link : ($scope, $element, $attrs, $ctrl) ->

            $element.bind('submit', (event)->
                event.preventDefault()
                $ctrl.send()
            )
    ])
    .provider('ngCoreForm', ->
        @cleanAfterSend = true
        @successEvent = 'form.success'
        @sendEvent = 'form.send'
        @receiveEvent = 'form.receive'
        @errorEvent = 'form.error'
        @cleanAfterSendEvent = 'form.clean'
        @preventSend = false
        @$get = =>
            cleanAfterSend: @cleanAfterSend
            successEvent: @successEvent
            sendEvent: @sendEvent
            receiveEvent: @receiveEvent
            errorEvent: @errorEvent
            cleanAfterSendEvent: @cleanAfterSendEvent
            preventSend: @preventSend
        return
    )
    .directive('coreInput', [ ->
        scope:
            type: '@'
            name: '@'
            value: '=?'
            label: '@'
            lblClass: '@'
            placeholder: '@'
            wrpClass: '@'
        require: '^coreForm'
        restrict: 'E'
        replace: true
        templateUrl: ($element, $attrs) ->
            if $attrs.wrpClass?
                '/angular-core-elements/src/form/wrapped-input.html'
            else '/angular-core-elements/src/form/input.html'
        link: ($scope, $element, $attrs, $ctrl) ->
            $scope.type = 'text' unless $scope.type?
            input = angular.element($element[0].querySelector('input'))
            parent = input.parent()

            $ctrl.addListener(
                $ctrl.getSendEvent()
                $scope.name
                (params) ->
                    if input and $scope.name
                        parent.removeClass('has-error')
                        if $scope.type is 'checkbox' or $scope.type is 'radio'
                            if input.val()
                                params[input.attr('name')] = input.val()
                        else
                            params[input.attr('name')] = input.val()
            )


            $scope.$on($ctrl.getErrorEvent(), (_, resp) ->
                parent.addClass('has-error') if resp.messages[$scope.name]
            )

            $scope.$on($ctrl.getCleanAfterSendEvent(), ->
                input.val('') if $scope.type is 'text'
            )
    ])
    .directive('coreHiddenInput', [ ->
        scope:
            name: '@'
            value: '=?'
        require: '^coreForm'
        restrict: 'E'
        replace: true
        templateUrl: '/angular-core-elements/src/form/hidden-input.html'
        link: ($scope, $element, $attrs, $ctrl) ->
            throw new Error('name should be defined') unless $scope.name?

            $ctrl.addListener(
                $ctrl.getSendEvent()
                $scope.name
                (params) -> params[$scope.name] = $scope.value if $scope.value
            )
    ])
    .directive('coreSubmit', ['ngCoreSubmit', (ngCoreSubmit) ->
        scope:
            btnClass: '@'
            wrpClass: '@'
        require: '^coreForm'
        restrict: 'E'
        replace: true
        transclude: true
        templateUrl: ($element, $attrs) ->
            if $attrs.wrpClass?
                '/angular-core-elements/src/form/wrapped-submit.html'
            else '/angular-core-elements/src/form/submit.html'
        link: ($scope, $element, $attrs, $ctrl) ->
            $scope.btnClass = ngCoreSubmit.btnClass unless $scope.btnClass?

            btn = angular.element($element[0].querySelector('button'))

            $ctrl.addListener(
                $ctrl.getSendEvent()
                'submit'
                -> btn.addClass('disabled')
            )

            $ctrl.addListener(
                $ctrl.getReceiveEvent()
                'submit'
                -> btn.removeClass('disabled')[0].blur()
            )
    ])
    .provider('ngCoreSubmit', ->
        btnClass = 'btn-success'
        @$get = ->
            btnClass: btnClass
        @
    )
    .directive('coreSelect', ['ngCoreDropdown', (ngCoreDropdown) ->
        scope:
            name: '@'
            label: '@'
            lblClass: '@'
            wrpClass: '@'
            items: '='
            selected: '=?'
            selectedId: '=?'
            anyName: '@'
        require: '^coreForm'
        restrict: 'E'
        replace: true
        templateUrl: ($element, $attrs) ->
            if $attrs.wrpClass?
                '/angular-core-elements/src/form/wrapped-select.html'
            else '/angular-core-elements/src/form/select.html'
        link: ($scope, $element, $attrs, $ctrl) ->
            throw new Error('name should be defined') unless $scope.name?
            $scope.selectEvent = "#{$scope.name}.select"
            $scope.anyName = 'Выбрать' unless $scope.anyName?

            $scope.$watch(
                'selectedId',
                ->
                    if angular.isUndefined($scope.selected) and not angular.isUndefined($scope.selectedId)
                        for i in [0..$scope.items.length-1]
                            if $scope.selectedId == $scope.items[i].id
                                $scope.selected = $scope.items[i]
                                break
            )

            $ctrl.addListener(
                $ctrl.getSendEvent()
                $scope.name
                (params) ->
                    params[$scope.name] = $scope.selected.id if $scope.selected.id != ngCoreDropdown.anyValue
            )
    ])
    .directive('coreTextarea', [ ->
        scope:
            name: '@'
            value: '=?'
            label: '@'
            lblClass: '@'
            placeholder: '@'
            wrpClass: '@'
            rows: '=?'
            cols: '=?'
        require: '^coreForm'
        restrict: 'E'
        replace: true
        templateUrl: ($element, $attrs) ->
            if $attrs.wrpClass?
                '/angular-core-elements/src/form/wrapped-textarea.html'
            else '/angular-core-elements/src/form/textarea.html'
        link: ($scope, $element, $attrs, $ctrl) ->
            throw new Error('name should be defined') unless $scope.name?
            textarea = angular.element($element[0].querySelector('textarea'))
            parent = textarea.parent()

            $ctrl.addListener(
                $ctrl.getSendEvent()
                $scope.name
                (params) -> params[$scope.name] = textarea.val()
            )

            $ctrl.addListener(
                $ctrl.getErrorEvent()
                $scope.name
                (resp) -> parent.addClass('has-error') if resp.messages[$scope.name]
            )

            $ctrl.addListener(
                $ctrl.getCleanAfterSendEvent()
                $scope.name
                (params) -> textarea.val('')
            )
    ])
    .directive('coreCheckbox', [ ->
        scope:
            name: '@'
            value: '=?'
            label: '@'
            lblClass: '@'
            placeholder: '@'
            wrpClass: '@'
            checked: '=?'
        require: '^coreForm'
        restrict: 'E'
        replace: true
        templateUrl: ($element, $attrs) ->
            if $attrs.wrpClass?
                '/angular-core-elements/src/form/wrapped-checkbox.html'
            else '/angular-core-elements/src/form/checkbox.html'
        link: ($scope, $element, $attrs, $ctrl) ->
            throw new Error('name should be defined') unless $scope.name?

            $ctrl.addListener(
                $ctrl.getSendEvent()
                $scope.name
                (params) -> params[$scope.name] = $scope.value if $scope.checked
            )
    ])
    .directive('coreAutocompleteInput', [ ->
        scope:
            service: '@'
            name: '@'
            label: '@'
            lblClass: '@'
            placeholder: '@'
            wrpClass: '@'
            multiple: '@'
            items: '=?values'
            item: '=?value'
        require: '^coreForm'
        restrict: 'E'
        replace: true
        templateUrl: '/angular-core-elements/src/form/autocomplete-input.html'
        link: ($scope, $element, $attrs, $ctrl) ->
            throw new Error('name should be defined') unless $scope.name?
            $scope.hasWrapper = $attrs.wrpClass?;
            $scope.multiple = false unless $scope.multiple?
            $scope.templateUrl = if $scope.hasWrapper then '/angular-core-elements/src/autocomplete/autocomplete-input.html' else '/angular-core-elements/src/autocomplete/wrapped-autocomplete-input.html'

            find = (item) ->
                result = null
                if not $scope.items.length
                    return result
                for i in [0..$scope.items.length-1]
                    if $scope.items[i].id == item.id
                        result =
                            num: i
                            item: item
                        break
                return result

            $scope.onSelect = (item) ->
                if $scope.multiple
                    if !find(item)
                        $scope.items.push(item)
                    $scope.$$childHead.search = null
                else $scope.item = item

            $scope.remove = (item) ->
                result = find(item)
                if result?
                    $scope.items.splice(result.num, 1)

            $ctrl.addListener(
                $ctrl.getSendEvent()
                $scope.name
                (params) ->
                    if $scope.multiple
                        params[$scope.name] = for i in [0..$scope.items.length-1]
                            $scope.items[i].id
                    else params[$scope.name] = $scope.item.id
            )
    ])
    .directive('coreRadio', [ ->
        scope:
            name: '@'
            label: '@'
            lblClass: '@'
            wrpClass: '@'
            items: '='
            selected: '=?'
            inline: '@'
        require: '^coreForm'
        restrict: 'E'
        replace: true
        templateUrl: ($element, $attrs) ->
            if $attrs.wrpClass?
                '/angular-core-elements/src/form/wrapped-radio.html'
            else '/angular-core-elements/src/form/radio.html'
        link: ($scope, $element, $attrs, $ctrl) ->
            throw new Error('name should be defined') unless $scope.name?

            $scope.onChange = (id) -> $scope.selected = id

            $ctrl.addListener(
                $ctrl.getSendEvent()
                $scope.name
                (params) ->
                    params[$scope.name] = $scope.selected if $scope.selected?
            )
    ])
    .directive('coreDatepickerInput', [ ->
        scope:
            name: '@'
            label: '@'
            lblClass: '@'
            wrpClass: '@'
            value: '=?'



        require: '^coreForm'
        restrict: 'E'
        replace: true
        templateUrl: ($element, $attrs) ->
            if $attrs.wrpClass?
                '/angular-core-elements/src/form/wrapped-datepicker.html'
            else '/angular-core-elements/src/form/datepicker.html'
        link: ($scope, $element, $attrs, $ctrl) ->
            throw new Error('name should be defined') unless $scope.name?

            $ctrl.addListener(
                $ctrl.getSendEvent()
                $scope.name
                (params) ->
                    params[$scope.name] = $scope.value if $scope.value?
            )
    ])