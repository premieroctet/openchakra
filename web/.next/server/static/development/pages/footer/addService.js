module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/Link/Link.js":
/*!*********************************!*\
  !*** ./components/Link/Link.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






const handler = href => next_router__WEBPACK_IMPORTED_MODULE_2___default.a.push(href);

const Link = ({
  className,
  children,
  href,
  ...rest
} = {}) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", _extends({
  style: {
    cursor: 'pointer'
  },
  onClick: () => handler(href),
  className: className
}, rest), children);

Link.propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  href: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]),
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node
};
/* harmony default export */ __webpack_exports__["default"] = (Link);

/***/ }),

/***/ "./components/ScrollMenu/ScrollMenu.js":
/*!*********************************************!*\
  !*** ./components/ScrollMenu/ScrollMenu.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Tabs */ "@material-ui/core/Tabs");
/* harmony import */ var _material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Tab */ "@material-ui/core/Tab");
/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _static_css_components_ScrollMenu_ScrollMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../static/css/components/ScrollMenu/ScrollMenu */ "./static/css/components/ScrollMenu/ScrollMenu.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "@material-ui/core/styles/withStyles");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! querystring */ "querystring");
/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(querystring__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/router */ "next/router");
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        maxWidth: '100%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_2___default.a, {
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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_3___default.a, _extends({
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

/***/ "./hoc/Layout/About/Footer.js":
/*!************************************!*\
  !*** ./hoc/Layout/About/Footer.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Tab */ "@material-ui/core/Tab");
/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Link_Link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/Link/Link */ "./components/Link/Link.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _static_css_components_Layout_About_Footer_Footer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../static/css/components/Layout/About/Footer/Footer */ "./static/css/components/Layout/About/Footer/Footer.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__);








class Footer extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.mainContainerFooter
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.mainContainerWidth
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
      href: '/footer/apropos'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, null, "\xC0 propos de nous"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      className: classes.rightMainContainerFooter
    }, true ? null : /*#__PURE__*/undefined, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      className: classes.marginLink
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
      href: '/cgu'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, null, "Informations l\xE9gales"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_3__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, null, "Confidentialit\xE9"))))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__["withStyles"])(_static_css_components_Layout_About_Footer_Footer__WEBPACK_IMPORTED_MODULE_5__["default"])(Footer));

/***/ }),

/***/ "./hoc/Layout/About/Header.js":
/*!************************************!*\
  !*** ./hoc/Layout/About/Header.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/i18n */ "./utils/i18n.js");
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_utils_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_icons_ArrowBack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/ArrowBack */ "@material-ui/icons/ArrowBack");
/* harmony import */ var _material_ui_icons_ArrowBack__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ArrowBack__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _static_css_components_Layout_About_Header_Header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../static/css/components/Layout/About/Header/Header */ "./static/css/components/Layout/About/Header/Header.js");
/* harmony import */ var _components_ScrollMenu_ScrollMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/ScrollMenu/ScrollMenu */ "./components/ScrollMenu/ScrollMenu.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Paper */ "@material-ui/core/Paper");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/IconButton */ "@material-ui/core/IconButton");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_core_InputBase__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/InputBase */ "@material-ui/core/InputBase");
/* harmony import */ var _material_ui_core_InputBase__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_InputBase__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/Close */ "@material-ui/icons/Close");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_12__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }















class Header extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "onSearchChange", ev => {
      this.setState({
        search: ev.target.value
      }, () => this.props.search());
    });

    _defineProperty(this, "callClearFunction", () => {
      this.setState({
        search: ''
      }, () => this.props.clearFuntion());
    });

    this.state = {
      title: '',
      content: '',
      searchBar: false,
      aboutMenu: false,
      aboutSearch: false,
      becomeAlfredMenu: false,
      active: false,
      classNameMenu: '',
      items: [{
        label: _utils_i18n__WEBPACK_IMPORTED_MODULE_2__["NAVBAR_MENU"].aboutUs,
        url: '/footer/apropos'
      }, {
        label: _utils_i18n__WEBPACK_IMPORTED_MODULE_2__["NAVBAR_MENU"].ourCom,
        url: '/footer/ourCommunity'
      }, {
        label: _utils_i18n__WEBPACK_IMPORTED_MODULE_2__["NAVBAR_MENU"].ourTeam,
        url: '/footer/ourTeam'
      }],
      search: ''
    };
  }

  componentDidMount() {
    if (next_router__WEBPACK_IMPORTED_MODULE_8___default.a.pathname === '/faq') {
      this.setState({
        aboutSearch: true
      });
    }
  }

  render() {
    const {
      classes,
      index
    } = this.props;
    let {
      title,
      content,
      aboutMenu,
      items,
      search,
      aboutSearch
    } = this.state;

    if (false) {}

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        backgroundImage: "url('../../../static/assets/img/footer/footerBanner.svg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.containerArrowBack
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7___default.a, {
      classes: {
        root: classes.button
      },
      startIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ArrowBack__WEBPACK_IMPORTED_MODULE_3___default.a, {
        style: {
          color: 'white'
        }
      }),
      onClick: () => next_router__WEBPACK_IMPORTED_MODULE_8___default.a.push('/')
    }, "Retour sur My Alfred")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.containerTitleAndSubtitle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      style: {
        color: 'white'
      }
    }, title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: 'white'
      }
    }, content)), aboutSearch ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.navbarSearchContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_9___default.a, {
      classes: {
        root: classes.navbarSearch
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputBase__WEBPACK_IMPORTED_MODULE_11___default.a, {
      className: classes.input,
      placeholder: "Chercher dans la FAQ",
      inputProps: {
        'aria-label': 'Chercher dans la FAQ'
      },
      onChange: this.onSearchChange,
      value: search
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_10___default.a, {
      classes: {
        root: classes.iconButton
      },
      "aria-label": "search",
      onClick: this.callClearFunction
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_12___default.a, null))))) : null)), aboutMenu ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.layoutScrollMenu
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ScrollMenu_ScrollMenu__WEBPACK_IMPORTED_MODULE_6__["default"], {
      categories: items,
      indexCat: index,
      mode: 'faq'
    })) : null);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__["withStyles"])(_static_css_components_Layout_About_Header_Header__WEBPACK_IMPORTED_MODULE_5__["default"])(Header));

/***/ }),

/***/ "./hoc/Layout/Faq/NeedMoreFaq.js":
/*!***************************************!*\
  !*** ./hoc/Layout/Faq/NeedMoreFaq.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Link_Link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Link/Link */ "./components/Link/Link.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__);





const styles = theme => ({
  link: {
    fontWeight: 'bold',
    borderBottom: '1px solid black',
    '&:hover': {
      color: '#84A5E0',
      borderBottom: '1px solid #84A5E0'
    }
  }
});

class NeedMoreFaq extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        display: ' flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        margin: '0 auto'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        fontWeight: 'bold'
      }
    }, "Et si vous souhaitez en savoir plus"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Vous pouvez consulter ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_2__["default"], {
      href: '/faq'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: classes.link
    }, "notre FAQ")))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(styles)(NeedMoreFaq));

/***/ }),

/***/ "./hoc/Layout/LayoutFaq.js":
/*!*********************************!*\
  !*** ./hoc/Layout/LayoutFaq.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "@material-ui/core/styles/withStyles");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _static_css_components_Layout_LayoutFaq_LayoutFaq__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../static/css/components/Layout/LayoutFaq/LayoutFaq */ "./static/css/components/Layout/LayoutFaq/LayoutFaq.js");
/* harmony import */ var _About_Header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./About/Header */ "./hoc/Layout/About/Header.js");
/* harmony import */ var _About_Footer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./About/Footer */ "./hoc/Layout/About/Footer.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/router */ "next/router");
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.mainContainerLayoutFaq
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_About_Header__WEBPACK_IMPORTED_MODULE_4__["default"], {
      ref: this.child,
      index: index,
      search: this.sendSearch,
      clearFuntion: this.callClearFunction
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: becomeAlfredPage ? classes.becomeAlfredPageContainer : classes.childrenContainer
    }, children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.footerContainerFaq
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_About_Footer__WEBPACK_IMPORTED_MODULE_5__["default"], null)));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_2___default()(_static_css_components_Layout_LayoutFaq_LayoutFaq__WEBPACK_IMPORTED_MODULE_3__["default"])(LayoutFaq));

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/json/stringify */ "core-js/library/fn/json/stringify");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/create.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/create.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/create */ "core-js/library/fn/object/create");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/define-property */ "core-js/library/fn/object/define-property");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-prototype-of */ "core-js/library/fn/object/get-prototype-of");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/set-prototype-of */ "core-js/library/fn/object/set-prototype-of");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/symbol.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/symbol.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/symbol */ "core-js/library/fn/symbol");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/symbol/iterator */ "core-js/library/fn/symbol/iterator");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/createClass.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Object$defineProperty = __webpack_require__(/*! ../core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    _Object$defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Object$getPrototypeOf = __webpack_require__(/*! ../core-js/object/get-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js");

var _Object$setPrototypeOf = __webpack_require__(/*! ../core-js/object/set-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js");

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = _Object$setPrototypeOf ? _Object$getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || _Object$getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/inherits.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Object$create = __webpack_require__(/*! ../core-js/object/create */ "./node_modules/@babel/runtime-corejs2/core-js/object/create.js");

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = _Object$create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "./node_modules/@babel/runtime-corejs2/helpers/typeof.js");

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/setPrototypeOf.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/setPrototypeOf.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Object$setPrototypeOf = __webpack_require__(/*! ../core-js/object/set-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js");

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = _Object$setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/typeof.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/typeof.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Symbol$iterator = __webpack_require__(/*! ../core-js/symbol/iterator */ "./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js");

var _Symbol = __webpack_require__(/*! ../core-js/symbol */ "./node_modules/@babel/runtime-corejs2/core-js/symbol.js");

