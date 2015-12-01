(function(angular) {
'use strict';
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

angular.module('ngCoreElements', ['ngCoreElementAutocomplete', 'ngCoreElementButton', 'ngCoreElementDatepicker', 'ngCoreElementDropdown', 'ngCoreElementForm', 'ngCoreElementModal', 'ngCoreElementPanel', 'ngCoreElementTable', 'ngCoreElementNav']).factory('$service', [
  function() {
    var Service;
    return Service = (function() {
      function Service() {}

      Service.getByPath = function(path) {
        var injector, method, serviceParts;
        serviceParts = path.split('.');
        method = serviceParts.length === 2 ? serviceParts[1] : 'save';
        injector = angular.element(document).injector();
        return injector.get(serviceParts[0])[method];
      };

      return Service;

    })();
  }
]).directive('body', [
  '$rootScope', '$timeout', function($rootScope, $timeout) {
    return {
      restrict: 'E',
      link: function($scope, $element) {
        return $element.bind('click', function(event) {
          return $timeout(function() {
            return $rootScope.$broadcast('body.click', {
              target: event.target
            });
          });
        });
      }
    };
  }
]).provider('$urlFor', [
  function() {
    this.routes = {};
    this.set = function(name, path) {
      return this.routes[name] = path;
    };
    this.$get = (function(_this) {
      return function() {
        return {
          get: function(name) {
            var parts;
            console.log(_this.routes);
            parts = name.split('/');
            if (parts.length && _this.routes[parts[0]]) {
              parts[0] = _this.routes[parts[0]];
              return parts.join('/');
            } else {
              if (_this.routes[name] != null) {
                return _this.routes[name];
              } else {
                return null;
              }
            }
          }
        };
      };
    })(this);
    return this;
  }
]);

Date.prototype.format = function(format) {
  var curChar, i, k, ref, replace, returnStr;
  returnStr = '';
  replace = Date.replaceChars;
  for (i = k = 0, ref = format.length; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
    curChar = format.charAt(i);
    if (i - 1 >= 0 && format.charAt(i - 1) === "\\") {
      returnStr += curChar;
    } else if (replace[curChar]) {
      returnStr += replace[curChar].call(this);
    } else if (curChar !== "\\") {
      returnStr += curChar;
    }
  }
  return returnStr;
};

Date.prototype.formatAsInt = function(format) {
  return parseInt(this.format(format));
};

Date.replaceChars = {
  shortMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
  longMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  shortDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  longDays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  d: function() {
    var day;
    day = parseInt(this.getDate(), 10);
    if (day < 10) {
      day = '0' + day;
    }
    return day;
  },
  D: function() {
    return Date.replaceChars.shortDays[this.getDay()];
  },
  j: function() {
    return this.getDate();
  },
  l: function() {
    return Date.replaceChars.longDays[this.getDay()];
  },
  N: function() {
    return this.getDay() + 1;
  },
  S: function() {
    var ref, ref1, ref2;
    return (ref = this.getDate() % 10 === 1 && this.getDate() !== 11) != null ? ref : {
      'st': (ref1 = this.getDate() % 10 === 2 && this.getDate() !== 12) != null ? ref1 : {
        'nd': (ref2 = this.getDate() % 10 === 3 && this.getDate() !== 13) != null ? ref2 : {
          'rd': 'th'
        }
      }
    };
  },
  w: function() {
    return this.getDay();
  },
  z: function() {
    return Math.ceil((this - new Date(this.getFullYear(), 0, 1)) / 86400000);
  },
  W: function() {
    var d;
    d = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - d) / 86400000) + d.getDay() + 1) / 7);
  },
  F: function() {
    return Date.replaceChars.longMonths[this.getMonth()];
  },
  m: function() {
    var month;
    month = parseInt(this.getMonth(), 10) + 1;
    if (month < 10) {
      month = '0' + month;
    }
    return month;
  },
  M: function() {
    return Date.replaceChars.shortMonths[this.getMonth()];
  },
  n: function() {
    return this.getMonth() + 1;
  },
  t: function() {
    var d;
    d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 0).getDate();
  },
  L: function() {
    var year;
    year = this.getFullYear();
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  },
  o: function() {
    var d;
    d = new Date(this.valueOf());
    d.setDate(d.getDate() - ((this.getDay() + 6) % 7) + 3);
    return d.getFullYear();
  },
  Y: function() {
    return this.getFullYear();
  },
  y: function() {
    return ('' + this.getFullYear()).substr(2);
  },
  a: function() {
    var ref;
    return (ref = this.getHours() < 12) != null ? ref : {
      'am': 'pm'
    };
  },
  A: function() {
    var ref;
    return (ref = this.getHours() < 12) != null ? ref : {
      'AM': 'PM'
    };
  },
  B: function() {
    return Math.floor((((this.getUTCHours() + 1) % 24) + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1000 / 24);
  },
  g: function() {
    return this.getHours() % 12 || 12;
  },
  G: function() {
    return this.getHours();
  },
  h: function() {
    var ref;
    return ((ref = (this.getHours() % 12 || 12) < 10) != null ? ref : {
      '0': ''
    }) + (this.getHours() % 12 || 12);
  },
  H: function() {
    var ref;
    return ((ref = this.getHours() < 10) != null ? ref : {
      '0': ''
    }) + this.getHours();
  },
  i: function() {
    var ref;
    return ((ref = this.getMinutes() < 10) != null ? ref : {
      '0': ''
    }) + this.getMinutes();
  },
  s: function() {
    var ref;
    return ((ref = this.getSeconds() < 10) != null ? ref : {
      '0': ''
    }) + this.getSeconds();
  },
  u: function() {
    var m, ref, ref1;
    m = this.getMilliseconds();
    return ((ref = m < 10) != null ? ref : {
      '00': (ref1 = m < 100) != null ? ref1 : {
        '0': ''
      }
    }) + m;
  },
  e: function() {
    return "Not Yet Supported";
  },
  I: function() {
    return "Not Yet Supported";
  },
  O: function() {
    var ref, ref1;
    return ((ref = -this.getTimezoneOffset() < 0) != null ? ref : {
      '-': '+'
    }) + ((ref1 = Math.abs(this.getTimezoneOffset() / 60) < 10) != null ? ref1 : {
      '0': ''
    }) + (Math.abs(this.getTimezoneOffset() / 60)) + '00';
  },
  P: function() {
    var ref, ref1;
    return ((ref = -this.getTimezoneOffset() < 0) != null ? ref : {
      '-': '+'
    }) + ((ref1 = Math.abs(this.getTimezoneOffset() / 60) < 10) != null ? ref1 : {
      '0': ''
    }) + (Math.abs(this.getTimezoneOffset() / 60)) + ':00';
  },
  T: function() {
    var m, result;
    m = this.getMonth();
    this.setMonth(0);
    result = this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1');
    this.setMonth(m);
    return result;
  },
  Z: function() {
    return -this.getTimezoneOffset() * 60;
  },
  c: function() {
    return this.format("Y-m-d\\TH:i:sP");
  },
  r: function() {
    return this.toString();
  },
  U: function() {
    return this.getTime() / 1000;
  }
};

Date.prototype.localeFormat = function(str) {
  var key, replace, value;
  replace = Date.replaceCharsLocale;
  for (key in replace) {
    value = replace[key];
    str = str.replace(new RegExp("" + key), replace[key].call(this));
  }
  return str;
};

Date.replaceCharsLocale = {
  dd: function() {
    var day;
    day = parseInt(this.getDate(), 10);
    if (day < 10) {
      day = '0' + day;
    }
    return day;
  },
  d: function() {
    return parseInt(this.getDate(), 10);
  },
  MMM: function() {
    return Date.replaceChars.shortMonths[this.getMonth()];
  },
  MM: function() {
    var month;
    month = parseInt(this.getMonth(), 10) + 1;
    if (month < 10) {
      month = '0' + month;
    }
    return month;
  },
  yyyy: function() {
    return this.getFullYear();
  }
};

