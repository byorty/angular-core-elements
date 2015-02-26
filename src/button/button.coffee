angular
    .module('ngCoreElementButton')
    .directive('coreButton', [ ->
        scope:
            icon: '@'
        restrict: 'E'
        replace: true
        transclude: true
        templateUrl: '/angular-core-elements/src/button/button.html'
    ])