function _typeof2(obj) { if (typeof _Symbol === "function" && typeof _Symbol$iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof _Symbol === "function" && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof _Symbol === "function" && _typeof2(_Symbol$iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof _Symbol === "function" && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/next/dist/client/link.js":
/*!***********************************************!*\
  !*** ./node_modules/next/dist/client/link.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global __NEXT_DATA__ */

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

var _stringify = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var url_1 = __webpack_require__(/*! url */ "url");

var react_1 = __importStar(__webpack_require__(/*! react */ "react"));

var prop_types_1 = __importDefault(__webpack_require__(/*! prop-types */ "prop-types"));

var router_1 = __importStar(__webpack_require__(/*! next/router */ "next/router"));

var utils_1 = __webpack_require__(/*! next-server/dist/lib/utils */ "next-server/dist/lib/utils");

function isLocal(href) {
  var url = url_1.parse(href, false, true);
  var origin = url_1.parse(utils_1.getLocationOrigin(), false, true);
  return !url.host || url.protocol === origin.protocol && url.host === origin.host;
}

function memoizedFormatUrl(formatFunc) {
  var lastHref = null;
  var lastAs = null;
  var lastResult = null;
  return function (href, as) {
    if (href === lastHref && as === lastAs) {
      return lastResult;
    }

    var result = formatFunc(href, as);
    lastHref = href;
    lastAs = as;
    lastResult = result;
    return result;
  };
}

function formatUrl(url) {
  return url && typeof url === 'object' ? utils_1.formatWithValidation(url) : url;
}

var Link =
/*#__PURE__*/
function (_react_1$Component) {
  (0, _inherits2.default)(Link, _react_1$Component);

  function Link() {
    var _this;

    (0, _classCallCheck2.default)(this, Link);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Link).apply(this, arguments)); // The function is memoized so that no extra lifecycles are needed
    // as per https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html

    _this.formatUrls = memoizedFormatUrl(function (href, asHref) {
      return {
        href: formatUrl(href),
        as: formatUrl(asHref, true)
      };
    });

    _this.linkClicked = function (e) {
      var _e$currentTarget = e.currentTarget,
          nodeName = _e$currentTarget.nodeName,
          target = _e$currentTarget.target;

      if (nodeName === 'A' && (target && target !== '_self' || e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent && e.nativeEvent.which === 2)) {
        // ignore click for new tab / new window behavior
        return;
      }

      var _this$formatUrls = _this.formatUrls(_this.props.href, _this.props.as),
          href = _this$formatUrls.href,
          as = _this$formatUrls.as;

      if (!isLocal(href)) {
        // ignore click if it's outside our scope
        return;
      }

      var pathname = window.location.pathname;
      href = url_1.resolve(pathname, href);
      as = as ? url_1.resolve(pathname, as) : href;
      e.preventDefault(); //  avoid scroll for urls with anchor refs

      var scroll = _this.props.scroll;

      if (scroll == null) {
        scroll = as.indexOf('#') < 0;
      } // replace state instead of push if prop is present


      router_1.default[_this.props.replace ? 'replace' : 'push'](href, as, {
        shallow: _this.props.shallow
      }).then(function (success) {
        if (!success) return;

        if (scroll) {
          window.scrollTo(0, 0);
          document.body.focus();
        }
      }).catch(function (err) {
        if (_this.props.onError) _this.props.onError(err);
      });
    };

    return _this;
  }

  (0, _createClass2.default)(Link, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.prefetch();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if ((0, _stringify.default)(this.props.href) !== (0, _stringify.default)(prevProps.href)) {
        this.prefetch();
      }
    }
  }, {
    key: "prefetch",
    value: function prefetch() {
      if (!this.props.prefetch) return;
      if (typeof window === 'undefined') return; // Prefetch the JSON page if asked (only in the client)

      var pathname = window.location.pathname;

      var _this$formatUrls2 = this.formatUrls(this.props.href, this.props.as),
          parsedHref = _this$formatUrls2.href;

      var href = url_1.resolve(pathname, parsedHref);
      router_1.default.prefetch(href);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var children = this.props.children;

      var _this$formatUrls3 = this.formatUrls(this.props.href, this.props.as),
          href = _this$formatUrls3.href,
          as = _this$formatUrls3.as; // Deprecated. Warning shown by propType check. If the childen provided is a string (<Link>example</Link>) we wrap it in an <a> tag


      if (typeof children === 'string') {
        children = react_1.default.createElement("a", null, children);
      } // This will return the first child, if multiple are provided it will throw an error


      var child = react_1.Children.only(children);
      var props = {
        onClick: function onClick(e) {
          if (child.props && typeof child.props.onClick === 'function') {
            child.props.onClick(e);
          }

          if (!e.defaultPrevented) {
            _this2.linkClicked(e);
          }
        }
      }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
      // defined, we specify the current 'href', so that repetition is not needed by the user

      if (this.props.passHref || child.type === 'a' && !('href' in child.props)) {
        props.href = as || href;
      } // Add the ending slash to the paths. So, we can serve the
      // "<page>/index.html" directly.


      if (true) {
        if (props.href && typeof __NEXT_DATA__ !== 'undefined' && __NEXT_DATA__.nextExport) {
          props.href = router_1.Router._rewriteUrlForNextExport(props.href);
        }
      }

      return react_1.default.cloneElement(child, props);
    }
  }]);
  return Link;
}(react_1.Component);

if (true) {
  var warn = utils_1.execOnce(console.error); // This module gets removed by webpack.IgnorePlugin

  var exact = __webpack_require__(/*! prop-types-exact */ "prop-types-exact");

  Link.propTypes = exact({
    href: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.object]).isRequired,
    as: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.object]),
    prefetch: prop_types_1.default.bool,
    replace: prop_types_1.default.bool,
    shallow: prop_types_1.default.bool,
    passHref: prop_types_1.default.bool,
    scroll: prop_types_1.default.bool,
    children: prop_types_1.default.oneOfType([prop_types_1.default.element, function (props, propName) {
      var value = props[propName];

      if (typeof value === 'string') {
        warn("Warning: You're using a string directly inside <Link>. This usage has been deprecated. Please add an <a> tag as child of <Link>");
      }

      return null;
    }]).isRequired
  });
}

exports.default = Link;

/***/ }),

/***/ "./node_modules/next/link.js":
/*!***********************************!*\
  !*** ./node_modules/next/link.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/client/link */ "./node_modules/next/dist/client/link.js")


/***/ }),

/***/ "./pages/footer/addService.js":
/*!************************************!*\
  !*** ./pages/footer/addService.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _hoc_Layout_LayoutFaq__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hoc/Layout/LayoutFaq */ "./hoc/Layout/LayoutFaq.js");
/* harmony import */ var _hoc_Layout_Faq_NeedMoreFaq__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hoc/Layout/Faq/NeedMoreFaq */ "./hoc/Layout/Faq/NeedMoreFaq.js");
/* harmony import */ var _static_css_pages_footer_addService_addService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../static/css/pages/footer/addService/addService */ "./static/css/pages/footer/addService/addService.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Hidden */ "@material-ui/core/Hidden");
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_7__);









class AddService extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hoc_Layout_LayoutFaq__WEBPACK_IMPORTED_MODULE_3__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.mainContainerAddService
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        display: 'flex'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_7___default.a, {
      only: ['xs']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      style: {
        marginRight: '25px',
        color: '#F8CF61'
      }
    }, "1"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.titleRub
    }, "Inscrivez-vous & d\xE9taillez vos informations")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, {
      style: {
        marginTop: '5px'
      }
    }, "Commencez par vous inscrire en pr\xE9cisant votre adresse et votre num\xE9ro de t\xE9l\xE9phone")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        display: 'flex'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_7___default.a, {
      only: ['xs']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      style: {
        marginRight: '25px',
        color: '#84A5E0'
      }
    }, "2"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.titleRub
    }, "Commencez votre recherche")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, {
      style: {
        marginTop: '5px'
      }
    }, "Indiquez le type de service que vous recherchez dans de recherche et parcourez les diff\xE9rentes cat\xE9gorie de service")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        display: 'flex'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_7___default.a, {
      only: ['xs']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      style: {
        marginRight: '25px',
        color: '#F36B7F'
      }
    }, "3"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.titleRub
    }, "Choisissez votre Alfred et r\xE9servez !")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, {
      style: {
        marginTop: '5px'
      }
    }, "Choisissez le profil et la prestation qui vous int\xE9resse puis s\xE9lectionnez vos dates et vos options. Cliquez sur le bouton r\xE9servez et suivez la proc\xE9dure de paiement")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginTop: '10vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hoc_Layout_Faq_NeedMoreFaq__WEBPACK_IMPORTED_MODULE_4__["default"], null))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(_static_css_pages_footer_addService_addService__WEBPACK_IMPORTED_MODULE_5__["default"])(AddService));

/***/ }),

/***/ "./static/css/components/Layout/About/Footer/Footer.js":
/*!*************************************************************!*\
  !*** ./static/css/components/Layout/About/Footer/Footer.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  mainContainerFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderTop: '1px solid rgba(112,112,112,20%)',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-end'
    }
  },
  rightMainContainerFooter: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  mainContainerWidth: {
    width: '90%',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      justifyContent: 'flex-end',
      flexDirection: 'column'
    }
  },
  marginLink: {
    marginLeft: 20,
    marginRight: 20,
    [theme.breakpoints.down('xs')]: {
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 0,
      marginRight: 0
    }
  }
}));

/***/ }),

/***/ "./static/css/components/Layout/About/Header/Header.js":
/*!*************************************************************!*\
  !*** ./static/css/components/Layout/About/Header/Header.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  layoutScrollMenu: {
    display: 'flex',
    justifyContent: 'center',
    height: '10%',
    alignItems: 'flex-end'
  },
  containerTitleAndSubtitle: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5%',
    [theme.breakpoints.down('xs')]: {
      padding: '10%'
    }
  },
  containerArrowBack: {},
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  button: {
    margin: theme.spacing(1),
    color: 'white',
    textTransform: 'initial'
  },
  navbarSearchContainer: {},
  navbarSearch: {
    padding: 14,
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.border.button.borderRadius,
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 16px 32px, rgba(0, 0, 0, 0.1) 0px 3px 8px'
  },
  iconButton: {
    padding: 10,
    backgroundColor: theme.palette.yellow.main,
    color: theme.palette.white.main
  }
}));

/***/ }),

