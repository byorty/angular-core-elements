angular
    .module('ngCoreElementModal')
    .directive('coreModal', ['$rootScope', ($rootScope) ->
        scope:
            animation: '@'
            title: '@'
            autoOpen: '=?'
            opener: '@'
            openerEvent: '@'
            model: '=?'
        restrict: 'E'
        replace: true
        transclude: true
        templateUrl: '/angular-core-elements/src/modal/modal.html'
        controller: ($scope) ->
            $scope.animation = 'fade' unless $scope.animation?
            $scope.autoOpen = false unless $scope.autoOpen?
            $scope.isOpen = if $scope.autoOpen is true then true else false
            $scope.openerEvent = 'click' unless $scope.openerEvent?
            $scope.model = @
            $scope.open = @show = -> $scope.isOpen = true
            $scope.close = @hide = -> $scope.isOpen = false

            angular
            .element(document.querySelector($scope.opener))
            .bind($scope.openerEvent, -> $scope.open()) if $scope.opener? and $scope.opener.length
    ])