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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/ButtonSwitch/ButtonSwitch.js":
/*!*************************************************!*\
  !*** ./components/ButtonSwitch/ButtonSwitch.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Switch */ "@material-ui/core/Switch");
/* harmony import */ var _material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/InputAdornment */ "@material-ui/core/InputAdornment");
/* harmony import */ var _material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Select */ "@material-ui/core/Select");
/* harmony import */ var _material_ui_core_Select__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/MenuItem */ "@material-ui/core/MenuItem");
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/TextField */ "@material-ui/core/TextField");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ButtonSwitchStyle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ButtonSwitchStyle */ "./components/ButtonSwitch/ButtonSwitchStyle.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }












const {
  inspect
} = __webpack_require__(/*! util */ "util");

const IOSSwitch = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["withStyles"])(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1)
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: '#47bdd7',
      '& + $track': {
        backgroundColor: 'white'
      }
    },
    '&$focusVisible $thumb': {
      color: 'white',
      border: '6px solid #fff'
    }
  },
  thumb: {
    width: 24,
    height: 24
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border'])
  },
  checked: {},
  focusVisible: {}
}))(({
  classes,
  ...props
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_2___default.a, _extends({
    focusVisibleClassName: classes.focusVisible,
    disableRipple: true,
    classes: {
      root: classes.root,
      switchBase: classes.switchBase,
      thumb: classes.thumb,
      track: classes.track,
      checked: classes.checked
    }
  }, props));
});
const CssTextField = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["withStyles"])({
  root: {
    '& label': {
      fontSize: '0.8rem'
    }
  }
})(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_7___default.a);

class ButtonSwitch extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked,
      billing: props.billing ? props.billing._id : props.isOption ? this.props.billings[0]._id : null,
      price: this.props.price,
      label: this.props.label
    };
    this.onToggle = this.onToggle.bind(this);
    this.onChangeBilling = this.onChangeBilling.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeLabel = this.onChangeLabel.bind(this);
    this.fireChange = this.fireChange.bind(this);
  }

  fireChange(id, checked, price, billing, label) {
    if (this.props.onChange) {
      this.props.onChange(this.props.id, this.state.checked, this.state.checked ? this.state.price : null, this.state.billing, this.state.label);
    }
  }

  onToggle(value) {
    this.setState({
      checked: !this.state.checked
    }, () => this.fireChange());
  }

  onChangeBilling(event, index) {
    this.setState({
      billing: event.target.value
    }, () => this.fireChange());
  }

  onChangePrice(event) {
    var price = parseInt(event.target.value);

    if (isNaN(price)) {
      price = null;
    }

    this.setState({
      price: price
    }, () => this.fireChange());
  }

  onChangeLabel(event) {
    this.setState({
      label: event.target.value
    }, () => this.fireChange());
  }

  render() {
    const {
      classes,
      isEditable,
      isOption,
      isPrice,
      billings,
      priceDisabled
    } = this.props;
    var {
      label,
      checked
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      className: classes.contentFiltre
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      className: classes.responsiveIOSswitch,
      style: {
        width: this.props.width
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(IOSSwitch, {
      color: "primary",
      type: "checkbox",
      checked: checked,
      onChange: this.onToggle
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, isEditable ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CssTextField, {
      label: 'Intitulé',
      placeholder: 'Saisissez un intitulé',
      value: this.state.label,
      onChange: this.onChangeLabel,
      error: !this.state.label,
      helperText: this.state.label ? null : 'Obligatoire'
    }) : label === undefined ? 'label introuvable' : label))), isPrice ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      className: classes.responsiveIOSswitchContent
    }, checked === true ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      style: {
        display: 'flex'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CssTextField, {
      value: this.state.price,
      label: 'Tarif',
      type: "number",
      className: classes.textField,
      disabled: !checked || priceDisabled,
      onChange: this.onChangePrice,
      InputProps: {
        inputProps: {
          min: 0
        },
        endAdornment: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_4___default.a, {
          position: "start"
        }, "\u20AC")
      },
      error: !this.state.price,
      helperText: this.state.price ? null : 'Obligatoire'
    }), isOption ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        width: '100px',
        fontSize: '0.8rem'
      },
      disabled: !checked,
      margin: "none",
      onChange: this.onChangeBilling,
      value: this.state.billing
    }, billings.map(bill => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_6___default.a, {
        value: bill._id.toString()
      }, bill.label);
    })) : null) : null) : null);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["withStyles"])(_ButtonSwitchStyle__WEBPACK_IMPORTED_MODULE_9__["default"])(ButtonSwitch));

/***/ }),

/***/ "./components/ButtonSwitch/ButtonSwitchStyle.js":
/*!******************************************************!*\
  !*** ./components/ButtonSwitch/ButtonSwitchStyle.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  contentFiltre: {
    display: 'flex',
    alignItems: 'flex-end',
    height: 50,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 'auto',
      alignItems: 'flex-start',
      flexDirection: 'column'
    }
  },
  responsiveIOSswitch: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  responsiveIOSswitchContent: {
    display: 'flex',
    width: '50%',
    alignItems: 'flex-end',
    justifyContent: 'end',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      justifyContent: 'start'
    }
  },
  textField: {
    width: '70px',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

/***/ }),

/***/ "./components/CreaShop/AssetsService/AssetsService.js":
/*!************************************************************!*\
  !*** ./components/CreaShop/AssetsService/AssetsService.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _componentStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../componentStyle */ "./components/CreaShop/componentStyle.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/TextField */ "@material-ui/core/TextField");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/MenuItem */ "@material-ui/core/MenuItem");
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/icons/ExpandMore */ "@material-ui/icons/ExpandMore");
/* harmony import */ var _material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _server_validation_is_empty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../server/validation/is-empty */ "./server/validation/is-empty.js");
/* harmony import */ var _server_validation_is_empty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_server_validation_is_empty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_icons_CheckCircle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/icons/CheckCircle */ "@material-ui/icons/CheckCircle");
/* harmony import */ var _material_ui_icons_CheckCircle__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_CheckCircle__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_icons_DeleteForever__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/DeleteForever */ "@material-ui/icons/DeleteForever");
/* harmony import */ var _material_ui_icons_DeleteForever__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_DeleteForever__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/IconButton */ "@material-ui/core/IconButton");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_12__);









const {
  Accordion,
  AccordionSummary,
  AccordionDetails
} = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");







class AssetsService extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
      description: props.data.description,
      diplomaYear: props.data.diplomaYear,
      diplomaName: props.data.diplomaName,
      diplomaPicture: props.data.diplomaPicture,
      certificationYear: props.data.certificationYear,
      certificationName: props.data.certificationName,
      certificationPicture: props.data.certificationPicture,
      level: props.data.level
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let dates = [null];
    const currentDate = new Date().getFullYear();

    for (let i = currentDate; i >= 1950; i--) {
      dates.push(i);
    }

    this.setState({
      dates: dates
    });
  }

  handleChange(key, value) {
    var stat = {
      [key]: value
    };

    if (key == 'diplomaName' && _server_validation_is_empty__WEBPACK_IMPORTED_MODULE_9___default()(value)) {
      stat['diplomaYear'] = null;
    }

    if (key == 'certificationName' && _server_validation_is_empty__WEBPACK_IMPORTED_MODULE_9___default()(value)) {
      stat['certificationYear'] = null;
    }

    this.setState(stat, () => this.props.onChange(this.state));
  }

  render() {
    const {
      classes
    } = this.props;
    const {
      dates
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.mainContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentLeftTop
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentTitle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.policySizeTitle
    }, "Vos atouts pour ce service ! ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        width: '80%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.policySizeSubtitle
    }, "D\xE9crivez votre expertise ! (facultatif)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.policySizeContent
    }, "Mettez en \xE9vidence vos comp\xE9tences et votre expertise dans ce service. Vous pouvez \xE9galement donner des pr\xE9cisions sur vos prestations. Par exemple, si vous proposez un service de confection de tapis, vous pouvez indiquer les heures n\xE9cessaires pour diff\xE9rentes dimension de tapis. Pr\xE9cisez tout ce qui peut aider votre client \xE0 r\xE9server correctement votre service !")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_6___default.a, {
      id: "outlined-basic",
      className: classes.describExperience,
      label: "Votre expertise",
      margin: "normal",
      variant: "outlined",
      value: this.state.description,
      onChange: e => this.handleChange('description', e.target.value),
      multiline: true,
      rows: "4"
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        width: '80%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.policySizeContent
    }, "Pr\xE9cisez le nombre d\u2019ann\xE9es d\u2019exp\xE9rience dont vous disposez sur ce service. Si vous poss\xE9dez des certifications et/ou dipl\xF4mes pour ce service, mettez-les en avant ! Apr\xE8s v\xE9rification par My-Alfred, vous aurez le statut d\u2019Alfred exp\xE9riment\xE9/certifi\xE9 et/ou dipl\xF4m\xE9 sur ce service.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginBottom: 150
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.policySizeSubtitle
    }, "Nombre d'ann\xE9es d'exp\xE9rience")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_6___default.a, {
      select: true,
      value: this.state.level,
      className: classes.inputDiplomaCertifResp,
      variant: "outlined",
      onChange: e => this.handleChange('level', e.target.value)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default.a, {
      value: "0"
    }, "..."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default.a, {
      value: "1"
    }, "Entre 0 et 1 an"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default.a, {
      value: "2"
    }, "Entre 1 et 5 ans"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default.a, {
      value: "3"
    }, "Entre 5 et 10 ans"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default.a, {
      value: "4"
    }, "Plus de 10 ans"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.policySizeSubtitle
    }, "Votre dipl\xF4me"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Accordion, {
      defaultExpanded: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AccordionSummary, {
      expandIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_8___default.a, null)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, null, "Ajouter / modifier votre dipl\xF4me")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AccordionDetails, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_6___default.a, {
      value: this.state.diplomaName,
      className: classes.inputDiplomaCertifResp,
      label: "Nom du dipl\xF4me",
      margin: "dense",
      variant: "outlined",
      onChange: e => this.handleChange('diplomaName', e.target.value)
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_6___default.a, {
      value: this.state.diplomaYear,
      className: classes.inputDiplomaCertifResp,
      label: "Ann\xE9e d'obtention",
      margin: "dense",
      variant: "outlined",
      select: true,
      onChange: e => this.handleChange('diplomaYear', e.target.value)
    }, this.state.dates.map(date => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default.a, {
        key: date,
        style: {
          zIndex: 9999
        },
        value: date
      }, date);
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        display: 'flex',
        alignItems: 'baseline'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      style: {
        display: 'inline-block',
        marginTop: 10
      },
      className: "forminputs"
    }, "Joindre un dipl\xF4me", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      id: "file",
      style: {
        width: '0.1px',
        height: '0.1px',
        opacity: 0,
        overflow: 'hidden'
      },
      name: "diploma",
      type: "file",
      className: "form-control",
      onChange: e => this.handleChange('diplomaPicture', e.target.files[0])
    })), this.state.diplomaPicture !== null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        display: 'flex',
        alignItems: 'center'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, null, typeof this.state.diplomaPicture == 'string' ? 'Diplôme déjà joint' : this.state.diplomaPicture.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_CheckCircle__WEBPACK_IMPORTED_MODULE_10___default.a, {
      color: 'primary',
      style: {
        marginLeft: 10
      }
    }), false ? /*#__PURE__*/undefined : null) : null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, null, "En te\u0301le\u0301chargeant votre diplo\u0302me, votre diplo\u0302me aura le statut de diplo\u0302me ve\u0301rifie\u0301 aupre\u0300s des utilisateurs mais il ne sera jamais visible par ces derniers")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12,
      style: {
        height: 500
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.policySizeSubtitle
    }, "Votre certification"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Accordion, {
      defaultExpanded: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AccordionSummary, {
      expandIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_8___default.a, null)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, null, "Ajouter / modifier votre certification")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AccordionDetails, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_6___default.a, {
      value: this.state.certificationName,
      className: classes.inputDiplomaCertifResp,
      label: "Nom du certificat",
      margin: "dense",
      variant: "outlined",
      onChange: e => this.handleChange('certificationName', e.target.value)
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_6___default.a, {
      value: this.state.certificationYear,
      className: classes.inputDiplomaCertifResp,
      label: "Ann\xE9e d'obtention",
      margin: "dense",
      variant: "outlined",
      select: true,
      onChange: e => this.handleChange('certificationYear', e.target.value)
    }, dates.map(date => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default.a, {
        key: date,
        value: date
      }, date);
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        display: 'flex',
        alignItems: 'baseline'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      style: {
        display: 'inline-block',
        marginTop: 15
      },
      className: "forminputs"
    }, "Joindre une certification", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      id: "file",
      style: {
        width: '0.1px',
        height: '0.1px',
        opacity: 0,
        overflow: 'hidden'
      },
      name: "certifaction",
      type: "file",
      className: "form-control",
      onChange: e => this.handleChange('certificationPicture', e.target.files[0])
    })), this.state.certificationPicture !== null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        display: 'flex',
        alignItems: 'center'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, null, typeof this.state.certificationPicture == 'string' ? 'Certification déjà jointe' : this.state.certificationPicture.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_CheckCircle__WEBPACK_IMPORTED_MODULE_10___default.a, {
      color: 'primary',
      style: {
        marginLeft: 10
      }
    }), false ? /*#__PURE__*/undefined : null) : null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, null, "En te\u0301le\u0301chargeant votre certification, votre certification aura le statut de certification ve\u0301rifie\u0301e aupre\u0300s des utilisateurs mais elle ne sera jamais visible par ces derniers"))))))))))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__["withStyles"])(_componentStyle__WEBPACK_IMPORTED_MODULE_2__["default"])(AssetsService));

/***/ }),

/***/ "./components/CreaShop/BookingConditions/BookingConditions.js":
/*!********************************************************************!*\
  !*** ./components/CreaShop/BookingConditions/BookingConditions.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _componentStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../componentStyle */ "./components/CreaShop/componentStyle.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../ButtonSwitch/ButtonSwitch */ "./components/ButtonSwitch/ButtonSwitch.js");
/* harmony import */ var _utils_consts_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../utils/consts.js */ "./utils/consts.js");
/* harmony import */ var _utils_consts_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_utils_consts_js__WEBPACK_IMPORTED_MODULE_7__);









class BookingConditions extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      booking_request: this.props.booking_request,
      my_alfred_conditions: this.props.conditions // BASIC/PICTURE/ID_CARD/RECOMMEND

    };
    this.onAlfredConditionsChanged = this.onAlfredConditionsChanged.bind(this);
    this.onBookingChanged = this.onBookingChanged.bind(this);
    this.booking_request = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.booking_auto = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.conditions = {};
    Object.values(_utils_consts_js__WEBPACK_IMPORTED_MODULE_7__["ALF_CONDS"]).forEach(k => this.conditions[k] = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef());
  }

  onBookingChanged(id, checked) {
    let req = id === 'request' && checked || id === 'auto' && !checked;
    this.setState({
      booking_request: req
    }, () => this.props.onChange(this.state.booking_request, this.state.my_alfred_conditions));
    this.booking_request.current.setState({
      checked: req
    });
    this.booking_auto.current.setState({
      checked: !req
    });
  }

  onAlfredConditionsChanged(id, checked) {
    let value = checked ? id : Math.max(id - 1, 0);
    this.setState({
      my_alfred_conditions: value
    }, () => this.props.onChange(this.state.booking_request, this.state.my_alfred_conditions));
    Object.values(_utils_consts_js__WEBPACK_IMPORTED_MODULE_7__["ALF_CONDS"]).forEach(v => this.conditions[v].current.setState({
      checked: v <= value
    }));
  }

  render() {
    const {
      classes
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.mainContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentLeftTop
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentTitle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.policySizeTitle
    }, "Vos conditions de r\xE9servation")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.policySizeSubtitle
    }, "Comment les utilisateurs peuvent r\xE9server vos services ? "))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_6__["default"], {
      checked: this.state.booking_request,
      id: "request",
      style: {
        width: '100%'
      },
      label: 'Tous les utilisateurs doivent envoyer une demande de réservation que vous devez valider dans les 24H.',
      ref: this.booking_request,
      onChange: this.onBookingChanged
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_6__["default"], {
      checked: !this.state.booking_request,
      id: "auto",
      label: 'Les utilisateurs peuvent réserver mes services directement sans demande de réservation.',
      ref: this.booking_auto,
      onChange: this.onBookingChanged
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.bottomSpacer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.policySizeSubtitle
    }, "Pour r\xE9server mes services, les utilisateurs doivent : ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_6__["default"], {
      id: _utils_consts_js__WEBPACK_IMPORTED_MODULE_7__["ALF_CONDS"].BASIC,
      label: 'Respecter les conditions My-Alfred (profil vérifié)',
      onChange: this.onAlfredConditionsChanged,
      checked: this.state.my_alfred_conditions >= _utils_consts_js__WEBPACK_IMPORTED_MODULE_7__["ALF_CONDS"].BASIC,
      ref: this.conditions[_utils_consts_js__WEBPACK_IMPORTED_MODULE_7__["ALF_CONDS"].BASIC]
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_6__["default"], {
      id: _utils_consts_js__WEBPACK_IMPORTED_MODULE_7__["ALF_CONDS"].PICTURE,
      label: 'Avoir une photo de profil',
      onChange: this.onAlfredConditionsChanged,
      checked: this.state.my_alfred_conditions >= _utils_consts_js__WEBPACK_IMPORTED_MODULE_7__["ALF_CONDS"].PICTURE,
      ref: this.conditions[_utils_consts_js__WEBPACK_IMPORTED_MODULE_7__["ALF_CONDS"].PICTURE]
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_6__["default"], {
      id: _utils_consts_js__WEBPACK_IMPORTED_MODULE_7__["ALF_CONDS"].ID_CARD,
      label: 'Avoir déposé une pièce d’identité officielle',
      onChange: this.onAlfredConditionsChanged,
      checked: this.state.my_alfred_conditions >= _utils_consts_js__WEBPACK_IMPORTED_MODULE_7__["ALF_CONDS"].ID_CARD,
      ref: this.conditions[_utils_consts_js__WEBPACK_IMPORTED_MODULE_7__["ALF_CONDS"].ID_CARD]
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_6__["default"], {
      id: _utils_consts_js__WEBPACK_IMPORTED_MODULE_7__["ALF_CONDS"].RECOMMEND,
      label: 'Etre recommandé par d’autres Alfred',
      onChange: this.onAlfredConditionsChanged,
      checked: this.state.my_alfred_conditions >= _utils_consts_js__WEBPACK_IMPORTED_MODULE_7__["ALF_CONDS"].RECOMMEND,
      ref: this.conditions[_utils_consts_js__WEBPACK_IMPORTED_MODULE_7__["ALF_CONDS"].RECOMMEND]
    }))))))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__["withStyles"])(_componentStyle__WEBPACK_IMPORTED_MODULE_2__["default"])(BookingConditions));

/***/ }),

/***/ "./components/CreaShop/BookingPreference/BookingPreference.js":
/*!********************************************************************!*\
  !*** ./components/CreaShop/BookingPreference/BookingPreference.js ***!
  \********************************************************************/
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
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/TextField */ "@material-ui/core/TextField");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/MenuItem */ "@material-ui/core/MenuItem");
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/InputAdornment */ "@material-ui/core/InputAdornment");
/* harmony import */ var _material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _componentStyle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../componentStyle */ "./components/CreaShop/componentStyle.js");










 // FIX : réafficher la ville de référence

class BookingPreference extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      deadline_unit: props.deadline_unit,
      deadline_value: props.deadline_value ? props.deadline_value : 1,
      minimum_basket: props.minimum_basket,
      perimeter: props.perimeter,
      service: null
    };
  }

  handleChange(key, value) {
    this.setState({
      [key]: value
    }, () => this.props.onChange(this.state));
  }

  componentDidMount() {
    axios__WEBPACK_IMPORTED_MODULE_9___default.a.get(`/myAlfred/api/service/${this.props.service}`).then(response => {
      let service = response.data;
      this.setState({
        service: service
      });
    }).catch(error => {
      console.error(error);
    });
  }

  render() {
    const {
      classes
    } = this.props;
    const {
      service
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.mainContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentLeftTop
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentTitle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.policySizeTitle
    }, service ? service.label : '', " : vos pr\xE9f\xE9rences de r\xE9servation")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        width: '80%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.policySizeSubtitle
    }, "De quel d\xE9lai souhaitez-vous disposer entre la r\xE9servation et la r\xE9alisation du service ? "))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.policySizeContent
    }, "Par exemple, si vous indiquez un d\xE9lai de 24 heures, un client devra r\xE9server votre service au moins 24 heures avant votre intervention.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentTextSize
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      className: classes.contentAddandRemove
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.subContentAddanRemove
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.buttonRemove,
      onClick: () => this.handleChange('deadline_value', Math.max(parseInt(this.state.deadline_value) - 1, 0))
    }, "-"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        display: 'inline-block',
        fontSize: 20,
        lineHeight: 2.8
      }
    }, this.state.deadline_value), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.buttonAdd,
      onClick: () => this.handleChange('deadline_value', parseInt(this.state.deadline_value) + 1)
    }, "+")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_6___default.a, {
      value: this.state.deadline_unit,
      style: {
        width: '45%'
      },
      className: classes.selectDelayInputRepsonsive,
      select: true,
      margin: "dense",
      variant: "outlined",
      label: "Heures/jours/semaines",
      onChange: v => this.handleChange('deadline_unit', v.target.value)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default.a, {
      value: "heures"
    }, "heure(s)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default.a, {
      value: "jours"
    }, "jour(s)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_7___default.a, {
      value: "semaines"
    }, "semaine(s)")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.policySizeSubtitle
    }, "Quel est votre montant minimum de r\xE9servation ?")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginBottom: 30
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.policySizeContent
    }, "Le montant minimum de r\xE9servation correspond au panier minimum requis pour r\xE9server ce service. Si vous indiquez un montant de 10\u20AC, les clients ne pourront pas r\xE9server vos services si la somme des prestations n\u2019atteint pas ce montant.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_6___default.a, {
      style: {
        width: 200
      },
      type: "number",
      value: this.state.minimum_basket,
      fullWidth: true,
      label: "Panier minimum",
      margin: "dense",
      variant: "outlined",
      onChange: e => this.handleChange('minimum_basket', parseInt(e.target.value)),
      InputProps: {
        inputProps: {
          min: 0
        },
        endAdornment: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_8___default.a, {
          position: "start"
        }, "\u20AC")
      }
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginBottom: 100
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.policySizeSubtitle
    }, "Quel est votre p\xE9rim\xE8tre d\u2019intervention ?")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, false ? /*#__PURE__*/undefined : null, false ? /*#__PURE__*/undefined : null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentIntervention
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.policySizeContent
    }, "D\xE9finissez \xE0 pr\xE9sent le p\xE9rim\xE8tre que vous souhaitez couvrir :")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentTextSize
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      className: classes.contentAddandRemoveKm
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.subContentAddanRemoveKm
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.buttonRemove,
      onClick: () => this.handleChange('perimeter', Math.max(this.state.perimeter - 1, 0))
    }, "-"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        display: 'inline-block',
        fontSize: 20,
        lineHeight: 2.8
      }
    }, this.state.perimeter), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.buttonAdd,
      onClick: () => this.handleChange('perimeter', this.state.perimeter + 1)
    }, "+")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentKilometers
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.policySizeContent
    }, "kilom\xE8tre(s)")))))))))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(_componentStyle__WEBPACK_IMPORTED_MODULE_10__["default"])(BookingPreference));

/***/ }),

/***/ "./components/CreaShop/CreaShopPresentation/CreaShopPresentation.js":
/*!**************************************************************************!*\
  !*** ./components/CreaShop/CreaShopPresentation/CreaShopPresentation.js ***!
  \**************************************************************************/
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
/* harmony import */ var _componentStyle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../componentStyle */ "./components/CreaShop/componentStyle.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _static_assets_police_signatra_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../static/assets/police/signatra.css */ "./static/assets/police/signatra.css");
/* harmony import */ var _static_assets_police_signatra_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_static_assets_police_signatra_css__WEBPACK_IMPORTED_MODULE_6__);








