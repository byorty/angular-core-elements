angular
    .module('ngCoreElementModal', [])
    .directive('coreModal', [ ->
        scope:
            animation: '@'
            title: '@'
            submitText: '@'
            autoOpen: '=?'
            opener: '@'
            openerEvent: '@'
            model: '=?'
        restrict: 'E'
        replace: true
        transclude: true
        templateUrl: '/angular-core-elements/src/modal/modal.html'
        controller: ['$scope', ($scope) ->
            $scope.animation = 'fade' unless $scope.animation?
            $scope.autoOpen = false unless $scope.autoOpen?
            $scope.isOpen = if $scope.autoOpen is true then true else false
            $scope.openerEvent = 'click' unless $scope.openerEvent?
            $scope.model = @
            $scope.open = @show = -> $scope.isOpen = true
            $scope.close = @hide = -> $scope.isOpen = false
            $scope.submit = $scope.close
            angular
                .element(document.querySelector($scope.opener))
                .bind($scope.openerEvent, -> $scope.open()) if $scope.opener? and $scope.opener.length
        ]
    ])