angular.module('ngCoreElementAutocomplete', []).directive('coreAutocomplete', [
  '$service', '$timeout', '$location', '$parse', 'ngCoreAutocomplete', function($service, $timeout, $location, $parse, ngCoreAutocomplete) {
    return {
      scope: {
        service: '@',
        params: '=?',
        changeUrl: '=?',
        queryName: '@',
        paramName: '@',
        value: '=?',
        label: '@',
        lblClass: '@',
        wrpClass: '@',
        placeholder: '@',
        delay: '=?',
        onSelect: '&'
      },
      restrict: 'E',
      replace: true,
      templateUrl: function($element, $attrs) {
        if (typeof $attrs['templateUrl'] === "function" ? $attrs['templateUrl']($attrs['templateUrl']) : void 0) {

        } else {
          return '/angular-core-elements/src/autocomplete/autocomplete.html';
        }
      },
      controller: [
        '$scope', '$element', function($scope, $element) {
          var isSelect, promise;
          if ($scope.service == null) {
            throw new Error('service should be defined');
          }
          if ($scope.params == null) {
            $scope.params = ngCoreAutocomplete.params;
          }
          if ($scope.changeUrl == null) {
            $scope.changeUrl = ngCoreAutocomplete.changeUrl;
          }
          if ($scope.queryName == null) {
            $scope.queryName = ngCoreAutocomplete.queryName;
          }
          if ($scope.paramName == null) {
            $scope.paramName = ngCoreAutocomplete.paramName;
          }
          if ($scope.delay == null) {
            $scope.delay = ngCoreAutocomplete.delay;
          }
          $scope.isOpen = false;
          $scope.items = null;
          isSelect = false;
          promise = null;
          $scope.$watch('search', function() {
            if (isSelect) {
              return isSelect = false;
            } else {
              if ($scope.search != null) {
                if (promise != null) {
                  $timeout.cancel(promise);
                }
                return promise = $timeout(function() {
                  var ref;
                  if ((ref = $scope.search) != null ? ref.length : void 0) {
                    $scope.params[$scope.paramName] = $scope.search;
                    return $service.getByPath($scope.service)($scope.params, function(resp) {
                      if (resp.success && resp.items && resp.items.length) {
                        $scope.items = resp.items;
                      }
                      return $scope.isOpen = true;
                    });
                  } else {
                    $scope.isOpen = false;
                    if ($scope.changeUrl) {
                      return $location.search($scope.queryName, null);
                    }
                  }
                }, $scope.delay);
              }
            }
          });
          $scope.$watch('value', function() {
            isSelect = true;
            return $scope.search = $scope.value;
          });
          $scope.$on('body.click', function(event, args) {
            if ($scope.isOpen && !$element[0].contains(args.target)) {
              return $scope.isOpen = false;
            }
          });
          $scope.onSearch = function(search) {
            return $scope.search = search;
          };
          return $scope.onBaseSelect = function(item) {
            isSelect = true;
            $scope.isOpen = false;
            $scope.search = item.name;
            if ($scope.changeUrl) {
              $location.search($scope.queryName, item.id);
            }
            if ($scope.onSelect != null) {
              return $scope.onSelect()(item);
            }
          };
        }
      ]
    };
  }
]).provider('ngCoreAutocomplete', function() {
  this.params = {};
  this.changeUrl = false;
  this.queryName = 'query';
  this.paramName = 'query';
  this.delay = 1000;
  this.$get = (function(_this) {
    return function() {
      return {
        params: _this.params,
        changeUrl: _this.changeUrl,
        queryName: _this.queryName,
        paramName: _this.paramName,
        delay: _this.delay
      };
    };
  })(this);
});

angular.module('ngCoreElementButton', []).directive('coreButton', [
  function() {
    return {
      scope: {
        icon: '@'
      },
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/angular-core-elements/src/button/button.html'
    };
  }
]);

