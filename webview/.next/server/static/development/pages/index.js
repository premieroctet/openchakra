module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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

/***/ "./components/Avatar/UserAvatar.js":
/*!*****************************************!*\
  !*** ./components/Avatar/UserAvatar.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Avatar */ "@material-ui/core/Avatar");
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_Badge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Badge */ "@material-ui/core/Badge");
/* harmony import */ var _material_ui_core_Badge__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Badge__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Popover__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Popover */ "@material-ui/core/Popover");
/* harmony import */ var _material_ui_core_Popover__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Popover__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _UserAvatarStyle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./UserAvatarStyle */ "./components/Avatar/UserAvatarStyle.js");
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-cookies */ "react-cookies");
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_cookies__WEBPACK_IMPORTED_MODULE_9__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");

class UserAvatar extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "checkWarnings", token => {
      axios__WEBPACK_IMPORTED_MODULE_7___default.a.defaults.headers.common["Authorization"] = token;
      axios__WEBPACK_IMPORTED_MODULE_7___default.a.get('/myAlfred/api/chatRooms/nonViewedMessagesCount').then(res => {
        const nbMessages = res.data;

        if (nbMessages > 0) {
          const plural = nbMessages == 1 ? "" : "s";
          this.setState({
            kyc: [`Vous avez ${res.data} message${plural} non lu${plural}`]
          });
        } else {
          this.setState({
            kyc: null
          });
        }
      }).catch(err => console.error(err));
    });

    _defineProperty(this, "handlePopoverOpen", event => {
      this.setState({
        anchorEl: event.currentTarget
      });
    });

    _defineProperty(this, "handlePopoverClose", () => {
      this.setState({
        anchorEl: null
      });
    });

    this.state = {
      anchorEl: null,
      currentUser: '',
      kyc: null,
      owner: false,
      userId: ''
    };
  }

  componentDidMount() {
    const token = react_cookies__WEBPACK_IMPORTED_MODULE_9___default.a.load('token');

    if (token) {
      const token2 = token.split(' ')[1];
      const decode = jwt.decode(token2);
      const alfred_id = decode.id;
      this.setState({
        currentUser: alfred_id
      }, () => {
        // Check once then every 20s
        if (this.props.warnings == true) {
          this.checkWarnings(token);
          setInterval(() => this.checkWarnings(token), 20000);
        }
      });
    }
  }

  ifOwner() {
    if (this.state.currentUser === this.state.userId) {
      this.setState({
        owner: true
      });
    }
  }

  avatarWithPics(user, className) {
    const url = user.picture.match(/^https?:\/\//) ? user.picture : '/' + user.picture;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1___default.a, {
      alt: "photo de profil",
      src: url,
      className: className
    });
  }

  avatarWithoutPics(user, className) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1___default.a, {
      alt: "photo de profil",
      className: className
    }, user.avatar_letters);
  }

  render() {
    const {
      user,
      className,
      classes
    } = this.props;
    const {
      anchorEl,
      currentUser
    } = this.state;
    const open = Boolean(anchorEl);

    if (user) {
      var owner = currentUser === user._id;
      var kyc = this.state.kyc;
    }

    if (user) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, owner && kyc ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Badge__WEBPACK_IMPORTED_MODULE_3___default.a, {
        classes: {
          badge: classes.badge
        },
        overlap: "circle",
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        variant: "dot",
        onMouseEnter: this.handlePopoverOpen,
        onMouseLeave: this.handlePopoverClose,
        "aria-owns": anchorEl ? 'mouse-over-popover' : undefined,
        "aria-haspopup": "true"
      }, user.picture ? this.avatarWithPics(user, className) : this.avatarWithoutPics(user, className)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Popover__WEBPACK_IMPORTED_MODULE_5___default.a, {
        id: "mouse-over-popover",
        className: classes.popover,
        classes: {
          paper: classes.paper
        },
        open: open,
        anchorEl: anchorEl,
        onClose: this.handlePopoverClose,
        disableRestoreFocus: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left'
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, kyc.map(res => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, res))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, user.picture ? this.avatarWithPics(user, className) : this.avatarWithoutPics(user, className)));
    } else {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1___default.a, {
        alt: "photo de profil",
        src: "/static/basicavatar.png",
        className: className
      });
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(_UserAvatarStyle__WEBPACK_IMPORTED_MODULE_8__["default"], {
  withTheme: true
})(UserAvatar));

/***/ }),

/***/ "./components/Avatar/UserAvatarStyle.js":
/*!**********************************************!*\
  !*** ./components/Avatar/UserAvatarStyle.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  popover: {
    pointerEvents: 'none',
    position: 'relative'
  },
  paper: {
    backgroundColor: '#f87280',
    color: 'white',
    padding: theme.spacing(1)
  },
  badge: {
    backgroundColor: '#f87280',
    color: '#f87280',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}));

/***/ }),

/***/ "./components/CardPreview/CardPreview.js":
/*!***********************************************!*\
  !*** ./components/CardPreview/CardPreview.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _CardPreviewStyle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CardPreviewStyle */ "./components/CardPreview/CardPreviewStyle.js");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/IconButton */ "@material-ui/core/IconButton");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Box */ "@material-ui/core/Box");
/* harmony import */ var _material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_lab_Rating__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/lab/Rating */ "@material-ui/lab/Rating");
/* harmony import */ var _material_ui_lab_Rating__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_lab_Rating__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_core_Badge__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Badge */ "@material-ui/core/Badge");
/* harmony import */ var _material_ui_core_Badge__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Badge__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/ListItemIcon */ "@material-ui/core/ListItemIcon");
/* harmony import */ var _material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/List */ "@material-ui/core/List");
/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/core/ListItem */ "@material-ui/core/ListItem");
/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/core/ListItemText */ "@material-ui/core/ListItemText");
/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _material_ui_icons_Room__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/icons/Room */ "@material-ui/icons/Room");
/* harmony import */ var _material_ui_icons_Room__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Room__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/core/Chip */ "@material-ui/core/Chip");
/* harmony import */ var _material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _material_ui_icons_Edit__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/icons/Edit */ "@material-ui/icons/Edit");
/* harmony import */ var _material_ui_icons_Edit__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Edit__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _material_ui_icons_DeleteForever__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @material-ui/icons/DeleteForever */ "@material-ui/icons/DeleteForever");
/* harmony import */ var _material_ui_icons_DeleteForever__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_DeleteForever__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ "@material-ui/core/DialogTitle");
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @material-ui/core/DialogContent */ "@material-ui/core/DialogContent");
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @material-ui/core/DialogContentText */ "@material-ui/core/DialogContentText");
/* harmony import */ var _material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @material-ui/core/DialogActions */ "@material-ui/core/DialogActions");
/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @material-ui/core/Dialog */ "@material-ui/core/Dialog");
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! react-toastify */ "react-toastify");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var _Avatar_UserAvatar__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../Avatar/UserAvatar */ "./components/Avatar/UserAvatar.js");
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../../utils/functions */ "./utils/functions.js");
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(_utils_functions__WEBPACK_IMPORTED_MODULE_30__);




























const {
  computeDistanceKm
} = __webpack_require__(/*! ../../utils/functions */ "./utils/functions.js");






class CardPreview extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      cpData: {},
      dense: true,
      score: null,
      service: null,
      alfred: null,
      shop: null,
      open: false,
      id_service: '',
      page: false,
      reviews: []
    };
  }

  componentDidMount() {
    axios__WEBPACK_IMPORTED_MODULE_27___default.a.get(`/myAlfred/api/serviceUser/cardPreview/${this.props.services}`).then(res => {
      this.setState({
        cpData: res.data
      });
    }).catch(err => console.error(err));
    /**
    if(typeof this.props.services.user === 'string'){
      axios.get('/myAlfred/api/shop/alfred/'+this.props.services.user)
        .then( res => {
          this.setState({alfred:res.data.alfred, score:res.data.alfred.score}, () =>
            axios.get(`/myAlfred/api/reviews/profile/customerReviewsCurrent/${this.props.services.user}`)
              .then (res => {
                var reviews = res.data;
                if (this.props.services._id) {
                  reviews = reviews.filter( r => r.serviceUser._id===this.props.services._id);
                }
                this.setState({reviews:reviews})
              })
              .catch (err => console.error(err))
          )
        })
        .catch( err => console.error(err))
    }else{
      axios.get('/myAlfred/api/shop/alfred/'+this.props.services.user._id)
        .then( res => {
          this.setState({alfred:res.data.alfred, score:res.data.alfred.score}, () =>
            axios.get(`/myAlfred/api/reviews/profile/customerReviewsCurrent/${this.props.services.user._id}`)
              .then (res => {
                var reviews = res.data;
                if (this.props.services._id) {
                  reviews = reviews.filter( r => r.serviceUser._id===this.props.services._id);
                }
                this.setState({reviews:reviews})
              })
              .catch (err => console.error(err))
          )
        })
        .catch( err => console.error(err))
    }*/
  }

  handleClickOpen(id) {
    this.setState({
      id_service: id,
      open: true
    });
  }

  handleClose() {
    this.setState({
      id_service: '',
      open: false
    });
  }

  deleteService(id) {
    axios__WEBPACK_IMPORTED_MODULE_27___default.a.delete('/myAlfred/api/serviceUser/' + id).then(() => {
      react_toastify__WEBPACK_IMPORTED_MODULE_28__["toast"].error('Service supprimé');
      this.setState({
        open: false,
        id_service: ''
      });
      this.props.needRefresh();
    }).catch(err => console.error(err));
  }

  render() {
    const {
      classes,
      userState,
      isOwner,
      gps,
      needAvatar,
      isAdmin
    } = this.props;
    const {
      cpData
    } = this.state;
    var distance = gps ? computeDistanceKm(gps, cpData.gps) : null;
    distance = distance ? distance.toFixed(0) : '';
    const StyledRating = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])({
      iconFilled: {
        color: '#4fbdd7'
      }
    })(_material_ui_lab_Rating__WEBPACK_IMPORTED_MODULE_10___default.a);
    const notes = cpData.reviews ? Object(_utils_functions__WEBPACK_IMPORTED_MODULE_30__["computeAverageNotes"])(cpData.reviews.map(r => r.note_alfred)) : {};
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.card
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.cardMedia,
      style: {
        backgroundImage: 'url("' + cpData.picture + '")'
      }
    }, cpData.is_professional ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.statusMedia
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_18___default.a, {
      label: "PRO",
      className: classes.chipStyle
    })) : null, userState && isOwner || isAdmin ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.actionMediaEdit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_21___default.a, {
      href: '/myShop/services?id=' + cpData._id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_7___default.a, {
      "aria-label": "Edit",
      className: classes.iconButtonStyle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Edit__WEBPACK_IMPORTED_MODULE_19___default.a, {
      style: {
        color: '#4fbdd7'
      }
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.actionMediaRemove
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_7___default.a, {
      "aria-label": "remove",
      className: classes.iconButtonStyle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_DeleteForever__WEBPACK_IMPORTED_MODULE_20___default.a, {
      onClick: () => this.handleClickOpen(cpData._id),
      style: {
        color: '#f87280'
      }
    })))) : null, needAvatar ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.avatar
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Avatar_UserAvatar__WEBPACK_IMPORTED_MODULE_29__["default"], {
      user: cpData.alfred,
      className: classes.avatarLetter
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginTop: 20
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        display: 'flex',
        flexDirection: 'column'
      },
      className: classes.contentDistanceUnderAvatar
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, cpData.alfred ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
      component: "p",
      className: classes.sizeTextUnderAvatar
    }, cpData.alfred.firstname) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
      component: "p",
      className: classes.sizeTextUnderAvatar
    }, cpData.city)), distance ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        display: 'flex'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Room__WEBPACK_IMPORTED_MODULE_17___default.a, {
      className: classes.checkCircleIcon
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
      component: "p",
      className: classes.sizeTextUnderAvatar
    }, "\xE0 ", distance, " km"))) : null))) : null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.cardContent
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.cardContentPosition
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
      variant: "body2",
      color: "textSecondary",
      component: "p",
      className: classes.sizeText
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.cardContentHeader
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
      component: "p",
      className: classes.sizeText
    }, cpData.label)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9___default.a, {
      component: "fieldset",
      mb: 3,
      borderColor: "transparent",
      className: classes.boxRating
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Badge__WEBPACK_IMPORTED_MODULE_11___default.a, {
      badgeContent: notes.global ? notes.global.toFixed(2) : 0,
      color: 'primary',
      classes: {
        badge: classes.badge
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledRating, {
      name: "read-only",
      value: notes.global,
      readOnly: true,
      className: classes.rating,
      precision: 0.5
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.cardContentRight
    }, needAvatar === false ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.flexPosition
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
      variant: "body2",
      color: "textSecondary",
      component: "p",
      className: classes.sizeText
    }, cpData.city), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Room__WEBPACK_IMPORTED_MODULE_17___default.a, {
      className: classes.checkCircleIcon
    })) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_21___default.a, {
      href: 'userServicePreview?id=' + cpData._id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_12___default.a, {
      variant: "contained",
      color: "primary",
      className: classes.button
    }, "Visualiser"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.responsiveListContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_14___default.a, {
      dense: this.state.dense,
      className: classes.flexPosition
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_15___default.a, {
      className: classes.noPadding
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_13___default.a, {
      className: classes.minWidth
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: cpData.graduated ? '/static/assets/img/iconCardAlfred/graduated.svg' : '/static/assets/img/iconCardAlfred/no_graduated.svg',
      alt: 'Diplome',
      title: 'Diplome',
      className: classes.imageStyle
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_16___default.a, {
      classes: {
        primary: classes.sizeText
      },
      primary: "Diplômé(e)"
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_15___default.a, {
      className: classes.noPadding,
      style: {
        marginLeft: 5
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_13___default.a, {
      className: classes.minWidth
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: cpData.is_certified ? '/static/assets/img/iconCardAlfred/certificate.svg' : '/static/assets/img/iconCardAlfred/no_certificate.svg',
      alt: 'Certifié',
      title: 'Certifié',
      className: classes.imageStyle
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_16___default.a, {
      classes: {
        primary: classes.sizeText
      },
      primary: "Certifi\xE9(e)"
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_15___default.a, {
      className: classes.noPadding,
      style: {
        marginLeft: 5
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_13___default.a, {
      className: classes.minWidth
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: cpData.level ? '/static/assets/img/iconCardAlfred/experience.svg' : '/static/assets/img/iconCardAlfred/no_experience.svg',
      alt: 'Expérimenté',
      title: 'Expérimenté',
      className: classes.imageStyle
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_16___default.a, {
      classes: {
        primary: classes.sizeText
      },
      primary: "Exp\xE9riment\xE9(e)"
    })))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_26___default.a, {
      open: this.state.open,
      onClose: () => this.handleClose(),
      "aria-labelledby": "alert-dialog-title",
      "aria-describedby": "alert-dialog-description"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_22___default.a, {
      id: "alert-dialog-title"
    }, "Supprimer un service"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_23___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_24___default.a, {
      id: "alert-dialog-description"
    }, "Voulez-vous vraiment supprimer ce service de votre boutique ?")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_25___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_12___default.a, {
      onClick: () => this.handleClose2(),
      color: "primary"
    }, "Annuler"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_12___default.a, {
      onClick: () => this.deleteService(this.state.id_service),
      color: "secondary",
      autoFocus: true
    }, "Supprimer"))));
  }

}

CardPreview.propTypes = {
  classes: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired,
  theme: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(_CardPreviewStyle__WEBPACK_IMPORTED_MODULE_4__["default"], {
  withTheme: true
})(CardPreview));

/***/ }),

/***/ "./components/CardPreview/CardPreviewStyle.js":
/*!****************************************************!*\
  !*** ./components/CardPreview/CardPreviewStyle.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  card: {
    width: '100%',
    height: 'auto'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  cardMedia: {
    paddingTop: '56.25%',
    // 16:9
    display: 'block',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'relative'
  },
  button: {
    margin: theme.spacing(1),
    color: 'white'
  },
  boxRating: {
    margin: 0
  },
  checkCircleIcon: {
    marginLeft: 5,
    color: '#4fbdd7',
    width: 25,
    height: 25,
    [theme.breakpoints.down('xs')]: {
      height: 20,
      width: 20
    }
  },
  rating: {
    marginLeft: -15,
    [theme.breakpoints.down('xs')]: {
      fontSize: 'large'
    }
  },
  actionMediaEdit: {
    position: 'absolute',
    top: '5%',
    right: '18%',
    [theme.breakpoints.down('sm')]: {
      right: '20%'
    }
  },
  actionMediaRemove: {
    position: 'absolute',
    top: '5%',
    right: '5%',
    [theme.breakpoints.down('sm')]: {
      right: '5%'
    }
  },
  statusMedia: {
    position: 'absolute',
    top: '5%',
    left: '5%'
  },
  iconButtonStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 40,
    height: 40,
    '&:hover': {
      backgroundColor: 'white'
    },
    [theme.breakpoints.down('sm')]: {
      height: 50,
      width: 50
    },
    [theme.breakpoints.down('xs')]: {
      height: 40,
      width: 40
    }
  },
  chipStyle: {
    backgroundColor: '#f87280',
    color: 'white',
    fontWeight: 'bold',
    border: '2px solid white'
  },
  badge: {
    color: "white"
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    height: 85
  },
  cardContentPosition: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardContentHeader: {
    display: 'flex',
    marginBottom: '2%'
  },
  cardContentRight: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  flexPosition: {
    display: 'flex',
    alignItems: 'center'
  },
  minWidth: {
    minWidth: 30
  },
  noPadding: {
    padding: 0
  },
  imageStyle: {
    width: 25,
    height: 25,
    [theme.breakpoints.down('xs')]: {
      height: 20,
      width: 20
    }
  },
  sizeText: {
    fontSize: '0.85vw',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5vw'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '3.5vw'
    }
  },
  responsiveListContainer: {
    marginTop: 10,
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      height: 'auto'
    }
  },
  avatar: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatarLetter: {
    height: 95,
    width: 95,
    margin: 'auto',
    fontSize: 'xx-large',
    [theme.breakpoints.down('xl')]: {
      height: 100,
      width: 100
    },
    [theme.breakpoints.down('lg')]: {
      height: 80,
      width: 80
    },
    [theme.breakpoints.down('md')]: {
      height: 80,
      width: 80
    },
    [theme.breakpoints.down('sm')]: {
      height: 95,
      width: 95
    },
    [theme.breakpoints.down('xs')]: {
      height: 100,
      width: 100
    }
  },
  contentDistanceUnderAvatar: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center'
  },
  sizeTextUnderAvatar: {
    fontWeight: 'bold',
    color: 'white',
    textShadow: 'black 0px 0px 3px',
    fontSize: '1vw',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5vw'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '4.5vw'
    }
  }
}));

/***/ }),

/***/ "./components/Information.js":
/*!***********************************!*\
  !*** ./components/Information.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _Dialog = _interopRequireDefault(__webpack_require__(/*! @material-ui/core/Dialog */ "@material-ui/core/Dialog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Information extends _react.default.Component {
  /**
  props:
   - open : true/false
   - onClose : callback when closing
   - text : text or html
   - type : 'info' or 'warning'
  */
  render() {
    const type = this.props.type ? this.props.type : 'info';
    return /*#__PURE__*/_react.default.createElement(_Dialog.default, {
      maxWidth: 'xs',
      "aria-labelledby": "simple-dialog-title",
      open: this.props.open,
      onClose: this.props.onClose
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        padding: '15px',
        display: 'flex'
      }
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: `/static/assets/img/${type}.svg`,
      width: 32
    }), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        'padding-left': '15px'
      },
      dangerouslySetInnerHTML: {
        __html: this.props.text
      }
    })));
  }

}

module.exports = {
  Information
};

/***/ }),

/***/ "./components/LogIn/LogIn.js":
/*!***********************************!*\
  !*** ./components/LogIn/LogIn.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LogInStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LogInStyle */ "./components/LogIn/LogInStyle.js");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/TextField */ "@material-ui/core/TextField");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _utils_setAuthToken__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/setAuthToken */ "./utils/setAuthToken.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/MailOutline */ "@material-ui/icons/MailOutline");
/* harmony import */ var _material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_icons_LockOpenOutlined__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/LockOpenOutlined */ "@material-ui/icons/LockOpenOutlined");
/* harmony import */ var _material_ui_icons_LockOpenOutlined__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LockOpenOutlined__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _OAuth_OAuth__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../OAuth/OAuth */ "./components/OAuth/OAuth.js");
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-cookies */ "react-cookies");
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_cookies__WEBPACK_IMPORTED_MODULE_14__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

















class LogIn extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "onChange", e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    });

    _defineProperty(this, "onSubmit", e => {
      e.preventDefault();
      const user = {
        username: this.state.username,
        password: this.state.password
      };
      axios__WEBPACK_IMPORTED_MODULE_9___default.a.post('/myAlfred/api/users/login', user).then(res => {
        const token = react_cookies__WEBPACK_IMPORTED_MODULE_14___default.a.load('token');
        Object(_utils_setAuthToken__WEBPACK_IMPORTED_MODULE_8__["default"])(token);
        axios__WEBPACK_IMPORTED_MODULE_9___default.a.put('/myAlfred/api/users/account/lastLogin').then(data => {
          let path = localStorage.getItem('path');
          this.props.login();
        }).catch(err => console.error(err));
      }).catch(err => {
        console.error(err);

        if (err.response) {
          this.setState({
            errors: err.response.data
          });
        }
      });
    });

    this.state = {
      username: '',
      password: '',
      errors: {}
    };
    this.providers = ['google'];
  }

  render() {
    const {
      classes
    } = this.props;
    const {
      errors
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      className: classes.fullContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      style: {
        width: '100%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      className: classes.newContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
      className: classes.titleRegister
    }, "Connexion")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      className: classes.margin
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      container: true,
      spacing: 1,
      alignItems: "flex-end",
      className: classes.genericContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      className: classes.margin
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      container: true,
      spacing: 1,
      alignItems: "flex-end",
      className: classes.flexContainerPics
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      style: {
        width: '100%'
      }
    }, this.providers.map(provider => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OAuth_OAuth__WEBPACK_IMPORTED_MODULE_13__["default"], {
      provider: provider,
      key: provider,
      text: 'login'
    }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      className: classes.margin
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      container: true,
      spacing: 1,
      alignItems: "flex-end",
      className: classes.flexContainerPics
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: "rgba(84,89,95,0.95)",
        fontWeight: "bold",
        letterSpacing: -1
      }
    }, "Ou")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      className: classes.containerDialogContent
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      onSubmit: this.onSubmit,
      style: {
        marginBottom: 15
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      className: classes.margin
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      container: true,
      spacing: 1,
      alignItems: "flex-end",
      className: classes.genericContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      item: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_11___default.a, {
      className: classes.colorIcon
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      item: true,
      className: classes.widthTextField
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5___default.a, {
      label: "Email",
      placeholder: "Email",
      margin: "normal",
      style: {
        width: '100%'
      },
      type: "email",
      name: "username",
      value: this.state.username,
      onChange: this.onChange,
      error: errors.username
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", null, errors.username)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      className: classes.margin
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      container: true,
      spacing: 1,
      alignItems: "flex-end",
      className: classes.genericContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      item: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_LockOpenOutlined__WEBPACK_IMPORTED_MODULE_12___default.a, {
      className: classes.colorIcon
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      item: true,
      className: classes.widthTextField
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5___default.a, {
      id: "standard-with-placeholder",
      label: "Mot de passe",
      placeholder: "Mot de passe",
      margin: "normal",
      style: {
        width: '100%'
      },
      type: "password",
      name: "password",
      value: this.state.password,
      onChange: this.onChange,
      error: errors.password
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", null, errors.password)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      item: true,
      style: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 30
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7___default.a, {
      type: "submit",
      variant: "contained",
      color: "primary",
      style: {
        width: '100%',
        color: 'white'
      }
    }, "Connexion")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      item: true,
      style: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '10%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "/forgotPassword"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      color: "primary",
      style: {
        textDecoration: 'none',
        color: '#2FBCD3'
      }
    }, "Mot de passe oubli\xE9 ?")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      color: "primary",
      onClick: this.props.callRegister,
      style: {
        textDecoration: 'none',
        color: '#2FBCD3',
        cursor: 'pointer'
      }
    }, "Pas encore inscrit ? Inscrivez-vous !")))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["withStyles"])(_LogInStyle__WEBPACK_IMPORTED_MODULE_2__["default"])(LogIn));

/***/ }),

/***/ "./components/LogIn/LogInStyle.js":
/*!****************************************!*\
  !*** ./components/LogIn/LogInStyle.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  fullContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardContant: {
    flexDirection: 'column'
  },
  linkText: {
    textDecoration: 'none',
    color: 'black',
    fontSize: 12
  },
  [theme.breakpoints.between('sm', 'xl')]: {
    secondContainer: {
      width: '60%',
      heigh: '100vh',
      textAlign: 'center'
    }
  },
  [theme.breakpoints.down('sm')]: {
    secondContainer: {
      display: 'none'
    },
    hrStyle: {
      display: 'none'
    },
    fullContainer: {
      flexDirection: 'column'
    },
    loginContainer: {
      width: 'inherit'
    }
  },
  hrStyle: {
    borderWidth: 0.5,
    color: 'lightgray'
  },
  margin: {
    margin: theme.spacing(1),
    width: '100%'
  },
  genericContainer: {
    width: '100%',
    justifyContent: 'center'
  },
  colorIcon: {
    color: 'rgba(84,89,95,0.95)'
  },
  widthTextField: {
    width: '70%',
    [theme.breakpoints.down("xs")]: {
      width: '80%'
    }
  },
  newContainer: {
    padding: '5%',
    [theme.breakpoints.down("xs")]: {
      padding: 10
    }
  },
  containerDialogContent: {
    width: '100%',
    height: '100%',
    marginBottom: '1.6rem',
    marginTop: '-1.6rem'
  },
  titleRegister: {
    textAlign: 'center',
    margin: '0px auto 1.6rem',
    fontSize: "1.6rem",
    color: "rgba(84,89,95,0.95)",
    letterSpacing: -1,
    fontWeight: "bold"
  },
  flexContainerPics: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

/***/ }),