class CreaShopPresentation extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      classes
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.mainContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentLeftTop
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentTitle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Typography"], {
      className: classes.policySizeTitle
    }, "Nous allons vous aider \xE0 cr\xE9er votre service & devenir un Alfred en 3 minutes ! ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentTextSize
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Etape 1 "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
      className: classes.hrStyle
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.policySizeSubtitle
    }, "Choisissez votre premier super talent ! ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Typography"], {
      className: classes.policySizeContent
    }, "S\xE9lectionnez le premier service que vous souhaitez proposer ! Et comme un talent en appelle un autre, vous pourrez ajouter autant de services que vous voulez")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Etape 2 "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
      className: classes.hrStyle
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.policySizeSubtitle
    }, "Vous \xEAtes chez vous ! Fixez vos r\xE8gles et vos conditions\u2026")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Typography"], {
      className: classes.policySizeContent
    }, "Indiquez vos disponibilit\xE9s, param\xE8tres de r\xE9servation et vos conditions d\u2019annulation")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        height: 250
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Etape 3"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
      className: classes.hrStyle
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.policySizeSubtitle
    }, "Pr\xE9sentez-vous !")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Typography"], {
      className: classes.policySizeContent
    }, "Renseignez votre profil Alfred, partagez vos r\xE9alisations, et d\xE9crivez-vous ! ")))))))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(_componentStyle__WEBPACK_IMPORTED_MODULE_4__["default"])(CreaShopPresentation));

/***/ }),

/***/ "./components/CreaShop/IntroduceYou/IntroduceYou.js":
/*!**********************************************************!*\
  !*** ./components/CreaShop/IntroduceYou/IntroduceYou.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/FormControlLabel */ "@material-ui/core/FormControlLabel");
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Checkbox */ "@material-ui/core/Checkbox");
/* harmony import */ var _material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_icons_RadioButtonUnchecked__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/RadioButtonUnchecked */ "@material-ui/icons/RadioButtonUnchecked");
/* harmony import */ var _material_ui_icons_RadioButtonUnchecked__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_RadioButtonUnchecked__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_icons_RadioButtonChecked__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/icons/RadioButtonChecked */ "@material-ui/icons/RadioButtonChecked");
/* harmony import */ var _material_ui_icons_RadioButtonChecked__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_RadioButtonChecked__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Siret_Siret__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Siret/Siret */ "./components/Siret/Siret.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _componentStyle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../componentStyle */ "./components/CreaShop/componentStyle.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/TextField */ "@material-ui/core/TextField");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _components_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../components/ButtonSwitch/ButtonSwitch */ "./components/ButtonSwitch/ButtonSwitch.js");
/* harmony import */ var _Information_Information__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../Information/Information */ "./components/Information/Information.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

















const {
  CESU
} = __webpack_require__(/*! ../../../utils/consts */ "./utils/consts.js");

const I18N = __webpack_require__(/*! ../../../utils/i18n */ "./utils/i18n.js");

class IntroduceYou extends react__WEBPACK_IMPORTED_MODULE_6___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "onChange", event => {
      const {
        name,
        value
      } = event.target;
      this.setState({
        [name]: value
      }, () => this.fireChange());
    });

    _defineProperty(this, "onCISChange", (id, checked) => {
      this.setState({
        cis: checked
      }, () => this.fireChange());
    });

    this.state = {
      is_particular: this.props.is_particular,
      company: this.props.company,
      is_certified: this.props.is_certified,
      cesu: null,
      cis: false,
      social_security: null,
      notice: false
    };
    this.onStatusChanged = this.onStatusChanged.bind(this);
    this.onCertifiedChanged = this.onCertifiedChanged.bind(this);
    this.onCompanyChanged = this.onCompanyChanged.bind(this);
  }

  fireChange() {
    this.props.onChange(this.state.is_particular, this.state.company, this.state.is_certified, this.state.cesu, this.state.cis, this.state.social_security);
  }

  onStatusChanged(event, checked) {
    let id = event.target.id;
    let req = id === 'particular' && checked || id === 'professional' && !checked;
    const company = req ? null : this.state.company;
    this.setState({
      is_particular: req,
      company: company
    }, () => this.fireChange());
  }

  onCertifiedChanged(event) {
    this.setState({
      is_certified: event.target.checked
    }, () => this.fireChange());
  }

  onCompanyChanged(company) {
    this.setState({
      company: company
    }, () => this.fireChange());
  }

  render() {
    const {
      classes
    } = this.props;
    const {
      cesu
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      className: classes.mainContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      className: classes.contentContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      className: classes.contentLeftTop
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      className: classes.contentTitle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.policySizeTitle
    }, "Pr\xE9cisez votre statut ! ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      style: {
        display: 'flex'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h3", {
      className: classes.policySizeSubtitle
    }, "Indiquez si vous proposez vos services en tant que particulier ou via une entreprise \xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("img", {
      src: "/static/assets/img/info.svg",
      width: 16,
      onClick: () => this.setState({
        notice: true
      })
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_Information_Information__WEBPACK_IMPORTED_MODULE_14__["default"], {
      open: this.state.notice,
      onClose: () => this.setState({
        notice: false
      }),
      text: I18N.CESU_NOTICE
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      container: true,
      spacing: 3
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_1___default.a, {
      control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_2___default.a, {
        id: "particular",
        checked: this.state.is_particular,
        name: 'isParticular',
        color: "primary",
        value: this.state.is_particular,
        onChange: this.onStatusChanged,
        icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_icons_RadioButtonUnchecked__WEBPACK_IMPORTED_MODULE_3___default.a, null),
        checkedIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_icons_RadioButtonChecked__WEBPACK_IMPORTED_MODULE_4___default.a, null)
      }),
      label: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
        className: classes.policySizeSubtitle
      }, "Je suis un particulier")
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      item: true,
      xs: 11
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.policySizeContent
    }, "En tant que particulier, vous pouvez rendre des services occasionnels sur My-Alfred. Si votre activit\xE9 devient r\xE9guli\xE8re, un statut professionnel (micro-entrepreneur,...) s\u2019impose. Il est \xE9galement requis pour certains secteurs d\u2019activit\xE9 r\xE9glement\xE9s.")), this.state.is_particular ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      style: {
        marginLeft: 40,
        marginTop: 30,
        marginBottom: 30
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_11__["RadioGroup"], {
      name: 'cesu',
      value: this.state.cesu,
      onChange: this.onChange
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_11__["Radio"], {
      color: "primary",
      value: CESU[0]
    }), "Je veux \xEAtre d\xE9clar\xE9(e) en CESU"), cesu == CESU[0] ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      style: {
        display: 'flex',
        marginLeft: 40
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", null, "N\xB0 s\xE9curit\xE9 sociale"), "\xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_12___default.a, {
      id: "ss1",
      type: "number",
      name: "social_security",
      placeholder: "N\xB0 SS (13+2 chiffres)",
      value: this.state.social_security,
      onChange: this.onChange,
      errors: this.state.social_security
    })) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_11__["Radio"], {
      color: "primary",
      value: CESU[1]
    }), "J'accepte d'\xEAtre d\xE9clar\xE9 en CESU"), cesu == CESU[1] ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      style: {
        display: 'flex',
        marginLeft: 40
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", null, "N\xB0 s\xE9curit\xE9 sociale"), "\xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_12___default.a, {
      id: "ss1",
      type: "number",
      name: "social_security",
      placeholder: "N\xB0 SS (13+2 chiffres)",
      value: this.state.social_security,
      onChange: this.onChange,
      errors: this.state.social_security
    })) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_11__["Radio"], {
      color: "primary",
      value: CESU[2]
    }), "Je n'accepte pas d'\xEAtre d\xE9clar\xE9(e) en CESU"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_Information_Information__WEBPACK_IMPORTED_MODULE_14__["default"], {
      open: this.state.notice,
      onClose: () => this.setState({
        notice: false
      }),
      text: I18N.CESU_NOTICE
    }))) : null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      container: true,
      style: {
        marginTop: 10,
        marginBottom: 100
      },
      spacing: 3
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      item: true,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_1___default.a, {
      control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_2___default.a, {
        id: "professional",
        checked: !this.state.is_particular,
        name: 'isProfessional',
        color: "primary",
        value: this.state.is_particular,
        onChange: this.onStatusChanged,
        icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_icons_RadioButtonUnchecked__WEBPACK_IMPORTED_MODULE_3___default.a, null),
        checkedIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_icons_RadioButtonChecked__WEBPACK_IMPORTED_MODULE_4___default.a, null)
      }),
      label: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
        className: classes.policySizeSubtitle
      }, "Je suis un professionnel/J'ai un num\xE9ro de SIRET")
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      item: true,
      xs: 11
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.policySizeContent
    }, "Un statut professionnel avec un num\xE9ro de SIRET est n\xE9cessaire pour les m\xE9tiers r\xE9glement\xE9s et permet une activit\xE9 r\xE9guli\xE8re sur My-Alfred. Seuls les professionnels peuvent proposer leurs services aux entreprises qui ont besoin d\u2019une facture. Un statut professionnel est requis d\xE8s lors que votre activit\xE9 devient r\xE9guli\xE8re."), this.state.is_particular ? null : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_6___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_13__["default"], {
      label: "Je suis \xE9ligible au Cr\xE9dit Imp\xF4t Service",
      onChange: this.onCISChange,
      checked: this.state.cis
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_Siret_Siret__WEBPACK_IMPORTED_MODULE_7__["default"], {
      onChange: this.onCompanyChanged,
      company: this.state.company
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_1___default.a, {
      control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_2___default.a, {
        checked: this.state.is_certified,
        onChange: this.onCertifiedChanged,
        color: "primary",
        name: "is_certified",
        value: this.state.is_certified
      }),
      label: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
        className: classes.policySizeContent
      }, "Je certifie sur l\u2019honneur qu\u2019il s\u2019agit bien de mon entreprise.")
    })))))))))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__["withStyles"])(_componentStyle__WEBPACK_IMPORTED_MODULE_10__["default"])(IntroduceYou));

/***/ }),

/***/ "./components/CreaShop/SelectPrestation/SelectPrestation.js":
/*!******************************************************************!*\
  !*** ./components/CreaShop/SelectPrestation/SelectPrestation.js ***!
  \******************************************************************/
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
/* harmony import */ var _ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ButtonSwitch/ButtonSwitch */ "./components/ButtonSwitch/ButtonSwitch.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _componentStyle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../componentStyle */ "./components/CreaShop/componentStyle.js");
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../utils/consts */ "./utils/consts.js");
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_utils_consts__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Fab */ "@material-ui/core/Fab");
/* harmony import */ var _material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/icons/Add */ "@material-ui/icons/Add");
/* harmony import */ var _material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_11__);
const {
  setAxiosAuthentication
} = __webpack_require__(/*! ../../../utils/authentication */ "./utils/authentication.js");














const {
  getLoggedUserId
} = __webpack_require__(/*! ../../../utils/functions */ "./utils/functions.js");

class SelectPrestation extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      grouped: [],
      prestations: this.props.prestations || {},
      service: null,
      service_name: '',
      all_billlings: []
    };
    this.prestationSelected = this.prestationSelected.bind(this);
    this.addCustomPrestation = this.addCustomPrestation.bind(this);
    this.removeCustomPrestation = this.removeCustomPrestation.bind(this);
  }

  componentDidMount() {
    // Get current alfred id
    const alfred_id = getLoggedUserId();
    let billings = null;
    setAxiosAuthentication();
    axios__WEBPACK_IMPORTED_MODULE_6___default.a.get(`/myAlfred/api/billing/all`).then(res => {
      billings = res.data;
      this.setState({
        all_billings: billings
      });
    });
    axios__WEBPACK_IMPORTED_MODULE_6___default.a.get(`/myAlfred/api/service/${this.props.service}`).then(res => {
      let service = res.data;
      this.setState({
        service_name: service.label
      });
    }).catch(error => console.error(error));
    axios__WEBPACK_IMPORTED_MODULE_6___default.a.get(`/myAlfred/api/prestation/${this.props.service}`).then(res => {
      var prestations = res.data; // Remove private belonging to other Alfreds

      prestations = prestations.filter(p => p.private_alfred == null || p.private_alfred == alfred_id);
      let private_prestations = prestations.filter(p => p.private_alfred != null);
      let public_prestations = prestations.filter(p => p.private_alfred == null);

      let grouped = lodash__WEBPACK_IMPORTED_MODULE_11___default.a.mapValues(lodash__WEBPACK_IMPORTED_MODULE_11___default.a.groupBy(public_prestations, 'filter_presentation.label'), clist => clist.map(public_prestations => lodash__WEBPACK_IMPORTED_MODULE_11___default.a.omit(public_prestations, 'filter_presentation.label')));

      let presta_templates = private_prestations.map(p => {
        return { ...p,
          billing: billings
        };
      });
      grouped = {
        [_utils_consts__WEBPACK_IMPORTED_MODULE_8__["CUSTOM_PRESTATIONS_FLTR"]]: presta_templates,
        ...grouped
      };
      this.setState({
        grouped: grouped
      });
    }).catch(error => {
      console.error(error);
    });
  }

  addCustomPrestation() {
    let grouped = this.state.grouped;
    let custom_presta = {
      _id: Object(_utils_consts__WEBPACK_IMPORTED_MODULE_8__["generate_id"])(),
      label: '',
      service: this.state.service,
      billing: this.state.all_billings,
      description: '',
      price: null
    };
    grouped[_utils_consts__WEBPACK_IMPORTED_MODULE_8__["CUSTOM_PRESTATIONS_FLTR"]].push(custom_presta);
    this.setState({
      grouped: grouped
    });
  }

  removeCustomPrestation(presta_id) {
    this.prestationSelected(presta_id, false);
    let grouped = this.state.grouped;
    grouped[_utils_consts__WEBPACK_IMPORTED_MODULE_8__["CUSTOM_PRESTATIONS_FLTR"]] = grouped[_utils_consts__WEBPACK_IMPORTED_MODULE_8__["CUSTOM_PRESTATIONS_FLTR"]].filter(p => p._id !== presta_id);
    this.setState({
      grouped: grouped
    });
  }

  prestationSelected(prestaId, checked, price, billing, label) {
    let sel = this.state.prestations;

    if (checked) {
      sel[prestaId] = {
        _id: prestaId,
        label: label,
        price: price,
        billing: billing
      };
    } else {
      delete sel[prestaId];
    }

    this.setState({
      prestations: sel
    });
    this.props.onChange(sel);
  }

  render() {
    // FIX : le billing par défaut n'ets pas sélectionné
    const {
      classes,
      prestations
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.mainContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.maxWidth
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentLeftTop
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentTitle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Typography"], {
      className: classes.policySizeTitle
    }, this.state.service_name, " : indiquez vos prestations"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.containerPrestas
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.bottomSpacer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Typography"], {
      className: classes.policySizeContent
    }, "Quelles prestations souhaitez-vous r\xE9aliser ? Indiquez vos tarifs et votre unit\xE9 de facturation. ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.buttonAddPrestas
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      className: classes.maxWidth,
      style: {
        marginBottom: 100
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_9___default.a, {
      variant: "extended",
      color: "primary",
      "aria-label": "add",
      onClick: () => this.addCustomPrestation(),
      className: classes.margin
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_10___default.a, {
      className: classes.extendedIcon
    }), "Ajouter une prestation personnalis\xE9e")), Object.keys(this.state.grouped).map((fltr, i) => {
      let prestas = this.state.grouped[fltr];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        key: i,
        className: classes.maxWidth
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        className: classes.marginThirty
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        item: true
      }, fltr === 'Aucun' ? '' : fltr === 'Prestations personnalisées' && this.state.grouped['Prestations personnalisées'].length === 0 ? '' : fltr)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        container: true,
        spacing: 2
      }, prestas.map((p, j) => {
        let isEditable = p._id.length == _utils_consts__WEBPACK_IMPORTED_MODULE_8__["GID_LEN"];
        let presta = this.state.prestations[p._id];
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
          key: p._id,
          item: true,
          xl: 6,
          lg: 6,
          md: 6,
          sm: 12,
          xs: 12
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_4__["default"], {
          isOption: true,
          isPrice: true,
          width: '100%',
          label: p.label,
          id: p._id,
          checked: presta != null,
          billings: p.billing,
          onChange: this.prestationSelected,
          isEditable: isEditable,
          price: presta ? presta.price : null,
          billing: presta ? presta.billing : null
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
          style: {
            color: 'rgb(255, 249, 249, 0.6)',
            borderRadius: 10
          }
        }));
      })));
    })))))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(_componentStyle__WEBPACK_IMPORTED_MODULE_7__["default"])(SelectPrestation));

/***/ }),

/***/ "./components/CreaShop/SelectService/SelectService.js":
/*!************************************************************!*\
  !*** ./components/CreaShop/SelectService/SelectService.js ***!
  \************************************************************/
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
/* harmony import */ var _componentStyle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../componentStyle */ "./components/CreaShop/componentStyle.js");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/TextField */ "@material-ui/core/TextField");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_lab_Autocomplete__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/lab/Autocomplete */ "@material-ui/lab/Autocomplete");
/* harmony import */ var _material_ui_lab_Autocomplete__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_lab_Autocomplete__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_dropdown_select__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-dropdown-select */ "react-dropdown-select");
/* harmony import */ var react_dropdown_select__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_dropdown_select__WEBPACK_IMPORTED_MODULE_9__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  setAxiosAuthentication
} = __webpack_require__(/*! ../../../utils/authentication */ "./utils/authentication.js");

const AUTOCOMPLETE = false;











const {
  inspect
} = __webpack_require__(/*! util */ "util");

const {
  matches,
  normalize
} = __webpack_require__(/*! ../../../utils/text */ "./utils/text.js");

class SelectService extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "searchFn", st => {
      const search = normalize(st.state.search);
      const options = st.props.options;
      const selected = options.filter(opt => {
        const ok = matches(opt.keywords, search) || matches(opt.label, search);
        return ok;
      });
      return selected;
    });

    this.state = {
      service: null,
      services: [],
      creation: this.props.creation
    };
    this.onChange = this.onChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  setServices(pattern) {
    pattern = pattern || '%20';
    var kw_url = `/myAlfred/api/service/keyword/${pattern}`;
    setAxiosAuthentication();
    axios__WEBPACK_IMPORTED_MODULE_7___default.a.get(kw_url).then(response => {
      let data = response.data;
      let services = [];
      Object.keys(data).forEach(k => {
        data[k].forEach(s => {
          // FIX: passer les keyowrds autrement dans le back
          // Dont show services to exclude (i.e. already in the shop)
          if (!this.props.exclude || !this.props.exclude.includes(s.id)) {
            let srv_opt = {
              label: `${s.label}`,
              value: s.id,
              keywords: s.keywords.map(k => normalize(k)).join(' ').toLowerCase()
            };
            services.push(srv_opt);

            if (this.state.service == null && s.id == this.props.service) {
              this.setState({
                service: srv_opt
              });
            }
          }
        });
      });
      this.setState({
        services: services
      });
    }).catch(error => {
      console.error(error);
    });
  }

  componentDidMount() {
    this.setServices('');
  }

  onChange(item) {
    if (item.length > 0) {
      this.setState({
        service: item ? item[0].value : null
      });

      if (item !== undefined && item !== null) {
        this.props.onChange(item[0].value);
      }
    }
  }

  onChangeSelect(value) {
    this.setState({
      service: value ? value : null
    });

    if (value !== undefined && value !== null) {
      this.props.onChange(value.id);
    }
  }

  handleKeyDown(event) {
    this.setServices(event.target.value);
  }

  isCreation() {
    return this.state.creation;
  }

  render() {
    const {
      classes,
      creationBoutique
    } = this.props;
    const {
      service
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.mainContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentLeftTop
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentTitle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, {
      className: classes.policySizeTitle
    }, creationBoutique ? 'Créez votre boutique de services' : this.isCreation() ? 'Ajouter un service' : 'Modifier un service')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.policySizeSubtitle
    }, this.isCreation() ? 'Quel service souhaitez-vous réaliser ?' : `Vous allez modifier votre service "${service ? service.label : ''}"`, " ")), creationBoutique ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.bottomSpacer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, {
      className: classes.policySizeContent
    }, "Identifiez maintenant le premier service que vous souhaitez configurer dans votre boutique de services. Vous pourrez en ajouter autant que vous voulez dans votre boutique. Un service n\u2019apparait pas ? Cliquez ici pour l\u2019ajouter.")) : null), this.isCreation() ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, AUTOCOMPLETE ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_lab_Autocomplete__WEBPACK_IMPORTED_MODULE_8___default.a, {
      id: "grouped-demo",
      className: classes.textFieldSelecteService,
      onChange: this.onChange,
      onKeyDown: event => {
        this.handleKeyDown(event);
      },
      options: this.state.services,
      groupBy: option => option.category,
      getOptionLabel: option => option.label,
      value: this.state.service,
      disabled: !this.isCreation(),
      renderInput: params => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5___default.a, _extends({}, params, {
        label: this.isCreation() ? 'Tapez votre service' : '',
        variant: "outlined",
        fullWidth: true
      })),
      renderOption: (option, {
        value
      }) => {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, option ? option.label.split('/')[0] : '');
      }
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_dropdown_select__WEBPACK_IMPORTED_MODULE_9___default.a, {
      options: this.state.services,
      onChange: this.onChange //onKeyDown={(event) =>{ this.handleKeyDown(event) }}
      ,
      disabled: !this.isCreation(),
      searchable: true,
      searchBy: 'label',
      searchFn: this.searchFn
    }))) : null)))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(_componentStyle__WEBPACK_IMPORTED_MODULE_4__["default"])(SelectService));

/***/ }),

/***/ "./components/CreaShop/SettingService/SettingService.js":
/*!**************************************************************!*\
  !*** ./components/CreaShop/SettingService/SettingService.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _componentStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../componentStyle */ "./components/CreaShop/componentStyle.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Checkbox */ "@material-ui/core/Checkbox");
/* harmony import */ var _material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../ButtonSwitch/ButtonSwitch */ "./components/ButtonSwitch/ButtonSwitch.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _server_validation_is_empty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../server/validation/is-empty */ "./server/validation/is-empty.js");
/* harmony import */ var _server_validation_is_empty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_server_validation_is_empty__WEBPACK_IMPORTED_MODULE_9__);
const {
  setAxiosAuthentication
} = __webpack_require__(/*! ../../../utils/authentication */ "./utils/authentication.js");