angular.module('ngCoreElementDatepicker', []).directive('coreDatepicker', [
  '$location', 'ngCoreDatepicker', '$timeout', function($location, ngCoreDatepicker, $timeout) {
    var AbstractPicker, DaysPicker, MonthsPicker, YearsPicker, changePicker, pickerByType;
    changePicker = function(newPicker, scope) {
      scope.changeView = true;
      scope.picker = newPicker;
      scope.picker.setScope(scope);
      return scope.picker.build();
    };
    AbstractPicker = (function() {
      function AbstractPicker() {}

      AbstractPicker.prototype.setScope = function(scope1) {
        this.scope = scope1;
      };

      AbstractPicker.prototype.prev = function() {
        this.scope.page--;
        return this.build();
      };

      AbstractPicker.prototype.next = function() {
        this.scope.page++;
        return this.build();
      };

      AbstractPicker.prototype.build = function() {};

      AbstractPicker.prototype.select = function(item) {};

      AbstractPicker.prototype.isShowPageButtons = function() {
        return true;
      };

      AbstractPicker.prototype.isSelected = function(item) {
        return true;
      };

      AbstractPicker.prototype.isCurrent = function(item) {
        return true;
      };

      AbstractPicker.prototype.getItemClasses = function(item) {
        var classes;
        classes = [];
        if (this.isCurrent(item)) {
          classes.push('current');
        }
        if (this.isSelected(item)) {
          classes.push('selected');
        }
        return classes;
      };

      AbstractPicker.prototype.getType = function() {};

      AbstractPicker.prototype.getHeaderMonth = function() {
        return this.scope.current.format(this.scope.headerMonthFormat);
      };

      AbstractPicker.prototype.getHeaderYear = function() {
        return this.scope.current.format(this.scope.headerYearFormat);
      };

      return AbstractPicker;

    })();
    YearsPicker = (function(superClass) {
      extend(YearsPicker, superClass);

      function YearsPicker() {
        return YearsPicker.__super__.constructor.apply(this, arguments);
      }

      YearsPicker.prototype.build = function() {
        var day, i, j, k, l, month, results, row, year;
        this.startYear = this.scope.now.formatAsInt('Y') + 15 * (this.scope.page - 1);
        this.endYear = this.startYear + 15;
        month = this.scope.current.formatAsInt('n');
        day = this.scope.current.formatAsInt('j');
        this.scope.headers = [];
        this.scope.rows = [];
        results = [];
        for (i = k = 0; k <= 3; i = ++k) {
          row = {
            cells: []
          };
          for (j = l = 0; l <= 3; j = ++l) {
            year = this.startYear + (i * 4 + j);
            row.cells.push({
              name: year,
              year: year,
              month: month,
              day: day
            });
          }
          results.push(this.scope.rows.push(row));
        }
        return results;
      };

      YearsPicker.prototype.isSelected = function(item) {
        return this.scope.current.getFullYear() === item.year;
      };

      YearsPicker.prototype.isCurrent = function(item) {
        return this.scope.now.getFullYear() === item.year;
      };

      YearsPicker.prototype.select = function(item) {
        this.scope.page = 0;
        this.scope.current.setFullYear(item.year);
        return changePicker(new MonthsPicker(), this.scope);
      };

      YearsPicker.prototype.getType = function() {
        return 'year';
      };

      YearsPicker.prototype.getHeaderMonth = function() {};

      YearsPicker.prototype.getHeaderYear = function() {
        return (new Date(this.startYear, 1, 1).format(this.scope.headerYearFormat)) + " - " + (new Date(this.endYear, 1, 1).format(this.scope.headerYearFormat));
      };

      return YearsPicker;

    })(AbstractPicker);
    MonthsPicker = (function(superClass) {
      extend(MonthsPicker, superClass);

      function MonthsPicker() {
        return MonthsPicker.__super__.constructor.apply(this, arguments);
      }

      MonthsPicker.prototype.build = function() {
        var day, i, j, k, l, month, results, row, year;
        year = this.scope.current.formatAsInt('Y');
        day = this.scope.current.formatAsInt('j');
        this.scope.headers = [];
        this.scope.rows = [];
        results = [];
        for (i = k = 0; k <= 2; i = ++k) {
          row = {
            cells: []
          };
          for (j = l = 0; l <= 3; j = ++l) {
            month = i * 4 + j;
            row.cells.push({
              name: new Date(year, month, day).format('M'),
              year: year,
              month: month,
              day: day
            });
          }
          results.push(this.scope.rows.push(row));
        }
        return results;
      };

      MonthsPicker.prototype.getType = function() {
        return 'month';
      };

      MonthsPicker.prototype.getHeaderMonth = function() {};

      MonthsPicker.prototype.isShowPageButtons = function() {
        return false;
      };

      MonthsPicker.prototype.isSelected = function(item) {
        return this.scope.current.getMonth() === item.month;
      };

      MonthsPicker.prototype.isCurrent = function(item) {
        return this.scope.now.getMonth() === item.month;
      };

      MonthsPicker.prototype.select = function(item) {
        this.scope.page = item.month + ((item.year - this.scope.now.getFullYear()) * 12) - this.scope.now.getMonth();
        return changePicker(new DaysPicker(), this.scope);
      };

      return MonthsPicker;

    })(AbstractPicker);
    DaysPicker = (function(superClass) {
      var DateObject;

      extend(DaysPicker, superClass);

      function DaysPicker() {
        return DaysPicker.__super__.constructor.apply(this, arguments);
      }

      DaysPicker.prototype.build = function() {
        var currentDateObj, date, day, i, items, j, k, l, n, nextDateObj, o, p, prevDateObj, q, ref, ref1, ref2, ref3, ref4, results, row, weeksCount;
        this.scope.current = new Date(this.scope.now.getFullYear(), this.scope.now.getMonth() + this.scope.page, this.scope.now.getDate());
        items = [];
        prevDateObj = new DateObject(this.scope.current, -1);
        currentDateObj = new DateObject(this.scope.current);
        nextDateObj = new DateObject(this.scope.current, 1);
        if (currentDateObj.firstDayMonth !== this.scope.startDay) {
          for (day = k = ref = this.scope.startDay, ref1 = prevDateObj.lastDayMonth; ref <= ref1 ? k <= ref1 : k >= ref1; day = ref <= ref1 ? ++k : --k) {
            items.push(this.createItem(prevDateObj.date.getFullYear(), prevDateObj.date.getMonth(), prevDateObj.daysCount - prevDateObj.lastDayMonth + day));
          }
        }
        for (day = l = 1, ref2 = currentDateObj.daysCount; 1 <= ref2 ? l <= ref2 : l >= ref2; day = 1 <= ref2 ? ++l : --l) {
          items.push(this.createItem(currentDateObj.date.getFullYear(), currentDateObj.date.getMonth(), day));
        }
        weeksCount = Math.ceil(items.length / 7);
        for (day = n = 0, ref3 = weeksCount * 7 - items.length; 0 <= ref3 ? n <= ref3 : n >= ref3; day = 0 <= ref3 ? ++n : --n) {
          nextDateObj.date.setDate(day + 1);
          items.push(this.createItem(nextDateObj.date.getFullYear(), nextDateObj.date.getMonth(), nextDateObj.date.getDate()));
        }
        this.scope.rows = [];
        for (i = o = 0, ref4 = weeksCount - 1; 0 <= ref4 ? o <= ref4 : o >= ref4; i = 0 <= ref4 ? ++o : --o) {
          row = {
            cells: []
          };
          for (j = p = 0; p <= 6; j = ++p) {
            row.cells.push(items[i * 7 + j]);
          }
          this.scope.rows.push(row);
        }
        this.scope.headers = [];
        results = [];
        for (i = q = 0; q <= 6; i = ++q) {
          date = new Date(items[i].year, items[i].month, items[i].day);
          results.push(this.scope.headers.push(date.format('D')));
        }
        return results;
      };

      DaysPicker.prototype.createItem = function(year, month, day) {
        return {
          name: day,
          year: year,
          month: month,
          day: day
        };
      };

      DaysPicker.prototype.getType = function() {
        return 'day';
      };

      DaysPicker.prototype.isSelected = function(item) {
        return this.scope.current.getFullYear() === item.year && this.scope.current.getMonth() === item.month && this.scope.current.getDate() === item.day;
      };

      DaysPicker.prototype.isCurrent = function(item) {
        return this.scope.now.getFullYear() === item.year && this.scope.now.getMonth() === item.month && this.scope.now.getDate() === item.day;
      };

      DaysPicker.prototype.select = function(item) {
        if (this.scope.current.getMonth() === item.month) {
          this.scope.current.setFullYear(item.year);
          this.scope.current.setMonth(item.month);
          this.scope.current.setDate(item.day);
          this.scope.value = this.scope.current.format(this.scope.format);
          this.scope.isOpen = false;
          if (this.scope.changeUrl) {
            return $location.search(this.scope.queryName, this.scope.value);
          }
        }
      };

      DaysPicker.prototype.getItemClasses = function(item) {
        var classes;
        classes = DaysPicker.__super__.getItemClasses.call(this, item);
        if (this.scope.current.getMonth() !== item.month) {
          classes.push('other-month');
        }
        return classes;
      };

      DateObject = (function() {
        function DateObject(date1, diff) {
          this.date = date1;
          if (diff == null) {
            diff = 0;
          }
          this.date = new Date(this.date.getFullYear(), this.date.getMonth() + diff, 1);
          this.daysCount = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
          this.firstDayMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
          this.lastDayMonth = new Date(this.date.getFullYear(), this.date.getMonth(), this.daysCount).getDay();
        }

        return DateObject;

      })();

      return DaysPicker;

    })(AbstractPicker);
    pickerByType = {
      'year': YearsPicker,
      'month': MonthsPicker,
      'day': DaysPicker
    };
    return {
      scope: {
        current: '=?',
        type: '@',
        queryName: '@',
        changeUrl: '=?',
        changeUrlOnStart: '=?',
        startDay: '=?',
        headerMonthFormat: '@',
        headerYearFormat: '@',
        iconLeft: '@',
        iconRight: '@',
        format: '@',
        label: '@',
        lblClass: '@',
        name: '@'
      },
      restrict: 'E',
      replace: true,
      templateUrl: '/angular-core-elements/src/datepicker/datepicker.html',
      controller: [
        '$scope', '$element', function($scope, $element) {
          var search;
          $scope.page = 0;
          $scope.isOpen = false;
          $scope.value = null;
          $scope.changeView = false;
          $scope.now = new Date();
          if ($scope.type == null) {
            $scope.type = ngCoreDatepicker.type;
          }
          if ($scope.startDay == null) {
            $scope.startDay = ngCoreDatepicker.startDay;
          }
          if ($scope.changeUrl == null) {
            $scope.changeUrl = ngCoreDatepicker.changeUrl;
          }
          if ($scope.changeUrlOnStart == null) {
            $scope.changeUrlOnStart = ngCoreDatepicker.changeUrlOnStart;
          }
          if ($scope.queryName == null) {
            $scope.queryName = ngCoreDatepicker.queryName;
          }
          if ($scope.headerMonthFormat == null) {
            $scope.headerMonthFormat = ngCoreDatepicker.headerMonthFormat;
          }
          if ($scope.headerYearFormat == null) {
            $scope.headerYearFormat = ngCoreDatepicker.headerYearFormat;
          }
          if ($scope.iconLeft == null) {
            $scope.iconLeft = ngCoreDatepicker.iconLeft;
          }
          if ($scope.iconRight == null) {
            $scope.iconRight = ngCoreDatepicker.iconRight;
          }
          if ($scope.format == null) {
            $scope.format = ngCoreDatepicker.format;
          }
          if ($scope.current != null) {
            $scope.current = typeof $scope.current === 'string' ? new Date($scope.current) : void 0;
            $scope.value = $scope.current.format($scope.format);
          } else {
            search = $location.search();
            if ((search[$scope.queryName] != null) && search[$scope.queryName].length) {
              $scope.current = new Date(search[$scope.queryName]);
              $scope.value = $scope.current.format($scope.format);
            } else {
              $scope.current = new Date($scope.now.getFullYear(), $scope.now.getMonth(), $scope.now.getDate());
            }
          }
          $scope.open = function() {
            return $scope.isOpen = true;
          };
          $scope.selectMonth = function() {
            return changePicker(new MonthsPicker(), $scope);
          };
          $scope.selectYear = function() {
            $scope.page = 0;
            return changePicker(new YearsPicker(), $scope);
          };
          $scope.$on('body.click', function(event, args) {
            if ($scope.changeView) {
              return $scope.changeView = false;
            } else if ($scope.isOpen && !$scope.changeView && !$element[0].contains(args.target)) {
              return $scope.isOpen = false;
            }
          });
          if (pickerByType[$scope.type]) {
            return changePicker(new pickerByType[$scope.type](), $scope);
          }
        }
      ]
    };
  }
]).provider('ngCoreDatepicker', function() {
  this.type = 'day';
  this.startDay = 1;
  this.changeUrl = false;
  this.changeUrlOnStart = false;
  this.queryName = 'datepicker';
  this.headerMonthFormat = 'F';
  this.headerYearFormat = 'Y';
  this.iconLeft = 'glyphicon glyphicon-chevron-left';
  this.iconRight = 'glyphicon glyphicon-chevron-right';
  this.format = 'Y-m-d';
  this.$get = (function(_this) {
    return function() {
      return {
        type: _this.type,
        startDay: _this.startDay,
        changeUrl: _this.changeUrl,
        changeUrlOnStart: _this.changeUrlOnStart,
        queryName: _this.queryName,
        headerMonthFormat: _this.headerMonthFormat,
        headerYearFormat: _this.headerYearFormat,
        iconLeft: _this.iconLeft,
        iconRight: _this.iconRight,
        format: _this.format
      };
    };
  })(this);
});

