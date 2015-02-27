(function(angular) {
'use strict';
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

angular.module('ngCoreElements', ['ngCoreElementButton', 'ngCoreElementDatepicker', 'ngCoreElementDropdown', 'ngCoreElementForm', 'ngCoreElementModal', 'ngCoreElementPanel', 'ngCoreElementTable']).factory('$service', [
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
  '$location', function($location) {
    var AbstractPicker, DaysPicker, MonthsPicker, YearsPicker, changePicker, pickerByType;
    changePicker = function(newPicker, scope) {
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
        this.scope.page = item.month - this.scope.now.getMonth();
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
        var currentDateObj, date, day, i, items, j, k, l, n, nextDateObj, o, p, prevDateObj, q, ref, ref1, ref2, ref3, results, row, weeksCount;
        this.scope.current.setMonth(this.scope.now.getMonth() + this.scope.page);
        items = [];
        prevDateObj = new DateObject(this.scope.current, -1);
        currentDateObj = new DateObject(this.scope.current);
        nextDateObj = new DateObject(this.scope.current, 1);
        if (currentDateObj.firstDayMonth !== this.scope.startDay) {
          if (prevDateObj.lastDayMonth === 0) {
            items.push(this.createItem(prevDateObj.date.getFullYear(), prevDateObj.date.getMonth(), prevDateObj.date.daysCount));
          } else {
            for (day = k = 1, ref = prevDateObj.lastDayMonth; 1 <= ref ? k <= ref : k >= ref; day = 1 <= ref ? ++k : --k) {
              prevDateObj.date.setDate(prevDateObj.daysCount - prevDateObj.lastDayMonth + day);
              items.push(this.createItem(prevDateObj.date.getFullYear(), prevDateObj.date.getMonth(), prevDateObj.date.getDate()));
            }
          }
        }
        for (day = l = 1, ref1 = currentDateObj.daysCount; 1 <= ref1 ? l <= ref1 : l >= ref1; day = 1 <= ref1 ? ++l : --l) {
          items.push(this.createItem(currentDateObj.date.getFullYear(), currentDateObj.date.getMonth(), day));
        }
        weeksCount = Math.ceil(items.length / 7);
        for (day = n = 0, ref2 = weeksCount * 7 - items.length; 0 <= ref2 ? n <= ref2 : n >= ref2; day = 0 <= ref2 ? ++n : --n) {
          nextDateObj.date.setDate(day + 1);
          items.push(this.createItem(nextDateObj.date.getFullYear(), nextDateObj.date.getMonth(), nextDateObj.date.getDate()));
        }
        this.scope.rows = [];
        for (i = o = 0, ref3 = weeksCount - 1; 0 <= ref3 ? o <= ref3 : o >= ref3; i = 0 <= ref3 ? ++o : --o) {
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
          this.date = new Date(this.date.getFullYear(), this.date.getMonth() + diff, this.date.getDate());
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
        lblClass: '@'
      },
      restrict: 'E',
      replace: true,
      templateUrl: '/angular-core-elements/src/datepicker/datepicker.html',
      controller: function($scope) {
        var search;
        $scope.page = 0;
        $scope.isOpen = false;
        $scope.value = null;
        $scope.now = new Date();
        if ($scope.type == null) {
          $scope.type = 'day';
        }
        if ($scope.startDay == null) {
          $scope.startDay = 1;
        }
        if ($scope.changeUrl == null) {
          $scope.changeUrl = false;
        }
        if ($scope.changeUrlOnStart == null) {
          $scope.changeUrlOnStart = false;
        }
        if ($scope.queryName == null) {
          $scope.queryName = 'datepicker';
        }
        if ($scope.headerMonthFormat == null) {
          $scope.headerMonthFormat = 'F';
        }
        if ($scope.headerYearFormat == null) {
          $scope.headerYearFormat = 'Y';
        }
        if ($scope.iconLeft == null) {
          $scope.iconLeft = 'glyphicon glyphicon-chevron-left';
        }
        if ($scope.iconRight == null) {
          $scope.iconRight = 'glyphicon glyphicon-chevron-right';
        }
        if ($scope.format == null) {
          $scope.format = 'Y-m-d';
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
        if (pickerByType[$scope.type]) {
          return changePicker(new pickerByType[$scope.type](), $scope);
        }
      }
    };
  }
]);

angular.module('ngCoreElementDropdown', []).directive('coreDropdown', [
  '$location', '$rootScope', '$timeout', function($location, $rootScope, $timeout) {
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
      controller: function($scope) {
        var ANY_VALUE, hasItems, selectById, selectDefault, updateItems;
        ANY_VALUE = '__ANY__';
        $scope.isOpen = false;
        if ($scope.changeUrl == null) {
          $scope.changeUrl = false;
        }
        if ($scope.changeUrlOnStart == null) {
          $scope.changeUrlOnStart = false;
        }
        if ($scope.queryName == null) {
          $scope.queryName = 'dropdown';
        }
        if ($scope.selectEvent == null) {
          $scope.selectEvent = 'dropdown.select';
        }
        if ($scope.hasAny == null) {
          $scope.hasAny = false;
        }
        if ($scope.anyName == null) {
          $scope.anyName = 'Любой';
        }
        if ($scope.align == null) {
          $scope.align = 'left';
        }
        $scope.open = function() {
          return $scope.isOpen = $scope.isOpen ? false : true;
        };
        $scope.select = function(item) {
          $scope.isOpen = false;
          $scope.selected = item;
          $rootScope.$broadcast($scope.selectEvent, $scope.selected);
          if ($scope.changeUrl === true && $scope.changeUrlOnStart === true && item.id !== ANY_VALUE) {
            $location.search($scope.queryName, $scope.selected.id);
          }
          if ($scope.changeUrl === true && $scope.changeUrlOnStart === true && item.id === ANY_VALUE) {
            return $location.search($scope.queryName, null);
          }
        };
        $scope.$watch('items', function(newItems, oldItems) {
          if (newItems !== oldItems) {
            return updateItems();
          }
        });
        $scope.$watch('selected', function(newSelected, oldSelected) {
          if (newSelected !== oldSelected && $scope.selected) {
            return $scope.select($scope.selected);
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
            selectById(parseInt(search[$scope.queryName]));
          } else {
            $scope.select($scope.items[0]);
          }
          if (hasItems()) {
            return $scope.changeUrlOnStart = true;
          }
        };
        selectById = function(id) {
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
        updateItems = function() {
          if ($scope.hasAny) {
            return $timeout(function() {
              $scope.items.unshift({
                id: ANY_VALUE,
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
    };
  }
]);

angular.module('ngCoreElementForm', []).directive('coreForm', [
  '$window', '$service', function($window, $service) {
    return {
      scope: {
        service: '@',
        cleanAfterSend: '=?',
        successRedirect: '@',
        successEvent: '@',
        beforeSendEvent: '@',
        sendEvent: '@',
        receiveEvent: '@',
        errorEvent: '@'
      },
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/angular-core-elements/src/form/form.html',
      controller: function($scope) {
        if ($scope.service == null) {
          throw new Error('service should be defined');
        }
        if ($scope.cleanAfterSend == null) {
          $scope.cleanAfterSend = true;
        }
        if ($scope.successEvent == null) {
          $scope.successEvent = 'form.success';
        }
        if ($scope.sendEvent == null) {
          $scope.sendEvent = 'form.send';
        }
        if ($scope.receiveEvent == null) {
          $scope.receiveEvent = 'form.receive';
        }
        if ($scope.errorEvent == null) {
          $scope.errorEvent = 'form.error';
        }
        $scope.cleanAfterSendEvent = 'form.clean';
        $scope.error = null;
        this.add = function(input) {
          return $scope.inputs.push(input);
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
          $scope.$broadcast($scope.sendEvent, params);
          $scope.$emit($scope.sendEvent, params);
          return $service.getByPath($scope.service)(params, function(resp) {
            var error, errors, name;
            $scope.$broadcast($scope.receiveEvent, resp);
            $scope.$emit($scope.receiveEvent, resp);
            if (resp.success === true) {
              $scope.$broadcast($scope.successEvent, resp);
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
                $scope.$broadcast($scope.errorEvent, resp);
                errors = (function() {
                  var ref, results;
                  ref = resp.messages;
                  results = [];
                  for (name in ref) {
                    error = ref[name];
                    results.push("<div class=" + name + ">" + error.message + "</div>");
                  }
                  return results;
                })();
                return $scope.error = errors.join('');
              }
            }
          });
        };
      },
      link: function($scope, $element, $attrs, $ctrl) {
        return $element.bind('submit', function(event) {
          event.preventDefault();
          return $ctrl.send();
        });
      }
    };
  }
]).directive('coreInput', [
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
      templateUrl: function(_, $attrs) {
        if ($attrs.wrpClass && $attrs.wrpClass.length > 0) {
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
        $scope.$on($ctrl.getSendEvent(), function(_, params) {
          if (input && $scope.name) {
            parent.removeClass('has-error');
            if ($scope.type === 'checkbox' || $scope.type === 'radio') {
              if (input.val()) {
                return params[input.attr('name')] = input.val();
              }
            } else {
              if (input.val()) {
                return params[input.attr('name')] = input.val();
              }
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
        return $scope.$on($ctrl.getSendEvent(), function(_, params) {
          return params[$scope.name] = $scope.value;
        });
      }
    };
  }
]).directive('coreSubmit', [
  function() {
    return {
      scope: {
        btnClass: '@',
        wrpClass: '@'
      },
      require: '^coreForm',
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: function(_, $attrs) {
        if ($attrs.wrpClass && $attrs.wrpClass.length > 0) {
          return '/angular-core-elements/src/form/wrapped-submit.html';
        } else {
          return '/angular-core-elements/src/form/submit.html';
        }
      },
      link: function($scope, $element, $attrs, $ctrl) {
        var btn;
        if ($scope.btnClass == null) {
          $scope.btnClass = 'btn-success';
        }
        btn = angular.element($element[0].querySelector('button'));
        $scope.$on($ctrl.getSendEvent(), function() {
          return btn.addClass('disabled');
        });
        return $scope.$on($ctrl.getReceiveEvent(), function() {
          return btn.removeClass('disabled')[0].blur();
        });
      }
    };
  }
]).directive('coreSelect', [
  function() {
    return {
      scope: {
        name: '@',
        label: '@',
        lblClass: '@',
        wrpClass: '@',
        items: '=',
        selected: '=?'
      },
      require: '^coreForm',
      restrict: 'E',
      replace: true,
      templateUrl: '/angular-core-elements/src/form/select.html',
      link: function($scope, $element, $attrs, $ctrl) {
        if ($scope.name == null) {
          throw new Error('name should be defined');
        }
        $scope.selectEvent = $scope.name + ".dropdown.select";
        $scope.$watch('selected', function(newSelected, oldSelected) {
          if (newSelected !== oldSelected) {
            return $scope.$$childHead.select($scope.selected);
          }
        });
        $scope.$on($scope.selectEvent, function(_, selected) {
          console.log(arguments);
          return $scope.selected = selected;
        });
        return $scope.$on($ctrl.getSendEvent(), function(_, params) {
          return params[$scope.name] = $scope.selected.id;
        });
      }
    };
  }
]);

angular.module('ngCoreElementModal', []).directive('coreModal', [
  '$rootScope', function($rootScope) {
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
      controller: function($scope) {
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
        if (($scope.opener != null) && $scope.opener.length) {
          return angular.element(document.querySelector($scope.opener)).bind($scope.openerEvent, function() {
            return $scope.open();
          });
        }
      }
    };
  }
]);

angular.module('ngCoreElementTable', []).directive('coreTable', [
  '$rootScope', '$location', function($rootScope, $location) {
    return {
      scope: {
        pageQueryName: '@',
        rows: '=items',
        itemsPerPage: '=?',
        itemsCount: '=?',
        currentPage: '=?',
        displayedPages: '=?',
        changeUrl: '=?',
        changeUrlOnStart: '=?',
        itemsNotFound: '@',
        paginationEvent: '@'
      },
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/angular-core-elements/src/table/table.html',
      controller: function($scope, $element, $attrs) {
        var parentScope, search;
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
        parentScope = null;
        $scope.$on('pagination', function(event, pagination) {
          $scope.itemsPerPage = pagination.itemsPerPage;
          $scope.itemsCount = pagination.itemsCount;
          return $scope.createPages();
        });
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
        this.getParentScope = function() {
          return parentScope;
        };
        parentScope = $scope;
        while (parentScope !== null && !parentScope.hasOwnProperty(this.getCollectionName())) {
          parentScope = parentScope.$parent;
        }
        search = $location.search();
        if (search[$scope.pageQueryName] != null) {
          $scope.currentPage = parseInt(search[$scope.pageQueryName]);
        }
        if ($scope.itemsCount && $scope.itemsPerPage) {
          $scope.selectPage($scope.currentPage);
        }
        return $scope.changeUrlOnStart = true;
      }
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
      link: function($scope, $element, $attrs, $ctrl) {
        $scope.content = $element.html();
        return $ctrl.add($scope);
      }
    };
  }
]).directive('coreCell', [
  '$compile', function($compile) {
    return {
      restrict: 'A',
      require: '^coreTable',
      replace: true,
      link: function($scope, $element, $attrs, $ctrl) {
        var reg;
        reg = new RegExp('item', 'g');
        $element.append($scope.cell.content.replace(reg, ($ctrl.getCollectionName()) + "[" + $scope.$parent.i + "]"));
        return $compile($element.contents())($ctrl.getParentScope());
      }
    };
  }
]);

})(window.angular);