/***/ "./static/css/components/Layout/LayoutFaq/LayoutFaq.js":
/*!*************************************************************!*\
  !*** ./static/css/components/Layout/LayoutFaq/LayoutFaq.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  mainContainerLayoutFaq: {
    position: 'relative',
    minHeight: '100vh'
  },
  childrenContainer: {
    margin: '0 15%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: '5% 10%',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      paddingBottom: '20%'
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '45%'
    }
  },
  becomeAlfredPageContainer: {
    paddingBottom: '10%',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      paddingBottom: '20%'
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '45%'
    }
  },
  footerContainerFaq: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  }
}));

/***/ }),

/***/ "./static/css/components/ScrollMenu/ScrollMenu.js":
/*!********************************************************!*\
  !*** ./static/css/components/ScrollMenu/ScrollMenu.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  scrollMenuIndicator: {
    backgroundColor: theme.palette.yellow.main
  },
  scrollMenuTab: {
    textTransform: 'initial'
  }
}));

/***/ }),

/***/ "./static/css/pages/footer/addService/addService.js":
/*!**********************************************************!*\
  !*** ./static/css/pages/footer/addService/addService.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  titleRub: {
    fontWeight: 'bold'
  },
  mainContainerAddService: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  }
}));

/***/ }),

/***/ "./utils/i18n.js":
/*!***********************!*\
  !*** ./utils/i18n.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const KycDocumentStatus = __webpack_require__(/*! mangopay2-nodejs-sdk/lib/models/KycDocumentStatus */ "mangopay2-nodejs-sdk/lib/models/KycDocumentStatus");

const CESU_NOTICE = 'Quel que soit votre statut, My Alfred est tenu de déclarer aux \
finances publiques vos revenus générés <b>si les deux conditions suivantes sont \
réunies dans l\'année civile :</b><ul><li>vos revenus dépassent 3000 euros</li>\
<li>vous avez réalisé vingt prestations ou plus</li></ul>';
const OUTSIDE_PERIMETER = 'Ce service est hors de votre périmètre.';
const SCHEDULE_TITLE = 'Précisez vos disponibilités si vous le souhaitez !';
const SCHEDULE_SUBTITLE = "Votre calendrier vous permet d'ajouter vos disponibilités.\
 Lorsque vous ajoutez ou modifiez vos disponibilités, seules les plages horaires indiquées pourront être réservées.\
 Vous pouvez très facilement ajouter une période de disponibilité en indiquant les dates de début et fin, les jours correspondants et des tranches horaires.\
 Vous pouvez également sélectionner une date ou plusieurs, indiquer si vous êtes disponible et sélectionner les tranches horaires.";
const SHOP_CREATION_SUCCESSFUL = 'Vos services sont maintenant disponibles dans my Alfred';
const ID_CARD_CONFIRM_DELETION = 'Supprimer votre pièce d\'identité ?';
const REGISTRATION_PROOF_CONFIRM_DELETION = 'Supprimer votre document d\'immatriculation ?';
const MANGOPAY_MESSAGES = {
  'DOCUMENT_UNREADABLE': 'Pièce d\'identité illisible',
  'DOCUMENT_NOT_ACCEPTED': 'Pièce d\'identité invalide : carte d\'identité, passeport, permis de conduire ou titre de séjour attendu',
  'DOCUMENT_HAS_EXPIRED': 'Pièce d\'identité expirée',
  'DOCUMENT_INCOMPLETE': 'Pièce d\'identité incomplète ou illisible',
  'DOCUMENT_DO_NOT_MATCH_USER_DATA': 'Pièce d\'identité ne correspond pas à l\'identité que vous avez indiquée',
  'DOCUMENT_DO_NOT_MATCH_ACCOUNT_DATA': 'Pièce d\'identité ne correspond pas à vops coordonnées bancaires',
  'DOCUMENT_FALSIFIED': 'Pièce d\'identité falsifié',
  'DOCUMENT_MISSING': 'Pièce d\'identité vide',
  'UNDERAGE_PERSON': 'Vous devez avoir au minimum 18 ans',
  [KycDocumentStatus.Created]: 'Pièce d\'identité enregistrée, en attente de validation',
  [KycDocumentStatus.ValidationAsked]: 'Pièce d\'identité en cours de validation',
  [KycDocumentStatus.Validated]: 'Pièce d\'identité valide',
  [KycDocumentStatus.Refused]: 'Pièce d\'identité refusée, merci d\'en fournir une valide'
};
const INFOBAR_MESSAGE = {
  message: 'Renseignez-vous sur les restrictions COVID 19 avant de réserver.',
  showMore: 'En savoir plus'
};
const SHOWMORE = 'En savoir plus';
const SEARCHBAR = {
  what: 'Quel service ?',
  where: 'Où ?',
  when: 'Quand ?',
  labelWhere: 'L\'adresse',
  labelWhat: 'Le service',
  labelWhen: 'Les dates'
};
const NAVBAR_MENU = {
  ourServices: 'Nos services',
  myServices: 'Mes services',
  registerServices: 'Proposer mes services',
  ourTeam: 'Notre équipe',
  contactUs: 'Nous contacter',
  aboutUs: 'À propos',
  ourCom: 'Notre communauté',
  signIn: 'Inscription',
  logIn: 'Connexion'
};
const BANNER_PRESENTATION = {
  title: 'Et si vous pouviez réserver n\'importe quel service ?',
  text: 'Stressez moins. En quelques clics, trouver la personne et le service dont vous avez besoin.',
  button: 'Découvrir'
};
const CATEGORY = {
  title: 'Catégories',
  text: 'Des milliers de services à découvrir',
  button: 'Tout découvrir'
};
const BECOME_ALFRED = {
  title: 'Devenir Alfred',
  text: 'Créez votre compte et proposez vos services',
  button: 'En savoir plus'
};
const RESA_SERVICE = {
  title: 'Proposez un service',
  text: 'Créez votre compte et proposez un service',
  button: 'C\'est parti !'
};
const HOW_IT_WORKS = {
  leftText: 'En quelques clics,\n' + 'réserver le service et la\n' + 'personne dont vous avez besoin.\n' + '#MyAlfred.',
  rightText: 'Vous pouvez consulter des centaines de profils, choisir votre Alfred, réservez et payez en ligne votre service. Notre équipe vous accompagne à chaque étape !'
};
const NEWS_LETTER = {
  title: 'Profitez des bon plans de la communauté avec la Newsletter des Alfred',
  text: 'Inscrivez-vous gratuitement à notre super Newsletter pour recevoir les informations et les bons plans de la communauté.',
  google: 'S\'inscrire avec Google',
  where: 'ou',
  email: 'Email',
  button: 'Je m\'inscris !'
};
const CMP_PRESENTATION = {
  placeholder: 'Ici, parlez-nous de vous, de votre personnalité, de vos passions ou encore de votre parcours. Soyez vous-même et montrez-nous votre personnalité !'
};

const getMangopayMessage = msg_id => {
  if (!msg_id) {
    return null;
  }

  return MANGOPAY_MESSAGES[msg_id] || `Erreur inconnue:${msg_id}`;
};

