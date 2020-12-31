'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dateUtils = require('./dateUtils');

var _DatePickerDialog = require('./DatePickerDialog');

var _DatePickerDialog2 = _interopRequireDefault(_DatePickerDialog);

var _TextField = require('../TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePicker = function (_Component) {
  (0, _inherits3.default)(DatePicker, _Component);

  function DatePicker() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DatePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DatePicker.__proto__ || (0, _getPrototypeOf2.default)(DatePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      date: undefined
    }, _this.handleAccept = function (date) {
      if (!_this.isControlled()) {
        _this.setState({
          date: date
        });
      }
      if (_this.props.onChange) {
        _this.props.onChange(null, date);
      }
    }, _this.handleFocus = function (event) {
      event.target.blur();
      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    }, _this.handleClick = function (event) {
      if (_this.props.onClick) {
        _this.props.onClick(event);
      }

      if (!_this.props.disabled) {
        setTimeout(function () {
          _this.openDialog();
        }, 0);
      }
    }, _this.formatDate = function (date) {
      if (_this.props.locale) {
        var DateTimeFormat = _this.props.DateTimeFormat || _dateUtils.dateTimeFormat;
        return new DateTimeFormat(_this.props.locale, {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        }).format(date);
      } else {
        return (0, _dateUtils.formatIso)(date);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DatePicker, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        date: this.isControlled() ? this.getControlledDate() : this.props.defaultDate
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.isControlled()) {
        var newDate = this.getControlledDate(nextProps);
        if (!(0, _dateUtils.isEqualDate)(this.state.date, newDate)) {
          this.setState({
            date: newDate
          });
        }
      }
    }
  }, {
    key: 'getDate',
    value: function getDate() {
      return this.state.date;
    }

    /**
     * Open the date-picker dialog programmatically from a parent.
     */

  }, {
    key: 'openDialog',
    value: function openDialog() {
      /**
       * if the date is not selected then set it to new date
       * (get the current system date while doing so)
       * else set it to the currently selected date
       */
      if (this.state.date !== undefined) {
        this.setState({
          dialogDate: this.getDate()
        }, this.refs.dialogWindow.show);
      } else {
        this.setState({
          dialogDate: new Date()
        }, this.refs.dialogWindow.show);
      }
    }

    /**
     * Alias for `openDialog()` for an api consistent with TextField.
     */

  }, {
    key: 'focus',
    value: function focus() {
      this.openDialog();
    }
  }, {
    key: 'isControlled',
    value: function isControlled() {
      return this.props.hasOwnProperty('value');
    }
  }, {
    key: 'getControlledDate',
    value: function getControlledDate() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      if (props.value instanceof Date) {
        return props.value;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          DateTimeFormat = _props.DateTimeFormat,
          autoOk = _props.autoOk,
          cancelLabel = _props.cancelLabel,
          className = _props.className,
          container = _props.container,
          defaultDate = _props.defaultDate,
          dialogContainerStyle = _props.dialogContainerStyle,
          disableYearSelection = _props.disableYearSelection,
          firstDayOfWeek = _props.firstDayOfWeek,
          formatDateProp = _props.formatDate,
          locale = _props.locale,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          mode = _props.mode,
          okLabel = _props.okLabel,
          onDismiss = _props.onDismiss,
          onFocus = _props.onFocus,
          onShow = _props.onShow,
          onClick = _props.onClick,
          openToYearSelection = _props.openToYearSelection,
          shouldDisableDate = _props.shouldDisableDate,
          hideCalendarDate = _props.hideCalendarDate,
          style = _props.style,
          textFieldStyle = _props.textFieldStyle,
          utils = _props.utils,
          other = (0, _objectWithoutProperties3.default)(_props, ['DateTimeFormat', 'autoOk', 'cancelLabel', 'className', 'container', 'defaultDate', 'dialogContainerStyle', 'disableYearSelection', 'firstDayOfWeek', 'formatDate', 'locale', 'maxDate', 'minDate', 'mode', 'okLabel', 'onDismiss', 'onFocus', 'onShow', 'onClick', 'openToYearSelection', 'shouldDisableDate', 'hideCalendarDate', 'style', 'textFieldStyle', 'utils']);
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var formatDate = formatDateProp || this.formatDate;

      return _react2.default.createElement(
        'div',
        { className: className, style: prepareStyles((0, _simpleAssign2.default)({}, style)) },
        _react2.default.createElement(_TextField2.default, (0, _extends3.default)({}, other, {
          onFocus: this.handleFocus,
          onClick: this.handleClick,
          ref: 'input',
          style: textFieldStyle,
          value: this.state.date ? formatDate(this.state.date) : ''
        })),
        _react2.default.createElement(_DatePickerDialog2.default, {
          DateTimeFormat: DateTimeFormat,
          autoOk: autoOk,
          cancelLabel: cancelLabel,
          container: container,
          containerStyle: dialogContainerStyle,
          disableYearSelection: disableYearSelection,
          firstDayOfWeek: firstDayOfWeek,
          initialDate: this.state.dialogDate,
          locale: locale,
          maxDate: maxDate,
          minDate: minDate,
          mode: mode,
          okLabel: okLabel,
          onAccept: this.handleAccept,
          onShow: onShow,
          onDismiss: onDismiss,
          ref: 'dialogWindow',
          shouldDisableDate: shouldDisableDate,
          hideCalendarDate: hideCalendarDate,
          openToYearSelection: openToYearSelection,
          utils: utils
        })
      );
    }
  }]);
  return DatePicker;
}(_react.Component);