class SettingService extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location || {},
      service: null,
      travel_tax: props.travel_tax || null,
      pick_tax: props.pick_tax || null,
      selectedEquipments: props.equipments || []
    };
    this.stateButton = this.stateButton.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onOptionChanged = this.onOptionChanged.bind(this);
    this.onEquipmentChecked = this.onEquipmentChecked.bind(this);
  }

  stateButton(e) {
    let name = e.target.name;
    this.setState({
      [e.target.name]: !this.state[name]
    });
  }

  componentDidMount() {
    setAxiosAuthentication();
    axios__WEBPACK_IMPORTED_MODULE_8___default.a.get(`/myAlfred/api/service/${this.props.service}`).then(response => {
      let service = response.data;
      let location = this.state.location;

      if (_server_validation_is_empty__WEBPACK_IMPORTED_MODULE_9___default()(location)) {
        Object.keys(service.location).forEach(k => {
          if (service.location[k]) {
            location[k] = true;
          }
        });
      }

      this.setState({
        service: service,
        location: location
      }, () => this.fireOnChange());
    }).catch(error => {
      console.error(error);
    });
  }

  onLocationChange(loc_id, checked) {
    let loc = this.state.location;
    loc[loc_id] = checked;
    this.setState({
      location: loc
    }, () => this.fireOnChange());
  }

  onOptionChanged(opt_id, checked, price) {
    this.setState({
      [opt_id]: checked ? price : null
    }, () => this.fireOnChange());
  }

  onEquipmentChecked(event) {
    if (this.state.selectedEquipments.includes(event.target.name)) {
      let array = [...this.state.selectedEquipments];
      let index = array.indexOf(event.target.name);

      if (index !== -1) {
        array.splice(index, 1);
        this.setState({
          selectedEquipments: array
        }, () => this.fireOnChange());
      }
    } else {
      this.setState({
        selectedEquipments: [...this.state.selectedEquipments, event.target.name]
      }, () => this.fireOnChange());
    }
  }

  fireOnChange() {
    this.props.onChange(this.state.location, this.state.travel_tax, this.state.pick_tax, this.state.selectedEquipments);
  }

  render() {
    const {
      classes
    } = this.props;
    const {
      service,
      location,
      pick_tax,
      travel_tax
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.mainContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentLeftTop
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentTitle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, {
      className: classes.policySizeTitle
    }, service ? service.label : '', " : param\xE9trage")), service && service.equipments.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.policySizeSubtitle
    }, "Quel(s) produit(s) / mat\xE9riel(s) fournissez-vous dans le cadre de ce service ? ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.bottomSpacer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      spacing: 1
    }, service.equipments.map((result, index) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        key: index,
        item: true,
        xl: 3,
        lg: 4,
        md: 4,
        sm: 4,
        xs: 4
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        style: {
          cursor: 'pointer'
        }
      }, this.state.selectedEquipments.includes(result._id) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: `../../static/equipments/${result.logo.slice(0, -4)}_Selected.svg`,
        height: 100,
        width: 100,
        alt: `${result.name_logo.slice(0, -4)}_Selected.svg`
      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: `../../static/equipments/${result.logo}`,
        height: 100,
        width: 100,
        alt: result.name_logo
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_5___default.a, {
        style: {
          display: 'none'
        },
        color: "primary",
        type: "checkbox",
        name: result._id,
        checked: this.state.selectedEquipments.includes(result._id),
        onChange: this.onEquipmentChecked
      })));
    })))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.policySizeSubtitle
    }, "O\xF9 acceptez-vous de r\xE9aliser votre prestation ?")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginLeft: 15
      }
    }, 'client' in this.state.location ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_7__["default"], {
      checked: location.client === true,
      label: 'A l\'adresse de mon client',
      id: "client",
      onChange: this.onLocationChange
    })) : null, 'alfred' in location ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_7__["default"], {
      checked: location.alfred === true,
      label: 'A mon adresse',
      id: "alfred",
      onChange: this.onLocationChange
    })) : null, 'visio' in location ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_7__["default"], {
      checked: location.visio === true,
      label: 'En visioconférence',
      id: "visio",
      onChange: this.onLocationChange
    })) : null, 'ext' in location ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_7__["default"], {
      checked: location.ext === true,
      label: 'En extérieur',
      id: "ext",
      onChange: this.onLocationChange
    })) : null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginLeft: 15
      },
      className: classes.options
    }, service && (service.travel_tax || service.pick_tax) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.policySizeSubtitle
    }, "Options")) : null, service && service.travel_tax ?
    /*#__PURE__*/
    // FIX : voir pourquoi le ButtonSwitch ne se checke pas
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_7__["default"], {
      ckecked: travel_tax != null,
      price: travel_tax,
      id: "travel_tax",
      label: 'Appliquer un forfait déplacement de',
      isPrice: true,
      onChange: this.onOptionChanged
    })) : null, service && service.pick_tax ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_7__["default"], {
      checked: pick_tax != null,
      price: pick_tax,
      id: "pick_tax",
      label: 'Proposer un forfait retrait & livraison de',
      isPrice: true,
      onChange: this.onOptionChanged
    })) : null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentRight
    })));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__["withStyles"])(_componentStyle__WEBPACK_IMPORTED_MODULE_2__["default"])(SettingService));

/***/ }),

/***/ "./components/CreaShop/SettingShop/SettingShop.js":
/*!********************************************************!*\
  !*** ./components/CreaShop/SettingShop/SettingShop.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _componentStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../componentStyle */ "./components/CreaShop/componentStyle.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/TextField */ "@material-ui/core/TextField");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../ButtonSwitch/ButtonSwitch */ "./components/ButtonSwitch/ButtonSwitch.js");
/* harmony import */ var _utils_consts_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../utils/consts.js */ "./utils/consts.js");
/* harmony import */ var _utils_consts_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_utils_consts_js__WEBPACK_IMPORTED_MODULE_8__);










class SettingShop extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      welcome_message: this.props.welcome_message,
      cancel_mode: this.props.cancel_mode
    };
    this.cancel_buttons = {};
    Object.values(_utils_consts_js__WEBPACK_IMPORTED_MODULE_8__["CANCEL_MODE"]).forEach(v => this.cancel_buttons[v] = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef());
    this.cancelModeChanged = this.cancelModeChanged.bind(this);
    this.welcomeMessageChanged = this.welcomeMessageChanged.bind(this);
  }

  welcomeMessageChanged(event) {
    let msg = event.target.value;
    this.setState({
      welcome_message: msg
    }, () => this.props.onChange(msg, this.state.cancel_mode));
  }

  cancelModeChanged(mode_id, checked) {
    this.setState({
      cancel_mode: mode_id
    }, () => this.props.onChange(this.state.welcome_message, mode_id));
    Object.values(_utils_consts_js__WEBPACK_IMPORTED_MODULE_8__["CANCEL_MODE"]).forEach(v => {
      this.cancel_buttons[v].current.setState({
        checked: mode_id === v
      });
    });
  }

  render() {
    const {
      classes
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.mainContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentLeftTop
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentTitle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.policySizeTitle
    }, "Indiquez votre message de bienvenue ! ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.policySizeSubtitle
    }, "Les utilisateurs recevront votre message lorsque vous confirmerez leur r\xE9servation. "))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.texfieldContentWelcomedMessage
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_6___default.a, {
      id: "outlined-multiline-static",
      label: "Message de bienvenue",
      multiline: true,
      rows: "4",
      className: classes.textField,
      margin: "normal",
      variant: "outlined",
      InputLabelProps: {
        shrink: true
      },
      value: this.state.welcome_message,
      onChange: this.welcomeMessageChanged
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginBottom: 100
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.policySizeSubtitle
    }, "Indiquez vos conditions d\u2019annulation")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: classes.policySizeContent
    }, "Choisissez vos conditions en cas d'annulation de la part des utilisateurs."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_7__["default"], {
      id: _utils_consts_js__WEBPACK_IMPORTED_MODULE_8__["CANCEL_MODE"].FLEXIBLE,
      checked: this.state.cancel_mode == _utils_consts_js__WEBPACK_IMPORTED_MODULE_8__["CANCEL_MODE"].FLEXIBLE,
      label: 'Flexibles: Remboursement intégral jusqu\'à 1 jour avant la prestation',
      onChange: this.cancelModeChanged,
      ref: this.cancel_buttons[_utils_consts_js__WEBPACK_IMPORTED_MODULE_8__["CANCEL_MODE"].FLEXIBLE]
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_7__["default"], {
      id: _utils_consts_js__WEBPACK_IMPORTED_MODULE_8__["CANCEL_MODE"].MODERATE,
      checked: this.state.cancel_mode == _utils_consts_js__WEBPACK_IMPORTED_MODULE_8__["CANCEL_MODE"].MODERATE,
      label: 'Modérées: Remboursement intégral jusqu\'à 5 jours avant la prestation',
      onChange: this.cancelModeChanged,
      ref: this.cancel_buttons[_utils_consts_js__WEBPACK_IMPORTED_MODULE_8__["CANCEL_MODE"].MODERATE]
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_7__["default"], {
      id: _utils_consts_js__WEBPACK_IMPORTED_MODULE_8__["CANCEL_MODE"].STRICT,
      checked: this.state.cancel_mode == _utils_consts_js__WEBPACK_IMPORTED_MODULE_8__["CANCEL_MODE"].STRICT,
      label: 'Strictes: Remboursement intégral jusqu’à 10 jours avant la prestation',
      onChange: this.cancelModeChanged,
      ref: this.cancel_buttons[_utils_consts_js__WEBPACK_IMPORTED_MODULE_8__["CANCEL_MODE"].STRICT]
    }))))))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__["withStyles"])(_componentStyle__WEBPACK_IMPORTED_MODULE_2__["default"])(SettingShop));

/***/ }),

/***/ "./components/CreaShop/componentStyle.js":
/*!***********************************************!*\
  !*** ./components/CreaShop/componentStyle.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  mainContainer: {
    width: '100%',
    height: '100%'
  },
  contentContainer: {
    display: 'flex',
    width: '100%'
  },
  contentLeftTop: {
    width: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column'
    }
  },
  contentTitle: {
    width: '80%'
  },
  contentTextSize: {
    width: 500,
    marginTop: 30,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: 100
    }
  },
  policySizeTitle: {
    margin: 0,
    overflowWrap: 'break-word !important',
    fontSize: 24,
    fontWeight: 800,
    lineHeight: '1.25em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color: 'rgb(72, 72, 72)',
    paddingTop: 2,
    paddingBottom: 2
  },
  policySizeStep: {
    fontFamily: 'signatra',
    fontSize: 30
  },
  policySizeSubtitle: {
    fontSize: 19,
    lineHeight: '1.43em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color: '#484848'
  },
  policySizeContent: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '1.43em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color: 'rgb(72, 72, 72)'
  },
  hrStyle: {
    color: '#BCBCBC'
  },
  textFieldSelecteService: {
    width: 500,
    [theme.breakpoints.down('md')]: {
      width: 300
    }
  },
  bottomSpacer: {
    width: 500,
    marginTop: 30,
    marginBottom: 30,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  options: {
    [theme.breakpoints.down('lg')]: {
      marginBottom: 100
    }
  },
  button: {
    width: '60%',
    backgroundColor: 'white',
    border: '1px solid #4fbdd7',
    borderRadius: 25,
    height: 30,
    textAlign: 'left',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#4fbdd7',
      color: 'white'
    }
  },
  activeButton: {
    width: '60%',
    backgroundColor: '#4fbdd7',
    border: '1px solid #4fbdd7',
    borderRadius: 25,
    height: 30,
    textAlign: 'left',
    cursor: 'pointer',
    color: 'white'
  },
  buttonRemove: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    border: '1px solid #2FBCD3',
    textAlign: 'center',
    lineHeight: 1.6,
    cursor: 'pointer',
    display: 'inline-block',
    marginRight: 25,
    [theme.breakpoints.down('xs')]: {
      width: 30,
      height: 30
    }
  },
  buttonAdd: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    border: '1px solid #2FBCD3',
    textAlign: 'center',
    lineHeight: 1.6,
    cursor: 'pointer',
    display: 'inline-block',
    marginLeft: 25,
    marginRight: 25,
    [theme.breakpoints.down('xs')]: {
      width: 30,
      height: 30
    }
  },
  selectDelayInputRepsonsive: {
    zIndex: 0,
    [theme.breakpoints.down('sm')]: {
      width: '100%!important'
    }
  },
  contentAddandRemove: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  subContentAddanRemove: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  contentCityReferency: {
    border: '1px solid #C6C6C6',
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  buttonContent: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  styleButton: {
    color: 'white',
    borderRadius: 'unset'
  },
  contentIntervention: {
    height: 250,
    [theme.breakpoints.down('md')]: {
      marginBottom: 100
    }
  },
  contentAddandRemoveKm: {
    display: 'flex',
    alignItems: 'center'
  },
  subContentAddanRemoveKm: {
    display: 'flex',
    alignItems: 'center'
  },
  contentKilometers: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  inputDiplomaCertifResp: {
    width: '50%',
    marginRight: '5%',
    zIndex: 0,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  textField: {
    width: '50%',
    zIndex: 0,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  describExperience: {
    zIndex: 0,
    width: '100%'
  },
  texfieldContentWelcomedMessage: {
    width: '100%',
    marginLeft: 10,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    color: 'white'
  },
  margin: {
    margin: theme.spacing(1),
    color: 'white'
  },
  maxWidth: {
    width: '100%'
  },
  buttonAddPrestas: {
    display: 'flex',
    marginTop: 30,
    marginBottom: 100
  },
  marginThirty: {
    marginBottom: 30,
    marginTop: 30
  },
  containerPrestas: {
    marginTop: 30,
    width: '100%'
  }
}));

/***/ }),

/***/ "./components/Drawer/DrawerAndSchedule/DrawerAndSchedule.js":
/*!******************************************************************!*\
  !*** ./components/Drawer/DrawerAndSchedule/DrawerAndSchedule.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DrawerSchedule_DrawerSchedule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../DrawerSchedule/DrawerSchedule */ "./components/DrawerSchedule/DrawerSchedule.js");
/* harmony import */ var _Schedule_Schedule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Schedule/Schedule */ "./components/Schedule/Schedule.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _static_css_components_DrawerAndSchedule_DrawerAndSchedule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../static/css/components/DrawerAndSchedule/DrawerAndSchedule */ "./static/css/components/DrawerAndSchedule/DrawerAndSchedule.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class DrawerAndSchedule extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "onDateSelectionChanged", eventsSelected => {
      this.drawer.current.onDateSelectionChanged(eventsSelected);
    });

    _defineProperty(this, "availabilityUpdate", avail => {
      this.props.availabilityUpdate(avail);
    });

    _defineProperty(this, "availabilityCreated", avail => {
      this.props.availabilityCreated(avail);
    });

    _defineProperty(this, "onAvailabilityChanged", () => {
      this.props.onAvailabilityChanged();
    });

    _defineProperty(this, "onDateSelectionCleared", () => {
      this.schedule.current.onDateSelectionCleared();
    });

    _defineProperty(this, "isDirty", () => {
      return this.drawer.current && this.drawer.current.isDirty();
    });

    this.schedule = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.drawer = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.state = {
      availabilities: []
    };
  }

  render() {
    const {
      availabilities,
      selectable,
      title,
      subtitle,
      booking,
      nbSchedule,
      readOnly,
      classes
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.drawerAndSchedule_mainContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: readOnly ? classes.drawerAndSchedule_mainContainer : classes.drawerAndSchedule_scheduleContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Schedule_Schedule__WEBPACK_IMPORTED_MODULE_3__["default"], {
      ref: this.schedule,
      availabilities: availabilities,
      title: title,
      subtitle: subtitle,
      onCreateAvailability: this.availabilityCreated,
      onUpdateAvailability: this.availabilityUpdate,
      selectable: selectable,
      nbSchedule: nbSchedule,
      handleSelection: this.onDateSelectionChanged,
      mode: 'month',
      booking: booking
    })), readOnly ? null : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DrawerSchedule_DrawerSchedule__WEBPACK_IMPORTED_MODULE_2__["default"], {
      ref: this.drawer,
      onAvailabilityChanged: this.onAvailabilityChanged,
      onDateSelectionCleared: this.onDateSelectionCleared
    })));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__["withStyles"])(_static_css_components_DrawerAndSchedule_DrawerAndSchedule__WEBPACK_IMPORTED_MODULE_5__["default"])(DrawerAndSchedule));

/***/ }),

/***/ "./components/Drawer/DrawerEditingSchedule/DrawerEditingSchedule.js":
/*!**************************************************************************!*\
  !*** ./components/Drawer/DrawerEditingSchedule/DrawerEditingSchedule.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Hidden */ "@material-ui/core/Hidden");
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/IconButton */ "@material-ui/core/IconButton");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/Close */ "@material-ui/icons/Close");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Divider */ "@material-ui/core/Divider");
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _SelectSlotTimer_SelectSlotTimer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../SelectSlotTimer/SelectSlotTimer */ "./components/SelectSlotTimer/SelectSlotTimer.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _DrawerEditingScheduleStyle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DrawerEditingScheduleStyle */ "./components/Drawer/DrawerEditingSchedule/DrawerEditingScheduleStyle.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "@material-ui/core/styles/withStyles");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/FormControl */ "@material-ui/core/FormControl");
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/RadioGroup */ "@material-ui/core/RadioGroup");
/* harmony import */ var _material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/FormControlLabel */ "@material-ui/core/FormControlLabel");
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/Radio */ "@material-ui/core/Radio");
/* harmony import */ var _material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_16__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  setAxiosAuthentication
} = __webpack_require__(/*! ../../../utils/authentication */ "./utils/authentication.js");



















class DrawerEditingSchedule extends react__WEBPACK_IMPORTED_MODULE_7___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "isDirty", () => {
      return this.state.dirty;
    });

    _defineProperty(this, "onDateSelectionChanged", eventsSelected => {
      this.setState({
        eventsSelected: new Set(eventsSelected)
      });
      setAxiosAuthentication();
      axios__WEBPACK_IMPORTED_MODULE_14___default.a.post('/myAlfred/api/availability/dates', {
        dates: Array(...eventsSelected)
      }).then(result => {
        if (result.data) {
          this.setState({
            available: result.data.available,
            timelapses: result.data.timelapses,
            orgTimelapses: [...result.data.timelapses]
          });
        }
      }); // If one date, get bookings

      if (eventsSelected && eventsSelected.size == 1) {
        const dt = moment__WEBPACK_IMPORTED_MODULE_16___default()([...eventsSelected][0]).format('DD/MM/YYYY');
        console.log(`Date:${dt}`);
        axios__WEBPACK_IMPORTED_MODULE_14___default.a.get('/myAlfred/api/booking/currentAlfred').then(result => {
          var bookings = result.data.filter(b => moment__WEBPACK_IMPORTED_MODULE_16___default()(b.date_prestation, 'DD/MM/YYYY').format('DD/MM/YYYY') == dt);
          console.log(`Found bookings #${bookings.length}`);
          var bkgs = {};
          bookings.forEach(b => {
            const hour = moment__WEBPACK_IMPORTED_MODULE_16___default()(b.time_prestation).hour();
            bkgs[hour] = b.user.picture;
          });
          this.setState({
            bookings: bkgs
          });
        });
      } else {
        this.setState({
          bookings: {}
        });
      }
    });

    _defineProperty(this, "handleAvailabilities", event => {
      this.setState({
        availabilities: event.target.value
      });
    });

    _defineProperty(this, "toggleAvailability", () => {
      this.setState({
        available: !this.state.available,
        dirty: true
      });
    });

    _defineProperty(this, "slotTimerChanged", slotIndex => {
      var timelapses = this.state.timelapses;
      const prev = timelapses[slotIndex];
      const hasUndefined = this.state.orgTimelapses[slotIndex] == null;
      const next = prev == true ? false : prev == null ? true : hasUndefined ? null : true;
      timelapses[slotIndex] = next;
      this.setState({
        timelapses: timelapses,
        dirty: true
      });
    });

    _defineProperty(this, "save", () => {
      axios__WEBPACK_IMPORTED_MODULE_14___default.a.post('/myAlfred/api/availability/addPunctual', {
        punctuals: [...this.state.eventsSelected],
        available: this.state.available,
        timelapses: [...this.state.timelapses]
      }).then(res => {
        this.props.onAvailabilityChanged ? this.props.onAvailabilityChanged() : () => {};
        this.setState({
          eventsSelected: new Set()
        }, () => this.props.onDateSelectionCleared());
      });
    });

    _defineProperty(this, "saveEnabled", () => {
      const enabled = !this.state.available || this.state.timelapses.filter(v => v == true).length > 0;
      return enabled;
    });

    this.state = {
      available: true,
      eventsSelected: new Set(),
      timelapses: Array.from({
        length: 24
      }, () => false),
      orgTimelapses: Array.from({
        length: 24
      }, () => false),
      bookings: {},
      errors: {},
      dirty: false
    };
    this.onDateSelectionChanged = this.onDateSelectionChanged.bind(this);
  }

  render() {
    const {
      classes
    } = this.props;
    const {
      availabilities,
      errors,
      timelapses,
      available,
      bookings
    } = this.state;
    console.log(`Bookings:${JSON.stringify(bookings)}`);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15___default.a, {
      className: classes.policySizeTitle
    }, "Modifier vos disponibilit\xE9s")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_2___default.a, {
      "aria-label": "CLOSE"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_3___default.a, {
      color: 'secondary',
      onClick: this.props.handleDrawer
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_4___default.a, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      style: {
        marginTop: '5vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      style: {
        width: '100%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("h3", null, "\xCAtes-vous disponible ?"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("em", {
      style: {
        color: 'red'
      }
    }, errors.available)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_10___default.a, {
      component: "fieldset"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11___default.a, {
      "aria-label": "availabilities",
      name: "availabilities",
      value: availabilities,
      onChange: this.handleAvailabilities
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_12___default.a, {
      onChange: this.toggleAvailability,
      checked: !this.state.available,
      value: "notavailabilities",
      control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_13___default.a, {
        color: "primary"
      }),
      label: "Indisponible pour la journ\xE9e"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_12___default.a, {
      onChange: this.toggleAvailability,
      checked: this.state.available,
      value: "availabilities",
      control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_13___default.a, {
        color: "primary"
      }),
      label: "Disponible sur ces horaires : "
    }))))), available ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("h3", null, "Vos horaires travaill\xE9s"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("em", {
      style: {
        color: 'red'
      }
    }, errors.timelapses)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      container: true
    }, 'Nuit Matin Après-midi Soirée'.split(' ').map((title, index) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
        item: true,
        className: classes.containerSelectSlotTimer
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("h4", null, title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_SelectSlotTimer_SelectSlotTimer__WEBPACK_IMPORTED_MODULE_5__["default"], {
        arrayLength: 6,
        index: index * 6,
        slots: timelapses,
        bookings: bookings,
        onChange: this.slotTimerChanged
      })));
    }))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      style: {
        marginTop: 30,
        marginBottom: 110
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      style: {
        display: 'flex',
        flexDirection: 'row-reverse'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      disabled: !this.saveEnabled(),
      variant: 'contained',
      color: 'primary',
      style: {
        color: 'white'
      },
      onClick: () => this.save()
    }, "Enregistrer"))))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_9___default()(_DrawerEditingScheduleStyle__WEBPACK_IMPORTED_MODULE_8__["default"], {
  withTheme: true
})(DrawerEditingSchedule));

/***/ }),

/***/ "./components/Drawer/DrawerEditingSchedule/DrawerEditingScheduleStyle.js":
/*!*******************************************************************************!*\
  !*** ./components/Drawer/DrawerEditingSchedule/DrawerEditingScheduleStyle.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  formSchedule: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginBottom: '5%'
    }
  },
  panelFormDays: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  containerSelectSlotTimer: {
    width: '50%',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  policySizeTitle: {
    margin: 0,
    overflowWrap: 'break-word !important',
    fontSize: 24,
    fontWeight: 800,
    lineHeight: '1.25em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color: 'rgb(72, 72, 72)',
    paddingTop: 2,
    paddingBottom: 2
  }
}));

/***/ }),

/***/ "./components/Drawer/DrawerSettingSchedule/DrawerSettingSchedule.js":
/*!**************************************************************************!*\
  !*** ./components/Drawer/DrawerSettingSchedule/DrawerSettingSchedule.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Hidden */ "@material-ui/core/Hidden");
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/IconButton */ "@material-ui/core/IconButton");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/icons/Close */ "@material-ui/icons/Close");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Divider */ "@material-ui/core/Divider");
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/ExpandMore */ "@material-ui/icons/ExpandMore");
/* harmony import */ var _material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_pickers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/pickers */ "@material-ui/pickers");
/* harmony import */ var _material_ui_pickers__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_pickers__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _date_io_date_fns__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @date-io/date-fns */ "@date-io/date-fns");
/* harmony import */ var _date_io_date_fns__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_date_io_date_fns__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var date_fns_locale_fr__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! date-fns/locale/fr */ "date-fns/locale/fr");
/* harmony import */ var date_fns_locale_fr__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(date_fns_locale_fr__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/Chip */ "@material-ui/core/Chip");
/* harmony import */ var _material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _utils_converters__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../utils/converters */ "./utils/converters.js");
/* harmony import */ var _utils_converters__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_utils_converters__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _SelectSlotTimer_SelectSlotTimer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../SelectSlotTimer/SelectSlotTimer */ "./components/SelectSlotTimer/SelectSlotTimer.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "@material-ui/core/styles/withStyles");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _DrawerSettingScheduleStyle__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./DrawerSettingScheduleStyle */ "./components/Drawer/DrawerSettingSchedule/DrawerSettingScheduleStyle.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_17__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





















const {
  timelapsesSetToArray
} = __webpack_require__(/*! ../../../utils/dateutils */ "./utils/dateutils.js");