const SHOP = {
  addService: 'Ajoutez des services',
  createShop: 'Proposez votre premier service'
};
const BOOKING = {
  MSG_EVALUATE: 'Vous avez 15 jours pour évaluer votre client. Une fois que votre client aura rédigé son commentaire, il pourra consulter votre évaluation et vous pourrez consulter la sienne !'
};
const FAQ_ALFRED = {
  "Devenir Alfred": [{
    title: 'Qui peut devenir Alfred ?',
    contents: '<p>Nous sommes tous des Alfred ! Dès l’âge de 16 ans, vous pouvez devenir Alfred en créant votre propre boutique de service(s) sur My Alfred.\
      Votre inscription et la mise en ligne de votre boutique sont entièrement gratuites et ne demandent aucun frais au préalable ou abonnement vous engageant sur la durée.Vous pouvez proposer immédiatement vos talents, vos compétences sur My Alfred en choisissant la liste des services que vous souhaitez proposer. Nous avons répertorié pour vous plus de 2000 prestations classées dans des services et des catégories. Alors, prêt à rejoindre l’aventure ? Je deviens alfred maintenant !</p>'
  }, {
    title: 'Comment créer sa boutique de service ?',
    contents: '<p>My Alfred vous permet de créer votre propre boutique de service(s) et de définir les services et prestations que vous souhaitez réaliser tout en vous offrant pleine liberté sur vos conditions !Nos Alfred fixent leur(s) prix ainsi que leur(s) méthode(s) de facturation librement, et peuvent ajuster leur(s) prix à tout moment. Afin de proposer une visibilité et une confiance accrue entre les utilisateurs et les Alfred, la boutique de service(s) offre un niveau de personnalisation élevé permettant à tout à chacun de décrire son expertise, ses diplômes et certifications, des options liées à ses services, le matériel fourni dans le cadre de son service ou encore ses disponibilités.Les Alfred sont également libres de choisir leurs propres conditions de réservation et d’annulation !</p><p>Prêt à vous lancer ? Pour démarrer la création de votre boutique, l’inscription est obligatoire. Une fois identifé(e)sur My Alfred, il suffit de cliquer sur le bouton “Devenir Alfred’’.</p><p>Simple et rapide, la création de votre boutique se déroule en 3 étapes et ne vous prendra quelques minutes :</p><p>Etape 1 : Sélection des services<br/>A travers cette étape, vous pouvez sélectionner les services que vous souhaitez réaliser. Nous avons classé ces services dans des catégories pour vous permettre de trouver plus rapidement les services concernés. Un service n\'apparaît pas ?Contacter l’équipe My Alfred à l’adresse <a href={\'mailto:unservicedeplus@my-alfred.io\'}>unservicedeplus@my-alfred.io</a> !</p><p>Etape 2 : Indiquez vos prix, vos disponibilités et conditions<br/>Pour chaque service sélectionné, vous devez renseigner un prix par prestation, vos disponibilités et vos conditions de réservation pour permettre à vos clients de réserver vos services avec un maximum d’informations.</p><p>Etape 3 : Indiquez vos prix, vos disponibilités et conditions<br/>Cette dernière étape vous permet d’ajouter une photo de profil, de vérifier votre téléphone portable, votre identité et d’indiquer si vous souhaitez réaliser vos services en tant que particulier ou auto-entrepreneur.</p><p>C’est fini ! Vous avez maintenant votre propre boutique de services sur My Alfred. A tout moment, vous pouvez ajouter, modifier, supprimer un ou plusieurs services dans la rubrique ma boutique !Pensez à maintenir votre calendrier à jour afin d\'apparaître dans les résultats de recherche des utilisateurs :) !</p>'
  }, {
    title: 'Que dois-je déclarer dans mes revenus ?',
    contents: '<p>My Alfred est une plateforme appartenant à l’économie collaborative permettant à tout un chacun de consommer et/ou de proposer des services contre une rémunération. L’économie collaborative est tout à fait légale à condition de déclarer ses revenus et d’adopter le statut correspondant en fonction de la nature occasionnelle ou non de vos services.En tant que particulier, vous devez vous devez déclarer le montant de vos prestations dans vos revenus dès lors que vous avez perçu plus de 3 000 € ou effectué plus de 20 transactions au cours de l’année précédente, mais vous n’avez pas de déclaration sociale ou deTVA à réaliser.Si votre activité n’est pas occasionnelle mais régulière, vous devez déclarer vos revenus et payer des cotisations sociales. Dans ce cas, le statut d’auto-entrepreneur est alors parfaitement adapté pour vous.</p>'
  }],
  'Créer votre boutique de service': [{
    title: 'Comment ajouter un nouveau service dans ma boutique ?',
    contents: '<p>Vous pouvez à tout moment ajouter de nouveaux services dans votre boutique.Pour cela, rendez-vous dans votre boutique et cliquez sur <span style=\{\{color: \'#2FBCD3\'\}\}>ajouter un nouveau service.</span><br/>Vous devez ensuite suivre les différentes étapes d’ajout d’un nouveau service comme lors de la création de votre boutique.</p>'
  }, {
    title: 'Comment fixer le prix de mes prestations ?',
    contents: '<p>Pour chaque service sélectionné, il vous est proposé une ou plusieurs prestations. Vous devez sélectionner les prestations que vous souhaitez effectuer et pour lesquelles un prix doit être renseigné. Le prix de votre prestation doit être indiqué en tenant compte du mode de facturation. Un mode de facturation vous est proposé par défaut mais vous pouvez le modifier si ce dernier ne vous convient pas.</p><p>Vous pouvez à tout moment visualiser ou modifier le prix et le mode de facturation de vos services dans votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier le prix de vos prestations :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez votre Boutique sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes services</strong></li><li>Cliquez sur <strong>Modifier</strong> dans un service</li><li>Modifier les prix de vos prestations puis cliquez sur <strong>Enregistrer</strong></li></ol>'
  }, {
    title: 'A quoi servent les options dans ma boutique de service ?',
    contents: '<p>Pour chaque service, vous avez la possibilité d’ajouter une option de facturation. Cette option vous permet de compléter le prix de votre prestation en ajoutant un supplément de prix que le client pourra sélectionner. Par exemple, vous pouvez ajouter une option“retrait et livraison” et indiquer le prix de cette option.</p><p>Vous pouvez à tout moment visualiser ou modifier les options de vos services dans votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier les options d\'un service :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes services</strong></li><li>Cliquez sur <strong>Modifier</strong> dans un service</li><li>Modifier les options de vos prestations puis cliquez sur <strong>Enregistrer</strong></li></ol>'
  }, {
    title: 'A quoi correspond le matériel fourni dans ma boutique de service ?',
    contents: '<p>Pour chaque service, vous pouvez sélectionner le matériel et les consommables qui seront utilisés lors de votre prestation. Lorsqu’un client parcourra votre boutique ou sélectionnera vos services,il pourra alors connaître les équipements dont vous disposez pour la prestation et les consommablesque vous fournissez. Certains services nécessitent du matériels pécifique. Indiquez que vous disposez de ce matériel offre à vos clients un gage de qualité et de professionnalisme au regard des services que vous pouvez réaliser !</p><p>Vous pouvez à tout moment visualiser ou modifier le matériel et consommables fournis dans vos services dans votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier le matériel fourni dans votre service :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes services</strong></li><li>Cliquez sur <strong>Modifier</strong> dans un service</li><li>Sélectionnez le matériel et consommables puis cliquez sur <strong>Enregistrer</strong></li></ol>'
  }, {
    title: 'Comment définir un montant minimum pour mon service ?',
    contents: '<p>Le montant minimum de réservation correspond au panier minimum requis pour réserver ce service.Si vous indiquez un montant de 10€, les clients ne pourront pas réserver vos services si la somme des prestations n’atteint pas ce montant.</p><p>Vous pouvez à tout moment visualiser ou modifier le montant minimum de vos services dans votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier le montant minimum d\'un service :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes services</strong></li><li>Cliquez sur <strong>Modifier</strong> dans un service</li><li>Modifiez le montant minimum puis cliquez sur <strong>Enregistrer</strong></li></ol>'
  }, {
    title: 'Comment définir mon périmètre d\'intervention ?',
    contents: '<p>Votre périmètre d’intervention correspond à la zone dans laquelle vous souhaitez réaliser votre service.Par défaut, nous utilisons la ville de votre profil comme référence.Cette adresse ne vous convient pas ? Vous pouvez changer votre ville de référence à tout moment!Le périmètre que vous indiquez va permettre à la plateforme My Alfred de proposer votre service si le périmètre d’intervention correspond à l’adresse du client. Si le client se trouve à 5km de votre adresse et que vous avez indiquez un périmètre de 10km votre service sera proposé !</p><p>Vous pouvez à tout moment visualiser ou modifier le périmètre d’intervention de vos services dans votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier le périmètre d\'intervention d\'un service :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes services</strong></li><li>Cliquez sur <strong>Modifier</strong> dans un service</li><li>Modifiez le périmètre d\'intervention puis cliquez sur <strong>Enregistrer</strong></li></ol>'
  }, {
    title: 'A quoi correspond le délai de prévenance ?',
    contents: '<p>Le délai de prévenance correspond au délai nécessaire entre la réservation et la réalisation du service. Par exemple, si vous indiquez un délai de 24 heures, un client devra réserver votre service au moins 24heures avant votre intervention.Le délai de prévenance peut se définir en heure, jour ou mois en indiquant le chiffre correspondant avec les boutons + et - dans votre boutique.</p><p>Vous pouvez à tout moment visualiser ou modifier le délai de prévenance de vos services dans votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier le délai de prévenance d\'un service :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes services</strong></li><li>Cliquez sur <strong>Modifier</strong> dans un service</li><li>Modifiez le délai de prévenance puis cliquez sur <strong>Enregistrer</strong></li></ol>'
  }, {
    title: 'Pourquoi décrire brièvement mon expertise ?',
    contents: '<p>Pour chaque service sélectionné, vous pouvez brièvement décrire votre expertise.N’hésitez pas à mettre en évidence vos compétences et votre expertise pour un service.Les utilisateurs auront accès à ces informations, n’hésitez pas à valoriser vos réalisations et vos atouts pour ce service !</p><p>Vous pouvez à tout moment visualiser ou modifier le contenu de votre expertise de vos services dans votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier la description de votre expertise d\'un service :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes services</strong></li><li>Cliquez sur <strong>Modifier</strong> dans un service</li><li>Modifiez le contenu de votre expertise puis cliquez sur <strong>Enregistrer</strong></li></ol>'
  }, {
    title: 'Pourquoi dois-je ajouter mes années d’expérience, mes diplômes et certifications ?',
    contents: '<p>Pour chaque service sélectionné, vous pouvez indiquer une nombre d\'années d\'expérience pour ce service et télécharger un diplôme et/ou une certification reçu pour ce service. Concernant le diplôme,vous pouvez indiquez le nom de votre diplôme et son année d’obtention.En téléchargeant votre diplôme,votre diplôme aura le statut de diplôme vérifié auprès des utilisateurs mais il ne sera jamais visible par ces derniers! C’est exactement le même principe pour votre certification.</p><p>Vous pouvez à tout moment visualiser ou modifier le nombre d\'années d\'expérience et les diplômes et certifications téléchargés de vos services dans votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier vos années d’expérience, vos diplômes et certifications d\'un service :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes services</strong></li><li>Cliquez sur <strong>Modifier</strong> dans un service</li><li>Modifiez votre nombre d’années d’expérience, supprimer ou ajouter un diplôme ou une certification puis cliquez sur <strong>Enregistrer</strong></li></ol>'
  }, {
    title: 'Comment indiquer mes disponibilités dans mon calendrier ?',
    contents: '<p>Il est indispensable d’indiquer vos disponibilités lors de la création de votre boutique afin d\'apparaître dans les résultats de recherche des utilisateurs.Lorsqu’un client recherchera un service sur la plateforme, il indiquera le service recherché, et très souvent indiquera une date et/ou un heure à laquelle il souhaite obtenir ce service.Si vos disponibilités indiquées dans votre calendrier correspondent à la demande du client, vos services seront proposés dans les résultats de la recherche !Afin de renseigner convenablement votre calendrier, My Alfred vous permet d’indiquer, jour par jour vos périodes de disponibilité. Plusieurs périodes peuvent être indiquées pour un même jour ou pour une période récurrente. Par exemple, vous pouvez être disponible le mercredi de 10h à 12h puis de 14h à 18h.Vous pouvez ensuite étendre vos heures de disponibilités de vos journées sur une période de dates.Par exemple, les périodes horaires renseignées s’appliquent pour la période du 1er octobre 2019 au 20 décembre 2019.Si vous proposez plusieurs services, les disponibilités indiquées peuvent être définies par service ou pour l’ensemble de vos services.</p><p>Vous pouvez à tout moment visualiser ou modifier le calendrier de vos disponibilités de vos service dans votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier votre calendrier de disponibilités :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mon calendrier</strong></li><li>Cliquez sur <strong>Ajouter ou modifier dans la page calendrier</strong></li><li>Modifiez les jours, heures et périodes de vos disponibilités puis cliquez sur <strong>Enregistrer</strong></li></ol>'
  }, {
    title: 'Comment les utilisateurs peuvent réserver ?',
    contents: "<p>Pour l’ensemble de vos services, vous devez préciser la façon dont vous souhaitez que vos clients réservent vos services. Soit vous permettez à vos clients de réserver vos services automatiquement,soit vous souhaitez recevoir une notification pour laquelle vous avez 24h pour répondre. Lors d'une réservation automatique, le service est réservé et payé par le client.Si vous avez opté pour une validation de la réservation, le service ne sera réservé et payé qu’après votre acceptation.</p><p>Vous pouvez à tout moment visualiser ou modifier la façon dont vous souhaitez que vos clients réservent vos services dans votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier la façon dont vos clients peuvent réserver vos services :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes paramètres de réservation</strong></li><li>Cliquez sur <strong>Modifier</strong>dans un service</li><li>Sélectionnez la façon dont vous souhaitez que vos clients réservent vos services puis cliquez sur <strong>Enregistrer</strong></li></ol>"
  }, {
    title: 'A quoi correspondent mes conditions de réservation ?',
    contents: '<p>Les conditions de réservation définissent les éléments que vous souhaitez vérifier à propos de vos clients. Vous pouvez exiger différentes options. Ces options sont cumulatives.</p><p>Conditions My Alfred<br/>Adresse email et numéro de téléphone confirmés</p><p>Photo de profil<br/>Ces utilisateurs ont fourni une photo de profile.</p><p>Pièce d\'identité officielle<br/>Ces utilisateurs ont vérifié leur identité.</p><p>Recommandations d\'autres Alfred<br/>Ces utilisateurs ont déjà utilisé des services avec My Alfred, sont recommandés par d\'autresAlfred et n\'ont pas reçu de commentaires négatifs.</p><p>Il se peut que vous ayez moins de réservation si vous ajoutez des conditions. Les personnes quine répondent pas à vos critères peuvent quand même vous envoyer une demande.</p><p>Vous pouvez à tout moment visualiser ou modifier les conditions de réservation de vos services dans votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier vos conditions de réservation de vos services :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes paramètres de réservation</strong></li><li>Cliquez sur <strong>Modifier</strong>dans un service</li><li>Sélectionnez ou désélectionnez les options de vos conditions de réservation puis cliquez sur <strong>Enregistrer</strong></li></ol>'
  }, {
    title: 'Comment gérer ma photo de profil ?',
    contents: '<p>La photo de votre profil sera visible des utilisateurs du site et leur permettra de déjà vous connaître! Téléchargez une photo claire et lumineuse, de bonne qualité. Pour un rendu optimal, la photo doit être cadrée, sans lunette de soleil, en regardant l’objectif, avec seulement vous sur la photo.</p><p>Vous pouvez à tout moment visualiser, ajouter ou supprimer votre photo dans votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour ajouter ou supprimer votre photo de profil :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Profil</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Ma photo</strong></li><li>Cliquez sur <strong>Télécharger une photo depuis votre ordinateur </strong></li><li>Cliquez sur <strong>Valider</strong></li></ol>'
  }, {
    title: 'Comment définir mes conditions d\'annulations ?',
    contents: '<p>Les conditions d’annulation définissent sous quelle condition vous acceptez l’annulation d’une réservation par un client. Nous avons définis 3 niveaux de conditions d’annulation :</p><p>Flexibles<br/>Remboursement intégral lorsque l’annulation d’un client intervient jusqu\'à 1 jour avant la prestation.</p><p>Modérées<br/>Remboursement intégral lorsque l’annulation d’un client intervient jusqu\'à 5 jours avant la prestation.</p><p>Strictes<br/>Remboursement intégral lorsque l’annulation d’un client intervient jusqu\'à 10 jours avant la prestation.</p><p>Vous pouvez à tout moment visualiser ou modifier vos conditions d’annulation de vos services dans votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier vos conditions d’annulation de vos services dans votre boutique :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes paramètres de réservation</strong></li><li>Sélectionnez le type de condition d’annulation de réservation de vos services puis cliquez sur<strong> Enregistrer</strong></li></ol>'
  }, {
    title: 'Comment gérer ma photo de couverture ?',
    contents: '<p>Votre photo de couverture est la photo positionnée en en-tête de votre boutique. Elle sera visible des utilisateurs du site.La photo de couverture peut refléter vos goûts, vous permettre de mettre votre travail en avant etc.Par défaut, My Alfred attribue une photo de couverture à votre boutique.</p><p>Vous pouvez à tout moment visualiser, ajouter ou supprimer votre photo dans votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Pour ajouter ou supprimer votre photo de couverture :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Boutique</strong> sur my-alfred.io</li><li>Cliquez sur le crayon pour modifier, en haut à droite de votre photo de couverture</li><li>Sélectionnez votre photo de couverture</li><li>Cliquez sur <strong>Valider</strong></li></ol>'
  }],
  "Mes versements": [{
    title: 'Comment toucher mon versement ?',
    contents: '<p>Une fois la réservation confirmée, l’utilisateur à l’origine de la réservation reçoit un code unique et dédié à votre réservation.Lorsque le service est réalisé, votre client doit vous communiquer ce code afin que vous puissiez toucher votre versement.</p><p>Une fois que vous avez votre code, rendez-vous sur votre fiche réservation depuis votre smartphone ou depuis votre ordinateur et cliquez sur “Indiquer mon code”. Saisissez les chiffres de votre code et validez.Une fois le code validé, vous recevrez votre versement sur le compte bancaire renseigné dans “Préférence de versement” dans un délai de 4 jours maximum.Si vous n’avez pas renseigné d’IBAN, vous devrez l’ajouter avant votre première prestation, dans la rubrique “Préférence de versement” de votre compte.</p>'
  }, {
    title: 'Pourquoi dois-je communiquer un IBAN ?',
    contents: '<p>Pour devenir Alfred, il est impératif qu’un mode de versement soit renseigné dans votre compte utilisateur. En effet, après chaque service réalisé, My Alfred procède au versement du montant indiqué sur la réservation sur votre compte bancaire.</p><p style=\{\{width: \'100%\'\}\}>Pour ajouter ou supprimer votre IBAN :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Compte</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Mes préférences de versement</strong></li><li>Cliquez sur <strong>Ajouter un RIB</strong></li></ol>'
  }, {
    title: 'Quels sont les documents à fournir pour les versements ?',
    contents: '<p>Pour que nous puissions effectuer le versement de votre prestations,vous devez nous fournir les éléments suivants en fonction de votre statut de particulier ou d’auto-entrepreneur.Ces éléments vous sont demandés lors de votre inscription et lors de la création de votre boutique.</p><p style=\{\{width: \'100%\'\}\}>Vous êtes un particulier :</p><br/><ul style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Votre nom et prénom</li><li>Votre date de naissance</li><li>Votre pays de résidence</li><li>Votre nationalité</li><li>Votre pièce d\'identité</li><li>Votre compte bancaire (IBAN)</li></ul><p style=\{\{width: \'100%\'\}\}>Vous êtes un auto-entrepreneur, en complément des éléments ci-dessus,les éléments suivants vous sont également demandés :</p><ul style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Votre email</li><li>Nom de votre entreprise</li></ul>'
  }, {
    title: 'Comment puis-je retrouver mes informations de versements ?',
    contents: '<p>En tant qu’Alfred, vous pouvez suivre l’ensemble de vos versements dans la rubrique performance de votre boutique.A l’aide de votre tableau de bord, suivez l’évolution de vos versements passés et à venir, et retrouvez toutes les informations sur vos versements.</p><p style=\{\{width: \'100%\'\}\}>Pour consulter vos informations de versements :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Je suisAlfred</strong></li><li>Cliquez sur l’onglet <strong>Performance</strong></li><li>Cliquez sur <strong>revenus</strong></li></ol>'
  }],
  "Mes réservations": [{
    title: 'Comment modifier une réservation confirmée en tant qu’Alfred ?',
    contents: '<p>En tant qu’Alfred, vous pouvez modifier une réservation à la seule condition que votre utilisateur l’accepte. Si votre utilisateur l’accepte, vous pouvez modifier la date et l’horaire de votre service,son prix, le prix de votre option ou compléter le service par une prestation présente dans votre service.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier votre réservation :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Je suisAlfred</strong></li><li>Cliquez sur <strong>Mes réservations</strong></li><li>Parcourez votre fiche réservation et cliquez sur modifier en bas de votre fiche de réservation</li><li>Cliquez sur <strong>Modifier la réservation</strong></li><li>Indiquez le champs que vous souhaitez modifier(prix/prestations/option/date etc.)</li><li>Cliquez sur <strong>Envoyer une demande de modification</strong></li></ol><p>Une fois la demande de modification envoyée, vous devrez attendre la validation de votre client pour qu’elle soit modifiée. Votre fiche de réservation se mettra automatiquement à jour.</p>'
  }, {
    title: 'Comment annuler une réservation en tant qu’Alfred ?',
    contents: "<p>L’annulation d’une réservation entraîne du stress et est susceptible d'impacter votre client utilisateur. En tant qu’Alfred, vous pouvez annuler une réservation mais vous vous exposez à une pénalité de la part de votre client utilisateur. Si vous avez activé la réservation automatique sans demande de confirmation, vous pouvez annuler vos réservations sans pénalités mais un commentaire mentionnant que vous avez annulé la réservation sera automatiquement publié sur votre boutique.</p><p>Si vous n’avez pas activé la réservation automatique et décidez d’annuler une réservation plus de 7 jours avant la date d’exécution définie, une pénalité forfaitaire de 10€ vous sera demandée,et 20€ si l’annulation intervient 7 jours ou moins avant la date d’exécution du service définie dans la réservation. Par ailleurs, si vous annulez des réservations de trop nombreuses fois, vous ne respectez plus les CGU de My Alfred et votre boutique ne sera plus visible.</p><p>En cas d’annulation d’une réservation par un Alfred, le client utilisateur sera remboursé de la totalité des frais engagés sur la plateforme My Alfred dans le cadre de la réservation concernée.</p><p style=\{\{width: \'100%\'\}\}>Pour annuler votre réservation :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Je suisAlfred</strong></li><li>Cliquez sur <strong>Mes réservations</strong></li><li>Parcourez votre fiche réservation et cliquez sur modifier en bas de votre fiche de réservation</li><li>Cliquez sur <strong>Annuler ma réservation</strong></li><li>Choisissez le motif de l’annulation</li><li>Rédigez un message à votre client utilisateur lui expliquant que son service est annulé</li><li>Cliquez sur <strong>Enregistrer</strong></li></ol><p>A noter qu’en cas d’imprévu, vous avez la possibilité de modifier la date de la réservation avec l’accord de votre client utilisateur My Alfred.</p>"
  }, {
    title: 'Quelles sont les pénalités si j’annule une réservation en tant qu’Alfred ?',
    contents: '<p>En tant qu’Alfred, vous pouvez annuler une réservation mais vous vous exposez à une pénalité de la part de votre client utilisateur. Si vous avez activé la réservation automatique sans demande de confirmation, vous pouvez annuler vos réservations sans pénalités mais un commentaire mentionnant que vous avez annulé la réservation sera automatiquement publié sur votre boutique.</p><p>Si vous n’avez pas activé la réservation automatique et décidez d’annuler une réservation plusde7 jours avant la date d’exécution définie, une pénalité forfaitaire de 10€ vous sera demandée, et 20€ si l’annulation intervient 7 jours ou moins avant la date d’exécution du service définie dans la réservation. Par ailleurs, si vous annulez des réservations de trop nombreuses fois, vous ne respectez plus les CGU de My Alfred et votre boutique ne sera plus visible.</p>'
  }, {
    title: 'Comment rembourser mon utilisateur ?',
    contents: '<p>En cas d’annulation d’une réservation par un Alfred, le client utilisateur. sera remboursé de la totalité des frais engagés sur la plateforme My Alfred dans le cadre de la réservation concernée.</p><p style=\{\{width: \'100%\'\}\}>Pour annuler votre réservation :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Je suisAlfred</strong></li><li>Cliquez sur <strong>Mes réservations</strong></li><li>Parcourez votre fiche réservation et cliquez sur modifier en bas de votre fiche de réservation</li><li>Cliquez sur <strong>Annuler ma réservation</strong></li><li>Choisissez le motif de l’annulation</li><li>Rédigez un message à votre client utilisateur lui expliquant que son service est annulé</li><li>Cliquez sur <strong>Enregistrer</strong></li></ol><p>A noter qu’en cas d’imprévu, vous avez la possibilité de modifier la date de la réservation avec l’accord de votre client utilisateur My Alfred.</p>'
  }],
  "Mon compte": [{
    title: 'Comment supprimer sa boutique ?',
    contents: '<p>A tout moment, vous avez la possibilité de supprimer votre boutique de services My Alfred.La suppression de votre boutique entraîne l’annulation de l’ensemble des réservations acceptées à venir, et leur remboursement.</p><p style=\{\{width: \'100%\'\}\}>Pour supprimer votre boutique :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mes paramètres</strong></li><li>Cliquez sur <strong>Paramètres</strong></li><li>Cliquez sur <strong>Supprimer</strong> dans la rubrique je souhaite supprimer ma boutique de services</li></ol><p>Saisissez votre mot de passe. Cette étape nous permet de nous assurer que vous êtes bien à l’initiative de la suppression de votre compte. Attention, cette action est irrémédiable.</p>'
  }, {
    title: 'Comment gérer mes modes de versement ?',
    contents: '<p>Après chaque prestation réalisée par un Alfred, un versement du montant indiqué sur la fiche de réservation lui sera adressé sur le mode de versement renseigné dans son compte utilisateur.A tout moment, vous pouvez ajouter ou supprimer un mode de versement.</p><p style=\{\{width: \'100%\'\}\}>Pour ajouter ou modifier votre préférence de versement :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mes paramètres</strong></li><li>Cliquez sur <strong>Préférences de versement</strong></li><li>Cliquez sur <strong>Ajouter un RIB</strong></li><li>Renseignez votre IBAN</li></ol><p>Vous pourrez ensuite modifier ou supprimer votre RIB.</p>'
  }]
};
const FAQ_CLIENT = {
  "Identification et vérification": [{
    title: 'Fonctionnement ?',
    contents: "<p>Chez My Alfred nous souhaitons que les membres puissent proposer et consommer des services en toute sécurité. C’est la raison pour laquelle , nous vous laissons la possibilité de nous fournir une pièce d'identité officielle lorsque vous êtes utilisateur et souhaitez simplement consommer des services. Lorsque vous souhaitez proposer vos services et devenir Alfred, nous vous demanderons une pièce d’identité. Certains clients seront sensibles à cette vérification d’identité et feront plus facilement le choix de votre boutique. Cependant, votre pièce d'identité ne sera jamais partagée ni visible par un autre utilisateur de My Alfred.</p>"
  }, {
    title: 'A quel moment dois-je fournir une pièce d\'identité ?',
    contents: "<p>Pour devenir Alfred, vous devez fournir une pièce d’identité en règle qui peut être soit une carte nationale d’identité soit un passeport. Vous pouvez fournir cette pièce d’identité. lors de la création de votre boutique ou plus tard dans le menu Votre profil. La vérification de votre pièce d'identité est indispensable pour Devenir Alfred et pour que votre boutique soit visible des autres membres My Alfred.</p><p>Vous pouvez à tout moment insérer votre pièce d\'identité .</p><p style=\{\{width: \'100%\'\}\}>c</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Profil</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Confiance & vérification</strong> de votre compte</li><li>Sélectionnez le type de pièce Passeport ou Carte nationale d’identité</li><li>Cliquez sur Recto pour télécharger votre photo de pièce d’identité</li><li>Cliquez sur Verso pour ajouter le verso de votre pièce d’identité.</li></ol>"
  }, {
    title: 'Quel type de pièce d\'identité puis-je fournir ?',
    contents: '<p style=\{\{width: \'100%\'\}\}>Vous pouvez ajouter une des pièces d’identité officielle suivante sur la plateforme My Alfred :</p><br/><ul style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Passeport</li><li>Carte Nationale d’Identité</li></ul><p>Si vous ajoutez votre carte Nationale d’identité, vous devrez télécharger 2 photos à savoir,le recto et le verso de votre document. Si vous ajoutez votre passeport,1 seule photo à télécharger est nécessaire mais assurez vous que que les numéros situés en bas de la page du passeport où figure votre photo soient bien visibles.</p>'
  }, {
    title: 'Quelles sont les données partagées avec votre pièce d’identité ?',
    contents: '<p style=\{\{width: \'100%\'\}\}>Si vous acceptez de fournir une pièce d\'identité officielle, les informations suivantes peuvent être visibles par les autres utilisateurs de la plateforme My Alfred :</p><br/><ul style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>La confirmation que votre pièce d\'identité a bien été ajoutée</li><li>Votre photo de profil et le prénom et le nom figurant sur votre profil</li></ul><p>La photo de votre carte d’identité ainsi que les informations (à l\’exception de votre nom et prénom)ne seront jamais visibles par les autres utilisateurs de la plateforme My Alfred.</p>'
  }, {
    title: 'Comment est stockée ou supprimée la photo de ma pièce d\'identité ?',
    contents: '<p>Le stockage de la photo de votre pièce d\'identité officielle est régie par notre <Linkhref={\'/\'}><a> Politique de confidentialité.</a></Link>Il est préférable de ne pas supprimer votre pièce d’identité. Si vous avez des réservations pour lesquelles les clients ont exigé une pièce d’identité vérifiée, nous annulerons toutes les réservation concernées à venir.Cependant, vous pouvez demander la suppression de la photo de votre pièce d\'identité 90 jours après la fin de votre dernière réservation.</p><p style=\{\{width: \'100%\'\}\}>Pour supprimer la photo de votre pièce d\'identité :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Consultez <strong>votre Profil</strong> sur my-alfred.io</li><li>Cliquez sur l’onglet <strong>Confiance & vérification</strong> de votre compte</li><li>Cliquez sur la corbeille à côté de votre pièce d’identité pour la supprimer</li></ol>'
  }],
  "Mes réservations": [{
    title: 'Puis-je modifier le prix d’une réservation en attente ou confirmée ?',
    contents: '<p>Chaque réservation peut-être modifiée quelque soit son statut. En revanche, votre client utilisateur doit impérativement accepter cette modification pour que la réservation retrouve son statut confirmée.</p><p>Si votre réservation est confirmée mais que vous choisissez de la modifier, son statut passera de réservation confirmée à réservation en attente jusqu’à ce que votre client utilisateur confirme les modifications.</p><p>Si votre utilisateur ne valide pas vos modifications dans un délai 48h,la réservation est expirée. Si votre utilisateur refuse vos modifications, la réservation est annulée et votre client sera remboursé de l’intégralité du montant engagé.</p>'
  }, {
    title: 'Puis-je planifier mon service sur plusieurs jours ?',
    contents: "<p>Dans le cadre de services susceptibles de se dérouler sur plusieurs journées ou plusieurs créneaux horaires, nous vous recommandons de vous rapprocher de votre client utilisateur. afin d'établir ensemble, un planning d’intervention.Une fois le planning d’intervention établi, vous pourrez renseigner ce dernier dans votre fiche réservation et dans votre calendrier; celui de votre client se mettra automatiquement à jour(périodes renseignées indisponibles).</p><p>A noter que la version publique de votre calendrier ne comporte que des périodes disponibles ou indisponibles, et non le contenu de vos services.</p>"
  }, {
    title: 'Puis-je échanger avec mon Alfred ou mon client ?',
    contents: '<p>Les utilisateurs sont en mesure de vous contacter afin d’obtenir des renseignements complémentaires sur l’un de vos services. Ils pourront vous contacter mais leurs coordonnées n\'apparaîtront pas,et vous ne pourrez pas leur communiquer votre numéro de téléphone et email personnel. Dès lors qu’une demande de réservation est envoyée, vous pourrez échanger avec votre utilisateur ou votre alfred depuis la messagerie de My Alfred.En revanche, dès lors qu’une réservation est confirmée, vous pourrez échanger depuis la plateforme My Alfred, et les coordonnées de votre Alfred ou de l’utilisateur seront échangées pour un maximum de fluidité dans la réservation de la prestation.</p><p>Pour retrouver vos messages en tant qu’utilisateur, il vous suffit de vous rendre dans l’onglet<strong> Messages</strong>. Pour retrouver vos messages en tant qu’Alfred, il vous suffit de cliquer sur l’onglet<strong> Je suis Alfred</strong>, et de vous rendre dans la rubrique <strong>Messages</strong>.</p>'
  }],
  "Mon compte": [{
    title: 'Comment supprimer son compte ?',
    contents: "<p>A tout moment, vous avez la possibilité de supprimer votre compte My Alfred. La suppression de votre compte est irrémédiable.Si vous êtes Alfred, la suppression du compte implique la suppression de votre boutique, l'annulation de l’ensemble des réservations acceptées à venir, et leur remboursement.Si vous êtes simple utilisateur, la suppression de votre compte implique l’annulation de l'ensemble des réservations acceptées à venir, moyennant - en fonction des conditions d’annulation de(s) Alfred impacté(s) par cette annulation - des frais d’annulation.</p><p style=\{\{width: \'100%\'\}\}>Pour supprimer votre compte :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mes paramètres</strong></li><li>Cliquez sur <strong>Paramètres</strong></li><li>Cliquez sur <strong>Désactiver</strong> dans la rubrique je souhaite désactiver mon compte</li></ol><p>Saisissez votre mot de passe. Cette étape nous permet de nous assurer que vous êtes bien à l’initiative de la suppression de votre compte.</p>"
  }, {
    title: 'Comment gérer mes notifications ?',
    contents: "<p>Vos notifications peuvent être paramétrées depuis votre compte. Cela vous permet de choisir le moyen de communication le plus adapté à vos besoins ou à vos habitudes(SMS, emails, push, appel téléphonique).Les notifications sont classées par rubrique et vous pouvez choisir à tout moment, de les modifier ou de les désactiver.</p><p>Seule la rubrique Assistance du compte doit impérativement avoir l'une des options de notifications activée. En effet, dans le cadre de vos réservations de services, des informations légales,des questions de sécurité et de confidentialité, et pour répondre à vos demandes adressées à notre assistance utilisateur, nous devons être en mesure de vous envoyer des messages. Pour votre sécurité,vous ne pouvez pas désactiver les notifications par email et nous pourrions vous contacter par téléphone ou d’autres moyens si besoin.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier le paramétrage de vos notifications, il vous suffit de :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mes paramètres</strong></li><li>Cliquez sur la rubrique <strong>Notifications</strong></li><li>Cliquez sur <strong>Enregistrer</strong></li></ol><p>Saisissez votre mot de passe. Cette étape nous permet de nous assurer que vous êtes bien à l’initiative de la suppression de votre compte.</p>"
  }, {
    title: 'Comment gérer mes modes de paiement ?',
    contents: '  <p>Depuis votre compte, vous pouvez gérer l’ensemble de vos modes de paiement.</p><p style=\{\{width: \'100%\'\}\}>Les différents moyens de paiements de My Alfred sont les suivants :</p><br/><ul style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Carte de paiement</li><li>Crédit (remboursement crédité sur votre compte)</li><li>Coupons (programme fidélité, parrainage, code promotionnel etc.)</li></ul><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mes paramètres</strong></li><li>Cliquez sur la rubrique <strong>Mes moyens de paiement</strong></li></ol>'
  }, {
    title: 'Comment suivre mes transactions ?',
    contents: "<p>En tant qu’utilisateur de My Alfred, vous pouvez suivre l’ensemble de vos transactions depuis la rubrique “Historique de transactions” de votre compte. Les transactions concernent les paiements et les versements.Vous pourrez ainsi retrouver vos transactions à venir et vos transactions passées.</p><p>En tant qu’Alfred, vous avez aussi la possibilité de suivre vos transactions dans la rubrique performance de votre boutique. Vous trouverez un tableau de bord complet vous permettant de suivre l'évolution des transactions, de suivre vos versements, et d'estimer votre volume de transactions à venir.</p>"
  }, {
    title: 'Comment changer mon mot de passe ?',
    contents: '<p>A tout moment, vous pouvez changer votre mot de passe sur My Alfred.Pour des raisons de sécurité,nous vous conseillons de changer votre mot de passe 3 fois par an.</p><p style=\{\{width: \'100%\'\}\}>Pour changer votre mot de passe :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mes paramètres</strong></li><li>Cliquez sur <strong>Sécurité</strong></li></ol><p>Saisissez votre mot de passe actuel, puis saisissez le nouveau mot de passe, puis répétez le mot de passe.Si les mots de passe correspondent, vous pourrez enregistrer et votre mot de passe sera mis à jour.Attention, le mot de passe doit contenir 8 caractères au minimum, et demeure strictement confidentiel,vous ne devez en aucun cas le partager, le divulguer pour quelque raison que ce soit.</p>'
  }, {
    title: 'Vous avez oublié votre mot de passe ?',
    contents: ' <p>Si vous avez oublié votre mot de passe lorsque vous souhaitez vous connecter, cliquez sur “J’ai oublié mon mot de passe” sur la page de connexion de My Alfred. Un lien de récupération de votre compte vous sera envoyé par email afin que vous puissiez créer un nouveau mot de passe et retrouver votre compte.Si vous ne recevez pas d’e-mail, pensez à jeter un coup d’oeil dans vos courriers indésirables;) !</p>'
  }, {
    title: 'Puis-je connecter My Alfred à mon compte Gmail ?',
    contents: '<p>Lors de l’inscription, vous pouvez choisir de vous connecter au travers de Gmail afin de gagner du temps sur votre inscription et synchroniser vos contacts sur My Alfred. A tout moment,vous pouvez supprimer la connexion entre My Alfred et votre Gmail.</p><p style=\{\{width: \'100%\'\}\}>Pour cela:</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mes paramètres</strong></li><li>Cliquez sur <strong>Applications connectées</strong></li><li>Cliquez sur <strong>Supprimer</strong> dans l’encart de l’application Gmail</li></ol><p style=\{\{width: \'100%\'\}\}>Si vous souhaitez connecter votre Gmail à My Alfred après votre inscription :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mes paramètres</strong></li><li>Cliquez sur <strong>Applications connectées</strong></li><li>Cliquez sur <strong>Connecter</strong> dans l’encart de l’application Gmail</li><li>Acceptez la connexion My Alfred sur votre Gmail</li></ol><p>A noter que les applications connectées sont soumises à nos conditions générales d’utilisation.</p>'
  }, {
    title: 'Puis-je connecter My Alfred à mon compte Facebook ?',
    contents: '<p>Lors de l’inscription, vous pouvez choisir de vous connecter au travers de Facebook afin de gagner du temps sur votre inscription et synchroniser vos contacts sur My Alfred. A tout moment,vous pouvez supprimer la connexion entre My Alfred et votre Facebook.</p><p style=\{\{width: \'100%\'\}\}>Pour cela:</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mes paramètres</strong></li><li>Cliquez sur <strong>Applications connectées</strong></li><li>Cliquez sur <strong>Supprimer</strong> dans l’encart de l’application Facebook</li></ol><p style=\{\{width: \'100%\'\}\}>Si vous souhaitez connecter votre Facebook à My Alfred après votre inscription :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mes paramètres</strong></li><li>Cliquez sur <strong>Applications connectées</strong></li><li>Cliquez sur <strong>Connecter</strong> dans l’encart de l’application Facebook</li><li>Acceptez la connexion My Alfred sur votre Facebook</li></ol><p>A noter que les applications connectées sont soumises à nos conditions générales d’utilisation.</p>'
  }, {
    title: 'Comment empêcher l’indexation de mon profil et ma boutique sur les moteurs de recherche ?',
    contents: "<p>A tout moment et conformément à notre politique de confidentialité, vous pouvez choisir d'empêcher l'indexation de votre profil, de votre boutique et de vos services parles moteurs de recherche.</p><p style=\{\{width: \'100%\'\}\}>Pour empêcher l’indexation de votre profil et de votre boutique par les moteurs de recherche :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mes paramètres</strong></li><li>Cliquez sur <strong>Paramètres</strong></li><li>Désactiver la ligne ‘’J\'accepte que mon profil et ma boutique soient indexés par les moteurs de recherche”</li></ol>"
  }, {
    title: 'Comment gérer mes parrainages ?',
    contents: ''
  }, {
    title: 'A quoi sert le parrainage ?',
    contents: ' <p>Le parrainage vous permet de gagner des crédits sur la plateforme My Alfred en contribuant à l’évolution de la communauté My Alfred. En invitant vos amis, votre famille, vos proches,à devenir Alfred ou à utiliser My Alfred, vous gagnerez 20% du montant de sa première réservation,crédité dans votre compte, rubrique “Mode de paiement”.</p>'
  }],
  "Mon profil": [{
    title: 'Comment modifier mon profil utilisateur ?',
    contents: '<p>Vous pouvez à tout moment modifier votre profil et mettre à jour vos informations personnelles en vous rendant dans la rubrique Mon profil.Votre profil contient des informations obligatoires comme votre nom,prénom, votre date de naissance ainsi que votre email.Vous pouvez choisir d’indiquer des informations complémentaires pour vos utilisateurs, comme les langues que vous parlez, votre emploi, vos diplômes...Ces informations seront visibles par les autres utilisateurs sur votre profil.</p><p style=\{\{width: \'100%\'\}\}>Pour accéder à votre profil :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mon profil</strong></li><li>Cliquez sur <strong>Modifier le profil</strong></li></ol>'
  }, {
    title: 'A quoi correspondent les adresses de prestations ?',
    contents: '<p style=\{\{width: \'100%\'\}\}>Lorsque vous souhaitez réserver un service, notre plateforme vous propose des Alfred en fonction de leur périmètre d’intervention. Dans ce cadre, nous utiliserons l’adresse de prestation que vous aurez indiquée pour la prestation de service commandée. Vous pouvez à tout moment ajouter ou modifier vos adresses de prestations.</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mon profil</strong></li><li>Cliquez sur <strong>Mes adresses de prestations</strong></li></ol>'
  }, {
    title: 'Puis-je avoir plusieurs adresses de prestation ?',
    contents: '<p>Vous pouvez choisir de renseigner plusieurs adresses de prestations dans le cadre de vos réservations sur My Alfred. Dans votre profil, rubrique “Mes adresses de prestations”, vous pouvez ajouter, supprimer, modifier vos adresses de prestations. La première adresse saisie sera,par défaut, votre adresse principale, ce qui signifie qu’elle sera l’adresse sélectionnée par défaut pour vos réservations. A tout moment vous pouvez changer d’adresse par défaut en modifiant votre adresse principale.</p><p>Soyez rassuré(s) ! Vos adresses ne seront pas visibles des autres utilisateurs, seuls lesAlfred qui auront reçu une réservation et l’auront confirmé, disposeront de votre adresse de prestation pour le service concerné.</p>'
  }, {
    title: 'Comment gérer ma photo de profil ?',
    contents: '<p>La photo de votre profil sera visible des utilisateurs du site et leur permettra de déjà vous connaître ! Pour ajouter, modifier ou supprimer une photo de profil,rendez-vous dans la rubrique“Photo” de votre profil. Si vous souhaitez supprimer votre photo de profil, cliquez sur la corbeille en haut à droit de votre photo. Si vous souhaitez ajouter ou supprimer une photo, cliquez sur “Télécharger une photo depuis votre ordinateur”.</p><p>Conseil : Téléchargez une photo claire et lumineuse, de bonne qualité.Pour un rendu optimal,la photo doit être cadrée, sans lunette de soleil, en regardant l’objectif, avec seulement vous sur la photo.</p>'
  }, {
    title: 'Comment vérifier mon email ?',
    contents: "<p>Lors de votre inscription, nous vous demanderons de renseigner votre adresse email.Un profil dont l’email est vérifié donne plus confiance aux autres utilisateurs de la plateforme. Pour confirmer votre adresse email, vous devez simplement cliquer sur‘’je confirme mon email’’ dans l'email reçu lors de votre inscription. Si vous n’avez pas reçu d’email,nous vous invitons à vérifier votre email ou à consulter vos spams. A tout moment, vous avez la possibilité de modifier votre email et/ou de demander un nouvelle confirmation de votre email.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier votre adresse email :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mon profil</strong></li><li>Cliquez sur <strong>Confiance et vérification</strong></li><li>Modifiez votre email</li><li>Cliquez sur Enregistrer</li></ol><p style=\{\{width: \'100%\'\}\}>Pour demander une nouvelle vérification de votre adresse email :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mon profil</strong></li><li>Cliquez sur <strong>Confiance et vérification</strong></li><li>Cliquez sur Envoyer email de vérification</li><li>Vérifiez ensuite votre boîte d’emails et cliquez sur ‘’je confirme mon email’’ dans l'email que vous avez reçu.</li></ol>"
  }, {
    title: 'Comment vérifier mon téléphone ?',
    contents: '<p>Lors de votre inscription, vous êtes invité(s) à renseigner et à vérifier votre numéro de téléphoneportable. L’ajout d’un téléphone vérifié permet aux autres utilisateurs de la plateforme de disposer d’un moyen de vous contacter lors d’une réservation. Une vérification du numéro de téléphone portable est demandée aux Alfreds lors de la création de leur boutique de services et aux utilisateurs lors de la réservation d’un service auprès d’un Alfred. Vous pouvez à tout moment modifier ou demander une nouvelle vérification de votre téléphone portable.</p><p style=\{\{width: \'100%\'\}\}>Pour modifier votre téléphone portable :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mon profil</strong></li><li>Cliquez sur <strong>Confiance et vérification</strong></li><li>Modifiez votre téléphone portable</li><li>Cliquez sur Enregistrer</li></ol><p style=\{\{width: \'100%\'\}\}>Pour demander une nouvelle vérification de votre téléphone portable :</p><br/><ol style=\{\{fontFamily: \'Helvetica\', fontSize: \'0.9rem\'\}\}><li>Rendez-vous sur my-alfred.io, cliquez sur <strong>Mon profil</strong></li><li>Cliquez sur <strong>Confiance et vérification</strong></li><li>Cliquez sur Envoyer SMS de vérification</li><li>Saisir le code à 4 chiffres reçu par SMS sur votre téléphone</li></ol>'
  }]
};
const FAQ = {
  'alfred': FAQ_ALFRED,
  'client': FAQ_CLIENT
};
module.exports = {
  CESU_NOTICE,
  OUTSIDE_PERIMETER,
  SCHEDULE_TITLE,
  SCHEDULE_SUBTITLE,
  getMangopayMessage,
  SHOP_CREATION_SUCCESSFUL,
  ID_CARD_CONFIRM_DELETION,
  REGISTRATION_PROOF_CONFIRM_DELETION,
  INFOBAR_MESSAGE,
  SHOWMORE,
  SEARCHBAR,
  BANNER_PRESENTATION,
  CATEGORY,
  BECOME_ALFRED,
  RESA_SERVICE,
  HOW_IT_WORKS,
  NEWS_LETTER,
  NAVBAR_MENU,
  SHOP,
  CMP_PRESENTATION,
  BOOKING,
  FAQ
};

