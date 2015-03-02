(function(angular) {
angular.module('ngCoreElements').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/angular-core-elements/src/button/button.html',
    "<button type=\"button\" class=\"btn\">\n" +
    "    <span ng-if=\"icon\" class=\"{{icon}}\" aria-hidden=\"true\"></span>\n" +
    "    <span ng-transclude></span>\n" +
    "</button>"
  );


  $templateCache.put('/angular-core-elements/src/datepicker/datepicker.html',
    "<div class=\"datepicker {{picker.getType()}}\">\n" +
    "    <label ng-if=\"label\" class=\"{{lblClass}}\">{{label}}</label>\n" +
    "    <div class=\"datepicker-group\">\n" +
    "        <input type=\"text\"\n" +
    "               class=\"form-control\"\n" +
    "               ng-click=\"open()\"\n" +
    "               value=\"{{value}}\"/>\n" +
    "        <div class=\"datepicker-popover\" ng-show=\"isOpen\">\n" +
    "            <div class=\"datepicker-btns\">\n" +
    "                <core-button ng-click=\"picker.prev()\"\n" +
    "                             ng-show=\"picker.isShowPageButtons()\"\n" +
    "                             icon=\"{{iconLeft}}\"></core-button>\n" +
    "                <div class=\"datepicker-header\">\n" +
    "                    <core-button ng-click=\"selectMonth()\">{{picker.getHeaderMonth()}}</core-button>\n" +
    "                    <core-button ng-click=\"selectYear()\">{{picker.getHeaderYear()}}</core-button>\n" +
    "                </div>\n" +
    "                <core-button ng-click=\"picker.next()\"\n" +
    "                             ng-show=\"picker.isShowPageButtons()\"\n" +
    "                             icon=\"{{iconRight}}\"></core-button>\n" +
    "            </div>\n" +
    "            <table class=\"datepicker-table\">\n" +
    "                <thead ng-if=\"headers.length\">\n" +
    "                    <tr>\n" +
    "                        <th ng-repeat=\"header in headers\">{{header}}</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                    <tr ng-repeat=\"row in rows\">\n" +
    "                        <td ng-repeat=\"cell in row.cells\">\n" +
    "                            <core-button ng-click=\"picker.select(cell)\"\n" +
    "                                         ng-class=\"picker.getItemClasses(cell)\">{{cell.name}}</core-button>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/angular-core-elements/src/dropdown/dropdown.html',
    "<div ng-class=\"{'form-group': name.length, 'dropdown-wrapper': !name.length}\">\n" +
    "    <label ng-if=\"label\" class=\"{{lblClass}}\">{{label}}</label>\n" +
    "    <div class=\"btn-group {{wrpClass}}\" ng-class=\"{'open': isOpen}\">\n" +
    "        <button type=\"button\"\n" +
    "                class=\"btn btn-default dropdown-toggle {{btnClass}}\"\n" +
    "                data-toggle=\"dropdown\"\n" +
    "                aria-expanded=\"false\"\n" +
    "                ng-click=\"open()\">\n" +
    "            {{selected.name}} <span class=\"caret\"></span>\n" +
    "        </button>\n" +
    "        <ul class=\"dropdown-menu {{align}}\" role=\"menu\">\n" +
    "            <li ng-repeat=\"item in items\">\n" +
    "                <a ng-href=\"#\" ng-click=\"$event.preventDefault();select(item)\">{{item.name}}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "        <input type=\"hidden\" name=\"{{name}}\" value=\"{{value}}\" ng-if=\"name\"/>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/angular-core-elements/src/form/form.html',
    "<form>\n" +
    "    <div ng-transclude></div>\n" +
    "    <div class=\"error-wrapper\" ng-bind-html=\"error\"></div>\n" +
    "</form>"
  );


  $templateCache.put('/angular-core-elements/src/form/hidden-input.html',
    "<span><input type=\"hidden\" name=\"{{name}}\" value=\"{{value}}\"/></span>"
  );


  $templateCache.put('/angular-core-elements/src/form/input.html',
    "<div class=\"form-group\">\n" +
    "    <label ng-if=\"label\" class=\"{{lblClass}}\">{{label}}</label>\n" +
    "    <input type=\"{{type}}\"\n" +
    "           name=\"{{name}}\"\n" +
    "           value=\"{{value}}\"\n" +
    "           class=\"form-control\"\n" +
    "           placeholder=\"{{placeholder}}\"/>\n" +
    "</div>"
  );


  $templateCache.put('/angular-core-elements/src/form/select.html',
    "<div class=\"form-group\">\n" +
    "    <label ng-if=\"label\" class=\"{{lblClass}}\">{{label}}</label>\n" +
    "    <div class=\"{{wrpClass}}\">\n" +
    "        <core-dropdown items=\"items\" select-event=\"{{selectEvent}}\"></core-dropdown>\n" +
    "        <input type=\"hidden\" name=\"{{name}}\" value=\"{{value.id}}\"/>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/angular-core-elements/src/form/submit.html',
    "<div class=\"form-group\">\n" +
    "    <button ng-transclude\n" +
    "            class=\"btn btn-block {{btnClass}}\"\n" +
    "            type=\"submit\"></button>\n" +
    "</div>\n"
  );


  $templateCache.put('/angular-core-elements/src/form/wrapped-input.html',
    "<div class=\"form-group\">\n" +
    "    <label ng-if=\"label\" class=\"{{lblClass}}\">{{label}}</label>\n" +
    "    <div class=\"{{wrpClass}}\">\n" +
    "        <input type=\"{{type}}\"\n" +
    "               name=\"{{name}}\"\n" +
    "               value=\"{{value}}\"\n" +
    "               class=\"form-control\"\n" +
    "               placeholder=\"{{placeholder}}\"/>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/angular-core-elements/src/form/wrapped-submit.html',
    "<div class=\"form-group\">\n" +
    "    <div class=\"{{wrpClass}}\">\n" +
    "        <button ng-transclude\n" +
    "                class=\"btn btn-block {{btnClass}}\"\n" +
    "                type=\"submit\"></button>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/angular-core-elements/src/modal/modal.html',
    "<div class=\"modal {{animation}}\" ng-class=\"{'show in': isOpen}\">\n" +
    "    <div class=\"modal-backdrop {{animation}}\"\n" +
    "         ng-class=\"{'show in': isOpen}\"\n" +
    "         ng-click=\"close()\"></div>\n" +
    "    <div class=\"modal-dialog\">\n" +
    "        <div class=\"modal-content\">\n" +
    "            <div class=\"modal-header\">\n" +
    "                <button type=\"button\"\n" +
    "                        class=\"close\"\n" +
    "                        data-dismiss=\"modal\"\n" +
    "                        aria-label=\"Close\"\n" +
    "                        ng-click=\"close()\">\n" +
    "                    <span aria-hidden=\"true\">&times;</span>\n" +
    "                </button>\n" +
    "                <h4 class=\"modal-title\">{{title}}</h4>\n" +
    "            </div>\n" +
    "            <div class=\"modal-body\" ng-transclude></div>\n" +
    "            <!--<div class=\"modal-footer\">-->\n" +
    "                <!--<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>-->\n" +
    "                <!--<button type=\"button\" class=\"btn btn-primary\">Save changes</button>-->\n" +
    "            <!--</div>-->\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/angular-core-elements/src/panel/panel-header.html',
    "<div class=\"panel-heading clearfix\">\n" +
    "    <h4 ng-transclude class=\"pull-left\"></h4>\n" +
    "    <div class=\"pull-left search\" ng-if=\"hasSearch\">\n" +
    "        <input type=\"text\"\n" +
    "               ng-model=\"form.search\"\n" +
    "               class=\"form-control\"\n" +
    "               placeholder=\"{{placeholder}}\"/>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/angular-core-elements/src/panel/panel.html',
    "<div class=\"panel panel-default\" ng-transclude></div>"
  );


  $templateCache.put('/angular-core-elements/src/table/details.html',
    "<div class=\"details form-horizontal\">\n" +
    "    <div class=\"details-hidden\" ng-transclude></div>\n" +
    "    <div class=\"form-group\" ng-repeat=\"row in rows\">\n" +
    "        <label class=\"col-sm-2 control-label\">{{row.name}}</label>\n" +
    "        <div class=\"col-sm-8\">\n" +
    "            <p class=\"form-control-static\" core-compile-row></p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/angular-core-elements/src/table/table.html',
    "<table class=\"table\">\n" +
    "    <colgroup ng-transclude></colgroup>\n" +
    "    <thead>\n" +
    "        <tr>\n" +
    "            <th class=\"text-center {{cell.class}}\" ng-repeat=\"cell in cells\">{{cell.name}}</th>\n" +
    "        </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "        <tr ng-repeat=\"(i, row) in rows\" class=\"table-row {{i}}\">\n" +
    "            <td class=\"table-cell {{j}} {{cell.class}}\"\n" +
    "                ng-repeat=\"(j, cell) in cells\"\n" +
    "                core-cell></td>\n" +
    "        </tr>\n" +
    "        <tr ng-if=\"!rows.length\">\n" +
    "            <td class=\"items-not-found\" colspan=\"{{cells.length}}\">{{itemsNotFound}}</td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "    <tfoot ng-if=\"pages.length > 1 && rows.length\">\n" +
    "        <tr>\n" +
    "            <td colspan=\"{{cells.length}}\" class=\"table-pagination\">\n" +
    "                <ul class=\"pagination\">\n" +
    "                    <li ng-repeat=\"page in pages\" ng-class=\"{active: page == currentPage}\">\n" +
    "                        <a href=\"#\" ng-click=\"$event.preventDefault();selectPage(page)\">{{page}}</a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </tfoot>\n" +
    "</table>\n"
  );

}]);

})(window.angular);