class DrawerSettingSchedule extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentDidMount", () => {
      this.loadAvailabilities();
    });

    _defineProperty(this, "isDirty", () => {
      const dirty = this.state.dirty;
      return dirty;
    });

    _defineProperty(this, "loadAvailabilities", () => {
      axios__WEBPACK_IMPORTED_MODULE_17___default.a.get('/myAlfred/api/availability/currentAlfred').then(response => {
        const availabilities = response.data.filter(a => !a.is_punctual).map(a => {
          return {
            _id: a._id,
            startDate: new Date(a.period.begin),
            endDate: new Date(a.period.end),
            recurrDays: new Set(a.period.days),
            timelapses: a.timelapses,
            as_text: a.as_text
          };
        });
        const expanded = Array.from({
          length: availabilities.length
        }, () => false);
        this.setState({
          availabilities: availabilities,
          expanded: expanded,
          dirty: false
        });
      }).catch(err => console.error(err));
    });

    _defineProperty(this, "toggleRecurrDay", (dayIndex, availIdx) => {
      this.state.availabilities[availIdx].recurrDays.has(dayIndex) ? this.removeRecurrDay(dayIndex, availIdx) : this.addRecurrDay(dayIndex, availIdx);
      this.setState({
        dirty: true
      });
    });

    _defineProperty(this, "addRecurrDay", (day, availIdx) => {
      let availabilities = this.state.availabilities;
      availabilities[availIdx].recurrDays.add(day);
      this.setState({
        availabilities: availabilities
      });
    });

    _defineProperty(this, "removeRecurrDay", (day, availIdx) => {
      let availabilities = this.state.availabilities;
      availabilities[availIdx].recurrDays.delete(day);
      this.setState({
        availabilities: availabilities
      });
    });

    _defineProperty(this, "onDateSelectionChanged", eventsSelected => {
      this.setState({
        eventsSelected: new Set(eventsSelected)
      });
    });

    _defineProperty(this, "addAvailability", () => {
      var availabilities = this.state.availabilities;
      let newAvailability = {
        _id: null,
        startDate: null,
        endDate: null,
        recurrDays: new Set(),
        timelapses: [],
        as_text: ''
      };
      availabilities.push(newAvailability);
      const expanded = Array.from({
        length: this.state.expanded.length
      }, () => false);
      expanded.push(true);
      this.setState({
        availabilities: availabilities,
        expanded: expanded,
        dirty: true
      });
    });

    _defineProperty(this, "handleDateStart", index => date => {
      var availabilities = this.state.availabilities;
      availabilities[index].startDate = date;
      this.setState({
        availabilities: availabilities,
        dirty: true
      });
    });

    _defineProperty(this, "handleDateEnd", index => date => {
      var availabilities = this.state.availabilities;
      availabilities[index].endDate = date;
      this.setState({
        availabilities: availabilities,
        dirty: true
      });
    });

    _defineProperty(this, "removeAvailability", index => {
      const availability = this.state.availabilities[index];

      if (availability._id) {
        axios__WEBPACK_IMPORTED_MODULE_17___default.a.delete(`/myAlfred/api/availability/${availability._id}`).then(() => {
          this.props.onAvailabilityChanged ? this.props.onAvailabilityChanged() : () => {};
        });
      }

      this.loadAvailabilities();
    });

    _defineProperty(this, "slotTimerChanged", availIdx => slotIndex => {
      let availabilities = this.state.availabilities;
      let tlSet = new Set([...availabilities[availIdx].timelapses]);

      if (tlSet.has(slotIndex)) {
        tlSet.delete(slotIndex);
      } else {
        tlSet.add(slotIndex);
      }

      availabilities[availIdx].timelapses = [...tlSet];
      this.setState({
        availabilities: availabilities,
        dirty: true
      });
    });

    _defineProperty(this, "save", (index, event) => {
      const availability = this.state.availabilities[index];
      axios__WEBPACK_IMPORTED_MODULE_17___default.a.post('/myAlfred/api/availability/addRecurrent', {
        _id: availability._id,
        available: true,
        startDate: availability.startDate,
        endDate: availability.endDate,
        days: [...availability.recurrDays],
        timelapses: [...availability.timelapses]
      }).then(res => {
        var errors = this.state.errors;
        errors[index] = {};
        this.setState({
          errors: errors
        });
        this.props.onAvailabilityChanged ? this.props.onAvailabilityChanged() : () => {};
        this.loadAvailabilities();
      }).catch(err => {
        var errors = this.state.errors;
        errors[index] = err.response.data;
        this.setState({
          errors: errors
        });
      });
    });

    _defineProperty(this, "saveEnabled", availIdx => {
      const availability = this.state.availabilities[availIdx];

      if (availability.recurrDays.size == 0) {
        return false;
      }

      if (availability.timelapses.length == 0) {
        return false;
      }

      if (!availability.startDate || isNaN(availability.startDate.valueOf())) {
        return false;
      }

      if (!availability.endDate || isNaN(availability.endDate.valueOf())) {
        return false;
      }

      return true;
    });

    _defineProperty(this, "addPeriodEnabled", () => {
      const unsaved = this.state.availabilities.some(a => !a._id);
      return !unsaved;
    });

    _defineProperty(this, "onAccordionChange", availIdx => (event, exp) => {
      const expanded = this.state.expanded;
      expanded[availIdx] = exp;
      this.setState({
        expanded: expanded
      });
    });

    this.state = {
      eventsSelected: new Set(),
      availabilities: [],
      expanded: [],
      dirty: false,
      errors: {}
    };
    this.onDateSelectionChanged = this.onDateSelectionChanged.bind(this);
  }

  render() {
    const {
      classes
    } = this.props;
    const {
      availabilities,
      errors,
      expanded
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
      className: classes.policySizeTitle
    }, "Param\xE9trez vos disponibilit\xE9s")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_3___default.a, {
      "aria-label": "CLOSE"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_4___default.a, {
      color: 'secondary',
      onClick: this.props.handleDrawer
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_5___default.a, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginTop: '5vh'
      }
    }, availabilities.map((availResult, availIdx) => {
      const error = errors[availIdx] || {};
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Accordion"], {
        expanded: expanded[availIdx],
        onChange: this.onAccordionChange(availIdx)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["AccordionSummary"], {
        expandIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_7___default.a, null),
        "aria-controls": "panel1a-content",
        id: "Math.random()"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, null, availResult.as_text)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["AccordionDetails"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        style: {
          width: '100%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "P\xE9riode :")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        style: {
          display: 'flex',
          justifyContent: 'space-between'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_pickers__WEBPACK_IMPORTED_MODULE_9__["MuiPickersUtilsProvider"], {
        utils: _date_io_date_fns__WEBPACK_IMPORTED_MODULE_10___default.a,
        locale: date_fns_locale_fr__WEBPACK_IMPORTED_MODULE_11___default.a
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        style: {
          display: 'flex',
          alignItems: 'center'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_pickers__WEBPACK_IMPORTED_MODULE_9__["KeyboardDatePicker"], {
        disableToolbar: true,
        variant: "inline",
        format: "dd/MM/yyyy",
        id: "date-picker-inline",
        label: "Date de d\xE9but",
        className: classes.formSchedule,
        value: availResult.startDate,
        onChange: this.handleDateStart(availIdx),
        KeyboardButtonProps: {
          'aria-label': 'change date'
        },
        autoOk: true
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", {
        style: {
          color: 'red'
        }
      }, error.startDate)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        style: {
          display: 'flex',
          alignItems: 'center'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        style: {
          display: 'flex',
          flexDirection: 'column'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_pickers__WEBPACK_IMPORTED_MODULE_9__["KeyboardDatePicker"], {
        disableToolbar: true,
        variant: "inline",
        format: "dd/MM/yyyy",
        id: "date-picker-inline",
        label: "Date de fin",
        className: classes.formSchedule,
        value: availResult.endDate,
        onChange: this.handleDateEnd(availIdx),
        KeyboardButtonProps: {
          'aria-label': 'change date'
        },
        autoOk: true
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", {
        style: {
          color: 'red'
        }
      }, error.endDate))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Jours travaill\xE9s :")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        container: true,
        className: classes.panelFormDays
      }, [0, 1, 2, 3, 4, 5, 6].map(index => {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_12___default.a, {
          key: index,
          clickable: true,
          label: _utils_converters__WEBPACK_IMPORTED_MODULE_13__["DAYS"][index].charAt(0),
          style: {
            backgroundColor: availabilities[availIdx].recurrDays.has(index) ? '#4fbdd7' : '#c4c4c4'
          },
          className: classes.textFieldChips,
          onClick: () => this.toggleRecurrDay(index, availIdx)
        });
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", {
        style: {
          color: 'red'
        }
      }, error.days)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Horaires travaill\xE9s :"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", {
        style: {
          color: 'red'
        }
      }, error.timelapses)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        container: true
      }, 'Nuit Matin Après-midi Soirée'.split(' ').map((title, index) => {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
          item: true,
          className: classes.containerSelectSlotTimer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SelectSlotTimer_SelectSlotTimer__WEBPACK_IMPORTED_MODULE_14__["default"], {
          arrayLength: 6,
          index: index * 6,
          slots: timelapsesSetToArray(availabilities[availIdx].timelapses),
          bookings: {},
          onChange: this.slotTimerChanged(availIdx)
        })));
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        style: {
          marginTop: 20
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        style: {
          display: 'flex',
          flexDirection: 'row-reverse'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Button"], {
        disabled: !this.saveEnabled(availIdx),
        variant: 'contained',
        color: 'primary',
        style: {
          color: 'white'
        },
        onClick: ev => this.save(availIdx, ev)
      }, "Enregistrer"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Button"], {
        color: 'secondary',
        style: {
          marginRight: 10
        },
        onClick: () => this.removeAvailability(availIdx)
      }, "Supprimer"))))));
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_5___default.a, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginTop: 10,
        marginBottom: 10
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        display: 'flex',
        flexDirection: 'row-reverse'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      disabled: !this.addPeriodEnabled(),
      variant: 'contained',
      color: 'primary',
      style: {
        color: 'white'
      },
      onClick: this.addAvailability
    }, "Ajouter une p\xE9riode"))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_15___default()(_DrawerSettingScheduleStyle__WEBPACK_IMPORTED_MODULE_16__["default"], {
  withTheme: true
})(DrawerSettingSchedule));

/***/ }),

/***/ "./components/Drawer/DrawerSettingSchedule/DrawerSettingScheduleStyle.js":
/*!*******************************************************************************!*\
  !*** ./components/Drawer/DrawerSettingSchedule/DrawerSettingScheduleStyle.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  formSchedule: {
    '& .MuiPickersBasePicker-pickerView': {
      backgroundColor: 'red'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginBottom: '5%'
    }
  },
  panelFormDays: {
    width: '100%',
    display: 'flex'
  },
  containerSelectSlotTimer: {
    width: '50%',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  textFieldChips: {
    color: 'white',
    fontWeight: 'bold',
    margin: 3
  },
  policySizeTitle: {
    margin: 0,
    overflowWrap: 'break-word !important',
    fontSize: 24,
    fontWeight: 800,
    lineHeight: '1.25em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color: 'rgb(72, 72, 72)',
    paddingTop: 2,
    paddingBottom: 2
  }
}));

/***/ }),

/***/ "./components/DrawerSchedule/DrawerSchedule.js":
/*!*****************************************************!*\
  !*** ./components/DrawerSchedule/DrawerSchedule.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Hidden */ "@material-ui/core/Hidden");
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "@material-ui/core/styles/withStyles");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _static_css_components_DrawerSchedule_DrawerSchedule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../static/css/components/DrawerSchedule/DrawerSchedule */ "./static/css/components/DrawerSchedule/DrawerSchedule.js");
/* harmony import */ var _material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Fab */ "@material-ui/core/Fab");
/* harmony import */ var _material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_icons_Settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/icons/Settings */ "@material-ui/icons/Settings");
/* harmony import */ var _material_ui_icons_Settings__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Settings__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Drawer_DrawerEditingSchedule_DrawerEditingSchedule__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Drawer/DrawerEditingSchedule/DrawerEditingSchedule */ "./components/Drawer/DrawerEditingSchedule/DrawerEditingSchedule.js");
/* harmony import */ var _Drawer_DrawerSettingSchedule_DrawerSettingSchedule__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Drawer/DrawerSettingSchedule/DrawerSettingSchedule */ "./components/Drawer/DrawerSettingSchedule/DrawerSettingSchedule.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/SwipeableDrawer */ "@material-ui/core/SwipeableDrawer");
/* harmony import */ var _material_ui_core_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_icons_AddCircleOutline__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/AddCircleOutline */ "@material-ui/icons/AddCircleOutline");
/* harmony import */ var _material_ui_icons_AddCircleOutline__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_AddCircleOutline__WEBPACK_IMPORTED_MODULE_12__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  setAxiosAuthentication
} = __webpack_require__(/*! ../../utils/authentication */ "./utils/authentication.js");















class DrawerSchedule extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentDidMount", () => {
      setAxiosAuthentication();
      axios__WEBPACK_IMPORTED_MODULE_9___default.a.get('/myAlfred/api/availability/currentAlfred').then(res => {
        this.setState({
          availabilities: res.data
        });
      }).catch(err => console.error(err));
    });

    _defineProperty(this, "isDirty", () => {
      return this.drawer.current && this.drawer.current.isDirty();
    });

    _defineProperty(this, "onDateSelectionChanged", eventsSelected => {
      this.setState({
        eventsSelected: new Set(eventsSelected)
      }, () => this.updateDrawerState());
    });

    _defineProperty(this, "updateDrawerState", () => {
      this.drawer.current.onDateSelectionChanged(this.state.eventsSelected);
    });

    _defineProperty(this, "handleDrawerToggle", () => {
      this.setState({
        mobileOpen: !this.state.mobileOpen
      });
    });

    _defineProperty(this, "onAvailabilityChanged", () => {
      this.props.onAvailabilityChanged ? this.props.onAvailabilityChanged() : () => {};
    });

    _defineProperty(this, "onDateSelectionCleared", () => {
      this.setState({
        eventsSelected: new Set()
      }, () => this.props.onDateSelectionCleared());
    });

    this.drawer = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.state = {
      mobileOpen: false,
      eventsSelected: new Set(),
      availabilities: [],
      dirty: false
    };
    this.onDateSelectionChanged = this.onDateSelectionChanged.bind(this);
    this.updateDrawerState = this.updateDrawerState.bind(this);
    this.onAvailabilityChanged = this.onAvailabilityChanged.bind(this);
  }

  render() {
    const {
      classes,
      windows
    } = this.props;
    const {
      mobileOpen
    } = this.state;
    const container = windows !== undefined ? () => windows.document.body : undefined;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
      style: {
        width: '100%',
        height: '100%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_10___default.a, {
      container: container,
      variant: "temporary",
      anchor: 'bottom',
      open: mobileOpen,
      onClose: this.handleDrawerToggle,
      classes: {
        paper: classes.drawerScheduleDrawerPaper,
        paperAnchorBottom: classes.drawerPaperAnchorBottom
      },
      ModalProps: {
        keepMounted: true
      }
    }, this.state.eventsSelected.size > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Drawer_DrawerEditingSchedule_DrawerEditingSchedule__WEBPACK_IMPORTED_MODULE_7__["default"], {
      ref: this.drawer,
      handleDrawer: this.handleDrawerToggle,
      onAvailabilityChanged: this.onAvailabilityChanged,
      onDateSelectionCleared: this.onDateSelectionCleared
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Drawer_DrawerSettingSchedule_DrawerSettingSchedule__WEBPACK_IMPORTED_MODULE_8__["default"], {
      ref: this.drawer,
      handleDrawer: this.handleDrawerToggle,
      onAvailabilityChanged: this.onAvailabilityChanged
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
      style: {
        display: 'flex',
        flexDirection: 'row-reverse'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_1___default.a, {
      only: ['xs']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
      style: {
        marginTop: '5vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11___default.a, {
      startIcon: this.state.eventsSelected.size > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Settings__WEBPACK_IMPORTED_MODULE_6___default.a, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_AddCircleOutline__WEBPACK_IMPORTED_MODULE_12___default.a, null),
      onClick: this.handleDrawerToggle,
      color: 'primary'
    }, this.state.eventsSelected.size > 0 ? 'Modifier vos disponibilités' : 'Paramétrez vos disponibilités'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_1___default.a, {
      only: ['lg', 'xl', 'md', 'sm']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
      style: {
        position: 'fixed',
        bottom: '15vh',
        zIndex: 6,
        right: 0
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_5___default.a, {
      color: "primary",
      "aria-label": "add",
      onClick: this.handleDrawerToggle,
      className: classes.drawerScheduleButton
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Settings__WEBPACK_IMPORTED_MODULE_6___default.a, {
      style: {
        color: 'white'
      }
    }))))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_3___default()(_static_css_components_DrawerSchedule_DrawerSchedule__WEBPACK_IMPORTED_MODULE_4__["default"])(DrawerSchedule));

/***/ }),

/***/ "./components/Information/Information.js":
/*!***********************************************!*\
  !*** ./components/Information/Information.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Dialog */ "@material-ui/core/Dialog");
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/DialogActions */ "@material-ui/core/DialogActions");
/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/DialogContent */ "@material-ui/core/DialogContent");
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/DialogContentText */ "@material-ui/core/DialogContentText");
/* harmony import */ var _material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ "@material-ui/core/DialogTitle");
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _InformationStyle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./InformationStyle */ "./components/Information/InformationStyle.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "@material-ui/core/styles/withStyles");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_8__);










class Information extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  /**
   props:
   - open : true/false
   - onClose : callback when closing
   - text : text or html
   - type : 'info' or 'warning'
   */
  render() {
    const {
      classes,
      open
    } = this.props;
    const type = this.props.type ? this.props.type : 'info';

    if (!open) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_1___default.a, {
      "aria-labelledby": "simple-dialog-title",
      open: this.props.open,
      onClose: this.props.onClose,
      classes: {
        paper: classes.paperOverride
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5___default.a, {
      id: "alert-dialog-title"
    }, this.props.type ? 'Oups !' : 'Info'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_3___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_4___default.a, {
      id: "alert-dialog-description",
      className: classes.textContentDiAlog,
      dangerouslySetInnerHTML: {
        __html: this.props.text
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_2___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6___default.a, {
      onClick: this.props.onClose,
      color: "primary"
    }, "Ok")));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_8___default()(_InformationStyle__WEBPACK_IMPORTED_MODULE_7__["default"])(Information));

/***/ }),

/***/ "./components/Information/InformationStyle.js":
/*!****************************************************!*\
  !*** ./components/Information/InformationStyle.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  paperOverride: {
    backgroundImage: 'url(../../static/assets/img/warning.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundColor: 'white'
  },
  textContentDiAlog: {
    backgroundColor: 'rgba(255,255,255,0.9)'
  }
}));

/***/ }),

/***/ "./components/Schedule/Schedule.js":
/*!*****************************************!*\
  !*** ./components/Schedule/Schedule.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_big_calendar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-big-calendar */ "react-big-calendar");
/* harmony import */ var react_big_calendar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_big_calendar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_converters__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/converters */ "./utils/converters.js");
/* harmony import */ var _utils_converters__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_utils_converters__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _static_css_components_Schedule_Schedule__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../static/css/components/Schedule/Schedule */ "./static/css/components/Schedule/Schedule.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "@material-ui/core/styles/withStyles");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Hidden */ "@material-ui/core/Hidden");
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_10__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













const {
  isDateAvailable,
  isMomentAvailable
} = __webpack_require__(/*! ../../utils/dateutils */ "./utils/dateutils.js");

moment__WEBPACK_IMPORTED_MODULE_3___default.a.locale('fr');
const localizer = Object(react_big_calendar__WEBPACK_IMPORTED_MODULE_1__["momentLocalizer"])(moment__WEBPACK_IMPORTED_MODULE_3___default.a);
/***TODO nbSchedule size manage by parent not itself
 ***/

