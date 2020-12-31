webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./components/HomePage/BecomeAlfred/BecomeAlfred.js":
false,

/***/ "./components/HomePage/ResaService/ResaService.js":
/*!********************************************************!*\
  !*** ./components/HomePage/ResaService/ResaService.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/i18n */ "./utils/i18n.js");
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_utils_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Link_Link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Link/Link */ "./components/Link/Link.js");
/* harmony import */ var _static_css_components_ResaService_ResaService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../static/css/components/ResaService/ResaService */ "./static/css/components/ResaService/ResaService.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "./node_modules/@material-ui/core/styles/withStyles.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);









class ResaService extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      homePage: false
    };
  }

  componentDidMount() {
    if (next_router__WEBPACK_IMPORTED_MODULE_7___default.a.pathname === '/') {
      this.setState({
        homePage: true
      });
    }
  }

  render() {
    const {
      classes
    } = this.props;
    const {
      homePage
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.ResaServiceMainContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.becomeAlfredContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
      className: classes.becomeAlfredTitle
    }, _utils_i18n__WEBPACK_IMPORTED_MODULE_3__["RESA_SERVICE"].title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: classes.becomeAlfredText
    }, _utils_i18n__WEBPACK_IMPORTED_MODULE_3__["RESA_SERVICE"].text)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Link_Link__WEBPACK_IMPORTED_MODULE_4__["default"], {
      href: '/creaShop/creaShop'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
      variant: 'contained',
      className: classes.resaServiceButton,
      style: {
        color: homePage ? 'rgba(178,204,251,1)' : '#F8CF61'
      }
    }, _utils_i18n__WEBPACK_IMPORTED_MODULE_3__["RESA_SERVICE"].button)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6___default()(_static_css_components_ResaService_ResaService__WEBPACK_IMPORTED_MODULE_5__["default"])(ResaService));

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
      href: '/footer/apropos?indexFaq=0'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        marginBottom: '2vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: classes.footerLink
    }, "My Alfred"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
      href: '/footer/ourTeam?indexFaq=2'
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
      href: '/footer/ourCommunity?indexFaq=1'
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

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hoc_Layout_Footer_Footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hoc/Layout/Footer/Footer */ "./hoc/Layout/Footer/Footer.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-helmet */ "./node_modules/react-helmet/lib/Helmet.js");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _components_InfoBar_InfoBar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/InfoBar/InfoBar */ "./components/InfoBar/InfoBar.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _static_css_pages_homePage_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../static/css/pages/homePage/index */ "./static/css/pages/homePage/index.js");
/* harmony import */ var _hoc_Layout_NavBar_NavBar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../hoc/Layout/NavBar/NavBar */ "./hoc/Layout/NavBar/NavBar.js");
/* harmony import */ var _components_HomePage_BannerPresentation_BannerPresentation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/HomePage/BannerPresentation/BannerPresentation */ "./components/HomePage/BannerPresentation/BannerPresentation.js");
/* harmony import */ var _components_HomePage_Category_CategoryTopic__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/HomePage/Category/CategoryTopic */ "./components/HomePage/Category/CategoryTopic.js");
/* harmony import */ var _components_HomePage_OurAlfred_OurAlfred__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/HomePage/OurAlfred/OurAlfred */ "./components/HomePage/OurAlfred/OurAlfred.js");
/* harmony import */ var _components_HomePage_HowItWorks_HowItWorks__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/HomePage/HowItWorks/HowItWorks */ "./components/HomePage/HowItWorks/HowItWorks.js");
/* harmony import */ var _components_HomePage_NewsLetter_NewsLetter__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/HomePage/NewsLetter/NewsLetter */ "./components/HomePage/NewsLetter/NewsLetter.js");
/* harmony import */ var _hoc_Layout_NavBar_MobileNavbar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../hoc/Layout/NavBar/MobileNavbar */ "./hoc/Layout/NavBar/MobileNavbar.js");
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/core/Hidden */ "./node_modules/@material-ui/core/esm/Hidden/index.js");
/* harmony import */ var _hoc_Layout_TrustAndSecurity_TrustAndSecurity__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../hoc/Layout/TrustAndSecurity/TrustAndSecurity */ "./hoc/Layout/TrustAndSecurity/TrustAndSecurity.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _components_HomePage_ResaService_ResaService__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../components/HomePage/ResaService/ResaService */ "./components/HomePage/ResaService/ResaService.js");





















const {
  getLoggedUserId
} = __webpack_require__(/*! ../utils/functions */ "./utils/functions.js");