angular.module('ngCoreElementDropdown', []).directive('coreDropdown', [
  '$location', '$rootScope', '$timeout', 'ngCoreDropdown', function($location, $rootScope, $timeout, ngCoreDropdown) {
    return {
      scope: {
        items: '=',
        selected: '=?',
        name: '@',
        queryName: '@',
        label: '@',
        lblClass: '@',
        selectEvent: '@',
        changeUrl: '=?',
        changeUrlOnStart: '=?',
        wrpClass: '@',
        btnClass: '@',
        hasAny: '=?',
        anyName: '@',
        align: '@'
      },
      restrict: 'E',
      replace: true,
      templateUrl: '/angular-core-elements/src/dropdown/dropdown.html',
      controller: [
        '$scope', '$element', '$attrs', function($scope, $element, $attrs) {
          var hasItems, selectDefault, updateItems;
          $scope.isOpen = false;
          if ($scope.changeUrl == null) {
            $scope.changeUrl = ngCoreDropdown.changeUrl;
          }
          if ($scope.changeUrlOnStart == null) {
            $scope.changeUrlOnStart = ngCoreDropdown.changeUrlOnStart;
          }
          if ($scope.queryName == null) {
            $scope.queryName = ngCoreDropdown.queryName;
          }
          if ($scope.selectEvent == null) {
            $scope.selectEvent = ngCoreDropdown.selectEvent;
          }
          if ($scope.hasAny == null) {
            $scope.hasAny = ngCoreDropdown.hasAny;
          }
          if ($scope.anyName == null) {
            $scope.anyName = ngCoreDropdown.anyName;
          }
          if ($scope.align == null) {
            $scope.align = ngCoreDropdown.align;
          }
          $scope.open = function() {
            return $scope.isOpen = $scope.isOpen ? false : true;
          };
          $scope.select = function(item) {
            var ref;
            if (((ref = $scope.selected) != null ? ref.id : void 0) !== item.id) {
              $scope.selected = item;
            }
            $scope.isOpen = false;
            $rootScope.$broadcast($scope.selectEvent, $scope.selected);
            if ($scope.changeUrl === true && $scope.changeUrlOnStart === true && item.id !== ngCoreDropdown.anyValue) {
              $location.search($scope.queryName, $scope.selected.id);
            }
            if ($scope.changeUrl === true && $scope.changeUrlOnStart === true && item.id === ngCoreDropdown.anyValue) {
              return $location.search($scope.queryName, null);
            }
          };
          $scope.selectById = function(id) {
            var i, item, ref, results;
            ref = $scope.items;
            results = [];
            for (i in ref) {
              item = ref[i];
              if (item.id === id) {
                results.push($scope.select(item));
              } else {
                results.push(void 0);
              }
            }
            return results;
          };
          $scope.$watch('items', function(newItems, oldItems) {
            if (newItems !== oldItems) {
              return updateItems();
            }
          });
          $scope.$watch('selected', function(newSelected, oldSelected) {
            if ((newSelected != null ? newSelected.id : void 0) !== (oldSelected != null ? oldSelected.id : void 0) && $scope.selected) {
              return $scope.select($scope.selected);
            }
          }, true);
          $scope.$on('body.click', function(event, args) {
            if ($scope.isOpen && !$element[0].contains(args.target)) {
              return $scope.isOpen = false;
            }
          });
          hasItems = function() {
            return $scope.items != null;
          };
          selectDefault = function() {
            var search;
            search = $location.search();
            if ($scope.selected != null) {
              $scope.select($scope.selected);
            } else if (($scope.queryName != null) && (search[$scope.queryName] != null)) {
              $scope.selectById(parseInt(search[$scope.queryName]));
            } else if (angular.isUndefined($attrs.selected) || (!angular.isUndefined($attrs.selected) && angular.isUndefined($scope.selected)) || ($scope.selected == null)) {
              $scope.select($scope.items[0]);
            }
            if (hasItems()) {
              return $scope.changeUrlOnStart = true;
            }
          };
          updateItems = function() {
            var ref;
            if ($scope.hasAny && ((ref = $scope.items[0]) != null ? ref.id : void 0) !== ngCoreDropdown.anyValue) {
              return $timeout(function() {
                $scope.items.unshift({
                  id: ngCoreDropdown.anyValue,
                  name: $scope.anyName
                });
                return selectDefault();
              });
            } else {
              return selectDefault();
            }
          };
          if (hasItems()) {
            return updateItems();
          }
        }
      ]
    };
  }
]).provider('ngCoreDropdown', function() {
  this.anyValue = '__ANY__';
  this.changeUrl = false;
  this.changeUrlOnStart = false;
  this.queryName = 'dropdown';
  this.selectEvent = 'dropdown.select';
  this.hasAny = false;
  this.anyName = 'Любой';
  this.align = 'left';
  this.$get = (function(_this) {
    return function() {
      return {
        anyValue: _this.anyValue,
        changeUrl: _this.changeUrl,
        changeUrlOnStart: _this.changeUrlOnStart,
        queryName: _this.queryName,
        selectEvent: _this.selectEvent,
        hasAny: _this.hasAny,
        anyName: _this.anyName,
        align: _this.align
      };
    };
  })(this);
});