/***/ }),

/***/ 3:
/*!******************************************!*\
  !*** multi ./pages/footer/addService.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Edwin\Documents\MyAlfredPro\web\pages\footer\addService.js */"./pages/footer/addService.js");


/***/ }),

/***/ "@material-ui/core":
/*!************************************!*\
  !*** external "@material-ui/core" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core");

/***/ }),

/***/ "@material-ui/core/Button":
/*!*******************************************!*\
  !*** external "@material-ui/core/Button" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Button");

/***/ }),

/***/ "@material-ui/core/Grid":
/*!*****************************************!*\
  !*** external "@material-ui/core/Grid" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Grid");

/***/ }),

/***/ "@material-ui/core/Hidden":
/*!*******************************************!*\
  !*** external "@material-ui/core/Hidden" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Hidden");

/***/ }),

/***/ "@material-ui/core/IconButton":
/*!***********************************************!*\
  !*** external "@material-ui/core/IconButton" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/IconButton");

/***/ }),

/***/ "@material-ui/core/InputBase":
/*!**********************************************!*\
  !*** external "@material-ui/core/InputBase" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/InputBase");

/***/ }),

/***/ "@material-ui/core/Paper":
/*!******************************************!*\
  !*** external "@material-ui/core/Paper" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Paper");

/***/ }),

