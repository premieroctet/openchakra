webpackHotUpdate("static\\development\\pages\\faq\\home.js",{

/***/ "./pages/faq/home.js":
/*!***************************!*\
  !*** ./pages/faq/home.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _hoc_Layout_Faq_HeaderFaq__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hoc/Layout/Faq/HeaderFaq */ "./hoc/Layout/Faq/HeaderFaq.js");
/* harmony import */ var _hoc_Layout_About_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hoc/Layout/About/Header */ "./hoc/Layout/About/Header.js");
/* harmony import */ var _hoc_Layout_About_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hoc/Layout/About/Footer */ "./hoc/Layout/About/Footer.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _components_Link_Link__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Link/Link */ "./components/Link/Link.js");
/* harmony import */ var _material_ui_core_Accordion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Accordion */ "./node_modules/@material-ui/core/esm/Accordion/index.js");
/* harmony import */ var _material_ui_core_AccordionSummary__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/AccordionSummary */ "./node_modules/@material-ui/core/esm/AccordionSummary/index.js");
/* harmony import */ var _material_ui_core_AccordionDetails__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/AccordionDetails */ "./node_modules/@material-ui/core/esm/AccordionDetails/index.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/index.js");
/* harmony import */ var _material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/ExpandMore */ "./node_modules/@material-ui/icons/ExpandMore.js");
/* harmony import */ var _material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utils/i18n */ "./utils/i18n.js");
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_utils_i18n__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/TextField */ "./node_modules/@material-ui/core/esm/TextField/index.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var _static_css_pages_faq_home__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../static/css/pages/faq/home */ "./static/css/pages/faq/home.js");
/* harmony import */ var _material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/core/InputAdornment */ "./node_modules/@material-ui/core/esm/InputAdornment/index.js");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/core/IconButton */ "./node_modules/@material-ui/core/esm/IconButton/index.js");
/* harmony import */ var _material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/icons/Visibility */ "./node_modules/@material-ui/icons/Visibility.js");
/* harmony import */ var _material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _material_ui_icons_VisibilityOff__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/icons/VisibilityOff */ "./node_modules/@material-ui/icons/VisibilityOff.js");
/* harmony import */ var _material_ui_icons_VisibilityOff__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_VisibilityOff__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _material_ui_core_Input__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @material-ui/core/Input */ "./node_modules/@material-ui/core/esm/Input/index.js");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @material-ui/icons/Close */ "./node_modules/@material-ui/icons/Close.js");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_21__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
























class Home extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "filteredFaq", () => {
      var {
        alfredFaq,
        faq,
        search
      } = this.state;
      var faqs = alfredFaq ? faq['alfred'] : faq['client'];

      if (search) {
        search = search.toLowerCase();
        const allFaqs = { ...faq['alfred'],
          ...faq['client']
        };
        var res = {};
        Object.keys(allFaqs).forEach(cat => {
          if (cat.toLowerCase().includes(search)) {
            res[cat] = allFaqs[cat];
          } else allFaqs[cat].forEach(topic => {
            if (topic.title.toLowerCase().includes(search) || topic.contents.toLowerCase().includes(search)) {
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

    _defineProperty(this, "onSearchChange", ev => {
      this.setState({
        search: ev.target.value
      });
    });

    _defineProperty(this, "onSearchClear", () => {
      this.setState({
        search: ''
      });
    });

    this.state = {
      faq: null,
      alfredFaq: false,
      search: ''
    };
  }

  componentDidMount() {
    this.setState({
      faq: _utils_i18n__WEBPACK_IMPORTED_MODULE_12__["FAQ"],
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hoc_Layout_About_Header__WEBPACK_IMPORTED_MODULE_3__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      container: true,
      className: classes.menuContainer
    }, searching ? null : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.logoContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        paddingRight: '25px'
      },
      onClick: () => this.setAlfred(false)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.linkBloc
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      title: 'star',
      alt: 'star',
      style: {
        margin: '0 auto',
        paddingBottom: '16px'
      },
      src: "/static/assets/faq/star.svg"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__["default"], {
      className: classes.linkText,
      style: {
        fontWeight: alfredFaq ? 'normal' : 'bold'
      }
    }, "Je suis client"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.linkBloc,
      onClick: () => this.setAlfred(true)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      title: 'ampoulelogo',
      alt: 'ampoulelogo',
      style: {
        margin: '0 auto',
        width: '30px',
        paddingBottom: '10px'
      },
      src: "/static/assets/faq/amp.svg"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__["default"], {
      className: classes.linkText,
      style: {
        fontWeight: alfredFaq ? 'bold' : 'normal'
      }
    }, "Je suis Alfred")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Input__WEBPACK_IMPORTED_MODULE_20__["default"], {
      id: "standard-with-placeholder",
      label: "Recherche",
      placeholder: "Recherche",
      style: {
        width: '100%'
      },
      type: "text",
      value: search,
      onChange: this.onSearchChange,
      endAdornment: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_16__["default"], {
        position: "end"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_17__["default"], {
        "aria-label": "toggle password visibility",
        onClick: this.onSearchClear,
        disabled: !searching
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_21___default.a, null)))
    }))), Object.keys(filteredFaqs).map(category => {
      const items = filteredFaqs[category];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Accordion__WEBPACK_IMPORTED_MODULE_7__["default"], {
        key: category
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_AccordionSummary__WEBPACK_IMPORTED_MODULE_8__["default"], {
        expandIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_11___default.a, null)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__["default"], null, category)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_AccordionDetails__WEBPACK_IMPORTED_MODULE_9__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        container: true
      }, items.map(i => {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Accordion__WEBPACK_IMPORTED_MODULE_7__["default"], {
          key: i.title
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_AccordionSummary__WEBPACK_IMPORTED_MODULE_8__["default"], {
          expandIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_11___default.a, null)
        }, i.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_AccordionDetails__WEBPACK_IMPORTED_MODULE_9__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          dangerouslySetInnerHTML: {
            __html: i.contents
          }
        })));
      }))));
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hoc_Layout_About_Footer__WEBPACK_IMPORTED_MODULE_4__["default"], null));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["withStyles"])(_static_css_pages_faq_home__WEBPACK_IMPORTED_MODULE_15__["default"])(Home));

/***/ })

})
//# sourceMappingURL=home.js.f21dec48e9655856653e.hot-update.js.map