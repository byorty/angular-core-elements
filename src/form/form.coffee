angular
    .module('ngCoreElementForm', [])
    .directive('coreForm', ['$window', '$service', ($window, $service) ->
        scope:
            service: '@'
            cleanAfterSend: '=?'
            successRedirect: '@'
            successEvent: '@'
            beforeSendEvent: '@'
            sendEvent: '@'
            receiveEvent: '@'
            errorEvent: '@'
        restrict: 'E'
        replace: true
        transclude: true
        templateUrl: '/angular-core-elements/src/form/form.html'
        controller: ['$scope', ($scope) ->
            throw new Error('service should be defined') unless $scope.service?
            $scope.cleanAfterSend = true unless $scope.cleanAfterSend?
            $scope.successEvent = 'form.success' unless $scope.successEvent?
            $scope.sendEvent = 'form.send' unless $scope.sendEvent?
            $scope.receiveEvent = 'form.receive' unless $scope.receiveEvent?
            $scope.errorEvent = 'form.error' unless $scope.errorEvent?
            $scope.cleanAfterSendEvent = 'form.clean'
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
                            errors = for name, error of resp.messages
                                "<div class=#{name}>#{error.message}</div>"
                            $scope.error = errors.join('');
                )
        ]
        link : ($scope, $element, $attrs, $ctrl) ->

            $element.bind('submit', (event)->
                event.preventDefault()
                $ctrl.send()
            )
    ])
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
            if $element.parent().hasClass('form-horizontal')
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
                            if input.val()
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
    .directive('coreSubmit', [ ->
        scope:
            btnClass: '@'
            wrpClass: '@'
        require: '^coreForm'
        restrict: 'E'
        replace: true
        transclude: true
        templateUrl: ($element, $attrs) ->
            if $element.parent().hasClass('form-horizontal')
                '/angular-core-elements/src/form/wrapped-submit.html'
            else '/angular-core-elements/src/form/submit.html'
        link: ($scope, $element, $attrs, $ctrl) ->
            $scope.btnClass = 'btn-success' unless $scope.btnClass?

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
    .directive('coreSelect', [ ->
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
            if $element.parent().hasClass('form-horizontal')
                '/angular-core-elements/src/form/wrapped-select.html'
            else '/angular-core-elements/src/form/select.html'
        link: ($scope, $element, $attrs, $ctrl) ->
            throw new Error('name should be defined') unless $scope.name?
            $scope.selectEvent = "#{$scope.name}.dropdown.select"
            $scope.anyName = 'Выбрать' unless $scope.anyName?
            value = 0

            $scope.$watch(
                'selected'
                (newSelected, oldSelected) ->
                    $scope.$$childHead.select($scope.selected) if newSelected?
            )

            $scope.$watch(
                'selectedId'
                (newSelected, oldSelected) ->
                    $scope.$$childHead.selectById($scope.selectedId) if newSelected?
            )

            $scope.$on(
                $scope.selectEvent
                (_, selected) -> value = selected?.id
            )

            $ctrl.addListener(
                $ctrl.getSendEvent()
                $scope.name
                (params) -> params[$scope.name] = value
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
            if $element.parent().hasClass('form-horizontal')
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
            if $element.parent().hasClass('form-horizontal')
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