class Home extends react__WEBPACK_IMPORTED_MODULE_1___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {},
      alfred: {},
      logged: false
    };
  }

  componentDidMount() {
    if (getLoggedUserId()) {
      this.setState({
        logged: true
      });
    }

    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/myAlfred/api/category/all').then(res => {
      let category = res.data;
      this.setState({
        category: category
      });
    }).catch(err => console.error(err));
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/myAlfred/api/serviceUser/home').then(response => {
      let alfred = response.data;
      this.setState({
        alfred: alfred
      });
    }).catch(err => console.error(err));
  }

  render() {
    const {
      classes
    } = this.props;
    const {
      category,
      alfred,
      logged,
      user
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_4__["Helmet"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("title", null, "Services r\xE9mun\xE9r\xE9s entre particuliers - My Alfred "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("meta", {
      property: "description",
      content: "Des milliers de services r\xE9f\xE9renc\xE9s ! Consultez les offres de service r\xE9mun\xE9r\xE9s de milliers de particuliers avec My Alfred, premi\xE8re application d\u2019offres de services entre particuliers. Rendre service en \xE9tant r\xE9mun\xE9r\xE9 autour de chez soi n\u2019a jamais \xE9t\xE9 aussi simple"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_InfoBar_InfoBar__WEBPACK_IMPORTED_MODULE_6__["default"], {
      style: classes
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      container: true,
      className: classes.navbarAndBannerContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      className: classes.navbarAndBannerBackground
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      className: classes.navbarComponentPosition
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_hoc_Layout_NavBar_NavBar__WEBPACK_IMPORTED_MODULE_9__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      className: classes.bannerPresentationContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      className: classes.bannerSize
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_HomePage_BannerPresentation_BannerPresentation__WEBPACK_IMPORTED_MODULE_10__["default"], null))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      container: true,
      className: classes.mainContainerStyle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      className: classes.generalWidthContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_HomePage_Category_CategoryTopic__WEBPACK_IMPORTED_MODULE_11__["default"], {
      category: category
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      container: true,
      className: classes.howItWorksComponent
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      className: classes.generalWidthContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_HomePage_HowItWorks_HowItWorks__WEBPACK_IMPORTED_MODULE_13__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      container: true,
      className: classes.mainContainerStyle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      className: classes.generalWidthContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_HomePage_OurAlfred_OurAlfred__WEBPACK_IMPORTED_MODULE_12__["default"], {
      alfred: alfred
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      container: true,
      className: classes.becomeAlfredComponent
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      className: classes.generalWidthContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_HomePage_ResaService_ResaService__WEBPACK_IMPORTED_MODULE_19__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_16__["default"], {
      only: ['xs', 'sm']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      container: true,
      className: classes.mainNewsLetterStyle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      className: classes.generalWidthContainerNewsLtter
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_HomePage_NewsLetter_NewsLetter__WEBPACK_IMPORTED_MODULE_14__["default"], null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_18__["Divider"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      className: classes.trustAndSecurityContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      className: classes.trustAndSecurityComponent
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_hoc_Layout_TrustAndSecurity_TrustAndSecurity__WEBPACK_IMPORTED_MODULE_17__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      container: true,
      className: classes.mainContainerStyleFooter
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      className: classes.generalWidthFooter
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_hoc_Layout_Footer_Footer__WEBPACK_IMPORTED_MODULE_2__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_16__["default"], {
      only: ['xl', 'lg', 'md', 'sm']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      style: {
        position: 'fixed',
        bottom: '3%',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        zIndex: 1
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      style: {
        width: '100%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_hoc_Layout_NavBar_MobileNavbar__WEBPACK_IMPORTED_MODULE_15__["default"], {
      currentIndex: 0
    }))))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__["withStyles"])(_static_css_pages_homePage_index__WEBPACK_IMPORTED_MODULE_8__["default"])(Home));

/***/ }),

/***/ "./static/css/components/ResaService/ResaService.js":
/*!**********************************************************!*\
  !*** ./static/css/components/ResaService/ResaService.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  ResaServiceMainContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '3%'
  },
  becomeAlfredContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  becomeAlfredTitle: {
    color: theme.palette.white.main,
    fontFamily: theme.typography.subTitle.fontFamily,
    fontWeight: theme.typography.subTitle.fontWeight,
    margin: theme.typography.subTitle.margin
  },
  becomeAlfredText: {
    fontFamily: theme.typography.text.fontFamily,
    color: theme.palette.white.main,
    fontWeight: theme.typography.text.fontWeight,
    fontSize: theme.typography.text.fontSize,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  resaServiceButton: {
    fontWeight: theme.typography.blackButton.fontWeight,
    fontFamily: theme.typography.blackButton.fontFamily,
    backgroundColor: theme.palette.white.main,
    borderRadius: theme.border.blackButton.borderRadius,
    padding: theme.padding.blackButton.padding
  }
}));

/***/ }),

/***/ "./static/css/pages/homePage/index.js":
/*!********************************************!*\
  !*** ./static/css/pages/homePage/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  generalWidthContainer: {
    width: '60%',
    [theme.breakpoints.down('xs')]: {
      width: '80%'
    }
  },
  generalWidthContainerNewsLtter: {
    width: '60%',
    [theme.breakpoints.down('lg')]: {
      width: '80%'
    }
  },
  bannerSize: {
    width: '60%',
    [theme.breakpoints.down('xs')]: {
      width: '80%'
    }
  },
  infoBarMainStyle: {
    backgroundColor: theme.palette.backgroundGrey.main,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoBarColorText: {
    color: theme.palette.lightBlack.main,
    fontSize: theme.typography.infoBar.fontSize,
    lineHeight: theme.typography.infoBar.lineHeight,
    fontFamily: theme.typography.infoBar.fontFamily,
    margin: 0,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  showmoreContainer: {
    marginLeft: 5
  },
  navbarInput: {
    borderBottom: 'inherit',
    '&::placeholder': {
      opacity: '0.55',
      color: theme.palette.placeHolder.main
    }
  },
  bannerPresentationContainerIllustration: {
    display: 'flex',
    alignItems: 'center',
    width: '60%'
  },
  navbarAndBannerContainer: {
    justifyContent: 'center',
    height: '85vh',
    backgroundImage: 'url(../../assets/img/homePage/illuHeader.png)',
    backgroundColor: 'rgba(207,223,252,1)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },
  navbarAndBannerBackground: {
    width: '100%'
  },
  navbarComponentPosition: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: '2%'
  },
  bannerPresentationContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10vh'
  },
  mainContainerStyle: {
    justifyContent: 'center',
    marginTop: '10vh',
    marginBottom: '10vh'
  },
  mainNewsLetterStyle: {
    justifyContent: 'center'
  },
  becomeAlfredMainContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: theme.padding.homePage.section.padding
  },
  becomeAlfredContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  becomeAlfredButton: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.blackButton.fontWeight,
    fontFamily: theme.typography.blackButton.fontFamily,
    backgroundColor: theme.palette.white.main,
    borderRadius: theme.border.blackButton.borderRadius,
    padding: theme.padding.blackButton.padding
  },
  resaServiceButton: {
    color: '#F8CF61',
    fontWeight: theme.typography.blackButton.fontWeight,
    fontFamily: theme.typography.blackButton.fontFamily,
    backgroundColor: theme.palette.white.main,
    borderRadius: theme.border.blackButton.borderRadius,
    padding: theme.padding.blackButton.padding
  },
  becomeAlfredTitle: {
    color: theme.palette.white.main,
    fontFamily: theme.typography.subTitle.fontFamily,
    fontWeight: theme.typography.subTitle.fontWeight,
    margin: theme.typography.subTitle.margin
  },
  becomeAlfredText: {
    fontFamily: theme.typography.text.fontFamily,
    color: theme.palette.white.main,
    fontWeight: theme.typography.text.fontWeight,
    fontSize: theme.typography.text.fontSize
  },
  becomeAlfredComponent: {
    justifyContent: 'center',
    marginTop: '2%',
    backgroundColor: theme.palette.primary.main
  },
  howItWorksComponent: {
    justifyContent: 'center',
    marginTop: '2%',
    backgroundColor: theme.palette.yellow.main
  },
  generalWidthFooter: {
    width: '90%'
  },
  trustAndSecurityContainer: {
    [theme.breakpoints.down('xs')]: {
      marginTop: '5vh',
      marginBottom: '5vh',
      display: 'flex',
      justifyContent: 'center'
    }
  },
  trustAndSecurityComponent: {
    padding: '2vh',
    [theme.breakpoints.down('sm')]: {
      marginTop: '5vh',
      marginBottom: '5vh',
      width: '100%'
    },
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      width: '90%'
    }
  },
  mainContainerStyleFooter: {
    justifyContent: 'center',
    backgroundColor: 'rgba(228, 228, 228, 8)'
  },
  categoryCardRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  cardPreviewMainStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  infoBarLinkContainer: {
    paddingTop: theme.padding.infoBar.paddingTop,
    paddingBottom: theme.padding.infoBar.paddingBottom,
    alignItems: 'center',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  infoBarPicsContainer: {
    width: 15,
    height: 15,
    marginRight: 5
  },
  shomoreLink: {
    color: theme.palette.link.main,
    fontSize: theme.typography.infoBar.fontSize,
    lineHeight: theme.typography.infoBar.lineHeight,
    fontFamily: theme.typography.infoBar.fontFamily,
    fontWeight: theme.typography.infoBar.fontWeight
  },
  menuHeaderActive: {
    '&:active': {
      color: '#84A5E0',
      borderBottom: '#84A5E0'
    }
  }
}));

/***/ })

})
//# sourceMappingURL=index.js.0aa109aba50a5191353b.hot-update.js.map