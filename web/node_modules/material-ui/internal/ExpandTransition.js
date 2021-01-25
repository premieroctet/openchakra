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

var _TransitionGroup = require('react-transition-group/TransitionGroup');

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _ExpandTransitionChild = require('./ExpandTransitionChild');

var _ExpandTransitionChild2 = _interopRequireDefault(_ExpandTransitionChild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ExpandTransition = function (_Component) {
  (0, _inherits3.default)(ExpandTransition, _Component);

  function ExpandTransition() {
    (0, _classCallCheck3.default)(this, ExpandTransition);
    return (0, _possibleConstructorReturn3.default)(this, (ExpandTransition.__proto__ || (0, _getPrototypeOf2.default)(ExpandTransition)).apply(this, arguments));
  }

  (0, _createClass3.default)(ExpandTransition, [{
    key: 'renderChildren',
    value: function renderChildren(children) {
      var _props = this.props,
          enterDelay = _props.enterDelay,
          transitionDelay = _props.transitionDelay,
          transitionDuration = _props.transitionDuration,
          expandTransitionChildStyle = _props.expandTransitionChildStyle;

      return _react2.default.Children.map(children, function (child) {
        return _react2.default.createElement(
          _ExpandTransitionChild2.default,
          {
            enterDelay: enterDelay,
            transitionDelay: transitionDelay,
            transitionDuration: transitionDuration,
            key: child.key,
            style: expandTransitionChildStyle
          },
          child
        );
      }, this);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          enterDelay = _props2.enterDelay,
          loading = _props2.loading,
          open = _props2.open,
          style = _props2.style,
          transitionDelay = _props2.transitionDelay,
          transitionDuration = _props2.transitionDuration,
          expandTransitionChildStyle = _props2.expandTransitionChildStyle,
          other = (0, _objectWithoutProperties3.default)(_props2, ['children', 'enterDelay', 'loading', 'open', 'style', 'transitionDelay', 'transitionDuration', 'expandTransitionChildStyle']);
      var prepareStyles = this.context.muiTheme.prepareStyles;


      var mergedRootStyles = (0, _simpleAssign2.default)({}, {
        position: 'relative',
        overflow: 'hidden',
        height: 'auto'
      }, style);

      var newChildren = loading ? [] : this.renderChildren(children);

      return _react2.default.createElement(
        _TransitionGroup2.default,
        (0, _extends3.default)({
          style: prepareStyles(mergedRootStyles),
          component: 'div'
        }, other),
        open && newChildren
      );
    }
  }]);
  return ExpandTransition;
}(_react.Component);

ExpandTransition.defaultProps = {
  enterDelay: 0,
  transitionDelay: 0,
  transitionDuration: 450,
  loading: false,
  open: false
};
ExpandTransition.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
ExpandTransition.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes2.default.node,
  enterDelay: _propTypes2.default.number,
  expandTransitionChildStyle: _propTypes2.default.object,
  loading: _propTypes2.default.bool,
  open: _propTypes2.default.bool,
  style: _propTypes2.default.object,
  transitionDelay: _propTypes2.default.number,
  transitionDuration: _propTypes2.default.number
} : {};
exports.default = ExpandTransition;