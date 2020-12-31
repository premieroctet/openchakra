'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactEventListener = require('react-event-listener');

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _transitions = require('../styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _CalendarActionButtons = require('./CalendarActionButtons');

var _CalendarActionButtons2 = _interopRequireDefault(_CalendarActionButtons);

var _CalendarMonth = require('./CalendarMonth');

var _CalendarMonth2 = _interopRequireDefault(_CalendarMonth);

var _CalendarYear = require('./CalendarYear');

var _CalendarYear2 = _interopRequireDefault(_CalendarYear);

var _CalendarToolbar = require('./CalendarToolbar');

var _CalendarToolbar2 = _interopRequireDefault(_CalendarToolbar);

var _DateDisplay = require('./DateDisplay');

var _DateDisplay2 = _interopRequireDefault(_DateDisplay);

var _SlideIn = require('../internal/SlideIn');

var _SlideIn2 = _interopRequireDefault(_SlideIn);

var _dateUtils = require('./dateUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var daysArray = [].concat((0, _toConsumableArray3.default)(Array(7)));

var Calendar = function (_Component) {
  (0, _inherits3.default)(Calendar, _Component);

  function Calendar() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Calendar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Calendar.__proto__ || (0, _getPrototypeOf2.default)(Calendar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      displayDate: undefined,
      displayMonthDay: undefined,
      selectedDate: undefined,
      transitionDirection: 'left',
      transitionEnter: true
    }, _this.calendarRefs = {}, _this.handleClickDay = function (event, date) {
      _this.setSelectedDate(date);
      if (_this.props.onClickDay) _this.props.onClickDay(event, date);
    }, _this.handleMonthChange = function (months) {
      var nextDirection = _this.context.muiTheme.isRtl ? 'right' : 'left';
      var prevDirection = _this.context.muiTheme.isRtl ? 'left' : 'right';
      var direction = months >= 0 ? nextDirection : prevDirection;
      _this.setState({
        transitionDirection: direction,
        displayDate: _this.props.utils.addMonths(_this.state.displayDate, months)
      });
    }, _this.handleClickYear = function (event, year) {
      _this.setSelectedDate(_this.props.utils.setYear(_this.state.selectedDate, year), event);
      _this.handleClickDateDisplayMonthDay();
    }, _this.handleClickDateDisplayMonthDay = function () {
      _this.setState({
        displayMonthDay: true
      });
    }, _this.handleClickDateDisplayYear = function () {
      _this.setState({
        displayMonthDay: false
      });
    }, _this.handleWindowKeyDown = function (event) {
      if (_this.props.open) {
        var nextArrow = _this.context.muiTheme.isRtl ? 'left' : 'right';
        var prevArrow = _this.context.muiTheme.isRtl ? 'right' : 'left';
        switch ((0, _keycode2.default)(event)) {
          case 'up':
            if (event.altKey && event.shiftKey) {
              _this.addSelectedYears(-1);
            } else if (event.shiftKey) {
              _this.addSelectedMonths(-1);
            } else {
              _this.addSelectedDays(-7);
            }
            break;

          case 'down':
            if (event.altKey && event.shiftKey) {
              _this.addSelectedYears(1);
            } else if (event.shiftKey) {
              _this.addSelectedMonths(1);
            } else {
              _this.addSelectedDays(7);
            }
            break;

          case nextArrow:
            if (event.altKey && event.shiftKey) {
              _this.addSelectedYears(1);
            } else if (event.shiftKey) {
              _this.addSelectedMonths(1);
            } else {
              _this.addSelectedDays(1);
            }
            break;

          case prevArrow:
            if (event.altKey && event.shiftKey) {
              _this.addSelectedYears(-1);
            } else if (event.shiftKey) {
              _this.addSelectedMonths(-1);
            } else {
              _this.addSelectedDays(-1);
            }
            break;
        }
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Calendar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        displayDate: this.props.utils.getFirstDayOfMonth(this.props.initialDate),
        selectedDate: this.props.initialDate,
        displayMonthDay: !this.props.openToYearSelection
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.initialDate !== this.props.initialDate) {
        var date = nextProps.initialDate || new Date();
        this.setState({
          displayDate: this.props.utils.getFirstDayOfMonth(date),
          selectedDate: date
        });
      }
    }
  }, {
    key: 'getMinDate',
    value: function getMinDate() {
      return this.props.minDate || this.props.utils.addYears(new Date(), -100);
    }
  }, {
    key: 'getMaxDate',
    value: function getMaxDate() {
      return this.props.maxDate || this.props.utils.addYears(new Date(), 100);
    }
  }, {
    key: 'getSelectedDate',
    value: function getSelectedDate() {
      return this.state.selectedDate;
    }
  }, {
    key: 'isSelectedDateDisabled',
    value: function isSelectedDateDisabled() {
      if (!this.state.displayMonthDay) {
        return false;
      }

      if (this.calendarRefs.calendar) {
        return this.calendarRefs.calendar.isSelectedDateDisabled();
      } else {
        return false;
      }
    }
  }, {
    key: 'addSelectedDays',
    value: function addSelectedDays(days) {
      this.setSelectedDate(this.props.utils.addDays(this.state.selectedDate, days));
    }
  }, {
    key: 'addSelectedMonths',
    value: function addSelectedMonths(months) {
      this.setSelectedDate(this.props.utils.addMonths(this.state.selectedDate, months));
    }
  }, {
    key: 'addSelectedYears',
    value: function addSelectedYears(years) {
      this.setSelectedDate(this.props.utils.addYears(this.state.selectedDate, years));
    }
  }, {
    key: 'setDisplayDate',
    value: function setDisplayDate(date, newSelectedDate) {
      var newDisplayDate = this.props.utils.getFirstDayOfMonth(date);

      if (newDisplayDate !== this.state.displayDate) {
        var nextDirection = this.context.muiTheme.isRtl ? 'right' : 'left';
        var prevDirection = this.context.muiTheme.isRtl ? 'left' : 'right';
        var direction = newDisplayDate > this.state.displayDate ? nextDirection : prevDirection;
        this.setState({
          displayDate: newDisplayDate,
          transitionDirection: direction,
          selectedDate: newSelectedDate || this.state.selectedDate
        });
      }
    }
  }, {
    key: 'setSelectedDate',
    value: function setSelectedDate(date) {
      var adjustedDate = date;
      var minDate = this.getMinDate();
      var maxDate = this.getMaxDate();
      if ((0, _dateUtils.isBeforeDate)(date, minDate)) {
        adjustedDate = minDate;
      } else if ((0, _dateUtils.isAfterDate)(date, maxDate)) {
        adjustedDate = maxDate;
      }

      var newDisplayDate = this.props.utils.getFirstDayOfMonth(adjustedDate);
      if (newDisplayDate !== this.state.displayDate) {
        this.setDisplayDate(newDisplayDate, adjustedDate);
      } else {
        this.setState({
          selectedDate: adjustedDate
        });
      }
    }
  }, {
    key: 'getToolbarInteractions',
    value: function getToolbarInteractions() {
      return {
        prevMonth: this.props.utils.monthDiff(this.state.displayDate, this.getMinDate()) > 0,
        nextMonth: this.props.utils.monthDiff(this.state.displayDate, this.getMaxDate()) < 0
      };
    }
  }, {
    key: 'yearSelector',
    value: function yearSelector() {
      if (!this.props.disableYearSelection) {
        return _react2.default.createElement(_CalendarYear2.default, {
          key: 'years',
          DateTimeFormat: this.props.DateTimeFormat,
          locale: this.props.locale,
          onClickYear: this.handleClickYear,
          selectedDate: this.state.selectedDate,
          minDate: this.getMinDate(),
          maxDate: this.getMaxDate(),
          utils: this.props.utils
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var prepareStyles = this.context.muiTheme.prepareStyles;
      var hideCalendarDate = this.props.hideCalendarDate;

      var toolbarInteractions = this.getToolbarInteractions();
      var isLandscape = this.props.mode === 'landscape';
      var calendarTextColor = this.context.muiTheme.datePicker.calendarTextColor;


      var styles = {
        root: {
          color: calendarTextColor,
          userSelect: 'none',
          width: !hideCalendarDate && isLandscape ? 479 : 310
        },
        calendar: {
          display: 'flex',
          flexDirection: 'column'
        },
        calendarContainer: {
          display: 'flex',
          alignContent: 'space-between',
          justifyContent: 'space-between',
          flexDirection: 'column',
          fontSize: 12,
          fontWeight: 400,
          padding: '0px 8px',
          transition: _transitions2.default.easeOut()
        },
        yearContainer: {
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          height: 272,
          marginTop: 10,
          overflow: 'hidden',
          width: 310
        },
        weekTitle: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          fontWeight: '500',
          height: 20,
          lineHeight: '15px',
          opacity: '0.5',
          textAlign: 'center'
        },
        weekTitleDay: {
          width: 42
        },
        transitionSlide: {
          height: 214
        }
      };

      var weekTitleDayStyle = prepareStyles(styles.weekTitleDay);

      var _props = this.props,
          cancelLabel = _props.cancelLabel,
          DateTimeFormat = _props.DateTimeFormat,
          firstDayOfWeek = _props.firstDayOfWeek,
          locale = _props.locale,
          okLabel = _props.okLabel,
          onClickCancel = _props.onClickCancel,
          onClickOk = _props.onClickOk,
          utils = _props.utils;


      return _react2.default.createElement(
        'div',
        { style: prepareStyles(styles.root) },
        _react2.default.createElement(_reactEventListener2.default, {
          target: 'window',
          onKeyDown: this.handleWindowKeyDown
        }),
        !hideCalendarDate && _react2.default.createElement(_DateDisplay2.default, {
          DateTimeFormat: DateTimeFormat,
          disableYearSelection: this.props.disableYearSelection,
          onClickMonthDay: this.handleClickDateDisplayMonthDay,
          onClickYear: this.handleClickDateDisplayYear,
          locale: locale,
          monthDaySelected: this.state.displayMonthDay,
          mode: this.props.mode,
          selectedDate: this.state.selectedDate
        }),
        _react2.default.createElement(
          'div',
          { style: prepareStyles(styles.calendar) },
          this.state.displayMonthDay && _react2.default.createElement(
            'div',
            { style: prepareStyles(styles.calendarContainer) },
            _react2.default.createElement(_CalendarToolbar2.default, {
              DateTimeFormat: DateTimeFormat,
              locale: locale,
              displayDate: this.state.displayDate,
              onMonthChange: this.handleMonthChange,
              prevMonth: toolbarInteractions.prevMonth,
              nextMonth: toolbarInteractions.nextMonth
            }),
            _react2.default.createElement(
              'div',
              { style: prepareStyles(styles.weekTitle) },
              daysArray.map(function (event, i) {
                return _react2.default.createElement(
                  'span',
                  { key: i, style: weekTitleDayStyle },
                  (0, _dateUtils.localizedWeekday)(DateTimeFormat, locale, i, firstDayOfWeek)
                );
              })
            ),
            _react2.default.createElement(
              _SlideIn2.default,
              { direction: this.state.transitionDirection, style: styles.transitionSlide },
              _react2.default.createElement(_CalendarMonth2.default, {
                DateTimeFormat: DateTimeFormat,
                locale: locale,
                displayDate: this.state.displayDate,
                firstDayOfWeek: this.props.firstDayOfWeek,
                key: this.state.displayDate.toDateString(),
                minDate: this.getMinDate(),
                maxDate: this.getMaxDate(),
                onClickDay: this.handleClickDay,
                ref: function ref(_ref2) {
                  return _this2.calendarRefs.calendar = _ref2;
                },
                selectedDate: this.state.selectedDate,
                shouldDisableDate: this.props.shouldDisableDate,
                utils: utils
              })
            )
          ),
          !this.state.displayMonthDay && _react2.default.createElement(
            'div',
            { style: prepareStyles(styles.yearContainer) },
            this.yearSelector()
          ),
          okLabel && _react2.default.createElement(_CalendarActionButtons2.default, {
            autoOk: this.props.autoOk,
            cancelLabel: cancelLabel,
            okLabel: okLabel,
            onClickCancel: onClickCancel,
            onClickOk: onClickOk
          })
        )
      );
    }
  }]);
  return Calendar;
}(_react.Component);

Calendar.defaultProps = {
  DateTimeFormat: _dateUtils.dateTimeFormat,
  disableYearSelection: false,
  initialDate: new Date(),
  locale: 'en-US',
  utils: _dateUtils.defaultUtils
};
Calendar.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
Calendar.propTypes = process.env.NODE_ENV !== "production" ? {
  DateTimeFormat: _propTypes2.default.func.isRequired,
  autoOk: _propTypes2.default.bool,
  cancelLabel: _propTypes2.default.node,
  disableYearSelection: _propTypes2.default.bool,
  firstDayOfWeek: _propTypes2.default.number,
  hideCalendarDate: _propTypes2.default.bool,
  initialDate: _propTypes2.default.object,
  locale: _propTypes2.default.string.isRequired,
  maxDate: _propTypes2.default.object,
  minDate: _propTypes2.default.object,
  mode: _propTypes2.default.oneOf(['portrait', 'landscape']),
  okLabel: _propTypes2.default.node,
  onClickCancel: _propTypes2.default.func,
  onClickDay: _propTypes2.default.func,
  onClickOk: _propTypes2.default.func,
  open: _propTypes2.default.bool,
  openToYearSelection: _propTypes2.default.bool,
  shouldDisableDate: _propTypes2.default.func,
  utils: _propTypes2.default.object
} : {};
exports.default = Calendar;