/***/ "./components/OAuth/OAuth.js":
/*!***********************************!*\
  !*** ./components/OAuth/OAuth.js ***!
  \***********************************/
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
/* harmony import */ var react_social_login_buttons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-social-login-buttons */ "react-social-login-buttons");
/* harmony import */ var react_social_login_buttons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_social_login_buttons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "@material-ui/core/styles/withStyles");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _OAuthStyle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./OAuthStyle */ "./components/OAuth/OAuthStyle.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class OAuth extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "components", {
      google: react_social_login_buttons__WEBPACK_IMPORTED_MODULE_3__["GoogleLoginButton"],
      facebook: react_social_login_buttons__WEBPACK_IMPORTED_MODULE_3__["FacebookLoginButton"]
    });

    _defineProperty(this, "startAuth", () => {
      const {
        provider
      } = this.props;
      next_router__WEBPACK_IMPORTED_MODULE_2___default.a.push(`/myAlfred/api/authentication/${provider}`);
    });
  }

  render() {
    const {
      provider,
      text
    } = this.props;
    const {
      classes
    } = this.props;
    const ProviderLoginButton = this.components[provider];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default.a, {
      container: true,
      className: classes.contentOauth,
      onClick: this.startAuth
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        margin: 10
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: '../../static/assets/img/unamed.png',
      alt: 'google',
      title: 'google',
      width: 20
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      style: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '1rem',
        fontFamily: 'Helvetica',
        fontWeight: 400,
        lineHeight: 1
      }
    }, text === 'login' ? 'Se connecter avec Gmail' : 'S\'inscrire avec Gmail'))));
  }

}

OAuth.propTypes = {
  provider: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_4___default()(_OAuthStyle__WEBPACK_IMPORTED_MODULE_6__["default"])(OAuth));

/***/ }),

/***/ "./components/OAuth/OAuthStyle.js":
/*!****************************************!*\
  !*** ./components/OAuth/OAuthStyle.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  contentOauth: {
    display: 'flex',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  }
}));

/***/ }),

/***/ "./components/Register/Register.js":
/*!*****************************************!*\
  !*** ./components/Register/Register.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-toastify */ "react-toastify");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_passwords__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/passwords */ "./utils/passwords.js");
/* harmony import */ var _utils_passwords__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_utils_passwords__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/TextField */ "@material-ui/core/TextField");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! algolia-places-react */ "algolia-places-react");
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(algolia_places_react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-datepicker */ "react-datepicker");
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_datepicker__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Checkbox */ "@material-ui/core/Checkbox");
/* harmony import */ var _material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var date_fns_locale_fr__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! date-fns/locale/fr */ "date-fns/locale/fr");
/* harmony import */ var date_fns_locale_fr__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(date_fns_locale_fr__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _RegisterStyle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./RegisterStyle */ "./components/Register/RegisterStyle.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _material_ui_core_MobileStepper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/MobileStepper */ "@material-ui/core/MobileStepper");
/* harmony import */ var _material_ui_core_MobileStepper__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_MobileStepper__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _material_ui_icons_KeyboardArrowLeft__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/icons/KeyboardArrowLeft */ "@material-ui/icons/KeyboardArrowLeft");
/* harmony import */ var _material_ui_icons_KeyboardArrowLeft__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_KeyboardArrowLeft__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _material_ui_icons_KeyboardArrowRight__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/icons/KeyboardArrowRight */ "@material-ui/icons/KeyboardArrowRight");
/* harmony import */ var _material_ui_icons_KeyboardArrowRight__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_KeyboardArrowRight__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _material_ui_icons_PersonOutline__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/icons/PersonOutline */ "@material-ui/icons/PersonOutline");
/* harmony import */ var _material_ui_icons_PersonOutline__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_PersonOutline__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/icons/MailOutline */ "@material-ui/icons/MailOutline");
/* harmony import */ var _material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _material_ui_icons_LockOpenOutlined__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/icons/LockOpenOutlined */ "@material-ui/icons/LockOpenOutlined");
/* harmony import */ var _material_ui_icons_LockOpenOutlined__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LockOpenOutlined__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @material-ui/icons/LockOutlined */ "@material-ui/icons/LockOutlined");
/* harmony import */ var _material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @material-ui/core/IconButton */ "@material-ui/core/IconButton");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _material_ui_icons_PhotoCamera__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @material-ui/icons/PhotoCamera */ "@material-ui/icons/PhotoCamera");
/* harmony import */ var _material_ui_icons_PhotoCamera__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_PhotoCamera__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var react_number_format__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! react-number-format */ "react-number-format");
/* harmony import */ var react_number_format__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(react_number_format__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ "@material-ui/core/DialogTitle");
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @material-ui/core/DialogContent */ "@material-ui/core/DialogContent");
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @material-ui/core/DialogContentText */ "@material-ui/core/DialogContentText");
/* harmony import */ var _material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @material-ui/core/DialogActions */ "@material-ui/core/DialogActions");
/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @material-ui/core/Dialog */ "@material-ui/core/Dialog");
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var _material_ui_icons_PhoneIphoneOutlined__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @material-ui/icons/PhoneIphoneOutlined */ "@material-ui/icons/PhoneIphoneOutlined");
/* harmony import */ var _material_ui_icons_PhoneIphoneOutlined__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_PhoneIphoneOutlined__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! react-cookies */ "react-cookies");
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_33___default = /*#__PURE__*/__webpack_require__.n(react_cookies__WEBPACK_IMPORTED_MODULE_33__);
/* harmony import */ var _OAuth_OAuth__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../OAuth/OAuth */ "./components/OAuth/OAuth.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
































const {
  isPhoneOk
} = __webpack_require__(/*! ../../utils/sms */ "./utils/sms.js");







var parse = __webpack_require__(/*! url-parse */ "url-parse");

const {
  Information
} = __webpack_require__(/*! ../Information */ "./components/Information.js");

Object(react_datepicker__WEBPACK_IMPORTED_MODULE_8__["registerLocale"])('fr', date_fns_locale_fr__WEBPACK_IMPORTED_MODULE_11___default.a);

function NumberFormatCustom(props) {
  const {
    inputRef,
    onChange,
    ...other
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_23___default.a, _extends({}, other, {
    getInputRef: inputRef,
    onValueChange: values => {
      onChange({
        target: {
          name: props.name,
          value: values.value
        }
      });
    },
    isNumericString: true
  }));
}

NumberFormatCustom.propTypes = {
  inputRef: prop_types__WEBPACK_IMPORTED_MODULE_24___default.a.func.isRequired,
  name: prop_types__WEBPACK_IMPORTED_MODULE_24___default.a.string.isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_24___default.a.func.isRequired
};

class Register extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "onChange", e => {
      this.setState({
        [e.target.name]: e.target.value
      }, () => this.validatorFirstStep());
    });

    _defineProperty(this, "onChangePicture", e => {
      this.setState({
        picture: e.target.files[0]
      });
    });

    _defineProperty(this, "onChangePassword", e => {
      this.setState({
        status1: Object(_utils_passwords__WEBPACK_IMPORTED_MODULE_2__["checkPass1"])(this.state.password),
        status2: Object(_utils_passwords__WEBPACK_IMPORTED_MODULE_2__["checkPass2"])(this.state.password, this.state.password2)
      }, () => this.validatorFirstStep());
    });

    _defineProperty(this, "sendSms", () => {
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.defaults.headers.common['Authorization'] = react_cookies__WEBPACK_IMPORTED_MODULE_33___default.a.load('token');
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/myAlfred/api/users/sendSMSVerification', this.state.phone).then(res => {
        var txt = "Le SMS a été envoyé";
        react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].info(txt);
        this.setState({
          smsCodeOpen: true
        });
      }).catch(err => {
        react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].error("Impossible d'envoyer le SMS");
        this.setState({
          serverError: true
        });
      });
    });

    _defineProperty(this, "checkSmsCode", () => {
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.defaults.headers.common['Authorization'] = react_cookies__WEBPACK_IMPORTED_MODULE_33___default.a.load('token');
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.post("/myAlfred/api/users/checkSMSVerification", {
        sms_code: this.state.smsCode
      }).then(res => {
        if (res.data.sms_code_ok) {
          react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].info("Votre numéro de téléphone est validé");
          this.setState({
            smsCodeOpen: false,
            phoneConfirmed: true
          });
        } else {
          react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].error("Le code est incorrect");
        }
      }).catch(err => react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].error("Erreur à la vérification du code"));
    });

    _defineProperty(this, "onSubmit", () => {
      const newUser = {
        google_id: this.state.google_id,
        firstname: this.state.firstname,
        name: this.state.name,
        birthday: this.state.birthday,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2,
        address: this.state.address,
        zip_code: this.state.zip_code,
        city: this.state.city,
        country: this.state.country,
        lat: this.state.lat,
        lng: this.state.lng
      };
      const username = this.state.email;
      const password = this.state.password;
      const google_id = this.state.google_id;
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/myAlfred/api/users/register', newUser).then(() => {
        react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].info('Inscription réussie');
        axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/myAlfred/api/users/login', {
          username,
          password,
          google_id
        }).then(response => {
          const token = react_cookies__WEBPACK_IMPORTED_MODULE_33___default.a.load('token');
          axios__WEBPACK_IMPORTED_MODULE_3___default.a.defaults.headers.common['Authorization'] = token;
        }).catch(err => {
          console.log(err);
        }).then(this.addPhoto).catch(err => console.log(err)).then(this.setState({
          activeStep: this.state.activeStep + 1
        })).catch(err => console.log(err)).then(this.onSubmitPhone).catch(err => console.log(err));
      }).catch(err => {
        let error = Object.values(err.response.data);
        react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].error(error.toString());
        this.setState({
          errors: err.response.data,
          activeStep: 1
        });
      });
    });

    _defineProperty(this, "addPhoto", () => {
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.defaults.headers.common['Authorization'] = react_cookies__WEBPACK_IMPORTED_MODULE_33___default.a.load('token');

      if (this.state.picture !== '') {
        const formData = new FormData();
        formData.append('myImage', this.state.picture);
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        axios__WEBPACK_IMPORTED_MODULE_3___default.a.post("/myAlfred/api/users/profile/picture", formData, config).catch(error => {
          console.log(error);
        });
      }
    });

    _defineProperty(this, "onSubmitPhone", e => {
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.defaults.headers.common['Authorization'] = react_cookies__WEBPACK_IMPORTED_MODULE_33___default.a.load('token');

      if (!this.state.phoneConfirmed && !this.state.serverError) {
        this.sendSms();
      }

      const newPhone = {
        phone: this.state.phone,
        phone_confirmed: this.state.phoneConfirmed
      };
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.put('/myAlfred/api/users/profile/phone', newPhone).then(res => {
        react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].info('Téléphone ajouté');
      }).catch(err => console.log(err));
    });

    _defineProperty(this, "onChangeBirthdayDate", e => {
      let day = new Date(this.state.birthday);
      day.setDate(e.target.value);
      this.setState({
        birthday: day
      });
    });

    _defineProperty(this, "onChangeBirthdayMonth", e => {
      let month = new Date(this.state.birthday);
      month.setMonth(e.target.value - 1);
      this.setState({
        birthday: month
      });
    });

    _defineProperty(this, "onChangeBirthdayYear", e => {
      let year = new Date(this.state.birthday);
      year.setFullYear(e.target.value);
      this.setState({
        birthday: year
      });
    });

    _defineProperty(this, "confirmLater", () => {
      this.setState({
        smsCodeOpen: false
      });
    });

    _defineProperty(this, "onChangeEmail", event => {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (event.target.value.match(regex)) {
        this.setState({
          emailValidator: true,
          emailError: ''
        });
      } else {
        this.setState({
          emailValidator: false,
          emailError: 'Veuillez entrer une adresse email valide.'
        });
      }

      this.setState({
        email: event.target.value
      }, () => this.validatorFirstStep());
    });

    _defineProperty(this, "validatorFirstStep", () => {
      if (this.state.errorEmailType === '' && this.state.email !== '' && this.state.emailValidator && this.state.firstname !== '' && this.state.name !== '' && this.state.status1.check && this.state.status2.check) {
        this.setState({
          firstPageValidator: false
        });
      } else {
        this.setState({
          firstPageValidator: true
        });
      }
    });

    _defineProperty(this, "handleNext", activeStep => {
      if (activeStep === 1) {
        this.onSubmit();
      } else {
        this.setState({
          activeStep: this.state.activeStep + 1
        });
      }
    });

    _defineProperty(this, "handleBack", () => {
      this.setState({
        activeStep: this.state.activeStep - 1
      });
    });

    this.state = {
      firstname: '',
      name: '',
      birthday: new Date(),
      email: '',
      password: '',
      password2: '',
      address: '',
      city: '',
      zip_code: '',
      country: '',
      checked: false,
      status1: {
        error: '',
        check: false
      },
      status2: {
        error: '',
        check: false
      },
      errors: {},
      lat: '',
      lng: '',
      activeStep: 0,
      file: null,
      picture: '',
      value: '',
      phone: '',
      phoneOk: false,
      // Phone sendVerificationSMS
      smsCodeOpen: false,
      // Show/hide SMS code modal
      smsCode: '',
      // Typed SMS code
      smsError: null,
      phoneConfirmed: false,
      serverError: false,
      // Si erreur serveur pour l''envoi du SMS, continuer quand même
      errorEmailType: '',
      emailValidator: false,
      firstPageValidator: true,
      errorExistEmail: false
    };
    this.handleChecked = this.handleChecked.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.providers = ['google'];
  }

  componentDidMount() {
    let query = parse(window.location.href, true).query;

    if (query.google_id) {
      this.setState({
        google_id: query.google_id,
        email: query.email,
        name: query.lastname,
        firstname: query.firstname,
        firstPageValidator: false,
        picture: query.picture,
        file: query.picture
      });
    }

    if (query.error) {
      this.setState({
        errorExistEmail: true
      });
    }

    const token = react_cookies__WEBPACK_IMPORTED_MODULE_33___default.a.load('token');

    if (token) {
      react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].warn('Vous êtes déjà inscrit');
      next_router__WEBPACK_IMPORTED_MODULE_31___default.a.push('/');
    }
  }

  onChangePhone(e) {
    var {
      name,
      value
    } = e.target;
    this.setState({
      [name]: value
    });

    if (name === 'phone') {
      const phoneOk = isPhoneOk(value);

      if (phoneOk && value.startsWith('0')) {
        value = '33' + value.substring(1);
      }

      this.setState({
        'phone': value,
        phoneOk: isPhoneOk(value)
      });
    }
  }

  handleChange(event) {
    this.setState({
      file: event.target.files[0] ? URL.createObjectURL(event.target.files[0]) : null
    });
  }

  onChangeAddress({
    suggestion
  }) {
    this.setState({
      city: suggestion.city,
      address: suggestion.name,
      zip_code: suggestion.postcode,
      country: suggestion.country,
      lat: suggestion.latlng.lat,
      lng: suggestion.latlng.lng
    });
  }

  handleChecked() {
    this.setState({
      checked: !this.state.checked
    });
  }

  renderSwitch(stepIndex, classes, errors) {
    switch (stepIndex) {
      case 0:
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Information, {
          open: this.state.errorExistEmail,
          onClose: () => this.setState({
            errorExistEmail: false
          }),
          type: "warning",
          text: 'Oups ! Email déjà enregistrer.'
        }), !this.state.google_id ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.flexContainerPics
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
          style: {
            color: "rgba(84,89,95,0.95)",
            fontWeight: "bold",
            letterSpacing: -1
          }
        }, "Avec")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          style: {
            width: '70%'
          }
        }, this.providers.map(provider => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OAuth_OAuth__WEBPACK_IMPORTED_MODULE_34__["default"], {
          provider: provider,
          key: provider
        }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.flexContainerPics
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
          style: {
            color: "rgba(84,89,95,0.95)",
            fontWeight: "bold",
            letterSpacing: -1
          }
        }, "Ou")))))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_18___default.a, {
          className: classes.colorIcon
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true,
          className: classes.widthTextField
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5___default.a, {
          id: "input-with-icon-grid",
          label: "Email",
          placeholder: "Email",
          margin: "normal",
          style: {
            width: '100%'
          },
          type: "email",
          value: this.state.email,
          onChange: this.onChangeEmail,
          error: this.state.emailError,
          helperText: this.state.emailError,
          disabled: !!this.state.google_id
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", {
          style: {
            color: 'red'
          }
        }, errors.email)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_PersonOutline__WEBPACK_IMPORTED_MODULE_17___default.a, {
          className: classes.colorIcon
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true,
          className: classes.widthTextField
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5___default.a, {
          id: "standard-with-placeholder",
          label: "Pr\xE9nom",
          placeholder: "Pr\xE9nom",
          margin: "normal",
          style: {
            width: '100%'
          },
          type: "text",
          name: "firstname",
          value: this.state.firstname,
          onChange: this.onChange,
          error: errors.firstname
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", {
          style: {
            color: 'red'
          }
        }, errors.firstname))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_PersonOutline__WEBPACK_IMPORTED_MODULE_17___default.a, {
          className: classes.colorIcon
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true,
          className: classes.widthTextField
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5___default.a, {
          label: "Nom",
          placeholder: "Nom",
          margin: "normal",
          style: {
            width: '100%'
          },
          type: "text",
          name: "name",
          value: this.state.name,
          onChange: this.onChange,
          error: errors.name
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", {
          style: {
            color: 'red'
          }
        }, errors.name))), !this.state.google_id ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_LockOpenOutlined__WEBPACK_IMPORTED_MODULE_19___default.a, {
          className: classes.colorIcon
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true,
          className: classes.widthTextField
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5___default.a, {
          label: "Cr\xE9er un mot de passe",
          placeholder: "Cr\xE9er un mot de passe",
          margin: "normal",
          style: {
            width: '100%'
          },
          type: "password",
          name: "password",
          value: this.state.password,
          onChange: this.onChange,
          onKeyUp: this.onChangePassword,
          error: this.state.status1.error,
          helperText: this.state.status1.error
        })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_20___default.a, {
          className: classes.colorIcon
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true,
          className: classes.widthTextField
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5___default.a, {
          label: "Confirmer mot de passe",
          placeholder: "Confirmer mot de passe",
          margin: "normal",
          style: {
            width: '100%'
          },
          type: "password",
          name: "password2",
          value: this.state.password2,
          onChange: this.onChange,
          onKeyUp: this.onChangePassword,
          error: this.state.status2.error,
          helperText: this.state.status2.error
        })))))) : null);

      case 1:
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          accept: "image/*",
          className: "input",
          style: {
            display: 'none'
          },
          id: "icon-button-file",
          type: "file",
          onChange: event => {
            this.handleChange(event);
            this.onChangePicture(event);
          },
          name: "myImage"
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
          htmlFor: "icon-button-file"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_21___default.a, {
          color: "primary",
          className: classes.button,
          style: {
            backgroundImage: `url('${this.state.file}')`
          },
          component: "span"
        }, this.state.file === null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_PhotoCamera__WEBPACK_IMPORTED_MODULE_22___default.a, {
          style: {
            fontSize: '2rem'
          }
        }) : null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Typography"], {
          className: classes.subtitle
        }, "Adresse postale")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          className: classes.textStyle
        }, "Votre adresse ne sera pas visible, mais nous l\u2019utiliserons pour vous proposer ou proposer vos services aux utilisateurs ou Alfred proches de chez vous.")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true,
          style: {
            width: '100%'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(algolia_places_react__WEBPACK_IMPORTED_MODULE_7___default.a, {
          className: classes.textFieldAlgo,
          placeholder: "Recherchez votre adresse",
          options: {
            appId: 'plKATRG826CP',
            apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
            language: 'fr',
            countries: ['fr'],
            type: 'address'
          },
          onChange: suggestion => this.onChangeAddress(suggestion)
        })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Typography"], {
          className: classes.subtitle
        }, "Date de naissance")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          className: classes.textStyle
        }, "Pour vous inscrire, vous devez e\u0302tre \xE2ge\u0301 d\u2019au moins 16 ans. Les autres utilisateurs ne verront pas votre date de naissance.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true,
          className: classes.datenaissance,
          style: {
            display: "flex",
            alignItems: "center"
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true,
          style: {
            justifyContent: 'space-between',
            flexWrap: 'nowrap'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true,
          style: {
            width: '30%'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5___default.a, {
          label: "Jour",
          placeholder: "Jour",
          onChange: this.onChangeBirthdayDate,
          inputProps: {
            maxLength: 2
          },
          InputProps: {
            inputComponent: NumberFormatCustom
          }
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true,
          style: {
            width: '30%'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5___default.a, {
          label: "Mois",
          placeholder: "Mois",
          onChange: this.onChangeBirthdayMonth,
          inputProps: {
            maxLength: 2
          },
          InputProps: {
            inputComponent: NumberFormatCustom
          }
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true,
          style: {
            width: '30%'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5___default.a, {
          label: "Ann\xE9e",
          placeholder: "Ann\xE9e",
          onChange: this.onChangeBirthdayYear,
          inputProps: {
            maxLength: 4
          },
          InputProps: {
            inputComponent: NumberFormatCustom
          }
        })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.newContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Typography"], {
          className: classes.subtitle
        }, "T\xE9l\xE9phone")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          className: classes.textStyle
        }, "L'ajout de votre num\xE9ro de t\xE9l\xE9phone permet aux membres My-Alfred de disposer d'un moyen pour vous contacter."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_PhoneIphoneOutlined__WEBPACK_IMPORTED_MODULE_30___default.a, {
          className: classes.colorIcon
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true,
          style: {
            width: '70%'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5___default.a, {
          id: "standard-with-placeholder",
          label: "Num\xE9ro de t\xE9l\xE9phone",
          placeholder: "Num\xE9ro de t\xE9l\xE9phone",
          margin: "normal",
          style: {
            width: '100%'
          },
          type: 'number',
          name: "phone",
          value: this.state.phone,
          onChange: e => this.onChangePhone(e)
        }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true,
          style: {
            marginTop: 15,
            alignItems: 'center'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_9___default.a, {
          checked: this.state.checked,
          onChange: this.handleChecked,
          value: "checked",
          color: "primary"
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "footer/cguPage",
          target: "_blank",
          style: {
            color: 'blue'
          }
        }, "J\u2019accepte les conditions ge\u0301ne\u0301rales d\u2019utilisation de My-Alfred.")))))));

      case 2:
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
          className: classes.titleRegister
        }, "Inscription termin\xE9e")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: classes.newContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true,
          style: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: 20,
            height: 100
            /*safari*/

          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          src: "../../static/happy_castor.svg",
          style: {
            width: 100
          },
          alt: 'success'
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true,
          style: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: 10,
            textAlign: 'center'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Inscription r\xE9ussie ! Vous pouvez maintenant proposer ou rechercher vos services sur My Alfred")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true,
          className: classes.responsiveButton
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true,
          style: {
            marginRight: '1%'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_32___default.a, {
          href: '/search'
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          style: {
            textDecoration: 'none'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10___default.a, {
          variant: "contained",
          color: "primary",
          style: {
            color: "white"
          }
        }, "Commencez \xE0 explorer")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true,
          className: classes.responsiveSecondaryButton
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_32___default.a, {
          href: '/creaShop/creaShop'
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          style: {
            textDecoration: 'none'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10___default.a, {
          variant: "contained",
          color: "secondary",
          style: {
            color: "white"
          }
        }, "Proposer mes services")))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_29___default.a, {
          open: this.state.smsCodeOpen,
          "aria-labelledby": "form-dialog-title"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_25___default.a, {
          id: "form-dialog-title"
        }, "Confirmation du num\xE9ro de t\xE9l\xE9phone"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_26___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_27___default.a, null, "Saisissez le code re\xE7u par SMS"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5___default.a, {
          autoFocus: true,
          margin: "dense",
          id: "name",
          label: "Code",
          type: "number",
          placeholder: "0000",
          maxLength: "4",
          value: this.state.smsCode,
          onChange: e => {
            this.setState({
              smsCode: e.target.value
            });
          },
          fullWidth: true,
          errors: this.state.smsError
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_28___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10___default.a, {
          onClick: () => this.confirmLater(),
          color: "primary"
        }, "Confirmer plus tard"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10___default.a, {
          disabled: this.state.smsCode.length !== 4,
          onClick: () => this.checkSmsCode(),
          color: "primary"
        }, "Confirmer"))))));
    }
  }

  render() {
    const {
      classes
    } = this.props;
    const {
      errors,
      activeStep,
      firstPageValidator
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.fullContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.newContainer
    }, activeStep === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
      className: classes.titleRegister
    }, "Inscription")) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.containerSwitch
    }, this.renderSwitch(activeStep, classes, errors)), activeStep < 2 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
      style: {
        marginTop: 10
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
      container: true,
      className: classes.bottomContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
      item: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Vous avez d\xE9j\xE0 un compte My Alfred ? ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
      item: true,
      style: {
        marginLeft: 5
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10___default.a, {
      color: "primary",
      onClick: this.props.callLogin
    }, "Connexion"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_32___default.a, {
      href: '/needHelp/needHelp',
      target: "_blank"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      target: "_blank",
      style: {
        color: 'blue',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center'
      }
    }, "Besoin d'aide pour proposer vos services ? Prenez rendez-vous avec l'\xE9quipe My Alfred ici.")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MobileStepper__WEBPACK_IMPORTED_MODULE_14___default.a, {
      variant: "progress",
      steps: 2,
      position: "static",
      activeStep: activeStep,
      className: classes.rootStepper,
      classes: {
        progress: classes.progress
      },
      nextButton: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10___default.a, {
        size: "small",
        onClick: () => this.handleNext(activeStep),
        disabled: firstPageValidator
      }, activeStep <= 1 ? "Suivant" : "Terminer", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_KeyboardArrowRight__WEBPACK_IMPORTED_MODULE_16___default.a, null)),
      backButton: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10___default.a, {
        size: "small",
        onClick: this.handleBack,
        disabled: activeStep === 0
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_KeyboardArrowLeft__WEBPACK_IMPORTED_MODULE_15___default.a, null), "Pr\xE9c\xE9dent")
    }))) : null)));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__["withStyles"])(_RegisterStyle__WEBPACK_IMPORTED_MODULE_12__["default"])(Register));

