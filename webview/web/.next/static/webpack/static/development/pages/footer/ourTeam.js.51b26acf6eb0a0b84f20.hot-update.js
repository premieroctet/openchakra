webpackHotUpdate("static\\development\\pages\\footer\\ourTeam.js",{

/***/ "./hoc/Layout/LayoutFaq.js":
/*!*********************************!*\
  !*** ./hoc/Layout/LayoutFaq.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "./node_modules/@material-ui/core/styles/withStyles.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _static_css_components_Layout_LayoutFaq_LayoutFaq__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../static/css/components/Layout/LayoutFaq/LayoutFaq */ "./static/css/components/Layout/LayoutFaq/LayoutFaq.js");
/* harmony import */ var _About_Header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./About/Header */ "./hoc/Layout/About/Header.js");
/* harmony import */ var _About_Footer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./About/Footer */ "./hoc/Layout/About/Footer.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class LayoutFaq extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "sendSearch", () => {
      let state = this.child.current.state;
      this.setState({
        search: state.search
      }, () => this.props.onSearchChange());
    });

    _defineProperty(this, "callClearFunction", () => {
      this.setState({
        search: ''
      }, () => this.props.callClearFunction());
    });

    this.child = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.state = {
      becomeAlfredPage: false,
      search: ''
    };
  }

  componentDidMount() {
    if (next_router__WEBPACK_IMPORTED_MODULE_6___default.a.pathname === '/footer/becomeAlfred') {
      this.setState({
        becomeAlfredPage: true
      });
    }
  }

  render() {
    const {
      classes,
      index,
      children
    } = this.props;
    const {
      becomeAlfredPage
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.mainContainerLayoutFaq
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_About_Header__WEBPACK_IMPORTED_MODULE_4__["default"], {
      ref: this.child,
      index: index,
      search: this.sendSearch,
      clearFuntion: this.callClearFunction
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: becomeAlfredPage ? classes.becomeAlfredPageContainer : classes.childrenContainer
    }, children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.footerContainerFaq
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_About_Footer__WEBPACK_IMPORTED_MODULE_5__["default"], null)));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_2___default()(_static_css_components_Layout_LayoutFaq_LayoutFaq__WEBPACK_IMPORTED_MODULE_3__["default"])(LayoutFaq));

/***/ })

})
//# sourceMappingURL=ourTeam.js.51b26acf6eb0a0b84f20.hot-update.js.map