DatePicker.defaultProps = {
  autoOk: false,
  container: 'dialog',
  disabled: false,
  disableYearSelection: false,
  firstDayOfWeek: 1,
  hideCalendarDate: false,
  style: {},
  openToYearSelection: false
};
DatePicker.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
DatePicker.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Constructor for date formatting for the specified `locale`.
   * The constructor must follow this specification: ECMAScript Internationalization API 1.0 (ECMA-402).
   * `Intl.DateTimeFormat` is supported by most modern browsers, see http://caniuse.com/#search=intl,
   * otherwise https://github.com/andyearnshaw/Intl.js is a good polyfill.
   *
   * By default, a built-in `DateTimeFormat` is used which supports the 'en-US' `locale`.
   */
  DateTimeFormat: _propTypes2.default.func,
  /**
   * If true, automatically accept and close the picker on select a date.
   */
  autoOk: _propTypes2.default.bool,
  /**
   * Override the default text of the 'Cancel' button.
   */
  cancelLabel: _propTypes2.default.node,
  /**
   * The css class name of the root element.
   */
  className: _propTypes2.default.string,
  /**
   * Used to control how the Date Picker will be displayed when the input field is focused.
   * `dialog` (default) displays the DatePicker as a dialog with a modal.
   * `inline` displays the DatePicker below the input field (similar to auto complete).
   */
  container: _propTypes2.default.oneOf(['dialog', 'inline']),
  /**
   * This is the initial date value of the component.
   * If either `value` or `valueLink` is provided they will override this
   * prop with `value` taking precedence.
   */
  defaultDate: _propTypes2.default.object,
  /**
   * Override the inline-styles of DatePickerDialog's Container element.
   */
  dialogContainerStyle: _propTypes2.default.object,
  /**
   * Disables the year selection in the date picker.
   */
  disableYearSelection: _propTypes2.default.bool,
  /**
   * Disables the DatePicker.
   */
  disabled: _propTypes2.default.bool,
  /**
   * Used to change the first day of week. It varies from
   * Saturday to Monday between different locales.
   * The allowed range is 0 (Sunday) to 6 (Saturday).
   * The default is `1`, Monday, as per ISO 8601.
   */
  firstDayOfWeek: _propTypes2.default.number,
  /**
   * This function is called to format the date displayed in the input field, and should return a string.
   * By default if no `locale` and `DateTimeFormat` is provided date objects are formatted to ISO 8601 YYYY-MM-DD.
   *
   * @param {object} date Date object to be formatted.
   * @returns {any} The formatted date.
   */
  formatDate: _propTypes2.default.func,
  /**
   * Hide date display
   */
  hideCalendarDate: _propTypes2.default.bool,
  /**
   * Locale used for formatting the `DatePicker` date strings. Other than for 'en-US', you
   * must provide a `DateTimeFormat` that supports the chosen `locale`.
   */
  locale: _propTypes2.default.string,
  /**
   * The ending of a range of valid dates. The range includes the endDate.
   * The default value is current date + 100 years.
   */
  maxDate: _propTypes2.default.object,
  /**
   * The beginning of a range of valid dates. The range includes the startDate.
   * The default value is current date - 100 years.
   */
  minDate: _propTypes2.default.object,
  /**
   * Tells the component to display the picker in portrait or landscape mode.
   */
  mode: _propTypes2.default.oneOf(['portrait', 'landscape']),
  /**
   * Override the default text of the 'OK' button.
   */
  okLabel: _propTypes2.default.node,
  /**
   * Callback function that is fired when the date value changes.
   *
   * @param {null} null Since there is no particular event associated with the change,
   * the first argument will always be null.
   * @param {object} date The new date.
   */
  onChange: _propTypes2.default.func,
  /**
   * Callback function that is fired when a click event occurs on the Date Picker's `TextField`.
   *
   * @param {object} event Click event targeting the `TextField`.
   */
  onClick: _propTypes2.default.func,
  /**
   * Callback function that is fired when the Date Picker's dialog is dismissed.
   */
  onDismiss: _propTypes2.default.func,
  /**
   * Callback function that is fired when the Date Picker's `TextField` gains focus.
   */
  onFocus: _propTypes2.default.func,
  /**
   * Callback function that is fired when the Date Picker's dialog is shown.
   */
  onShow: _propTypes2.default.func,
  /**
   * If true sets the datepicker to open to year selection first.
   */
  openToYearSelection: _propTypes2.default.bool,
  /**
   * Callback function used to determine if a day's entry should be disabled on the calendar.
   *
   * @param {object} day Date object of a day.
   * @returns {boolean} Indicates whether the day should be disabled.
   */
  shouldDisableDate: _propTypes2.default.func,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object,
  /**
   * Override the inline-styles of DatePicker's TextField element.
   */
  textFieldStyle: _propTypes2.default.object,
  /**
   * This object should contain methods needed to build the calendar system.
   *
   * Useful for building a custom calendar system. Refer to the
   * [source code](https://github.com/mui-org/material-ui/blob/v0.x/src/DatePicker/dateUtils.js)
   * and an [example implementation](https://github.com/alitaheri/material-ui-persian-date-picker-utils)
   * for more information.
   */
  utils: _propTypes2.default.object,
  /**
   * Sets the date for the Date Picker programmatically.
   */
  value: _propTypes2.default.object
} : {};
exports.default = DatePicker;