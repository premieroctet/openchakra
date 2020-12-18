webpackHotUpdate("static\\development\\pages\\cgu.js",{

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
      }) : '/search?search=1&category=' + res._id + (gps ? '&gps=' + JSON.stringify(gps) : '') + '&indexCat=' + index;
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

/***/ "./hoc/Layout/Footer/Footer.js":
/*!*************************************!*\
  !*** ./hoc/Layout/Footer/Footer.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/index.js");
/* harmony import */ var _components_Link_Link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/Link/Link */ "./components/Link/Link.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_icons_Facebook__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/icons/Facebook */ "./node_modules/@material-ui/icons/Facebook.js");
/* harmony import */ var _material_ui_icons_Facebook__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Facebook__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_icons_Instagram__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/icons/Instagram */ "./node_modules/@material-ui/icons/Instagram.js");
/* harmony import */ var _material_ui_icons_Instagram__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Instagram__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_icons_LinkedIn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/LinkedIn */ "./node_modules/@material-ui/icons/LinkedIn.js");
/* harmony import */ var _material_ui_icons_LinkedIn__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LinkedIn__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_icons_Twitter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/icons/Twitter */ "./node_modules/@material-ui/icons/Twitter.js");
/* harmony import */ var _material_ui_icons_Twitter__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Twitter__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Divider */ "./node_modules/@material-ui/core/esm/Divider/index.js");
/* harmony import */ var _static_css_components_Footer_Footer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../static/css/components/Footer/Footer */ "./static/css/components/Footer/Footer.js");
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Hidden */ "./node_modules/@material-ui/core/esm/Hidden/index.js");













class Footer extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.footerMainStyle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      container: true,
      className: classes.footerMainContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_11__["default"], {
      only: ['xs']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      item: true,
      xl: 3,
      lg: 3,
      className: classes.footerSection
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.footerTitileSection
    }, "\xC0 propos")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
      href: '/footer/apropos'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        marginBottom: '2vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: classes.footerLink
    }, "My Alfred"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
      href: '/footer/ourTeam'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        marginBottom: '2vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: classes.footerLink
    }, "Notre \xE9quipe"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
      href: '/contact'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: classes.footerLink
    }, "Nous contacter"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_11__["default"], {
      only: ['xs']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      item: true,
      xl: 3,
      lg: 3,
      className: classes.footerSection
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.footerTitileSection
    }, "Communaut\xE9")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
      href: '/footer/ourCommunity'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        marginBottom: '2vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: classes.footerLink
    }, "Notre communaut\xE9"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_11__["default"], {
      only: ['xs']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      item: true,
      xl: 3,
      lg: 3,
      className: classes.footerSection
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.footerTitileSection
    }, "Alfred")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
      href: '/footer/becomeAlfred'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        marginBottom: '2vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: classes.footerLink
    }, "Devenir Alfred"))), true ? null : /*#__PURE__*/undefined)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      item: true,
      xl: 3,
      lg: 3,
      className: classes.footerSection
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.footerTitileSection
    }, "Assistance")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
      href: '/footer/addService'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        marginBottom: '2vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: classes.footerLink
    }, "R\xE9server un service"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
      onClick: () => Tawk_API.maximize()
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        marginBottom: '2vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: classes.footerLink
    }, "Parler \xE0 un humain"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
      href: '/faq'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: classes.footerLink
    }, "FAQ"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_11__["default"], {
      only: ['xl', 'lg', 'md']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.footerDividerContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_9__["default"], {
      className: classes.footerDivider
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.footerSocialSection
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.footerTitileSection
    }, "R\xE9seaux sociaux")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.footerSocialContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Facebook__WEBPACK_IMPORTED_MODULE_5___default.a, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Instagram__WEBPACK_IMPORTED_MODULE_6___default.a, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_LinkedIn__WEBPACK_IMPORTED_MODULE_7___default.a, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Twitter__WEBPACK_IMPORTED_MODULE_8___default.a, null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.footerDividerContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_9__["default"], {
      className: classes.footerDivider
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.footerBrandContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.footerBrandStyle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.footerLawContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: classes.footerText
    }, "\xA9 2020 MY ALFRED Corporation. Tous droits r\xE9serv\xE9s")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.footerRgpdButtons
    }, true ? null : /*#__PURE__*/undefined, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.footerLinkInfoContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
      href: '/cgu'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: classes.footerLink
    }, "Informations l\xE9gales"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: classes.footerLink
    }, "Confidentiali\xE9")))))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__["withStyles"])(_static_css_components_Footer_Footer__WEBPACK_IMPORTED_MODULE_10__["default"])(Footer));

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
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, res.icon), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        marginLeft: '3vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, res.title))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__["default"], null, res.text))))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_7___default()(_static_css_components_TrustAndSecurity_TrustAndSecurity__WEBPACK_IMPORTED_MODULE_8__["default"])(TrustAndSecurity));

/***/ }),

/***/ "./pages/cgu.js":
/*!**********************!*\
  !*** ./pages/cgu.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _hoc_Layout_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hoc/Layout/Layout */ "./hoc/Layout/Layout.js");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);






const styles = theme => ({
  hideed: {
    padding: '0 300px',
    marginTop: 80,
    textAlign: 'justify',
    [theme.breakpoints.down('sm')]: {
      padding: '0 20px'
    }
  },
  a: {
    textDecoration: 'none',
    color: '#84A5E0'
  }
});