/***/ }),

/***/ "./components/Register/RegisterStyle.js":
/*!**********************************************!*\
  !*** ./components/Register/RegisterStyle.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  fullContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  datenaissance: {
    marginTop: 20,
    width: '100%'
  },
  newContainer: {
    padding: '5%',
    [theme.breakpoints.down("xs")]: {
      padding: 10
    }
  },
  country: {
    width: '100%'
  },
  birthday: {
    height: 40,
    fontSize: '0.9rem'
  },
  rootStepper: {
    width: '100%',
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing(1),
    width: '100%'
  },
  textFieldAlgo: {
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0
  },
  mainContainer: {
    [theme.breakpoints.down("xs")]: {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  signupContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      marginBottom: 200
    }
  },
  card: {
    fontFamily: 'Helvetica',
    width: 800,
    marginTop: '100px',
    [theme.breakpoints.down("xs")]: {
      width: '90%'
    }
  },
  banner: {
    marginBottom: 25,
    backgroundColor: '#2FBCD3',
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down("xs")]: {
      textAlign: 'center'
    }
  },
  title: {
    fontFamily: 'Helvetica',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 0,
    paddingTop: 22,
    letterSpacing: 1
  },
  widthTextField: {
    width: '70%',
    [theme.breakpoints.down("xs")]: {
      width: '80%'
    }
  },
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  progress: {
    [theme.breakpoints.down("xs")]: {
      width: '25%'
    }
  },
  titleRegister: {
    textAlign: 'center',
    margin: '0px auto 1.6rem',
    fontSize: "1.6rem",
    color: "rgba(84,89,95,0.95)",
    letterSpacing: -1,
    fontWeight: "bold"
  },
  containerSwitch: {
    width: '100%',
    height: '100%',
    margin: '0px auto 1.6rem'
  },
  genericContainer: {
    width: '100%',
    justifyContent: 'center'
  },
  genericContainerAndMargin: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30
  },
  colorIcon: {
    color: 'rgba(84,89,95,0.95)'
  },
  button: {
    width: 150,
    height: 150,
    backgroundColor: 'lightgray',
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  subtitle: {
    fontSize: '1.2rem',
    width: '100%',
    marginTop: 15,
    textAlign: 'center'
  },
  textStyle: {
    textAlign: 'center'
  },
  responsiveButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      justifyContent: 'center'
    }
  },
  responsiveSecondaryButton: {
    [theme.breakpoints.down('xs')]: {
      marginTop: '2%'
    }
  },
  flexContainerPics: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

/***/ }),

/***/ "./components/SearchInput/SearchInput.js":
/*!***********************************************!*\
  !*** ./components/SearchInput/SearchInput.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/TextField */ "@material-ui/core/TextField");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/Search */ "@material-ui/icons/Search");
/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _SearchInputStyle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SearchInputStyle */ "./components/SearchInput/SearchInputStyle.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/IconButton */ "@material-ui/core/IconButton");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Paper */ "@material-ui/core/Paper");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_InputBase__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/InputBase */ "@material-ui/core/InputBase");
/* harmony import */ var _material_ui_core_InputBase__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_InputBase__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Divider */ "@material-ui/core/Divider");
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/MenuItem */ "@material-ui/core/MenuItem");
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! algolia-places-react */ "algolia-places-react");
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(algolia_places_react__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/core/Hidden */ "@material-ui/core/Hidden");
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react-cookies */ "react-cookies");
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(react_cookies__WEBPACK_IMPORTED_MODULE_17__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




















var parse = __webpack_require__(/*! url-parse */ "url-parse");

class SearchInput extends react__WEBPACK_IMPORTED_MODULE_4___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "onChange", e => {
      let {
        name,
        value
      } = e.target;
      this.setState({
        [e.target.name]: e.target.value
      });

      if (name === 'selectedAddress') {
        if (value === 'addAddress') {
          next_router__WEBPACK_IMPORTED_MODULE_12___default.a.push('/profile/myAddresses');
        } else {
          this.setState({
            gps: value === 'all' ? null : value === 'main' ? this.state.allAddresses['main'].gps : {
              lat: this.state.allAddresses[value].lat,
              lng: this.state.allAddresses[value].lng
            }
          });
        }
      }
    });

    this.state = {
      keyword: '',
      gps: '',
      city: '',
      user: null,
      selectedAddress: null
    };
    this.findService = this.findService.bind(this);
  }

  componentDidMount() {
    var query = parse(window.location.href, true).query;
    query.gps = 'gps' in query ? JSON.parse(query.gps) : null;
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.headers.common['Authorization'] = react_cookies__WEBPACK_IMPORTED_MODULE_17___default.a.load('token');
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/myAlfred/api/users/current').then(res => {
      let user = res.data;
      var allAddresses = {
        'main': user.billing_address
      };
      user.service_address.forEach(ad => allAddresses[ad._id] = ad);

      if (!('selectedAddress' in query)) {
        query.selectedAddress = 'main';
        query.gps = user.billing_address.gps;
      }

      query.user = user;
      query.allAddresses = allAddresses;
      this.setState(query);
    }).catch(err => {
      console.log("Not logged");
    });
  }

  findService() {
    var queryParams = {
      search: 1
    };

    if (this.state.keyword) {
      queryParams['keyword'] = this.state.keyword;
    }

    ;

    if (this.state.city) {
      queryParams['city'] = this.state.city;
    }

    ;

    if (this.state.gps) {
      queryParams['gps'] = JSON.stringify(this.state.gps);
    }

    ;

    if (this.state.selectedAddress) {
      queryParams['selectedAddress'] = this.state.selectedAddress;
    }
    /**
    TODO : ce code ne change pas l'URL donc si on va sur réserver puis retour,
    il faut relancer la recherche
    if (this.props.searchCallback) {
      this.props.searchCallback(queryParams);
    }
    else {
      Router.push({ pathname: '/search', query: queryParams })
    }
    */


    next_router__WEBPACK_IMPORTED_MODULE_12___default.a.push({
      pathname: '/search',
      query: queryParams
    });
  }

  onChangeCity({
    suggestion
  }) {
    this.setState({
      gps: suggestion.latlng,
      city: suggestion.name
    });
  }

  render() {
    const {
      classes
    } = this.props;
    const {
      user
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.mainContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        width: '100%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_9___default.a, {
      component: "form",
      className: classes.root
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentInputService
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.input,
      placeholder: "Quel service ?",
      InputProps: {
        disableUnderline: true
      },
      onChange: this.onChange,
      value: this.state.keyword,
      name: 'keyword',
      onKeyPress: e => {
        e.key === 'Enter' && e.preventDefault();
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_16___default.a, {
      smUp: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_11___default.a, {
      className: classes.divider,
      orientation: "vertical"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_8___default.a, {
      className: classes.iconButton,
      "aria-label": "menu",
      onClick: this.findService
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_3___default.a, null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_16___default.a, {
      xsDown: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_11___default.a, {
      className: classes.divider,
      orientation: "vertical"
    })), user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentInput
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_16___default.a, {
      mdUp: true,
      smUp: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentImg
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("img", {
      className: classes.imgStyle,
      src: '../../static/assets/img/navBar/icone.svg'
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_16___default.a, {
      smUp: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_11___default.a, {
      className: classes.divider,
      orientation: "vertical"
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentInputAddress
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_2___default.a, {
      id: "outlined-select-currency",
      select: true,
      style: {
        marginTop: '6px',
        width: '100%'
      },
      InputProps: {
        disableUnderline: true
      },
      value: this.state.selectedAddress,
      name: 'selectedAddress',
      onChange: e => {
        this.onChange(e);
      },
      margin: "dense"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_13___default.a, {
      value: 'main'
    }, "Adresse principale, ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("em", null, " ", ' ' + user.billing_address.address, " ", user.billing_address.zip_code, ",", user.billing_address.city)), user.service_address.map(e => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_13___default.a, {
      value: e._id
    }, e.label + ', ', " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("em", null, " ", ' ' + e.address, ",", e.zip_code, " ", e.city))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_13___default.a, {
      value: 'all'
    }, "Partout, Rechercher des Alfred partout"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_13___default.a, {
      value: 'addAddress'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("p", {
      style: {
        color: '#2FBCD3',
        cursor: 'pointer'
      }
    }, "Ajouter une adresse"))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentInput
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        width: '100%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(algolia_places_react__WEBPACK_IMPORTED_MODULE_14___default.a, {
      placeholder: "Dans quelle ville ?",
      style: {
        color: '#505050'
      },
      options: {
        appId: 'plKATRG826CP',
        apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
        language: 'fr',
        countries: ['fr'],
        type: 'city'
      },
      onChange: suggestion => this.onChangeCity(suggestion),
      onClear: () => this.setState({
        city: '',
        gps: null
      })
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_16___default.a, {
      xsDown: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_11___default.a, {
      className: classes.divider,
      orientation: "vertical"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_16___default.a, {
      xsDown: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_8___default.a, {
      className: classes.iconButton,
      "aria-label": "menu",
      onClick: this.findService
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_3___default.a, null))))));
  }

}

SearchInput.propTypes = {
  classes: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object.isRequired,
  theme: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["withStyles"])(_SearchInputStyle__WEBPACK_IMPORTED_MODULE_6__["default"])(SearchInput));

/***/ }),

/***/ "./components/SearchInput/SearchInputStyle.js":
/*!****************************************************!*\
  !*** ./components/SearchInput/SearchInputStyle.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  mainContainer: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse'
    }
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    borderBottom: 0
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  contentInput: {
    display: 'flex',
    width: '50%',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: 10,
      marginBottom: 10,
      justifyContent: 'center'
    }
  },
  contentInputService: {
    display: 'flex',
    width: '50%',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      marginTop: 10,
      marginBottom: 10,
      justifyContent: 'center',
      border: '1px solid rgb(232, 235, 235)',
      borderRadius: 5,
      backgroundColor: 'rgb(232, 235, 235)'
    }
  },
  contentInputAddress: {
    width: '95%',
    marginLeft: 20,
    [theme.breakpoints.down('xs')]: {
      width: '70%'
    }
  },
  contentImg: {
    width: '10%',
    display: 'flex'
  },
  imgStyle: {
    width: 20,
    height: 20
  }
}));

/***/ }),

/***/ "./components/home/AssureBack/Assureback.js":
/*!**************************************************!*\
  !*** ./components/home/AssureBack/Assureback.js ***!
  \**************************************************/
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
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/CardActionArea */ "@material-ui/core/CardActionArea");
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_9__);











const styles = theme => ({
  container: {
    margin: 'auto',
    fontFamily: 'Helvetica',
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      width: 920
    },
    [theme.breakpoints.up('lg')]: {
      // large: 1280px or larger
      width: 1170
    },
    [theme.breakpoints.up('xl')]: {
      // extra-large: 1920px or larger
      width: 1366
    }
  },
  media: {
    height: 400,
    borderRadius: '20px',
    margin: '1%'
  },
  card1: {
    marginTop: '10%',
    display: 'flex',
    height: 'auto',
    boxShadow: '1px 3px 1px transparent',
    marginBottom: '3%',
    [theme.breakpoints.up('xs')]: {
      // medium: 960px or larger
      display: 'none'
    },
    [theme.breakpoints.up('sm')]: {
      // medium: 960px or larger
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      display: 'flex'
    },
    [theme.breakpoints.up('lg')]: {
      // medium: 960px or larger
      display: 'flex'
    },
    [theme.breakpoints.up('xl')]: {
      // medium: 960px or larger
      display: 'flex'
    }
  },
  card22: {
    marginTop: '10%',
    display: 'flex',
    height: 'auto',
    boxShadow: '1px 3px 1px transparent',
    [theme.breakpoints.up('xs')]: {
      // medium: 960px or larger
      display: 'flex',
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      // medium: 960px or larger
      display: 'flex',
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      display: 'none'
    },
    [theme.breakpoints.up('lg')]: {
      // medium: 960px or larger
      display: 'none'
    },
    [theme.breakpoints.up('xl')]: {
      // medium: 960px or larger
      display: 'none'
    }
  },
  details: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: '50%',
    height: '300px'
  },
  padding: {
    padding: '0.7rem',
    color: 'rgba(84,89,95,0.95)',
    fontWeight: 'bold',
    textAlign: 'left',
    letterSpacing: 2,
    fontSize: 40,
    lineHeight: 1.5
  },
  padding2: {
    padding: '0.7rem',
    textAlign: 'left',
    fontSize: 15
  },
  margin: {
    margin: '0.7rem'
  },
  card: {
    display: 'flex',
    margin: '5px!important',
    minWidth: '300px!important',
    marginRight: '10px!important',
    marginLeft: '10px!important',
    boxShadow: '1px 3px 1px transparent'
  }
});

class Assureback extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const {
      classes
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container,
      style: {
        marginBottom: 20
      },
      wrap: "wrap"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.card1
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_7___default.a, {
      xs: 12,
      className: classes.cover,
      image: "../../static/assureback.jpg",
      title: "Proposeserviceimg"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      className: classes.details
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default.a, {
      className: classes.content
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      component: "h5",
      variant: "h5",
      className: classes.padding
    }, "Nous assurons vos arri\xE8res !"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      style: {
        width: '100%'
      },
      variant: "body1",
      color: "textSecondary",
      className: classes.padding2
    }, "Proposez vos services en toute s\xE9r\xE9nit\xE9, My-Alfred s\u2019occupe de tout ! Une assurance en responsabilit\xE9 vous est offerte pour toute r\xE9alisation de service !")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.card22
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      className: classes.details
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_8___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_7___default.a, {
      className: classes.media,
      image: "../../static/assureback.jpg",
      title: "proposeserviceimg"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      component: "h5",
      variant: "h5",
      className: classes.padding
    }, "Nous assurons vos arri\xE8res !"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      variant: "body1",
      color: "textSecondary",
      className: classes.padding2
    }, "Proposez vos services en toute s\xE9r\xE9nit\xE9, My-Alfred s\u2019occupe de tout ! Une assurance en responsabilit\xE9 vous est offerte pour toute r\xE9alisation de service !"))))))));
  }

}

Assureback.propTypes = {
  classes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string).isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(Assureback));

/***/ }),

/***/ "./components/home/BecomeAlfred/BecomeAlfred.js":
/*!******************************************************!*\
  !*** ./components/home/BecomeAlfred/BecomeAlfred.js ***!
  \******************************************************/
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
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/CardActionArea */ "@material-ui/core/CardActionArea");
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-cookies */ "react-cookies");
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_cookies__WEBPACK_IMPORTED_MODULE_12__);














const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");

const styles = theme => ({
  container: {
    margin: 'auto',
    fontFamily: 'Helvetica',
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      width: 920
    },
    [theme.breakpoints.up('lg')]: {
      // large: 1280px or larger
      width: 1170
    },
    [theme.breakpoints.up('xl')]: {
      // extra-large: 1920px or larger
      width: 1366
    }
  },
  media: {
    height: 400,
    borderRadius: '20px',
    margin: '1%'
  },
  card1: {
    marginTop: '3%',
    display: 'flex',
    height: 'auto',
    boxShadow: '1px 3px 1px transparent',
    [theme.breakpoints.up('xs')]: {
      // medium: 960px or larger
      display: 'none'
    },
    [theme.breakpoints.up('sm')]: {
      // medium: 960px or larger
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      display: 'flex'
    },
    [theme.breakpoints.up('lg')]: {
      // medium: 960px or larger
      display: 'flex'
    },
    [theme.breakpoints.up('xl')]: {
      // medium: 960px or larger
      display: 'flex'
    }
  },
  card22: {
    marginTop: '10%',
    display: 'flex',
    height: 'auto',
    boxShadow: '1px 3px 1px transparent',
    [theme.breakpoints.up('xs')]: {
      // medium: 960px or larger
      display: 'flex',
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      // medium: 960px or larger
      display: 'flex',
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      display: 'none'
    },
    [theme.breakpoints.up('lg')]: {
      // medium: 960px or larger
      display: 'none'
    },
    [theme.breakpoints.up('xl')]: {
      // medium: 960px or larger
      display: 'none'
    }
  },
  details: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: '50%',
    height: '300px'
  },
  padding: {
    padding: '0.7rem'
  },
  margin: {
    margin: '0.7rem',
    color: 'white'
  },
  centercontent: {
    textAlign: 'center!important'
  }
});

class becomeAlfred extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      alfred: false,
      userId: ""
    };
  }

  componentDidMount() {
    const token = react_cookies__WEBPACK_IMPORTED_MODULE_12___default.a.load('token');

    if (token) {
      this.setState({
        logged: true
      });
      const token2 = token.split(' ')[1];
      const decode = jwt.decode(token2);
      this.setState({
        alfred: decode.is_alfred
      });
      axios__WEBPACK_IMPORTED_MODULE_11___default.a.defaults.headers.common['Authorization'] = token;
      axios__WEBPACK_IMPORTED_MODULE_11___default.a.get('/myAlfred/api/users/current').then(res => {
        let user = res.data;
        this.setState({
          user: user,
          alfred: user.is_alfred,
          userId: user._id
        });
      }).catch(err => console.error(err));
    }
  }

  render() {
    const {
      classes
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container,
      wrap: "wrap"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.card1
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_7___default.a, {
      className: classes.cover,
      image: "/static/becomeAlfred.jpg",
      title: "Live from space album cover"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      className: classes.details
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default.a, {
      className: classes.content
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      component: "h5",
      variant: "h5",
      className: classes.padding
    }, "Devenir Alfred"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      style: {
        width: '100%'
      },
      variant: "body1",
      color: "textSecondary",
      className: classes.padding
    }, "Cr\xE9ez en quelques minutes votre espace Alfred, r\xE9pertoriez vos services, indiquez vos disponibilit\xE9s, vos tarifs et profitez d\u2019un compl\xE9ment de revenu !"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_10___default.a, {
      href: this.state.logged && this.state.alfred ? `/shop?id_alfred=${this.state.userId}` : this.state.logged && !this.state.alfred ? '/creaShop/creaShop' : '/signup'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_9___default.a, {
      variant: "contained",
      color: "primary",
      className: classes.margin
    }, "Proposer mes services")))))))));
  }

}

becomeAlfred.propTypes = {
  classes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string).isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(becomeAlfred));

/***/ }),

/***/ "./components/home/Facons/facons.js":
/*!******************************************!*\
  !*** ./components/home/Facons/facons.js ***!
  \******************************************/
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
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__);






const styles = theme => ({
  container: {
    margin: 'auto',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      width: 920
    },
    [theme.breakpoints.up('lg')]: {
      // large: 1280px or larger
      width: 1170
    },
    [theme.breakpoints.up('xl')]: {
      // extra-large: 1920px or larger
      width: 1366
    }
  },
  padding: {
    padding: '0.7rem',
    color: 'rgba(84,89,95,0.95)',
    fontWeight: 'bold',
    textAlign: 'left',
    letterSpacing: 2,
    fontSize: 40,
    lineHeight: 1.5
  },
  margin: {
    margin: '0.7rem'
  },
  textBox1: {
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '3%',
    marginTop: '10%'
  },
  textBox2: {
    color: 'rgba(84,89,95,0.95)',
    fontWeight: 570,
    [theme.breakpoints.up('lg')]: {
      fontSize: 28,
      marginBottom: '5%',
      marginTop: '3%'
    },
    [theme.breakpoints.between('xs', 'lg')]: {
      fontSize: 20,
      margin: 'inherit',
      marginTop: '3%'
    }
  },
  separatorBlue: {
    width: '50px'
  },
  contentBox: {
    lineHeight: 2,
    fontSize: 18,
    textAlign: 'justify',
    [theme.breakpoints.down('md')]: {
      padding: '5%'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '5%'
    },
    [theme.breakpoints.up('xl')]: {
      padding: '5%'
    }
  }
});

class facon extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      alfred: []
    };
  }

  componentDidMount() {}

  render() {
    const {
      classes
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 3
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 6
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      variant: "h4",
      className: classes.textBox1
    }, "Cr\xE9ez votre boutique \xE0 votre fa\xE7on"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4,
      style: {
        margin: 'auto'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      alt: "séparateur",
      src: '../../../static/separateur-bleu.svg',
      className: classes.separatorBlue
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 5
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 3
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      md: 4,
      xs: 12,
      className: classes.textdesc
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.textBox2
    }, "Vous proposez vos services")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.contentBox
    }, "A travers la cr\xE9ation de votre boutique, vous proposez vos services en d\xE9crivant l'ensemble de vos prestations. Vous pouvez \xE0 tout moment revenir sur votre boutique, ajouter ou supprimer des services. Les diff\xE9rentes \xE9tapes de cr\xE9ation de votre boutique sont extr\xEAmement simples. \xC0 vous de jouer !")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      md: 4,
      xs: 12,
      className: classes.textdesc,
      style: {
        marginRight: 15
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.textBox2
    }, "Vous affichez vos disponibilit\xE9s")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.contentBox
    }, "Vous indiquez vos disponibilit\xE9s (jours, heures...) ainsi que vos tarifs et tous les crit\xE8res pour d\xE9finir votre prestations. Vous pouvez synchroniser votre calendrier My-Alfred avec vos autres calendriers et \xE9viter de manquer un rendez-vous. Tous vos calendriers sont mis \xE0 jour automatiquement")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      md: 4,
      xs: 12,
      className: classes.textdesc
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.textBox2
    }, "Vous fixez vos prix")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.contentBox
    }, "C'est \xE0 vous de fixer les prix de vos services : nos outils de tarifications sont l\xE0  pour vous aider \xE0 proposer le meilleur prix. Vous pouvez facilement ajouter des \xE9l\xE9ments personnalis\xE9s, notamment des tarifs de week-end, de nuit, des packages de services...")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      md: 4,
      xs: 12,
      className: classes.textdesc,
      style: {
        marginRight: 15
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.textBox2
    }, "Vous d\xE9terminez vos r\xE8gles")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.contentBox
    }, "Pour que les utilisateurs  de My-Alfred puissent facilement comprendre vos services, vous d\xE9finissez vos r\xE8gles avant qu'ils puissent r\xE9server. S'ils enfreignent les r\xE8gles apr\xE8s avoir r\xE9serv\xE9, vous pourrez annuler leur r\xE9servation sans aucune p\xE9nalit\xE9.")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    })));
  }

}

facon.propTypes = {
  classes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string).isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(facon));

/***/ }),

/***/ "./components/home/Homeheader/Homeheader.css":
/*!***************************************************!*\
  !*** ./components/home/Homeheader/Homeheader.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./components/home/Homeheader/Homeheader.js":
/*!**************************************************!*\
  !*** ./components/home/Homeheader/Homeheader.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/TextField */ "@material-ui/core/TextField");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-datepicker */ "react-datepicker");
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_datepicker__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! algolia-places-react */ "algolia-places-react");
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(algolia_places_react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var date_fns_locale_fr__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! date-fns/locale/fr */ "date-fns/locale/fr");
/* harmony import */ var date_fns_locale_fr__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(date_fns_locale_fr__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _server_validation_is_empty__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../server/validation/is-empty */ "./server/validation/is-empty.js");
/* harmony import */ var _server_validation_is_empty__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_server_validation_is_empty__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _Homeheader_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Homeheader.css */ "./components/home/Homeheader/Homeheader.css");
/* harmony import */ var _Homeheader_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_Homeheader_css__WEBPACK_IMPORTED_MODULE_12__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













Object(react_datepicker__WEBPACK_IMPORTED_MODULE_7__["registerLocale"])('fr', date_fns_locale_fr__WEBPACK_IMPORTED_MODULE_9___default.a);


