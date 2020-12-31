webpackHotUpdate("static\\development\\pages\\profile\\about.js",{

/***/ "./components/ListAlfredConditions/ListAlfredConditions.js":
/*!*****************************************************************!*\
  !*** ./components/ListAlfredConditions/ListAlfredConditions.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _InfoWithPics_InfoWithPics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../InfoWithPics/InfoWithPics */ "./components/InfoWithPics/InfoWithPics.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





class ListAlfredConditions extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      columnsXl,
      columnsLG,
      columnsMD,
      columnsSm,
      columnsXS,
      wrapperComponentProps
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      container: true,
      style: {
        padding: '1%',
        display: 'flex'
      }
    }, wrapperComponentProps ? Object.keys(wrapperComponentProps).map((res, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      item: true,
      xl: columnsXl,
      lg: columnsLG,
      md: columnsMD,
      sm: columnsSm,
      xs: columnsXS,
      key: index
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_InfoWithPics_InfoWithPics__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, this.props, {
      data: wrapperComponentProps[res]
    })))) : null);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ListAlfredConditions);

/***/ }),

/***/ "./static/css/components/ListAlfredConditions/ListAlfredConditions.js":
false

})
//# sourceMappingURL=about.js.29aef90c9b61a298d2f4.hot-update.js.map