class Schedule extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "toggleSelection", ({
      start,
      end,
      action
    }) => {
      // Don't select dates before today
      if (moment__WEBPACK_IMPORTED_MODULE_3___default()(start).isBefore(moment__WEBPACK_IMPORTED_MODULE_3___default()().startOf('day'))) {
        return;
      }

      let newDate = moment__WEBPACK_IMPORTED_MODULE_3___default()(start).format('YYYY-MM-DD');
      var eventsSelected = this.state.eventsSelected; // Single selection : replace

      if (this.props.singleSelection) {
        eventsSelected = new Set([newDate]);
      } // Multiple selection : toggle
      else {
          if (!eventsSelected.delete(newDate)) {
            eventsSelected.add(newDate);
          }
        }

      this.setState({
        eventsSelected: eventsSelected
      }, () => this.props.handleSelection(this.state.eventsSelected, start, this.props.mode));
    });

    _defineProperty(this, "onDateSelectionCleared", () => {
      this.setState({
        eventsSelected: new Set()
      });
    });

    _defineProperty(this, "previousMonth", () => {
      let date = new Date(this.state.currentDate);
      date.setDate(1);
      date.setMonth(date.getMonth() - 1);
      this.setState({
        currentDate: date
      });
    });

    _defineProperty(this, "nextMonth", () => {
      let date = new Date(this.state.currentDate);
      date.setDate(1);
      date.setMonth(date.getMonth() + 1);
      this.setState({
        currentDate: date
      });
    });

    this.state = {
      eventsSelected: new Set(),
      view: react_big_calendar__WEBPACK_IMPORTED_MODULE_1__["Views"].MONTH,
      currentDate: new Date()
    };
  }

  render() {
    const {
      title,
      subtitle,
      selectable,
      nbSchedule,
      bookings,
      mode,
      classes
    } = this.props;
    const {
      view,
      eventsSelected,
      currentDate
    } = this.state;
    let events = [];

    if (bookings !== undefined) {
      events = Object(_utils_converters__WEBPACK_IMPORTED_MODULE_5__["bookings2events"])(bookings.filter(b => b.calendar_display));
    }

    if (view === react_big_calendar__WEBPACK_IMPORTED_MODULE_1__["Views"].MONTH) {
      events = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.uniqBy(events, e => e.start.format('DD/MM/YYYY'));
    }

    const customToolbar = toolbar => {
      const goToBack = () => {
        if (this.props.mode === 'month') {
          toolbar.date.setMonth(toolbar.date.getMonth() - 1);
          toolbar.onNavigate('prev');
        } else {
          toolbar.onNavigate('PREV');
        }
      };

      const goToNext = () => {
        if (this.props.mode === 'month') {
          toolbar.date.setMonth(toolbar.date.getMonth() + 1);
          toolbar.onNavigate('prev');
        } else {
          toolbar.onNavigate('NEXT');
        }
      };

      const label = () => {
        const date = moment__WEBPACK_IMPORTED_MODULE_3___default()(toolbar.date);
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true,
          className: classes.schedule_containerToolbar,
          style: {
            justifyContent: this.props.nbSchedule === 1 ? 'space-between' : 'center'
          }
        }, this.props.nbSchedule === 1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7___default.a, {
          onClick: goToBack,
          variant: 'contained'
        }, "\u2039")) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, date.format('MMMM') + ' ' + date.format('YYYY'))), this.props.nbSchedule === 1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7___default.a, {
          onClick: goToNext,
          variant: 'contained'
        }, "\u203A")) : null);
      };

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
        container: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
        className: classes.schedule_customToolbarStyle
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
        style: {
          width: '100%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, label()))));
    };

    const customMonthDateHeader = event => {
      let newDate = moment__WEBPACK_IMPORTED_MODULE_3___default()(event.date).format('YYYY-MM-DD');

      if (event.isOffRange) {
        return null;
      } else if (moment__WEBPACK_IMPORTED_MODULE_3___default()(event.date).isBefore(moment__WEBPACK_IMPORTED_MODULE_3___default()().startOf('day'))) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Typography"], {
          className: classes.schedule_monthDateHeaderLabelOldDay
        }, event.label);
      } else {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.schedule_containerLabelSelector
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_10___default.a, {
          only: ['xs']
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: eventsSelected.has(newDate) ? classes.schedule_labelSelectorActive : classes.schedule_labelSelector
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Typography"], {
          className: classes.schedule_monthDateHeaderLabel
        }, event.label))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_10___default.a, {
          only: ['sm', 'md', 'lg', 'xl']
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: eventsSelected.has(newDate) ? classes.schedule_labelSelectorActive : ''
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Typography"], {
          className: classes.schedule_monthDateHeaderLabel
        }, event.label))));
      }
    };

    const customMonthDateCellWrapper = event => {
      let propsStyle = event.children.props['className'];
      const m = moment__WEBPACK_IMPORTED_MODULE_3___default()(event.value);
      const isAvailable = isDateAvailable(m, this.props.availabilities);

      if (propsStyle === 'rbc-day-bg rbc-off-range-bg') {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.schedule_off_range_style
        });
      } else if (isAvailable && propsStyle === 'rbc-day-bg rbc-today') {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.schedule_today_style_avail
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.schedule_today_style
        }));
      } else if (!isAvailable && propsStyle === 'rbc-day-bg rbc-today') {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.style_today_style_off
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.schedule_today_style
        }));
      } else {
        if (isAvailable) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
            className: classes.schedule_day_style
          });
        } else {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
            className: classes.schedule_non_available_style
          });
        }
      }
    };

    const customMonthEventWrapper = () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
        className: classes.schedule_myEventWrapperStyle
      });
    };

    const customWeekHeader = header => {
      let label = header.label.split(' ');

      const headerContent = () => {
        const m = moment__WEBPACK_IMPORTED_MODULE_3___default()(header.date);
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          item: true,
          style: {
            width: '100%'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          style: {
            color: m.isBefore(moment__WEBPACK_IMPORTED_MODULE_3___default()().startOf('day')) ? '#999999' : 'black'
          }
        }, label[1] + ' ' + label[0])));
      };

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, headerContent()));
    };

    const customMyTimeSlotWrapper = event => {
      const label = () => {
        let date = moment__WEBPACK_IMPORTED_MODULE_3___default()(event.value);
        let resource = event.resource;
        const isAvailable = isMomentAvailable(date, this.props.availabilities);

        if (typeof resource === "undefined") {
          if (date.minutes() === 0) {
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
              className: classes.schedule_timeSlotWrapper
            }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, date.hours() + ':' + date.format('mm')));
          } else {
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null);
          }
        }

        if (!isAvailable) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
            className: classes.schedule_non_available_style
          });
        }
      };

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
        container: true,
        className: classes.schedule_containerTimeSlotWrapper
      }, label());
    };

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
      className: classes.schedule_heightContainer
    }, title || subtitle ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, title ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Typography"], {
      className: classes.schedule_policySizeTitle
    }, title)) : null, subtitle ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: classes.schedule_policySizeContent
    }, subtitle)) : null) : null, this.props.mode === 'month' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
      container: true,
      style: {
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7___default.a, {
      onClick: this.previousMonth,
      variant: 'contained'
    }, "\u2039")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7___default.a, {
      onClick: this.nextMonth,
      variant: 'contained'
    }, "\u203A"))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
      container: true,
      spacing: 2,
      style: {
        padding: 5
      }
    }, [...Array(nbSchedule)].map((x, i) => {
      let date = new Date(currentDate);
      date.setDate(1);
      date.setMonth(date.getMonth() + (i - 1));
      const monthStr = moment__WEBPACK_IMPORTED_MODULE_3___default()(date).format('M');
      const monthEvents = events.filter(e => moment__WEBPACK_IMPORTED_MODULE_3___default()(e.start).format('M') === monthStr);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
        item: true,
        xl: nbSchedule === 1 ? 11 : 4,
        lg: nbSchedule === 1 ? 11 : 4,
        md: nbSchedule === 1 ? 11 : 6,
        sm: nbSchedule === 1 ? 11 : 6,
        xs: 12,
        className: classes.schedule_height,
        key: i
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_big_calendar__WEBPACK_IMPORTED_MODULE_1__["Calendar"], {
        key: date,
        selectable: selectable,
        popup: false,
        culture: 'fr-FR',
        localizer: localizer,
        events: monthEvents,
        views: [react_big_calendar__WEBPACK_IMPORTED_MODULE_1__["Views"].MONTH, react_big_calendar__WEBPACK_IMPORTED_MODULE_1__["Views"].WEEK],
        defaultView: mode,
        defaultDate: mode === 'month' ? date : new Date(),
        onSelectSlot: this.toggleSelection,
        dayLayoutAlgorithm: 'no-overlap',
        scrollToTime: date,
        className: classes.schedule_scheduleMainStyle,
        longPressThreshold: 0,
        components: {
          /* event: MyEvent, // used by each view (Month, Day, Week)
           *   eventWrapper: MyEventWrapper,
           *   eventContainerWrapper: MyEventContainerWrapper,
           *   dateCellWrapper: MyDateCellWrapper,
           *   timeSlotWrapper: MyTimeSlotWrapper,
           *   timeGutterHeader: MyTimeGutterWrapper,
           *   toolbar: MyToolbar,
           *   agenda: {
           *   	 event: MyAgendaEvent // with the agenda view use a different component to render events
           *     time: MyAgendaTime,
           *     date: MyAgendaDate,
           *   },
           *   day: {
           *     header: MyDayHeader,
           *     event: MyDayEvent,
           *   },
           *   week: {
           *     header: MyWeekHeader,
           *     event: MyWeekEvent,
           *   },
           *   month: {
           *     header: MyMonthHeader,
           *     dateHeader: MyMonthDateHeader,
           *     event: MyMonthEvent,
           *   }*/
          month: {
            dateHeader: customMonthDateHeader,
            eventWrapper: customMonthEventWrapper,
            dateCellWrapper: customMonthDateCellWrapper,
            toolbar: customToolbar
          },
          week: {
            toolbar: customToolbar,
            header: customWeekHeader,
            timeSlotWrapper: customMyTimeSlotWrapper
          }
        }
      }));
    })));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_9___default()(_static_css_components_Schedule_Schedule__WEBPACK_IMPORTED_MODULE_8__["default"])(Schedule));

/***/ }),

/***/ "./components/SelectSlotTimer/SelectSlotTimer.js":
/*!*******************************************************!*\
  !*** ./components/SelectSlotTimer/SelectSlotTimer.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/Chip */ "@material-ui/core/Chip");
/* harmony import */ var _material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _SelectSlotTimerStyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SelectSlotTimerStyle */ "./components/SelectSlotTimer/SelectSlotTimerStyle.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "@material-ui/core/styles/withStyles");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Avatar */ "@material-ui/core/Avatar");
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_6__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class SelectSlotTimer extends react__WEBPACK_IMPORTED_MODULE_1___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "toggleTimeSlot", item => {
      this.props.onChange(item);
    });

    _defineProperty(this, "createRender", (arrayLength, index, classes, bookings) => {
      var items = [];
      const anyAvatar = bookings ? Object.keys(bookings).length > 0 : false;

      for (let i = index; i < index + arrayLength; i++) {
        const color = this.props.slots[i] == true ? '#4fbdd7' : this.props.slots[i] == false ? '#c4c4c4' : '';
        const pattern = this.props.slots[i] == null ? 'repeating-linear-gradient(45deg, #4fbdd7 48%, #FFFFFF  50%, #4fbdd7 51%)' : '';
        const avatar = bookings[i] ? `/${bookings[i]}` : null;
        var avatarProp = avatar ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_6___default.a, {
          src: avatar
        }) : anyAvatar ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null) : null;
        items.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_0___default.a, {
          clickable: true,
          label: ('0' + i).slice(-2) + 'h00 - ' + ('0' + (i + 1)).slice(-2) + 'h00',
          style: {
            backgroundColor: color,
            backgroundImage: pattern
          },
          className: classes.textFieldChips,
          avatar: avatarProp,
          onClick: () => {
            this.toggleTimeSlot(i);
          },
          selectable: false
        }));
      }

      return items;
    });

    this.createRender = this.createRender.bind(this);
  }

  render() {
    const {
      classes,
      arrayLength,
      index,
      bookings
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
      style: {
        textAlign: 'center'
      }
    }, this.createRender(arrayLength, index, classes, bookings));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_4___default()(_SelectSlotTimerStyle__WEBPACK_IMPORTED_MODULE_3__["default"], {
  withTheme: true
})(SelectSlotTimer));

/***/ }),

/***/ "./components/SelectSlotTimer/SelectSlotTimerStyle.js":
/*!************************************************************!*\
  !*** ./components/SelectSlotTimer/SelectSlotTimerStyle.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  textFieldChips: {
    color: 'white',
    fontWeight: 'bold',
    margin: 2
  }
}));

/***/ }),

/***/ "./components/Siret/Siret.js":
/*!***********************************!*\
  !*** ./components/Siret/Siret.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/TextField */ "@material-ui/core/TextField");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _static_css_components_Siret_Siret__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../static/css/components/Siret/Siret */ "./static/css/components/Siret/Siret.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









const moment = __webpack_require__(/*! moment */ "moment");

const {
  SIRET
} = __webpack_require__(/*! ../../config/config */ "./config/config.js");

const {
  ENTITES
} = __webpack_require__(/*! ../../utils/consts */ "./utils/consts.js");

moment.locale('fr');
const DATE_COUPURE_INSEE = moment('2020-06-09');

class siret extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "onChange", e => {
      let {
        name,
        value
      } = e.target;

      if (name === 'siret') {
        value = value.replace(/ /g, '');
      }

      if (name === 'creation_date') {
        value = moment(value).format('DD/MM/YYYY');
      }

      this.setState({
        [name]: value
      }, () => {
        this.props.onChange(this.state);

        if (name === 'siret') {
          this.onSubmit();
        }
      });
    });

    _defineProperty(this, "onSubmit", e => {
      const code = this.state.siret;
      const config = {
        headers: {
          Authorization: `Bearer ${SIRET.token}`
        }
      };
      axios__WEBPACK_IMPORTED_MODULE_5___default.a.get(`${SIRET.siretUrl}/${code}`, config).then(res => {
        this.setCompanyData(res.data.etablissement);
      }).catch(err => {
        console.error(err);
        axios__WEBPACK_IMPORTED_MODULE_5___default.a.get(`${SIRET.sirenUrl}/${code}`, config).then(res => {
          this.setCompanyData(res.data);
        }).catch(err => {
          this.setState({
            name: '',
            status: '',
            creation_date: '',
            naf_ape: ''
          }, () => this.props.onChange(this.state));
          console.error(err);
        });
      });
    });

    this.state = {
      siret: '',
      naf_ape: '',
      creation_date: '',
      name: '',
      status: ''
    };

    if (this.props.company) {
      this.state = this.props.company;
    }

    this.onChange = this.onChange.bind(this);
    this.setCompanyData = this.setCompanyData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.company) {
      this.setState(nextProps.company);
    }
  }

  setCompanyData(data) {
    const uniteLegale = data.uniteLegale.periodesUniteLegale ? data.uniteLegale.periodesUniteLegale[0] : data.uniteLegale;
    const date = data.uniteLegale.dateCreationUniteLegale;
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    const result = day + '/' + month + '/' + year;
    this.setState({
      name: uniteLegale.denominationUniteLegale || `${data.uniteLegale.prenomUsuelUniteLegale || uniteLegale.prenomUsuelUniteLegale} ${uniteLegale.nomUniteLegale}`,
      naf_ape: uniteLegale.activitePrincipaleUniteLegale,
      status: ENTITES[uniteLegale.categorieJuridiqueUniteLegale],
      creation_date: result,
      errors: null
    }, () => this.props.onChange(this.state));
  }

  render() {
    const {
      classes
    } = this.props;
    const coupureToday = DATE_COUPURE_INSEE.format('DD/MM/YY') === moment().format('DD/MM/YY');
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, coupureToday ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], {
      style: {
        color: 'red'
      }
    }, "En raison de l'arr\xEAt des serveurs de l'INSEE ce ", `${DATE_COUPURE_INSEE.format('DD/MM/YY')}`, ", nous ne pouvons renseigner automatiquement vos informations \xE0 partir de votre num\xE9ro Siret", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Merci de saisir tous les champs manuellement") : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      spacing: 3
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xl: 12,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_3___default.a, {
      id: "filled-with-placeholder",
      label: "Siret/Siren",
      variant: "outlined",
      name: 'siret',
      value: this.state.siret,
      onChange: this.onChange,
      classes: {
        root: classes.textField
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xl: 6
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", {
      style: {
        color: 'red'
      }
    }, this.state.errors)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      spacing: 3
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xl: 6,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_3___default.a, {
      id: "filled-with-placeholder",
      variant: "outlined",
      type: "date",
      name: 'creation_date',
      value: moment(this.state.creation_date, 'DD/mm/YYYY').format('YYYY-mm-DD'),
      onChange: this.onChange,
      classes: {
        root: classes.textField
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xl: 6,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_3___default.a, {
      id: "filled-with-placeholder",
      label: "Nom",
      variant: "outlined",
      type: "text",
      name: 'name',
      value: this.state.name,
      onChange: this.onChange,
      classes: {
        root: classes.textField
      }
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      spacing: 3
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xl: 6,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_3___default.a, {
      id: "filled-with-placeholder",
      label: "Code NAF/APE",
      variant: "outlined",
      type: "text",
      name: 'naf_ape',
      value: this.state.naf_ape,
      onChange: this.onChange,
      classes: {
        root: classes.textField
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xl: 6,
      xs: 12
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_3___default.a, {
      id: "filled-with-placeholder",
      label: "Statut juridique",
      variant: "outlined",
      type: "text",
      name: 'status',
      value: this.state.status,
      onChange: this.onChange,
      classes: {
        root: classes.textField
      }
    })))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__["withStyles"])(_static_css_components_Siret_Siret__WEBPACK_IMPORTED_MODULE_6__["default"])(siret));

/***/ }),

/***/ "./components/Stepper/Stepper.js":
/*!***************************************!*\
  !*** ./components/Stepper/Stepper.js ***!
  \***************************************/
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
/* harmony import */ var _material_ui_core_Stepper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Stepper */ "@material-ui/core/Stepper");
/* harmony import */ var _material_ui_core_Stepper__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Stepper__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Step__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Step */ "@material-ui/core/Step");
/* harmony import */ var _material_ui_core_Step__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Step__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_StepLabel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/StepLabel */ "@material-ui/core/StepLabel");
/* harmony import */ var _material_ui_core_StepLabel__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_StepLabel__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_icons_ArrowForwardIos__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/icons/ArrowForwardIos */ "@material-ui/icons/ArrowForwardIos");
/* harmony import */ var _material_ui_icons_ArrowForwardIos__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ArrowForwardIos__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _StepperStyle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./StepperStyle */ "./components/Stepper/StepperStyle.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












const ColorlibConnector = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ArrowForwardIos__WEBPACK_IMPORTED_MODULE_8___default.a, {
    style: {
      color: '#9E9E9E'
    }
  });
};

class Stepper extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleReset", () => {
      this.setState({
        setActiveStep: 0
      });
      this.setState({
        activeStep: 0
      });
    });

    this.state = {
      steps: props.isType === 'creaShop' ? this.getStepsCreaShop() : props.isType === 'updateService' ? this.getStepsUpdateService() : props.isType === 'confirmPaiement' ? this.getStepsPayement() : this.getStepsAddService(),
      urlName: ''
    };
  }

  componentDidMount() {
    const url = next_router__WEBPACK_IMPORTED_MODULE_7___default.a.pathname;
    this.setState({
      urlName: url
    });
  }

  getStepsCreaShop() {
    return ['Bienvenue', 'Création', 'Prestations', 'Paramétrage', 'Préférences', 'Atouts', 'Disponibilités', 'Conditions', 'Profil', 'Présentation'];
  }

  getStepsAddService() {
    return ['Ajouter', 'Prestations', 'Paramétrage', 'Préférences', 'Atouts' //TODO a remettre quand les dispos seront affichés dans le schedule /'Indiquez vos disponibilités',
    ];
  }

  getStepsUpdateService() {
    return ['Configurez ce service', 'Modifiez vos prestations', 'Paramétrez votre service', 'Vos préférences de réservation', 'Vos atouts pour ce service !' //TODO a remettre quand les dispos seront affichés dans le schedule /'Indiquez vos disponibilités',
    ];
  }

  getStepsPayement() {
    return ['ADRESSE & FACTURATION', 'PAIEMENT'];
  }

  render() {
    const {
      classes,
      activeStep
    } = this.props;
    const {
      urlName
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.root
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Stepper__WEBPACK_IMPORTED_MODULE_4___default.a, {
      activeStep: activeStep,
      nonLinear: true,
      classes: {
        root: classes.stepperRoot
      },
      style: {
        justifyContent: urlName === '/creaShop/creaShop' ? 'space-around' : 'center'
      },
      connector: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ColorlibConnector, null)
    }, this.state.steps.map(label => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Step__WEBPACK_IMPORTED_MODULE_5___default.a, {
      key: label,
      classes: {
        root: classes.stepRoot
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_StepLabel__WEBPACK_IMPORTED_MODULE_6___default.a, {
      classes: {
        root: classes.stepLabelRoot
      },
      StepIconProps: {
        classes: {
          root: classes.stepIcon
        }
      }
    }, label)))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(_StepperStyle__WEBPACK_IMPORTED_MODULE_9__["default"])(Stepper));

/***/ }),

/***/ "./components/Stepper/StepperStyle.js":
/*!********************************************!*\
  !*** ./components/Stepper/StepperStyle.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  root: {
    overflow: 'hidden',
    width: '100%'
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  responsiveContent: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  stepIcon: {
    '& .MuiStepIcon-text': {
      fill: 'white'
    }
  },
  stepLabelRoot: {
    '& .MuiStepLabel-labelContainer': {
      overflow: 'hidden',
      '& span': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }
  },
  stepRoot: {
    overflow: 'hidden'
  },
  stepperRoot: {
    backgroundColor: 'transparent',
    width: '100%',
    display: 'flex'
  }
}));

/***/ }),

/***/ "./config/client_id.json":
/*!*******************************!*\
  !*** ./config/client_id.json ***!
  \*******************************/
/*! exports provided: web, default */
/***/ (function(module) {

module.exports = {"web":{"client_id":"262922879630-nclt6at6dha15i79aqglu5otun79tpjf.apps.googleusercontent.com","project_id":"my-alfred-mailing","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"gLBU7-3yLcR6LJv9v2NiTUVz"}};

/***/ }),

/***/ "./config/config.js":
/*!**************************!*\
  !*** ./config/config.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  MODES,
  FACEBOOK_PROVIDER,
  GOOGLE_PROVIDER,
  LOCAL_HOST,
  AMAZON_HOST
} = __webpack_require__(/*! ../utils/consts */ "./utils/consts.js");

const {
  MODE
} = __webpack_require__(/*! ../mode */ "./mode.js");

const get_mode = () => {
  if (!Object.values(MODES).includes(MODE)) {
    console.error(`Incorrect startup mode ${MODE}, expecting ${Object.values(MODES)}`);
    process.exit(-1);
  }

  return MODE;
};

const is_production = () => {
  return get_mode() == MODES.PRODUCTION;
};

const is_validation = () => {
  return get_mode() == MODES.VALIDATION;
};

const is_development = () => {
  return get_mode() == MODES.DEVELOPMENT || get_mode() == MODES.DEVELOPMENT_NOSSL;
};

const is_development_nossl = () => {
  return get_mode() == MODES.DEVELOPMENT_NOSSL;
};

const appName = 'myalfred';
const DATABASE_PRODUCTION = 'test-myAlfred';
const DATABASE_TEST = 'test-myAlfred-V2';
const databaseName = MODE == MODES.PRODUCTION ? DATABASE_PRODUCTION : DATABASE_TEST;
const serverPort = process.env.PORT || 3122;
const SERVER_PROD = is_production() || is_development();
const ENABLE_MAILING = is_production();

const source = __webpack_require__(/*! ./client_id.json */ "./config/client_id.json");

const get_host_url = () => {
  const protocol = 'https';
  const hostname = is_development() ? LOCAL_HOST : AMAZON_HOST;
  const port = is_validation() ? ':3122' : '';
  const host_url = `${protocol}://${hostname}${port}/`;
  return host_url;
};

const MANGOPAY_CONFIG_PROD = {
  clientId: 'myalfredprod',
  clientApiKey: 'j8R8fLZmUderNNp27siCqMAJ3y7Bv7BB82trfGuhqSKcYpEZ91',
  baseUrl: 'https://api.mangopay.com'
};
const MANGOPAY_CONFIG_TEST = {
  clientId: 'testmyalfredv2',
  clientApiKey: 'cSNrzHm5YRaQxTdZVqWxWAnyYDphvg2hzBVdgTiAOLmgxvF2oN',
  logClass: () => {}
};
const MANGOPAY_CONFIG = is_production() ? MANGOPAY_CONFIG_PROD : MANGOPAY_CONFIG_TEST;
const completeConfig = {
  default: {
    appName,
    serverPort,
    databaseUrl: process.env.MONGODB_URI || `mongodb://localhost/${databaseName}`,
    jsonOptions: {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  },
  development: {
    appUrl: `http://localhost:${serverPort}`
  },
  production: {
    appUrl: `http://localhost:${serverPort}`
  }
};
const mailConfig = {
  user: 'sebastien.auvray@my-alfred.io',
  clientId: source.web.client_id,
  clientSecret: source.web.client_secret,
  refreshToken: '1//040qqd968fTUmCgYIARAAGAQSNwF-L9Iry-KzNeNu-Eg4YJGYtS9_zn5K4rnt7hxvcsPvh69BEUwhoqslW3oAETeYWLWBxo8zKtk',
  accessToken: 'ya29.Il-7B9vPQ9meRKDhLu1cARHVXyGEiGiIidmgeLCB7LLszjByPxRVWJ8mw_u2AQh5ZXeUiXgPyAX9H-KjgXX7pwArP6Bp_TC1OrMR-fOFAMITK0OuOPWKjk11Z0AUhP4dxw'
};

const computeUrl = req => {
  return 'https://' + req.headers.host;
};

const SIRET = {
  token: 'ca27811b-126c-35db-aaf0-49aea431706e',
  siretUrl: 'https://api.insee.fr/entreprises/sirene/V3/siret',
  sirenUrl: 'https://api.insee.fr/entreprises/sirene/V3/siren'
}; // Enable.disable Google & Facebook login

const ENABLE_GF_LOGIN = false;
const PROVIDERS = ENABLE_GF_LOGIN ? [GOOGLE_PROVIDER, FACEBOOK_PROVIDER] : [];

const displayConfig = () => {
  console.log(`Configuration is:\n\
  \tMode:${get_mode()}\n\
  \tDatabase:${databaseName}\n\
  \tServer prod:${SERVER_PROD}\n\
  \tServer port:${SERVER_PROD ? '80/443' : '3122'}\n\
  \tHost URL:${get_host_url()}\n\
  \tSendInBlue actif:${ENABLE_MAILING}\n\
  \tMangopay clientId:${MANGOPAY_CONFIG.clientId}\
  `);
}; // Public API


module.exports = {
  databaseName: databaseName,
  config: { ...completeConfig.default,
    ...completeConfig["development"]
  },
  completeConfig,
  mailConfig,
  computeUrl,
  SIRET,
  ENABLE_GF_LOGIN,
  GOOGLE_PROVIDER,
  FACEBOOK_PROVIDER,
  PROVIDERS,
  is_production,
  is_validation,
  is_development,
  is_development_nossl,
  SERVER_PROD,
  get_host_url,
  MANGOPAY_CONFIG,
  displayConfig,
  ENABLE_MAILING
};

/***/ }),

/***/ "./mode.js":
/*!*****************!*\
  !*** ./mode.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const MODE = 'development';
module.exports = {
  MODE
};

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

/***/ "./pages/creaShop/creaShop.js":
/*!************************************!*\
  !*** ./pages/creaShop/creaShop.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _creaShopStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./creaShopStyle */ "./pages/creaShop/creaShopStyle.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_CreaShop_CreaShopPresentation_CreaShopPresentation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/CreaShop/CreaShopPresentation/CreaShopPresentation */ "./components/CreaShop/CreaShopPresentation/CreaShopPresentation.js");