angular.module('ngCoreElementForm', []).directive('coreForm', [
  '$window', '$service', 'ngCoreForm', function($window, $service, ngCoreForm) {
    return {
      scope: {
        service: '@',
        cleanAfterSend: '=?',
        successRedirect: '@',
        successEvent: '@',
        beforeSendEvent: '@',
        sendEvent: '@',
        receiveEvent: '@',
        errorEvent: '@',
        preventSend: '@'
      },
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/angular-core-elements/src/form/form.html',
      controller: [
        '$scope', function($scope) {
          var listeners, trigger;
          if ($scope.service == null) {
            throw new Error('service should be defined');
          }
          if ($scope.cleanAfterSend == null) {
            $scope.cleanAfterSend = ngCoreForm.cleanAfterSend;
          }
          if ($scope.successEvent == null) {
            $scope.successEvent = ngCoreForm.successEvent;
          }
          if ($scope.sendEvent == null) {
            $scope.sendEvent = ngCoreForm.sendEvent;
          }
          if ($scope.receiveEvent == null) {
            $scope.receiveEvent = ngCoreForm.receiveEvent;
          }
          if ($scope.errorEvent == null) {
            $scope.errorEvent = ngCoreForm.errorEvent;
          }
          $scope.cleanAfterSendEvent = ngCoreForm.cleanAfterSendEvent;
          if ($scope.preventSend == null) {
            $scope.preventSend = ngCoreForm.preventSend;
          }
          $scope.error = null;
          listeners = {};
          listeners[$scope.successEvent] = {};
          listeners[$scope.sendEvent] = {};
          listeners[$scope.receiveEvent] = {};
          listeners[$scope.errorEvent] = {};
          listeners[$scope.cleanAfterSendEvent] = {};
          trigger = function(event, params) {
            var _, callback, ref, results;
            ref = listeners[event];
            results = [];
            for (_ in ref) {
              callback = ref[_];
              results.push(callback(params));
            }
            return results;
          };
          this.addListener = function(event, name, callback) {
            if (listeners[event][name] == null) {
              return listeners[event][name] = callback;
            }
          };
          this.getSuccessEvent = function() {
            return $scope.successEvent;
          };
          this.getSendEvent = function() {
            return $scope.sendEvent;
          };
          this.getReceiveEvent = function() {
            return $scope.receiveEvent;
          };
          this.getErrorEvent = function() {
            return $scope.errorEvent;
          };
          this.getCleanAfterSendEvent = function() {
            return $scope.cleanAfterSendEvent;
          };
          return this.send = function() {
            var params;
            params = {};
            trigger($scope.sendEvent, params);
            $scope.$emit($scope.sendEvent, params);
            if ($scope.preventSend) {
              trigger($scope.receiveEvent, null);
              $scope.$emit($scope.receiveEvent, null);
              return;
            }
            return $service.getByPath($scope.service)(params, function(resp) {
              var errors, message, name;
              trigger($scope.receiveEvent, resp);
              $scope.$emit($scope.receiveEvent, resp);
              if (resp.success === true) {
                trigger($scope.successEvent, resp);
                $scope.$emit($scope.successEvent, resp);
                if ($scope.cleanAfterSend === true) {
                  $scope.$broadcast($scope.cleanAfterSendEvent, resp);
                }
                if ($scope.successRedirect != null) {
                  return $window.location.href = $scope.successRedirect;
                }
              } else {
                $scope.$emit($scope.errorEvent, resp);
                if (resp.message != null) {
                  $scope.error = resp.message;
                }
                if (resp.messages != null) {
                  trigger($scope.errorEvent, resp);
                  errors = (function() {
                    var ref, results;
                    ref = resp.messages;
                    results = [];
                    for (name in ref) {
                      message = ref[name];
                      results.push("<div class=" + name + ">" + message + "</div>");
                    }
                    return results;
                  })();
                  return $scope.error = errors.join('');
                }
              }
            });
          };
        }
      ],
      link: function($scope, $element, $attrs, $ctrl) {
        return $element.bind('submit', function(event) {
          event.preventDefault();
          return $ctrl.send();
        });
      }
    };
  }
]).provider('ngCoreForm', function() {
  this.cleanAfterSend = true;
  this.successEvent = 'form.success';
  this.sendEvent = 'form.send';
  this.receiveEvent = 'form.receive';
  this.errorEvent = 'form.error';
  this.cleanAfterSendEvent = 'form.clean';
  this.preventSend = false;
  this.$get = (function(_this) {
    return function() {
      return {
        cleanAfterSend: _this.cleanAfterSend,
        successEvent: _this.successEvent,
        sendEvent: _this.sendEvent,
        receiveEvent: _this.receiveEvent,
        errorEvent: _this.errorEvent,
        cleanAfterSendEvent: _this.cleanAfterSendEvent,
        preventSend: _this.preventSend
      };
    };
  })(this);
}).directive('coreInput', [
  function() {
    return {
      scope: {
        type: '@',
        name: '@',
        value: '=?',
        label: '@',
        lblClass: '@',
        placeholder: '@',
        wrpClass: '@'
      },
      require: '^coreForm',
      restrict: 'E',
      replace: true,
      templateUrl: function($element, $attrs) {
        if ($attrs.wrpClass != null) {
          return '/angular-core-elements/src/form/wrapped-input.html';
        } else {
          return '/angular-core-elements/src/form/input.html';
        }
      },
      link: function($scope, $element, $attrs, $ctrl) {
        var input, parent;
        if ($scope.type == null) {
          $scope.type = 'text';
        }
        input = angular.element($element[0].querySelector('input'));
        parent = input.parent();
        $ctrl.addListener($ctrl.getSendEvent(), $scope.name, function(params) {
          if (input && $scope.name) {
            parent.removeClass('has-error');
            if ($scope.type === 'checkbox' || $scope.type === 'radio') {
              if (input.val()) {
                return params[input.attr('name')] = input.val();
              }
            } else {
              return params[input.attr('name')] = input.val();
            }
          }
        });
        $scope.$on($ctrl.getErrorEvent(), function(_, resp) {
          if (resp.messages[$scope.name]) {
            return parent.addClass('has-error');
          }
        });
        return $scope.$on($ctrl.getCleanAfterSendEvent(), function() {
          if ($scope.type === 'text') {
            return input.val('');
          }
        });
      }
    };
  }
]).directive('coreHiddenInput', [
  function() {
    return {
      scope: {
        name: '@',
        value: '=?'
      },
      require: '^coreForm',
      restrict: 'E',
      replace: true,
      templateUrl: '/angular-core-elements/src/form/hidden-input.html',
      link: function($scope, $element, $attrs, $ctrl) {
        if ($scope.name == null) {
          throw new Error('name should be defined');
        }
        return $ctrl.addListener($ctrl.getSendEvent(), $scope.name, function(params) {
          if ($scope.value) {
            return params[$scope.name] = $scope.value;
          }
        });
      }
    };
  }
]).directive('coreSubmit', [
  'ngCoreSubmit', function(ngCoreSubmit) {
    return {
      scope: {
        btnClass: '@',
        wrpClass: '@'
      },
      require: '^coreForm',
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: function($element, $attrs) {
        if ($attrs.wrpClass != null) {
          return '/angular-core-elements/src/form/wrapped-submit.html';
        } else {
          return '/angular-core-elements/src/form/submit.html';
        }
      },
      link: function($scope, $element, $attrs, $ctrl) {
        var btn;
        if ($scope.btnClass == null) {
          $scope.btnClass = ngCoreSubmit.btnClass;
        }
        btn = angular.element($element[0].querySelector('button'));
        $ctrl.addListener($ctrl.getSendEvent(), 'submit', function() {
          return btn.addClass('disabled');
        });
        return $ctrl.addListener($ctrl.getReceiveEvent(), 'submit', function() {
          return btn.removeClass('disabled')[0].blur();
        });
      }
    };
  }
]).provider('ngCoreSubmit', function() {
  var btnClass;
  btnClass = 'btn-success';
  this.$get = function() {
    return {
      btnClass: btnClass
    };
  };
  return this;
}).directive('coreSelect', [
  'ngCoreDropdown', function(ngCoreDropdown) {
    return {
      scope: {
        name: '@',
        label: '@',
        lblClass: '@',
        wrpClass: '@',
        items: '=',
        selected: '=?',
        selectedId: '=?',
        anyName: '@'
      },
      require: '^coreForm',
      restrict: 'E',
      replace: true,
      templateUrl: function($element, $attrs) {
        if ($attrs.wrpClass != null) {
          return '/angular-core-elements/src/form/wrapped-select.html';
        } else {
          return '/angular-core-elements/src/form/select.html';
        }
      },
      link: function($scope, $element, $attrs, $ctrl) {
        if ($scope.name == null) {
          throw new Error('name should be defined');
        }
        $scope.selectEvent = $scope.name + ".select";
        if ($scope.anyName == null) {
          $scope.anyName = 'Выбрать';
        }
        $scope.$watch('selectedId', function() {
          var i, k, ref, results;
          if (angular.isUndefined($scope.selected) && !angular.isUndefined($scope.selectedId)) {
            results = [];
            for (i = k = 0, ref = $scope.items.length - 1; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
              if ($scope.selectedId === $scope.items[i].id) {
                $scope.selected = $scope.items[i];
                break;
              } else {
                results.push(void 0);
              }
            }
            return results;
          }
        });
        return $ctrl.addListener($ctrl.getSendEvent(), $scope.name, function(params) {
          if ($scope.selected.id !== ngCoreDropdown.anyValue) {
            return params[$scope.name] = $scope.selected.id;
          }
        });
      }
    };
  }
]).directive('coreTextarea', [
  function() {
    return {
      scope: {
        name: '@',
        value: '=?',
        label: '@',
        lblClass: '@',
        placeholder: '@',
        wrpClass: '@',
        rows: '=?',
        cols: '=?'
      },
      require: '^coreForm',
      restrict: 'E',
      replace: true,
      templateUrl: function($element, $attrs) {
        if ($attrs.wrpClass != null) {
          return '/angular-core-elements/src/form/wrapped-textarea.html';
        } else {
          return '/angular-core-elements/src/form/textarea.html';
        }
      },
      link: function($scope, $element, $attrs, $ctrl) {
        var parent, textarea;
        if ($scope.name == null) {
          throw new Error('name should be defined');
        }
        textarea = angular.element($element[0].querySelector('textarea'));
        parent = textarea.parent();
        $ctrl.addListener($ctrl.getSendEvent(), $scope.name, function(params) {
          return params[$scope.name] = textarea.val();
        });
        $ctrl.addListener($ctrl.getErrorEvent(), $scope.name, function(resp) {
          if (resp.messages[$scope.name]) {
            return parent.addClass('has-error');
          }
        });
        return $ctrl.addListener($ctrl.getCleanAfterSendEvent(), $scope.name, function(params) {
          return textarea.val('');
        });
      }
    };
  }
]).directive('coreCheckbox', [
  function() {
    return {
      scope: {
        name: '@',
        value: '=?',
        label: '@',
        lblClass: '@',
        placeholder: '@',
        wrpClass: '@',
        checked: '=?'
      },
      require: '^coreForm',
      restrict: 'E',
      replace: true,
      templateUrl: function($element, $attrs) {
        if ($attrs.wrpClass != null) {
          return '/angular-core-elements/src/form/wrapped-checkbox.html';
        } else {
          return '/angular-core-elements/src/form/checkbox.html';
        }
      },
      link: function($scope, $element, $attrs, $ctrl) {
        if ($scope.name == null) {
          throw new Error('name should be defined');
        }
        return $ctrl.addListener($ctrl.getSendEvent(), $scope.name, function(params) {
          if ($scope.checked) {
            return params[$scope.name] = $scope.value;
          }
        });
      }
    };
  }
]).directive('coreAutocompleteInput', [
  function() {
    return {
      scope: {
        service: '@',
        name: '@',
        label: '@',
        lblClass: '@',
        placeholder: '@',
        wrpClass: '@',
        multiple: '@',
        items: '=?values',
        item: '=?value'
      },
      require: '^coreForm',
      restrict: 'E',
      replace: true,
      templateUrl: '/angular-core-elements/src/form/autocomplete-input.html',
      link: function($scope, $element, $attrs, $ctrl) {
        var find;
        if ($scope.name == null) {
          throw new Error('name should be defined');
        }
        $scope.hasWrapper = $attrs.wrpClass != null;
        if ($scope.multiple == null) {
          $scope.multiple = false;
        }
        $scope.templateUrl = $scope.hasWrapper ? '/angular-core-elements/src/autocomplete/autocomplete-input.html' : '/angular-core-elements/src/autocomplete/wrapped-autocomplete-input.html';
        find = function(item) {
          var i, k, ref, result;
          result = null;
          if (!$scope.items.length) {
            return result;
          }
          for (i = k = 0, ref = $scope.items.length - 1; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
            if ($scope.items[i].id === item.id) {
              result = {
                num: i,
                item: item
              };
              break;
            }
          }
          return result;
        };
        $scope.onSelect = function(item) {
          if ($scope.multiple) {
            if (!find(item)) {
              $scope.items.push(item);
            }
            return $scope.$$childHead.search = null;
          } else {
            return $scope.item = item;
          }
        };
        $scope.remove = function(item) {
          var result;
          result = find(item);
          if (result != null) {
            return $scope.items.splice(result.num, 1);
          }
        };
        return $ctrl.addListener($ctrl.getSendEvent(), $scope.name, function(params) {
          var i;
          if ($scope.multiple) {
            return params[$scope.name] = (function() {
              var k, ref, results;
              results = [];
              for (i = k = 0, ref = $scope.items.length - 1; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
                results.push($scope.items[i].id);
              }
              return results;
            })();
          } else {
            return params[$scope.name] = $scope.item.id;
          }
        });
      }
    };
  }
]).directive('coreRadio', [
  function() {
    return {
      scope: {
        name: '@',
        label: '@',
        lblClass: '@',
        wrpClass: '@',
        items: '=',
        selected: '=?',
        inline: '@'
      },
      require: '^coreForm',
      restrict: 'E',
      replace: true,
      templateUrl: function($element, $attrs) {
        if ($attrs.wrpClass != null) {
          return '/angular-core-elements/src/form/wrapped-radio.html';
        } else {
          return '/angular-core-elements/src/form/radio.html';
        }
      },
      link: function($scope, $element, $attrs, $ctrl) {
        if ($scope.name == null) {
          throw new Error('name should be defined');
        }
        $scope.onChange = function(id) {
          return $scope.selected = id;
        };
        return $ctrl.addListener($ctrl.getSendEvent(), $scope.name, function(params) {
          if ($scope.selected != null) {
            return params[$scope.name] = $scope.selected;
          }
        });
      }
    };
  }
]).directive('coreDatepickerInput', [
  function() {
    return {
      scope: {
        name: '@',
        label: '@',
        lblClass: '@',
        wrpClass: '@',
        value: '=?',
        format: '@'
      },
      require: '^coreForm',
      restrict: 'E',
      replace: true,
      templateUrl: function($element, $attrs) {
        if ($attrs.wrpClass != null) {
          return '/angular-core-elements/src/form/wrapped-datepicker.html';
        } else {
          return '/angular-core-elements/src/form/datepicker.html';
        }
      },
      link: function($scope, $element, $attrs, $ctrl) {
        if ($scope.name == null) {
          throw new Error('name should be defined');
        }
        if (!$scope.format) {
          $scope.format = 'Y-m-d';
        }
        return $ctrl.addListener($ctrl.getSendEvent(), $scope.name, function(params) {
          if ($scope.value != null) {
            return params[$scope.name] = $scope.value.format($scope.format);
          }
        });
      }
    };
  }
]).directive('coreFile', [
  '$upload', function($upload) {
    return {
      scope: {
        name: '@',
        label: '@',
        lblClass: '@',
        wrpClass: '@',
        url: '@'
      },
      require: '^coreForm',
      restrict: 'E',
      replace: true,
      templateUrl: function($element, $attrs) {
        if ($attrs.wrpClass != null) {
          return '/angular-core-elements/src/form/wrapped-file.html';
        } else {
          return '/angular-core-elements/src/form/file.html';
        }
      },
      link: function($scope, $element, $attrs, $ctrl) {
        if ($scope.name == null) {
          throw new Error('name should be defined');
        }
        $scope.file = null;
        $scope.upload = function($files) {
          var i, k, ref, results;
          results = [];
          for (i = k = 0, ref = $files.length - 1; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
            results.push($upload.upload({
              url: $scope.url,
              file: $files[i]
            }).success(function(resp) {
              if (resp.success) {
                return $scope.file = resp.item;
              }
            }));
          }
          return results;
        };
        return $ctrl.addListener($ctrl.getSendEvent(), $scope.name, function(params) {
          var ref;
          if (((ref = $scope.file) != null ? ref.id : void 0) != null) {
            return params[$scope.name] = $scope.file.id;
          }
        });
      }
    };
  }
]);

