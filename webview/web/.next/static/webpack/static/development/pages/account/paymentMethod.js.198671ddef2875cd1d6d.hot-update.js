webpackHotUpdate("static\\development\\pages\\account\\paymentMethod.js",{

/***/ "./components/ScrollMenu/ScrollMenu.js":
/*!*********************************************!*\
  !*** ./components/ScrollMenu/ScrollMenu.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Tabs */ "./node_modules/@material-ui/core/esm/Tabs/index.js");
/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Tab */ "./node_modules/@material-ui/core/esm/Tab/index.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _static_css_components_ScrollMenu_ScrollMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../static/css/components/ScrollMenu/ScrollMenu */ "./static/css/components/ScrollMenu/ScrollMenu.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "./node_modules/@material-ui/core/styles/withStyles.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");
/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(querystring__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











function a11yProps(index, res) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

class ScrollMenu extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "controllerUrl", url => {
      next_router__WEBPACK_IMPORTED_MODULE_8___default.a.push(url);
    });

    _defineProperty(this, "handleChange", (event, newValue) => {
      this.setState({
        value: newValue
      });
    });

    this.state = {
      value: props.indexCat ? parseInt(props.indexCat) : 0
    };
  }

  render() {
    const {
      classes,
      categories,
      gps,
      mode,
      extraParams
    } = this.props;
    const {
      value
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        maxWidth: '100%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_2__["default"], {
      orientation: "horizontal",
      variant: "scrollable",
      value: value,
      onChange: this.handleChange,
      "aria-label": "scrollable force tabs",
      scrollButtons: "on",
      classes: {
        indicator: classes.scrollMenuIndicator
      }
    }, categories ? categories.map((res, index) => {
      let url = mode === 'account' ? '/account' + res.url + '?' + querystring__WEBPACK_IMPORTED_MODULE_7___default.a.stringify({
        indexAccount: index
      }) : mode === 'profile' ? '/profile' + res.url + '?' + querystring__WEBPACK_IMPORTED_MODULE_7___default.a.stringify({ ...extraParams,
        indexAccount: index
      }) : mode === 'faq' ? res.url + '?' + 'indexFaq=' + index : '/search?search=1&category=' + res._id + (gps ? '&gps=' + JSON.stringify(gps) : '') + '&indexCat=' + index;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({
        key: index,
        label: res.label,
        className: classes.scrollMenuTab
      }, a11yProps(index), {
        onClick: () => this.controllerUrl(url)
      }));
    }) : null)));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6___default()(_static_css_components_ScrollMenu_ScrollMenu__WEBPACK_IMPORTED_MODULE_5__["default"])(ScrollMenu));

/***/ }),

/***/ "./hoc/Layout/TrustAndSecurity/TrustAndSecurity.js":
/*!*********************************************************!*\
  !*** ./hoc/Layout/TrustAndSecurity/TrustAndSecurity.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _material_ui_icons_AlarmOn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/icons/AlarmOn */ "./node_modules/@material-ui/icons/AlarmOn.js");
/* harmony import */ var _material_ui_icons_AlarmOn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_AlarmOn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_icons_InsertEmoticon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/InsertEmoticon */ "./node_modules/@material-ui/icons/InsertEmoticon.js");
/* harmony import */ var _material_ui_icons_InsertEmoticon__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_InsertEmoticon__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_icons_VerifiedUser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/icons/VerifiedUser */ "./node_modules/@material-ui/icons/VerifiedUser.js");
/* harmony import */ var _material_ui_icons_VerifiedUser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_VerifiedUser__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_icons_Textsms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/icons/Textsms */ "./node_modules/@material-ui/icons/Textsms.js");
/* harmony import */ var _material_ui_icons_Textsms__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Textsms__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/index.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "./node_modules/@material-ui/core/styles/withStyles.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _static_css_components_TrustAndSecurity_TrustAndSecurity__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../static/css/components/TrustAndSecurity/TrustAndSecurity */ "./static/css/components/TrustAndSecurity/TrustAndSecurity.js");
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Hidden */ "./node_modules/@material-ui/core/esm/Hidden/index.js");











class TrustAndSecurity extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        title: 'Réservation en instantané',
        text: 'Avec un délai de prévenance bien sûr ;)',
        icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_AlarmOn__WEBPACK_IMPORTED_MODULE_2___default.a, {
          fontSize: "large"
        })
      }, {
        title: 'Heureux ou remboursé',
        text: 'Ça arrive à tout le monde de se tromper',
        icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_InsertEmoticon__WEBPACK_IMPORTED_MODULE_3___default.a, {
          fontSize: "large"
        })
      }, {
        title: 'Paiement 100% sécurisé',
        text: 'Par la Nasa et le Pentagone',
        icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_VerifiedUser__WEBPACK_IMPORTED_MODULE_4___default.a, {
          fontSize: "large"
        })
      }, {
        title: 'Notre équipe',
        text: 'Toujours à votre écoute ',
        icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Textsms__WEBPACK_IMPORTED_MODULE_5___default.a, {
          fontSize: "large"
        })
      }]
    };
  }

  render() {
    const {
      items
    } = this.state;
    const {
      classes
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.trustAndSecurityMainContainer
    }, items.map((res, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      key: index,
      className: classes.trustAndSecurityContent
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_9__["default"], {
      only: ['xs']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, res.icon)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        marginLeft: '3vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, res.title))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__["default"], null, res.text))))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_7___default()(_static_css_components_TrustAndSecurity_TrustAndSecurity__WEBPACK_IMPORTED_MODULE_8__["default"])(TrustAndSecurity));

/***/ })

})
//# sourceMappingURL=paymentMethod.js.198671ddef2875cd1d6d.hot-update.js.map