/* harmony import */ var _components_Stepper_Stepper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Stepper/Stepper */ "./components/Stepper/Stepper.js");
/* harmony import */ var _components_CreaShop_SelectService_SelectService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/CreaShop/SelectService/SelectService */ "./components/CreaShop/SelectService/SelectService.js");
/* harmony import */ var _components_CreaShop_SelectPrestation_SelectPrestation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/CreaShop/SelectPrestation/SelectPrestation */ "./components/CreaShop/SelectPrestation/SelectPrestation.js");
/* harmony import */ var _components_CreaShop_SettingService_SettingService__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/CreaShop/SettingService/SettingService */ "./components/CreaShop/SettingService/SettingService.js");
/* harmony import */ var _components_CreaShop_BookingPreference_BookingPreference__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/CreaShop/BookingPreference/BookingPreference */ "./components/CreaShop/BookingPreference/BookingPreference.js");
/* harmony import */ var _components_CreaShop_AssetsService_AssetsService__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/CreaShop/AssetsService/AssetsService */ "./components/CreaShop/AssetsService/AssetsService.js");
/* harmony import */ var _components_CreaShop_BookingConditions_BookingConditions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/CreaShop/BookingConditions/BookingConditions */ "./components/CreaShop/BookingConditions/BookingConditions.js");
/* harmony import */ var _components_CreaShop_SettingShop_SettingShop__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/CreaShop/SettingShop/SettingShop */ "./components/CreaShop/SettingShop/SettingShop.js");
/* harmony import */ var _components_CreaShop_IntroduceYou_IntroduceYou__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../components/CreaShop/IntroduceYou/IntroduceYou */ "./components/CreaShop/IntroduceYou/IntroduceYou.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _utils_consts_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../utils/consts.js */ "./utils/consts.js");
/* harmony import */ var _utils_consts_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_utils_consts_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react-toastify */ "react-toastify");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _utils_validationSteps_validationSteps__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../utils/validationSteps/validationSteps */ "./utils/validationSteps/validationSteps.js");
/* harmony import */ var _components_Drawer_DrawerAndSchedule_DrawerAndSchedule__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../components/Drawer/DrawerAndSchedule/DrawerAndSchedule */ "./components/Drawer/DrawerAndSchedule/DrawerAndSchedule.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  setAuthToken,
  setAxiosAuthentication
} = __webpack_require__(/*! ../../utils/authentication */ "./utils/authentication.js");

























const I18N = __webpack_require__(/*! ../../utils/i18n */ "./utils/i18n.js");

const {
  getLoggedUserId
} = __webpack_require__(/*! ../../utils/functions */ "./utils/functions.js");

class creaShop extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentWillUnmount", () => {
      clearInterval(this.intervalId);
    });

    _defineProperty(this, "availabilityCreated", avail => {
      if (avail._id.length === _utils_consts_js__WEBPACK_IMPORTED_MODULE_18__["GID_LEN"]) {
        avail._id = null;
      }

      setAxiosAuthentication();
      axios__WEBPACK_IMPORTED_MODULE_17___default.a.post('/myAlfred/api/availability/add', avail).then(res => {
        this.loadAvailabilities();
      }).catch(err => {
        console.error(err);
      });
    });

    _defineProperty(this, "availabilityUpdate", avail => {
      setAxiosAuthentication();
      axios__WEBPACK_IMPORTED_MODULE_17___default.a.post('/myAlfred/api/availability/update', avail).then(res => {
        this.loadAvailabilities();
      }).catch(err => console.error(err));
    });

    _defineProperty(this, "loadAvailabilities", () => {
      axios__WEBPACK_IMPORTED_MODULE_17___default.a.get('/myAlfred/api/availability/currentAlfred').then(res => {
        this.setState({
          availabilities: res.data
        });
      }).catch(err => console.error(err));
    });

    _defineProperty(this, "handleNext", () => {
      if (this.state.activeStep < 9) {
        this.setState({
          activeStep: this.state.activeStep + 1
        });
      } // last page => post
      else {
          this.setState({
            saving: true
          });

          let cloned_shop = _.cloneDeep(this.state.shop);

          Object.keys(cloned_shop.prestations).forEach(key => {
            if (key < 0) {
              cloned_shop.prestations[key]._id = null;
            }
          });
          cloned_shop.prestations = JSON.stringify(cloned_shop.prestations);
          cloned_shop.equipments = JSON.stringify(cloned_shop.equipments);
          setAxiosAuthentication();
          axios__WEBPACK_IMPORTED_MODULE_17___default.a.post('/myAlfred/api/shop/add', cloned_shop).then(res => {
            axios__WEBPACK_IMPORTED_MODULE_17___default.a.post();
            var su_id = res.data.services[0]._id;

            if (cloned_shop.diplomaPicture !== null) {
              var dpChanged = typeof cloned_shop.diplomaPicture == 'object';
              const formData = new FormData();
              formData.append('name', cloned_shop.diplomaName);
              formData.append('year', cloned_shop.diplomaYear);
              formData.append('file_diploma', dpChanged ? cloned_shop.diplomaPicture : null);
              axios__WEBPACK_IMPORTED_MODULE_17___default.a.post('/myAlfred/api/serviceUser/addDiploma/' + su_id, formData).then().catch(err => console.error(err));
            }

            if (cloned_shop.certificationPicture !== null) {
              var cpChanged = typeof cloned_shop.certificationPicture == 'object';
              const formData = new FormData();
              formData.append('name', cloned_shop.certificationName);
              formData.append('year', cloned_shop.certificationYear);
              formData.append('file_certification', cpChanged ? cloned_shop.certificationPicture : null);
              axios__WEBPACK_IMPORTED_MODULE_17___default.a.post('/myAlfred/api/serviceUser/addCertification/' + su_id, formData).then().catch(err => console.error(err));
            }

            axios__WEBPACK_IMPORTED_MODULE_17___default.a.get('/myAlfred/api/users/token').then(res => {
              setAuthToken();
              next_router__WEBPACK_IMPORTED_MODULE_20___default.a.push(`/profile/services?user=${this.state.user_id}&indexAccount=1`);
            });
          }).catch(err => {
            this.setState({
              saving: false
            });
            console.error(err);
          });
        }
    });

    _defineProperty(this, "handleBack", () => {
      this.setState({
        activeStep: this.state.activeStep - 1
      });
    });

    this.state = {
      activeStep: 0,
      user_id: null,
      saving: false,
      availabilities: [],
      shop: {
        booking_request: true,
        // true/false
        my_alfred_conditions: _utils_consts_js__WEBPACK_IMPORTED_MODULE_18__["ALF_CONDS"].BASIC,
        // BASIC/PICTURE/ID_CARD/RECOMMEND
        welcome_message: 'Merci pour votre réservation!',
        cancel_mode: _utils_consts_js__WEBPACK_IMPORTED_MODULE_18__["CANCEL_MODE"].FLEXIBLE,
        // FLEXIBLE/MODERATE/STRICT
        is_particular: true,
        // true/false : particulier.pro
        company: {
          name: null,
          creation_date: null,
          siret: null,
          naf_ape: null,
          status: null
        },
        //
        is_certified: false,
        service: null,
        description: '',
        // Description de l'expertise
        prestations: {},
        equipments: [],
        // Ids des équipements
        location: null,
        // Lieu(x) de prestation
        travel_tax: 0,
        // Frais de déplacement
        pick_tax: 0,
        // Frais de livraison/enlèvmeent
        minimum_basket: 0,
        diplomaName: null,
        diplomaYear: null,
        diplomaPicture: null,
        certificationName: null,
        certificationYear: null,
        certificationPicture: null,
        deadline_value: 1,
        // Valeur de prévenance
        deadline_unit: 'jours',
        // Unité de prévenance (h:heures, j:jours, s:semaines)
        level: '',
        service_address: null,
        perimeter: 10,
        cesu: null,
        cis: false,
        social_security: null
      }
    };
    this.onServiceChanged = this.onServiceChanged.bind(this);
    this.onPrestaChanged = this.onPrestaChanged.bind(this);
    this.settingsChanged = this.settingsChanged.bind(this);
    this.preferencesChanged = this.preferencesChanged.bind(this);
    this.assetsChanged = this.assetsChanged.bind(this);
    this.availabilityCreated = this.availabilityCreated.bind(this);
    this.availabilityDeleted = this.availabilityDeleted.bind(this);
    this.conditionsChanged = this.conditionsChanged.bind(this);
    this.shopSettingsChanged = this.shopSettingsChanged.bind(this);
    this.introduceChanged = this.introduceChanged.bind(this);
    this.nextDisabled = this.nextDisabled.bind(this);
    this.scheduleDrawer = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.intervalId = null;
  }

  componentDidMount() {
    localStorage.setItem('path', next_router__WEBPACK_IMPORTED_MODULE_20___default.a.pathname);

    if (!getLoggedUserId()) {
      next_router__WEBPACK_IMPORTED_MODULE_20___default.a.push('/login');
    }

    setAxiosAuthentication();
    axios__WEBPACK_IMPORTED_MODULE_17___default.a.get('/myAlfred/api/users/current').then(res => {
      let user = res.data;
      let shop = this.state.shop;
      shop.service_address = user.billing_address;
      this.setState({
        user_id: user._id,
        shop: shop
      });
    }).catch(error => {
      console.error(error);
    });
    this.loadAvailabilities();
    this.intervalId = setInterval(() => {
      if (this.state.activeStep == 6) this.forceUpdate();
    }, 200);
  }

  nextDisabled() {
    let shop = this.state.shop;
    let pageIndex = this.state.activeStep;

    if (pageIndex === 0) {
      return Object(_utils_validationSteps_validationSteps__WEBPACK_IMPORTED_MODULE_21__["creaShopPresentation"])();
    }

    if (pageIndex === 1) {
      return Object(_utils_validationSteps_validationSteps__WEBPACK_IMPORTED_MODULE_21__["selectService"])(shop);
    }

    if (pageIndex === 2) {
      return Object(_utils_validationSteps_validationSteps__WEBPACK_IMPORTED_MODULE_21__["selectPrestation"])(shop);
    }

    if (pageIndex === 3) {
      return Object(_utils_validationSteps_validationSteps__WEBPACK_IMPORTED_MODULE_21__["settingService"])(shop);
    }

    if (pageIndex === 5) {
      return Object(_utils_validationSteps_validationSteps__WEBPACK_IMPORTED_MODULE_21__["assetsService"])(shop);
    }

    if (pageIndex === 6) {
      return this.scheduleDrawer.current && this.scheduleDrawer.current.isDirty();
    }

    if (pageIndex === 8) {
      return Object(_utils_validationSteps_validationSteps__WEBPACK_IMPORTED_MODULE_21__["settingShop"])(shop);
    }

    if (pageIndex === 9) {
      return this.state.saving || Object(_utils_validationSteps_validationSteps__WEBPACK_IMPORTED_MODULE_21__["introduceYou"])(shop);
    }

    return false;
  }

  availabilityDeleted(avail) {
    let shop = this.state.shop;
    shop.availabilities = shop.availabilities.filter(av => av._id !== avail._id);
    this.setState({
      shop: shop
    });
  }

  isRightPanelHidden() {
    return this.state.activeStep === 2 || this.state.activeStep === 6;
  }

  onServiceChanged(service_id) {
    let shop = this.state.shop;
    shop.service = service_id;
    this.setState({
      shop: shop
    });
  }

  onPrestaChanged(prestations) {
    let shop = this.state.shop;
    shop.prestations = prestations;
    this.setState({
      shop: shop
    });
  }

  settingsChanged(location, travel_tax, pick_tax, selectedStuff) {
    let shop = this.state.shop;
    shop.location = location;
    shop.travel_tax = travel_tax;
    shop.pick_tax = pick_tax;
    shop.equipments = selectedStuff;
    this.setState({
      shop: shop
    });
  }

  preferencesChanged(state) {
    let shop = this.state.shop;
    shop.minimum_basket = state.minimum_basket;
    shop.deadline_unit = state.deadline_unit;
    shop.deadline_value = state.deadline_value;
    shop.perimeter = state.perimeter;
    this.setState({
      shop: shop
    });
  }

  assetsChanged(state, index) {
    this.setState({
      shop: { ...this.state.shop,
        description: state.description,
        level: state.level,
        diplomaName: state.diplomaName,
        diplomaYear: state.diplomaYear,
        diplomaPicture: state.diplomaPicture,
        certificationName: state.certificationName,
        certificationYear: state.certificationYear,
        certificationPicture: state.certificationPicture
      }
    });
  }

  conditionsChanged(book_request, conditions) {
    let shop = this.state.shop;
    shop.booking_request = book_request;
    shop.my_alfred_conditions = conditions;
    this.setState({
      shop: shop
    });
  }

  shopSettingsChanged(welcome_message, cancel_mode) {
    let shop = this.state.shop;
    shop.welcome_message = welcome_message;
    shop.cancel_mode = cancel_mode;
    this.setState({
      shop: shop
    });
  }

  introduceChanged(is_particular, company, is_certified, cesu, cis, social_security) {
    let shop = this.state.shop;
    shop.is_particular = is_particular;
    shop.is_certified = is_certified;

    if (is_particular) {
      shop.company = null;
      shop.cesu = cesu;
      shop.cis = false;
      shop.social_security = social_security;
    } else {
      shop.company = company;
      shop.cesu = null;
      shop.cis = cis;
    }

    this.setState({
      shop: shop
    });
  }

  renderSwitch(stepIndex) {
    let shop = this.state.shop;

    switch (stepIndex) {
      case 0:
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_CreaShop_CreaShopPresentation_CreaShopPresentation__WEBPACK_IMPORTED_MODULE_5__["default"], null);

      case 1:
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_CreaShop_SelectService_SelectService__WEBPACK_IMPORTED_MODULE_7__["default"], {
          creation: true,
          onChange: this.onServiceChanged,
          service: shop.service,
          creationBoutique: true
        });

      case 2:
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_CreaShop_SelectPrestation_SelectPrestation__WEBPACK_IMPORTED_MODULE_8__["default"], {
          service: shop.service,
          prestations: shop.prestations,
          onChange: this.onPrestaChanged
        });

      case 3:
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_CreaShop_SettingService_SettingService__WEBPACK_IMPORTED_MODULE_9__["default"], {
          service: shop.service,
          onChange: this.settingsChanged
        });

      case 4:
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_CreaShop_BookingPreference_BookingPreference__WEBPACK_IMPORTED_MODULE_10__["default"], {
          service: shop.service,
          onChange: this.preferencesChanged,
          perimeter: shop.perimeter,
          deadline_unit: shop.deadline_unit,
          deadline_value: shop.deadline_value,
          minimum_basket: shop.minimum_basket
        });

      case 5:
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_CreaShop_AssetsService_AssetsService__WEBPACK_IMPORTED_MODULE_11__["default"], {
          data: shop,
          onChange: this.assetsChanged,
          type: 'creaShop'
        });

      case 6:
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Drawer_DrawerAndSchedule_DrawerAndSchedule__WEBPACK_IMPORTED_MODULE_22__["default"], {
          availabilities: this.state.availabilities,
          title: I18N.SCHEDULE_TITLE,
          subtitle: I18N.SCHEDULE_SUBTITLE,
          nbSchedule: 3,
          availabilityUpdate: this.availabilityUpdate,
          availabilityCreated: this.availabilityCreated,
          onAvailabilityChanged: this.loadAvailabilities,
          onDateSelectionCleared: this.onDateSelectionCleared,
          selectable: true,
          ref: this.scheduleDrawer
        });

      case 7:
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_CreaShop_BookingConditions_BookingConditions__WEBPACK_IMPORTED_MODULE_12__["default"], {
          conditions: shop.my_alfred_conditions,
          booking_request: shop.booking_request,
          onChange: this.conditionsChanged
        });

      case 8:
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_CreaShop_SettingShop_SettingShop__WEBPACK_IMPORTED_MODULE_13__["default"], {
          welcome_message: shop.welcome_message,
          cancel_mode: shop.cancel_mode,
          onChange: this.shopSettingsChanged
        });

      case 9:
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_CreaShop_IntroduceYou_IntroduceYou__WEBPACK_IMPORTED_MODULE_14__["default"], {
          is_particular: shop.is_particular,
          company: shop.company,
          is_certified: shop.is_certified,
          onChange: this.introduceChanged
        });
    }
  }

  render() {
    const {
      classes
    } = this.props;
    let hideRightPanel = this.isRightPanelHidden();
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.mainHeader
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.imageContentHeader
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_15___default.a, {
      href: '/'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      alt: 'logoMyAlfredGreen',
      title: 'logoMyAlfredGreen',
      src: '../../static/assets/icon/logoGreen.svg',
      style: {
        cursor: 'pointer'
      },
      width: 160,
      height: 64
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentStepper
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Stepper_Stepper__WEBPACK_IMPORTED_MODULE_6__["default"], {
      activeStep: this.state.activeStep,
      isType: 'creaShop'
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.marginContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.mainContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: hideRightPanel ? classes.mainContainerNoImg : classes.leftContentComponent
    }, this.renderSwitch(this.state.activeStep)), hideRightPanel ? null : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.rightContentComponent
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.contentRight,
      style: {
        backgroundImage: `url(../../static/assets/icon/creaShopBg.svg)`,
        height: '90vh'
      }
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.footerMainContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.footerContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.marginHr
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
      style: {
        color: 'rgb(255, 249, 249, 0.6)',
        borderRadius: 10
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.navButtonContent
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, false ?
    /*#__PURE__*/
    // FIX : corriger pb retour sur panel précédent
    undefined : null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_16___default.a, {
      variant: "contained",
      color: "secondary",
      className: classes.nextButton,
      onClick: this.handleNext,
      disabled: this.nextDisabled()
    }, this.state.activeStep === 9 ? 'Envoyer' : 'Suivant'))))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__["withStyles"])(_creaShopStyle__WEBPACK_IMPORTED_MODULE_2__["default"])(creaShop));

/***/ }),

/***/ "./pages/creaShop/creaShopStyle.js":
/*!*****************************************!*\
  !*** ./pages/creaShop/creaShopStyle.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  marginContainer: {
    position: 'relative',
    marginLeft: 200,
    marginRight: 200,
    top: 150,
    [theme.breakpoints.down('md')]: {
      top: 150
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 40,
      marginRight: 40
    }
  },
  mainHeader: {
    width: '100%',
    display: 'flex',
    position: 'fixed',
    zIndex: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    [theme.breakpoints.down('md')]: {
      height: 150
    },
    [theme.breakpoints.down('xs')]: {
      height: 150
    }
  },
  imageContentHeader: {
    margin: 'auto',
    width: '10%',
    [theme.breakpoints.down('md')]: {
      width: '20%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '50%'
    }
  },
  contentStepper: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  leftContentComponent: {
    width: '60%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  mainContainerNoImg: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 250
  },
  rightContentComponent: {
    width: '40%',
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  contentRight: {
    width: 'auto',
    height: '100%',
    display: 'block',
    backgroundRepeat: 'no-repeat',
    position: 'sticky'
  },
  footerMainContainer: {
    width: '100%',
    backgroundColor: 'white',
    position: 'fixed',
    bottom: 0,
    zIndex: 4
  },
  footerContainer: {
    height: '100%',
    width: '100%'
  },
  marginHr: {
    marginLeft: 200,
    marginRight: 200,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginRight: 0
    }
  },
  navButtonContent: {
    display: 'flex',
    marginRight: 200,
    marginLeft: 200,
    justifyContent: 'space-between',
    marginBottom: 15,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 40,
      marginRight: 40
    }
  },
  nextButton: {
    color: 'white'
  }
}));

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

/***/ "./static/assets/police/signatra.css":
/*!*******************************************!*\
  !*** ./static/assets/police/signatra.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./static/css/components/DrawerAndSchedule/DrawerAndSchedule.js":
/*!**********************************************************************!*\
  !*** ./static/css/components/DrawerAndSchedule/DrawerAndSchedule.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  drawerAndSchedule_mainContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  drawerAndSchedule_scheduleContainer: {
    width: '100%'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: '35%',
      flexShrink: 0
    }
  }
}));

/***/ }),

/***/ "./static/css/components/DrawerSchedule/DrawerSchedule.js":
/*!****************************************************************!*\
  !*** ./static/css/components/DrawerSchedule/DrawerSchedule.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  drawerScheduleDrawerPaper: {
    width: '90%',
    borderRadius: 17,
    padding: '5%'
  },
  drawerPaperAnchorBottom: {
    left: '10vh',
    [theme.breakpoints.down('md')]: {
      left: 'inherit',
      width: '100%'
    }
  },
  drawerScheduleButton: {
    marginRight: theme.spacing(2)
  }
}));

/***/ }),

/***/ "./static/css/components/Schedule/Schedule.js":
/*!****************************************************!*\
  !*** ./static/css/components/Schedule/Schedule.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  schedule_customToolbarStyle: {
    display: 'flex',
    width: '100%',
    marginBottom: 5
  },
  schedule_monthDateHeaderLabelOldDay: {
    color: '#999999'
  },
  schedule_containerLabelSelector: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  schedule_labelSelectorActive: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4fbdd7',
    borderRadius: 50,
    width: 35,
    height: 35,
    color: 'white'
  },
  schedule_labelSelector: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    '&:hover': {
      backgroundColor: 'rgba(79, 189, 215,0.5)',
      borderRadius: 50,
      width: 35,
      height: 35,
      color: 'white'
    }
  },
  schedule_monthDateHeaderLabel: {
    cursor: 'pointer',
    fontWeight: 'initial'
  },
  schedule_off_range_style: {
    width: '100%',
    height: '100%',
    borderLeft: '1px solid #DDD',
    backgroundColor: 'white'
  },
  schedule_today_style_avail: {
    width: '100%',
    height: '100%',
    borderLeft: '1px solid #DDD',
    backgroundColor: 'white',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  schedule_today_style: {
    borderRadius: 50,
    width: 25,
    height: 25,
    border: '1px solid black'
  },
  style_today_style_off: {
    width: '100%',
    height: '100%',
    borderLeft: '1px solid #DDD',
    backgroundColor: 'lightgray',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  schedule_day_style: {
    width: '100%',
    height: '100%',
    borderLeft: '1px solid #DDD',
    cursor: 'pointer'
  },
  schedule_non_available_style: {
    width: '100%',
    height: 'auto',
    borderLeft: '1px solid #DDD',
    cursor: 'pointer',
    backgroundColor: 'lightgrey',
    background: 'repeating-linear-gradient(45deg, lightgrey 48%, #FFFFFF  50%,lightgrey 51%)'
  },
  schedule_myEventWrapperStyle: {
    borderTop: '25px solid pink',
    borderRight: '25px solid transparent',
    height: 0,
    width: 0,
    borderRadius: 0,
    padding: 0,
    margin: 0,
    marginLeft: 1
  },
  schedule_timeSlotWrapper: {
    textAlign: 'center',
    width: '100%'
  },
  schedule_containerTimeSlotWrapper: {
    flex: '1 0 0'
  },
  schedule_heightContainer: {
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      height: 'inherit !important'
    }
  },
  schedule_policySizeTitle: {
    margin: 0,
    overflowWrap: 'break-word !important',
    fontSize: 24,
    fontWeight: 800,
    lineHeight: '1.25em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color: 'rgb(72, 72, 72)',
    paddingTop: 2,
    paddingBottom: 2
  },
  schedule_policySizeContent: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '1.43em',
    fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important',
    color: 'rgb(72, 72, 72)'
  },
  schedule_height: {
    height: 325
  },
  schedule_scheduleMainStyle: {
    '& .rbc-month-view': {
      borderRadius: 4
    },
    '& .rbc-month-row': {
      display: 'flex',
      justifyContent: 'center'
    },
    '& .rbc-date-cell': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
      height: '100%'
    },
    '& .rbc-row-content': {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center'
    },
    '& .rbc-row-content .rbc-row:nth-child(2)': {
      position: 'absolute',
      width: '100%',
      top: 0
    },
    '& .rbc-day-bg rbc-off-range-bg': {
      display: 'none'
    },
    '& .rbc-header': {
      padding: 0,
      [theme.breakpoints.down('xs')]: {
        whiteSpace: 'inherit !important'
      }
    },
    '& .rbc-event': {
      backgroundColor: 'transparent'
    },
    '& .rbc-row-segment': {
      padding: 0
    },
    '& .rbc-allday-cell': {
      display: 'none'
    },
    '& .rbc-time-view': {
      borderRadius: 5
    },
    '& .rbc-row': {
      flex: 1
    }
  },
  schedule_containerToolbar: {
    alignItems: 'center'
  }
}));

/***/ }),