const styles = theme => ({
  headerimg: {
    [theme.breakpoints.up('lg')]: {
      // medium: 960px or larger
      display: 'none'
    },

    /* Center and scale the image nicely */
    backgroundImage: 'url(../../../static/bg.jpg)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    top: '0%',
    left: '0%',
    zIndex: '2',
    width: '100%',
    minHeight: '122vh'
  },
  headerhomevid: {
    [theme.breakpoints.down('md')]: {
      // medium: 960px or larger
      backgroundAttachment: "fixed",
      display: 'none'
    },

    /* Center and scale the image nicely */
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  headeroverlay: {
    [theme.breakpoints.up('lg')]: {
      // medium: 960px or larger
      backgroundAttachment: "fixed",
      display: 'none'
    },
    position: 'absolute',
    top: '0%',
    left: '0%',
    zIndex: '2',
    width: '100%',
    minHeight: '122vh',
    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,.5), rgba(0,0,0,.4), rgba(0,0,0,.3), rgba(0,0,0,.2), rgba(255,255,255,0))'
  },
  headerhome: {
    color: 'lightgrey',
    fontWeight: 'bold',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    zIndex: '3',
    textAlign: 'center',
    backgroundColor: 'whitesmoke',
    marginLeft: '5%',
    borderRadius: '10px',
    boxShadow: '0px 0px 3px #4c4a4a9e',
    padding: '2%',
    minHeight: '470px',
    bottom: 50,
    marginTop: -10,
    [theme.breakpoints.down('xs')]: {
      // extra-large: 1920px or larger
      width: '88%',
      left: '45%',
      top: '60%'
    },
    [theme.breakpoints.up('sm')]: {
      // extra-large: 1920px or larger
      width: '75%',
      left: '45%',
      top: '55%'
    },
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      width: '40%',
      left: '23%',
      top: '55%'
    },
    [theme.breakpoints.up('lg')]: {
      // large: 1280px or larger
      width: '28%',
      top: '55%',
      left: '20%'
    },
    [theme.breakpoints.up('xl')]: {
      // extra-large: 1920px or larger
      width: '31%',
      top: '50%',
      left: '20%'
    }
  },
  headerhome2: {
    color: 'whitesmoke!important',
    fontWeight: 'bold',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    zIndex: '3',
    padding: '20px',
    textAlign: 'center!important',
    [theme.breakpoints.up('xs')]: {
      // extra-large: 1920px or larger
      width: '50%',
      left: '50%',
      top: '25%'
    },
    [theme.breakpoints.down('sm')]: {
      // extra-large: 1920px or larger
      width: '50%',
      left: '50%',
      top: '25%',
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      width: '45%',
      left: '75%',
      top: '50%'
    },
    [theme.breakpoints.up('lg')]: {
      // large: 1280px or larger
      width: '40%',
      top: '50%',
      left: '75%'
    },
    [theme.breakpoints.up('xl')]: {
      // extra-large: 1920px or larger
      width: '40%',
      top: '50%',
      left: '75%'
    }
  },
  homeform: {
    color: '#505050!important',
    textAlign: 'left',
    width: '100%',
    fontSize: '1.3rem!important',
    fontFamily: 'Helvetica',
    letterSpacing: '-1px',
    lineHeight: '39px!important',
    paddingLeft: '20px'
  },
  pickerhomelocation: {
    width: '100%'
  },
  button: {
    width: '100%',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    border: '0px solid transparent'
  },
  paper: {
    zIndex: '99999',
    position: 'fixed',
    maxWidth: 390,
    backgroundColor: 'white',
    boxShadow: '0 0 7px black',
    padding: 'auto',
    top: '45%',
    left: '0%',
    right: '0%',
    margin: 'auto'
  },
  reactDatePicker: {
    '& .react-datepicker-wrapper, .react-datepicker__input-container': {
      display: 'block'
    }
  },
  '& .react-datepicker-wrapper, .react-datepicker__input-container': {
    display: 'block'
  },
  '& .react-datepicker-wrapper': {
    width: '100% !important'
  }
});

class Homeheader extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "onChange", e => {
      var {
        name,
        value
      } = e.target;
      this.setState({
        [name]: value
      });
    });

    _defineProperty(this, "onSuggestions", ({
      query
    }) => {
      this.setState({
        city: query
      }, () => this.checkGPS());
    });

    this.state = {
      keyword: null,
      city: null,
      gps: null,
      dateSelected: null,
      errors: {}
    };
    this.onSuggestions = this.onSuggestions.bind(this);
  }

  checkGPS() {
    var errors = {};

    if (this.state.city && !this.state.gps) {
      errors['city'] = 'Sélectionnez une ville dans la liste';
    }

    this.setState({
      errors: errors
    });
  }

  onChangeCity({
    suggestion
  }) {
    this.setState({
      gps: suggestion.latlng,
      city: suggestion.name
    }, () => this.checkGPS());
  }

  search() {
    var query = {
      search: 1
    };

    if (this.state.keyword) {
      query['keyword'] = this.state.keyword;
    }

    ;

    if (this.state.city) {
      query['city'] = this.state.city;
    }

    ;

    if (this.state.gps) {
      query['gps'] = JSON.stringify(this.state.gps);
    }

    ;

    if (this.state.dateSelected) {
      query['date'] = moment__WEBPACK_IMPORTED_MODULE_10___default()(this.state.dateSelected).valueOf();
    }

    ;
    next_router__WEBPACK_IMPORTED_MODULE_6___default.a.push({
      pathname: '/search',
      query: query
    });
  }

  render() {
    const {
      classes
    } = this.props;
    const {
      errors,
      popopen
    } = this.state;
    console.log(JSON.stringify(this.state));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.headerimg
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.headerhomevid
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("video", {
      id: "background-video",
      loop: true,
      autoPlay: true,
      muted: true,
      playsInline: true,
      style: {
        width: '100%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("source", {
      src: "../../../static/newVideoLight.mp4",
      type: "video/mp4"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("source", {
      src: "../../../static/newVideoLight.mp4",
      type: "video/ogg"
    }), "Your browser does not support the video tag.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.headeroverlay
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.headerhome
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.homeform,
      style: {
        marginTop: 0
      }
    }, "Et si vous pouviez r\xE9server n'importe quel service imm\xE9diatement ?")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      item: true,
      xs: 12,
      style: {
        width: '100%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      container: true,
      alignItems: "center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      item: true,
      className: classes.pickerhomelocation,
      style: {
        textAlign: 'left',
        fontFamily: 'Helvetica Neue, Helvetica,sans-serif',
        fontSize: '0.9rem',
        fontWeight: '400',
        marginBottom: '15px',
        color: '#505050'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4___default.a, {
      id: "outlined-basic",
      label: "Quel service ?",
      variant: "outlined",
      placeholder: 'Coiffure, Plomberie...',
      value: this.state.keyword,
      onChange: this.onChange,
      name: 'keyword',
      style: {
        width: '100%',
        backgroundColor: 'white'
      }
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      container: true,
      alignItems: "center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      item: true,
      className: classes.pickerhomelocation,
      style: {
        textAlign: 'left',
        fontFamily: 'Helvetica Neue, Helvetica,sans-serif',
        fontSize: '0.9rem',
        fontWeight: '400',
        color: '#505050'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(algolia_places_react__WEBPACK_IMPORTED_MODULE_8___default.a, {
      placeholder: "Dans quelle ville ?",
      style: {
        color: '#505050',
        height: '55px'
      },
      options: {
        appId: 'plKATRG826CP',
        apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
        language: 'fr',
        countries: ['fr'],
        type: 'city'
      },
      onChange: suggestion => this.onChangeCity(suggestion),
      onClear: () => this.setState({
        city: '',
        gps: null
      }, () => this.checkGPS()),
      onSuggestions: this.onSuggestions
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", {
      style: {
        color: 'red'
      }
    }, errors['city']))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      container: true,
      style: {
        marginTop: 20,
        width: '100%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      item: true,
      className: classes.pickerhomelocation,
      style: {
        textAlign: 'left',
        fontFamily: 'Helvetica Neue, Helvetica,sans-serif',
        fontSize: '0.9rem',
        fontWeight: '400',
        marginBottom: '15px',
        color: '#505050'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_datepicker__WEBPACK_IMPORTED_MODULE_7___default.a, {
      selected: this.state.dateSelected,
      onChange: date => {
        this.setState({
          dateSelected: date
        });

        if (date === null) {
          this.setState({
            dateSelected: ''
          });
        }
      },
      style: {
        fontWeight: 100,
        width: '100%'
      },
      customInput: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4___default.a, {
        label: "Quel jour ?",
        style: {
          backgroundColor: 'white',
          fontWeight: 100,
          width: '100%'
        },
        variant: "outlined"
      }),
      locale: "fr",
      showMonthDropdown: true,
      dateFormat: "dd/MM/yyyy",
      placeholderText: moment__WEBPACK_IMPORTED_MODULE_10___default()(this.state.date).format('DD/MM/YYYY'),
      minDate: new Date(),
      className: classes.reactDatePicker
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_5___default.a, {
      disabled: !_server_validation_is_empty__WEBPACK_IMPORTED_MODULE_11___default()(this.state.errors),
      onClick: () => this.search(),
      variant: "contained",
      color: 'primary',
      className: classes.button
    }, "Rechercher")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        textAlign: 'left'
      },
      className: classes.headerhome2
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
      style: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: '2rem',
        textShadow: '0px 0.5px 2px #696969'
      }
    }, "Vous avez du talent, de l\u2019or entre les mains. Qu\u2019attendez-vous pour le mettre \xE0 profit ? "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
      style: {
        float: 'left',
        width: '60px',
        border: 'none',
        height: '1px',
        backgroundColor: 'white',
        boxShadow: '1px 1px 1px #696969'
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
      style: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: '1.5rem',
        textShadow: '0px 0.5px 2px #696969'
      }
    }, "Particuliers ou ind\xE9pendants ?  Cr\xE9ez d\xE8s aujourd\u2019hui votre boutique, proposez vos services et arrondissez vos fins de mois avec My-Alfred !")), popopen ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.paper
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      item: true,
      xs: 4,
      style: {
        height: '1px'
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      item: true,
      xs: 4,
      style: {
        height: '35px'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: '../../../static/logo_final_My-Alfred.svg',
      style: {
        width: 110
      },
      alt: 'Logo Bleu'
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      item: true,
      xs: 3,
      style: {
        height: '1px'
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      item: true,
      xs: 1,
      style: {
        height: '4px',
        zIndex: '10'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      onClick: this.handleClose,
      style: {
        color: '#F8727F',
        cursor: 'pointer'
      }
    }, "x")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
      style: {
        textAlign: 'center',
        color: 'rgba(84,89,95,0.95)',
        letterSpacing: -2,
        fontWeight: 'bold'
      }
    }, "Les r\xE9servations ne seront disponible qu'\xE0 partir de Novembre")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      item: true,
      xs: 5
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      item: true,
      xs: 2,
      style: {
        marginTop: '-10px'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
      className: classes.grosHR
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      item: true,
      xs: 5
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      onClick: this.handleClose,
      style: {
        position: 'absolute',
        top: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '9999px',
        zIndex: '99998'
      }
    })) : null);
  }

}

Homeheader.propTypes = {
  classes: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string).isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["withStyles"])(styles)(Homeheader));

/***/ }),

/***/ "./components/home/NearbyYou/NearbyYou.js":
/*!************************************************!*\
  !*** ./components/home/NearbyYou/NearbyYou.js ***!
  \************************************************/
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
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _NearbyYou_NearbyYouCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NearbyYou/NearbyYouCard */ "./components/home/NearbyYou/NearbyYou/NearbyYouCard.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__);








const styles = theme => ({
  container: {
    margin: 'auto',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      width: 920
    },
    [theme.breakpoints.up('lg')]: {
      // large: 1280px or larger
      width: 1170
    },
    [theme.breakpoints.up('xl')]: {
      // extra-large: 1920px or larger
      width: 1366
    }
  },
  textBox1: {
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '3%',
    marginTop: '3%'
  },
  textBox: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: '3%',
    marginTop: '3%',
    [theme.breakpoints.down('xs')]: {
      // extra-large: 1920px or larger
      marginBottom: '7%'
    }
  },
  separatorRed: {
    width: '50px'
  }
});

class nearbyYou extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: [],
      logged: false
    };
  }

  componentDidMount() {
    axios__WEBPACK_IMPORTED_MODULE_6___default.a.get('/myAlfred/api/serviceUser/home').then(response => {
      let service = response.data;
      this.setState({
        service: service
      });
    });
  }

  render() {
    const {
      classes
    } = this.props;
    const {
      service
    } = this.state;
    const cards = service.slice(0, 6).map(e => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      sm: 6,
      md: 4,
      key: e._id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NearbyYou_NearbyYouCard__WEBPACK_IMPORTED_MODULE_5__["default"], {
      img: e.service.picture,
      title: e.service.label,
      alfred: e.user.firstname,
      user: e.user,
      score: e.user.score
    })));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 8
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      variant: "h4",
      className: classes.textBox1
    }, "Nous sommes tous des Alfred !!!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4,
      style: {
        margin: 'auto'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      alt: "séparateur",
      src: '../../../static/separateur-rouge.svg',
      className: classes.separatorRed
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 5
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.textBox
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Nous sommes tous des Alfred en puissance !!!", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Une passion ? un savoir-faire ? ou simplement du temps, envie de partager\u2026Devenez Alfred et arrondissez vos fins de mois tr\xE8s simplement !")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), cards));
  }

}

nearbyYou.propTypes = {
  classes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string).isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(nearbyYou));

/***/ }),

/***/ "./components/home/NearbyYou/NearbyYou/NearbyYouCard.js":
/*!**************************************************************!*\
  !*** ./components/home/NearbyYou/NearbyYou/NearbyYouCard.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/CardActionArea */ "@material-ui/core/CardActionArea");
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/CardActions */ "@material-ui/core/CardActions");
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Avatar */ "@material-ui/core/Avatar");
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _Avatar_UserAvatar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../Avatar/UserAvatar */ "./components/Avatar/UserAvatar.js");














const styles = theme => ({
  card: {
    maxWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
    padding: 10,
    border: 'solid thin #ccc',
    backgroundColor: 'transparent',
    textAlign: 'center',
    margin: '15px auto',
    boxShadow: '1px 3px 1px transparent'
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'center'
  },
  gridButton: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10
  },
  bookButton: {
    padding: '0 3rem !important'
  },
  media: {
    height: 200
  },
  gpsText: {
    lineHeight: 2
  },
  text: {
    paddingTop: '.7rem',
    textAlign: 'center'
  },
  whiteLogo: {
    margin: '.5rem',
    color: 'white'
  },
  avatarContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    alignContent: 'start',
    justifySelf: 'center',
    height: 60,
    width: 60
  },
  darkOverlay: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  locationGrid: {
    display: 'flex',
    justifyContent: 'center'
  },
  locationLogo: {
    color: 'white',
    marginLeft: 10
  },
  locationText: {
    color: 'white',
    lineHeight: 2.3
  },
  locationAvatarGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center'
  },
  rowLocation: {
    display: 'flex',
    flexDirection: 'row',
    margin: '5px 20px 0 0'
  }
});

