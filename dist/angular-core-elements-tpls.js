(function(angular) {
angular.module('ngCoreElements').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/angular-core-elements/src/autocomplete/autocomplete-input.html',
    "<div class=\"form-group\">\n" +
    "    <label ng-if=\"label\" class=\"{{lblClass}}\">{{label}}</label>\n" +
    "    <input type=\"text\"\n" +
    "           name=\"{{name}}\"\n" +
    "           value=\"{{value}}\"\n" +
    "           ng-model=\"search\"\n" +
    "           ng-change=\"onChange(search)\"\n" +
    "           class=\"form-control\"\n" +
    "           placeholder=\"{{placeholder}}\"/>\n" +
    "    <ul class=\"dropdown-menu {{align}}\" role=\"menu\">\n" +
    "        <li ng-repeat=\"item in items\">\n" +
    "            <a ng-href=\"#\" ng-click=\"$event.preventDefault();onBaseSelect(item)\">{{item.name}}</a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>"
  );


  $templateCache.put('/angular-core-elements/src/autocomplete/autocomplete.html',
    "<div class=\"form-group autocomplete\" >\n" +
    "    <label class=\"control-label {{lblClass}}\" ng-if=\"label\">{{label}}</label>\n" +
    "    <div class=\"autocomplete-group {{wrpClass}}\" ng-class=\"{open: isOpen}\">\n" +
    "        <input type=\"text\"\n" +
    "               ng-model=\"search\"\n" +
    "               ng-change=\"onChange(search)\"\n" +
    "               class=\"form-control\"\n" +
    "               placeholder=\"{{placeholder}}\"/>\n" +
    "        <ul class=\"dropdown-menu {{align}}\" role=\"menu\">\n" +
    "            <li ng-repeat=\"item in items\">\n" +
    "                <a ng-href=\"#\" ng-click=\"$event.preventDefault();onBaseSelect(item)\">{{item.name}}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/angular-core-elements/src/autocomplete/wrapped-autocomplete-input.html',
    "<div class=\"form-group\">\n" +
    "    <label ng-if=\"label\" class=\"{{lblClass}}\">{{label}}</label>\n" +
    "    <div class=\"autocomplete-group {{wrpClass}}\" ng-class=\"{open: isOpen}\">\n" +
    "        <input type=\"text\"\n" +
    "               name=\"{{name}}\"\n" +
    "               value=\"{{value}}\"\n" +
    "               ng-model=\"search\"\n" +
    "               ng-change=\"onChange(search)\"\n" +
    "               class=\"form-control\"\n" +
    "               placeholder=\"{{placeholder}}\"/>\n" +
    "        <ul class=\"dropdown-menu {{align}}\" role=\"menu\">\n" +
    "            <li ng-repeat=\"item in items\">\n" +
    "                <a ng-href=\"#\" ng-click=\"$event.preventDefault();onBaseSelect(item)\">{{item.name}}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/angular-core-elements/src/breadcrumb/breadcrumb.html',
    "<ol class=\"breadcrumb\">\n" +
    "    <li ng-repeat=\"item in items\" ng-class=\"{active: item.active}\">\n" +
    "        <a href=\"{{item.link}}\">{{item.text}}</a>\n" +
    "    </li>\n" +
    "</ol>"
  );


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
    "               ng-click=\"event.preventDefault();open()\"\n" +
    "               name=\"{{name}}\"\n" +
    "               value=\"{{value}}\"/>\n" +
    "        <div class=\"datepicker-popover\" ng-show=\"isOpen\">\n" +
    "            <div class=\"datepicker-btns\">\n" +
    "                <core-button ng-click=\"event.preventDefault();picker.prev()\"\n" +
    "                             ng-show=\"picker.isShowPageButtons()\"\n" +
    "                             icon=\"{{iconLeft}}\"></core-button>\n" +
    "                <div class=\"datepicker-header\">\n" +
    "                    <core-button ng-click=\"event.preventDefault();selectMonth()\">{{picker.getHeaderMonth()}}</core-button>\n" +
    "                    <core-button ng-click=\"event.preventDefault();selectYear()\">{{picker.getHeaderYear()}}</core-button>\n" +
    "                </div>\n" +
    "                <core-button ng-click=\"event.preventDefault();picker.next()\"\n" +
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
    "                            <core-button ng-click=\"event.preventDefault();picker.select(cell)\"\n" +
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
    "    <div class=\"btn-group {{wrpClass}}\" ng-class=\"{open: isOpen}\">\n" +
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


  $templateCache.put('/angular-core-elements/src/form/autocomplete-input.html',
    "<div class=\"autocomplete-input-wrapper\">\n" +
    "    <core-autocomplete\n" +
    "                       service=\"{{service}}\"\n" +
    "                       name=\"{{name}}\"\n" +
    "                       value=\"item\"\n" +
    "                       label=\"{{label}}\"\n" +
    "                       lbl-class=\"{{lblClass}}\"\n" +
    "                       placeholder=\"{{placeholder}}\"\n" +
    "                       wrp-class=\"{{wrpClass}}\"\n" +
    "                       on-select=\"onSelect\"\n" +
    "                       template-url=\"{{templateUrl}}\"></core-autocomplete>\n" +
    "    <div class=\"form-group values\" ng-repeat=\"item in items\" ng-if=\"multiple\">\n" +
    "        <div ng-if=\"label\" class=\"{{lblClass}}\"></div>\n" +
    "        <div class=\"{{wrpClass}}\">\n" +
    "            <a href=\"#\" class=\"remove-btn\" ng-click=\"$event.preventDefault();remove(item)\">\n" +
    "                <i class=\"fa fa-times\"></i>\n" +
    "            </a>\n" +
    "            <input type=\"text\"\n" +
    "                   value=\"{{item.name}}\"\n" +
    "                   class=\"form-control\"\n" +
    "                   placeholder=\"{{placeholder}}\"/>\n" +
    "            <input type=\"hidden\"\n" +
    "                   value=\"{{item.id}}\"/>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/angular-core-elements/src/form/checkbox.html',
    "<div class=\"form-group\">\n" +
    "    <label class=\"checkbox-inline {{lblClass}}\">\n" +
    "        <input type=\"checkbox\"\n" +
    "               name=\"{{name}}\"\n" +
    "               value=\"{{value}}\"\n" +
    "               ng-model=\"checked\"/> {{label}}\n" +
    "    </label>\n" +
    "</div>"
  );


  $templateCache.put('/angular-core-elements/src/form/datepicker.html',
    "<div class=\"form-group\">\n" +
    "    <label ng-if=\"label\" class=\"{{lblClass}}\">{{label}}</label>\n" +
    "    <core-datepicker name=\"{{name}}\"\n" +
    "                     current=\"value\"></core-datepicker>\n" +
    "</div>"
  );


  $templateCache.put('/angular-core-elements/src/form/file.html',
    "<div class=\"form-group\">\n" +
    "    <label ng-if=\"label\" class=\"{{lblClass}}\">{{label}}</label>\n" +
    "    <button class=\"btn btn-default\"\n" +
    "            ng-file-select=\"upload($files)\">Загрузить</button>\n" +
    "    <input type=\"hidden\"\n" +
    "           name=\"{{name}}\"\n" +
    "           value=\"{{file.id}}\"/>\n" +
    "</div>"
  );


  $templateCache.put('/angular-core-elements/src/form/form.html',
    "<form>\n" +
    "    <div ng-transclude></div>\n" +
    "    <div class=\"error-wrapper\" ng-if=\"error\" ng-bind-html=\"error\"></div>\n" +
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


  $templateCache.put('/angular-core-elements/src/form/radio.html',
    "<div class=\"form-group\">\n" +
    "    <label ng-if=\"label\" class=\"{{lblClass}}\">{{label}}</label>\n" +
    "    <label ng-repeat=\"item in items\">\n" +
    "        <input type=\"radio\"\n" +
    "               name=\"{{name}}\"\n" +
    "               value=\"{{item.id}}\"\n" +
    "               ng-model=\"selected\"\n" +
    "               ng-click=\"onChange(item.id)\"/>{{item.name}}\n" +
    "    </label>\n" +
    "</div>"
  );


  $templateCache.put('/angular-core-elements/src/form/select.html',
    "<div class=\"form-group\">\n" +
    "    <label ng-if=\"label\" class=\"{{lblClass}}\">{{label}}</label>\n" +
    "    <span>\n" +
    "        <core-dropdown items=\"items\"\n" +
    "                       selected=\"selected\"\n" +
    "                       select-event=\"{{selectEvent}}\"\n" +
    "                       has-any=\"true\"\n" +
    "                       any-name=\"{{anyName}}\"></core-dropdown>\n" +
    "        <input type=\"hidden\" name=\"{{name}}\" value=\"{{selected.id}}\"/>\n" +
    "    </span>\n" +
    "</div>"
  );


  $templateCache.put('/angular-core-elements/src/form/submit.html',
    "<div class=\"form-group\">\n" +
    "    <button ng-transclude\n" +
    "            class=\"btn btn-block {{btnClass}}\"\n" +
    "            type=\"submit\"></button>\n" +
    "</div>\n"
  );


  $templateCache.put('/angular-core-elements/src/form/textarea.html',
    "<div class=\"form-group\">\n" +
    "    <label ng-if=\"label\"\n" +
    "           class=\"{{lblClass}}\">{{label}}</label>\n" +
    "    <textarea class=\"form-control\"\n" +
    "              name=\"{{name}}\"\n" +
    "              rows=\"{{rows}}\"\n" +
    "              cols=\"{{cols}}\"\n" +
    "              placeholder=\"{{placeholder}}\">{{value}}</textarea>\n" +
    "</div>"
  );


  $templateCache.put('/angular-core-elements/src/form/wrapped-checkbox.html',
    "<div class=\"form-group\">\n" +
    "    <label ng-if=\"label\" class=\"{{lblClass}}\">{{label}}</label>\n" +
    "    <div class=\"{{wrpClass}}\">\n" +
    "        <input type=\"checkbox\"\n" +
    "               name=\"{{name}}\"\n" +
    "               value=\"{{value}}\"\n" +
    "               ng-model=\"checked\"/>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/angular-core-elements/src/form/wrapped-datepicker.html',
    "<div class=\"form-group\">\n" +
    "    <label ng-if=\"label\" class=\"{{lblClass}}\">{{label}}</label>\n" +
    "    <div class=\"{{wrpClass}}\">\n" +
    "        <core-datepicker name=\"{{name}}\"\n" +
    "                         current=\"value\"></core-datepicker>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/angular-core-elements/src/form/wrapped-file.html',
    "<div class=\"form-group\">\n" +
    "    <label ng-if=\"label\" class=\"{{lblClass}}\">{{label}}</label>\n" +
    "    <div class=\"{{wrpClass}}\">\n" +
    "        <button class=\"btn btn-default\"\n" +
    "                ng-file-select=\"upload($files)\">Загрузить</button>\n" +
    "        <input type=\"hidden\"\n" +
    "               name=\"{{name}}\"\n" +
    "               value=\"{{file.id}}\"/>\n" +
    "    </div>\n" +
    "</div>"
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


  $templateCache.put('/angular-core-elements/src/form/wrapped-radio.html',
    "<div class=\"form-group\">\n" +
    "    <label ng-if=\"label\" class=\"{{lblClass}}\">{{label}}</label>\n" +
    "    <div class=\"{{wrpClass}}\">\n" +
    "        <label ng-class=\"{'radio-inline': inline}\" ng-repeat=\"item in items\">\n" +
    "            <input type=\"radio\"\n" +
    "                   name=\"{{name}}\"\n" +
    "                   value=\"{{item.id}}\"\n" +
    "                   ng-model=\"selected\"\n" +
    "                   ng-click=\"onChange(item.id)\">{{item.name}}\n" +
    "        </label>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/angular-core-elements/src/form/wrapped-select.html',
    "<div class=\"form-group\">\n" +
    "    <label ng-if=\"label\" class=\"{{lblClass}}\">{{label}}</label>\n" +
    "    <div class=\"{{wrpClass}}\">\n" +
    "        <core-dropdown items=\"items\"\n" +
    "                       selected=\"selected\"\n" +
    "                       select-event=\"{{selectEvent}}\"\n" +
    "                       has-any=\"true\"\n" +
    "                       any-name=\"{{anyName}}\"></core-dropdown>\n" +
    "        <input type=\"hidden\" name=\"{{name}}\" value=\"{{selected.id}}\"/>\n" +
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


  $templateCache.put('/angular-core-elements/src/form/wrapped-textarea.html',
    "<div class=\"form-group\">\n" +
    "    <label ng-if=\"label\" class=\"{{lblClass}}\">{{label}}</label>\n" +
    "    <div class=\"{{wrpClass}}\">\n" +
    "        <textarea class=\"form-control\"\n" +
    "                  name=\"{{name}}\"\n" +
    "                  rows=\"{{rows}}\"\n" +
    "                  cols=\"{{cols}}\"\n" +
    "                  placeholder=\"{{placeholder}}\">{{value}}</textarea>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/angular-core-elements/src/modal/modal.html',
    "<div>\r" +
    "\n" +
    "    <div class=\"modal {{animation}}\" ng-class=\"{'show in': isOpen}\">\r" +
    "\n" +
    "        <div class=\"modal-dialog\">\r" +
    "\n" +
    "            <div class=\"modal-content\">\r" +
    "\n" +
    "                <div class=\"modal-header\">\r" +
    "\n" +
    "                    <button type=\"button\"\r" +
    "\n" +
    "                            class=\"close\"\r" +
    "\n" +
    "                            data-dismiss=\"modal\"\r" +
    "\n" +
    "                            aria-label=\"Close\"\r" +
    "\n" +
    "                            ng-click=\"close()\">\r" +
    "\n" +
    "                        <span aria-hidden=\"true\">&times;</span>\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <h4 class=\"modal-title\">{{title}}</h4>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"modal-body\" ng-transclude></div>\r" +
    "\n" +
    "                <div class=\"modal-footer\" ng-if=\"buttons.length\">\r" +
    "\n" +
    "                    <button class=\"btn {{btn.class}}\" ng-click=\"btn.click()\" ng-repeat=\"btn in buttons\">{{btn.title}}\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"modal-backdrop {{animation}}\"\r" +
    "\n" +
    "             ng-class=\"{'show in': isOpen}\"\r" +
    "\n" +
    "             ng-if=\"isOpen\"\r" +
    "\n" +
    "             ng-click=\"close()\"></div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/angular-core-elements/src/nav/content-nav.html',
    "<div class=\"content-nav\">\n" +
    "    <ul class=\"nav {{class}}\">\n" +
    "        <li role=\"presentation\" ng-repeat=\"item in items\" ng-class=\"{active: item.active}\">\n" +
    "            <a href=\"#\" ng-click=\"$event.preventDefault();select(item)\">{{item.name}}</a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "    <div class=\"content\"></div>\n" +
    "    <div ng-transclude></div>\n" +
    "</div>\n"
  );


  $templateCache.put('/angular-core-elements/src/nav/navbar.html',
    "<ul class=\"nav navbar-nav\">\n" +
    "    <li ng-repeat=\"item in items\" ng-class=\"{active: item.active}\">\n" +
    "        <p class=\"navbar-text\" ng-if=\"!item.link\">{{item.text}}</p>\n" +
    "        <a href=\"{{item.link}}\" ng-if=\"item.link\" target=\"{{item.target}}\">{{item.text}}</a>\n" +
    "    </li>\n" +
    "</ul>"
  );


  $templateCache.put('/angular-core-elements/src/nav/subrouting-nav.html',
    "<ul class=\"nav\">\n" +
    "    <li role=\"presentation\" ng-repeat=\"item in items\" ng-class=\"{active: item.active}\">\n" +
    "        <a href=\"{{item.link}}\">{{item.text}}</a>\n" +
    "    </li>\n" +
    "</ul>"
  );


  $templateCache.put('/angular-core-elements/src/panel/panel-header.html',
    "<div class=\"panel-heading clearfix\">\n" +
    "    <h4 ng-transclude class=\"pull-left\"></h4>\n" +
    "    <div class=\"pull-left search\" ng-if=\"hasSearch\">\n" +
    "        <input type=\"text\"\n" +
    "               ng-model=\"search\"\n" +
    "               ng-change=\"onChange(search)\"\n" +
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
    "        <label class=\"{{row.lblClass}} control-label\">{{row.name}}</label>\n" +
    "        <div class=\"{{row.wrpClass}}\">\n" +
    "            <p class=\"form-control-static\"\n" +
    "               core-cell\n" +
    "               item=\"item\"\n" +
    "               content=\"row.content\"></p>\n" +
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
    "        <tr ng-repeat=\"(i, item) in items\" class=\"table-row {{i}}\">\n" +
    "            <td class=\"table-cell {{j}} {{cell.class}}\"\n" +
    "                ng-repeat=\"(j, cell) in cells\"\n" +
    "                core-cell\n" +
    "                item=\"item\"\n" +
    "                content=\"cell.content\"\n" +
    "                ctrl=\"ctrl\"></td>\n" +
    "        </tr>\n" +
    "        <tr ng-if=\"!items || (items && items.length == 0)\">\n" +
    "            <td class=\"items-not-found\" colspan=\"{{cells.length}}\">{{itemsNotFound}}</td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "    <tfoot ng-show=\"pages.length > 1 && items.length\">\n" +
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