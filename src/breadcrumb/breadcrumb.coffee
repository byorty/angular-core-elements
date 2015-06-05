angular
    .module('ngCoreElementBreadcrumb', [])
    .directive('coreBreadcrumb', [ ->
        scope:
            items: '?'
        restrict: 'E'
        replace: true
        transclude: true
        templateUrl: '/angular-core-elements/src/breadcrumb/breadcrumb.html'
    ])