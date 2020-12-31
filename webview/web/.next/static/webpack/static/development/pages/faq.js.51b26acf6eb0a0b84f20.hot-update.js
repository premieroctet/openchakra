webpackHotUpdate("static\\development\\pages\\faq.js",{

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

/***/ }),

/***/ "./pages/faq.js":
/*!**********************!*\
  !*** ./pages/faq.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_Accordion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Accordion */ "./node_modules/@material-ui/core/esm/Accordion/index.js");
/* harmony import */ var _material_ui_core_AccordionSummary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/AccordionSummary */ "./node_modules/@material-ui/core/esm/AccordionSummary/index.js");
/* harmony import */ var _material_ui_core_AccordionDetails__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/AccordionDetails */ "./node_modules/@material-ui/core/esm/AccordionDetails/index.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/index.js");
/* harmony import */ var _material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/ExpandMore */ "./node_modules/@material-ui/icons/ExpandMore.js");
/* harmony import */ var _material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/i18n */ "./utils/i18n.js");
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_utils_i18n__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _static_css_pages_faq__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../static/css/pages/faq */ "./static/css/pages/faq.js");
/* harmony import */ var _hoc_Layout_LayoutFaq__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../hoc/Layout/LayoutFaq */ "./hoc/Layout/LayoutFaq.js");
/* harmony import */ var _hoc_Layout_Faq_NeedMoreFaq__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../hoc/Layout/Faq/NeedMoreFaq */ "./hoc/Layout/Faq/NeedMoreFaq.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














class Home extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "filteredFaq", () => {
      const matches = (search_arr, text) => {
        return search_arr.every(s => text.toLowerCase().includes(s));
      };

      var {
        alfredFaq,
        faq,
        search
      } = this.state;
      var faqs = alfredFaq ? faq['alfred'] : faq['client'];

      if (search) {
        search = search.toLowerCase().split(' ').map(s => s.trim()).filter(s => s);
        const allFaqs = { ...faq['alfred'],
          ...faq['client']
        };
        var res = {};
        Object.keys(allFaqs).forEach(cat => {
          if (cat.toLowerCase().includes(search)) {
            res[cat] = allFaqs[cat];
          } else allFaqs[cat].forEach(topic => {
            if (matches(search, topic.title) || matches(search, topic.contents)) {
              if (!res[cat]) {
                res[cat] = [];
              }

              res[cat].push(topic);
            }
          });
        });
        faqs = res;
      }

      return faqs;
    });

    _defineProperty(this, "setAlfred", alfred => {
      this.setState({
        alfredFaq: alfred
      });
    });

    _defineProperty(this, "onSearchClear", () => {
      this.setState({
        search: ''
      });
    });

    _defineProperty(this, "onSearchChange", () => {
      let state = this.child.current.state;
      this.setState({
        search: state.search
      });
    });

    this.child = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.state = {
      faq: null,
      alfredFaq: false
    };
  }

  componentDidMount() {
    this.setState({
      faq: _utils_i18n__WEBPACK_IMPORTED_MODULE_8__["FAQ"],
      alfredFaq: false
    });
  }

  render() {
    const {
      classes
    } = this.props;
    const {
      faq,
      alfredFaq,
      search
    } = this.state;

    if (!faq) {
      return null;
    }

    const searching = Boolean(search);
    const filteredFaqs = this.filteredFaq();
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hoc_Layout_LayoutFaq__WEBPACK_IMPORTED_MODULE_10__["default"], {
      onSearchChange: this.onSearchChange,
      ref: this.child,
      callClearFunction: this.onSearchClear
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      container: true,
      className: classes.menuContainer
    }, searching ? null : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.logoContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      onClick: () => this.setAlfred(false),
      className: classes.blockContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.linkBloc
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      title: 'star',
      alt: 'star',
      width: 50,
      height: 50,
      src: "/static/assets/faq/star.svg"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__["default"], {
      className: classes.linkText,
      style: {
        fontWeight: alfredFaq ? 'normal' : 'bold'
      }
    }, "Je suis client")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.blockContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.linkBloc,
      onClick: () => this.setAlfred(true)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      title: 'ampoulelogo',
      alt: 'ampoulelogo',
      width: 50,
      height: 50,
      src: "/static/assets/faq/amp.svg"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__["default"], {
      className: classes.linkText,
      style: {
        fontWeight: alfredFaq ? 'bold' : 'normal'
      }
    }, "Je suis Alfred")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        marginTop: '10vh'
      }
    }, Object.keys(filteredFaqs).map(category => {
      const items = filteredFaqs[category];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Accordion__WEBPACK_IMPORTED_MODULE_3__["default"], {
        key: category
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_AccordionSummary__WEBPACK_IMPORTED_MODULE_4__["default"], {
        expandIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_7___default.a, null)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__["default"], null, category)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_AccordionDetails__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        container: true
      }, items.map(i => {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Accordion__WEBPACK_IMPORTED_MODULE_3__["default"], {
          key: i.title
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_AccordionSummary__WEBPACK_IMPORTED_MODULE_4__["default"], {
          expandIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_7___default.a, null)
        }, i.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_AccordionDetails__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          dangerouslySetInnerHTML: {
            __html: i.contents
          }
        })));
      }))));
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        marginTop: '10vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hoc_Layout_Faq_NeedMoreFaq__WEBPACK_IMPORTED_MODULE_11__["default"], null))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(_static_css_pages_faq__WEBPACK_IMPORTED_MODULE_9__["default"])(Home));

/***/ })

})
//# sourceMappingURL=faq.js.51b26acf6eb0a0b84f20.hot-update.js.map