angular.module('ngCoreElementModal', []).directive('coreModal', [
  function() {
    return {
      scope: {
        animation: '@',
        title: '@',
        autoOpen: '=?',
        opener: '@',
        openerEvent: '@',
        model: '=?'
      },
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/angular-core-elements/src/modal/modal.html',
      controller: [
        '$scope', function($scope) {
          if ($scope.animation == null) {
            $scope.animation = 'fade';
          }
          if ($scope.autoOpen == null) {
            $scope.autoOpen = false;
          }
          $scope.isOpen = $scope.autoOpen === true ? true : false;
          if ($scope.openerEvent == null) {
            $scope.openerEvent = 'click';
          }
          $scope.model = this;
          $scope.open = this.show = function() {
            return $scope.isOpen = true;
          };
          $scope.close = this.hide = function() {
            return $scope.isOpen = false;
          };
          $scope.buttons = [];
          this.add = function(btn) {
            return $scope.buttons.push(btn);
          };
          if (($scope.opener != null) && $scope.opener.length) {
            return angular.element(document.querySelector($scope.opener)).bind($scope.openerEvent, function() {
              return $scope.open();
            });
          }
        }
      ]
    };
  }
]).directive('coreModalButton', [
  '$parse', function($parse) {
    return {
      scope: {
        title: '@',
        "class": '@',
        click: '&'
      },
      require: '^coreModal',
      restrict: 'E',
      replace: true,
      link: function($scope, $element, $attrs, $ctrl) {
        $scope.click = $parse($scope.click);
        return $ctrl.add($scope);
      }
    };
  }
]);