/***/ "@material-ui/core/Tab":
/*!****************************************!*\
  !*** external "@material-ui/core/Tab" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Tab");

/***/ }),

/***/ "@material-ui/core/Tabs":
/*!*****************************************!*\
  !*** external "@material-ui/core/Tabs" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Tabs");

/***/ }),

/***/ "@material-ui/core/Typography":
/*!***********************************************!*\
  !*** external "@material-ui/core/Typography" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Typography");

/***/ }),

/***/ "@material-ui/core/styles":
/*!*******************************************!*\
  !*** external "@material-ui/core/styles" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/styles");

/***/ }),

/***/ "@material-ui/core/styles/withStyles":
/*!******************************************************!*\
  !*** external "@material-ui/core/styles/withStyles" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/styles/withStyles");

/***/ }),

/***/ "@material-ui/icons/ArrowBack":
/*!***********************************************!*\
  !*** external "@material-ui/icons/ArrowBack" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/ArrowBack");

/***/ }),

/***/ "@material-ui/icons/Close":
/*!*******************************************!*\
  !*** external "@material-ui/icons/Close" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Close");

/***/ }),

/***/ "core-js/library/fn/json/stringify":
/*!****************************************************!*\
  !*** external "core-js/library/fn/json/stringify" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/json/stringify");

/***/ }),

