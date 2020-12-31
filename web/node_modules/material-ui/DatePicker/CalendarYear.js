'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _YearButton = require('./YearButton');

var _YearButton2 = _interopRequireDefault(_YearButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CalendarYear = function (_Component) {
  (0, _inherits3.default)(CalendarYear, _Component);

  function CalendarYear() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, CalendarYear);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CalendarYear.__proto__ || (0, _getPrototypeOf2.default)(CalendarYear)).call.apply(_ref, [this].concat(args))), _this), _this.handleClickYear = function (event, year) {
      if (_this.props.onClickYear) {
        _this.props.onClickYear(event, year);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(CalendarYear, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scrollToSelectedYear();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.scrollToSelectedYear();
    }
  }, {
    key: 'getYears',
    value: function getYears() {
      var _props = this.props,
          DateTimeFormat = _props.DateTimeFormat,
          locale = _props.locale,
          minDate = _props.minDate,
          maxDate = _props.maxDate,
          selectedDate = _props.selectedDate,
          utils = _props.utils;


      var minYear = utils.getYear(minDate);
      var maxYear = utils.getYear(maxDate);
      var years = [];

      for (var year = minYear; year <= maxYear; year++) {
        var selected = utils.getYear(selectedDate) === year;
        var selectedProps = {};
        if (selected) {
          selectedProps.ref = 'selectedYearButton';
        }

        var yearFormated = new DateTimeFormat(locale, {
          year: 'numeric'
        }).format(utils.setYear(selectedDate, year));

        var yearButton = _react2.default.createElement(
          _YearButton2.default,
          (0, _extends3.default)({
            key: 'yb' + year,
            onClick: this.handleClickYear,
            selected: selected,
            year: year,
            utils: utils
          }, selectedProps),
          yearFormated
        );

        years.push(yearButton);
      }

      return years;
    }
  }, {
    key: 'scrollToSelectedYear',
    value: function scrollToSelectedYear() {
      if (this.refs.selectedYearButton === undefined) {
        return;
      }

      var container = _reactDom2.default.findDOMNode(this);
      var yearButtonNode = _reactDom2.default.findDOMNode(this.refs.selectedYearButton);

      var containerHeight = container.clientHeight;
      var yearButtonNodeHeight = yearButtonNode.clientHeight || 32;

      var scrollYOffset = yearButtonNode.offsetTop + yearButtonNodeHeight / 2 - containerHeight / 2;
      container.scrollTop = scrollYOffset;
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$muiTheme = this.context.muiTheme,
          prepareStyles = _context$muiTheme.prepareStyles,
          calendarYearBackgroundColor = _context$muiTheme.datePicker.calendarYearBackgroundColor;


      var styles = {
        root: {
          backgroundColor: calendarYearBackgroundColor,
          height: 'inherit',
          lineHeight: '35px',
          overflowX: 'hidden',
          overflowY: 'scroll',
          position: 'relative'
        },
        child: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100%'
        }
      };

      return _react2.default.createElement(
        'div',
        { style: prepareStyles(styles.root) },
        _react2.default.createElement(
          'div',
          { style: prepareStyles(styles.child) },
          this.getYears()
        )
      );
    }
  }]);
  return CalendarYear;
}(_react.Component);

CalendarYear.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
CalendarYear.propTypes = process.env.NODE_ENV !== "production" ? {
  DateTimeFormat: _propTypes2.default.func.isRequired,
  locale: _propTypes2.default.string.isRequired,
  maxDate: _propTypes2.default.object.isRequired,
  minDate: _propTypes2.default.object.isRequired,
  onClickYear: _propTypes2.default.func,
  selectedDate: _propTypes2.default.object.isRequired,
  utils: _propTypes2.default.object.isRequired,
  wordings: _propTypes2.default.object
} : {};
exports.default = CalendarYear;