const nearbyYouCard = props => {
  // eslint-disable-next-line object-curly-newline
  const {
    classes,
    img,
    title,
    alfred,
    user
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_1___default.a, {
    className: classes.card
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_11___default.a, {
    href: `/shop?id_alfred=${user._id}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_2___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_9___default.a, {
    className: classes.media,
    image: img,
    title: alfred
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.darkOverlay
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7___default.a, {
    container: true,
    className: classes.avatarContainer
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7___default.a, {
    container: true,
    className: classes.gridContainer
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7___default.a, {
    container: true,
    className: classes.locationAvatarGrid
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Avatar_UserAvatar__WEBPACK_IMPORTED_MODULE_12__["default"], {
    user: user,
    className: classes.avatar
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
    variant: "h6",
    component: "h2"
  }, alfred), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
    variant: "body2",
    component: "p",
    style: {
      textAlign: 'center'
    }
  }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7___default.a, {
    container: true
  })))));
};

nearbyYouCard.propTypes = {
  classes: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string).isRequired,
  img: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10__["withStyles"])(styles)(nearbyYouCard));

/***/ }),

/***/ "./components/home/Otter/otter.js":
/*!****************************************!*\
  !*** ./components/home/Otter/otter.js ***!
  \****************************************/
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
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_7__);









const styles = theme => ({
  container: {
    margin: 'auto',
    fontFamily: 'Helvetica',
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      width: 920
    },
    [theme.breakpoints.up('lg')]: {
      // large: 1280px or larger
      width: 1170
    },
    [theme.breakpoints.up('xl')]: {
      // extra-large: 1920px or larger
      width: 1366
    }
  },
  card1: {
    marginTop: '10%',
    display: 'flex',
    height: 'auto',
    boxShadow: '1px 3px 1px transparent',
    [theme.breakpoints.up('xs')]: {
      // medium: 960px or larger
      display: 'none'
    },
    [theme.breakpoints.up('sm')]: {
      // medium: 960px or larger
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      display: 'flex'
    },
    [theme.breakpoints.up('lg')]: {
      // medium: 960px or larger
      display: 'flex'
    },
    [theme.breakpoints.up('xl')]: {
      // medium: 960px or larger
      display: 'flex'
    }
  },
  details: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: '50%',
    height: '300px'
  },
  padding: {
    padding: '0.7rem',
    color: 'rgba(84,89,95,0.95)',
    fontWeight: 'bold',
    textAlign: 'left',
    letterSpacing: 2,
    fontSize: 40,
    lineHeight: 1.5
  },
  padding2: {
    padding: '0.7rem',
    textAlign: 'left',
    fontSize: 15
  },
  margin: {
    margin: '0.7rem'
  },
  card: {
    display: 'flex',
    margin: '5px!important',
    minWidth: '300px!important',
    marginRight: '10px!important',
    marginLeft: '10px!important',
    boxShadow: '1px 3px 1px transparent'
  }
});

class Otter extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      alfred: []
    };
  }

  componentDidMount() {}

  render() {
    const {
      classes
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container,
      wrap: "wrap"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.card1
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      className: classes.details
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default.a, {
      className: classes.content
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      component: "h5",
      variant: "h5",
      className: classes.padding
    }, "Nous vous assistons dans toutes les \xE9tapes"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      style: {
        width: '100%'
      },
      variant: "body1",
      color: "textSecondary",
      className: classes.padding2
    }, "My-Alfred vous permet de mettre \xE0 disposition votre boutique de services en vous assistant dans toutes les \xE9tapes. Gr\xE2ce \xE0 notre aide et \xE0 nos outils, nous sommes pr\xE9sents \xE0 chaque instant pour vous aider \xE0 proposer vos prestations dans les meilleures conditions. Nous vous assistons 24h/24 par t\xE9l\xE9phone, par email et par chat, pour r\xE9pondre \xE0 toutes vos questions ou vous aider sur le moindre probl\xE8me."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_7___default.a, {
      xs: 12,
      className: classes.cover,
      image: "../../static/otter.jpg",
      title: "Proposeserviceimg"
    })))));
  }

}

Otter.propTypes = {
  classes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string).isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(Otter));

/***/ }),

/***/ "./components/home/Passions/passions.js":
/*!**********************************************!*\
  !*** ./components/home/Passions/passions.js ***!
  \**********************************************/
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
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_7__);









const styles = theme => ({
  container: {
    margin: 'auto',
    fontFamily: 'Helvetica',
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      width: 920
    },
    [theme.breakpoints.up('lg')]: {
      // large: 1280px or larger
      width: 1170
    },
    [theme.breakpoints.up('xl')]: {
      // extra-large: 1920px or larger
      width: 1366
    }
  },
  card1: {
    marginTop: '5%',
    display: 'flex',
    height: 'auto',
    boxShadow: '1px 3px 1px transparent',
    [theme.breakpoints.up('xs')]: {
      // medium: 960px or larger
      display: 'none'
    },
    [theme.breakpoints.up('sm')]: {
      // medium: 960px or larger
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      display: 'flex'
    },
    [theme.breakpoints.up('lg')]: {
      // medium: 960px or larger
      display: 'flex'
    },
    [theme.breakpoints.up('xl')]: {
      // medium: 960px or larger
      display: 'flex'
    }
  },
  details: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: '50%',
    height: '300px'
  },
  padding: {
    padding: '0.7rem',
    color: 'rgba(84,89,95,0.95)',
    fontWeight: 'bold',
    textAlign: 'left',
    letterSpacing: 2,
    fontSize: 40,
    lineHeight: 1.5
  },
  padding2: {
    padding: '0.7rem',
    textAlign: 'left',
    fontSize: 15
  },
  margin: {
    margin: '0.7rem'
  },
  card: {
    display: 'flex',
    margin: '5px!important',
    minWidth: '300px!important',
    marginRight: '10px!important',
    marginLeft: '10px!important',
    boxShadow: '1px 3px 1px transparent'
  }
});

class Passions extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      alfred: []
    };
  }

  render() {
    const {
      classes
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container,
      wrap: "wrap"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.card1
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_7___default.a, {
      xs: 12,
      className: classes.cover,
      image: "../../static/macarons.jpg",
      title: "Proposeserviceimg"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      className: classes.details
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default.a, {
      className: classes.content
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      component: "h5",
      variant: "h5",
      className: classes.padding
    }, "Partagez vos passions et vos comp\xE9tences !"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      style: {
        width: '100%'
      },
      variant: "body1",
      color: "textSecondary",
      className: classes.padding2
    }, "My-Alfred vous permet d'obtenir un compl\xE9ment de revenus en partageant vos passions et vos comp\xE9tences. Les utilisateurs peuvent identifier vos services, les r\xE9server et vous permettre ainsi de profiter d'une nouvelle source de revenus !")))))));
  }

}

Passions.propTypes = {
  classes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string).isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(Passions));

/***/ }),

/***/ "./components/home/SerenityNeed/SerenityNeed.js":
/*!******************************************************!*\
  !*** ./components/home/SerenityNeed/SerenityNeed.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/CardActionArea */ "@material-ui/core/CardActionArea");
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/CardActions */ "@material-ui/core/CardActions");
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _CardPreview_CardPreview__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../CardPreview/CardPreview */ "./components/CardPreview/CardPreview.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_12__);














const styles = theme => ({
  container: {
    margin: 'auto',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      width: 920
    },
    [theme.breakpoints.up('lg')]: {
      // large: 1280px or larger
      width: 1170
    },
    [theme.breakpoints.up('xl')]: {
      // extra-large: 1920px or larger
      width: 1366
    }
  },
  card: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    margin: 10,
    boxShadow: `1px 3px 1px transparent`,
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('xs')]: {
      // xs: 600px or larger
      maxWidth: 450
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400
    },
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      maxWidth: 350
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 300
    }
  },
  media2: {
    height: 200,
    [theme.breakpoints.down('md')]: {
      width: '200px!important'
    },
    [theme.breakpoints.down('xs')]: {
      width: '200px!important'
    },
    [theme.breakpoints.down('sm')]: {
      width: '200px!important'
    }
  },
  textBox1: {
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    marginTop: '3%'
  },
  textBox: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: '3%',
    marginTop: 15
  },
  separatorBlue: {
    width: '50px'
  }
});

function shuffleArray(array) {
  let i = array.length - 1;

  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

class serenityNeed extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      prestations: [],
      tags: {}
    };
  }

  componentDidMount() {
    axios__WEBPACK_IMPORTED_MODULE_11___default.a.get('/myAlfred/api/tags/prestations/section1').then(response => {
      let data = response.data;
      this.setState({
        tags: data
      });
      axios__WEBPACK_IMPORTED_MODULE_11___default.a.get('/myAlfred/api/prestation/all/tags/' + data._id).then(res => {
        let prestations = res.data;
        this.setState({
          prestations: prestations
        });
      }).catch();
    }).catch();
  }

  render() {
    const {
      classes,
      gps
    } = this.props;
    const {
      prestations
    } = this.state;
    const {
      tags
    } = this.state;
    const resdata = shuffleArray(prestations);
    const services = resdata.slice(0, 12).map(e => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      sm: 6,
      md: 2,
      lg: 2,
      key: e._id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_12___default.a, {
      href: '/search?search=1&prestation=' + e._id + (gps ? '&gps=' + JSON.stringify(gps) : '')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_9___default.a, {
      className: classes.card
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_6___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.media2,
      image: e.picture,
      title: e.label
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_7___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      gutterBottom: true,
      variant: "p",
      component: "p",
      style: {
        fontSize: 16
      }
    }, e.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      component: "p"
    }, e.description))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_8___default.a, null)))));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.container1,
      id: 'register_done'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 8
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      variant: "h4",
      className: classes.textBox1
    }, tags.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4,
      style: {
        margin: 'auto'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      alt: "séparateur",
      src: '../../../static/separateur-bleu.svg',
      className: classes.separatorBlue
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 5
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.textBox
    }, tags.description))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "thewrap"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
      className: "sectioncard"
    }, services)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: "thewrap2"
    }, services))));
  }

}

serenityNeed.propTypes = {
  classes: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string).isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(styles)(serenityNeed));

/***/ }),

/***/ "./components/home/Wellbeing/Wellbeing.js":
/*!************************************************!*\
  !*** ./components/home/Wellbeing/Wellbeing.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/CardActionArea */ "@material-ui/core/CardActionArea");
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/CardActions */ "@material-ui/core/CardActions");
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_11__);













const styles = theme => ({
  container: {
    margin: 'auto',
    width: '100%',
    textAlign: 'center',
    [theme.breakpoints.up('lg')]: {
      // large: 1280px or larger
      width: 1170
    }
  },
  card: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    margin: 10,
    boxShadow: `1px 3px 1px transparent`,
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('xs')]: {
      // xs: 600px or larger
      maxWidth: 450
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400
    },
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      maxWidth: 350
    }
  },
  media2: {
    height: 200
  },
  textBox1: {
    fontFamily: 'Helvetica',
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '3%',
    marginTop: '3%'
  },
  textBox: {
    fontFamily: 'Helvetica',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: '3%',
    marginTop: '3%'
  },
  separatorBlue: {
    width: '50px'
  }
});

function shuffleArray(array) {
  let i = array.length - 1;

  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

class Wellbeing extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: [],
      tags: {}
    };
  }

  componentDidMount() {
    axios__WEBPACK_IMPORTED_MODULE_10___default.a.get('/myAlfred/api/tags/services/section7').then(response => {
      let data = response.data;
      this.setState({
        tags: data
      });
      axios__WEBPACK_IMPORTED_MODULE_10___default.a.get('/myAlfred/api/service/all/tags/' + data._id).then(res => {
        let service = res.data;
        this.setState({
          service: service
        });
      }).catch();
    }).catch();
  }

  render() {
    const {
      classes,
      gps
    } = this.props;
    const {
      service
    } = this.state;
    const {
      tags
    } = this.state;
    const resdata = shuffleArray(service);
    const services = resdata.slice(0, 6).map(e => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      sm: 6,
      md: 4,
      lg: 4,
      key: e._id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_11___default.a, {
      href: '/search?search=1&service=' + e._id + (gps ? '&gps=' + JSON.stringify(gps) : '')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_9___default.a, {
      className: classes.card
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_6___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.media2,
      image: e.picture,
      title: e.label
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_7___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      style: {
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: '1.25rem'
      }
    }, e.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, e.description))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_8___default.a, null)))));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 8
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      variant: "h4",
      className: classes.textBox1
    }, tags.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4,
      style: {
        margin: 'auto'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      alt: "séparateur",
      src: '../../../static/separateur-bleu.svg',
      className: classes.separatorBlue
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.textBox
    }, tags.description))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), services));
  }

}

Wellbeing.propTypes = {
  classes: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string).isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(styles)(Wellbeing));

/***/ }),

/***/ "./components/home/feelingGood/feelingGood.js":
/*!****************************************************!*\
  !*** ./components/home/feelingGood/feelingGood.js ***!
  \****************************************************/
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
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _feelingGoodCard_feelingGoodCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./feelingGoodCard/feelingGoodCard */ "./components/home/feelingGood/feelingGoodCard/feelingGoodCard.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_7__);









const styles = theme => ({
  container: {
    margin: 'auto',
    width: '100%',
    textAlign: 'center',
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      width: 920
    },
    [theme.breakpoints.up('lg')]: {
      // large: 1280px or larger
      width: 1170
    },
    [theme.breakpoints.up('xl')]: {
      // extra-large: 1920px or larger
      width: 1366
    }
  },
  textBox1: {
    fontFamily: 'Helvetica',
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '3%',
    marginTop: '10%'
  },
  textBox: {
    fontFamily: 'Helvetica',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: '3%',
    marginTop: '3%'
  },
  separatorBlue: {
    width: '50px'
  }
});

function shuffleArray(array) {
  let i = array.length - 1;

  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

class FeelingGood extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: [],
      tags: {}
    };
  }

  componentDidMount() {
    axios__WEBPACK_IMPORTED_MODULE_6___default.a.get('/myAlfred/api/tags/services/section9').then(response => {
      let data = response.data;
      this.setState({
        tags: data
      });
      axios__WEBPACK_IMPORTED_MODULE_6___default.a.get('/myAlfred/api/service/all/tags/' + data._id).then(res => {
        let service = res.data;
        this.setState({
          service: service
        });
      }).catch();
    }).catch();
  }

  render() {
    const {
      classes,
      gps
    } = this.props;
    const {
      service
    } = this.state;
    const {
      tags
    } = this.state;
    const resdata = shuffleArray(service);
    const cards = resdata.slice(0, 4).map((e, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      key: index,
      item: true,
      xs: 12,
      sm: 6,
      md: 3
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_7___default.a, {
      href: '/search?search=1&service=' + e._id + (gps ? '&gps=' + JSON.stringify(gps) : '')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_feelingGoodCard_feelingGoodCard__WEBPACK_IMPORTED_MODULE_5__["default"], {
      id: e._id,
      img: e.picture,
      title: e.label,
      gps: gps
    }))));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 8
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      variant: "h4",
      className: classes.textBox1
    }, tags.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4,
      style: {
        margin: 'auto'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      alt: "séparateur",
      src: '../../../static/separateur-bleu.svg',
      className: classes.separatorBlue
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.textBox
    }, tags.description))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), cards));
  }

}

FeelingGood.propTypes = {
  classes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string).isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(FeelingGood));

/***/ }),

/***/ "./components/home/feelingGood/feelingGoodCard/feelingGoodCard.js":
/*!************************************************************************!*\
  !*** ./components/home/feelingGood/feelingGoodCard/feelingGoodCard.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/CardActionArea */ "@material-ui/core/CardActionArea");
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/CardActions */ "@material-ui/core/CardActions");
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Fab */ "@material-ui/core/Fab");
/* harmony import */ var _material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/icons */ "@material-ui/icons");
/* harmony import */ var _material_ui_icons__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_12__);









 // eslint-disable-next-line object-curly-newline



 // eslint-disable-next-line no-unused-vars

const styles = theme => ({
  card: {
    maxWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
    padding: 10,
    border: 'solid thin #ccc',
    backgroundColor: 'transparent',
    textAlign: 'center',
    margin: 10,
    boxShadow: '1px 3px 1px transparent',
    height: '90%',
    [theme.breakpoints.down('xs')]: {
      // tel
      maxWidth: '100%'
    },
    [theme.breakpoints.down('sm')]: {
      // medium: 960px or larger
      maxWidth: '100%'
    },
    [theme.breakpoints.down('md')]: {
      // ipad
      maxWidth: '100%'
    }
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'center'
  },
  gridButton: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10
  },
  bookButton: {
    padding: '0 3rem !important'
  },
  media: {
    height: 200
  },
  gpsText: {
    lineHeight: 2
  },
  text: {
    paddingTop: '.7rem',
    textAlign: 'center'
  },
  whiteLogo: {
    margin: '.5rem',
    color: 'white'
  },
  avatarContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    alignContent: 'start',
    justifySelf: 'center',
    height: 60,
    width: 60
  },
  lightOverlay: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  locationGrid: {
    display: 'flex',
    justifyContent: 'center'
  },
  locationLogo: {
    color: 'white',
    marginLeft: 10
  },
  locationText: {
    color: 'white',
    lineHeight: 2.3
  },
  locationAvatarGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center'
  },
  rowLocation: {
    display: 'flex',
    flexDirection: 'row',
    margin: '5px 20px 0 0'
  }
});

class FeelingGoodCard extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    // eslint-disable-next-line object-curly-newline
    const {
      classes,
      img,
      desc,
      title,
      alfred,
      avatar,
      score,
      shop,
      id,
      gps
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_12___default.a, {
      href: 'search?search=1&service=' + id + '&gps=' + JSON.stringify(gps)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.card
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_2___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_8___default.a, {
      className: classes.media,
      image: img
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.lightOverlay
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7___default.a, {
      container: true,
      className: classes.avatarContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7___default.a, {
      container: true,
      className: classes.gridContainer
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      variant: "h6",
      component: "h2",
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("center", null, title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7___default.a, {
      container: true
    })))));
  }

}

;
FeelingGoodCard.propTypes = {
  classes: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string).isRequired,
  img: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_11__["withStyles"])(styles)(FeelingGoodCard));

function newFunction() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Fragment, null);
}

/***/ }),

/***/ "./components/home/profite&learn/profite&learn.js":
/*!********************************************************!*\
  !*** ./components/home/profite&learn/profite&learn.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/CardActionArea */ "@material-ui/core/CardActionArea");
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Chip */ "@material-ui/core/Chip");
/* harmony import */ var _material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/CardActions */ "@material-ui/core/CardActions");
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_13__);





 //import SerenityNeedCard from './SerenityNeedCard/SerenityNeedCard';










const styles = theme => ({
  container: {
    margin: 'auto',
    textAlign: 'center',
    width: '100%',
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      width: 920
    },
    [theme.breakpoints.up('lg')]: {
      // large: 1280px or larger
      width: 1170
    },
    [theme.breakpoints.up('xl')]: {
      // extra-large: 1920px or larger
      width: 1366
    }
  },
  hideSM: {
    [theme.breakpoints.down('md')]: {
      // medium: 960px or larger
      display: 'none'
    }
  },
  textdesc: {
    fontFamily: 'Helvetica',
    [theme.breakpoints.down('sm')]: {
      marginTop: '3%!important'
    },
    [theme.breakpoints.down('lg')]: {
      marginTop: '3%!important'
    },
    [theme.breakpoints.down('md')]: {
      marginTop: '3%!important'
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '3%!important'
    }
  },
  textBox1: {
    fontFamily: 'Helvetica',
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '3%',
    marginTop: '10%',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '10%',
      marginTop: '10%'
    },
    [theme.breakpoints.down('sm')]: {
      // medium: 960px or larger
      marginTop: '5%',
      marginBottom: '5%'
    },
    [theme.breakpoints.down('md')]: {
      // medium: 960px or larger
      marginTop: '5%',
      marginBottom: '5%'
    }
  },
  textBox2: {
    fontFamily: 'Helvetica',
    color: 'rgba(84,89,95,0.95)',
    marginBottom: '3%',
    fontSize: 27,
    fontWeight: 570,
    marginTop: '3%'
  },
  textBox3: {
    fontFamily: 'Helvetica',
    color: 'rgba(84,89,95,0.95)',
    fontSize: 16,
    textAlign: 'justify'
  },
  separatorBlue: {
    width: '50px'
  },
  contentTextBox: {
    fontFamily: 'Helvetica',
    paddingRight: 15,
    paddingLeft: 10,
    [theme.breakpoints.down('xs')]: {
      // medium: 960px or larger
      padding: '5%'
    }
  }
});

function shuffleArray(array) {
  let i = array.length - 1;

  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

class profiteandlearn extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: [],
      tags: {}
    };
  }

  render() {
    const {
      classes
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 8
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      variant: "h4",
      className: classes.textBox1
    }, "Proposez vos services, en 3 \xE9tapes !"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4,
      style: {
        margin: 'auto'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      alt: "séparateur",
      src: '../../../static/separateur-bleu.svg',
      className: classes.separatorBlue
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 5
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        display: 'flex',
        alignItems: 'center'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.hideSM,
      item: true,
      md: 6,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("video", {
      width: "75%",
      height: "75%",
      style: {
        float: "left"
      },
      autoPlay: true,
      muted: true,
      playsInline: true,
      loop: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("source", {
      src: "../static/assets/img/Phone1.mp4",
      type: "video/mp4"
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      md: 6,
      xs: 12,
      className: classes.textdesc
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: "../../../static/etape1.svg",
      title: "1",
      alt: "1",
      style: {
        height: "80px",
        width: "80px"
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.textBox2
    }, "Proposez vos services")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      className: classes.contentTextBox
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.textBox3
    }, "Vous n'avez aucun frais \xE0 payer pour proposer vos services. Indiquez simplement vos prestations en vous appuyant sur une liste de plus de 2000 services propos\xE9es sur My-Alfred. Un service n'appara\xEEt pas ? Soumettez-le \xE0 nos \xE9quipes !"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      md: 6,
      xs: 12,
      lg: 12,
      className: classes.textdesc
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: "../../../static/etape2.svg",
      title: "2",
      alt: "2",
      style: {
        height: "80px",
        width: "80px"
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.textBox2
    }, "Fixez vos conditions")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      className: classes.contentTextBox
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.textBox3
    }, "Indiquez vos disponibilit\xE9s (jours, heures...) ainsi que vos tarifs et tous les crit\xE8res pour d\xE9finir votre prestation. Si vous avez besoin d'aide, nous sommes l\xE0 pour vous accompagner dans la cr\xE9ation de votre boutique de comp\xE9tences !                  ")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      md: 6,
      xs: 12,
      lg: 12,
      className: classes.textdesc
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: "../../../static/etape3.svg",
      title: "3",
      alt: "3",
      style: {
        height: "80px",
        width: "80px"
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.textBox2
    }, "R\xE9alisez vos premiers services")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      className: classes.contentTextBox
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.textBox3
    }, "Une fois votre boutique ouverte, les personnes int\xE9ress\xE9es par vos prestations pourront r\xE9server vos services en ligne. Si vous avez des questions avant la prestation, vous pourrez les contacter !                  "))))))));
  }

}

profiteandlearn.propTypes = {
  classes: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string).isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(styles)(profiteandlearn));

/***/ }),

/***/ "./components/home/proposeservice/Proposeservice.js":
/*!**********************************************************!*\
  !*** ./components/home/proposeservice/Proposeservice.js ***!
  \**********************************************************/
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
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/CardActionArea */ "@material-ui/core/CardActionArea");
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_8__);










const styles = theme => ({
  container: {
    fontFamily: 'Helvetica',
    margin: 'auto',
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      width: 920
    },
    [theme.breakpoints.up('lg')]: {
      // large: 1280px or larger
      width: 1170
    },
    [theme.breakpoints.up('xl')]: {
      // extra-large: 1920px or larger
      width: 1366
    }
  },
  media: {
    height: 400,
    borderRadius: '20px',
    margin: '1%'
  },
  card1: {
    marginTop: '3%',
    display: 'flex',
    height: 'auto',
    boxShadow: '1px 3px 1px transparent',
    [theme.breakpoints.up('xs')]: {
      // medium: 960px or larger
      display: 'none'
    },
    [theme.breakpoints.up('sm')]: {
      // medium: 960px or larger
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      display: 'flex'
    },
    [theme.breakpoints.up('lg')]: {
      // medium: 960px or larger
      display: 'flex'
    },
    [theme.breakpoints.up('xl')]: {
      // medium: 960px or larger
      display: 'flex'
    }
  },
  card22: {
    marginTop: '5%',
    display: 'flex',
    height: 'auto',
    boxShadow: '1px 3px 1px transparent',
    [theme.breakpoints.up('xs')]: {
      // medium: 960px or larger
      display: 'flex',
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      // medium: 960px or larger
      display: 'flex',
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      display: 'none'
    },
    [theme.breakpoints.up('lg')]: {
      // medium: 960px or larger
      display: 'none'
    },
    [theme.breakpoints.up('xl')]: {
      // medium: 960px or larger
      display: 'none'
    }
  },
  details: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: '50%',
    height: '300px'
  },
  padding: {
    padding: '0.7rem',
    color: 'rgba(84,89,95,0.95)',
    fontWeight: 'bold',
    textAlign: 'left',
    letterSpacing: 2,
    fontSize: 40,
    lineHeight: 1.5
  },
  padding2: {
    padding: '0.7rem',
    textAlign: 'left',
    fontSize: 15
  },
  margin: {
    margin: '0.7rem'
  },
  card: {
    display: 'flex',
    margin: '5px!important',
    minWidth: '300px!important',
    marginRight: '10px!important',
    marginLeft: '10px!important',
    boxShadow: '1px 3px 1px transparent'
  }
});

class Proposeservice extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const {
      classes
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container,
      wrap: "wrap"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.card1
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      className: classes.details
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default.a, {
      className: classes.content
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      component: "h5",
      variant: "h5",
      className: classes.padding
    }, "Proposez vos services sans faire face \xE0 des co\xFBts initiaux"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      style: {
        width: '100%'
      },
      variant: "body1",
      color: "textSecondary",
      className: classes.padding2
    }, "My-Alfred vous permet de mettre \xE0 disposition votre boutique de services et vous offre une visibilit\xE9 rapide sans avoir \xE0 engager le moindre co\xFBt initial ! My-Alfred g\xE8re pour vous le traitement des paiements, l\u2019assistance aux utilisateurs et vous offre une assurance responsabilit\xE9 civile."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_7___default.a, {
      xs: 12,
      className: classes.cover,
      image: "../../static/proposeservice.jpg",
      title: "Proposeserviceimg"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.card22
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      className: classes.details
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_8___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_7___default.a, {
      className: classes.media,
      image: "../../static/proposeservice.jpg",
      title: "proposeserviceimg"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      component: "h5",
      variant: "h5",
      className: classes.padding
    }, "Proposez vos services sans faire face \xE0 des co\xFBts initiaux"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      variant: "body1",
      color: "textSecondary",
      className: classes.padding2
    }, "My-Alfred vous permet de mettre \xE0 disposition votre boutique de services et vous offre une visibilit\xE9 rapide sans avoir \xE0 engager le moindre co\xFBt initial ! My-Alfred g\xE8re pour vous le traitement des paiements, l\u2019assistance aux utilisateurs et vous offre une assurance responsabilit\xE9 civile."))))))));
  }

}

Proposeservice.propTypes = {
  classes: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string).isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(Proposeservice));

/***/ }),

/***/ "./components/home/section10.js":
/*!**************************************!*\
  !*** ./components/home/section10.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/CardActionArea */ "@material-ui/core/CardActionArea");
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/CardActions */ "@material-ui/core/CardActions");
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_10__);












const styles = theme => ({
  container: {
    margin: 'auto',
    width: '100%',
    textAlign: 'center',
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      width: 920
    },
    [theme.breakpoints.up('xl')]: {
      // medium: 960px or larger
      width: 920
    }
  },
  container1: {
    [theme.breakpoints.down('xs')]: {
      //  medium: 960px or larger
      marginTop: '10px!important'
    },
    [theme.breakpoints.up('sm')]: {
      //  medium: 960px or larger
      marginTop: '10px!important'
    },
    [theme.breakpoints.up('md')]: {
      //  medium: 960px or larger
      marginTop: '10px!important'
    },
    [theme.breakpoints.up('lg')]: {
      //  medium: 960px or larger
      marginTop: '10%'
    }
  },
  card: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    boxShadow: `1px 3px 1px transparent`,
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('xs')]: {
      // xs: 600px or larger
      maxWidth: 450
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400
    },
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      maxWidth: 350
    }
  },
  media2: {
    height: 200,
    [theme.breakpoints.down('md')]: {
      width: '200px!important'
    },
    [theme.breakpoints.down('xs')]: {
      width: '200px!important'
    },
    [theme.breakpoints.down('sm')]: {
      width: '200px!important'
    }
  },
  textBox1: {
    fontFamily: 'Helvetica',
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '3%',
    marginTop: '3%'
  },
  textBox: {
    fontFamily: 'Helvetica',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: '3%',
    marginTop: '3%'
  },
  separatorBlue: {
    width: '50px'
  }
});

function shuffleArray(array) {
  let i = array.length - 1;

  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

class section10 extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      prestations: [],
      tags: {}
    };
  }

  componentDidMount() {
    axios__WEBPACK_IMPORTED_MODULE_9___default.a.get('/myAlfred/api/tags/prestations/section10').then(response => {
      let data = response.data;
      this.setState({
        tags: data
      });
      axios__WEBPACK_IMPORTED_MODULE_9___default.a.get('/myAlfred/api/prestation/all/tags/' + data._id).then(res => {
        let prestations = res.data;
        this.setState({
          prestations: prestations
        });
      }).catch();
    }).catch();
  }

  render() {
    const {
      classes,
      gps
    } = this.props;
    const {
      prestations
    } = this.state;
    const {
      tags
    } = this.state;
    const resdata = shuffleArray(prestations);
    const services = resdata.slice(0, 10).map(e => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      sm: 6,
      md: 2,
      lg: 2,
      key: e._id,
      style: {
        margin: '0 10px'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_10___default.a, {
      href: '/search?search=1&service=' + e._id + (gps ? '&gps=' + JSON.stringify(gps) : '')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_8___default.a, {
      className: classes.card
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.media2,
      image: e.picture,
      title: e.label
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      gutterBottom: true,
      variant: "p",
      component: "p",
      style: {
        fontSize: 16
      }
    }, e.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      component: "p"
    }, e.description))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_7___default.a, null)))));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.container1
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 8
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      variant: "h4",
      className: classes.textBox1
    }, tags.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4,
      style: {
        margin: 'auto'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      alt: "séparateur",
      src: '../../../static/separateur-bleu.svg',
      className: classes.separatorBlue
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 5
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.textBox
    }, tags.description))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "thewrap"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
      className: "sectioncard"
    }, services)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: "thewrap2"
    }, services))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(styles)(section10));

/***/ }),

/***/ "./components/home/section12.js":
/*!**************************************!*\
  !*** ./components/home/section12.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/CardActionArea */ "@material-ui/core/CardActionArea");
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_9__);











const styles = theme => ({
  container: {
    margin: 'auto',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      width: 920
    },
    [theme.breakpoints.up('lg')]: {
      // large: 1280px or larger
      width: 1170
    },
    [theme.breakpoints.up('xl')]: {
      // extra-large: 1920px or larger
      width: 1366
    }
  },
  card: {
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('xs')]: {
      // xs: 600px or larger
      maxWidth: 450
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400
    },
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      maxWidth: 350
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 300
    }
  },
  media2: {
    height: 200
  },
  textBox1: {
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '3%',
    marginTop: '10%'
  },
  textBox: {
    textAlign: 'center',
    marginBottom: '3%',
    marginTop: '3%'
  },
  separatorBlue: {
    width: '50px'
  }
});

function shuffleArray(array) {
  let i = array.length - 1;

  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

class section12 extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: [],
      tags: {}
    };
  }

  componentDidMount() {
    axios__WEBPACK_IMPORTED_MODULE_8___default.a.get('/myAlfred/api/tags/services/section12').then(response => {
      let data = response.data;
      this.setState({
        tags: data
      });
      axios__WEBPACK_IMPORTED_MODULE_8___default.a.get('/myAlfred/api/service/all/tags/' + data._id).then(res => {
        let service = res.data;
        this.setState({
          service: service
        });
      }).catch();
    }).catch();
  }

  render() {
    const {
      classes,
      gps
    } = this.props;
    const {
      service
    } = this.state;
    const {
      tags
    } = this.state;
    const resdata = shuffleArray(service);
    const services = resdata.slice(0, 6).map(e => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      sm: 6,
      md: 2,
      lg: 2,
      key: e._id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_9___default.a, {
      href: '/search?search=1&service=' + e._id + (gps ? '&gps=' + JSON.stringify(gps) : '')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7___default.a, {
      className: classes.card,
      style: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        margin: 10,
        boxShadow: '1px 3px 1px transparent'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.media2,
      image: e.picture,
      title: e.label,
      style: {
        height: '280px'
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      gutterBottom: true,
      variant: "h5",
      component: "p",
      style: {
        fontSize: 15,
        fontWeight: 100,
        textAlign: 'center',
        color: '#505050'
      }
    }, e.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      component: "p"
    }, e.description)))))));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 8
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      variant: "h4",
      className: classes.textBox1
    }, tags.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4,
      style: {
        margin: 'auto'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      alt: "séparateur",
      src: '../../../static/separateur-bleu.svg',
      className: classes.separatorBlue
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 5
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.textBox
    }, tags.description))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, services)));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(styles)(section12));

/***/ }),

/***/ "./components/home/section15.js":
/*!**************************************!*\
  !*** ./components/home/section15.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/CardActionArea */ "@material-ui/core/CardActionArea");
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_9__);











const styles = theme => ({
  container: {
    margin: 'auto',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      width: 920
    },
    [theme.breakpoints.up('lg')]: {
      // large: 1280px or larger
      width: 1170
    },
    [theme.breakpoints.up('xl')]: {
      // extra-large: 1920px or larger
      width: 1366
    }
  },
  card: {
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('xs')]: {
      // xs: 600px or larger
      maxWidth: 450
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400
    },
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      maxWidth: 350
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 300
    }
  },
  media2: {
    height: 200
  },
  textBox1: {
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -2,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: '3%',
    marginTop: '10%'
  },
  textBox: {
    textAlign: 'center',
    fontSize: 15,
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: '3%'
  },
  separatorBlue: {
    width: '50px'
  }
});

function shuffleArray(array) {
  let i = array.length - 1;

  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

class section15 extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      tags: {}
    };
  }

  componentDidMount() {
    axios__WEBPACK_IMPORTED_MODULE_8___default.a.get('/myAlfred/api/tags/category/section15').then(response => {
      let data = response.data;
      this.setState({
        tags: data
      });
      axios__WEBPACK_IMPORTED_MODULE_8___default.a.get('/myAlfred/api/category/all/tags/' + data._id).then(res => {
        let category = res.data;
        this.setState({
          category: category
        });
      }).catch();
    }).catch();
  }

  render() {
    const {
      classes,
      gps
    } = this.props;
    const {
      category
    } = this.state;
    const {
      tags
    } = this.state;
    const resdata = shuffleArray(category);
    const services = resdata.slice(0, 4).map(e => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      sm: 6,
      md: 3,
      lg: 3,
      key: e._id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_9___default.a, {
      href: '/search?search=1&category=' + e._id + (gps ? '&gps=' + JSON.stringify(gps) : '')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7___default.a, {
      className: classes.card,
      style: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        margin: 10,
        boxShadow: '1px 3px 1px transparent'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.media2,
      image: e.picture,
      title: e.label,
      style: {
        height: '530px',
        width: '100%'
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      gutterBottom: true,
      variant: "h5",
      component: "p",
      style: {
        fontSize: 16,
        fontWeight: 100,
        textAlign: 'center',
        color: '#505050'
      }
    }, e.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      component: "p"
    }, e.description)))))));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 8
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      variant: "h4",
      className: classes.textBox1
    }, tags.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4,
      style: {
        margin: 'auto'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      alt: "séparateur",
      src: '../../../static/separateur-bleu.svg',
      className: classes.separatorBlue
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 5
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.textBox
    }, tags.description))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), services));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(styles)(section15));

/***/ }),

/***/ "./components/home/section16.js":
/*!**************************************!*\
  !*** ./components/home/section16.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/CardActionArea */ "@material-ui/core/CardActionArea");
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/CardActions */ "@material-ui/core/CardActions");
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_10__);












const styles = theme => ({
  container: {
    margin: 'auto',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      width: 920
    }
  },
  card: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    margin: 10,
    boxShadow: `1px 3px 1px transparent`,
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('xs')]: {
      // xs: 600px or larger
      maxWidth: 450
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400
    },
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      maxWidth: 350
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 300
    }
  },
  media2: {
    height: 200
  },
  textBox1: {
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '3%',
    marginTop: '10%'
  },
  textBox: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: '3%',
    marginTop: '3%'
  },
  separatorBlue: {
    width: '50px'
  }
});

function shuffleArray(array) {
  let i = array.length - 1;

  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

class section16 extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: [],
      tags: {}
    };
  }

  componentDidMount() {
    axios__WEBPACK_IMPORTED_MODULE_9___default.a.get('/myAlfred/api/tags/services/section16').then(response => {
      let data = response.data;
      this.setState({
        tags: data
      });
      axios__WEBPACK_IMPORTED_MODULE_9___default.a.get('/myAlfred/api/service/all/tags/' + data._id).then(res => {
        let service = res.data;
        this.setState({
          service: service
        });
      }).catch();
    }).catch();
  }

  render() {
    const {
      classes,
      gps
    } = this.props;
    const {
      service
    } = this.state;
    const {
      tags
    } = this.state;
    const resdata = shuffleArray(service);
    const services = resdata.slice(0, 6).map(e => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      sm: 6,
      md: 4,
      lg: 4,
      key: e._id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_10___default.a, {
      href: '/search?search=1&service=' + e._id + (gps ? '&gps=' + JSON.stringify(gps) : '')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_8___default.a, {
      className: classes.card
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.media2,
      image: e.picture,
      title: e.label
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      style: {
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: '1.25rem'
      }
    }, e.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, e.description))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_7___default.a, null)))));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 8
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      variant: "h4",
      className: classes.textBox1
    }, tags.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4,
      style: {
        margin: 'auto'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      alt: "séparateur",
      src: '../../../static/separateur-bleu.svg',
      className: classes.separatorBlue
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 5
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.textBox
    }, tags.description))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), services));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(styles)(section16));

/***/ }),

/***/ "./components/home/section18.js":
/*!**************************************!*\
  !*** ./components/home/section18.js ***!
  \**************************************/
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
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _feelingGood_feelingGoodCard_feelingGoodCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./feelingGood/feelingGoodCard/feelingGoodCard */ "./components/home/feelingGood/feelingGoodCard/feelingGoodCard.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_6__);








const styles = theme => ({
  container: {
    margin: 'auto',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      width: 920
    },
    [theme.breakpoints.up('lg')]: {
      // large: 1280px or larger
      width: 1170
    },
    [theme.breakpoints.up('xl')]: {
      // extra-large: 1920px or larger
      width: 1366
    }
  },
  textBox1: {
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '3%',
    marginTop: '10%'
  },
  textBox: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: '3%'
  },
  separatorBlue: {
    width: '50px'
  }
});

function shuffleArray(array) {
  let i = array.length - 1;

  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

class section18 extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: [],
      tags: {}
    };
  }

  componentDidMount() {
    axios__WEBPACK_IMPORTED_MODULE_5___default.a.get('/myAlfred/api/tags/services/section18').then(response => {
      let data = response.data;
      this.setState({
        tags: data
      });
      axios__WEBPACK_IMPORTED_MODULE_5___default.a.get('/myAlfred/api/service/all/tags/' + data._id).then(res => {
        let service = res.data;
        this.setState({
          service: service
        });
      }).catch();
    }).catch();
  }

  render() {
    const {
      classes,
      gps
    } = this.props;
    const {
      service
    } = this.state;
    const {
      tags
    } = this.state;
    const resdata = shuffleArray(service);
    const cards = resdata.slice(0, 4).map((e, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      key: index,
      item: true,
      xs: 12,
      sm: 6,
      md: 3
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_feelingGood_feelingGoodCard_feelingGoodCard__WEBPACK_IMPORTED_MODULE_4__["default"], {
      id: e._id,
      img: e.picture,
      title: e.label,
      gps: gps
    })));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 8
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, {
      variant: "h4",
      className: classes.textBox1
    }, tags.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4,
      style: {
        margin: 'auto'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      alt: "séparateur",
      src: '../../../static/separateur-bleu.svg',
      className: classes.separatorBlue
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 5
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, {
      className: classes.textBox
    }, tags.description))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), cards));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(section18));

/***/ }),

/***/ "./components/home/section19.js":
/*!**************************************!*\
  !*** ./components/home/section19.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/CardActionArea */ "@material-ui/core/CardActionArea");
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/CardActions */ "@material-ui/core/CardActions");
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_10__);












const styles = theme => ({
  container: {
    margin: 'auto',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    width: '100%',
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      width: 920
    },
    [theme.breakpoints.up('lg')]: {
      // large: 1280px or larger
      width: 1170
    },
    [theme.breakpoints.up('xl')]: {
      // extra-large: 1920px or larger
      width: 1366
    }
  },
  container1: {
    [theme.breakpoints.down('xs')]: {
      //  medium: 960px or larger
      marginTop: '10px!important'
    },
    [theme.breakpoints.up('sm')]: {
      //  medium: 960px or larger
      marginTop: '10px!important'
    },
    [theme.breakpoints.up('md')]: {
      //  medium: 960px or larger
      marginTop: '10px!important'
    },
    [theme.breakpoints.up('lg')]: {
      //  medium: 960px or larger
      marginTop: '10%'
    }
  },
  card: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    margin: 10,
    boxShadow: `1px 3px 1px transparent`,
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('xs')]: {
      // xs: 600px or larger
      maxWidth: 450
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400
    },
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      maxWidth: 350
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 300
    }
  },
  media2: {
    height: 200,
    [theme.breakpoints.down('md')]: {
      width: '200px!important'
    },
    [theme.breakpoints.down('xs')]: {
      width: '200px!important'
    },
    [theme.breakpoints.down('sm')]: {
      width: '200px!important'
    }
  },
  textBox1: {
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '3%',
    marginTop: '10%'
  },
  textBox: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: '3%',
    marginTop: '3%'
  },
  separatorBlue: {
    width: '50px'
  }
});

function shuffleArray(array) {
  let i = array.length - 1;

  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

class section19 extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      prestations: [],
      tags: {}
    };
  }

  componentDidMount() {
    axios__WEBPACK_IMPORTED_MODULE_9___default.a.get('/myAlfred/api/tags/prestations/section19').then(response => {
      let data = response.data;
      this.setState({
        tags: data
      });
      axios__WEBPACK_IMPORTED_MODULE_9___default.a.get('/myAlfred/api/prestation/all/tags/' + data._id).then(res => {
        let prestations = res.data;
        this.setState({
          prestations: prestations
        });
      }).catch();
    }).catch();
  }

  render() {
    const {
      classes,
      gps
    } = this.props;
    const {
      prestations
    } = this.state;
    const {
      tags
    } = this.state;
    const resdata = shuffleArray(prestations);
    const services = resdata.slice(0, 12).map(e => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      sm: 6,
      md: 2,
      lg: 2,
      key: e._id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_10___default.a, {
      href: '/search?search=1&prestation=' + e._id + (gps ? '&gps=' + JSON.stringify(gps) : '')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_8___default.a, {
      className: classes.card
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.media2,
      image: e.picture,
      title: e.label
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      gutterBottom: true,
      variant: "p",
      component: "p",
      style: {
        fontSize: 16
      }
    }, e.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      component: "p"
    }, e.description))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_7___default.a, null)))));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.container1
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 8
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      variant: "h4",
      className: classes.textBox1
    }, tags.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4,
      style: {
        margin: 'auto'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      alt: "séparateur",
      src: '../../../static/separateur-bleu.svg',
      className: classes.separatorBlue
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 5
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.textBox
    }, tags.description))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "thewrap"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
      className: "sectioncard"
    }, services)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: "thewrap2"
    }, services))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(styles)(section19));

/***/ }),

/***/ "./components/home/section21.js":
/*!**************************************!*\
  !*** ./components/home/section21.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/CardActionArea */ "@material-ui/core/CardActionArea");
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/CardActions */ "@material-ui/core/CardActions");
/* harmony import */ var _material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_10__);












const styles = theme => ({
  container: {
    margin: 'auto',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      width: 920
    }
  },
  card: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    margin: 10,
    boxShadow: `1px 3px 1px transparent`,
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('xs')]: {
      // xs: 600px or larger
      maxWidth: 450
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400
    },
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      maxWidth: 350
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 300
    }
  },
  media2: {
    height: 200
  },
  textBox1: {
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '3%',
    marginTop: '10%'
  },
  textBox: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: '3%',
    marginTop: '3%'
  },
  separatorBlue: {
    width: '50px'
  }
});

function shuffleArray(array) {
  let i = array.length - 1;

  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

class section21 extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: [],
      tags: {}
    };
  }

  componentDidMount() {
    axios__WEBPACK_IMPORTED_MODULE_9___default.a.get('/myAlfred/api/tags/services/section21').then(response => {
      let data = response.data;
      this.setState({
        tags: data
      });
      axios__WEBPACK_IMPORTED_MODULE_9___default.a.get('/myAlfred/api/service/all/tags/' + data._id).then(res => {
        let service = res.data;
        this.setState({
          service: service
        });
      }).catch();
    }).catch();
  }

  render() {
    const {
      classes,
      gps
    } = this.props;
    const {
      service
    } = this.state;
    const {
      tags
    } = this.state;
    const resdata = shuffleArray(service);
    const services = resdata.slice(0, 6).map(e => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      sm: 6,
      md: 4,
      lg: 4,
      key: e._id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_10___default.a, {
      href: '/search?search=1&service=' + e._id + (gps ? '&gps=' + JSON.stringify(gps) : '')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_8___default.a, {
      className: classes.card
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.media2,
      image: e.picture,
      title: e.label
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      style: {
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: '1.25rem'
      }
    }, e.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, e.description))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActions__WEBPACK_IMPORTED_MODULE_7___default.a, null)))));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 8
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      variant: "h4",
      className: classes.textBox1
    }, tags.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4,
      style: {
        margin: 'auto'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      alt: "séparateur",
      src: '../../../static/separateur-bleu.svg',
      className: classes.separatorBlue
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 5
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.textBox
    }, tags.description))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), services));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(styles)(section21));

/***/ }),

/***/ "./components/home/section22.js":
/*!**************************************!*\
  !*** ./components/home/section22.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/CardActionArea */ "@material-ui/core/CardActionArea");
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_9__);











const styles = theme => ({
  container: {
    margin: 'auto',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      width: 920
    },
    [theme.breakpoints.up('lg')]: {
      // large: 1280px or larger
      width: 1170
    },
    [theme.breakpoints.up('xl')]: {
      // extra-large: 1920px or larger
      width: 1366
    }
  },
  card: {
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('xs')]: {
      // xs: 600px or larger
      maxWidth: 450
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400
    },
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      maxWidth: 350
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 300
    }
  },
  media2: {
    height: 200
  },
  textBox1: {
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '3%',
    marginTop: '10%'
  },
  textBox: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: '3%'
  },
  separatorBlue: {
    width: '50px'
  }
});

function shuffleArray(array) {
  let i = array.length - 1;

  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

class section22 extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      tags: {}
    };
  }

  componentDidMount() {
    axios__WEBPACK_IMPORTED_MODULE_8___default.a.get('/myAlfred/api/tags/category/section22').then(response => {
      let data = response.data;
      this.setState({
        tags: data
      });
      axios__WEBPACK_IMPORTED_MODULE_8___default.a.get('/myAlfred/api/category/all/tags/' + data._id).then(res => {
        let category = res.data;
        this.setState({
          category: category
        });
      }).catch();
    }).catch();
  }

  render() {
    const {
      classes,
      gps
    } = this.props;
    const {
      category
    } = this.state;
    const {
      tags
    } = this.state;
    const resdata = shuffleArray(category);
    const services = resdata.slice(0, 4).map(e => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      sm: 6,
      md: 3,
      lg: 3,
      key: e._id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_9___default.a, {
      href: '/search?search=1&category=' + e._id + (gps ? '&gps=' + JSON.stringify(gps) : '')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7___default.a, {
      className: classes.card,
      style: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        margin: 10,
        boxShadow: '1px 3px 1px transparent'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.media2,
      image: e.picture,
      title: e.label,
      style: {
        height: '530px',
        width: '100%'
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      gutterBottom: true,
      variant: "h5",
      component: "p",
      style: {
        fontSize: 16,
        fontWeight: 100,
        textAlign: 'center',
        color: '#505050'
      }
    }, e.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      component: "p"
    }, e.description)))))));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 8
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      variant: "h4",
      className: classes.textBox1
    }, tags.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4,
      style: {
        margin: 'auto'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      alt: "séparateur",
      src: '../../../static/separateur-bleu.svg',
      className: classes.separatorBlue
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 5
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.textBox
    }, tags.description))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), services));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(styles)(section22));

/***/ }),

/***/ "./components/home/section3.js":
/*!*************************************!*\
  !*** ./components/home/section3.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/CardActionArea */ "@material-ui/core/CardActionArea");
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_9__);











const styles = theme => ({
  container: {
    textAlign: 'center',
    margin: 'auto',
    width: '100%',
    fontFamily: 'Helvetica',
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      width: 920
    },
    [theme.breakpoints.up('lg')]: {
      // large: 1280px or larger
      width: 1170
    },
    [theme.breakpoints.up('xl')]: {
      // extra-large: 1920px or larger
      width: 1366
    }
  },
  card: {
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('xs')]: {
      // xs: 600px or larger
      maxWidth: 450
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400
    },
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      maxWidth: 350
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 300
    }
  },
  media2: {
    height: 200
  },
  textBox1: {
    letterSpacing: -2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '5%',
    marginBottom: '3%'
  },
  textBox: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: '3%',
    marginTop: '3%'
  },
  separatorBlue: {
    width: '50px'
  }
});

function shuffleArray(array) {
  let i = array.length - 1;

  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

class section3 extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: [],
      tags: {}
    };
  }

  componentDidMount() {
    axios__WEBPACK_IMPORTED_MODULE_8___default.a.get('/myAlfred/api/tags/services/section3').then(response => {
      let data = response.data;
      this.setState({
        tags: data
      });
      axios__WEBPACK_IMPORTED_MODULE_8___default.a.get('/myAlfred/api/service/all/tags/' + data._id).then(res => {
        let service = res.data;
        this.setState({
          service: service
        });
      }).catch();
    }).catch();
  }

  render() {
    const {
      classes,
      gps
    } = this.props;
    const {
      service
    } = this.state;
    const {
      tags
    } = this.state;
    const resdata = shuffleArray(service);
    const services = resdata.slice(0, 6).map(e => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      sm: 6,
      md: 2,
      lg: 2,
      key: e._id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_9___default.a, {
      href: '/search?search=1&service=' + e._id + (gps ? '&gps=' + JSON.stringify(gps) : '')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7___default.a, {
      className: classes.card,
      style: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        margin: 10,
        boxShadow: '1px 3px 1px transparent'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.media2,
      image: e.picture,
      title: e.label,
      style: {
        height: '280px'
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      gutterBottom: true,
      variant: "h5",
      component: "p",
      style: {
        fontSize: 15,
        fontWeight: 100,
        textAlign: 'center',
        color: '#505050'
      }
    }, e.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      component: "p"
    }, e.description)))))));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 8
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      variant: "h4",
      className: classes.textBox1
    }, tags.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4,
      style: {
        margin: 'auto'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      alt: "séparateur",
      src: '../../../static/separateur-bleu.svg',
      className: classes.separatorBlue
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 5
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.textBox
    }, tags.description))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, services)));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(styles)(section3));

/***/ }),

/***/ "./components/home/section6.js":
/*!*************************************!*\
  !*** ./components/home/section6.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/CardMedia */ "@material-ui/core/CardMedia");
/* harmony import */ var _material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/CardActionArea */ "@material-ui/core/CardActionArea");
/* harmony import */ var _material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_9__);











const styles = theme => ({
  container: {
    margin: 'auto',
    width: '100%',
    textAlign: 'center',
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      width: 920
    },
    [theme.breakpoints.up('lg')]: {
      // large: 1280px or larger
      width: 1170
    },
    [theme.breakpoints.up('xl')]: {
      // extra-large: 1920px or larger
      width: 1366
    }
  },
  card: {
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('xs')]: {
      // xs: 600px or larger
      maxWidth: 450
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400
    },
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      maxWidth: 350
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 300
    }
  },
  media2: {
    height: 200
  },
  textBox1: {
    fontFamily: 'Helvetica',
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '3%',
    [theme.breakpoints.up('xs')]: {
      marginTop: '20%'
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: '10%'
    },
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      marginTop: '10%'
    }
  },
  textBox: {
    fontFamily: 'Helvetica',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: '3%',
    marginTop: '3%'
  },
  separatorBlue: {
    width: '50px'
  }
});

function shuffleArray(array) {
  let i = array.length - 1;

  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

class section6 extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      tags: {}
    };
  }

  componentDidMount() {
    axios__WEBPACK_IMPORTED_MODULE_8___default.a.get('/myAlfred/api/tags/category/section6').then(response => {
      let data = response.data;
      this.setState({
        tags: data
      });
      axios__WEBPACK_IMPORTED_MODULE_8___default.a.get('/myAlfred/api/category/all/tags/' + data._id).then(res => {
        let category = res.data;
        this.setState({
          category: category
        });
      }).catch();
    }).catch();
  }

  render() {
    const {
      classes,
      gps
    } = this.props;
    const {
      category
    } = this.state;
    const {
      tags
    } = this.state;
    const resdata = shuffleArray(category);
    const services = resdata.slice(0, 4).map(e => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      sm: 6,
      md: 3,
      lg: 3,
      key: e._id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_9___default.a, {
      href: '/search?search=1&category=' + e._id + (gps ? '&gps=' + JSON.stringify(gps) : '')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_7___default.a, {
      className: classes.card,
      style: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        margin: 10,
        boxShadow: '1px 3px 1px transparent'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardActionArea__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardMedia__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.media2,
      image: e.picture,
      title: e.label,
      style: {
        height: '530px',
        width: '100%'
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_6___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      gutterBottom: true,
      variant: "h5",
      component: "p",
      style: {
        fontSize: 16,
        fontWeight: 100,
        textAlign: 'center'
      }
    }, e.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      component: "p"
    }, e.description)))))));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 8
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      variant: "h4",
      className: classes.textBox1
    }, tags.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4,
      style: {
        margin: 'auto'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      alt: "séparateur",
      src: '../../../static/separateur-bleu.svg',
      className: classes.separatorBlue
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 5
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.textBox
    }, tags.description))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), services));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(styles)(section6));

/***/ }),

/***/ "./components/home/section8.js":
/*!*************************************!*\
  !*** ./components/home/section8.js ***!
  \*************************************/
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
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3__);





const styles = theme => ({
  container: {
    margin: 'auto',
    textAlign: 'center',
    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: {
      // medium: 960px or larger
      width: 920
    },
    [theme.breakpoints.up('lg')]: {
      // large: 1280px or larger
      width: 1170
    },
    [theme.breakpoints.up('xl')]: {
      // extra-large: 1920px or larger
      width: 1366
    }
  },
  padding: {
    padding: '0.7rem',
    color: 'rgba(84,89,95,0.95)',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 40,
    lineHeight: 1.5
  },
  margin: {
    margin: '0.7rem'
  },
  textBox1: {
    fontFamily: 'Helvetica',
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '3%',
    marginTop: '3%'
  },
  textBox2: {
    color: 'rgba(84,89,95,0.95)',
    fontSize: 28,
    fontWeight: 570,
    marginTop: '5%',
    [theme.breakpoints.down('lg')]: {
      padding: '5%'
    },
    [theme.breakpoints.down('xl')]: {
      padding: '5%'
    }
  },
  separatorBlue: {
    width: '50px'
  },
  contentTextbox: {
    textAlign: 'justify',
    fontFamily: 'Helvetica',
    lineHeight: 2,
    fontSize: 18,
    [theme.breakpoints.down('xs')]: {
      padding: '3%'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '1%'
    },
    [theme.breakpoints.down('lg')]: {
      padding: '5%'
    },
    [theme.breakpoints.down('xl')]: {
      padding: '5%'
    }
  }
});

class section8 extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      alfred: []
    };
  }

  render() {
    const {
      classes
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.container
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 3
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 6
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, {
      variant: "h4",
      className: classes.textBox1
    }, "Comment utiliser My-Alfred ?"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4,
      style: {
        margin: 'auto'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      alt: "séparateur",
      src: '../../../static/separateur-bleu.svg',
      className: classes.separatorBlue
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 3
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      md: 4,
      xs: 12,
      className: classes.textdesc
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, {
      className: classes.textBox2
    }, "Pourquoi devenir Alfred ?")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, {
      className: classes.contentTextbox
    }, "My-Alfred vous permet, de mani\xE8re simple et s\xE9curis\xE9e, de mettre vos services \xE0 disposition de tout un chacun. Un talent pour la d\xE9coration ? Une passion pour la cuisine ? Ou tout simplement du temps : proposez vos services et compl\xE9tez vos revenus. Vous avez un contr\xF4le total sur vos disponibilit\xE9s, vos prix et le d\xE9tail de vos prestations.")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      md: 4,
      xs: 12,
      className: classes.textdesc
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, {
      className: classes.textBox2
    }, "Qui peut devenir Alfred ?")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_3___default.a, {
      className: classes.contentTextbox
    }, "Nous sommes tous des Alfred d\xE8s l'\xE2ge de 16 ans. Chacun d'entre nous doit pouvoir partager ses savoir faire, ses comp\xE9tences, ses passions... Tant\xF4t consommateur d'Alfred, tant\xF4t Alfred, rejoignez la communaut\xE9 Alfred en quelques clics !")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 2
    })));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles)(section8));

/***/ }),

/***/ "./hoc/Layout/Footer/Footer.js":
/*!*************************************!*\
  !*** ./hoc/Layout/Footer/Footer.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_ExpansionPanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/ExpansionPanel */ "@material-ui/core/ExpansionPanel");
/* harmony import */ var _material_ui_core_ExpansionPanel__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ExpansionPanel__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_ExpansionPanelDetails__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/ExpansionPanelDetails */ "@material-ui/core/ExpansionPanelDetails");
/* harmony import */ var _material_ui_core_ExpansionPanelDetails__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ExpansionPanelDetails__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_ExpansionPanelSummary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/ExpansionPanelSummary */ "@material-ui/core/ExpansionPanelSummary");
/* harmony import */ var _material_ui_core_ExpansionPanelSummary__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ExpansionPanelSummary__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/ExpandMore */ "@material-ui/icons/ExpandMore");
/* harmony import */ var _material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__);










const styles = theme => ({
  responsive: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  normal: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
});

class Footer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      style: {
        backgroundColor: '#747474'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      md: 3,
      sm: 6,
      xs: 12,
      style: {
        textAlign: 'center',
        margin: '2% 0px'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ExpansionPanel__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.responsive,
      style: {
        backgroundColor: '#747474',
        border: 'none',
        boxShadow: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ExpansionPanelSummary__WEBPACK_IMPORTED_MODULE_4___default.a, {
      expandIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_7___default.a, {
        style: {
          color: 'white'
        }
      }),
      "aria-controls": "panel1bh-content",
      id: "panel1bh-header"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        fontSize: '1rem',
        color: 'white',
        fontWeight: 'bold'
      }
    }, "My-Alfred")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ExpansionPanelDetails__WEBPACK_IMPORTED_MODULE_3___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      style: {
        textAlign: 'left'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "/creaShop/creaShop"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        color: 'white'
      }
    }, "Devenir Alfred")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      style: {
        textAlign: 'left'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "/faq"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        color: 'white'
      }
    }, "Comment \xE7a marche ?")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      style: {
        textAlign: 'left'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "/footer/contactPage"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        color: 'white'
      }
    }, "Nous contacter"))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.normal,
      style: {
        fontSize: '1rem',
        color: 'white',
        fontWeight: 'bold'
      }
    }, "My-Alfred"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.normal,
      style: {
        marginTop: '4%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "/creaShop/creaShop"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        color: 'white'
      }
    }, "Devenir Alfred")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "/faq"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        color: 'white'
      }
    }, "Comment \xE7a marche ?")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "/footer/contactPage"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        color: 'white'
      }
    }, "Nous contacter")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      md: 3,
      sm: 6,
      xs: 12,
      style: {
        textAlign: 'center',
        margin: '2% 0px'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ExpansionPanel__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.responsive,
      style: {
        backgroundColor: '#747474',
        border: 'none',
        boxShadow: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ExpansionPanelSummary__WEBPACK_IMPORTED_MODULE_4___default.a, {
      style: {
        textAlign: 'center'
      },
      expandIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_7___default.a, {
        style: {
          color: 'white'
        }
      }),
      "aria-controls": "panel1bh-content",
      id: "panel1bh-header"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        textAlign: 'center',
        fontSize: '1rem',
        color: 'white',
        fontWeight: 'bold'
      }
    }, "Aide")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ExpansionPanelDetails__WEBPACK_IMPORTED_MODULE_3___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      style: {
        marginTop: '4%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      style: {
        textAlign: 'left'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "/faq"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        color: 'white'
      }
    }, "FAQ utilisateurs")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      style: {
        textAlign: 'left'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: '/faq'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        color: 'white'
      }
    }, "FAQ Alfred"))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.normal,
      style: {
        fontSize: '1rem',
        color: 'white',
        fontWeight: 'bold'
      }
    }, "Aide"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.normal,
      style: {
        marginTop: '4%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "/faq"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        color: 'white'
      }
    }, "FAQ utilisateurs")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: '/faq'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        color: 'white'
      }
    }, "FAQ Alfred")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      md: 3,
      sm: 6,
      xs: 12,
      style: {
        textAlign: 'center',
        margin: '2% 0px'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ExpansionPanel__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.responsive,
      style: {
        backgroundColor: '#747474',
        border: 'none',
        boxShadow: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ExpansionPanelSummary__WEBPACK_IMPORTED_MODULE_4___default.a, {
      style: {
        textAlign: 'center'
      },
      expandIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_7___default.a, {
        style: {
          color: 'white'
        }
      }),
      "aria-controls": "panel1bh-content",
      id: "panel1bh-header"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        textAlign: 'center',
        fontSize: '1rem',
        color: 'white',
        fontWeight: 'bold'
      }
    }, "Services")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ExpansionPanelDetails__WEBPACK_IMPORTED_MODULE_3___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      style: {
        marginTop: '4%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      style: {
        textAlign: 'left'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "#"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        color: 'white'
      }
    }, "Les cat\xE9gories")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      style: {
        textAlign: 'left'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "#"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        color: 'white'
      }
    }, "Les services"))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.normal,
      style: {
        fontSize: '1rem',
        color: 'white',
        fontWeight: 'bold'
      }
    }, "Services"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.normal,
      style: {
        marginTop: '4%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "#"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        color: 'white'
      }
    }, "Les cat\xE9gories")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "#"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        color: 'white'
      }
    }, "Les services")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      md: 3,
      sm: 6,
      xs: 12,
      style: {
        textAlign: 'center',
        margin: '2% 0px'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ExpansionPanel__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.responsive,
      style: {
        backgroundColor: '#747474',
        border: 'none',
        boxShadow: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ExpansionPanelSummary__WEBPACK_IMPORTED_MODULE_4___default.a, {
      style: {
        textAlign: 'center'
      },
      expandIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_7___default.a, {
        style: {
          color: 'white'
        }
      }),
      "aria-controls": "panel1bh-content",
      id: "panel1bh-header"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        fontSize: '1rem',
        color: 'white',
        fontWeight: 'bold'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "https://www.facebook.com/myalfred1/"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none',
        color: 'white'
      },
      target: "_blank"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "fab",
      style: {
        cursor: 'pointer',
        width: '20px'
      },
      "data-icon": "facebook",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      className: "svg-inline--fa fa-facebook fa-w-16 fa-5x"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
      fill: "currentColor",
      d: "M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z",
      className: ""
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "https://www.instagram.com/my_alfred_/"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none',
        color: 'white'
      },
      target: "_blank"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
      "aria-hidden": "true",
      focusable: "false",
      style: {
        cursor: 'pointer',
        width: '20px',
        marginLeft: '3%'
      },
      "data-prefix": "fab",
      "data-icon": "instagram",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 448 512",
      className: "svg-inline--fa fa-instagram fa-w-14 fa-lg"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
      fill: "currentColor",
      d: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z",
      className: ""
    })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ExpansionPanelDetails__WEBPACK_IMPORTED_MODULE_3___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      style: {
        marginTop: '4%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      style: {
        textAlign: 'left'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "/footer/legalNotice"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        color: 'white'
      }
    }, "Mentions l\xE9gales")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      style: {
        textAlign: 'left'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "/footer/cguPage"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        color: 'white'
      }
    }, "Conditions g\xE9n\xE9rales d'utilisation")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      style: {
        textAlign: 'left'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "#"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        color: 'white'
      }
    }, "Politique de confidentialit\xE9"))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.normal,
      style: {
        fontSize: '1rem',
        color: 'white',
        fontWeight: 'bold'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "https://www.facebook.com/myalfred1/"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none',
        color: 'white'
      },
      target: "_blank"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
      "aria-hidden": "true",
      focusable: "false",
      "data-prefix": "fab",
      style: {
        cursor: 'pointer',
        width: '31px',
        marginBottom: '-8px'
      },
      "data-icon": "facebook",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      className: "svg-inline--fa fa-facebook fa-w-16 fa-5x"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
      fill: "currentColor",
      d: "M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "https://www.instagram.com/my_alfred_/"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none',
        color: 'white'
      },
      target: "_blank"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
      "aria-hidden": "true",
      focusable: "false",
      style: {
        cursor: 'pointer',
        width: '30px',
        marginBottom: '-10px',
        marginLeft: '10px'
      },
      "data-prefix": "fab",
      "data-icon": "instagram",
      role: "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 448 512",
      className: "svg-inline--fa fa-instagram fa-w-14 fa-lg"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
      fill: "currentColor",
      d: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
    }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.normal,
      style: {
        marginTop: '4%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "/footer/legalNotice"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        color: 'white'
      }
    }, "Mentions l\xE9gales")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "/footer/cguPage"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        color: 'white'
      }
    }, "Conditions g\xE9n\xE9rales d'utilisation")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
      href: "#"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        color: 'white'
      }
    }, "Politique de confidentialit\xE9")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
      style: {
        border: 'none',
        backgroundColor: 'white',
        height: '1px'
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 15
      }
    }, "\xA9 ", new Date().getFullYear(), " My-Alfred. Tous droits r\xE9serv\xE9s.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 4
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("script", {
      type: "text/javascript",
      id: "hs-script-loader",
      async: true,
      defer: true,
      src: "//js.hs-scripts.com/5065724.js"
    }));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__["withStyles"])(styles)(Footer));

/***/ }),

/***/ "./hoc/Layout/Layout.js":
/*!******************************!*\
  !*** ./hoc/Layout/Layout.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _NavBar_NavBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NavBar/NavBar */ "./hoc/Layout/NavBar/NavBar.js");
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-cookies */ "react-cookies");
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_cookies__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);





class Layout extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ""
    };
  }

  componentDidMount() {
    const token = react_cookies__WEBPACK_IMPORTED_MODULE_2___default.a.load('token');

    if (token) {
      this.setState({
        logged: true
      });
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.defaults.headers.common['Authorization'] = token;
    }

    axios__WEBPACK_IMPORTED_MODULE_3___default.a.get('/myAlfred/api/users/current').then(res => {
      let user = res.data;
      this.setState({
        user: user
      });
      this.setState({
        address: user.billing_address,
        addressSelected: user.billing_address,
        otherAddress: user.service_address,
        gps: user.billing_address.gps
      });
    }).catch(err => {
      console.error(err);
    });
  }

  render() {
    const {
      gps,
      user,
      addressSelected
    } = this.state;
    const {
      children
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NavBar_NavBar__WEBPACK_IMPORTED_MODULE_1__["default"], {
      gps: gps,
      user: user,
      addressSelected: addressSelected,
      searchCallback: this.props.searchCallback
    }), children);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Layout);

/***/ }),

/***/ "./hoc/Layout/NavBar/NavBar.js":
/*!*************************************!*\
  !*** ./hoc/Layout/NavBar/NavBar.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/AppBar */ "@material-ui/core/AppBar");
/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Toolbar */ "@material-ui/core/Toolbar");
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/IconButton */ "@material-ui/core/IconButton");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/MenuItem */ "@material-ui/core/MenuItem");
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Menu */ "@material-ui/core/Menu");
/* harmony import */ var _material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_icons_MoreVert__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/icons/MoreVert */ "@material-ui/icons/MoreVert");
/* harmony import */ var _material_ui_icons_MoreVert__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_MoreVert__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _utils_setAuthToken__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../utils/setAuthToken */ "./utils/setAuthToken.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _components_Avatar_UserAvatar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../components/Avatar/UserAvatar */ "./components/Avatar/UserAvatar.js");
/* harmony import */ var _components_SearchInput_SearchInput__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../components/SearchInput/SearchInput */ "./components/SearchInput/SearchInput.js");
/* harmony import */ var _NavBarStyle__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./NavBarStyle */ "./hoc/Layout/NavBar/NavBarStyle.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/core/Hidden */ "@material-ui/core/Hidden");
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! react-cookies */ "react-cookies");
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(react_cookies__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _components_LogIn_LogIn__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../components/LogIn/LogIn */ "./components/LogIn/LogIn.js");
/* harmony import */ var _components_Register_Register__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../components/Register/Register */ "./components/Register/Register.js");
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @material-ui/core/Dialog */ "@material-ui/core/Dialog");
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @material-ui/core/DialogContent */ "@material-ui/core/DialogContent");
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @material-ui/core/Slide */ "@material-ui/core/Slide");
/* harmony import */ var _material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ "@material-ui/core/DialogTitle");
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @material-ui/icons/Close */ "@material-ui/icons/Close");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_27__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






























var parse = __webpack_require__(/*! url-parse */ "url-parse");

const Transition = react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(function Transition(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_25___default.a, _extends({
    direction: "up",
    ref: ref
  }, props));
});
const DialogTitle = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__["withStyles"])(_NavBarStyle__WEBPACK_IMPORTED_MODULE_16__["default"])(props => {
  const {
    children,
    classes,
    onClose,
    ...other
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_26___default.a, _extends({
    disableTypography: true
  }, other), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
    variant: "h6"
  }, children), onClose ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_11___default.a, {
    href: '/'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4___default.a, {
    "aria-label": "close",
    className: classes.closeButton,
    onClick: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_27___default.a, {
    color: 'secondary'
  }))) : null);
});

class NavBar extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleProfileMenuOpen", event => {
      this.setState({
        anchorEl: event.currentTarget
      });
    });

    _defineProperty(this, "handleMenuClose", () => {
      this.setState({
        anchorEl: null
      });
      this.handleMobileMenuClose();
      this.handleAvatarMenuClose();
    });

    _defineProperty(this, "handleMobileMenuOpen", event => {
      this.setState({
        mobileMoreAnchorEl: event.currentTarget
      });
    });

    _defineProperty(this, "handleAvatarMenuOpen", event => {
      this.setState({
        avatarMoreAnchorEl: event.currentTarget
      });
    });

    _defineProperty(this, "handleAvatarMenuClose", event => {
      this.setState({
        avatarMoreAnchorEl: null
      });
    });

    _defineProperty(this, "handleMobileMenuClose", () => {
      this.setState({
        mobileMoreAnchorEl: null
      });
    });

    _defineProperty(this, "handleOpenLogin", e => {
      this.handleMenuClose();

      if (e.target.name === 'mobile') {
        this.setState({
          setOpenMobileLogin: true,
          setOpenMobileRegister: false
        });
      } else {
        this.setState({
          setOpenLogin: true,
          setOpenRegister: false
        });
      }
    });

    _defineProperty(this, "handleCloseLogin", () => {
      this.setState({
        setOpenLogin: false
      });
    });

    _defineProperty(this, "handleOpenRegister", e => {
      this.handleMenuClose();

      if (e.target.name === 'mobile') {
        this.setState({
          setOpenMobileRegister: true,
          setOpenMobileLogin: false
        });
      } else {
        this.setState({
          setOpenRegister: true,
          setOpenLogin: false
        });
      }
    });

    _defineProperty(this, "handleCloseRegister", () => {
      this.setState({
        setOpenRegister: false
      });
    });

    _defineProperty(this, "needRefresh", () => {
      this.setState({
        setOpenLogin: false
      });
      next_router__WEBPACK_IMPORTED_MODULE_13___default.a.push('/search');
    });

    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      avatarMoreAnchorEl: null,
      logged: false,
      hiddingPanel: true,
      isTop: true,
      isIndex: false,
      isSearch: false,
      setOpenLogin: false,
      setOpenMobileLogin: false,
      setOpenRegister: false,
      setOpenMobileRegister: false,
      user: null,
      google_id: props.google_id
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== "") {
      this.state.user = this.props.user;
    }
  }

  componentDidMount() {
    var query = parse(window.location.href, true).query;

    if (query.google_id || query.error) {
      this.setState({
        setOpenRegister: true,
        setOpenLogin: false
      });
    }

    const token = react_cookies__WEBPACK_IMPORTED_MODULE_20___default.a.load('token');

    if (token) {
      this.setState({
        logged: true
      });
      axios__WEBPACK_IMPORTED_MODULE_6___default.a.defaults.headers.common['Authorization'] = token;
    }

    if (next_router__WEBPACK_IMPORTED_MODULE_13___default.a.pathname === '/') {
      this.setState({
        hiddingPanel: false,
        isIndex: true
      });
    }

    if (next_router__WEBPACK_IMPORTED_MODULE_13___default.a.pathname === '/search') {
      this.setState({
        isSearch: true
      });
    }

    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 820;

      if (isTop !== this.state.isTop) {
        this.onScroll(isTop);
      }
    });
  }

  onScroll(isTop) {
    this.setState({
      isTop
    });
  }

  logout2() {
    react_cookies__WEBPACK_IMPORTED_MODULE_20___default.a.remove('token', {
      path: '/'
    });
    localStorage.removeItem('path'); // Remove auth header for future requests

    Object(_utils_setAuthToken__WEBPACK_IMPORTED_MODULE_12__["default"])(false);
    next_router__WEBPACK_IMPORTED_MODULE_13___default.a.push('/');
  }

  render() {
    const {
      mobileMoreAnchorEl,
      avatarMoreAnchorEl,
      hiddingPanel,
      logged,
      user
    } = this.state;
    const {
      classes
    } = this.props;

    const modalLogin = () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_LogIn_LogIn__WEBPACK_IMPORTED_MODULE_21__["default"], {
        callRegister: this.handleOpenRegister,
        login: this.needRefresh
      });
    };

    const modalRegister = () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Register_Register__WEBPACK_IMPORTED_MODULE_22__["default"], {
        callLogin: this.handleOpenLogin,
        closeLOgin: this.componentDidMount
      });
    };

    const logoutMobile = [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_11___default.a, {
      href: '/profile/editProfile'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default.a, {
      key: 1
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: classes.navbarLinkMobile
    }, "Profil")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_11___default.a, {
      href: '/account/notifications'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default.a, {
      key: 2
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: classes.navbarLinkMobile
    }, "Mon compte")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default.a, {
      key: 3,
      onClick: () => this.logout2()
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        color: "red"
      },
      className: classes.navbarLinkMobile
    }, "D\xE9connexion")))];
    const logoutAvatar = [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_11___default.a, {
      href: '/profile/editProfile'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default.a, {
      key: 1
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: classes.navbarLinkMobile
    }, "Profil")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_11___default.a, {
      href: '/account/notifications'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default.a, {
      key: 2
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: classes.navbarLinkMobile
    }, "Mon compte")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default.a, {
      key: 3,
      onClick: () => this.logout2()
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      style: {
        color: "red"
      },
      className: classes.navbarLinkMobile
    }, "D\xE9connexion")))];
    const doublemenuitem = [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default.a, {
      key: 1,
      onClick: this.handleOpenLogin
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: classes.navbarLinkMobile
    }, "Connexion")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_23___default.a, {
      scroll: 'paper',
      "aria-labelledby": "scroll-dialog-title",
      "aria-describedby": "scroll-dialog-description",
      className: classes.modal,
      open: this.state.setOpenMobileLogin,
      onClose: this.handleCloseLogin,
      TransitionComponent: Transition,
      name: 'mobile',
      fullWidth: true,
      fullScreen: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DialogTitle, {
      id: "customized-dialog-title",
      onClose: this.handleCloseLogin
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_24___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.paper
    }, modalLogin())))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default.a, {
      key: 2,
      onClick: this.handleOpenRegister
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: classes.navbarLinkMobile
    }, "Inscription")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_23___default.a, {
      scroll: 'paper',
      "aria-labelledby": "scroll-dialog-title",
      "aria-describedby": "scroll-dialog-description",
      className: classes.modal,
      name: 'mobile',
      open: this.state.setOpenMobileRegister,
      onClose: this.handleCloseRegister,
      TransitionComponent: Transition
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DialogTitle, {
      id: "customized-dialog-title",
      onClose: this.handleCloseRegister
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_24___default.a, {
      dividers: false,
      className: classes.dialogContentContainer,
      classes: {
        root: classes.muidialogContent
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.paper
    }, modalRegister()))))];
    const renderAvatarMenu = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_8___default.a, {
      anchorEl: avatarMoreAnchorEl,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      open: Boolean(avatarMoreAnchorEl),
      onClose: this.handleMenuClose
    }, logged ? logoutAvatar : doublemenuitem);
    const renderMobileMenu = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_8___default.a, {
      id: "simple-menu",
      anchorEl: mobileMoreAnchorEl,
      open: Boolean(mobileMoreAnchorEl),
      onClose: this.handleMenuClose,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_11___default.a, {
      href: user && user.is_alfred ? `/shop?id_alfred=${user._id}` : '/creaShop/creaShop'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: classes.navbarLinkMobile
    }, user && user.is_alfred ? "Ma boutique" : user ? "Proposer mes services" : "")))), logged ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_11___default.a, {
      href: '/reservations/allReservations'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default.a, {
      onClick: this.handleMobileMenuOpen
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: classes.navbarLinkMobile
    }, "Mes r\xE9servations")))) : null, logged ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_11___default.a, {
      href: '/reservations/messages'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: classes.navbarLinkMobile
    }, "Messages")))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_11___default.a, {
      href: '/faq'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: classes.navbarLinkMobile
    }, "Aide")))), logged ? logoutMobile : doublemenuitem);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, {
      className: classes.root
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2___default.a, {
      color: "inherit",
      className: this.state.isTop && this.state.isIndex ? classes.appBarTransparent : classes.appBar,
      position: "fixed"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_3___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, {
      className: classes.mainWrapper
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, {
      className: classes.leftContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_11___default.a, {
      href: '/'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: this.state.isTop && this.state.isIndex ? '../../../static/assets/img/logo.png' : '../../../static/blueLogo.png',
      className: classes.logoNavbar,
      alt: 'Logo Bleu'
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_19___default.a, {
      smUp: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, {
      className: classes.sectionMobile
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, {
      style: {
        border: '1px solid #e8ebeb',
        borderRadius: 5
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4___default.a, {
      "aria-haspopup": "true",
      onClick: this.handleMobileMenuOpen,
      color: "inherit",
      "aria-controls": "simple-menu"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_MoreVert__WEBPACK_IMPORTED_MODULE_10___default.a, {
      className: this.state.isTop && this.state.isIndex ? classes.iconWhite : classes.iconBlack
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: this.state.isTop && this.state.isIndex ? classes.textWhite : classes.textBlack
    }, "Menu"))))))), hiddingPanel ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, {
      className: this.state.isSearch ? classes.search : classes.searchHidden
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_SearchInput_SearchInput__WEBPACK_IMPORTED_MODULE_15__["default"], {
      searchCallback: this.props.searchCallback
    })) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_19___default.a, {
      xsDown: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, {
      className: classes.sectionMobile
    }, logged ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, {
      style: {
        border: '1px solid #e8ebeb',
        borderRadius: 5
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4___default.a, {
      "aria-haspopup": "true",
      onClick: this.handleMobileMenuOpen,
      color: "inherit"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_MoreVert__WEBPACK_IMPORTED_MODULE_10___default.a, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: this.state.isTop && this.state.isIndex ? classes.textWhite : classes.textBlack
    }, "Menu")))) : null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, {
      className: classes.rightContentNavBar
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, {
      className: classes.sectionDesktop
    }, user && user.is_alfred ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.navbarItem
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_11___default.a, {
      href: `/shop?id_alfred=${user._id}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: this.state.isTop && this.state.isIndex ? classes.textWhite : classes.navbarLink
    }, "Ma boutique"))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.navbarItem
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_11___default.a, {
      href: '/creaShop/creaShop'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: this.state.isTop && this.state.isIndex ? classes.textWhite : classes.navbarLink
    }, user && user.is_alfred == false ? `Proposer mes services` : ''))), logged ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.navbarItem
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_11___default.a, {
      href: '/reservations/allReservations'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: this.state.isTop && this.state.isIndex ? classes.textWhite : classes.navbarLink
    }, "Mes r\xE9servations")))) : null, logged ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.navbarItem
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_11___default.a, {
      href: '/reservations/messages'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: this.state.isTop && this.state.isIndex ? classes.textWhite : classes.navbarLink
    }, "Mes messages")))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.navbarItem
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_11___default.a, {
      href: '/faq'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: this.state.isTop && this.state.isIndex ? classes.textWhite : classes.navbarLink
    }, "Aide"))), logged ? null : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, {
      style: {
        marginRight: 20
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default.a, {
      color: "primary",
      onClick: this.handleOpenLogin
    }, "Connexion"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_23___default.a, {
      scroll: 'paper',
      "aria-labelledby": "scroll-dialog-title",
      "aria-describedby": "scroll-dialog-description",
      className: classes.modal,
      open: this.state.setOpenLogin,
      onClose: this.handleCloseLogin,
      TransitionComponent: Transition,
      classes: {
        paperWidthSm: classes.widthSm
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DialogTitle, {
      id: "customized-dialog-title",
      onClose: this.handleCloseLogin
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_24___default.a, {
      classes: {
        root: classes.widthLoginContent
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.paper
    }, modalLogin())))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default.a, {
      color: "primary",
      variant: "contained",
      onClick: this.handleOpenRegister,
      style: {
        color: 'white'
      }
    }, "Inscription"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_23___default.a, {
      scroll: 'paper',
      "aria-labelledby": "scroll-dialog-title",
      "aria-describedby": "scroll-dialog-description",
      className: classes.modal,
      open: this.state.setOpenRegister,
      onClose: this.handleCloseRegister,
      TransitionComponent: Transition
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DialogTitle, {
      id: "customized-dialog-title",
      onClose: this.handleCloseRegister
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_24___default.a, {
      dividers: false,
      className: classes.muidialogContent
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.paper
    }, modalRegister()))))), logged ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4___default.a, {
      "aria-haspopup": "true",
      onClick: this.handleAvatarMenuOpen,
      color: "inherit"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Avatar_UserAvatar__WEBPACK_IMPORTED_MODULE_14__["default"], {
      user: user,
      className: classes.bigAvatar,
      warnings: true
    })))) : null))))), renderMobileMenu, logged ? renderAvatarMenu : null);
  }

}