/***/ "./static/css/components/Siret/Siret.js":
/*!**********************************************!*\
  !*** ./static/css/components/Siret/Siret.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  textField: {
    width: '100%'
  },
  loginContainer: {
    alignItems: 'center',
    height: '100vh',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  card: {
    padding: '1.5rem 3rem',
    width: 400
  },
  cardContant: {
    flexDirection: 'column'
  },
  linkText: {
    textDecoration: 'none',
    color: 'black',
    fontSize: 12
  },
  menu: {
    width: 200
  }
}));

/***/ }),

/***/ "./utils/authentication.js":
/*!*********************************!*\
  !*** ./utils/authentication.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "axios"));

var _reactCookies = _interopRequireDefault(__webpack_require__(/*! react-cookies */ "react-cookies"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setAuthToken = () => {
  if (typeof localStorage == 'undefined') {
    console.error('Can not set auth token, undefined localStorage');
    return null;
  }

  const token = _reactCookies.default.load('token');

  localStorage.setItem('token', token);
};

const setAxiosAuthentication = () => {
  if (typeof localStorage == 'undefined') {
    console.log(`Can not set axios authentication, undefined localStorage`);
    return null;
  }

  const token = localStorage.getItem('token');

  if (token) {
    // Apply to every request
    _axios.default.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete _axios.default.defaults.headers.common['Authorization'];
  }
};

const clearAuthenticationToken = () => {
  if (typeof localStorage == 'undefined') {
    console.log(`Can not clear authentication token, undefined localStorage`);
    return null;
  }

  localStorage.removeItem('token');
};

module.exports = {
  setAxiosAuthentication,
  clearAuthenticationToken,
  setAuthToken
};

/***/ }),

/***/ "./utils/consts.js":
/*!*************************!*\
  !*** ./utils/consts.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const crypto = __webpack_require__(/*! crypto */ "crypto");

const ALL_SERVICES = ['Tous les services', null];
const MODES = {
  PRODUCTION: 'production',
  VALIDATION: 'validation',
  DEVELOPMENT: 'development',
  DEVELOPMENT_NOSSL: 'development_nossl'
};
const ALF_CONDS = {
  // my alfred condiitons
  BASIC: '0',
  PICTURE: '1',
  ID_CARD: '2',
  RECOMMEND: '3'
};
const CANCEL_MODE = {
  FLEXIBLE: '0',
  MODERATE: '1',
  STRICT: '2'
};
const CUSTOM_PRESTATIONS_FLTR = 'Prestations personnalisées';

const generate_id = () => {
  return crypto.randomBytes(20).toString('hex');
};

const GID_LEN = 40;
const COMM_ALFRED = 0.0;
const COMM_CLIENT = 0.18;
const SIRET = {
  token: 'ca27811b-126c-35db-aaf0-49aea431706e',
  siretUrl: 'https://api.insee.fr/entreprises/sirene/V3/siret',
  sirenUrl: 'https://api.insee.fr/entreprises/sirene/V3/siren'
};
const ENTITES = {
  '1000': 'Entrepreneur individuel',
  '2110': 'Indivision entre personnes physiques',
  '2120': 'Indivision avec personne morale',
  '2210': 'Société créée de fait entre personnes physiques',
  '2220': 'Société créée de fait avec personne morale',
  '2310': 'Société en participation entre personnes physiques',
  '2320': 'Société en participation avec personne morale',
  '2385': 'Société en participation de professions libérales',
  '2400': 'Fiducie',
  '2700': 'Paroisse hors zone concordataire',
  '2900': 'Autre groupement de droit privé non doté de la personnalité morale',
  '3110': 'Représentation ou agence commerciale d\'état ou organisme public étranger immatriculé au RCS',
  '3120': 'Société commerciale étrangère immatriculée au RCS',
  '3205': 'Organisation internationale',
  '3210': 'État, collectivité ou établissement public étranger',
  '3220': 'Société étrangère non immatriculée au RCS',
  '3290': 'Autre personne morale de droit étranger',
  '4110': 'Établissement public national à caractère industriel ou commercial doté d\'un comptable public',
  '4120': 'Établissement public national à caractère industriel ou commercial non doté d\'un comptable public',
  '4130': 'Exploitant public',
  '4140': 'Établissement public local à caractère industriel ou commercial',
  '4150': 'Régie d\'une collectivité locale à caractère industriel ou commercial',
  '4160': 'Institution Banque de France',
  '5191': 'Société de caution mutuelle',
  '5192': 'Société coopérative de banque populaire',
  '5193': 'Caisse de crédit maritime mutuel',
  '5194': 'Caisse (fédérale) de crédit mutuel',
  '5195': 'Association coopérative inscrite (droit local Alsace Moselle)',
  '5196': 'Caisse d\'épargne et de prévoyance à forme coopérative',
  '5202': 'Société en nom collectif',
  '5203': 'Société en nom collectif coopérative',
  '5306': 'Société en commandite simple',
  '5307': 'Société en commandite simple coopérative',
  '5308': 'Société en commandite par actions',
  '5309': 'Société en commandite par actions coopérative',
  '5370': 'Société de Participations Financières de Profession Libérale Société en commandite par actions (SPFPL SCA)',
  '5385': 'Société d\'exercice libéral en commandite par actions',
  '5410': 'SARL nationale',
  '5415': 'SARL d\'économie mixte',
  '5422': 'SARL immobilière pour le commerce et l\'industrie (SICOMI)',
  '5426': 'SARL immobilière de gestion',
  '5430': 'SARL d\'aménagement foncier et d\'équipement rural (SAFER)',
  '5431': 'SARL mixte d\'intérêt agricole (SMIA)',
  '5432': 'SARL d\'intérêt collectif agricole (SICA)',
  '5442': 'SARL d\'attribution',
  '5443': 'SARL coopérative de construction',
  '5451': 'SARL coopérative de consommation',
  '5453': 'SARL coopérative artisanale',
  '5454': 'SARL coopérative d\'intérêt maritime',
  '5455': 'SARL coopérative de transport',
  '5458': 'SARL coopérative ouvrière de production (SCOP)',
  '5459': 'SARL union de sociétés coopératives',
  '5460': 'Autre SARL coopérative',
  '5470': 'Société de Participations Financières de Profession Libérale Société à responsabilité limitée (SPFPL SARL)',
  '5485': 'Société d\'exercice libéral à responsabilité limitée',
  '5498': 'SARL unipersonnelle',
  '5499': 'Société à responsabilité limitée (sans autre indication)',
  '5505': 'SA à participation ouvrière à conseil d\'administration',
  '5510': 'SA nationale à conseil d\'administration',
  '5515': 'SA d\'économie mixte à conseil d\'administration',
  '5520': 'Fonds à forme sociétale à conseil d\'administration',
  '5522': 'SA immobilière pour le commerce et l\'industrie (SICOMI) à conseil d\'administration',
  '5525': 'SA immobilière d\'investissement à conseil d\'administration',
  '5530': 'SA d\'aménagement foncier et d\'équipement rural (SAFER) à conseil d\'administration',
  '5531': 'Société anonyme mixte d\'intérêt agricole (SMIA) à conseil d\'administration',
  '5532': 'SA d\'intérêt collectif agricole (SICA) à conseil d\'administration',
  '5542': 'SA d\'attribution à conseil d\'administration',
  '5543': 'SA coopérative de construction à conseil d\'administration',
  '5546': 'SA de HLM à conseil d\'administration',
  '5547': 'SA coopérative de production de HLM à conseil d\'administration',
  '5548': 'SA de crédit immobilier à conseil d\'administration',
  '5551': 'SA coopérative de consommation à conseil d\'administration',
  '5552': 'SA coopérative de commerçants-détaillants à conseil d\'administration',
  '5553': 'SA coopérative artisanale à conseil d\'administration',
  '5554': 'SA coopérative (d\'intérêt) maritime à conseil d\'administration',
  '5555': 'SA coopérative de transport à conseil d\'administration',
  '5558': 'SA coopérative ouvrière de production (SCOP) à conseil d\'administration',
  '5559': 'SA union de sociétés coopératives à conseil d\'administration',
  '5560': 'Autre SA coopérative à conseil d\'administration',
  '5570': 'Société de Participations Financières de Profession Libérale Société anonyme à conseil d\'administration (SPFPL SA à conseil d\'administration)',
  '5585': 'Société d\'exercice libéral à forme anonyme à conseil d\'administration',
  '5599': 'SA à conseil d\'administration (s.a.i.)',
  '5605': 'SA à participation ouvrière à directoire',
  '5610': 'SA nationale à directoire',
  '5615': 'SA d\'économie mixte à directoire',
  '5620': 'Fonds à forme sociétale à directoire',
  '5622': 'SA immobilière pour le commerce et l\'industrie (SICOMI) à directoire',
  '5625': 'SA immobilière d\'investissement à directoire',
  '5630': 'Safer anonyme à directoire',
  '5631': 'SA mixte d\'intérêt agricole (SMIA)',
  '5632': 'SA d\'intérêt collectif agricole (SICA)',
  '5642': 'SA d\'attribution à directoire',
  '5643': 'SA coopérative de construction à directoire',
  '5646': 'SA de HLM à directoire',
  '5647': 'Société coopérative de production de HLM anonyme à directoire',
  '5648': 'SA de crédit immobilier à directoire',
  '5651': 'SA coopérative de consommation à directoire',
  '5652': 'SA coopérative de commerçants-détaillants à directoire',
  '5653': 'SA coopérative artisanale à directoire',
  '5654': 'SA coopérative d\'intérêt maritime à directoire',
  '5655': 'SA coopérative de transport à directoire',
  '5658': 'SA coopérative ouvrière de production (SCOP) à directoire',
  '5659': 'SA union de sociétés coopératives à directoire',
  '5660': 'Autre SA coopérative à directoire',
  '5670': 'Société de Participations Financières de Profession Libérale Société anonyme à Directoire (SPFPL SA à directoire)',
  '5685': 'Société d\'exercice libéral à forme anonyme à directoire',
  '5699': 'SA à directoire (s.a.i.)',
  '5710': 'SAS, société par actions simplifiée',
  '5720': 'Société par actions simplifiée à associé unique ou société par actions simplifiée unipersonnelle',
  '5770': 'Société de Participations Financières de Profession Libérale Société par actions simplifiée (SPFPL SAS)',
  '5785': 'Société d\'exercice libéral par action simplifiée',
  '5800': 'Société européenne',
  '6100': 'Caisse d\'Épargne et de Prévoyance',
  '6210': 'Groupement européen d\'intérêt économique (GEIE)',
  '6220': 'Groupement d\'intérêt économique (GIE)',
  '6316': 'Coopérative d\'utilisation de matériel agricole en commun (CUMA)',
  '6317': 'Société coopérative agricole',
  '6318': 'Union de sociétés coopératives agricoles',
  '6411': 'Société d\'assurance à forme mutuelle',
  '6511': 'Sociétés Interprofessionnelles de Soins Ambulatoires ',
  '6521': 'Société civile de placement collectif immobilier (SCPI)',
  '6532': 'Société civile d\'intérêt collectif agricole (SICA)',
  '6533': 'Groupement agricole d\'exploitation en commun (GAEC)',
  '6534': 'Groupement foncier agricole',
  '6535': 'Groupement agricole foncier',
  '6536': 'Groupement forestier',
  '6537': 'Groupement pastoral',
  '6538': 'Groupement foncier et rural',
  '6539': 'Société civile foncière',
  '6540': 'Société civile immobilière',
  '6541': 'Société civile immobilière de construction-vente',
  '6542': 'Société civile d\'attribution',
  '6543': 'Société civile coopérative de construction',
  '6544': 'Société civile immobilière d\' accession progressive à la propriété',
  '6551': 'Société civile coopérative de consommation',
  '6554': 'Société civile coopérative d\'intérêt maritime',
  '6558': 'Société civile coopérative entre médecins',
  '6560': 'Autre société civile coopérative',
  '6561': 'SCP d\'avocats',
  '6562': 'SCP d\'avocats aux conseils',
  '6563': 'SCP d\'avoués d\'appel',
  '6564': 'SCP d\'huissiers',
  '6565': 'SCP de notaires',
  '6566': 'SCP de commissaires-priseurs',
  '6567': 'SCP de greffiers de tribunal de commerce',
  '6568': 'SCP de conseils juridiques',
  '6569': 'SCP de commissaires aux comptes',
  '6571': 'SCP de médecins',
  '6572': 'SCP de dentistes',
  '6573': 'SCP d\'infirmiers',
  '6574': 'SCP de masseurs-kinésithérapeutes',
  '6575': 'SCP de directeurs de laboratoire d\'analyse médicale',
  '6576': 'SCP de vétérinaires',
  '6577': 'SCP de géomètres experts',
  '6578': 'SCP d\'architectes',
  '6585': 'Autre société civile professionnelle',
  '6588': 'Société civile laitière',
  '6589': 'Société civile de moyens',
  '6595': 'Caisse locale de crédit mutuel',
  '6596': 'Caisse de crédit agricole mutuel',
  '6597': 'Société civile d\'exploitation agricole',
  '6598': 'Exploitation agricole à responsabilité limitée',
  '6599': 'Autre société civile',
  '6901': 'Autre personne de droit privé inscrite au registre du commerce et des sociétés',
  '7111': 'Autorité constitutionnelle',
  '7112': 'Autorité administrative ou publique indépendante',
  '7113': 'Ministère',
  '7120': 'Service central d\'un ministère',
  '7150': 'Service du ministère de la Défense',
  '7160': 'Service déconcentré à compétence nationale d\'un ministère (hors Défense)',
  '7171': 'Service déconcentré de l\'État à compétence (inter) régionale',
  '7172': 'Service déconcentré de l\'État à compétence (inter) départementale',
  '7179': '(Autre) Service déconcentré de l\'État à compétence territoriale',
  '7190': 'Ecole nationale non dotée de la personnalité morale',
  '7210': 'Commune et commune nouvelle',
  '7220': 'Département',
  '7225': 'Collectivité et territoire d\'Outre Mer',
  '7229': '(Autre) Collectivité territoriale',
  '7230': 'Région',
  '7312': 'Commune associée et commune déléguée',
  '7313': 'Section de commune',
  '7314': 'Ensemble urbain',
  '7321': 'Association syndicale autorisée',
  '7322': 'Association foncière urbaine',
  '7323': 'Association foncière de remembrement',
  '7331': 'Établissement public local d\'enseignement',
  '7340': 'Pôle métropolitain',
  '7341': 'Secteur de commune',
  '7342': 'District urbain',
  '7343': 'Communauté urbaine',
  '7344': 'Métropole',
  '7345': 'Syndicat intercommunal à vocation multiple (SIVOM)',
  '7346': 'Communauté de communes',
  '7347': 'Communauté de villes',
  '7348': 'Communauté d\'agglomération',
  '7349': 'Autre établissement public local de coopération non spécialisé ou entente',
  '7351': 'Institution interdépartementale ou entente',
  '7352': 'Institution interrégionale ou entente',
  '7353': 'Syndicat intercommunal à vocation unique (SIVU)',
  '7354': 'Syndicat mixte fermé',
  '7355': 'Syndicat mixte ouvert',
  '7356': 'Commission syndicale pour la gestion des biens indivis des communes',
  '7357': 'Pôle d\'équilibre territorial et rural (PETR)',
  '7361': 'Centre communal d\'action sociale',
  '7362': 'Caisse des écoles',
  '7363': 'Caisse de crédit municipal',
  '7364': 'Établissement d\'hospitalisation',
  '7365': 'Syndicat inter hospitalier',
  '7366': 'Établissement public local social et médico-social',
  '7367': 'Centre Intercommunal d\'action sociale (CIAS)',
  '7371': 'Office public d\'habitation à loyer modéré (OPHLM)',
  '7372': 'Service départemental d\'incendie et de secours (SDIS)',
  '7373': 'Établissement public local culturel',
  '7378': 'Régie d\'une collectivité locale à caractère administratif',
  '7379': '(Autre) Établissement public administratif local',
  '7381': 'Organisme consulaire',
  '7382': 'Établissement public national ayant fonction d\'administration centrale',
  '7383': 'Établissement public national à caractère scientifique culturel et professionnel',
  '7384': 'Autre établissement public national d\'enseignement',
  '7385': 'Autre établissement public national administratif à compétence territoriale limitée',
  '7389': 'Établissement public national à caractère administratif',
  '7410': 'Groupement d\'intérêt public (GIP)',
  '7430': 'Établissement public des cultes d\'Alsace-Lorraine',
  '7450': 'Etablissement public administratif, cercle et foyer dans les armées',
  '7470': 'Groupement de coopération sanitaire à gestion publique',
  '7490': 'Autre personne morale de droit administratif',
  '8110': 'Régime général de la Sécurité Sociale',
  '8120': 'Régime spécial de Sécurité Sociale',
  '8130': 'Institution de retraite complémentaire',
  '8140': 'Mutualité sociale agricole',
  '8150': 'Régime maladie des non-salariés non agricoles',
  '8160': 'Régime vieillesse ne dépendant pas du régime général de la Sécurité Sociale',
  '8170': 'Régime d\'assurance chômage',
  '8190': 'Autre régime de prévoyance sociale',
  '8210': 'Mutuelle',
  '8250': 'Assurance mutuelle agricole',
  '8290': 'Autre organisme mutualiste',
  '8310': 'Comité central d\'entreprise',
  '8311': 'Comité d\'établissement',
  '8410': 'Syndicat de salariés',
  '8420': 'Syndicat patronal',
  '8450': 'Ordre professionnel ou assimilé',
  '8470': 'Centre technique industriel ou comité professionnel du développement économique',
  '8490': 'Autre organisme professionnel',
  '8510': 'Institution de prévoyance',
  '8520': 'Institution de retraite supplémentaire',
  '9110': 'Syndicat de copropriété',
  '9150': 'Association syndicale libre',
  '9210': 'Association non déclarée',
  '9220': 'Association déclarée',
  '9221': 'Association déclarée d\'insertion par l\'économique',
  '9222': 'Association intermédiaire',
  '9223': 'Groupement d\'employeurs',
  '9224': 'Association d\'avocats à responsabilité professionnelle individuelle',
  '9230': 'Association déclarée, reconnue d\'utilité publique',
  '9240': 'Congrégation',
  '9260': 'Association de droit local (Bas-Rhin, Haut-Rhin et Moselle)',
  '9300': 'Fondation',
  '9900': 'Autre personne morale de droit privé',
  '9970': 'Groupement de coopération sanitaire à gestion privée'
};
const CESU = ['Mandatory', 'Optional', 'Disabled'];
const GOOGLE_PROVIDER = 'google';
const FACEBOOK_PROVIDER = 'facebook';
const AMAZON_HOST = 'my-alfred.io';
const LOCAL_HOST = 'lvh.me';
const SKILLS = {
  careful: {
    label: 'Travail soigneux',
    picture: 'careful_work',
    entrieName: 'careful'
  },
  punctual: {
    label: 'Ponctualité',
    picture: 'punctuality',
    entrieName: 'punctual'
  },
  flexible: {
    label: 'Flexibilité',
    picture: 'flexibility',
    entrieName: 'flexible'
  },
  reactive: {
    label: 'Réactivité',
    picture: 'reactivity',
    entrieName: 'reactive'
  }
};
const LANGUAGES = [{
  value: 'Français',
  label: 'Français'
}, {
  value: 'Anglais',
  label: 'Anglais'
}, {
  value: 'Allemand',
  label: 'Allemand'
}, {
  value: 'Espagnol',
  label: 'Espagnol'
}, {
  value: 'Chinois',
  label: 'Chinois'
}, {
  value: 'Arabe',
  label: 'Arabe'
}, {
  value: 'Portugais',
  label: 'Portugais'
}, {
  value: 'Russe',
  label: 'Russe'
}, {
  value: 'Japonais',
  label: 'Japonais'
}];
const MAX_TEXT_SIZE = 300;
module.exports = {
  ALL_SERVICES,
  ALF_CONDS,
  CANCEL_MODE,
  CUSTOM_PRESTATIONS_FLTR,
  generate_id,
  COMM_ALFRED,
  COMM_CLIENT,
  GID_LEN,
  ENTITES,
  CESU,
  MODES,
  GOOGLE_PROVIDER,
  FACEBOOK_PROVIDER,
  AMAZON_HOST,
  LOCAL_HOST,
  SKILLS,
  LANGUAGES,
  MAX_TEXT_SIZE
};

/***/ }),

/***/ "./utils/converters.js":
/*!*****************************!*\
  !*** ./utils/converters.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  RRule,
  RRuleSet,
  rrulestr
} = __webpack_require__(/*! rrule */ "rrule");

const {
  ALL_SERVICES,
  generate_id
} = __webpack_require__(/*! ./consts.js */ "./utils/consts.js");

const moment = __webpack_require__(/*! moment-timezone */ "moment-timezone");

const EV_AVAIL_DAY_MAPPING = 'monday tuesday wednesday thursday friday saturday sunday'.split(' ');
const DAYS = 'Lundi Mardi Mercredi Jeudi Vendredi Samedi Dimanche'.split(' ');
const LONG_DAYS = 'lundis mardis mercredis jeudis vendredis samedis dimanches'.split(' ');
const DAY_MAPPING = {
  'monday': RRule.MO,
  'tuesday': RRule.TU,
  'wednesday': RRule.WE,
  'thursday': RRule.TH,
  'friday': RRule.FR,
  'saturday': RRule.SA,
  'sunday': RRule.SU
};

const addOneYear = dt => {
  let result = new Date(dt.setFullYear(dt.getFullYear() + 1));
  return result;
};

const computeRecurrency = (period, event, dayOfWeek) => {
  if (period.active === false) {
    return [event];
  }

  let rec_end = period.month_end ? new Date(period.month_end) : addOneYear(new Date(period.month_begin));
  const rule = new RRule({
    freq: RRule.WEEKLY,
    byweekday: [DAY_MAPPING[dayOfWeek]],
    dtstart: new Date(period.month_begin),
    until: rec_end
  });
  let all_events = [];
  rule.all().forEach(dt => {
    let start = new Date(dt);
    start.setHours(event.start.getHours(), event.start.getMinutes(), 0);
    let end = new Date(dt);
    end.setHours(event.end.getHours(), event.end.getMinutes(), 0);
    let cp = { ...event,
      start: start,
      end: end
    };
    all_events.push(cp);
  });
  return all_events;
};

const avail2event = availab => {
  let result = [];
  EV_AVAIL_DAY_MAPPING.forEach(day => {
    let evts = availab[day]['event'];
    evts.forEach(e => {
      let title = e.all_services ? 'Disponible' : e.services.map(s => s.label).join('\n');
      let res = {
        _id: availab._id,
        title: title,
        start: new Date(e.begin),
        end: new Date(e.end)
      };
      let re = computeRecurrency(availab.period, res, day);
      result = result.concat(re);
    });
  });
  return result;
};

const availabilities2events = avails => {
  let totalresult = [];
  avails.forEach(avail => totalresult = totalresult.concat(avail2event(avail)));
  return totalresult;
};

const eventUI2availability = event => {
  let avail = {
    _id: event._id == null ? generate_id() : event._id
  };
  let startDate = new Date(event.selectedDateStart);
  let endDate = new Date(event.selectedDateEnd);
  let recurrent = event.recurrDays.size > 0 && event.isExpanded;
  let selDay = (startDate.getDay() + 6) % 7;
  let all_services = event.servicesSelected.indexOf(ALL_SERVICES) > -1;
  let services = [];

  if (!all_services) {
    services = event.servicesSelected.map(s => ({
      label: s[0],
      value: s[1]
    }));
  }

  const inner_event = {
    'begin': startDate,
    'end': endDate,
    services: services,
    all_services: all_services
  };
  EV_AVAIL_DAY_MAPPING.forEach((item, index) => {
    let include = recurrent ? event.recurrDays.has(index) : index == selDay;
    avail[item] = include ? {
      'event': [inner_event]
    } : {
      'event': []
    };
  });

  if (recurrent) {
    avail['period'] = {
      active: true,
      month_begin: new Date(event.selectedDateStart),
      month_end: event.selectedDateEndRecu ? new Date(event.selectedDateEndRecu) : null
    };
  } else {
    avail['period'] = {
      active: false,
      month_begin: null,
      month_end: null
    };
  }

  return avail;
};

