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
        controller: ($scope) ->
            throw new Error('service should be defined') unless $scope.service?
            $scope.cleanAfterSend = true unless $scope.cleanAfterSend?
            $scope.successEvent = 'form.success' unless $scope.successEvent?
            $scope.sendEvent = 'form.send' unless $scope.sendEvent?
            $scope.receiveEvent = 'form.receive' unless $scope.receiveEvent?
            $scope.errorEvent = 'form.error' unless $scope.errorEvent?
            $scope.cleanAfterSendEvent = 'form.clean'
            $scope.error = null

            @add = (input) -> $scope.inputs.push(input)
            @getSuccessEvent = -> $scope.successEvent
            @getSendEvent = -> $scope.sendEvent
            @getReceiveEvent = -> $scope.receiveEvent
            @getErrorEvent = -> $scope.errorEvent
            @getCleanAfterSendEvent = -> $scope.cleanAfterSendEvent
            @send = ->
                params = {}
                $scope.$broadcast($scope.sendEvent, params)
                $scope.$emit($scope.sendEvent, params)
                $service.getByPath($scope.service)(params, (resp) ->
                    $scope.$broadcast($scope.receiveEvent, resp)
                    $scope.$emit($scope.receiveEvent, resp)
                    if resp.success is true
                        $scope.$broadcast($scope.successEvent, resp)
                        $scope.$emit($scope.successEvent, resp)
                        $scope.$broadcast($scope.cleanAfterSendEvent, resp) if $scope.cleanAfterSend is true
                        $window.location.href = $scope.successRedirect if $scope.successRedirect?
                    else
                        $scope.$emit($scope.errorEvent, resp)
                        if resp.message?
                            $scope.error = resp.message

                        if resp.messages?
                            $scope.$broadcast($scope.errorEvent, resp)
                            errors = for name, error of resp.messages
                                "<div class=#{name}>#{error.message}</div>"
                            $scope.error = errors.join('');
                )
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
#            value: '@'
            label: '@'
            lblClass: '@'
            placeholder: '@'
            wrpClass: '@'
        require: '^coreForm'
        restrict: 'E'
        replace: true
        templateUrl: (_, $attrs) -> if $attrs.wrpClass and $attrs.wrpClass.length > 0 then '/angular-core-elements/src/form/wrapped-input.html' else '/angular-core-elements/src/form/input.html'
        link: ($scope, $element, $attrs, $ctrl) ->
            $scope.type = 'text' unless $scope.type?
            input = angular.element($element[0].querySelector('input'))
            parent = input.parent()

            $scope.$on($ctrl.getSendEvent(), (_, params) ->
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

            $scope.$on($ctrl.getSendEvent(), (_, params) ->
                params[$scope.name] = $scope.value
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
        templateUrl: (_, $attrs) -> if $attrs.wrpClass and $attrs.wrpClass.length > 0 then '/angular-core-elements/src/form/wrapped-submit.html' else '/angular-core-elements/src/form/submit.html'
        link: ($scope, $element, $attrs, $ctrl) ->
            $scope.btnClass = 'btn-success' unless $scope.btnClass?

            btn = angular.element($element[0].querySelector('button'))

            $scope.$on($ctrl.getSendEvent(), ->
                btn.addClass('disabled');
            )
            $scope.$on($ctrl.getReceiveEvent(), ->
                btn.removeClass('disabled')[0].blur()
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
        require: '^coreForm'
        restrict: 'E'
        replace: true
        templateUrl: '/angular-core-elements/src/form/select.html'
        link: ($scope, $element, $attrs, $ctrl) ->
            throw new Error('name should be defined') unless $scope.name?
            $scope.selectEvent = "#{$scope.name}.dropdown.select"
            value = 0

            $scope.$watch(
                'selected'
                (newSelected, oldSelected) ->
                    $scope.$$childHead.select($scope.selected) if newSelected isnt oldSelected
            )

            $scope.$on(
                $scope.selectEvent
                (_, selected) -> value = selected?.id
            )

            $scope.$on($ctrl.getSendEvent(), (_, params) ->
                params[$scope.name] = value
            )
    ])