NavBar.propTypes = {
  classes: prop_types__WEBPACK_IMPORTED_MODULE_17___default.a.object.isRequired,
  theme: prop_types__WEBPACK_IMPORTED_MODULE_17___default.a.object.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__["withStyles"])(_NavBarStyle__WEBPACK_IMPORTED_MODULE_16__["default"])(NavBar));

/***/ }),

/***/ "./hoc/Layout/NavBar/NavBarStyle.js":
/*!******************************************!*\
  !*** ./hoc/Layout/NavBar/NavBarStyle.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  root: {
    width: '100%'
  },
  appBar: {
    boxShadow: 'inherit'
  },
  appBarTransparent: {
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  mainWrapper: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'start'
    }
  },
  logoNavbar: {
    width: 110,
    cursor: "pointer"
  },
  rightContentNavBar: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    [theme.breakpoints.only('sm')]: {
      width: 'auto'
    }
  },
  search: {
    marginLeft: 20,
    width: '70%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 0
    }
  },
  searchHidden: {
    marginLeft: 20,
    width: '70%',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: 20
    }
  },
  navbarItem: {
    alignSelf: 'center',
    color: 'black',
    marginRight: '20px',
    fontSize: '15px'
  },
  navbarLink: {
    textDecoration: 'none',
    color: '#545659'
  },
  bigAvatar: {
    width: 40,
    height: 40
  },
  buttonLogin: {
    marginRight: '20px',
    border: '1px solid rgba(255, 255, 255, 1)'
  },
  leftContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    [theme.breakpoints.between('sm', 'xl')]: {
      width: 'auto'
    }
  },
  textBlack: {
    color: 'black',
    margin: 0,
    fontSize: 'initial',
    [theme.breakpoints.down('xs')]: {
      color: 'black',
      textDecoration: 'none'
    }
  },
  textWhite: {
    color: 'white',
    margin: 0,
    fontSize: 'initial',
    textDecoration: 'none',
    [theme.breakpoints.down('xs')]: {
      color: 'white',
      textDecoration: 'none'
    }
  },
  navbarLinkMobile: {
    color: 'black',
    textDecoration: 'none'
  },
  iconWhite: {
    color: 'white'
  },
  iconBlack: {
    color: 'black'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiDialog-paper': {
      margin: '0px !important'
    }
  },
  modalWeb: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
    boxShadow: 'theme.shadows[5]',
    margin: '0px !important',
    padding: 0,
    width: '100%'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1)
  },
  dialogContentContainer: {
    '& .MuiDialogContent-dividers': {
      borderTop: 'inherit !important'
    }
  },
  muidialogContent: {
    padding: 0
  },
  widthLoginContent: {
    display: 'flex',
    justifyContent: 'center'
  },
  widthSm: {
    width: 400,
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  }
}));

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/json/stringify */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/json/stringify.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/create.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/create.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/create.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/define-property */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/define-property.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-prototype-of */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/get-prototype-of.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/set-prototype-of */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/set-prototype-of.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/symbol.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/symbol.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/symbol */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/symbol/index.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/symbol/iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/symbol/iterator.js");

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

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/json/stringify.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/json/stringify.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js");
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/create.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/create.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.create.js");
var $Object = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/define-property.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/define-property.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.define-property */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.define-property.js");
var $Object = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/get-prototype-of.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/get-prototype-of.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.get-prototype-of */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.get-prototype-of.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Object.getPrototypeOf;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/set-prototype-of.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/set-prototype-of.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.set-prototype-of */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.set-prototype-of.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Object.setPrototypeOf;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/symbol/index.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/symbol/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.symbol */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.symbol.js");
__webpack_require__(/*! ../../modules/es6.object.to-string */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.to-string.js");
__webpack_require__(/*! ../../modules/es7.symbol.async-iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.symbol.async-iterator.js");
__webpack_require__(/*! ../../modules/es7.symbol.observable */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.symbol.observable.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Symbol;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/symbol/iterator.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/symbol/iterator.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.string.iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.string.iterator.js");
__webpack_require__(/*! ../../modules/web.dom.iterable */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/web.dom.iterable.js");
module.exports = __webpack_require__(/*! ../../modules/_wks-ext */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-ext.js").f('iterator');


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_a-function.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_a-function.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_add-to-unscopables.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_add-to-unscopables.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_array-includes.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_array-includes.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_cof.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_cof.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ctx.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ctx.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_defined.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_defined.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_dom-create.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_dom-create.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
var document = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-bug-keys.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-bug-keys.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-keys.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-keys.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-pie.js");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ctx.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_property-desc.js");
module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_html.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_html.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ie8-dom-define.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ie8-dom-define.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js") && !__webpack_require__(/*! ./_fails */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iobject.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iobject.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-array.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-array.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_cof.js");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-create.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-create.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-create.js");
var descriptor = __webpack_require__(/*! ./_property-desc */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_property-desc.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js")(IteratorPrototype, __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-define.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-define.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_library.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_redefine.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iterators.js");
var $iterCreate = __webpack_require__(/*! ./_iter-create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-create.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gpo.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-step.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-step.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iterators.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iterators.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_library.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_library.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_meta.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_meta.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_uid.js")('meta');
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js");
var setDesc = __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-create.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-create.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var dPs = __webpack_require__(/*! ./_object-dps */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dps.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dps.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dps.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopd.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopd.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-pie.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_property-desc.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-primitive.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopn-ext.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopn-ext.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js");
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopn.js").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopn.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopn.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys-internal.js");
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-bug-keys.js").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gops.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gops.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gpo.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gpo.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-object.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys-internal.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys-internal.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-pie.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-pie.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-sap.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-sap.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_property-desc.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_property-desc.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_redefine.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_redefine.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_hide */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js");


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-proto.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-proto.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ctx.js")(Function.call, __webpack_require__(/*! ./_object-gopd */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopd.js").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-to-string-tag.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-to-string-tag.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js").f;
var has = __webpack_require__(/*! ./_has */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared-key.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared-key.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared.js")('keys');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_library.js") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-at.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-at.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-integer.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_defined.js");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-absolute-index.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-absolute-index.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-integer.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-integer.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iobject.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-length.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-length.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-object.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-object.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-primitive.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-primitive.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_uid.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_uid.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-define.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-define.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js");
var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_library.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-ext.js");
var defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-ext.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-ext.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js");


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared.js")('wks');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_uid.js");
var Symbol = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.array.iterator.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.array.iterator.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_add-to-unscopables.js");
var step = __webpack_require__(/*! ./_iter-step */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-step.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iterators.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-define.js")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.create.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.create.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(/*! ./_object-create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-create.js") });


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.define-property.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.define-property.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js"), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js").f });


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.get-prototype-of.js":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.get-prototype-of.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-object.js");
var $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gpo.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-sap.js")('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.set-prototype-of.js":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.set-prototype-of.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(/*! ./_set-proto */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-proto.js").set });


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.to-string.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.to-string.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.string.iterator.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.string.iterator.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-at.js")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-define.js")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.symbol.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.symbol.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_redefine.js");
var META = __webpack_require__(/*! ./_meta */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_meta.js").KEY;
var $fails = __webpack_require__(/*! ./_fails */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js");
var shared = __webpack_require__(/*! ./_shared */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-to-string-tag.js");
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_uid.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-ext.js");
var wksDefine = __webpack_require__(/*! ./_wks-define */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-define.js");
var enumKeys = __webpack_require__(/*! ./_enum-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-keys.js");
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-array.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-object.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-primitive.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_property-desc.js");
var _create = __webpack_require__(/*! ./_object-create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-create.js");
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopn-ext.js");
var $GOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopd.js");
var $GOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gops.js");
var $DP = __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js");
var $keys = __webpack_require__(/*! ./_object-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys.js");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopn.js").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-pie.js").f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_library.js")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.symbol.async-iterator.js":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.symbol.async-iterator.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-define.js")('asyncIterator');


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.symbol.observable.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.symbol.observable.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-define.js")('observable');


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/web.dom.iterable.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/web.dom.iterable.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./es6.array.iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.array.iterator.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iterators.js");
var TO_STRING_TAG = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


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

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hoc_Layout_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hoc/Layout/Layout */ "./hoc/Layout/Layout.js");
/* harmony import */ var _hoc_Layout_Footer_Footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hoc/Layout/Footer/Footer */ "./hoc/Layout/Footer/Footer.js");
/* harmony import */ var _components_home_SerenityNeed_SerenityNeed__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/home/SerenityNeed/SerenityNeed */ "./components/home/SerenityNeed/SerenityNeed.js");
/* harmony import */ var _components_home_profite_learn_profite_learn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/home/profite&learn/profite&learn */ "./components/home/profite&learn/profite&learn.js");
/* harmony import */ var _components_home_BecomeAlfred_BecomeAlfred__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/home/BecomeAlfred/BecomeAlfred */ "./components/home/BecomeAlfred/BecomeAlfred.js");
/* harmony import */ var _components_home_NearbyYou_NearbyYou__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/home/NearbyYou/NearbyYou */ "./components/home/NearbyYou/NearbyYou.js");
/* harmony import */ var _components_home_Homeheader_Homeheader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/home/Homeheader/Homeheader */ "./components/home/Homeheader/Homeheader.js");
/* harmony import */ var _components_home_feelingGood_feelingGood__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/home/feelingGood/feelingGood */ "./components/home/feelingGood/feelingGood.js");
/* harmony import */ var _components_home_Wellbeing_Wellbeing__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/home/Wellbeing/Wellbeing */ "./components/home/Wellbeing/Wellbeing.js");
/* harmony import */ var _components_home_proposeservice_Proposeservice__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/home/proposeservice/Proposeservice */ "./components/home/proposeservice/Proposeservice.js");
/* harmony import */ var _components_home_AssureBack_Assureback__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/home/AssureBack/Assureback */ "./components/home/AssureBack/Assureback.js");
/* harmony import */ var _components_home_section3__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/home/section3 */ "./components/home/section3.js");
/* harmony import */ var _components_home_section6__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/home/section6 */ "./components/home/section6.js");
/* harmony import */ var _components_home_section8__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../components/home/section8 */ "./components/home/section8.js");
/* harmony import */ var _components_home_Passions_passions__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../components/home/Passions/passions */ "./components/home/Passions/passions.js");
/* harmony import */ var _components_home_Facons_facons__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../components/home/Facons/facons */ "./components/home/Facons/facons.js");
/* harmony import */ var _components_home_Otter_otter__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../components/home/Otter/otter */ "./components/home/Otter/otter.js");
/* harmony import */ var _components_home_section10__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../components/home/section10 */ "./components/home/section10.js");
/* harmony import */ var _components_home_section12__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../components/home/section12 */ "./components/home/section12.js");
/* harmony import */ var _components_home_section15__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../components/home/section15 */ "./components/home/section15.js");
/* harmony import */ var _components_home_section16__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../components/home/section16 */ "./components/home/section16.js");
/* harmony import */ var _components_home_section18__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../components/home/section18 */ "./components/home/section18.js");
/* harmony import */ var _components_home_section19__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../components/home/section19 */ "./components/home/section19.js");
/* harmony import */ var _components_home_section21__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../components/home/section21 */ "./components/home/section21.js");
/* harmony import */ var _components_home_section22__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../components/home/section22 */ "./components/home/section22.js");
/* harmony import */ var _utils_setAuthToken__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../utils/setAuthToken */ "./utils/setAuthToken.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! react-helmet */ "react-helmet");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! react-cookies */ "react-cookies");
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(react_cookies__WEBPACK_IMPORTED_MODULE_30__);
