class CguPage extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hoc_Layout_Layout__WEBPACK_IMPORTED_MODULE_2__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      container: true,
      className: classes.hideed
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      xs: 12,
      style: {
        textAlign: 'center',
        marginBottom: 50
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Conditions g\xE9n\xE9rales d'utilisation et de service de My-Alfred")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: '#84A5E0'
      }
    }, "1 \u2013 Pr\xE9ambule"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Merci d\u2019utiliser la place de march\xE9 d\xE9nomm\xE9e My-Alfred (ci-apr\xE8s d\xE9sign\xE9e la \xAB Place de march\xE9 My-Alfred \xBB), sp\xE9cialis\xE9e dans la mise en relation de particuliers et de professionnels, propri\xE9t\xE9\u0301 de la soci\xE9t\xE9\u0301 My-Alfred, soci\xE9t\xE9\u0301 par actions simplifi\xE9e au capital de 40.000 euros, immatricul\xE9e au Registre du commerce et des soci\xE9t\xE9s de Rouen sous le num\xE9ro SIREN 850 148 867, ayant son si\xE8ge social 42 Rampe Bouvreuil \u2013 76000 Rouen (ci-apr\xE8s \xAB My-Alfred \xBB).")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: '#84A5E0'
      }
    }, "2 \u2013 D\xE9finitions"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "2.1 Les termes \xAB My-Alfred \xBB, \xAB nous \xBB, \xAB nos \xBB utilis\xE9s dans les pr\xE9sentes Conditions g\xE9n\xE9rales d'utilisation et de service de My-Alfred, renvoient \xE0 la soci\xE9t\xE9 par actions simplifi\xE9es My-Alfred. "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "2.2 La Place de march\xE9 My-Alfred est une place de march\xE9 en ligne permettant \xE0 des utilisateurs inscrits, ci-apr\xE8s d\xE9sign\xE9s les \xAB Membres Utilisateurs \xBB, de consommer des services propos\xE9s par des utilisateurs inscrits ayant constitu\xE9 une boutique de services, la \xAB Boutique de services \xBB, ci-apr\xE8s d\xE9sign\xE9s les \xAB Membres Alfred \xBB. L\u2019ensemble des Membres Alfred et des Membres Utilisateurs seront collectivement d\xE9sign\xE9s les \xAB Membres \xBB."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "2.3 Chaque \xAB Boutique de services \xBB est constitu\xE9e d\u2019une ou plusieurs annonces de services, ci-apr\xE8s d\xE9sign\xE9es les \xAB Services de la boutique \xBB. Chaque Service de la boutique peut \xEAtre param\xE9tr\xE9 selon plusieurs crit\xE8res :", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        paddingLeft: '15px'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "\u2022 Chaque Service est constitu\xE9 d\u2019une ou plusieurs prestations propos\xE9es dans le cadre du service, ci-apr\xE8s d\xE9sign\xE9es les \xAB Prestations de service \xBB. La typologie des Prestations de services est propos\xE9e par la Place de march\xE9 My-Alfred Un Membre Alfred peut demander un ajout de prestation de service \xE0 tout moment qui donnera lieu \xE0 une mod\xE9ration des \xE9quipes My-Alfred. Le Membre Alfred fixe seul les caract\xE9ristiques de ses Prestations de service, ses tarifs, son mode de r\xE9mun\xE9ration ainsi que des \xE9ventuelles options li\xE9es \xE0 ses Prestations de service. Par exemple, une Boutique de services pourra comprendre des Services de manucure et de coiffure. Le Service de coiffure pourra \xEAtre d\xE9compos\xE9 en Prestations de service telles que la couleur, la coupe, etc.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "\u2022 Pour chaque Prestation de service, le Membre Alfred pourra choisir le mat\xE9riel qu\u2019il souhaite mettre \xE0 disposition dans le cadre de la r\xE9alisation de sa Prestation de service. L\u2019ensemble des fournitures et du mat\xE9riel est ci-apr\xE8s d\xE9sign\xE9 le \xAB Mat\xE9riel \xBB.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "\u2022 Pour chaque Prestation de service, le Membre Alfred pourra personnaliser ses conditions de r\xE9servation, \xE0 savoir son minimum de r\xE9servation, son d\xE9lai de pr\xE9venance, son p\xE9rim\xE8tre d\u2019intervention etc. L\u2019ensemble de ces conditions seront d\xE9sign\xE9es les \xAB Conditions de r\xE9servation \xBB.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "2.4 La Place de march\xE9 My-Alfred se d\xE9cline autour d\u2019un site web et d\u2019applications mobiles, ci-apr\xE8s collectivement d\xE9sign\xE9s les \xAB Interfaces en ligne \xBB. Elle est constitu\xE9e de diff\xE9rents services offerts par la Place de march\xE9 My-Alfred, ci-apr\xE8s d\xE9sign\xE9s les \xAB Services My-Alfred \xBB. ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: '#84A5E0'
      }
    }, "3 \u2013 Inscription & acceptation des CGUS"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "3.1 Pour devenir Membre de la Place de march\xE9 My-Alfred, les particuliers doivent \xEAtre des personnes physiques \xE2g\xE9es d\u2019au minimum 18 ans ou, s\u2019ils sont \xE2g\xE9s entre 16 et 18 ans, autoris\xE9s par leurs repr\xE9sentants l\xE9gaux. Il peut \xE9galement s\u2019agir d\u2019une personne morale d\xFBment constitu\xE9e et en r\xE8gle selon les lois du pays dans lequel la personne morale est \xE9tablie, ayant la pleine capacit\xE9 de contracter et de s\u2019engager aux termes des pr\xE9sentes. Vous devez, par ailleurs, accepter les pr\xE9sentes Conditions g\xE9n\xE9rales d'utilisation et de service. "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "3.2 Les Conditions g\xE9n\xE9rales d'utilisation et de service de la Place de march\xE9 My-Alfred (ci-apr\xE8s d\xE9sign\xE9es \xAB CGUS \xBB) pr\xE9sentent l\u2019ensemble des droits, obligations et engagements des Membres et de My-Alfred (ci-apr\xE8s d\xE9sign\xE9s collectivement les \xAB Parties \xBB). En vous inscrivant via les Interfaces en ligne de My-Alfred, vous acceptez irr\xE9vocablement l\u2019int\xE9gralit\xE9 de nos CGUS et vous devez vous y conformer. Ainsi, les CGUS vous lient juridiquement \xE0 My-Alfred. Toute notre \xE9quipe se tient \xE0 votre disposition pour r\xE9pondre \xE0 vos questions concernant les CGUS."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "3.3 L\u2019utilisation ou le t\xE9l\xE9chargement de l\u2019application My-Alfred \xE0 partir de l\u2019Apple Store d\u2019Apple n\xE9cessite d\u2019accepter le contrat de licence utilisateur final de l\u2019Application sous licence d\u2019Apple."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "3.4 Les CGUS sont applicables d\xE8s l\u2019inscription d\u2019un Membre jusqu\u2019\xE0 sa r\xE9siliation. Pour r\xE9silier ce contrat, les Membres pourront, \xE0 tout moment, nous envoyer un email qui entra\xEEnera la suppression du compte du Membre. Les Membres sont \xE9galement en mesure de supprimer leur compte My-Alfred depuis le menu \xAB param\xE8tres du compte \xBB."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "3.5 Le Membre qui a la qualit\xE9 de consommateur dispose, en application des articles L. 222-7 et suivants du Code de la consommation, d\u2019un d\xE9lai de r\xE9tractation de quatorze (14) jours calendaires r\xE9volus \xE0 compter de la date de conclusion des CGUS ou de souscription aux Services My-Alfred. Le Membre peut exercer son droit de r\xE9tractation en utilisant le formulaire en ligne accessible depuis le bas de page, en cliquant sur nous contacter ou sur simple email adress\xE9 \xE0 ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: classes.a,
      href: "mailto:hello@my-alfred.io"
    }, "hello@my-alfred.io"), " ou par toute autre d\xE9claration de son choix. Dans ce dernier cas, sa d\xE9claration doit \xEAtre d\xE9nu\xE9e d\u2019ambigu\xEFt\xE9 et exprimer clairement sa volont\xE9 de se r\xE9tracter. L\u2019exercice du droit de r\xE9tractation dans le d\xE9lai vis\xE9 ci-dessus, emporte r\xE9solution des CGUS et/ou de la souscription aux Services My-Alfred de plein droit. L\u2019espace personnel et toutes les informations aff\xE9rentes au Membre sont alors anonymis\xE9s, sous r\xE9serve des stipulations de la politique de protection des donn\xE9es \xE0 caract\xE8re personnel accessible ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: classes.a,
      href: "#"
    }, "ici"), ". Au titre des pr\xE9sentes, le Membre Utilisateur donne son accord expr\xE8s \xE0 ce que My-Alfred lui fournisse les Services My-Alfred (\xE0 savoir notamment la mise en relation avec un ou des Membre(s) Alfred) avant le terme du d\xE9lai de r\xE9tractation. Il en r\xE9sulte que s\u2019il exerce ensuite son droit de r\xE9traction, il sera tenu au paiement proportionnel des services effectivement fournis, conform\xE9ment aux dispositions de l\u2019article L. 222-13 du Code de la consommation."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "3.6 My-Alfred se r\xE9serve le droit de r\xE9silier sans pr\xE9avis les pr\xE9sentes CGUS et de priver un Membre de l\u2019acc\xE8s \xE0 la Place de march\xE9 My-Alfred en cas de non-respect de ses stipulations ou de non-respect des r\xE8gles, lois, obligations fiscales et sociales applicables au Membre.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: '#84A5E0'
      }
    }, "4 \u2013 \xC9tendue des Services My-Alfred"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "4.1 La Place de march\xE9 My-Alfred permet \xE0 des Membres Utilisateurs de consommer des services propos\xE9s par des particuliers ou des professionnels et \xE0 des Membres Alfred de proposer leurs services au travers de la cr\xE9ation de leur propre Boutique de services. Les Prestations de services propos\xE9es par les Membres Alfred doivent \xEAtre licites. Les Membres sont seuls d\xE9cisionnaires de la concr\xE9tisation des r\xE9servations de Services. My-Alfred n\u2019est ni mandataire ni prestataire de services et agit seulement en qualit\xE9 de plateforme de mise en relation."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "4.2 Un Membre Alfred peut publier au sein de sa Boutique de services d\xE9di\xE9e :", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        paddingLeft: '15px'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- les Services propos\xE9s et les types de Prestations r\xE9alis\xE9es dans ce Service, les tarifs associ\xE9s \xE0 chacune des Prestations, un panier minimum de r\xE9servation, un p\xE9rim\xE8tre d\u2019intervention g\xE9ographique associ\xE9 \xE0 chaque Service ;", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- ses disponibilit\xE9s, sur lesquelles il exerce seul un contr\xF4le absolu ;", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- une pr\xE9sentation de ses Services, de lui-m\xEAme ainsi que de ses dipl\xF4mes, son exp\xE9rience ou ses certifications."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Le Membre Alfred est seul responsable de sa Boutique de services et de son contenu."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "4.3 La Place de march\xE9 My-Alfred propose aux Membres Utilisateurs un moteur de recherche leur permettant de trouver des Membres Alfred capables de r\xE9pondre \xE0 leurs besoins de services. La Place de march\xE9 My-Alfred simplifie la mise en relation en indiquant les disponibilit\xE9s des Membres Alfred, les Prestations couvertes dans les Services demand\xE9s, le Mat\xE9riel mis \xE0 disposition par le Membre Alfred ainsi que l\u2019ensemble de ses Conditions de r\xE9servation. Les Membres disposent \xE9galement d\u2019un profil sur lequel ils exercent un contr\xF4le exclusif. La Place de march\xE9 My-Alfred met ainsi \xE0 disposition de ses Membres un outil num\xE9rique afin de simplifier la r\xE9servation et le paiement des Prestations de service des Membres Alfred."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "4.4 Pour ce faire, la Place de march\xE9 My-Alfred s\u2019appuie sur le tiers de confiance MangoPay pour le paiement des Prestations de service. En utilisant ce syst\xE8me de paiement, les Membres acceptent les conditions de MangoPay disponibles ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: classes.a,
      target: "_blank",
      href: "/static/assets/PSP_MANGOPAY_FR.pdf"
    }, "ici"), ". Pour toutes questions et conditions relatives au paiement des Prestations de services, les Membres devront se r\xE9f\xE9rer aux conditions d\u2019utilisation du tiers de confiance MangoPay.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "S\u2019agissant de la r\xE9mun\xE9ration des Membres Alfred, les Membres Utilisateurs confient un mandat d\u2019encaissement de la r\xE9mun\xE9ration convenue avec le Membre Alfred au profit de la Place de march\xE9 My-Alfred, qui a en confi\xE9 l\u2019ex\xE9cution technique \xE0 MangoPay. MangoPay d\xE9pose les fonds re\xE7us du Membre Utilisateur sur un compte d\xE9di\xE9 avant de virer la somme sur le compte bancaire du Membre Alfred, apr\xE8s d\xE9duction des Frais de services revenant \xE0 My-Alfred, conform\xE9ment \xE0 l\u2019article 9 ci-dessous.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Les Membres Utilisateurs reconnaissent et acceptent qu\u2019aucune des sommes ainsi per\xE7ues au nom et pour le compte des Membres Alfred n\u2019emporte droit \xE0 int\xE9r\xEAts. Les Membres acceptent de r\xE9pondre avec diligence \xE0 toute demande de My-Alfred et, plus particuli\xE8rement, de toute autorit\xE9 administrative ou judiciaire comp\xE9tente en particulier en mati\xE8re de pr\xE9vention ou de lutte contre le blanchiment. Notamment, les Membres acceptent de fournir, sur simple demande, tous justificatifs d\u2019adresse ou d\u2019identit\xE9 utile. En l\u2019absence de r\xE9ponse du Membre \xE0 ces demandes, My-Alfred pourra prendre toute mesure qui lui semblera appropri\xE9e notamment le gel des sommes vers\xE9es, la suspension du compte du Membre ou la r\xE9siliation des CGU.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "My Alfred garantit aux Membres que :", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        paddingLeft: '15px'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- les fonds destin\xE9s aux Membres Alfred ne sont d\xE9tenus \xE0 aucun moment par My-Alfred,", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- My Alfred n\u2019a pas acc\xE8s aux donn\xE9es bancaires des Membres, lesquels restent enti\xE8rement s\xE9curis\xE9es chez MangoPay qui n\u2019y a acc\xE8s que pour les besoins de la demande de r\xE8glement concern\xE9e,", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- aucune donn\xE9e autre que celles n\xE9cessaires \xE0 l\u2019ex\xE9cution de la demande de r\xE8glement n\u2019est demand\xE9e aux Membres,", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- les donn\xE9es ne sont ni utilis\xE9es ni consult\xE9es ni stock\xE9es \xE0 des fins autres que l\u2019op\xE9ration demand\xE9e par le Membre Utilisateur.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "4.5 Crit\xE8res de classement des Alfred : Les 20 premiers Alfred sont pr\xE9sent\xE9s au Membre Utilisateur, ce nombre pouvant \xEAtre sup\xE9rieur si plusieurs Alfred proposent le m\xEAme Service et inf\xE9rieur si moins de 20 Alfred proposent une prestation en rapport avec les crit\xE8res de recherche renseign\xE9s. Parmi les Alfred, sont pr\xE9sent\xE9s en priorit\xE9 les Alfred r\xE9pondant aux crit\xE8res de la recherche en termes de mot(s) cl\xE9, disponibilit\xE9(s) et p\xE9rim\xE8tre d\u2019intervention. Parmi les Afred r\xE9pondant \xE0 ces crit\xE8res de recherche, seront pr\xE9sent\xE9s en priorit\xE9, les Alfred les mieux not\xE9s, suivis des Alfred ayant le plus de r\xE9servations, puis les Alfred qui acceptent la r\xE9servation instantan\xE9e, puis les Alfred avec le plus d'exp\xE9rience, puis ceux ayant le plus de certifications, puis les Alfred ayant le d\xE9lai de r\xE9ponse le plus rapide et enfin, les Alfred les plus r\xE9cemment inscrits."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "4.6 My-Alfred n\u2019exerce aucun contr\xF4le sur les Boutiques, Services et Prestations dont seuls les Membres Alfred sont responsables ; My-Alfred n\u2019en garantit donc pas la qualit\xE9, la s\xE9curit\xE9 et la l\xE9galit\xE9."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "4.7 Dans le cadre de la promotion de la Place de march\xE9 My-Alfred et afin de donner plus de visibilit\xE9 aux Boutiques et aux Services des Membres Alfred, les Services ainsi que les Boutiques, leur contenu et tout autre contenu de Membre, rendu public sur la Place de march\xE9 My-Alfred, sont susceptibles d\u2019\xEAtre publi\xE9s sur d\u2019autres sites, d\u2019autres applications, partag\xE9s par email ou encore utilis\xE9s dans le cadre de campagnes publicitaires m\xE9dias ou hors m\xE9dias."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "4.8 My-Alfred peut proc\xE9der \xE0 la v\xE9rification de l\u2019identit\xE9 de ses Membres, notamment pour se conformer \xE0 la r\xE9glementation fiscale. V\xE9rifier l\u2019identit\xE9 des Membres sur internet est complexe, c\u2019est pourquoi My-Alfred d\xE9cline toute responsabilit\xE9 au regard de la confirmation de l\u2019identit\xE9 des Membres de la Place de march\xE9 My-Alfred.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: '#84A5E0'
      }
    }, "5 - Obligations, responsabilit\xE9 et engagements de My-Alfred"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "5.1 My-Alfred met \xE0 disposition la Place de march\xE9 My-Alfred. A ce titre, My-Alfred ne vend, revend, fournit ou contr\xF4le ni les Boutiques de services, ni les Services propos\xE9s sur la Place de march\xE9 My-Alfred. Les Alfred sont seuls responsables de leur Boutique, des contenus, des Services et Prestations associ\xE9s et de leur ex\xE9cution. Les Membres Alfred s\u2019engagent \xE0 r\xE9aliser les Services en personne, n\u2019\xE9tant en aucun cas autoris\xE9s \xE0 sous-traiter la r\xE9alisation de leurs Services. Ainsi, lorsqu\u2019un Membre Utilisateur et un Membre Alfred proc\xE8dent \xE0 une r\xE9servation, un contrat les lie sans que My-Alfred n\u2019y soit li\xE9 de quelconque mani\xE8re."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "5.2 Obligation d\u2019information des Membres Alfred professionnels envers les Membres Utilisateurs : Le Membre Alfred sera tenu de fournir au Membre Utilisateur, \xE0 premi\xE8re demande, tout \xE9l\xE9ment permettant de justifier de sa qualit\xE9 de professionnel (extrait Kbis, num\xE9ro d\u2019immatriculation au Registre du Commerce et des Soci\xE9t\xE9s, fiche INSEE, etc.), que le Membre Utilisateur v\xE9rifiera. Le Membre Alfred garantit en outre \xEAtre qualifi\xE9, comp\xE9tent et disposer de tous les dipl\xF4mes et/ou titres \xE9ventuellement requis pour proposer ses Services. Le Membre Alfred agissant \xE0 titre professionnel doit respecter l'ensemble des r\xE8gles et obligations lui incombant \xE0 ce titre et plus particuli\xE8rement le droit de la consommation (clart\xE9 de l'offre faite au consommateur, information du consommateur, conditions d\u2019annulation, disponibilit\xE9 des Services, droit de r\xE9tractation du consommateur, facturation et vente \xE0 distance, garanties, etc.), du droit des soci\xE9t\xE9s, du droit social, du droit fiscal, de la l\xE9gislation relative aux pratiques commerciales d\xE9loyales, trompeuses ou agressives, qu'il affirme parfaitement conna\xEEtre."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "5.3 Obligations d\u2019information des Membres Alfred consommateurs et non professionnels envers les Membres Utilisateurs : Le Membre devra fournir les informations suivantes :", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        paddingLeft: '15px'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- le prix total du Service propos\xE9, y compris le cas \xE9ch\xE9ant, tous les frais suppl\xE9mentaires exigibles, sur la base du prix propos\xE9 pour les Services dans sa Boutique ;", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- la possibilit\xE9 pour le Membre Utilisateur de se r\xE9tracter ou non ;", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- les dispositions du code civil relatives au droit des obligations et de la responsabilit\xE9 civile applicables \xE0 la relation contractuelle, par l'affichage d'un lien hypertexte.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "5.4 My-Alfred n\u2019est en aucun cas responsable des contenus, de leur v\xE9racit\xE9, leur l\xE9galit\xE9 ou encore de la qualit\xE9 des Boutiques (et de leurs contenus) propos\xE9es par les Membres Alfred. My-Alfred d\xE9cline toute responsabilit\xE9 au regard de l\u2019exactitude de la description des Services, des Membres, des notations, des commentaires ou, plus largement, au regard de tout contenu publi\xE9 par les Membres. My-Alfred n\u2019approuve aucun membre, la mention \u201CMembre v\xE9rif\xE9\u201D indiquant que My-Alfred a proc\xE9d\xE9 \xE0 une simple v\xE9rification des documents d\xE9pos\xE9s par le Membre et ne constituant en aucun cas une garantie de l\u2019identit\xE9 des Membres ou de leur capacit\xE9 \xE0 contracter."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "5.5 My-Alfred n\u2019est aucunement responsable des pannes (internet, t\xE9l\xE9communication) dont il n\u2019a pas le contr\xF4le, conduisant \xE0 une accessibilit\xE9 nulle ou limit\xE9e \xE0 la Place de march\xE9 My-Alfred. Dans le cadre de la maintenance de ses serveurs ou en cas de capacit\xE9 limit\xE9e de ses serveurs, My-Alfred se r\xE9serve le droit de restreindre l\u2019accessibilit\xE9 \xE0 la Plateforme de fa\xE7on temporaire afin de garantir la s\xE9curit\xE9 et la continuit\xE9 de ses serveurs ou d\u2019am\xE9liorer le fonctionnement de la Place de march\xE9."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "5.6 My-Alfred informera ses Membres des modifications majeures intervenues sur la Place de march\xE9."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "5.7 My-Alfred ne pourra \xEAtre consid\xE9r\xE9e comme dirigeant ou contr\xF4lant aucun Membre Alfred, les Alfred agissant pour leur propre compte et leur propre profit. En acceptant les pr\xE9sentes CGUS, les Membres reconnaissent leur totale libert\xE9 et capacit\xE9 de se livrer \xE0 d\u2019autres activit\xE9s et d\u2019exercer d\u2019autres emplois en dehors de la Place de march\xE9."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "5.8 My-Alfred n\u2019entretient aucune relation contractuelle ni aucun lien capitalistique avec aucun des Membres et ne per\xE7oit aucune r\xE9mun\xE9ration autre que celles stipul\xE9es aux pr\xE9sentes \xE0 raison de la mise en relation entre les Membres.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: '#84A5E0'
      }
    }, "6 \u2013 Obligation, responsabilit\xE9 et engagements communs \xE0 tous les Membres"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "6.1 Les Membres ont le devoir de se conformer \xE0 l\u2019ensemble des lois, r\xE8glements, obligations fiscales et sociales et r\xE8gles en vigueur dans le pays o\xF9 ils r\xE9sident ainsi qu\u2019aux pr\xE9sentes CGUS. Ainsi, les Membres s\u2019interdisent formellement :", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        paddingLeft: '15px'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- de reproduire, utiliser ou stocker les informations et contenus pr\xE9sents sur la Place de march\xE9, y compris l\u2019ensemble des informations nominatives qui concernent les Membres ou en portant atteinte \xE0 la vie priv\xE9e des Membres,", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- d\u2019adopter un comportement discriminant envers un Membre, au regard de son origine, son \xE2ge, son sexe, son \xE9tat physique ou mental, son orientation sexuelle, etc.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- d\u2019utiliser la Place de march\xE9 My-Alfred afin de trouver un prestataire sans utiliser la Place de march\xE9 My-Alfred pour proc\xE9der \xE0 la r\xE9servation du service et ce dans le but d\u2019\xE9viter de payer les Frais de services dus My-Alfred ou pour toute autre raison.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- de ternir la r\xE9putation de la marque My-Alfred ou de nuire \xE0 My-Alfred de quelque fa\xE7on que ce soit.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- d\u2019utiliser des processus informatiques permettant de r\xE9cup\xE9rer, d\u2019aspirer, de collecter, d\u2019utiliser et de stocker des informations (y compris l\u2019ensemble des contenus des Membres, de My-Alfred, les donn\xE9es personnelles, etc.).", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- d\u2019utiliser les contenus publi\xE9s sur My-Alfred \xE0 des fins commerciales ou de diffuser des messages \xE0 caract\xE8re commercial en dehors de l\u2019objet de la Place de march\xE9 My-Alfred. Les Membres s\u2019interdisent \xE9galement d\u2019utiliser la Place de march\xE9 My-Alfred afin de recruter ou solliciter des Membres Alfred dans un but autre que la r\xE9servation de ses Services au travers de la Place de march\xE9 y-Alfred (services tiers, recrutement, partenariat, etc.)", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- de d\xE9tourner, copier, endommager, d\xE9coder ou contourner par quelque moyen que ce soit la Place de march\xE9 My-Alfred ou de tenter de nuire \xE0 la Place de march\xE9 My-Alfred, d\u2019en perturber les performances et le bon fonctionnement.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- de tenter de d\xE9chiffrer, d\xE9compiler, d\xE9sassembler la Place de march\xE9 My-Alfred ainsi que toute r\xE9tro-ing\xE9nierie .", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- plus g\xE9n\xE9ralement, de violer ou porter atteinte aux droits de My-Alfred et \xE0 ceux des tiers ."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Tout manquement \xE0 ces r\xE8gles est susceptible d'entra\xEEner la fermeture provisoire ou d\xE9finitive du compte et de l\u2019acc\xE8s \xE0 tout ou partie de la Place de march\xE9 My-Alfred. De plus, dans l\u2019objectif de se conformer aux lois, r\xE8glements, d\xE9cisions des autorit\xE9s judiciaires ou administratives ou si un Membre renseigne son compte, son profil, sa Boutique, ses Services avec des informations erron\xE9es, frauduleuses, inexactes lors de la cr\xE9ation de son compte ou ult\xE9rieurement, My-Alfred se r\xE9serve le droit de ne pas afficher, de supprimer ou de signaler \xE0 un tiers les contenus \xE9manant du Membre concern\xE9, y compris ses notations, commentaires, recommandations, d\u2019annuler ses prochaines r\xE9servations confirm\xE9es, de supprimer temporairement ou d\xE9finitivement le compte du Membre concern\xE9 et, en cas d\u2019infraction grave ou r\xE9p\xE9t\xE9e, de supprimer d\xE9finitivement son acc\xE8s \xE0 la Place de march\xE9 et aux Services My-Alfred."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "6.2 My-Alfred n\u2019exerce aucun contr\xF4le et n\u2019est pas partie prenante aux contrats pass\xE9s sur la Place de march\xE9 My-Alfred. Les Membres s\u2019engagent \xE0 respecter les obligations fiscales li\xE9es \xE0 leur statut et sont seuls redevables des imp\xF4ts et taxes li\xE9s \xE0 leur activit\xE9 sur la Place de march\xE9 My-Alfred. Conform\xE9ment aux dispositions de l\u2019article 242 bis du Code g\xE9n\xE9ral des imp\xF4ts, les Membres re\xE7oivent lors de chacune de leurs transactions sur la Place de march\xE9 My-Alfred, une information claire et loyale sur les obligations sociales et fiscales auxquelles ils doivent se conformer. Les Membres sont d\u2019ores et d\xE9j\xE0 invit\xE9s \xE0 se r\xE9f\xE9rer aux informations figurant :", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        paddingLeft: '15px'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- sur ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: classes.a,
      target: "_blank",
      href: "https://www.impots.gouv.fr"
    }, "www.impots.gouv.fr"), " concernant leurs obligations fiscales et plus particuli\xE8rement la page ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: classes.a,
      target: "_blank",
      href: "https://www.impots.gouv.fr/portail/node/10841"
    }, "https://www.impots.gouv.fr/portail/node/10841"), ".", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- sur ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: classes.a,
      target: "_blank",
      href: "https://www.urssaf.fr"
    }, "www.urssaf.fr"), " concernant leurs obligations sociales et plus particuli\xE8rement la page ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: classes.a,
      target: "_blank",
      href: "https://www.urssaf.fr/portail/home/espaces-dedies/activites-relevant-de-leconomie.htm"
    }, "https://www.urssaf.fr/portail/home/espaces-dedies/activites-relevant-de-leconomie.htm"), "."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "My-Alfred attire l\u2019attention des Membres sur le fait que se pr\xE9senter comme un consommateur ou un non-professionnel alors qu\u2019ils agiraient dans le cadre d\u2019une activit\xE9 professionnelle habituelle ou r\xE9guli\xE8re est susceptible de constituer une pratique commerciale trompeuse, punissable par un emprisonnement de 2 ans et une amende de 300.000 euros, le montant de l\u2019amende pouvant \xEAtre port\xE9, de mani\xE8re proportionn\xE9e aux avantages tir\xE9s du d\xE9lit, \xE0 10 % du chiffre d\u2019affaires moyen annuel ou \xE0 50 % des d\xE9penses engag\xE9es pour la r\xE9alisation de la publicit\xE9 ou de la pratique constituant ce d\xE9lit, en application de l\u2019article L.132-2 du Code de la consommation.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Les Membres Alfred pourront retrouver dans la rubrique \xAB performances \xBB les sommes per\xE7ues \xE0 l\u2019occasion des activit\xE9s r\xE9alis\xE9es au travers de la Place de march\xE9 My-Alfred. Les Membres s\u2019engagent \xE0 d\xE9clarer loyalement aux services des imp\xF4ts et aux organismes sociaux les sommes per\xE7ues au titre des activit\xE9s r\xE9alis\xE9es sur la Place de march\xE9 My-Alfred.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Les Membres d\xE9gagent en cons\xE9quence My-Alfred de toute responsabilit\xE9 et garantissent My-Alfred de toutes les cons\xE9quences d\xE9coulant directement ou indirectement du non-respect de leurs obligations fiscales et sociales.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "En cas de doute, il est recommand\xE9 aux Membres de prendre conseil aupr\xE8s d\u2019un tiers sur les obligations sociales et fiscales d\xE9coulant de leur statut.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: '#84A5E0'
      }
    }, "7 \u2013 Obligation, responsabilit\xE9 et engagements particuliers des Membres Alfred"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "7.1 La Boutique et les Services Chaque Membre Alfred qui d\xE9cide de cr\xE9er une Boutique de services et des Services associ\xE9s doit fournir des informations exactes sur les Services propos\xE9s et les conditions de r\xE9alisation de ces derniers. My-Alfred met \xE0 la disposition de ses Membres Alfred de nombreuses options de param\xE9trage que le Membre Alfred doit compl\xE9ter pour fournir des informations au plus juste. La description du Service, des Prestations r\xE9alis\xE9es au sein de ce service, le Mat\xE9riel fourni, le panier minimum de r\xE9servation, le d\xE9lai de pr\xE9venance, le p\xE9rim\xE8tre d\u2019intervention, les conditions d\u2019annulation ainsi que les disponibilit\xE9s du Membre Alfred sont autant de param\xE8tres de r\xE9servation qui permettent aux Membres Utilisateurs de r\xE9server avec un maximum de transparence. Il appartient aux Membres Alfred de maintenir \xE0 jour leur Boutique, les Services ainsi que leur contenu et leurs disponibilit\xE9s. D\xE8s lors qu\u2019un Service est publi\xE9 dans la Boutique de services du Membre Alfred, ce dernier s\u2019engage \xE0 conc\xE9der de mani\xE8re non exclusive mais \xE0 titre gratuit, au profit de My-Alfred, les droits de propri\xE9t\xE9 intellectuelle permettant la publication des Services et de la Boutique de l\u2019Alfred. Plus pr\xE9cis\xE9ment, les droits de propri\xE9t\xE9 intellectuelle concern\xE9s sont les suivants :", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        paddingLeft: '15px'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "\u2022 droit de reproduire, faire reproduire ou d\u2019autoriser un tiers \xE0 reproduire tout ou partie des contenus / contributions des Membres Alfred ;", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "\u2022 droit de diffuser, repr\xE9senter, faire repr\xE9senter ou diffuser ou encore autoriser un tiers \xE0 diffuser ou repr\xE9senter les contenus et contributions des Membres Alfred ;", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "\u2022 droit de diffuser \xE0 des fins publicitaires et commerciales les contenus et contributions des Membres Alfred."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Ces droits concernent notamment l\u2019ensemble des moyens de communication sur tout support (en ligne, hors ligne) sous toutes formes."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "7.2 Les Membres Alfred fixent le prix de leurs Prestations de services et sont seuls responsables des tarifs appliqu\xE9s. Une fois la r\xE9servation valid\xE9e par le Membre Alfred, ce dernier ne pourra r\xE9clamer un prix diff\xE9rent au Membre Utilisateur qui a choisi de r\xE9server son Service."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "7.3 Les Membres Alfred ont la possibilit\xE9 de publier des photos afin de renforcer l\u2019attractivit\xE9 de leur Boutique ou de leurs Services. Les photos publi\xE9es par les Membres Alfred doivent refl\xE9ter fid\xE8lement la r\xE9alit\xE9 et ne pas avoir pour objectif de duper les Membres Utilisateurs. My-Alfred pourra \xE0 tout moment imposer le nombre d\u2019images, les images, le format, la r\xE9solution, etc."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "7.4 Lorsqu\u2019un Membre Alfred d\xE9cide d\u2019accepter une demande de r\xE9servation de l\u2019un ou de plusieurs de ses Services par un Membre Utilisateur, ces Membres concluent un accord juridiquement contraignant. De ce fait, le Membre Alfred est tenu d\u2019honorer le(s) Service(s) r\xE9serv\xE9(s) conform\xE9ment aux conditions et caract\xE9ristiques du Service tel que d\xE9crit dans sa Boutique. En acceptant la demande de r\xE9servation, les Membres Alfred acceptent de payer les Frais de services r\xE9clam\xE9s par My-Alfred ainsi que les \xE9ventuelles taxes applicables. Les Membres Alfred ont la possibilit\xE9 d\u2019opter pour l\u2019acceptation automatique des r\xE9servations des Membres Utilisateurs. Dans cette hypoth\xE8se, le contrat entre le Membre Alfred et le Membre Utilisateur sera form\xE9 d\xE9finitivement d\xE8s l\u2019\xE9tape r\xE9servation. \xBB"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "7.5 My-Alfred recommande aux Membres Alfred de souscrire une assurance d\xE9di\xE9e ou incluant leur activit\xE9 r\xE9sultant de l\u2019utilisation de la Place de march\xE9 My-Alfred. En aucun cas, My-Alfred ne pourra l\u2019imposer aux Membres dans la mesure o\xF9 My-Alfred ne dirige ni ne contr\xF4le en aucune mani\xE8re l\u2019activit\xE9 des Membres de la Place de march\xE9 My-Alfred."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "7.6 Les Membres Alfred ont le devoir de se conformer \xE0 l\u2019ensemble des lois, r\xE8glements, obligations fiscales et sociales en vigueur dans le pays o\xF9 ils r\xE9sident ainsi qu\u2019aux pr\xE9sentes CGUS. Ainsi, les Membres Alfred s\u2019interdisent formellement :", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        paddingLeft: '15px'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "\u2022 d\u2019enfreindre l\u2019ensemble de la r\xE9glementation, des lois et obligations fiscales et sociales en vigueur dans leur pays de r\xE9sidence,", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "\u2022 de proposer des services ill\xE9gaux, contraires aux normes, aux r\xE8gles, aux bonnes m\u0153urs,", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "\u2022 d\u2019orienter des contenus de sorte \xE0 entra\xEEner la confusion des Membres Utilisateurs tant sur le contenu de la Prestation que sur la Boutique de services.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "7.7 Si un Membre Alfred constate qu\u2019un Membre adopte un comportement inappropri\xE9, en ligne ou hors ligne, ce Membre doit en avertir les autorit\xE9s comp\xE9tentes ainsi que My-Alfred afin que les mesures appropri\xE9es puissent \xEAtre prises."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "7.8 Tout manquement \xE0 ces r\xE8gles est susceptible d'entra\xEEner la suppression de la Boutique, la fermeture provisoire ou d\xE9finitive du compte et de l\u2019acc\xE8s \xE0 tout ou partie de la Place de march\xE9 My-Alfred. Outre les manquements aux obligations rappel\xE9es \xE0 l\u2019article 6.1 ci-dessus, si un Membre Alfred ne remplit pas les crit\xE8res de qualit\xE9 - en \xE9tant sujet \xE0 des plaintes de la part des Membres Utilisateurs au regard de ses Prestations ou de son comportement, en recevant des notations et commentaires m\xE9diocres ou des r\xE9clamations suite \xE0 des annulations de r\xE9servations confirm\xE9es des Membres Utilisateurs ou en ne r\xE9pondant pas aux demandes de r\xE9servation, My-Alfred se r\xE9serve le droit de ne pas afficher, de supprimer ou de signaler \xE0 un tiers les contenus du Membre concern\xE9, y compris ses notations, commentaires, recommandations, d\u2019annuler ses prochaines r\xE9servations confirm\xE9es, de supprimer temporairement ou d\xE9finitivement le compte du Membre concern\xE9 et, en cas d\u2019infraction grave ou r\xE9p\xE9t\xE9e, de supprimer d\xE9finitivement son acc\xE8s \xE0 la Place de march\xE9 et aux Services My-Alfred. Si My-Alfred consid\xE8re qu\u2019une action de blocage temporaire ou d\xE9finitif \xE0 la Place de march\xE9 My-Alfred pour l\u2019un de ses Membres est n\xE9cessaire pour assurer la s\xE9curit\xE9, la propri\xE9t\xE9 de My-Alfred et de ses Membres ou pour pr\xE9venir une fraude ou une activit\xE9 ill\xE9gale, My-Alfred pourra, sans pr\xE9avis, prendre les mesures n\xE9cessaires contre ce Membre.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "En cas de suppression d\xE9finitive du compte de l\u2019un des Membres pour les raisons ci-dessus expos\xE9es, le Membre s\u2019interdit de cr\xE9er un autre compte ou d\u2019utiliser le compte d\u2019un tiers pour acc\xE9der \xE0 la Place de march\xE9.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: '#84A5E0'
      }
    }, "8 \u2013 Cr\xE9ation d\u2019un compte My-Alfred : acc\xE8s, usage & s\xE9curit\xE9"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "8.1 Pour avoir pleine jouissance des fonctionnalit\xE9s My-Alfred, les visiteurs doivent cr\xE9er un compte sur la Place de march\xE9 My-Alfred pour devenir Membre. En devenant Membre, les visiteurs peuvent consulter les Boutiques de services, r\xE9server des Services, g\xE9rer leur r\xE9servation, leur compte et leur profil. Si vous cr\xE9ez un compte Membre pour le compte d\u2019une entit\xE9, vous devez certifier que vous \xEAtre en capacit\xE9 d\u2019engager juridiquement ladite entit\xE9 et d\u2019accepter les CGUS au nom de cette personne morale."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "8.2 La cr\xE9ation du compte My-Alfred n\xE9cessite un email, un pr\xE9nom, un nom, une adresse postale, l\u2019indication d\u2019un statut (professionnel ou particulier), un num\xE9ro de t\xE9l\xE9phone et un mot de passe. L\u2019utilisation de r\xE9seaux sociaux tiers est possible pour proc\xE9der \xE0 l\u2019inscription. Vous pouvez dissocier votre compte My-Alfred de vos r\xE9seaux sociaux \xE0 tout moment dans la rubrique \xAB applications connect\xE9es \xBB de votre compte."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "8.3 Les informations saisies lors de la cr\xE9ation d\u2019un compte My-Alfred doivent \xEAtre exactes. Elles doivent \xEAtre maintenues \xE0 jour par les Membres dans les rubriques \xAB Mon Compte \xBB et \xAB Mon profil \xBB de la Place de march\xE9 My-Alfred."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "8.4 Les Membres sont en mesure de s\u2019assurer de la confidentialit\xE9 et la s\xE9curit\xE9 de leur compte et des identifiants d\u2019acc\xE8s \xE0 ce dernier. Les Membres s\u2019engagent \xE0 ne pas divulguer leurs informations de connexion \xE0 des tiers, \xE0 s\u2019assurer qu\u2019ils se d\xE9connectent de leur session \xE0 chaque utilisation de la Place de march\xE9 My-Alfred et \xE0 ne pas cr\xE9er plusieurs comptes sauf si le Membre y est express\xE9ment autoris\xE9 par My-Alfred. Si un Membre apprend que ses identifiants sont perdus, vol\xE9s ou d\xE9tourn\xE9s, il doit pr\xE9venir My-Alfred qui prendra toutes les mesures n\xE9cessaires pour s\xE9curiser son compte, \xE9tant entendu que My-Alfred ne pourra \xEAtre tenu responsable des n\xE9gligences de ses Membres \xE0 l\u2019\xE9gard de la s\xE9curit\xE9 de leur compte. Il est rappel\xE9 que les Membres sont seuls responsables de l\u2019activit\xE9 de leur compte.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: '#84A5E0'
      }
    }, "9 \u2013 Conditions financi\xE8res des transactions My-Alfred"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "9.1 My-Alfred facture des Frais de service aux Membres Utilisateurs (appel\xE9s \xAB Frais d\u2019Utilisateur \xBB) \xE0 hauteur de 18% du panier total de la transaction chacun, en contrepartie de l\u2019utilisation de la Place de march\xE9 My-Alfred. Les Frais de service applicables (y compris les \xE9ventuelles taxes applicables) sont communiqu\xE9s au Membre Utilisateur avant qu\u2019il ne r\xE9serve un Service. My-Alfred se r\xE9serve le droit de modifier \xE0 tout moment les Frais de service et en informera les Membres dans un d\xE9lai raisonnable avant l\u2019entr\xE9e en vigueur des nouveaux tarifs. Ces modifications de frais n'auront pas d'effet sur les r\xE9servations effectu\xE9es avant leur date d\u2019entr\xE9e en vigueur."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "9.2 D\xE8s lors qu\u2019une r\xE9servation est confirm\xE9e, l\u2019int\xE9gralit\xE9 du prix doit \xEAtre pay\xE9e par le Membre Utilisateur au travers de la Place de march\xE9 My-Alfred et de son tiers de confiance MangoPay. Le prix pay\xE9 est ensuite retenu sur un compte tiers, et ce jusqu\u2019\xE0 la bonne ex\xE9cution de la ou des Prestation(s) de service r\xE9serv\xE9e (s) par le Membre Utilisateur. Le paiement est lib\xE9r\xE9 d\xE8s lors que le Membre Utilisateur a confirm\xE9 la bonne ex\xE9cution de la Prestation, conform\xE9ment \xE0 la description du Service. D\xE8s lors que le Service est r\xE9alis\xE9 et conforme \xE0 la description faite par le Membre Alfred dans sa Boutique, le Membre Utilisateur communiquera un code au Membre Alfred, d\xE9clenchant la lib\xE9ration du paiement sur son compte bancaire dans un d\xE9lai de 72 heures. Les Membres renoncent express\xE9ment et irr\xE9vocablement \xE0 pr\xE9tendre \xE0 un quelconque b\xE9n\xE9fice li\xE9 \xE0 l\u2019immobilisation des paiements re\xE7us \xE0 l\u2019occasion des transactions."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "9.3 Dans le but de prot\xE9ger les transactions effectu\xE9es sur la Place de march\xE9 My-Alfred, My-Alfred a mis en place un syst\xE8me de paiement s\xE9curis\xE9 fiable au travers des protocoles SSL et SET. Les donn\xE9es bancaires sont prot\xE9g\xE9es par cryptage et sont g\xE9r\xE9es par un tiers de confiance, MangoPay.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: '#84A5E0'
      }
    }, "10 \u2013 Notations et commentaires"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "10.1 Chaque Service r\xE9alis\xE9 par un Membre Alfred au profit d\u2019un Membre Utilisateur pourra donner lieu \xE0 une notation r\xE9ciproque publique et un commentaire public. Les Membres sont libres d\u2019effectuer une notation ou non. La notation (\xE0 l\u2019aide d\u2019\xE9toiles) refl\xE8te l\u2019opinion des Membres Utilisateurs par rapport au Service r\xE9alis\xE9 par le Membre Alfred, son comportement, la qualit\xE9 de son travail et le rapport qualit\xE9/prix, de m\xEAme qu\u2019elle refl\xE8te l\u2019opinion des Membres Alfred sur le comportement et l\u2019accueil du Membre Utilisateur. En aucun cas, les notations ne proviendront de My-Alfred et ne refl\xE8tent en rien l\u2019opinion de My-Alfred au sujet de ses Membres. Les Membres s\u2019engagent \xE0 r\xE9diger des commentaires fond\xE9s et justes, refl\xE9tant la r\xE9alit\xE9. En aucun cas, les commentaires laiss\xE9s ne peuvent \xEAtre injurieux, discriminants ou diffamatoires. Les commentaires n\u2019\xE9tant pas soumis \xE0 une v\xE9rification, ces derniers peuvent s\u2019av\xE9rer infond\xE9s, injustes ou faux. Les Membres peuvent faire une demande de mod\xE9ration aupr\xE8s de l\u2019\xE9quipe My-Alfred s\u2019ils ont la preuve du caract\xE8re infond\xE9 de la notation ou du commentaire. La responsabilit\xE9 de My-Alfred ne peut \xEAtre recherch\xE9e que dans l\u2019hypoth\xE8se o\xF9 nous avons connaissance du caract\xE8re illicite d\u2019un commentaire et n\u2019avons pas promptement r\xE9agi."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "10.2 Les commentaires et notations sont publics sur la Place de march\xE9 My-Alfred. Ces commentaires et notations permettent aux Membres Utilisateurs et aux Membres Alfred d'accro\xEEtre la confiance dans l\u2019accord qu\u2019ils concr\xE9tisent par une r\xE9servation."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "10.3 La note associ\xE9e au profil d\u2019un Membre correspond \xE0 la moyenne de l\u2019ensemble des \xE9valuations du Membre concern\xE9 depuis son inscription sur la Place de march\xE9."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "10.4 Les commentaires sont class\xE9s par ordre chronologique du plus r\xE9cent au plus ancien. Le d\xE9lai de publication d\u2019un commentaire est imm\xE9diat, il sera accessible tant que le Membre aura un compte ouvert sur la Place de march\xE9. S\u2019il se d\xE9sinscrit ou si son compte est r\xE9sili\xE9, ses commentaires seront supprim\xE9s.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: '#84A5E0'
      }
    }, "11 \u2013 Gestion des r\xE9servations, annulation et remboursement"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "11.1 Les Membres sont seuls responsables des modifications qui sont susceptibles d\u2019intervenir dans la r\xE9servation en cours ou confirm\xE9e sur la Place de march\xE9 My-Alfred. Les Membres peuvent s\u2019accorder sur un nouveau prix et modifier leur r\xE9servation sur la Prestation \xE0 venir \xE0 la seule condition que les deux parties - Membre Alfred et Membre Utilisateur - soient d\u2019accord sur ces modifications de la r\xE9servation."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "11.2 Les Membres Utilisateurs sont susceptibles de proc\xE9der \xE0 l\u2019annulation de leur r\xE9servation \xE0 tout moment en prenant garde aux conditions d\u2019annulation d\xE9finies par le Membre Alfred aupr\xE8s de qui ils ont effectu\xE9 leur r\xE9servation. My-Alfred n\u2019offre aucune garantie de quelque nature que ce soit en cas d\u2019annulation pour quelque raison que ce soit."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "11.3 Dans l\u2019hypoth\xE8se o\xF9, un Membre Alfred serait amen\xE9 \xE0 annuler une r\xE9servation confirm\xE9e aupr\xE8s d\u2019un Membre Utilisateur, ce dernier serait rembours\xE9 de la totalit\xE9 des frais engag\xE9s sur la Place de march\xE9 My-Alfred dans le cadre de la r\xE9servation concern\xE9e, en ce compris les Frais de services. Si le Membre Utilisateur le souhaite, My-Alfred pourra cr\xE9diter la somme des frais engag\xE9s sur son compte afin de pouvoir proc\xE9der \xE0 une nouvelle r\xE9servation. Le Membre Alfred n\u2019ayant pas choisi la r\xE9servation automatique, qui annule une r\xE9servation plus de 7 jours avant la date d\u2019ex\xE9cution convenue avec le Membre Utilisateur supportera une p\xE9nalit\xE9 forfaitaire de 10\u20AC, port\xE9e \xE0 20\u20AC si l\u2019annulation intervient 7 jours ou moins avant la date d\u2019ex\xE9cution du Service convenue dans la r\xE9servation. Dans cette hypoth\xE8se, le Membre Utilisateur sera en mesure de publier un commentaire sur la Boutique du Membre Alfred indiquant que ce dernier a annul\xE9 sa r\xE9servation."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "11.4 My-Alfred se r\xE9serve le droit d\u2019annuler une r\xE9servation confirm\xE9e pour le compte d\u2019un Membre et d\u2019effectuer les remboursements ad\xE9quats en cas de force majeure d\u2019un des Membres. My-Alfred informera les Membres de l\u2019annulation de la r\xE9servation et des raisons de l\u2019annulation sauf si elles doivent rester confidentielles.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: '#84A5E0'
      }
    }, "12 \u2013 Dommages"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "12.1 Dans le cadre de la r\xE9alisation d\u2019un Service aupr\xE8s d\u2019un Membre Utilisateur, le Membre Alfred est tenu de ne pas causer de dommages \xE0 la personne du Membre Utilisateur ni \xE0 l\u2019ensemble de ses effets et biens personnels. Les Membres Alfred sont responsables de l\u2019ensemble de leurs actions et omissions dans le cadre de l\u2019ex\xE9cution du Service."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "12.2 Si un Membre Utilisateur apporte la preuve que l\u2019intervention d\u2019un Membre Alfred a caus\xE9 des dommages \xE0 sa personne, \xE0 ses effets ou biens personnels, le Membre Utilisateur pourra demander la r\xE9paration du pr\xE9judice subi aupr\xE8s du Membre Alfred. My-Alfred peut agir en tant que m\xE9diateur mais ne pourra en aucun cas \xEAtre tenu responsable de quelconques dommages caus\xE9s \xE0 un Membre dans le cadre d\u2019une Prestation. My-Alfred se r\xE9serve le droit de rembourser le Membre Utilisateur en cas de dommages subis ou de mauvaise ex\xE9cution du Service. En cas de dommages, le Membre Utilisateur s\u2019engage \xE0 contacter le service client My-Alfred afin d\u2019exposer la situation.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: '#84A5E0'
      }
    }, "13 \u2013 Obligations fiscales"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "13.1 Les Membres sont tenus de remplir leurs obligations en termes de d\xE9claration, de collecte, de versement ou d\u2019inclusion de toute TVA ou autre taxe applicable."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "13.2 Des r\xE9glementations fiscales peuvent imposer \xE0 My-Alfred un recueil des donn\xE9es compl\xE9mentaires ou une v\xE9rification des donn\xE9es concernant ses Membres ou appliquer un certain nombre de taxes sur les versements op\xE9r\xE9s par la Place de march\xE9 My-Alfred ou son tiers de confiance.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "C\u2019est notamment le cas pour les Membres Alfred lorsque certains seuils sont d\xE9pass\xE9s cf. ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: classes.a,
      target: "_blank",
      href: "https://bofip.impots.gouv.fr/bofip/11791-PGP.html?identifiant=BOI-BIC-DECLA-30-70-40-20-20190315"
    }, "https://bofip.impots.gouv.fr/bofip/11791-PGP.html?identifiant=BOI-BIC-DECLA-30-70-40-20-20190315"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Les Membres Alfred s\u2019engagent \xE0 nous communiquer \xE0 premi\xE8re demande et sans d\xE9lai les \xE9l\xE9ments demand\xE9es.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Si un Membre refuse de fournir ses informations / documents fiscaux visant \xE0 nous acquitter de nos obligations, My-Alfred se r\xE9serve le droit de suspendre ou de cl\xF4turer le compte du Membre concern\xE9 et/ ou retenir les versements conform\xE9ment \xE0 la l\xE9gislation jusqu\u2019\xE0 r\xE9solution du litige.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: '#84A5E0'
      }
    }, "14. Limitation de responsabilit\xE9 \u2013 Absence de garantie de My-Alfred"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "My-Alfred s\u2019engage \xE0 mettre en \u0153uvre tous les moyens n\xE9cessaires afin d\u2019assurer au mieux l\u2019acc\xE8s aux Services My-Alfred et plus particuli\xE8rement \xE0 la Place de march\xE9.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "De mani\xE8re g\xE9n\xE9rale, le Membre accepte et reconna\xEEt que son utilisation de la Place de March\xE9, y compris les informations qu\u2019il diffuse, est faite sous son unique et enti\xE8re responsabilit\xE9.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "En utilisant la Place de march\xE9, le Membre s\u2019engage \xE0 ne pas agir de mani\xE8re dommageable ou ayant pour effet de causer un pr\xE9judice \xE0 l\u2019image, aux int\xE9r\xEAts ou aux droits de My-Alfred, d\u2019endommager ou de rendre inop\xE9rante la Place de march\xE9.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "My-Alfred ne saurait \xEAtre tenue pour responsable et ne saurait \xEAtre tenue d\u2019indemniser un Membre du pr\xE9judice direct ou indirect qui r\xE9sulterait de l\u2019indisponibilit\xE9 de la Place de march\xE9. My-Alfred ne saurait \xE0 cet \xE9gard \xEAtre tenue pour responsable de tout dommage r\xE9sultant de la perte, de l\u2019alt\xE9ration ou de toute utilisation frauduleuse de donn\xE9es, de la transmission accidentelle de virus ou autres \xE9l\xE9ments nuisibles, de l\u2019attitude ou comportement d\u2019un tiers. Elle n\u2019encourt aucune responsabilit\xE9 du fait (i) de l\u2019impossibilit\xE9 d\u2019acc\xE9der \xE0 la Place de march\xE9, (ii) d\u2019un mauvais usage de la Place de march\xE9 (iii) de la saturation du r\xE9seau internet, (iv) d\u2019\xE9ventuels dysfonctionnements sur les terminaux mobiles utilis\xE9s par les Membres, (v) en cas de force majeure ou de fait ind\xE9pendant de sa volont\xE9.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "My-Alfred est responsable de la fourniture des Services My-Alfred, laquelle constitue une obligation de moyens. La responsabilit\xE9 de My-Alfred se limite en ce sens aux seuls dommages directs subis par le Membre \xE0 raison de l\u2019utilisation des Services My-Alfred, \xE0 l\u2019exclusion de tout autre. My-Alfred ne peut en aucun cas \xEAtre tenue responsable des dommages indirects caus\xE9s \xE0 un Membre et notamment de toute perte de client\xE8le, perte de profit, manque \xE0 gagner, atteinte \xE0 l\u2019image.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "La charge de la preuve du dommage revient au Membre et toute demande de dommage-int\xE9r\xEAts du Membre doit \xEAtre initi\xE9e aupr\xE8s de My-Alfred dans un d\xE9lai de douze (12) mois \xE0 compter du fait g\xE9n\xE9rateur \xE0 l\u2019origine du dommage, sous r\xE9serve des dispositions d\u2019ordre public \xE9dict\xE9es par le Code de la consommation.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Le Membre est inform\xE9 qu\u2019en cas de panne, de maintenance, ou de mise \xE0 jour des syst\xE8mes, l\u2019acc\xE8s \xE0 son compte personnel pourra \xEAtre suspendu temporairement. My-Alfred s\u2019efforce de pr\xE9venir les Membres et fait ses meilleurs efforts en vue de r\xE9tablir l\u2019acc\xE8s aux Services My-Alfred d\xE8s que possible.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "La responsabilis\xE9 de My-Alfred n\u2019est pas engag\xE9e lorsque l\u2019impossibilit\xE9 de fournir correctement les Services My-Alfred est due \xE0 un cas de force majeure (telle que d\xE9finie par l\u2019article 1218 du Code civil). My-Alfred d\xE9cline toute responsabilit\xE9 dans le cas o\xF9 les Services My-Alfred ne r\xE9pondraient pas aux exigences et besoins sp\xE9cifiques des Membres.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Ni My-Alfred, ni, le cas \xE9ch\xE9ant, ses h\xE9bergeurs et fournisseurs de technologies, ne pourront \xEAtre tenus responsables en cas de dommage subi par le Membre et r\xE9sultant de :", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        paddingLeft: '15px'
      }
    }, "\u2013 une faute du Membre ; \u2013 un non-respect par le Membre des CGUS ; \u2013 l\u2019acc\xE8s par un tiers \xE0 ses donn\xE9es d\u2019identification, sur autorisation du Membre ; \u2013 l\u2019usage frauduleux ou abusif des Services My-Alfred par le Membre ; \u2013 une compromission par le Membre de la confidentialit\xE9 de ses donn\xE9es d\u2019identification ; \u2013 l\u2019interruption ou la d\xE9faillance des Services My-Alfred suite \xE0 des dysfonctionnements du r\xE9seau Internet, du r\xE9seau des t\xE9l\xE9communications ou du r\xE9seau informatique ; \u2013 toute inexactitude ou non-conformit\xE9 des informations, produits, et autres contenus, incluant notamment les propres donn\xE9es renseign\xE9es par le Membre, concernant son profil, ses Services, n\u2019incombant pas \xE0 My-Alfred ; et/ou \u2013 tout usage que le Membre ferait des informations mises \xE0 sa disposition par My-Alfred relatives aux Services, le Membre restant seul responsable de ses d\xE9cisions et de ses obligations sociales et fiscales (notamment les dispositions du Code de travail, du Code de la s\xE9curit\xE9 sociale, du Code g\xE9n\xE9ral des imp\xF4ts et des conventions collectives applicables)."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "L\u2019assurance de responsabilit\xE9 civile professionnelle de My-Alfred est souscrite aupr\xE8s de G\xE9n\xE9rali, 2 Rue Pillet-Will, 75009 Paris.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: '#84A5E0'
      }
    }, "15 \u2013 Suppression du compte"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Les Membres sont libres \xE0 tout moment de demander la suppression de leur compte depuis leur espace Mon compte. La suppression du compte est d\xE9finitive. Si le Membre est un Membre Alfred, la suppression du compte implique l\u2019annulation de l\u2019ensemble des r\xE9servations accept\xE9es \xE0 venir et un remboursement sur le compte du Membre Utilisateur. Si le Membre est un Membre Utilisateur, la suppression du compte implique l\u2019annulation de l\u2019ensemble des r\xE9servations accept\xE9es \xE0 venir, moyennant - en fonction des conditions d\u2019annulation du ou des Membres Alfred impact\xE9(s) par cette annulation - des frais d\u2019annulation. ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: '#84A5E0'
      }
    }, "16 \u2013 Donn\xE9es personnelles et respect de la vie priv\xE9e"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "16.1 Tous les Membres peuvent choisir ce qu\u2019ils souhaitent rendre public sur la Place de march\xE9 My-Alfred, \xE0 l\u2019exception du mot de passe qui restera confidentiel en toutes circonstances et de son pr\xE9nom qui sera public en toutes circonstances. En revanche, d\xE8s lors qu\u2019une r\xE9servation a \xE9t\xE9 confirm\xE9e par un Membre Alfred et un Membre Utilisateur, les coordonn\xE9es des Membres sont r\xE9ciproquement communiqu\xE9es \xE0 l\u2019un et \xE0 l\u2019autre (nom, pr\xE9nom, adresse postale, adresse email et num\xE9ro de t\xE9l\xE9phone)."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "16.2 Les mentions l\xE9gales ainsi que la ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_4___default.a, {
      href: "/footer/privacypolicy"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: classes.a
    }, "\u201CPolitique de Respect de la Vie Priv\xE9e\u201D")), " font partie int\xE9grante des obligations et conditions r\xE9pertori\xE9es dans les pr\xE9sentes CGUS. La Place de march\xE9 My-Alfred ayant recours \xE0 l\u2019utilisation des cookies, vous pouvez \xE0 tout moment consulter la \xAB Politique de Gestion des Cookies \xBB et vous y opposer. Attention, l\u2019opposition \xE0 l\u2019utilisation des cookies est susceptible d\u2019entra\xEEner le dysfonctionnement de certaines fonctionnalit\xE9s de la Place de march\xE9 My-Alfred.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: '#84A5E0'
      }
    }, "17 \u2013 Ind\xE9pendance des parties"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "My-Alfred et ses Membres sont des parties totalement ind\xE9pendantes, agissant chacun en leur nom et pour leur propre compte. Ni l\u2019utilisation de la Place de march\xE9 My-Alfred, ni les pr\xE9sentes CGUS ne peuvent impliquer un quelconque lien de subordination, de mandat, de repr\xE9sentation, d\u2019entreprise commune ou de relation employeur/salari\xE9 ou franchiseur/franchis\xE9.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: '#84A5E0'
      }
    }, "18 \u2013 Convention de preuve"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Les donn\xE9es enregistr\xE9es num\xE9riquement sur les syst\xE8mes d\u2019information que My-Alfred met en \u0153uvre dans le cadre de la Place de march\xE9 feront foi entre les Parties, notamment quant \xE0 l\u2019existence, au contenu, \xE0 l\u2019imputabilit\xE9 ou \xE0 la date d\u2019un t\xE9l\xE9versement ou d\u2019un t\xE9l\xE9chargement.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Ces m\xEAmes donn\xE9es enregistr\xE9es num\xE9riquement l\u2019emporteront \xE9galement sur toutes autres donn\xE9es num\xE9riques ou tirages papier du Membre ou de ses propres syst\xE8mes d\u2019information ainsi que sur tout autre mode de preuve indirecte, tel que le t\xE9moignage.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "En cons\xE9quence, et sauf \xE0 pouvoir rapporter en justice la preuve que les syst\xE8mes d\u2019information et les donn\xE9es enregistr\xE9es num\xE9riquement concern\xE9es ont pu \xEAtre alt\xE9r\xE9es ou fauss\xE9es de sorte \xE0 retirer toute foi aux \xE9l\xE9ments de preuve fournis, le Membre ne peut pas contester les \xE9l\xE9ments de preuve num\xE9rique communiqu\xE9s par My-Alfred.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: '#84A5E0'
      }
    }, "19 \u2013 Droit applicable et juridiction comp\xE9tente"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "19.1 Les pr\xE9sentes CGUS sont soumises au droit fran\xE7ais. En fonction de leur lieu de r\xE9sidence, des r\xE8glementations, normes, lois peuvent s\u2019imposer aux Membres. Les Membres sont tenus de respecter la l\xE9gislation en vigueur dans leur pays de r\xE9sidence."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "19.2 Sous r\xE9serve du paragraphe ci-dessous, toutes contestations qui pourraient s\u2019\xE9lever entre les Membres et My-Alfred dans le cadre de l\u2019ex\xE9cution ou l'interpr\xE9tation des pr\xE9sentes CGUS seront soumises au tribunal dans le ressort duquel le si\xE8ge social de My-Alfred est \xE9tabli.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "S\u2019agissant des Membres ayant la qualit\xE9 de consommateurs, ceux-ci doivent s\u2019adresser en priorit\xE9 au service client\xE8le de My-Alfred par courrier \xE9lectronique hello@my-alfred.io ou postal \xE0 MY ALFRED 42 Rampe Bouvreuil \u2013 76000 Rouen.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Afin de faciliter le traitement rapide et efficace de votre r\xE9clamation \xE9crite, nous vous recommandons d\u2019intituler votre courriel ou courrier postal \xAB R\xE9clamation pr\xE9alable \xE0 toute saisine du m\xE9diateur \xBB et de communiquer \xE0 notre service client\xE8le les informations suivantes :", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        paddingLeft: '15px'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- vos coordonn\xE9es : civilit\xE9, pr\xE9nom, nom, n\xB0 et nom de rue, code postal, ville, d\xE9partement, adresse \xE9lectronique, le num\xE9ro de t\xE9l\xE9phone auquel vous \xEAtes joignable et vos horaires de disponibilit\xE9,", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- le motif de la r\xE9clamation,", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- accompagn\xE9 de tous les documents utiles \xE0 la compr\xE9hension de votre r\xE9clamation."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "En cas d\u2019\xE9chec de la demande de r\xE9clamation aupr\xE8s du service client\xE8le ou en l\u2019absence de r\xE9ponse de ce service dans un d\xE9lai de 30 jours, le client peut soumettre gratuitement le diff\xE9rend l\u2019opposant \xE0 My-Alfred \xE0 un m\xE9diateur.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Il contactera alors l\u2019Association Nationale des M\xE9diateurs (ANM) soit par courrier en \xE9crivant au 62 rue Tiquetonne 75002 PARIS soit par e-mail en remplissant le formulaire de saisine en ligne \xE0 l\u2019adresse suivante www.anm-conso.com.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Les parties au litige restent libres d\u2019accepter ou de refuser le recours \xE0 la m\xE9diation ainsi que, en cas de recours \xE0 la m\xE9diation, d\u2019accepter ou de refuser la solution propos\xE9e par le m\xE9diateur.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "My-Alfred informe \xE9galement le client consommateur de l\u2019existence d\u2019une plateforme de R\xE8glement en Ligne des Litiges (\xAB RLL \xBB) \xE0 laquelle il peut recourir ; elle est accessible depuis le lien suivant ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: classes.a,
      target: "_blank",
      href: "http://ec.europa.eu/consumers/odr/"
    }, "http://ec.europa.eu/consumers/odr/"), ". Le site internet suivant ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: classes.a,
      target: "_blank",
      href: "www.economie.gouv.fr/mediation-conso"
    }, "www.economie.gouv.fr/mediation-conso"), " comporte \xE9galement toutes informations utiles en cas de litige transfrontalier."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "19.3 Toute contestation entre Membres \xE0 l\u2019occasion de l\u2019ex\xE9cution ou l\u2019interpr\xE9tation des CGUS ou dans le cadre de l\u2019ex\xE9cution d\u2019une r\xE9servation confirm\xE9e sera soumise \xE0 la comp\xE9tence exclusive des juridictions selon la loi applicable. ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: '#84A5E0'
      }
    }, "20 \u2013 Stipulations g\xE9n\xE9rales"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "20.1 Dans l\u2019hypoth\xE8se o\xF9 une ou plusieurs des stipulations des pr\xE9sentes serai(en)t invalid\xE9e(s) ou d\xE9clar\xE9e(s) inapplicable(s) ou nulle(s), seule(s) la ou lesdites condition(s) serai(en)t annul\xE9e(s) sans que cette annulation ne puisse affecter la validit\xE9 et l\u2019applicabilit\xE9 des conditions restantes. Les Parties s\u2019efforceront de rem\xE9dier aux clauses inapplicables dans le m\xEAme esprit que celui qui a pr\xE9sid\xE9 \xE0 la conclusion de leurs accords."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "20.4 Les pr\xE9sentes CGUS, les droits et obligations des Membres ne pourront \xEAtre c\xE9d\xE9s, d\xE9l\xE9gu\xE9s ou transf\xE9r\xE9s sans l\u2019accord pr\xE9alable de My-Alfred."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "20.5 L\u2019ensemble des notifications et communications autoris\xE9es ou requises dans les pr\xE9sentes CGUS \xE0 destination des Membres de la Place de march\xE9 My-Alfred, seront effectu\xE9es \xE9lectroniquement au travers d\u2019emails, de notifications ou de services de messagerie. "))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["withStyles"])(styles)(CguPage));

/***/ })

})
//# sourceMappingURL=cgu.js.ee6c5617d6e326f1a348.hot-update.js.map