/***/ "core-js/library/fn/object/create":
/*!***************************************************!*\
  !*** external "core-js/library/fn/object/create" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/create");

/***/ }),

/***/ "core-js/library/fn/object/define-property":
/*!************************************************************!*\
  !*** external "core-js/library/fn/object/define-property" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/define-property");

/***/ }),

/***/ "core-js/library/fn/object/get-prototype-of":
/*!*************************************************************!*\
  !*** external "core-js/library/fn/object/get-prototype-of" ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-prototype-of");

/***/ }),

/***/ "core-js/library/fn/object/set-prototype-of":
/*!*************************************************************!*\
  !*** external "core-js/library/fn/object/set-prototype-of" ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/set-prototype-of");

/***/ }),

/***/ "core-js/library/fn/symbol":
/*!********************************************!*\
  !*** external "core-js/library/fn/symbol" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/symbol");

/***/ }),

/***/ "core-js/library/fn/symbol/iterator":
/*!*****************************************************!*\
  !*** external "core-js/library/fn/symbol/iterator" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/symbol/iterator");

/***/ }),

/***/ "mangopay2-nodejs-sdk/lib/models/KycDocumentStatus":
/*!********************************************************************!*\
  !*** external "mangopay2-nodejs-sdk/lib/models/KycDocumentStatus" ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mangopay2-nodejs-sdk/lib/models/KycDocumentStatus");

/***/ }),

/***/ "next-server/dist/lib/utils":
/*!*********************************************!*\
  !*** external "next-server/dist/lib/utils" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next-server/dist/lib/utils");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "prop-types-exact":
/*!***********************************!*\
  !*** external "prop-types-exact" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types-exact");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })

/******/ });
//# sourceMappingURL=addService.js.map