class Home extends react__WEBPACK_IMPORTED_MODULE_1___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    localStorage.setItem('path', next_router__WEBPACK_IMPORTED_MODULE_28___default.a.pathname);
    const token = react_cookies__WEBPACK_IMPORTED_MODULE_30___default.a.load('token');
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("/myAlfred/api/touch/");

    if (token) {
      next_router__WEBPACK_IMPORTED_MODULE_28___default.a.push('/search');
    }
  }

  logout() {
    react_cookies__WEBPACK_IMPORTED_MODULE_30___default.a.remove('token', {
      path: '/'
    }); // Remove auth header for future requests

    Object(_utils_setAuthToken__WEBPACK_IMPORTED_MODULE_27__["default"])(false);
    window.location.reload();
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_29__["Helmet"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("title", null, "Services r\xE9mun\xE9r\xE9s entre particuliers - My Alfred "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("meta", {
      property: "description",
      content: "Des milliers de services r\xE9f\xE9renc\xE9s ! Consultez les offres de service r\xE9mun\xE9r\xE9s de milliers de particuliers avec My Alfred, premi\xE8re application d\u2019offres de services entre particuliers. Rendre service en \xE9tant r\xE9mun\xE9r\xE9 autour de chez soi n\u2019a jamais \xE9t\xE9 aussi simple"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_hoc_Layout_Layout__WEBPACK_IMPORTED_MODULE_2__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_Homeheader_Homeheader__WEBPACK_IMPORTED_MODULE_8__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_SerenityNeed_SerenityNeed__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_BecomeAlfred_BecomeAlfred__WEBPACK_IMPORTED_MODULE_6__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_section3__WEBPACK_IMPORTED_MODULE_13__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_NearbyYou_NearbyYou__WEBPACK_IMPORTED_MODULE_7__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_profite_learn_profite_learn__WEBPACK_IMPORTED_MODULE_5__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_section6__WEBPACK_IMPORTED_MODULE_14__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_Wellbeing_Wellbeing__WEBPACK_IMPORTED_MODULE_10__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_section8__WEBPACK_IMPORTED_MODULE_15__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_feelingGood_feelingGood__WEBPACK_IMPORTED_MODULE_9__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_section10__WEBPACK_IMPORTED_MODULE_19__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_proposeservice_Proposeservice__WEBPACK_IMPORTED_MODULE_11__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_section12__WEBPACK_IMPORTED_MODULE_20__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_NearbyYou_NearbyYou__WEBPACK_IMPORTED_MODULE_7__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_Passions_passions__WEBPACK_IMPORTED_MODULE_16__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_section15__WEBPACK_IMPORTED_MODULE_21__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_section16__WEBPACK_IMPORTED_MODULE_22__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_Facons_facons__WEBPACK_IMPORTED_MODULE_17__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_section18__WEBPACK_IMPORTED_MODULE_23__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_section19__WEBPACK_IMPORTED_MODULE_24__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_Otter_otter__WEBPACK_IMPORTED_MODULE_18__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_section21__WEBPACK_IMPORTED_MODULE_25__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_section22__WEBPACK_IMPORTED_MODULE_26__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_home_AssureBack_Assureback__WEBPACK_IMPORTED_MODULE_12__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_hoc_Layout_Footer_Footer__WEBPACK_IMPORTED_MODULE_3__["default"], null));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ }),

/***/ "./server/validation/is-empty.js":
/*!***************************************!*\
  !*** ./server/validation/is-empty.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const isEmpty = value => value === undefined || value === null || value === '' || value.length === 0 || typeof value === 'object' && Object.keys(value).length === 0 || typeof value === 'string' && value.trim().length === 0;

module.exports = isEmpty;

/***/ }),