const availability2eventUI = avail => {
  var eventUI = {
    _id: avail._id,
    selectedDateStart: null,
    selectedDateEnd: null,
    recurrDays: new Set(),
    isExpanded: avail['period'].active ? 'panel1' : false,
    servicesSelected: [ALL_SERVICES],
    selectedDateEndRecu: null
  };

  if (avail['period'].active) {
    eventUI.isExpanded = 'panel1';
    eventUI.selectedDateEndRecu = avail.period.month_end;
  } else {
    eventUI.isExpanded = false;
  }

  EV_AVAIL_DAY_MAPPING.forEach((day, index) => {
    const ev = avail[day].event;

    if (ev.length > 0) {
      if (eventUI.isExpanded) {
        eventUI.recurrDays.add(index);
      }

      eventUI.selectedDateStart = moment(ev[0].begin).toDate();
      eventUI.selectedDateEnd = moment(ev[0].end).toDate();
      eventUI.selectedTimeStart = moment(ev[0].begin).tz('Europe/Paris').format('HH:mm');
      eventUI.selectedTimeEnd = moment(ev[0].end).tz('Europe/Paris').format('HH:mm');
    }
  });
  return eventUI;
};

const booking2event = booking => {
  let res = {
    _id: booking._id,
    title: booking.service,
    start: moment(booking.date_prestation_moment),
    // TODO : compute proper end date
    end: moment(booking.date_prestation_moment).add(1, 'hours')
  };
  return res;
};

const bookings2events = bookings => {
  if (!bookings) {
    return [];
  }

  const events = bookings.map(booking => booking2event(booking));
  return events;
};

const counterArray = (data, xlabel, ylabel) => {
  const summed = Object.entries(data.reduce((acc, value) => {
    if (value in acc) {
      acc[value] = acc[value] + 1;
    } else {
      acc[value] = 1;
    }

    return acc;
  }, {})).map(([k, v]) => ({
    [xlabel]: k,
    [ylabel]: v
  }));
  return summed;
};

const counterObjects = (data, attribute) => {
  const summed = Object.entries(data.reduce((acc, value) => {
    const age = value[attribute];

    if (age in acc) {
      acc[age] = acc[age] + 1;
    } else {
      acc[age] = 1;
    }

    return acc;
  }, {})).map(([k, v]) => ({
    x: +k,
    y: v
  }));
  return summed;
};

module.exports = {
  availabilities2events,
  eventUI2availability,
  availability2eventUI,
  DAYS,
  LONG_DAYS,
  bookings2events,
  counterArray,
  counterObjects
};

/***/ }),

/***/ "./utils/dateutils.js":
/*!****************************!*\
  !*** ./utils/dateutils.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  RRule,
  RRuleSet,
  rrulestr
} = __webpack_require__(/*! rrule */ "rrule");

const {
  ALL_SERVICES,
  generate_id
} = __webpack_require__(/*! ./consts.js */ "./utils/consts.js");

const isEmpty = __webpack_require__(/*! ../server/validation/is-empty */ "./server/validation/is-empty.js");

var moment = __webpack_require__(/*! moment-timezone */ "moment-timezone");

const {
  extendMoment
} = __webpack_require__(/*! moment-range */ "moment-range");

moment = extendMoment(moment);

const {
  eventUI2availability
} = __webpack_require__(/*! ./converters */ "./utils/converters.js");

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const dayToNumber = day => {
  const index = DAYS.indexOf(day);

  if (index == -1) {
    console.error(`${day} not found in ${DAYS}`);
  }

  return index;
};

const numberToDay = number => {
  if (number < 0 || number >= DAYS.length) {
    console.error(`${number} out of bounds of ${JSON.stringify(DAYS)}`);
  }

  return DAYS[number];
};

const isMomentInEvent = (m, serviceId, event, checkTimeOnly) => {
  if (!event.all_services && !event.services.map(s => s.value).includes(serviceId)) {
    return false;
  }

  const start = moment(event.begin);
  const end = moment(event.end);

  if (checkTimeOnly) {
    const eventStartTime = start.hour() * 60 + start.minutes();
    const eventEndTime = end.hour() * 60 + end.minutes();
    const momentTime = m.hour() * 60 + m.minutes();
    return momentTime >= eventStartTime && momentTime <= eventEndTime;
  } else {
    return m.isAfter(start) && m.isBefore(end);
  }
};

const isMomentInAvail = (m, serviceId, avail) => {
  var period = false; // Check period

  if (avail.period && avail.period.active) {
    var period = true;
    const start = moment(avail.period.month_begin);
    const end = moment(avail.period.month_end);

    if (start.isValid() && m.isBefore(start, 'day')) {
      return false;
    }

    if (end.isValid() && m.isAfter(end, 'day')) {
      return false;
    }
  } // Check day


  const dayName = numberToDay(m.day());
  const events = avail[dayName] ? avail[dayName].event : null;

  if (isEmpty(events)) {
    return false;
  } // Test event. If in period, check only time


  const res = events.some(e => isMomentInEvent(m, serviceId, e, period));

  if (res) {
    console.log(`Moment ${m} in ${JSON.stringify(avail._id)}`);
  }

  return res;
};

const isMomentAvailable = (mom, avails) => {
  const availability = getAvailabilityForDate(mom, avails);

  if (!availability || !availability.available) {
    return false;
  } // Date is ok, check timelapses


  return availability.timelapses.includes(mom.hour());
};

const isIntervalAvailable = (start, end, serviceId, avails) => {
  if (isEmpty(avails)) {
    return true;
  }

  var m = start;

  while (start.isBefore(end)) {
    if (isMomentAvailable(m, avails)) {
      return true;
    }

    ;
    m.add(30, 'minutes');
  }

  return false;
};

const getDeadLine = deadline => {
  var m = moment();

  if (!deadline) {
    return m;
  }

  const dl = deadline.split(' ');
  var value = parseInt(dl[0]);
  const unit = dl[1];

  switch (unit) {
    case 'heures':
      m.add(value, 'hours');
      break;

    case 'jours':
      m.add(value, 'days');
      break;

    case 'semaines':
      m.add(value * 7, 'days');
      break;

    default:
      console.error('getDeadLine unité inconnue:' + unit);
  }

  return m;
};

const booking_datetime_str = booking => {
  return `Le ${booking.date_prestation} à ${moment(booking.time_prestation).tz('Europe/Paris').format('HH:mm')}`;
};

const createDefaultAvailability = () => {
  var start = new Date();
  start = new Date(start.setHours(8));
  start = new Date(start.setMinutes(0));
  start = new Date(start.setSeconds(0));
  start = new Date(start.setMilliseconds(0));
  var end = new Date();
  end = new Date(end.setHours(19));
  end = new Date(end.setMinutes(0));
  end = new Date(end.setSeconds(0));
  end = new Date(end.setMilliseconds(0));
  var dt = new Date(end);
  dt.setMonth(dt.getMonth() + 6);
  const eventUI = {
    _id: generate_id(),
    isExpanded: 'panel1',
    recurrDays: new Set([0, 1, 2, 3, 4, 5]),
    selectedDateStart: start,
    selectedDateEnd: end,
    selectedTimeStart: start.toLocaleTimeString('fr-FR', {
      hour12: false
    }).slice(0, 5),
    selectedTimeEnd: end.toLocaleTimeString('fr-FR', {
      hour12: false
    }).slice(0, 5),
    servicesSelected: [ALL_SERVICES],
    selectedDateEndRecu: dt
  };
  const avail = eventUI2availability(eventUI);
  return avail;
}; // Check if mmt's date is event


const eventIncludesDate = (event, mmt) => {
  return moment(event.begin).format('DD/MM/YYYY') == mmt.format('DD/MM/YYYY');
};

const availIncludesDate = (avail, mmt) => {
  if (avail.is_punctual) {
    return [moment(avail.punctual).isSame(mmt, 'day'), avail.available];
  } else {
    var range = moment.range(avail.period.begin, avail.period.end);

    if (!range.snapTo('day').contains(mmt)) {
      return [false, false];
    }

    return [avail.period.days.includes(mmt.isoWeekday() - 1), avail.available];
  }
}; // Sort availabilities : punctuals before recurrent, then by reverse id ( same order as creation date)


const availabilitiesComparator = (a1, a2) => {
  // Punctual vs recurrent : punctual first
  if (a1.is_punctual != a2.is_punctual) {
    return a1.is_punctual ? -1 : 1;
  }

  return a2._id.toString().localeCompare(a1._id.toString());
};

const getAvailabilityForDate = (mmt, availabilities) => {
  if (!availabilities || availabilities.length == 0) {
    return null;
  }

  const availability = availabilities.sort(availabilitiesComparator).find(avail => availIncludesDate(avail, mmt)[0]);
  return availability;
};
/** Moment mmt's date is available for alfred_id => true/false */


const isDateAvailable = (mmt, availabilities) => {
  if (!availabilities || availabilities.length == 0) {
    return false;
  }

  const availability = getAvailabilityForDate(mmt, availabilities);
  return availability ? availability.available : false;
};
/** Moment mmt's date contains at least one event for alfred_id => true/false */


const hasAlfredDateBooking = (mmt, bookings) => {
  return true;
};
/**
 Returns a timelapse containing true/false/null depending on input availabilities.
 For each timelapse, returns :
  - true if all input are true
  - false if all input are false
  - null if inputs differ
 */


const combineTimelapses = availabilities => {
  if (availabilities.length == 0) {
    return Array.from({
      length: 24
    }, () => false);
  }

  var timelapses = Array.from(Array(24).keys()).map(idx => availabilities[0].timelapses.includes(idx));
  availabilities.forEach(av => {
    timelapses.forEach((value, idx) => {
      if (value != av.timelapses.includes(idx)) {
        timelapses[idx] = null;
      }
    });
  });
  return timelapses;
}; // Converts [1,2,5] => [false, true, true, false, false, true, false...]


const timelapsesSetToArray = timelapses => {
  var result = Array.from({
    length: 24
  }, (v, idx) => timelapses.includes(idx));
  return result;
};

module.exports = {
  isMomentAvailable,
  isIntervalAvailable,
  getDeadLine,
  booking_datetime_str,
  createDefaultAvailability,
  isDateAvailable,
  hasAlfredDateBooking,
  DAYS,
  getAvailabilityForDate,
  combineTimelapses,
  timelapsesSetToArray
};

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

const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");

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
    }), 'km');
  } catch (error) {
    console.log('Error:' + error);
    return null;
  }
};

const computeBookingReference = (user, alfred) => {
  var reference = user.avatar_letters + alfred.avatar_letters + '_' + moment().format('DDMMYYYY');
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

const circular_get = (array, start, length) => {
  var index = start % array.length;
  var res = [];

  while (res.length < length) {
    res.push(index);
    index = (index + 1) % array.length;
  }

  return res;
};

const getLoggedUser = () => {
  if (typeof localStorage == 'undefined') {
    console.log(`Token inconnnu, localStorage non défini`);
    return null;
  }

  const token = localStorage.getItem('token');

  if (token) {
    console.log(`Token:${JSON.stringify(token)}`);
  } else {
    console.log('Pas de token');
    return null;
  }

  const data = token.split(' ')[1];
  const decoded = jwt.decode(data);
  return decoded;
};

const getLoggedUserId = () => {
  const logged = getLoggedUser();
  return logged && logged.id;
};

const isLoggedUserAdmin = () => {
  const logged = getLoggedUser();
  return logged && logged.is_admin;
};

const isLoggedUserAlfred = () => {
  const logged = getLoggedUser();
  return logged && logged.is_alfred;
}; // Returns true if user is the currently logged user


const isEditableUser = user => {
  if (!user || !getLoggedUserId()) {
    return false;
  }

  const isEditable = getLoggedUserId() == user || getLoggedUserId() == user._id;

  return isEditable;
};

module.exports = {
  computeDistanceKm,
  computeBookingReference,
  computeAverageNotes,
  computeSumSkills,
  circular_get,
  getLoggedUserId,
  isLoggedUserAdmin,
  isEditableUser,
  isLoggedUserAlfred
};

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
  BOOKING
};

/***/ }),

/***/ "./utils/social_security.js":
/*!**********************************!*\
  !*** ./utils/social_security.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const checkSocialSecurity = ss => {
  if (!ss || ss.length != 15 || isNaN(parseInt(ss))) {
    return '15 chiffres attendus (13+clé)';
  }

  const number = parseInt(ss.substring(0, 13));
  const key = parseInt(ss.substring(13, 15));
  const remaining = number % 97;

  if (97 - remaining != key) {
    return 'Numéro incorrect';
  }

  return null;
};

module.exports = {
  checkSocialSecurity
};

/***/ }),

/***/ "./utils/text.js":
/*!***********************!*\
  !*** ./utils/text.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const stripBom = __webpack_require__(/*! strip-bom */ "strip-bom");

const ARTICLES = 'le la les un une de des d l à'.split(/ /g);

const normalize = str => {
  const normalized = str.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  return normalized;
}; // Escapes special characters for regex


const escapeText = txt => {
  return txt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const createRegExp = str => {
  str = escapeText(normalize(str)).split(/ |'/g); // Remove articles

  str = str.filter(s => !ARTICLES.includes(s));
  const regexp = new RegExp(str.join('|'), 'i');
  return regexp;
};

const createRegExpAND = str => {
  str = escapeText(normalize(str)).split(/ |'/g); // Remove articles

  str = str.filter(s => !ARTICLES.includes(s));
  const regexp = new RegExp(str.map(s => `(?=.*\\b${s}\\b)`).join(''), 'i');
  return regexp;
};

const createRegExpOR = str => {
  str = escapeText(normalize(str)).split(/ |'/g); // Remove articles

  str = str.filter(s => !ARTICLES.includes(s));
  const regexp = new RegExp(str.map(s => `\\b${s}\\b`).join('|'), 'i');
  return regexp;
};

const createQuery = str => {
  const regexp = createRegExp(str);
  const query = {
    's_label': {
      $regex: regexp
    }
  };
  return query;
};

const matches = (str, keywords) => {
  const regexps = createRegExp(keywords);
  const ok = regexps.test(str);
  return ok;
};

const formatIban = iban => {
  const result = iban.split('').map((l, idx) => (idx + 1) % 4 == 0 ? l + ' ' : l).join('');
  return result;
};

const maskIban = iban => {
  const len = iban.length;
  const masked = iban.slice(0, 4) + 'X'.repeat(len - 8) + iban.slice(-4);
  return masked;
};

const frenchFormat = str => {
  const reg = /de ([éèêàaeiou])/i;
  const result = str.replace(reg, 'd\'$1');
  return result;
};

const normalizePhone = p => {
  if (p) {
    p = p.trim();
    const not_number = /[^\d]/;

    while (p.match(not_number)) {
      p = p.replace(not_number, '');
    }
  }

  return p;
};

const bufferToString = buff => {
  var text = buff.toString('utf-8'); // For MAC files

  text = stripBom(text);
  return text;
};

const ILLEGAL_REGEX = /(O|0|\+33)[O\d \.,-]+\d|\S+@\S+|@\S+/;

const hideIllegal = text => {
  while (text.match(ILLEGAL_REGEX)) {
    text = text.replace(ILLEGAL_REGEX, '[Masqué]');
  }

  return text;
};

module.exports = {
  normalize,
  createQuery,
  matches,
  formatIban,
  maskIban,
  createRegExp,
  createRegExpOR,
  createRegExpAND,
  frenchFormat,
  normalizePhone,
  bufferToString,
  hideIllegal
};

/***/ }),

/***/ "./utils/validationSteps/validationSteps.js":
/*!**************************************************!*\
  !*** ./utils/validationSteps/validationSteps.js ***!
  \**************************************************/
/*! exports provided: creaShopPresentation, selectService, selectPrestation, settingService, assetsService, settingShop, introduceYou */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "creaShopPresentation", function() { return creaShopPresentation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectService", function() { return selectService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectPrestation", function() { return selectPrestation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settingService", function() { return settingService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assetsService", function() { return assetsService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settingShop", function() { return settingShop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "introduceYou", function() { return introduceYou; });
/* harmony import */ var _server_validation_is_empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../server/validation/is-empty */ "./server/validation/is-empty.js");
/* harmony import */ var _server_validation_is_empty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_server_validation_is_empty__WEBPACK_IMPORTED_MODULE_0__);


const {
  CESU
} = __webpack_require__(/*! ../consts */ "./utils/consts.js");

const {
  checkSocialSecurity
} = __webpack_require__(/*! ../social_security */ "./utils/social_security.js");

const creaShopPresentation = () => {
  return false;
};

const selectService = shop => {
  return shop.service == null;
};

const selectPrestation = shop => {
  if (Object.keys(shop.prestations).length === 0) {
    return 'disabled';
  }

  return !Object.values(shop.prestations).every(v => {
    return !(!v.price || !v.billing || _server_validation_is_empty__WEBPACK_IMPORTED_MODULE_0___default()(v.label) || Object.keys(v.billing).length === 0);
  });
};

const settingService = shop => {
  if (shop.location == null) {
    return true;
  }

  if (Object.values(shop.location).every(v => !v)) {
    return true;
  }

  if (isNaN(shop.travel_tax)) {
    return false;
  }

  if (isNaN(shop.pick_tax)) {
    return false;
  }
};

const assetsService = shop => {
  if (_server_validation_is_empty__WEBPACK_IMPORTED_MODULE_0___default()(shop.diplomaName) != _server_validation_is_empty__WEBPACK_IMPORTED_MODULE_0___default()(shop.diplomaYear)) {
    return true;
  }

  if (_server_validation_is_empty__WEBPACK_IMPORTED_MODULE_0___default()(shop.certificationName) != _server_validation_is_empty__WEBPACK_IMPORTED_MODULE_0___default()(shop.certificationYear)) {
    return true;
  }

  return false;
};

const settingShop = shop => {
  if (shop.cancel_mode === '' || shop.cancel_mode == null) {
    return true;
  }
};

const introduceYou = shop => {
  if (shop.is_particular) {
    if (!shop.cesu) {
      return true;
    }

    if ([CESU[0], CESU[1]].includes(shop.cesu)) {
      const res = checkSocialSecurity(shop.social_security);

      if (res) {
        return true;
      }
    }

    return false;
  } // Pro


  if (shop.company == null) {
    return true;
  }

  if (!shop.company.siret) {
    return true;
  }

  if (shop.is_certified === false) {
    return true;
  }

  return false;
};



/***/ }),

/***/ 4:
/*!******************************************!*\
  !*** multi ./pages/creaShop/creaShop.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Edwin\Documents\MyAlfredPro\web\pages\creaShop\creaShop.js */"./pages/creaShop/creaShop.js");


/***/ }),

/***/ "@date-io/date-fns":
/*!************************************!*\
  !*** external "@date-io/date-fns" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@date-io/date-fns");

/***/ }),

/***/ "@material-ui/core":
/*!************************************!*\
  !*** external "@material-ui/core" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core");

/***/ }),

/***/ "@material-ui/core/Avatar":
/*!*******************************************!*\
  !*** external "@material-ui/core/Avatar" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Avatar");

/***/ }),

/***/ "@material-ui/core/Button":
/*!*******************************************!*\
  !*** external "@material-ui/core/Button" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Button");

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

/***/ "@material-ui/core/Fab":
/*!****************************************!*\
  !*** external "@material-ui/core/Fab" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Fab");

/***/ }),

/***/ "@material-ui/core/FormControl":
/*!************************************************!*\
  !*** external "@material-ui/core/FormControl" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/FormControl");

/***/ }),

/***/ "@material-ui/core/FormControlLabel":
/*!*****************************************************!*\
  !*** external "@material-ui/core/FormControlLabel" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/FormControlLabel");

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

/***/ "@material-ui/core/InputAdornment":
/*!***************************************************!*\
  !*** external "@material-ui/core/InputAdornment" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/InputAdornment");

/***/ }),

/***/ "@material-ui/core/MenuItem":
/*!*********************************************!*\
  !*** external "@material-ui/core/MenuItem" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/MenuItem");

/***/ }),

/***/ "@material-ui/core/Radio":
/*!******************************************!*\
  !*** external "@material-ui/core/Radio" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Radio");

/***/ }),

/***/ "@material-ui/core/RadioGroup":
/*!***********************************************!*\
  !*** external "@material-ui/core/RadioGroup" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/RadioGroup");

/***/ }),

/***/ "@material-ui/core/Select":
/*!*******************************************!*\
  !*** external "@material-ui/core/Select" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Select");

/***/ }),

/***/ "@material-ui/core/Step":
/*!*****************************************!*\
  !*** external "@material-ui/core/Step" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Step");

/***/ }),

/***/ "@material-ui/core/StepLabel":
/*!**********************************************!*\
  !*** external "@material-ui/core/StepLabel" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/StepLabel");

/***/ }),

/***/ "@material-ui/core/Stepper":
/*!********************************************!*\
  !*** external "@material-ui/core/Stepper" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Stepper");

/***/ }),

/***/ "@material-ui/core/SwipeableDrawer":
/*!****************************************************!*\
  !*** external "@material-ui/core/SwipeableDrawer" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/SwipeableDrawer");

/***/ }),

/***/ "@material-ui/core/Switch":
/*!*******************************************!*\
  !*** external "@material-ui/core/Switch" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Switch");

/***/ }),

/***/ "@material-ui/core/TextField":
/*!**********************************************!*\
  !*** external "@material-ui/core/TextField" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/TextField");

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

/***/ "@material-ui/icons/Add":
/*!*****************************************!*\
  !*** external "@material-ui/icons/Add" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Add");

/***/ }),

/***/ "@material-ui/icons/AddCircleOutline":
/*!******************************************************!*\
  !*** external "@material-ui/icons/AddCircleOutline" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/AddCircleOutline");

/***/ }),

/***/ "@material-ui/icons/ArrowForwardIos":
/*!*****************************************************!*\
  !*** external "@material-ui/icons/ArrowForwardIos" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/ArrowForwardIos");

/***/ }),

/***/ "@material-ui/icons/CheckCircle":
/*!*************************************************!*\
  !*** external "@material-ui/icons/CheckCircle" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/CheckCircle");

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

/***/ "@material-ui/icons/ExpandMore":
/*!************************************************!*\
  !*** external "@material-ui/icons/ExpandMore" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/ExpandMore");

/***/ }),

/***/ "@material-ui/icons/RadioButtonChecked":
/*!********************************************************!*\
  !*** external "@material-ui/icons/RadioButtonChecked" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/RadioButtonChecked");

/***/ }),

/***/ "@material-ui/icons/RadioButtonUnchecked":
/*!**********************************************************!*\
  !*** external "@material-ui/icons/RadioButtonUnchecked" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/RadioButtonUnchecked");

/***/ }),

/***/ "@material-ui/icons/Settings":
/*!**********************************************!*\
  !*** external "@material-ui/icons/Settings" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Settings");

/***/ }),

/***/ "@material-ui/lab/Autocomplete":
/*!************************************************!*\
  !*** external "@material-ui/lab/Autocomplete" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/lab/Autocomplete");

/***/ }),

/***/ "@material-ui/pickers":
/*!***************************************!*\
  !*** external "@material-ui/pickers" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/pickers");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

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

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "mangopay2-nodejs-sdk/lib/models/KycDocumentStatus":
/*!********************************************************************!*\
  !*** external "mangopay2-nodejs-sdk/lib/models/KycDocumentStatus" ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mangopay2-nodejs-sdk/lib/models/KycDocumentStatus");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "moment-range":
/*!*******************************!*\
  !*** external "moment-range" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment-range");

/***/ }),

/***/ "moment-timezone":
/*!**********************************!*\
  !*** external "moment-timezone" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment-timezone");

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

/***/ "react-big-calendar":
/*!*************************************!*\
  !*** external "react-big-calendar" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-big-calendar");

/***/ }),

/***/ "react-cookies":
/*!********************************!*\
  !*** external "react-cookies" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-cookies");

/***/ }),

/***/ "react-dropdown-select":
/*!****************************************!*\
  !*** external "react-dropdown-select" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dropdown-select");

/***/ }),

/***/ "react-toastify":
/*!*********************************!*\
  !*** external "react-toastify" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-toastify");

/***/ }),

/***/ "rrule":
/*!************************!*\
  !*** external "rrule" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("rrule");

/***/ }),

/***/ "strip-bom":
/*!****************************!*\
  !*** external "strip-bom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("strip-bom");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })

/******/ });
//# sourceMappingURL=creaShop.js.map