angular.module('ngCoreElementPanel', []).directive('corePanel', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: false,
      templateUrl: '/angular-core-elements/src/panel/panel.html'
    };
  }
]).directive('corePanelHeader', [
  '$timeout', '$location', '$rootScope', function($timeout, $location, $rootScope) {
    return {
      scope: {
        hasSearch: '=?',
        changeUrl: '=?',
        queryName: '@',
        delay: '=?',
        searchEvent: '@',
        placeholder: '@'
      },
      require: '^corePanel',
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/angular-core-elements/src/panel/panel-header.html',
      controller: [
        '$scope', function($scope) {
          var promise, search;
          $scope.search = null;
          if ($scope.queryName == null) {
            $scope.queryName = 'search';
          }
          if ($scope.changeUrl == null) {
            $scope.changeUrl = true;
          }
          if ($scope.hasSearch == null) {
            $scope.hasSearch = false;
          }
          if ($scope.delay == null) {
            $scope.delay = 1000;
          }
          if ($scope.searchEvent == null) {
            $scope.searchEvent = 'panel.header.search';
          }
          promise = null;
          $scope.$watch('search', function() {
            if (promise != null) {
              $timeout.cancel(promise);
            }
            return promise = $timeout(function() {
              $rootScope.$broadcast($scope.searchEvent, $scope.search);
              if (($scope.search != null) && !$scope.search.length) {
                $scope.search = null;
              }
              if ($scope.changeUrl) {
                $location.search($scope.queryName, $scope.search);
                if ($scope.search != null) {
                  return $location.search('page', null);
                }
              }
            }, $scope.delay);
          });
          $scope.onChange = function(search) {
            return $scope.search = search;
          };
          search = $location.search();
          if (search[$scope.queryName] != null) {
            return $scope.search = search[$scope.queryName];
          }
        }
      ]
    };
  }
]);