/***/ "./utils/functions.js":
/*!****************************!*\
  !*** ./utils/functions.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getDistance = _interopRequireDefault(__webpack_require__(/*! geolib/es/getDistance */ "geolib/es/getDistance"));

var _convertDistance = _interopRequireDefault(__webpack_require__(/*! geolib/es/convertDistance */ "geolib/es/convertDistance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isEmpty = __webpack_require__(/*! ../server/validation/is-empty */ "./server/validation/is-empty.js");

const moment = __webpack_require__(/*! moment */ "moment");

const computeDistanceKm = (latlon1, latlon2) => {
  if (isEmpty(latlon1) || isEmpty(latlon2)) {
    return null;
  }

  if (isEmpty(latlon1.lat) || isEmpty(latlon1.lng)) {
    return null;
  }

  if (isEmpty(latlon2.lat) || isEmpty(latlon2.lng)) {
    return null;
  }

  try {
    return (0, _convertDistance.default)((0, _getDistance.default)({
      latitude: latlon1.lat,
      longitude: latlon1.lng
    }, {
      latitude: latlon2.lat,
      longitude: latlon2.lng
    }), "km");
  } catch (error) {
    console.log("Error:" + error);
    return null;
  }
};

const computeBookingReference = (user, alfred) => {
  var reference = user.avatar_letters + alfred.avatar_letters + "_" + moment().format('DDMMYYYY');
  return reference;
};

const computeAverageNotes = notes => {
  var res = {};

  if (isEmpty(notes)) {
    return res;
  }

  Object.keys(notes[0]).forEach(k => {
    const value = notes.reduce((prev, next) => prev + next[k], 0) / notes.length;
    res[k] = value;
  });
  return res;
};

const computeSumSkills = skills => {
  var res = {};

  if (isEmpty(skills)) {
    return res;
  }

  Object.keys(skills[0]).forEach(k => {
    const value = skills.reduce((prev, next) => prev + next[k], 0);
    res[k] = value;
  });
  return res;
};

module.exports = {
  computeDistanceKm,
  computeBookingReference,
  computeAverageNotes,
  computeSumSkills
};

/***/ }),

/***/ "./utils/passwords.js":
/*!****************************!*\
  !*** ./utils/passwords.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const checkPasswordFormat = pass => pass.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

const arePasswordsEquals = (pass1, pass2) => pass1 === pass2;

const checkPass1 = pass => {
  if (pass === "") {
    return {
      check: false
    };
  } else if (checkPasswordFormat(pass)) {
    return {
      check: true
    };
  }

  return {
    error: "8 caractères minimum dont une majuscule, une minuscule et un chiffre",
    check: false
  };
};

const checkPass2 = (pass1, pass2) => {
  if (pass2 === "") {
    return {
      check: false
    };
  } else if (arePasswordsEquals(pass1, pass2)) {
    return {
      check: true
    };
  }

  return {
    error: "Les mots de passe saisis sont différents",
    check: false
  };
};

module.exports = {
  checkPass1,
  checkPass2
};

/***/ }),

/***/ "./utils/setAuthToken.js":
/*!*******************************!*\
  !*** ./utils/setAuthToken.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);


const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.headers.common['Authorization'];
  }
};

/* harmony default export */ __webpack_exports__["default"] = (setAuthToken);

/***/ }),

/***/ "./utils/sms.js":
/*!**********************!*\
  !*** ./utils/sms.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class RegExpParam extends RegExp {
  constructor(reg, repl) {
    super(reg);
    this.repl = repl;
  }

  [Symbol.replace](str) {
    return RegExp.prototype[Symbol.replace].call(this, str, this.repl);
  }

}

const fillSms = (pattern, values) => {
  const r = RegExp("{{\\s*params.([^\\s]+)\\s*}}");

  while (found = r.exec(pattern)) {
    const param = found[1];

    if (values[param] == undefined) {
      console.error(`Missing param ${param}`);
      return null;
    }

    pattern = pattern.replace(new RegExpParam(`{{\\s*params.${param}\\s*}}`, values[param]));
  }

  return pattern;
};

const isPhoneOk = value => {
  if (!value) return false;
  if (value.length == 10 && value.startsWith('0')) return true;
  if (value.length == 11 && value.startsWith('33')) return true;
  return false;
};

module.exports = {
  fillSms,
  isPhoneOk
};

/***/ }),

/***/ 3:
/*!******************************!*\
  !*** multi ./pages/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Edwin\Documents\MyAlfredPro\pages\index.js */"./pages/index.js");


/***/ }),

/***/ "@material-ui/core":
/*!************************************!*\
  !*** external "@material-ui/core" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core");

/***/ }),

/***/ "@material-ui/core/AppBar":
/*!*******************************************!*\
  !*** external "@material-ui/core/AppBar" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/AppBar");

/***/ }),

/***/ "@material-ui/core/Avatar":
/*!*******************************************!*\
  !*** external "@material-ui/core/Avatar" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Avatar");

/***/ }),

/***/ "@material-ui/core/Badge":
/*!******************************************!*\
  !*** external "@material-ui/core/Badge" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Badge");

/***/ }),

/***/ "@material-ui/core/Box":
/*!****************************************!*\
  !*** external "@material-ui/core/Box" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Box");

/***/ }),

/***/ "@material-ui/core/Button":
/*!*******************************************!*\
  !*** external "@material-ui/core/Button" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Button");

/***/ }),

/***/ "@material-ui/core/Card":
/*!*****************************************!*\
  !*** external "@material-ui/core/Card" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Card");

/***/ }),

/***/ "@material-ui/core/CardActionArea":
/*!***************************************************!*\
  !*** external "@material-ui/core/CardActionArea" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardActionArea");

/***/ }),

/***/ "@material-ui/core/CardActions":
/*!************************************************!*\
  !*** external "@material-ui/core/CardActions" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardActions");

/***/ }),

/***/ "@material-ui/core/CardContent":
/*!************************************************!*\
  !*** external "@material-ui/core/CardContent" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardContent");

/***/ }),

/***/ "@material-ui/core/CardMedia":
/*!**********************************************!*\
  !*** external "@material-ui/core/CardMedia" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardMedia");

/***/ }),

/***/ "@material-ui/core/Checkbox":
/*!*********************************************!*\
  !*** external "@material-ui/core/Checkbox" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Checkbox");

/***/ }),

/***/ "@material-ui/core/Chip":
/*!*****************************************!*\
  !*** external "@material-ui/core/Chip" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Chip");

/***/ }),

/***/ "@material-ui/core/Dialog":
/*!*******************************************!*\
  !*** external "@material-ui/core/Dialog" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Dialog");

/***/ }),

/***/ "@material-ui/core/DialogActions":
/*!**************************************************!*\
  !*** external "@material-ui/core/DialogActions" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/DialogActions");

/***/ }),

/***/ "@material-ui/core/DialogContent":
/*!**************************************************!*\
  !*** external "@material-ui/core/DialogContent" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/DialogContent");

/***/ }),

/***/ "@material-ui/core/DialogContentText":
/*!******************************************************!*\
  !*** external "@material-ui/core/DialogContentText" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/DialogContentText");

/***/ }),

/***/ "@material-ui/core/DialogTitle":
/*!************************************************!*\
  !*** external "@material-ui/core/DialogTitle" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/DialogTitle");

/***/ }),

/***/ "@material-ui/core/Divider":
/*!********************************************!*\
  !*** external "@material-ui/core/Divider" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Divider");

/***/ }),

/***/ "@material-ui/core/ExpansionPanel":
/*!***************************************************!*\
  !*** external "@material-ui/core/ExpansionPanel" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/ExpansionPanel");

/***/ }),

/***/ "@material-ui/core/ExpansionPanelDetails":
/*!**********************************************************!*\
  !*** external "@material-ui/core/ExpansionPanelDetails" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/ExpansionPanelDetails");

/***/ }),

/***/ "@material-ui/core/ExpansionPanelSummary":
/*!**********************************************************!*\
  !*** external "@material-ui/core/ExpansionPanelSummary" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/ExpansionPanelSummary");

/***/ }),

/***/ "@material-ui/core/Fab":
/*!****************************************!*\
  !*** external "@material-ui/core/Fab" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Fab");

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

/***/ "@material-ui/core/List":
/*!*****************************************!*\
  !*** external "@material-ui/core/List" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/List");

/***/ }),

/***/ "@material-ui/core/ListItem":
/*!*********************************************!*\
  !*** external "@material-ui/core/ListItem" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/ListItem");

/***/ }),

/***/ "@material-ui/core/ListItemIcon":
/*!*************************************************!*\
  !*** external "@material-ui/core/ListItemIcon" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/ListItemIcon");

/***/ }),

/***/ "@material-ui/core/ListItemText":
/*!*************************************************!*\
  !*** external "@material-ui/core/ListItemText" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/ListItemText");

/***/ }),

/***/ "@material-ui/core/Menu":
/*!*****************************************!*\
  !*** external "@material-ui/core/Menu" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Menu");

/***/ }),

/***/ "@material-ui/core/MenuItem":
/*!*********************************************!*\
  !*** external "@material-ui/core/MenuItem" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/MenuItem");

/***/ }),

/***/ "@material-ui/core/MobileStepper":
/*!**************************************************!*\
  !*** external "@material-ui/core/MobileStepper" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/MobileStepper");

/***/ }),

/***/ "@material-ui/core/Paper":
/*!******************************************!*\
  !*** external "@material-ui/core/Paper" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Paper");

/***/ }),

/***/ "@material-ui/core/Popover":
/*!********************************************!*\
  !*** external "@material-ui/core/Popover" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Popover");

/***/ }),

/***/ "@material-ui/core/Slide":
/*!******************************************!*\
  !*** external "@material-ui/core/Slide" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Slide");

/***/ }),

/***/ "@material-ui/core/TextField":
/*!**********************************************!*\
  !*** external "@material-ui/core/TextField" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/TextField");

/***/ }),

/***/ "@material-ui/core/Toolbar":
/*!********************************************!*\
  !*** external "@material-ui/core/Toolbar" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Toolbar");

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

/***/ "@material-ui/icons":
/*!*************************************!*\
  !*** external "@material-ui/icons" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons");

/***/ }),

/***/ "@material-ui/icons/Close":
/*!*******************************************!*\
  !*** external "@material-ui/icons/Close" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Close");

/***/ }),

/***/ "@material-ui/icons/DeleteForever":
/*!***************************************************!*\
  !*** external "@material-ui/icons/DeleteForever" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/DeleteForever");

/***/ }),

/***/ "@material-ui/icons/Edit":
/*!******************************************!*\
  !*** external "@material-ui/icons/Edit" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Edit");

/***/ }),

/***/ "@material-ui/icons/ExpandMore":
/*!************************************************!*\
  !*** external "@material-ui/icons/ExpandMore" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/ExpandMore");

/***/ }),

/***/ "@material-ui/icons/KeyboardArrowLeft":
/*!*******************************************************!*\
  !*** external "@material-ui/icons/KeyboardArrowLeft" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/KeyboardArrowLeft");

/***/ }),

/***/ "@material-ui/icons/KeyboardArrowRight":
/*!********************************************************!*\
  !*** external "@material-ui/icons/KeyboardArrowRight" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/KeyboardArrowRight");

/***/ }),

/***/ "@material-ui/icons/LockOpenOutlined":
/*!******************************************************!*\
  !*** external "@material-ui/icons/LockOpenOutlined" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/LockOpenOutlined");

/***/ }),

/***/ "@material-ui/icons/LockOutlined":
/*!**************************************************!*\
  !*** external "@material-ui/icons/LockOutlined" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/LockOutlined");

/***/ }),

/***/ "@material-ui/icons/MailOutline":
/*!*************************************************!*\
  !*** external "@material-ui/icons/MailOutline" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/MailOutline");

/***/ }),

/***/ "@material-ui/icons/MoreVert":
/*!**********************************************!*\
  !*** external "@material-ui/icons/MoreVert" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/MoreVert");

/***/ }),

/***/ "@material-ui/icons/PersonOutline":
/*!***************************************************!*\
  !*** external "@material-ui/icons/PersonOutline" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/PersonOutline");

/***/ }),

/***/ "@material-ui/icons/PhoneIphoneOutlined":
/*!*********************************************************!*\
  !*** external "@material-ui/icons/PhoneIphoneOutlined" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/PhoneIphoneOutlined");

/***/ }),

/***/ "@material-ui/icons/PhotoCamera":
/*!*************************************************!*\
  !*** external "@material-ui/icons/PhotoCamera" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/PhotoCamera");

/***/ }),

/***/ "@material-ui/icons/Room":
/*!******************************************!*\
  !*** external "@material-ui/icons/Room" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Room");

/***/ }),

/***/ "@material-ui/icons/Search":
/*!********************************************!*\
  !*** external "@material-ui/icons/Search" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Search");

/***/ }),

/***/ "@material-ui/lab/Rating":
/*!******************************************!*\
  !*** external "@material-ui/lab/Rating" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/lab/Rating");

/***/ }),

/***/ "algolia-places-react":
/*!***************************************!*\
  !*** external "algolia-places-react" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("algolia-places-react");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "date-fns/locale/fr":
/*!*************************************!*\
  !*** external "date-fns/locale/fr" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("date-fns/locale/fr");

/***/ }),

/***/ "geolib/es/convertDistance":
/*!********************************************!*\
  !*** external "geolib/es/convertDistance" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("geolib/es/convertDistance");

/***/ }),

/***/ "geolib/es/getDistance":
/*!****************************************!*\
  !*** external "geolib/es/getDistance" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("geolib/es/getDistance");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

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

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-cookies":
/*!********************************!*\
  !*** external "react-cookies" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-cookies");

/***/ }),

/***/ "react-datepicker":
/*!***********************************!*\
  !*** external "react-datepicker" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-datepicker");

/***/ }),

/***/ "react-helmet":
/*!*******************************!*\
  !*** external "react-helmet" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),

/***/ "react-number-format":
/*!**************************************!*\
  !*** external "react-number-format" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-number-format");

/***/ }),

/***/ "react-social-login-buttons":
/*!*********************************************!*\
  !*** external "react-social-login-buttons" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-social-login-buttons");

/***/ }),

/***/ "react-toastify":
/*!*********************************!*\
  !*** external "react-toastify" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-toastify");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "url-parse":
/*!****************************!*\
  !*** external "url-parse" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url-parse");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map