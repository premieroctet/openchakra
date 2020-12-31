"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = hoverWorkaround;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _withStyles = _interopRequireDefault(require("@material-ui/core/styles/withStyles"));

var _classnames = _interopRequireDefault(require("classnames"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var styles = {
  _modalRoot: {
    pointerEvents: 'none'
  },
  paper: {
    pointerEvents: 'auto'
  }
};

function hoverWorkaround(Comp) {
  /* eslint-disable react/display-name */
  var HoverWorkaround = React.forwardRef(function (_ref, ref) {
    var _ref$classes = _ref.classes,
        _modalRoot = _ref$classes._modalRoot,
        classes = (0, _objectWithoutProperties2["default"])(_ref$classes, ["_modalRoot"]),
        ModalClasses = _ref.ModalClasses,
        style = _ref.style,
        className = _ref.className,
        props = (0, _objectWithoutProperties2["default"])(_ref, ["classes", "ModalClasses", "style", "className"]);
    return React.createElement(Comp, (0, _extends2["default"])({
      ref: ref,
      classes: classes,
      className: (0, _classnames["default"])(className, _modalRoot),
      style: _objectSpread({
        pointerEvents: 'none'
      }, style)
    }, props));
  });
  return (0, _withStyles["default"])(styles)(HoverWorkaround);
}