angular.module('ngCoreElementTable', []).directive('coreTable', [
  '$rootScope', '$location', function($rootScope, $location) {
    return {
      scope: {
        pageQueryName: '@',
        items: '=?',
        itemsPerPage: '=?',
        itemsCount: '=?',
        currentPage: '=?',
        displayedPages: '=?',
        changeUrl: '=?',
        changeUrlOnStart: '=?',
        itemsNotFound: '@',
        paginationEvent: '@',
        ctrl: '=?'
      },
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/angular-core-elements/src/table/table.html',
      controller: [
        '$scope', '$element', '$attrs', function($scope, $element, $attrs) {
          var parent, search;
          $scope.cells = [];
          $scope.cellElements = [];
          if ($scope.pageQueryName == null) {
            $scope.pageQueryName = 'page';
          }
          if ($scope.paginationEvent == null) {
            $scope.paginationEvent = 'page.select';
          }
          if ($scope.itemsPerPage == null) {
            $scope.itemsPerPage = 0;
          }
          if ($scope.itemsCount == null) {
            $scope.itemsCount = 0;
          }
          if ($scope.currentPage == null) {
            $scope.currentPage = 1;
          }
          if ($scope.displayedPages == null) {
            $scope.displayedPages = 5;
          }
          if ($scope.changeUrl == null) {
            $scope.changeUrl = false;
          }
          if ($scope.changeUrl == null) {
            $scope.changeUrlOnStart = false;
          }
          if ($scope.itemsNotFound == null) {
            $scope.itemsNotFound = 'Нет данных для отображения';
          }
          if (!$scope.ctrl) {
            parent = $scope.$parent;
            while (parent.$parent.$id !== 1) {
              parent = parent.$parent;
            }
            $scope.ctrl = parent;
          }
          if ($scope.changeUrl) {
            $scope.$on('pagination', function(event, pagination) {
              $scope.currentPage = pagination.page;
              $scope.itemsPerPage = pagination.itemsPerPage;
              $scope.itemsCount = pagination.itemsCount;
              return $scope.createPages();
            });
          }
          $scope.selectPage = function(page) {
            $scope.currentPage = page;
            $scope.createPages();
            if ($scope.changeUrl === true && $scope.changeUrlOnStart === true) {
              $location.search($scope.pageQueryName, $scope.currentPage);
            }
            return $rootScope.$broadcast($scope.paginationEvent, $scope.currentPage);
          };
          $scope.createPages = function() {
            var end, i, k, ref, ref1, results, start, totalPages;
            $scope.pages = [];
            start = Math.max(1, $scope.currentPage - Math.abs(Math.floor($scope.displayedPages / 2)));
            end = start + $scope.displayedPages - 1;
            totalPages = Math.ceil($scope.itemsCount / $scope.itemsPerPage);
            if (end > totalPages) {
              end = totalPages;
              start = Math.max(1, end - $scope.displayedPages + 1);
            }
            if (start > end) {
              end = start;
            }
            results = [];
            for (i = k = ref = start, ref1 = end; ref <= ref1 ? k <= ref1 : k >= ref1; i = ref <= ref1 ? ++k : --k) {
              results.push($scope.pages.push(i));
            }
            return results;
          };
          this.add = function(cell) {
            return $scope.cells.push(cell);
          };
          this.getCollectionName = function() {
            return $attrs.items;
          };
          search = $location.search();
          if (search[$scope.pageQueryName] != null) {
            $scope.currentPage = parseInt(search[$scope.pageQueryName]);
          }
          if ($scope.itemsCount && $scope.itemsPerPage) {
            $scope.selectPage($scope.currentPage);
          }
          return $scope.changeUrlOnStart = true;
        }
      ]
    };
  }
]).directive('coreCol', [
  function() {
    return {
      scope: {
        name: '@',
        "class": '@'
      },
      restrict: 'E',
      require: '^coreTable',
      compile: function($element, $attrs) {
        var content;
        content = $element.html();
        return function($scope, $element, $attrs, $ctrl) {
          $scope.content = content;
          return $ctrl.add($scope);
        };
      }
    };
  }
]).directive('coreCell', [
  '$compile', function($compile) {
    return {
      scope: {
        item: '=?',
        content: '=?',
        ctrl: '=?'
      },
      restrict: 'A',
      replace: true,
      link: function($scope, $element) {
        $element.append($scope.content);
        return $compile($element.contents())($scope);
      }
    };
  }
]).directive('coreDetails', [
  function() {
    return {
      scope: {
        item: '='
      },
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/angular-core-elements/src/table/details.html',
      controller: [
        '$scope', '$element', '$attrs', function($scope, $element, $attrs) {
          $scope.rows = [];
          return this.add = function(row) {
            return $scope.rows.push(row);
          };
        }
      ]
    };
  }
]).directive('coreRow', [
  function() {
    return {
      scope: {
        name: '@',
        "class": '@',
        lblClass: '@',
        wrpClass: '@'
      },
      restrict: 'E',
      require: '^coreDetails',
      compile: function($element, $attrs) {
        var content;
        content = $element.html();
        return function($scope, $element, $attrs, $ctrl) {
          if ($scope.lblClass == null) {
            $scope.lblClass = 'col-sm-2';
          }
          $scope.content = content;
          return $ctrl.add($scope);
        };
      }
    };
  }
]);

angular.module('ngCoreElementNav', []).directive('coreNavbar', [
  '$rootScope', '$location', 'ngCoreNavbar', function($rootScope, $location, ngCoreNavbar) {
    return {
      scope: {
        items: '=',
        subRoutesChangeEvent: '@'
      },
      restrict: 'E',
      replace: true,
      templateUrl: '/angular-core-elements/src/nav/navbar.html',
      controller: [
        '$scope', function($scope) {
          if ($scope.items == null) {
            throw new Error('items should be defined');
          }
          if ($scope.subRoutesChangeEvent == null) {
            $scope.subRoutesChangeEvent = ngCoreNavbar.subRoutesChangeEvent;
          }
          return $scope.$on('$routeChangeStart', function() {
            var i, isActive, j, k, l, ref, ref1, ref2, results, url;
            url = ($location.protocol()) + "://" + ($location.host()) + ($location.path()) + "/";
            results = [];
            for (i = k = 0, ref = $scope.items.length - 1; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
              isActive = ($scope.items[i].link != null) && new RegExp("^" + $scope.items[i].link).test(url);
              if ((ref1 = $scope.items[i].subroutes) != null ? ref1.length : void 0) {
                for (j = l = 0, ref2 = $scope.items[i].subroutes.length - 1; 0 <= ref2 ? l <= ref2 : l >= ref2; j = 0 <= ref2 ? ++l : --l) {
                  $scope.items[i].subroutes[j].active = new RegExp("^" + $scope.items[i].subroutes[j].link).test(url);
                  if ($scope.items[i].subroutes[j].active && !isActive) {
                    isActive = true;
                  }
                }
              }
              $scope.items[i].active = isActive;
              if ($scope.items[i].active) {
                $scope.items[i].active = true;
                results.push($rootScope.$broadcast($scope.subRoutesChangeEvent, $scope.items[i].subroutes));
              } else {
                results.push(void 0);
              }
            }
            return results;
          });
        }
      ]
    };
  }
]).provider('ngCoreNavbar', function() {
  this.subRoutesChangeEvent = 'sub.items.change.event';
  this.$get = (function(_this) {
    return function() {
      return {
        subRoutesChangeEvent: _this.subRoutesChangeEvent
      };
    };
  })(this);
}).directive('coreSubNav', [
  '$location', 'ngCoreNavbar', function($location, ngCoreNavbar) {
    return {
      scope: {
        subRoutesChangeEvent: '@'
      },
      restrict: 'E',
      replace: true,
      templateUrl: '/angular-core-elements/src/nav/subrouting-nav.html',
      controller: [
        '$scope', function($scope) {
          $scope.items = null;
          if ($scope.subRoutesChangeEvent == null) {
            $scope.subRoutesChangeEvent = ngCoreNavbar.subRoutesChangeEvent;
          }
          return $scope.$on($scope.subRoutesChangeEvent, function(_, items) {
            return $scope.items = items;
          });
        }
      ]
    };
  }
]).directive('coreContentTabs', [
  '$compile', '$rootScope', 'ngCoreContentTabs', function($compile, $rootScope, ngCoreContentTabs) {
    return {
      scope: {
        "class": '@'
      },
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/angular-core-elements/src/nav/content-nav.html',
      controller: [
        '$scope', '$element', function($scope, $element) {
          var content;
          content = angular.element($element[0].querySelector('.content'));
          $scope.items = [];
          if (!$scope["class"]) {
            $scope["class"] = ngCoreContentTabs.defaultClass;
          }
          $scope.select = function(item) {
            var i, k, ref;
            content.empty().append(item.content);
            $compile(content.contents())($scope.$parent);
            for (i = k = 0, ref = $scope.items.length - 1; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
              $scope.items[i].active = item.id === $scope.items[i].id ? true : false;
            }
            return $rootScope.$broadcast(ngCoreContentTabs.activateEvent, item);
          };
          return this.add = function(name, active, content) {
            var item;
            item = {
              id: $scope.items.length + 1,
              name: name,
              active: active,
              content: content
            };
            $scope.items.push(item);
            if (active) {
              return $scope.select(item);
            }
          };
        }
      ]
    };
  }
]).provider('ngCoreContentTabs', function() {
  this.defaultClass = 'nav-tabs';
  this.activateEvent = 'content.tabs.activate.event';
  this.$get = (function(_this) {
    return function() {
      return {
        activateEvent: _this.activateEvent,
        defaultClass: _this.defaultClass
      };
    };
  })(this);
}).directive('coreContentTab', [
  function() {
    return {
      scope: {
        name: '@',
        active: '=?'
      },
      restrict: 'E',
      require: '^coreContentTabs',
      link: function($scope, $element, $attrs, $ctrl) {
        if ($scope.name == null) {
          throw new Error('name should be defined');
        }
        if ($scope.active == null) {
          $scope.active = false;
        }
        $ctrl.add($scope.name, $scope.active, $element.html());
        return $element.remove();
      }
    };
  }
]);

})(window.angular);