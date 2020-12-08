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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/About/About.js":
/*!***********************************!*\
  !*** ./components/About/About.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _static_css_components_About_About__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../static/css/components/About/About */ "./static/css/components/About/About.js");
/* harmony import */ var _ListAlfredConditions_ListAlfredConditions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ListAlfredConditions/ListAlfredConditions */ "./components/ListAlfredConditions/ListAlfredConditions.js");
/* harmony import */ var _material_ui_icons_Room__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/icons/Room */ "@material-ui/icons/Room");
/* harmony import */ var _material_ui_icons_Room__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Room__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_icons_CheckCircleOutline__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/CheckCircleOutline */ "@material-ui/icons/CheckCircleOutline");
/* harmony import */ var _material_ui_icons_CheckCircleOutline__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_CheckCircleOutline__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_icons_ChatBubbleOutlineOutlined__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/icons/ChatBubbleOutlineOutlined */ "@material-ui/icons/ChatBubbleOutlineOutlined");
/* harmony import */ var _material_ui_icons_ChatBubbleOutlineOutlined__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ChatBubbleOutlineOutlined__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Avatar_UserAvatar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Avatar/UserAvatar */ "./components/Avatar/UserAvatar.js");
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ "@material-ui/core/DialogTitle");
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Dialog */ "@material-ui/core/Dialog");
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/DialogContent */ "@material-ui/core/DialogContent");
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _hoc_Topic_Topic__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../hoc/Topic/Topic */ "./hoc/Topic/Topic.js");
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! algolia-places-react */ "algolia-places-react");
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(algolia_places_react__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react-select */ "react-select");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(react_select__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../utils/consts */ "./utils/consts.js");
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_utils_consts__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/icons/Create */ "@material-ui/icons/Create");
/* harmony import */ var _material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../utils/functions */ "./utils/functions.js");
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_utils_functions__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @material-ui/core/IconButton */ "@material-ui/core/IconButton");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @material-ui/icons/Close */ "@material-ui/icons/Close");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @material-ui/core/Divider */ "@material-ui/core/Divider");
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_23__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const {
  setAxiosAuthentication
} = __webpack_require__(/*! ../../utils/authentication */ "./utils/authentication.js");


























const {
  frenchFormat
} = __webpack_require__(/*! ../../utils/text */ "./utils/text.js");

const moment = __webpack_require__(/*! moment */ "moment");

moment.locale('fr');
const DialogTitle = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(_static_css_components_About_About__WEBPACK_IMPORTED_MODULE_4__["default"])(props => {
  const {
    children,
    classes,
    onClose,
    ...other
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_10___default.a, _extends({
    disableTypography: true
  }, other, {
    className: classes.root
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_13___default.a, {
    variant: "h6"
  }, children), onClose ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_21___default.a, {
    "aria-label": "close",
    className: classes.closeButton,
    onClick: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_22___default.a, null)) : null);
});

class About extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentDidMount", () => {
      this.loadUser();
    });

    _defineProperty(this, "onAddressChanged", result => {
      const newAddress = result ? {
        city: result.suggestion.city,
        address: result.suggestion.name,
        zip_code: result.suggestion.postcode,
        country: result.suggestion.country,
        lat: result.suggestion.latlng.lat,
        lng: result.suggestion.latlng.lng
      } : null;
      this.setState({
        newAddress: newAddress
      });
    });

    _defineProperty(this, "onLanguagesChanged", languages => {
      this.setState({
        newLanguages: languages
      });
    });

    _defineProperty(this, "save", () => {
      // TODO: handle errors, remove timeout
      const {
        newAddress,
        newLanguages
      } = this.state;
      setAxiosAuthentication();
      axios__WEBPACK_IMPORTED_MODULE_2___default.a.put('/myAlfred/api/users/profile/billingAddress', newAddress);
      axios__WEBPACK_IMPORTED_MODULE_2___default.a.put('/myAlfred/api/users/profile/languages', {
        languages: newLanguages.map(l => l.value)
      });
      this.setState({
        showEdition: false
      }, () => setTimeout(this.loadUser, 1000));
    });

    _defineProperty(this, "closeEditDialog", () => {
      this.setState({
        showEdition: false,
        newLanguages: null,
        newAddress: null
      });
    });

    _defineProperty(this, "modalEditDialog", classes => {
      const {
        newLabel,
        newPicture,
        user,
        newAddress,
        newLanguages,
        showEdition,
        indexNewAddress
      } = this.state;
      const enabled = newAddress;
      const placeholder = newAddress ? `${newAddress.city}, ${newAddress.country}` : 'Entrez votre adresse';
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_11___default.a, {
        open: showEdition,
        onClose: this.closeEditDialog,
        "aria-labelledby": "alert-dialog-title",
        "aria-describedby": "alert-dialog-description"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DialogTitle, {
        id: "customized-dialog-title",
        onClose: this.closeEditDialog,
        style: {
          position: 'absolute',
          right: 0
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_12___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hoc_Topic_Topic__WEBPACK_IMPORTED_MODULE_15__["default"], {
        titleTopic: 'Modifiez vos informations',
        titleSummary: 'Ici, vous pouvez modifier vos informations',
        underline: true
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        container: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        container: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        item: true,
        xs: 12,
        lg: 12,
        style: {
          marginTop: '2vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        style: {
          fontWeight: 'bold',
          textTransform: 'initial'
        }
      }, "Lieu d'habitation")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        item: true,
        style: {
          width: '100%',
          marginTop: '3vh',
          marginBottom: '3vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(algolia_places_react__WEBPACK_IMPORTED_MODULE_16___default.a, {
        key: moment(),
        placeholder: placeholder,
        options: {
          appId: 'plKATRG826CP',
          apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
          language: 'fr',
          countries: ['fr'],
          type: 'address'
        },
        onChange: this.onAddressChanged,
        onClear: () => this.onAddressChanged(null)
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        container: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        item: true,
        xs: 12,
        lg: 12,
        style: {
          marginTop: '2vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_13___default.a, {
        style: {
          fontWeight: 'bold',
          textTransform: 'initial'
        }
      }, "Langues parl\xE9es")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        item: true,
        xs: 12,
        style: {
          marginTop: '3vh',
          marginBottom: '3vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_17___default.a, {
        key: moment(),
        value: newLanguages,
        onChange: this.onLanguagesChanged,
        options: _utils_consts__WEBPACK_IMPORTED_MODULE_18__["LANGUAGES"],
        styles: {
          menu: provided => ({ ...provided,
            zIndex: 2
          })
        },
        isMulti: true,
        isSearchable: true,
        closeMenuOnSelect: false,
        placeholder: 'Sélectionnez vos langues',
        noOptionsMessage: () => 'Plus d\'options disponibles'
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        style: {
          marginTop: '2vh',
          width: '100%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_23___default.a, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        style: {
          marginTop: '2vh',
          width: '100%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_14___default.a, {
        onClick: () => {
          this.save();
        },
        variant: "contained",
        classes: {
          root: classes.buttonSave
        },
        disabled: !enabled
      }, "Modifier"))))));
    });

    _defineProperty(this, "openEdition", () => {
      const {
        user
      } = this.state;
      this.setState({
        showEdition: true,
        newLanguages: user.languages.map(l => ({
          value: l,
          label: l
        })),
        newAddress: user.billing_address
      });
    });

    this.state = {
      user: null,
      newAddress: null,
      newLanguages: null,
      showEdition: false
    };
    this.save = this.save.bind(this);
    this.loadUser = this.loadUser.bind(this);
  }

  loadUser() {
    setAxiosAuthentication();
    axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(`/myAlfred/api/users/users/${this.props.user}`).then(res => {
      const user = res.data;
      this.setState({
        user: user
      });
    }).catch(err => console.error(err));
  }

  render() {
    const {
      displayTitlePicture,
      classes
    } = this.props;
    const {
      user,
      newLanguages
    } = this.state;
    var place = user ? user.billing_address.city : "Pas d'adresse";
    const editable = Object(_utils_functions__WEBPACK_IMPORTED_MODULE_20__["isEditableUser"])(user);
    const wrapperComponentProps = user ? [{
      label: 'Lieu',
      summary: place,
      IconName: user.firstname ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Room__WEBPACK_IMPORTED_MODULE_6___default.a, {
        fontSize: "large"
      }) : ''
    }, {
      label: 'Langues',
      summary: user.languages.join(',') || 'Français',
      IconName: user.firstname ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ChatBubbleOutlineOutlined__WEBPACK_IMPORTED_MODULE_8___default.a, {
        fontSize: "large"
      }) : ''
    }, {
      label: 'Vérification',
      summary: user.id_card_status_text,
      IconName: user.firstname ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_CheckCircleOutline__WEBPACK_IMPORTED_MODULE_7___default.a, {
        fontSize: "large"
      }) : ''
    }] : null;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }
    }, displayTitlePicture ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, frenchFormat(`A propos de ${user ? user.firstname : ''}`)) : null, editable ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        position: 'absolute',
        right: 0
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_21___default.a, {
      "aria-label": "edit",
      onClick: this.openEdition
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_19___default.a, null))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        display: 'flex',
        flexDirection: 'row'
      }
    }, displayTitlePicture ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginLeft: '1%',
        marginRight: '1%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Avatar_UserAvatar__WEBPACK_IMPORTED_MODULE_9__["default"], {
      user: user
    })) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ListAlfredConditions_ListAlfredConditions__WEBPACK_IMPORTED_MODULE_5__["default"], {
      wrapperComponentProps: wrapperComponentProps,
      columnsXl: 12,
      columnsLG: 12,
      columnsMD: 6,
      columnsSm: 6,
      columnsXS: 6
    })), this.modalEditDialog(classes));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(_static_css_components_About_About__WEBPACK_IMPORTED_MODULE_4__["default"])(About));

/***/ }),

/***/ "./components/AskQuestion/AskQuestion.js":
/*!***********************************************!*\
  !*** ./components/AskQuestion/AskQuestion.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);





class AskQuestion extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    axios__WEBPACK_IMPORTED_MODULE_3___default.a.get(`/myAlfred/api/shop/alfred/${this.props.user}`).then(response => {
      let user = response.data;
      this.setState({
        user: user.alfred
      });
    }).catch(err => console.error(err));
  }

  render() {
    const {
      user
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, `Vous souhaitez poser une question à ${user.firstname} ?`)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, null, `Rendez-vous sur la page du service qui vous intéresse, cliquez sur « demande d’informations » en dessous du bouton réserver. Vous pourrez alors poser toutes vos questions à  ${user.firstname}!`)));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (AskQuestion);

/***/ }),

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
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _UserAvatarStyle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./UserAvatarStyle */ "./components/Avatar/UserAvatarStyle.js");
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/functions */ "./utils/functions.js");
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_utils_functions__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_9__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  setAxiosAuthentication
} = __webpack_require__(/*! ../../utils/authentication */ "./utils/authentication.js");











const {
  getLoggedUserId
} = __webpack_require__(/*! ../../utils/functions */ "./utils/functions.js");



const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");

class UserAvatar extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "checkWarnings", token => {
      setAxiosAuthentication();
      var kyc = [];
      axios__WEBPACK_IMPORTED_MODULE_6___default.a.get('/myAlfred/api/chatRooms/nonViewedMessagesCount').then(res => {
        const nbMessages = res.data;

        if (nbMessages > 0) {
          const plural = nbMessages === 1 ? '' : 's';
          kyc.push(`Vous avez ${res.data} message${plural} non lu${plural}`);
        }

        return axios__WEBPACK_IMPORTED_MODULE_6___default.a.get('/myAlfred/api/users/current');
      }).then(res => {
        const user = res.data;

        if (user.id_card_error_text) {
          kyc.push(user.id_card_error_text);
        }
      }).then(() => {
        this.setState({
          kyc: kyc.length > 0 ? kyc : null
        });
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

    _defineProperty(this, "selectPicture", () => {
      if (Object(_utils_functions__WEBPACK_IMPORTED_MODULE_8__["isEditableUser"])(this.props.user)) {
        this.fileInput.click();
      }
    });

    _defineProperty(this, "onChange", event => {
      const newPicture = event.target.files[0];
      const formData = new FormData();
      formData.append('myImage', newPicture);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      axios__WEBPACK_IMPORTED_MODULE_6___default.a.post('/myAlfred/api/users/profile/picture', formData, config).then(response => {
        // TODO: reload only avatar using setState
        window.location.reload(false);
      }).catch();
    });

    this.state = {
      anchorEl: null,
      currentUser: '',
      kyc: null,
      owner: false,
      userId: ''
    };
    this.interval_id = null;
  }

  componentDidMount() {
    const user_id = getLoggedUserId();

    if (user_id) {
      this.setState({
        currentUser: user_id
      }, () => {
        // Check once then every 20s
        if (this.props.warnings === true) {
          this.checkWarnings(token);
          this.interval_id = setInterval(() => this.checkWarnings(token), 20000);
        }
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval_id);
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
      className: className,
      onClick: this.selectPicture
    });
  }

  avatarWithoutPics(user, className) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1___default.a, {
      alt: "photo de profil",
      className: className,
      onClick: this.selectPicture
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, user.avatar_letters));
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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
        style: {
          width: '100%',
          height: '100%'
        }
      }, owner && kyc ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Badge__WEBPACK_IMPORTED_MODULE_3___default.a, {
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
      }, user.picture ? this.avatarWithPics(user, className) : this.avatarWithoutPics(user, className)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        id: "file",
        ref: fileInput => this.fileInput = fileInput,
        style: {
          display: 'none'
        },
        name: "myImage",
        type: "file",
        onChange: this.onChange,
        className: "form-control",
        accept: 'image/*'
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Popover__WEBPACK_IMPORTED_MODULE_5___default.a, {
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
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, kyc.map(res => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, res))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
        style: {
          display: 'flex',
          justifyContent: 'center',
          height: '100%',
          alignItems: 'center',
          width: '100%'
        }
      }, user.picture ? this.avatarWithPics(user, className) : this.avatarWithoutPics(user, className), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        id: "file",
        ref: fileInput => this.fileInput = fileInput,
        style: {
          display: 'none'
        },
        name: "myImage",
        type: "file",
        onChange: this.onChange,
        className: "form-control",
        accept: 'image/*'
      })));
    } else {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1___default.a, {
        alt: "photo de profil",
        src: "/static/basicavatar.png",
        className: className
      });
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(_UserAvatarStyle__WEBPACK_IMPORTED_MODULE_7__["default"])(UserAvatar));

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

/***/ "./components/Badges/Badges.js":
/*!*************************************!*\
  !*** ./components/Badges/Badges.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _BadgesStyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BadgesStyle */ "./components/Badges/BadgesStyle.js");
/* harmony import */ var _hoc_Topic_Topic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hoc/Topic/Topic */ "./hoc/Topic/Topic.js");
/* harmony import */ var _Box_Box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Box/Box */ "./components/Box/Box.js");







class Badges extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hoc_Topic_Topic__WEBPACK_IMPORTED_MODULE_4__["default"], {
      titleTopic: 'Badges'
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(_BadgesStyle__WEBPACK_IMPORTED_MODULE_3__["default"], {
  withTheme: true
})(Badges));

/***/ }),

/***/ "./components/Badges/BadgesStyle.js":
/*!******************************************!*\
  !*** ./components/Badges/BadgesStyle.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  skillsContainer: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  skillCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 105,
    [theme.breakpoints.down('xs')]: {
      width: '50%',
      margin: 0
    }
  },
  avatarSize: {
    width: 50,
    height: 50
  },
  skillTitle: {
    fontSize: '0.8rem',
    color: 'rgba(84,89,95,0.95)',
    fontWeight: 'bold'
  },
  skillValue: {
    fontSize: '0.7rem',
    color: 'rgba(84,89,95,0.95)'
  },
  shape: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

/***/ }),

/***/ "./components/Box/Box.js":
/*!*******************************!*\
  !*** ./components/Box/Box.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BoxStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BoxStyle */ "./components/Box/BoxStyle.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "@material-ui/core/styles/withStyles");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__);





class Box extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    const {
      classes,
      children
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      className: classes.borderBox
    }, children);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_2___default()(_BoxStyle__WEBPACK_IMPORTED_MODULE_1__["default"])(Box));

/***/ }),

/***/ "./components/Box/BoxStyle.js":
/*!************************************!*\
  !*** ./components/Box/BoxStyle.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  borderBox: {
    borderRadius: 17,
    border: '1px solid rgba(210, 210, 210, 0.5)',
    paddingLeft: '10%',
    paddingTop: '5%',
    paddingBottom: '5%',
    paddingRight: '10%',
    height: '100%',
    backgroundColor: 'white',
    [theme.breakpoints.down('xs')]: {
      border: 'inherit',
      paddingLeft: 0,
      paddingRight: 0
    }
  }
}));

/***/ }),

/***/ "./components/Hashtags/Hashtags.js":
/*!*****************************************!*\
  !*** ./components/Hashtags/Hashtags.js ***!
  \*****************************************/
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
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _HashtagsStyle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./HashtagsStyle */ "./components/Hashtags/HashtagsStyle.js");
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Avatar */ "@material-ui/core/Avatar");
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Chip */ "@material-ui/core/Chip");
/* harmony import */ var _material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! clsx */ "clsx");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_Badge__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Badge */ "@material-ui/core/Badge");
/* harmony import */ var _material_ui_core_Badge__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Badge__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_icons_EmojiEmotions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/EmojiEmotions */ "@material-ui/icons/EmojiEmotions");
/* harmony import */ var _material_ui_icons_EmojiEmotions__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_EmojiEmotions__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _hoc_Topic_Topic__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../hoc/Topic/Topic */ "./hoc/Topic/Topic.js");
/* harmony import */ var _ListAlfredConditions_ListAlfredConditions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../ListAlfredConditions/ListAlfredConditions */ "./components/ListAlfredConditions/ListAlfredConditions.js");
/* harmony import */ var _material_ui_icons_Room__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/icons/Room */ "@material-ui/icons/Room");
/* harmony import */ var _material_ui_icons_Room__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Room__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _material_ui_icons_CheckCircleOutline__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/icons/CheckCircleOutline */ "@material-ui/icons/CheckCircleOutline");
/* harmony import */ var _material_ui_icons_CheckCircleOutline__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_CheckCircleOutline__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _material_ui_icons_ChatBubbleOutlineOutlined__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/icons/ChatBubbleOutlineOutlined */ "@material-ui/icons/ChatBubbleOutlineOutlined");
/* harmony import */ var _material_ui_icons_ChatBubbleOutlineOutlined__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ChatBubbleOutlineOutlined__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _material_ui_icons_Person__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/icons/Person */ "@material-ui/icons/Person");
/* harmony import */ var _material_ui_icons_Person__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Person__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _Avatar_UserAvatar__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../Avatar/UserAvatar */ "./components/Avatar/UserAvatar.js");
/* harmony import */ var _Box_Box__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../Box/Box */ "./components/Box/Box.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  setAxiosAuthentication
} = __webpack_require__(/*! ../../utils/authentication */ "./utils/authentication.js");






















const {
  frenchFormat
} = __webpack_require__(/*! ../../utils/text */ "./utils/text.js");

const moment = __webpack_require__(/*! moment */ "moment");

moment.locale('fr');

class Hashtags extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentDidMount", () => {
      setAxiosAuthentication();
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.get(`/myAlfred/api/users/users/${this.props.user}`).then(res => {
        this.setState({
          user: res.data
        });
      }).catch(err => console.error(err));
    });

    this.state = {
      user: null
    };
  }

  render() {
    const {
      user
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hoc_Topic_Topic__WEBPACK_IMPORTED_MODULE_12__["default"], {
      titleTopic: `Les tags de ${user ? user.firstname : ''}`
    }, "HASHTAGS jjkl");
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__["withStyles"])(_HashtagsStyle__WEBPACK_IMPORTED_MODULE_5__["default"], {
  withTheme: true
})(Hashtags));

/***/ }),

/***/ "./components/Hashtags/HashtagsStyle.js":
/*!**********************************************!*\
  !*** ./components/Hashtags/HashtagsStyle.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  skillsContainer: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  skillCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 105,
    [theme.breakpoints.down('xs')]: {
      width: '50%',
      margin: 0
    }
  },
  avatarSize: {
    width: 60,
    height: 60
  },
  skillTitle: {
    fontSize: '0.8rem',
    color: 'rgba(84,89,95,0.95)',
    fontWeight: 'bold'
  },
  skillValue: {
    fontSize: '0.7rem',
    color: 'rgba(84,89,95,0.95)'
  },
  shape: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

/***/ }),

/***/ "./components/InfoBar/InfoBar.js":
/*!***************************************!*\
  !*** ./components/InfoBar/InfoBar.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/i18n */ "./utils/i18n.js");
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_utils_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _static_css_components_InfoBar_InfoBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../static/css/components/InfoBar/InfoBar */ "./static/css/components/InfoBar/InfoBar.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "@material-ui/core/styles/withStyles");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6__);








class InfoBar extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.infoBarMainStyle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      className: classes.infoBarLinkContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.infoBarPicsContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: '/static/assets/img/warning.svg',
      alt: 'warning',
      title: 'warning',
      width: '100%',
      height: '100%'
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], {
      className: classes.infoBarColorText
    }, _utils_i18n__WEBPACK_IMPORTED_MODULE_2__["INFOBAR_MESSAGE"].message)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      className: classes.showmoreContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
      href: "#"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#",
      className: classes.shomoreLink
    }, _utils_i18n__WEBPACK_IMPORTED_MODULE_2__["INFOBAR_MESSAGE"].showMore)))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6___default()(_static_css_components_InfoBar_InfoBar__WEBPACK_IMPORTED_MODULE_5__["default"])(InfoBar));

/***/ }),

/***/ "./components/InfoWithPics/InfoWithPics.js":
/*!*************************************************!*\
  !*** ./components/InfoWithPics/InfoWithPics.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _static_css_components_InfoWithPics_InfoWithPics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../static/css/components/InfoWithPics/InfoWithPics */ "./static/css/components/InfoWithPics/InfoWithPics.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "@material-ui/core/styles/withStyles");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__);






class InfoWithPics extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      data,
      equipmentsSelected,
      classes
    } = this.props;
    let result = [];

    if (equipmentsSelected) {
      Object.keys(equipmentsSelected).map(res => {
        result.push(equipmentsSelected[res]._id);
      });
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, data ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.infoWithPicsMainContainer
    }, data.IconName ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.infoWithPicsMarginRight
    }, data.IconName) : data.name_logo && data.logo ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.infoWithPicsMarginRight
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      style: {
        opacity: equipmentsSelected ? !result.includes(data._id) ? 0.2 : 1 : 1
      },
      src: `../../../static/equipments/${data.logo.slice(0, -4)}.svg`,
      alt: `${data.name_logo.slice(0, -4)}.svg`,
      className: classes.picsSize
    })) : null, data.label || data.summary ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.containerListIcon
    }, data.label ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
      style: {
        margin: 0,
        textDecoration: equipmentsSelected ? !result.includes(data._id) ? 'line-through' : 'none' : 'none',
        opacity: equipmentsSelected ? !result.includes(data._id) ? 0.2 : 1 : 1
      }
    }, data.label)) : null, data.summary ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.infoWithPicsColorText
    }, data.summary)) : null) : null) : null);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_4___default()(_static_css_components_InfoWithPics_InfoWithPics__WEBPACK_IMPORTED_MODULE_3__["default"])(InfoWithPics));

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

/***/ "./components/ListAlfredConditions/ListAlfredConditions.js":
/*!*****************************************************************!*\
  !*** ./components/ListAlfredConditions/ListAlfredConditions.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      style: {
        padding: '1%',
        display: 'flex'
      }
    }, wrapperComponentProps ? Object.keys(wrapperComponentProps).map((res, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
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
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/TextField */ "@material-ui/core/TextField");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/icons/MailOutline */ "@material-ui/icons/MailOutline");
/* harmony import */ var _material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_icons_LockOpenOutlined__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/icons/LockOpenOutlined */ "@material-ui/icons/LockOpenOutlined");
/* harmony import */ var _material_ui_icons_LockOpenOutlined__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LockOpenOutlined__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _OAuth_OAuth__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../OAuth/OAuth */ "./components/OAuth/OAuth.js");
/* harmony import */ var _material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/Visibility */ "@material-ui/icons/Visibility");
/* harmony import */ var _material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_icons_VisibilityOff__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/VisibilityOff */ "@material-ui/icons/VisibilityOff");
/* harmony import */ var _material_ui_icons_VisibilityOff__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_VisibilityOff__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/InputAdornment */ "@material-ui/core/InputAdornment");
/* harmony import */ var _material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/IconButton */ "@material-ui/core/IconButton");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _material_ui_core_Input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/core/Input */ "@material-ui/core/Input");
/* harmony import */ var _material_ui_core_Input__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Input__WEBPACK_IMPORTED_MODULE_15__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









const {
  setAuthToken,
  setAxiosAuthentication
} = __webpack_require__(/*! ../../utils/authentication */ "./utils/authentication.js");











const {
  PROVIDERS
} = __webpack_require__(/*! ../../utils/consts */ "./utils/consts.js");

const {
  ENABLE_GF_LOGIN
} = __webpack_require__(/*! ../../config/config */ "./config/config.js");

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
      axios__WEBPACK_IMPORTED_MODULE_7___default.a.post('/myAlfred/api/users/login', user).then(res => {
        setAuthToken();
        setAxiosAuthentication();
        axios__WEBPACK_IMPORTED_MODULE_7___default.a.put('/myAlfred/api/users/account/lastLogin').then(data => {
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

    _defineProperty(this, "handleClickShowPassword", () => {
      this.setState({
        showPassword: !this.state.showPassword
      });
    });

    _defineProperty(this, "handleMouseDownPassword", event => {
      event.preventDefault();
    });

    this.state = {
      username: '',
      password: '',
      errors: {},
      showPassword: false
    };
  }

  render() {
    const {
      classes,
      callRegister
    } = this.props;
    const {
      errors,
      username,
      password,
      showPassword
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
    }, "Connexion")), ENABLE_GF_LOGIN ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
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
    }, PROVIDERS.map(provider => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OAuth_OAuth__WEBPACK_IMPORTED_MODULE_10__["default"], {
      login: true,
      provider: provider,
      key: provider
    }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      className: classes.margin
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      container: true,
      spacing: 1,
      alignItems: "flex-end",
      className: classes.flexContainerPics
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: 'rgba(84,89,95,0.95)',
        fontWeight: 'bold',
        letterSpacing: -1
      }
    }, "Ou")))))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
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
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_8___default.a, {
      className: classes.colorIcon
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      item: true,
      className: classes.widthTextField
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Input__WEBPACK_IMPORTED_MODULE_15___default.a, {
      label: "Email",
      placeholder: "Email",
      style: {
        width: '100%',
        marginTop: 16,
        marginBottom: 8
      },
      type: "email",
      name: "username",
      value: username,
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
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_LockOpenOutlined__WEBPACK_IMPORTED_MODULE_9___default.a, {
      className: classes.colorIcon
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      item: true,
      className: classes.widthTextField
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Input__WEBPACK_IMPORTED_MODULE_15___default.a, {
      id: "standard-with-placeholder",
      label: "Mot de passe",
      placeholder: "Mot de passe",
      style: {
        width: '100%',
        marginTop: 16,
        marginBottom: 8
      },
      type: showPassword ? "text" : "password",
      name: "password",
      value: password,
      onChange: this.onChange,
      error: errors.password,
      endAdornment: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_13___default.a, {
        position: "end"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_14___default.a, {
        "aria-label": "toggle password visibility",
        onClick: this.handleClickShowPassword,
        onMouseDown: this.handleMouseDownPassword
      }, showPassword ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_11___default.a, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_VisibilityOff__WEBPACK_IMPORTED_MODULE_12___default.a, null)))
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", null, errors.password)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, {
      item: true,
      style: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 30
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6___default.a, {
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
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_5___default.a, {
      href: '/forgotPassword'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      color: "primary",
      style: {
        textDecoration: 'none',
        color: '#2FBCD3'
      }
    }, "Mot de passe oubli\xE9 ?")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      color: "primary",
      onClick: callRegister,
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
      height: '100vh',
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
    [theme.breakpoints.down('xs')]: {
      width: '80%'
    }
  },
  newContainer: {
    padding: '5%',
    [theme.breakpoints.down('xs')]: {
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
    fontSize: '1.6rem',
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -1,
    fontWeight: 'bold'
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
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Divider */ "@material-ui/core/Divider");
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_7__);
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
      login
    } = this.props;
    const {
      classes
    } = this.props;
    const ProviderLoginButton = this.components[provider];
    console.log(provider, 'provider');
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default.a, {
      container: true,
      className: classes.contentOauth,
      onClick: this.startAuth
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        margin: 10
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: `/static/assets/img/${provider}.png`,
      alt: provider,
      title: provider,
      width: 20
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_7___default.a, {
      orientation: "vertical",
      flexItem: true
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      style: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '1rem',
        fontFamily: 'Helvetica',
        fontWeight: 400,
        lineHeight: 1
      }
    }, login ? `Connexion ${provider}` : `Inscription ${provider}`))));
  }

}

OAuth.propTypes = {
  provider: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  // Login : true => connect, false : register
  login: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
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

/***/ "./components/Presentation/Presentation.js":
/*!*************************************************!*\
  !*** ./components/Presentation/Presentation.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _static_css_components_Presentation_Presentation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../static/css/components/Presentation/Presentation */ "./static/css/components/Presentation/Presentation.js");
/* harmony import */ var _hoc_Topic_Topic__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hoc/Topic/Topic */ "./hoc/Topic/Topic.js");
/* harmony import */ var _Box_Box__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Box/Box */ "./components/Box/Box.js");
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ "@material-ui/core/DialogTitle");
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Dialog */ "@material-ui/core/Dialog");
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/DialogContent */ "@material-ui/core/DialogContent");
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/TextField */ "@material-ui/core/TextField");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../utils/i18n */ "./utils/i18n.js");
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_utils_i18n__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../utils/consts */ "./utils/consts.js");
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_utils_consts__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../utils/functions */ "./utils/functions.js");
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_utils_functions__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/icons/Create */ "@material-ui/icons/Create");
/* harmony import */ var _material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/core/IconButton */ "@material-ui/core/IconButton");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/icons/Close */ "@material-ui/icons/Close");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_18__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const {
  setAxiosAuthentication
} = __webpack_require__(/*! ../../utils/authentication */ "./utils/authentication.js");


















const {
  frenchFormat
} = __webpack_require__(/*! ../../utils/text */ "./utils/text.js");





const moment = __webpack_require__(/*! moment */ "moment");

moment.locale('fr');
const DialogTitle = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(_static_css_components_Presentation_Presentation__WEBPACK_IMPORTED_MODULE_4__["default"])(props => {
  const {
    children,
    classes,
    onClose,
    ...other
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_7___default.a, _extends({
    disableTypography: true
  }, other, {
    className: classes.root
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10___default.a, {
    variant: "h6"
  }, children), onClose ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_17___default.a, {
    "aria-label": "close",
    className: classes.closeButton,
    onClick: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_18___default.a, null)) : null);
});

class Presentation extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentDidMount", () => {
      this.loadUser();
    });

    _defineProperty(this, "loadUser", () => {
      setAxiosAuthentication();
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(`/myAlfred/api/users/users/${this.props.user}`).then(res => {
        this.setState({
          user: res.data
        });
      }).catch(err => console.error(err));
    });

    _defineProperty(this, "save", () => {
      const {
        newDescription
      } = this.state;
      setAxiosAuthentication();
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.put('/myAlfred/api/users/profile/description', {
        description: newDescription
      }).then(res => {
        this.loadUser();
        this.setState({
          showEdition: false
        });
      });
    });

    _defineProperty(this, "onTextChanged", event => {
      var text = event.target.value;
      text = text.slice(0, _utils_consts__WEBPACK_IMPORTED_MODULE_14__["MAX_TEXT_SIZE"]);
      this.setState({
        newDescription: text
      });
    });

    _defineProperty(this, "closeEditDialog", () => {
      this.setState({
        showEdition: false,
        newDescription: null
      });
    });

    _defineProperty(this, "modalEditDialog", classes => {
      const {
        user,
        showEdition,
        newDescription
      } = this.state;
      const enabled = newDescription;
      const placeholder = newDescription || _utils_i18n__WEBPACK_IMPORTED_MODULE_13__["CMP_PRESENTATION"].placeholder;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_8___default.a, {
        open: showEdition,
        onClose: () => this.closeEditDialog(),
        "aria-labelledby": "alert-dialog-title",
        "aria-describedby": "alert-dialog-description"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DialogTitle, {
        id: "customized-dialog-title",
        onClose: this.closeEditDialog,
        style: {
          position: 'absolute',
          right: 0
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_9___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hoc_Topic_Topic__WEBPACK_IMPORTED_MODULE_5__["default"], {
        titleTopic: 'Modifiez votre description',
        titleSummary: 'Ajoutez ou modifiez votre "À propos" ',
        underline: true
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
        container: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
        item: true,
        xs: 12,
        lg: 12,
        style: {
          marginTop: '2vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_12___default.a, {
        multiline: true,
        classes: {
          root: classes.textField
        },
        rowsMax: 4,
        rows: 4,
        value: newDescription,
        placeholder: placeholder,
        onChange: this.onTextChanged
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
        style: {
          marginTop: '2vh',
          display: 'flex',
          alignItems: 'flex-end',
          width: '100%',
          flexDirection: 'column'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10___default.a, null, `${_utils_consts__WEBPACK_IMPORTED_MODULE_14__["MAX_TEXT_SIZE"]} caractères max`)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
        style: {
          width: '100%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11___default.a, {
        onClick: () => {
          this.save();
        },
        variant: "contained",
        disabled: !enabled,
        classes: {
          root: classes.button
        }
      }, "Modifier"))))));
    });

    _defineProperty(this, "openEdition", () => {
      this.setState({
        showEdition: true,
        newDescription: this.state.user.description
      });
    });

    this.state = {
      user: null,
      newDescription: null,
      showEdition: false
    };
  }

  render() {
    const {
      classes
    } = this.props;
    const {
      user
    } = this.state;
    const editable = Object(_utils_functions__WEBPACK_IMPORTED_MODULE_15__["isEditableUser"])(user);
    const title = frenchFormat(`À propos de ${user ? user.firstname : ''}`);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
      style: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }
    }, editable ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
      style: {
        position: 'absolute',
        right: 0
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_17___default.a, {
      "aria-label": "edit",
      onClick: this.openEdition
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_16___default.a, null))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hoc_Topic_Topic__WEBPACK_IMPORTED_MODULE_5__["default"], {
      titleTopic: title,
      titleSummary: user ? `membre depuis ${moment(user.creation_date).format("MMMM YYYY")}` : ''
    }, user ? user.description : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, null, this.modalEditDialog(classes)));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(_static_css_components_Presentation_Presentation__WEBPACK_IMPORTED_MODULE_4__["default"], {
  withTheme: true
})(Presentation));

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
/* harmony import */ var _OAuth_OAuth__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../OAuth/OAuth */ "./components/OAuth/OAuth.js");
/* harmony import */ var _Information_Information__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../Information/Information */ "./components/Information/Information.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const {
  setAuthToken,
  setAxiosAuthentication
} = __webpack_require__(/*! ../../utils/authentication */ "./utils/authentication.js");





































const {
  getLoggedUserId
} = __webpack_require__(/*! ../../utils/functions */ "./utils/functions.js");

var parse = __webpack_require__(/*! url-parse */ "url-parse");

const {
  PROVIDERS
} = __webpack_require__(/*! ../../utils/consts */ "./utils/consts.js");

const {
  ENABLE_GF_LOGIN
} = __webpack_require__(/*! ../../config/config */ "./config/config.js");

const {
  isPhoneOk
} = __webpack_require__(/*! ../../utils/sms */ "./utils/sms.js");

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
      setAxiosAuthentication();
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/myAlfred/api/users/sendSMSVerification', {
        phone: this.state.phone
      }).then(res => {
        var txt = 'Le SMS a été envoyé';
        react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].info(txt);
        this.setState({
          smsCodeOpen: true
        });
      }).catch(err => {
        react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].error('Impossible d\'envoyer le SMS');
        this.setState({
          serverError: true
        });
      });
    });

    _defineProperty(this, "checkSmsCode", () => {
      setAxiosAuthentication();
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/myAlfred/api/users/checkSMSVerification', {
        sms_code: this.state.smsCode
      }).then(res => {
        if (res.data.sms_code_ok) {
          react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].info('Votre numéro de téléphone est validé');
          this.setState({
            smsCodeOpen: false,
            phoneConfirmed: true
          });
        } else {
          react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].error('Le code est incorrect');
        }
      }).catch(err => react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].error('Erreur à la vérification du code'));
    });

    _defineProperty(this, "onSubmit", () => {
      const newUser = {
        google_id: this.state.google_id,
        facebook_id: this.state.facebook_id,
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
      const facebook_id = this.state.facebook_id;
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/myAlfred/api/users/register', newUser).then(() => {
        react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].info('Inscription réussie');
        axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/myAlfred/api/users/login', {
          username,
          password,
          google_id,
          facebook_id
        }).then(() => {
          setAuthToken();
          setAxiosAuthentication();
        }).catch().then(this.addPhoto).catch().then(this.setState({
          activeStep: this.state.activeStep + 1
        })).catch().then(this.onSubmitPhone).catch();
      }).catch(err => {
        const errors = err.response.data;
        const errKeys = Object.keys(errors);
        this.setState({
          errors: err.response.data
        });

        if (errKeys.includes('email')) {
          this.setState({
            activeStep: 0
          });
        }

        if (errKeys.includes('address')) {
          this.setState({
            cityError: errors.address,
            activeStep: 1
          });
        }

        if (errKeys.includes('birthday')) {
          this.setState({
            birthdayError: errors.birthday,
            activeStep: 1
          });
        }
      });
    });

    _defineProperty(this, "addPhoto", () => {
      setAxiosAuthentication();

      if (this.state.picture !== '' || this.state.avatar !== '') {
        const formData = new FormData();
        formData.append('myImage', this.state.picture);
        formData.append('avatar', this.state.avatar);
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/myAlfred/api/users/profile/picture', formData, config).catch(error => {
          console.error(error);
        });
      }
      /** else if (this.state.avatar !== '') {
            axios.post("/myAlfred/api/users/profile/avatar", { avatar: this.state.avatar})
              .catch((error) => {
                console.error(error)
              })
          } */

    });

    _defineProperty(this, "onSubmitPhone", e => {
      setAxiosAuthentication();

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

    _defineProperty(this, "validatorSecondStep", () => {
      if (this.state.checked) {
        this.setState({
          secondPageValidator: false
        });
      } else {
        this.setState({
          secondPageValidator: true
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
      // Avatar link coming from Google or Facebook
      avatar: null,
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
      secondPageValidator: true,
      errorExistEmail: false,
      birthdayError: '',
      cityError: ''
    };
    this.handleChecked = this.handleChecked.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
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
        file: query.picture,
        avatar: query.picture
      });
    }

    if (query.facebook_id) {
      this.setState({
        facebook_id: query.facebook_id,
        email: query.email,
        name: query.lastname,
        firstname: query.firstname,
        activeStep: 1,
        firstPageValidator: false,
        avatar: query.picture
      });
    }

    if (query.error) {
      this.setState({
        errorExistEmail: true
      });
    }

    if (getLoggedUserId()) {
      react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].warn('Vous êtes déjà inscrit');
      next_router__WEBPACK_IMPORTED_MODULE_31___default.a.push('/');
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.activeStep !== prevState.activeStep) {
      this.props.sendParentData(this.state.activeStep);
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
    }, () => this.validatorSecondStep());
  }

  renderSwitch(stepIndex, classes, errors) {
    switch (stepIndex) {
      case 0:
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Information_Information__WEBPACK_IMPORTED_MODULE_34__["default"], {
          open: this.state.errorExistEmail,
          onClose: () => this.setState({
            errorExistEmail: false
          }),
          type: "warning",
          text: 'Oups ! Un compte utilisant cette adresse mail existe déjà'
        }), !this.state.google_id && ENABLE_GF_LOGIN ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
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
            color: 'rgba(84,89,95,0.95)',
            fontWeight: 'bold',
            letterSpacing: -1
          }
        }, "Avec")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          style: {
            width: '70%'
          }
        }, PROVIDERS.map(provider => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OAuth_OAuth__WEBPACK_IMPORTED_MODULE_33__["default"], {
          login: false,
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
            color: 'rgba(84,89,95,0.95)',
            fontWeight: 'bold',
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
          name: 'myImage'
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
          htmlFor: "icon-button-file"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_21___default.a, {
          color: "primary",
          className: classes.button,
          style: {
            backgroundImage: `url('${this.state.file}')`
          },
          component: "span"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_PhotoCamera__WEBPACK_IMPORTED_MODULE_22___default.a, {
          style: {
            fontSize: '2rem'
          }
        }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
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
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", {
          style: {
            color: 'red'
          }
        }, this.state.cityError)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
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
            display: 'flex',
            alignItems: 'center'
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
          },
          error: this.state.birthdayError,
          helperText: this.state.birthdayError
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
          },
          error: this.state.birthdayError
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
          },
          error: this.state.birthdayError
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
          href: 'footer/cguPage',
          target: "_blank",
          style: {
            color: '#2FBCD3'
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
        }, "Inscription termin\xE9e")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          className: classes.newContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          container: true,
          style: {
            display: 'flex',
            justifyContent: 'center',
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
            marginTop: 20,
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
          href: '/search?search=1'
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          style: {
            textDecoration: 'none'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10___default.a, {
          variant: 'contained',
          color: 'primary',
          style: {
            color: 'white'
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
          variant: 'contained',
          color: 'secondary',
          style: {
            color: 'white'
          }
        }, "Proposer mes services"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          style: {
            marginTop: 20
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
          style: {
            marginTop: 20
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_32___default.a, {
          href: '/needHelp/needHelp',
          target: "_blank"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          target: "_blank",
          style: {
            color: '#2FBCD3',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            textDecoration: 'none'
          }
        }, "Besoin d'aide pour proposer vos services ? Prenez rendez-vous avec l'\xE9quipe My Alfred ici !"))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
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
      classes,
      callLogin
    } = this.props;
    const {
      errors,
      activeStep,
      firstPageValidator,
      secondPageValidator
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
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MobileStepper__WEBPACK_IMPORTED_MODULE_14___default.a, {
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
        disabled: activeStep === 0 ? firstPageValidator : secondPageValidator
      }, activeStep === 0 ? 'Suivant' : 'Terminer', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_KeyboardArrowRight__WEBPACK_IMPORTED_MODULE_16___default.a, null)),
      backButton: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10___default.a, {
        size: "small",
        onClick: this.handleBack,
        disabled: activeStep === 0
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_KeyboardArrowLeft__WEBPACK_IMPORTED_MODULE_15___default.a, null), "Pr\xE9c\xE9dent")
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
      container: true,
      className: classes.bottomContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4___default.a, {
      item: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      color: 'primary',
      onClick: callLogin,
      style: {
        color: '#2FBCD3',
        cursor: 'pointer'
      }
    }, "Vous avez d\xE9j\xE0 un compte My Alfred ?")))) : null)));
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
    [theme.breakpoints.down('xs')]: {
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
    [theme.breakpoints.down('xs')]: {
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
    [theme.breakpoints.down('xs')]: {
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
    [theme.breakpoints.down('xs')]: {
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
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      width: '80%'
    }
  },
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  progress: {
    [theme.breakpoints.down('xs')]: {
      width: '25%'
    }
  },
  titleRegister: {
    textAlign: 'center',
    margin: '0px auto 1.6rem',
    fontSize: '1.6rem',
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -1,
    fontWeight: 'bold'
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
    backgroundSize: 'cover',
    backgroundPosition: 'center'
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
      }) : '/search?search=1&category=' + res._id + (gps ? '&gps=' + JSON.stringify(gps) : '') + '&indexCat=' + index;
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

/***/ "./components/Skills/Skills.js":
/*!*************************************!*\
  !*** ./components/Skills/Skills.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _SkillsStyle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SkillsStyle */ "./components/Skills/SkillsStyle.js");
/* harmony import */ var _hoc_Topic_Topic__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hoc/Topic/Topic */ "./hoc/Topic/Topic.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  setAxiosAuthentication
} = __webpack_require__(/*! ../../utils/authentication */ "./utils/authentication.js");







const {
  SKILLS
} = __webpack_require__(/*! ../../utils/consts */ "./utils/consts.js");



class Skills extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentDidMount", () => {
      setAxiosAuthentication();

      if (this.props.alfred) {
        axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(`/myAlfred/api/reviews/${this.props.alfred}`).then(res => {
          var skill_values = this.state.skill_values;
          const skills = res.data;
          Object.keys(skills).forEach(key => {
            if (Object.keys(SKILLS).includes(key)) {
              skill_values[key] += skills[key];
            }
          });
          this.setState({
            skill_values: skill_values
          });
        }).catch(err => console.error(err));
      }

      if (this.props.review) {
        axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(`/myAlfred/api/reviews/review/${this.props.review}`).then(res => {
          var skill_values = this.state.skill_values;
          const skills = res.data.note_alfred;
          Object.keys(skills).forEach(key => {
            if (Object.keys(SKILLS).includes(key)) {
              skill_values[key] += skills[key];
            }
          });
          this.setState({
            skill_values: skill_values
          });
        }).catch(err => console.error(err));
      }
    });

    const _skill_values = Object.keys(SKILLS).reduce((acc, curr) => ({ ...acc,
      [curr]: 0
    }), {});

    this.state = {
      alfred: [],
      dense: false,
      secondary: false,
      valueRating: 3,
      isChecked: false,
      skill_values: _skill_values
    };
  }

  render() {
    const {
      classes,
      hideCount,
      onClick,
      skills
    } = this.props;
    const {
      skill_values
    } = this.state;

    const skillClicked = (e, name) => {
      e.stopPropagation();

      if (onClick) {
        onClick(name);
      }
    };

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hoc_Topic_Topic__WEBPACK_IMPORTED_MODULE_5__["default"], {
      titleTopic: 'Compliments'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.skillsContainer,
      spacing: 3
    }, Object.keys(SKILLS).map((skill, index) => {
      const name = SKILLS[skill].entrieName;
      const count = skills ? skills[name] : skill_values[skill];
      const pic = `/static/assets/img/skillsAlfred/${SKILLS[skill].picture}${count ? '' : '_disabled'}.svg`;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        key: index,
        item: true,
        xs: 6,
        lg: 3,
        xl: 3,
        sm: 6,
        md: 6,
        className: classes.skillCard,
        onClick: e => skillClicked(e, name)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        title: 'pics',
        alt: 'pics',
        src: pic,
        className: classes.avatarSize
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        className: classes.skillTitle
      }, SKILLS[skill].label), hideCount ? null : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        className: classes.skillValue
      }, `(${skill_values[skill]})`));
    })));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(_SkillsStyle__WEBPACK_IMPORTED_MODULE_4__["default"])(Skills));

/***/ }),

/***/ "./components/Skills/SkillsStyle.js":
/*!******************************************!*\
  !*** ./components/Skills/SkillsStyle.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  skillsContainer: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  skillCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 105,
    [theme.breakpoints.down('xs')]: {
      width: '50%',
      margin: 0
    }
  },
  avatarSize: {
    width: 50,
    height: 50
  },
  skillTitle: {
    fontSize: '0.8rem',
    color: 'rgba(84,89,95,0.95)',
    fontWeight: 'bold'
  },
  skillValue: {
    fontSize: '0.7rem',
    color: 'rgba(84,89,95,0.95)'
  },
  shape: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Link_Link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/Link/Link */ "./components/Link/Link.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_icons_Facebook__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/icons/Facebook */ "@material-ui/icons/Facebook");
/* harmony import */ var _material_ui_icons_Facebook__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Facebook__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_icons_Instagram__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/icons/Instagram */ "@material-ui/icons/Instagram");
/* harmony import */ var _material_ui_icons_Instagram__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Instagram__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_icons_LinkedIn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/LinkedIn */ "@material-ui/icons/LinkedIn");
/* harmony import */ var _material_ui_icons_LinkedIn__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LinkedIn__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_icons_Twitter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/icons/Twitter */ "@material-ui/icons/Twitter");
/* harmony import */ var _material_ui_icons_Twitter__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Twitter__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Divider */ "@material-ui/core/Divider");
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _static_css_components_Footer_Footer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../static/css/components/Footer/Footer */ "./static/css/components/Footer/Footer.js");
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Hidden */ "@material-ui/core/Hidden");
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_11__);













class Footer extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.footerMainStyle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      container: true,
      className: classes.footerMainContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_11___default.a, {
      only: ['xs']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xl: 3,
      lg: 3,
      className: classes.footerSection
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.footerTitileSection
    }, "\xC0 propos")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
      href: '/footer/apropos'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginBottom: '2vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.footerLink
    }, "My Alfred"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
      href: '/footer/ourTeam'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginBottom: '2vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.footerLink
    }, "Notre \xE9quipe"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
      href: '/footer/contact'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.footerLink
    }, "Nous contacter"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_11___default.a, {
      only: ['xs']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xl: 3,
      lg: 3,
      className: classes.footerSection
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.footerTitileSection
    }, "Communaut\xE9")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
      href: '/footer/ourCommunity'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginBottom: '2vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.footerLink
    }, "Notre communaut\xE9"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_11___default.a, {
      only: ['xs']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xl: 3,
      lg: 3,
      className: classes.footerSection
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.footerTitileSection
    }, "Alfred")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
      href: '/footer/becomeAlfred'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginBottom: '2vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.footerLink
    }, "Devenir Alfred"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
      href: '/faq/home'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginBottom: '2vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.footerLink
    }, "FAQ des Alfred"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
      href: '/'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.footerLink
    }, "Centre de ressources"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      item: true,
      xl: 3,
      lg: 3,
      className: classes.footerSection
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.footerTitileSection
    }, "Assistance")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
      href: '/footer/addService'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginBottom: '2vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.footerLink
    }, "R\xE9server un service"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
      href: '/faq/home'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginBottom: '2vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.footerLink
    }, "FAQ des services"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
      href: '/'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.footerLink
    }, "Parler \xE0 un humain"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_11___default.a, {
      only: ['xl', 'lg', 'md']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.footerDividerContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_9___default.a, {
      className: classes.footerDivider
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.footerSocialSection
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.footerTitileSection
    }, "R\xE9seaux sociaux")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.footerSocialContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Facebook__WEBPACK_IMPORTED_MODULE_5___default.a, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Instagram__WEBPACK_IMPORTED_MODULE_6___default.a, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_LinkedIn__WEBPACK_IMPORTED_MODULE_7___default.a, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Twitter__WEBPACK_IMPORTED_MODULE_8___default.a, null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.footerDividerContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_9___default.a, {
      className: classes.footerDivider
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.footerBrandContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.footerBrandStyle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.footerLawContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.footerText
    }, "\xA9 2020 MY ALFRED Corporation. Tous droits r\xE9serv\xE9s")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.footerRgpdButtons
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.footerLink
    }, "S\xE9curit\xE9")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.footerLinkInfoContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.footerLink
    }, "Informations l\xE9gales")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.footerLink
    }, "Confidentiali\xE9")))))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__["withStyles"])(_static_css_components_Footer_Footer__WEBPACK_IMPORTED_MODULE_10__["default"])(Footer));

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
/* harmony import */ var _Footer_Footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Footer/Footer */ "./hoc/Layout/Footer/Footer.js");
/* harmony import */ var _static_css_pages_layout_layoutStyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../static/css/pages/layout/layoutStyle */ "./static/css/pages/layout/layoutStyle.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_InfoBar_InfoBar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/InfoBar/InfoBar */ "./components/InfoBar/InfoBar.js");
/* harmony import */ var _components_ScrollMenu_ScrollMenu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/ScrollMenu/ScrollMenu */ "./components/ScrollMenu/ScrollMenu.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _TrustAndSecurity_TrustAndSecurity__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./TrustAndSecurity/TrustAndSecurity */ "./hoc/Layout/TrustAndSecurity/TrustAndSecurity.js");
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Divider */ "@material-ui/core/Divider");
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_10__);
const {
  setAxiosAuthentication
} = __webpack_require__(/*! ../../utils/authentication */ "./utils/authentication.js");













const {
  getLoggedUserId
} = __webpack_require__(/*! ../../utils/functions */ "./utils/functions.js");

class Layout extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      categories: []
    };
  }

  componentDidMount() {
    setAxiosAuthentication();
    axios__WEBPACK_IMPORTED_MODULE_8___default.a.get('/myAlfred/api/category/all/sort').then(res => {
      let cat = res.data;
      this.setState({
        categories: cat
      });
    }).catch(err => {
      console.error(err);
    });

    if (getLoggedUserId()) {
      this.setState({
        logged: true
      });
    }
  }

  render() {
    const {
      children,
      selectedAddress,
      classes,
      gps,
      indexCat,
      keyword
    } = this.props;
    const {
      logged,
      categories
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InfoBar_InfoBar__WEBPACK_IMPORTED_MODULE_6__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NavBar_NavBar__WEBPACK_IMPORTED_MODULE_1__["default"], {
      selectedAddress: selectedAddress,
      keyword: keyword,
      logged: logged,
      key: this.logged
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.layoutScrollMenu
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ScrollMenu_ScrollMenu__WEBPACK_IMPORTED_MODULE_7__["default"], {
      categories: categories,
      gps: gps,
      indexCat: indexCat,
      mode: false
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.filterMenuDivierContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_10___default.a, {
      className: classes.filterMenuDividerStyle
    }))), children, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.mainContainerStyleFooter
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_10___default.a, {
      style: {
        width: '100%'
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        width: '90%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TrustAndSecurity_TrustAndSecurity__WEBPACK_IMPORTED_MODULE_9__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.generalWidthFooter
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5___default.a, {
      style: {
        width: '85%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Footer_Footer__WEBPACK_IMPORTED_MODULE_2__["default"], null)))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__["withStyles"])(_static_css_pages_layout_layoutStyle__WEBPACK_IMPORTED_MODULE_3__["default"])(Layout));

/***/ }),

/***/ "./hoc/Layout/LayoutMobile.js":
/*!************************************!*\
  !*** ./hoc/Layout/LayoutMobile.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _NavBar_MobileNavbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NavBar/MobileNavbar */ "./hoc/Layout/NavBar/MobileNavbar.js");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_icons_ArrowBackIos__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/ArrowBackIos */ "@material-ui/icons/ArrowBackIos");
/* harmony import */ var _material_ui_icons_ArrowBackIos__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ArrowBackIos__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/IconButton */ "@material-ui/core/IconButton");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);







class LayoutMobile extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUrlIndex: '',
      myProfilUrl: false,
      hideMobileNavbar: false
    };
  }

  componentDidMount() {
    if (next_router__WEBPACK_IMPORTED_MODULE_5___default.a.pathname === '/userServicePreview') {
      this.setState({
        hideMobileNavbar: true
      });
    }
  }

  render() {
    const {
      children,
      currentIndex
    } = this.props;
    const {
      myProfilUrl,
      hideMobileNavbar
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
      style: {
        padding: !hideMobileNavbar ? '10%' : 0
      }
    }, !myProfilUrl ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4___default.a, {
      "aria-label": "ArrowBackIosIcon",
      onClick: () => next_router__WEBPACK_IMPORTED_MODULE_5___default.a.back()
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ArrowBackIos__WEBPACK_IMPORTED_MODULE_3___default.a, null))) : null, children), !hideMobileNavbar ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
      style: {
        position: 'fixed',
        bottom: '3%',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        zIndex: 1
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
      style: {
        width: '100%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NavBar_MobileNavbar__WEBPACK_IMPORTED_MODULE_1__["default"], {
      currentIndex: currentIndex
    }))) : null);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (LayoutMobile);

/***/ }),

/***/ "./hoc/Layout/LayoutMobileProfile.js":
/*!*******************************************!*\
  !*** ./hoc/Layout/LayoutMobileProfile.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/IconButton */ "@material-ui/core/IconButton");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_icons_ArrowBackIos__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/icons/ArrowBackIos */ "@material-ui/icons/ArrowBackIos");
/* harmony import */ var _material_ui_icons_ArrowBackIos__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ArrowBackIos__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _NavBar_MobileNavbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NavBar/MobileNavbar */ "./hoc/Layout/NavBar/MobileNavbar.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "@material-ui/core/styles/withStyles");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _static_css_components_Layout_LayoutMobileProfile_LayoutMobileProfile__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../static/css/components/Layout/LayoutMobileProfile/LayoutMobileProfile */ "./static/css/components/Layout/LayoutMobileProfile/LayoutMobileProfile.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Avatar */ "@material-ui/core/Avatar");
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_icons_CalendarToday__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/CalendarToday */ "@material-ui/icons/CalendarToday");
/* harmony import */ var _material_ui_icons_CalendarToday__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_CalendarToday__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _components_ScrollMenu_ScrollMenu__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/ScrollMenu/ScrollMenu */ "./components/ScrollMenu/ScrollMenu.js");
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/Divider */ "@material-ui/core/Divider");
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _components_Avatar_UserAvatar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../components/Avatar/UserAvatar */ "./components/Avatar/UserAvatar.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  setAxiosAuthentication
} = __webpack_require__(/*! ../../utils/authentication */ "./utils/authentication.js");


















const {
  isEditableUser
} = __webpack_require__(/*! ../../utils/functions */ "./utils/functions.js");

class LayoutMobileProfile extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentDidMount", () => {
      setAxiosAuthentication();
      axios__WEBPACK_IMPORTED_MODULE_8___default.a.get(`/myAlfred/api/users/users/${this.props.user}`).then(res => {
        this.setState({
          user: res.data
        });
      }).catch(err => console.error(err));
    });

    this.state = {
      currentUrlIndex: '',
      myProfilUrl: false,
      user: null
    };
    this.nonlogged_items = [{
      label: 'À propos',
      url: '/about'
    }, {
      label: 'Services',
      url: '/services'
    }, //{ label: 'Photos', url: '/pictures' }, TODO : Albums 899538 899547
    {
      label: 'Avis',
      url: '/reviews'
    }];
    this.logged_items = [{
      label: 'À propos',
      url: '/about'
    }, {
      label: 'Mes services',
      url: '/services'
    }, //{ label: 'Mes photos', url: '/pictures' }, TODO : Albums 899538 899547
    {
      label: 'Mes avis',
      url: '/reviews'
    }];
    this.logged_alfred_items = [{
      label: 'À propos',
      url: '/about'
    }, {
      label: 'Mes services',
      url: '/services'
    }, //{ label: 'Mes photos', url: '/pictures' }, TODO : Albums 899538 899547
    {
      label: 'Mes avis',
      url: '/reviews'
    }, {
      label: 'Mon calendrier',
      url: '/calendar'
    }, {
      label: 'Mes statistiques',
      url: '/statistics'
    }];
  }

  render() {
    const {
      children,
      classes,
      index,
      currentIndex
    } = this.props;
    const {
      user,
      items
    } = this.state;

    if (!user) {
      return null;
    }

    const menuItems = isEditableUser(this.props.user) ? user.is_alfred ? this.logged_alfred_items : this.logged_items : this.nonlogged_items;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.layoutMobileProfilHeader
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_2___default.a, {
      "aria-label": "ArrowBackIosIcon",
      onClick: () => next_router__WEBPACK_IMPORTED_MODULE_3___default.a.back()
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ArrowBackIos__WEBPACK_IMPORTED_MODULE_4___default.a, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.layoutMobileLayoutProfileHeader
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.profilLayoutAvatar
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Avatar_UserAvatar__WEBPACK_IMPORTED_MODULE_15__["default"], {
      alt: user.firstname,
      user: user,
      className: classes.cardPreviewLarge
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        display: 'flex',
        height: '40%',
        alignItems: 'center',
        marginTop: '10vh',
        marginLeft: '5vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, `Je m'appelle ${user ? user.firstname : ''}`)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10___default.a, {
      style: {
        color: 'rgba(39,37,37,35%)'
      }
    }, "et j\u2019ai h\xE2te de vous rencontrer !"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginTop: '5vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_14___default.a, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.profilLayoutScrollMenu
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ScrollMenu_ScrollMenu__WEBPACK_IMPORTED_MODULE_13__["default"], {
      categories: menuItems,
      mode: 'profile',
      indexCat: index,
      extraParams: {
        user: this.props.user
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        padding: '10%'
      }
    }, children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        position: 'fixed',
        bottom: '3%',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        zIndex: 4
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        width: '100%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NavBar_MobileNavbar__WEBPACK_IMPORTED_MODULE_5__["default"], {
      currentIndex: currentIndex
    }))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6___default()(_static_css_components_Layout_LayoutMobileProfile_LayoutMobileProfile__WEBPACK_IMPORTED_MODULE_7__["default"])(LayoutMobileProfile));

/***/ }),

/***/ "./hoc/Layout/NavBar/MobileNavbar.js":
/*!*******************************************!*\
  !*** ./hoc/Layout/NavBar/MobileNavbar.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_BottomNavigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/BottomNavigation */ "@material-ui/core/BottomNavigation");
/* harmony import */ var _material_ui_core_BottomNavigation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_BottomNavigation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/BottomNavigationAction */ "@material-ui/core/BottomNavigationAction");
/* harmony import */ var _material_ui_core_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_icons_Home__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/Home */ "@material-ui/icons/Home");
/* harmony import */ var _material_ui_icons_Home__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Home__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/icons/Search */ "@material-ui/icons/Search");
/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_icons_CalendarToday__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/icons/CalendarToday */ "@material-ui/icons/CalendarToday");
/* harmony import */ var _material_ui_icons_CalendarToday__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_CalendarToday__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/icons/MailOutline */ "@material-ui/icons/MailOutline");
/* harmony import */ var _material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_icons_Person__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/Person */ "@material-ui/icons/Person");
/* harmony import */ var _material_ui_icons_Person__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Person__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "@material-ui/core/styles/withStyles");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _static_css_components_MobileNavbar_MobileNavbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../static/css/components/MobileNavbar/MobileNavbar */ "./static/css/components/MobileNavbar/MobileNavbar.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _components_LogIn_LogIn__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../components/LogIn/LogIn */ "./components/LogIn/LogIn.js");
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/DialogContent */ "@material-ui/core/DialogContent");
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/Dialog */ "@material-ui/core/Dialog");
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/core/Slide */ "@material-ui/core/Slide");
/* harmony import */ var _material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ "@material-ui/core/DialogTitle");
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _components_Register_Register__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../components/Register/Register */ "./components/Register/Register.js");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @material-ui/core/IconButton */ "@material-ui/core/IconButton");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @material-ui/icons/Close */ "@material-ui/icons/Close");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _material_ui_icons_GroupAdd__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @material-ui/icons/GroupAdd */ "@material-ui/icons/GroupAdd");
/* harmony import */ var _material_ui_icons_GroupAdd__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_GroupAdd__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @material-ui/core/TextField */ "@material-ui/core/TextField");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _material_ui_core_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @material-ui/core/SwipeableDrawer */ "@material-ui/core/SwipeableDrawer");
/* harmony import */ var _material_ui_core_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @material-ui/icons/Clear */ "@material-ui/icons/Clear");
/* harmony import */ var _material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @material-ui/core/FormControl */ "@material-ui/core/FormControl");
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _material_ui_core_Select__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @material-ui/core/Select */ "@material-ui/core/Select");
/* harmony import */ var _material_ui_core_Select__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @material-ui/core/MenuItem */ "@material-ui/core/MenuItem");
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! algolia-places-react */ "algolia-places-react");
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(algolia_places_react__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../../../utils/i18n */ "./utils/i18n.js");
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(_utils_i18n__WEBPACK_IMPORTED_MODULE_31__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const {
  setAxiosAuthentication
} = __webpack_require__(/*! ../../../utils/authentication */ "./utils/authentication.js");
























const {
  getLoggedUserId
} = __webpack_require__(/*! ../../../utils/functions */ "./utils/functions.js");











const Transition = react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(function Transition(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_15___default.a, _extends({
    direction: "up",
    ref: ref
  }, props));
});
const DialogTitle = _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_8___default()(_static_css_components_MobileNavbar_MobileNavbar__WEBPACK_IMPORTED_MODULE_9__["default"])(props => {
  const {
    children,
    classes,
    onClose,
    ...other
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_16___default.a, _extends({
    disableTypography: true,
    className: classes.root
  }, other), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_19__["Typography"], {
    variant: "h6"
  }, children), onClose ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_20___default.a, {
    "aria-label": "close",
    className: classes.closeButton,
    onClick: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_21___default.a, null)) : null);
});

class MobileNavbar extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "needRefresh", () => {
      this.setState({
        setOpenLogin: false
      });
      next_router__WEBPACK_IMPORTED_MODULE_10___default.a.push('/search?search=1');
    });

    _defineProperty(this, "handleMenuClose", () => {
      this.setState({
        anchorEl: null
      });
    });

    _defineProperty(this, "handleOpenRegister", e => {
      this.handleMenuClose();
      this.setState({
        setOpenRegister: true,
        setOpenLogin: false
      });
    });

    _defineProperty(this, "handleOpenLogin", e => {
      this.handleMenuClose();
      this.setState({
        setOpenLogin: true,
        setOpenRegister: false
      });
    });

    _defineProperty(this, "handleCloseLogin", () => {
      this.setState({
        setOpenLogin: false
      });
    });

    _defineProperty(this, "handleCloseRegister", () => {
      if (this.state.activeStep === 2) {
        this.setState({
          setOpenRegister: false
        }, () => this.componentDidMount());
      } else {
        this.setState({
          setOpenRegister: false
        });
      }
    });

    _defineProperty(this, "getData", e => {
      this.setState({
        activeStep: e
      });
    });

    _defineProperty(this, "findService", () => {
      var queryParams = {
        search: 1
      };

      if (this.state.keyword) {
        queryParams['keyword'] = this.state.keyword;
      }

      if (this.state.city) {
        queryParams['city'] = this.state.city;
      }

      if (this.state.gps) {
        queryParams['gps'] = JSON.stringify(this.state.gps);
      }

      if (this.state.selectedAddress) {
        queryParams['selectedAddress'] = this.state.selectedAddress;
      }

      next_router__WEBPACK_IMPORTED_MODULE_10___default.a.push({
        pathname: '/search',
        query: queryParams
      });
    });

    _defineProperty(this, "modalLogin", classes => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_14___default.a, {
        scroll: 'paper',
        "aria-labelledby": "scroll-dialog-title",
        "aria-describedby": "scroll-dialog-description",
        className: classes.navbarModal,
        open: this.state.setOpenLogin,
        onClose: this.handleCloseLogin,
        TransitionComponent: Transition,
        classes: {
          paperWidthSm: classes.navbarPaperWidth
        },
        disableBackdropClick: true,
        disableEscapeKeyDown: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DialogTitle, {
        id: "customized-dialog-title",
        onClose: this.handleCloseLogin
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_13___default.a, {
        classes: {
          root: classes.navbarWidthLoginContent
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, {
        className: classes.navbarPaper
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_LogIn_LogIn__WEBPACK_IMPORTED_MODULE_12__["default"], {
        callRegister: this.handleOpenRegister,
        login: this.needRefresh
      }))));
    });

    _defineProperty(this, "onChange", e => {
      let {
        name,
        value
      } = e.target;
      this.setState({
        [name]: value
      });

      if (name === 'selectedAddress') {
        if (value === 'addAddress') {
          next_router__WEBPACK_IMPORTED_MODULE_10___default.a.push('/account/myAddresses?indexAccount=4');
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

    _defineProperty(this, "modalRegister", classes => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_14___default.a, {
        scroll: 'paper',
        "aria-labelledby": "scroll-dialog-title",
        "aria-describedby": "scroll-dialog-description",
        className: classes.navbarModal,
        open: this.state.setOpenRegister,
        onClose: this.handleCloseRegister,
        TransitionComponent: Transition,
        disableBackdropClick: true,
        disableEscapeKeyDown: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DialogTitle, {
        id: "customized-dialog-title",
        onClose: this.handleCloseRegister
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_13___default.a, {
        dividers: false,
        className: classes.navbarMuidialogContent
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, {
        className: classes.navbarPaper
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Register_Register__WEBPACK_IMPORTED_MODULE_17__["default"], {
        callLogin: this.handleOpenLogin,
        sendParentData: this.getData
      }))));
    });

    _defineProperty(this, "modalMobileSearchBarInput", classes => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_24___default.a, {
        anchor: 'bottom',
        open: this.state.modalMobileSearchBarInput,
        onOpen: () => this.setState({
          modalMobileSearchBarInput: true
        }),
        onClose: () => this.setState({
          modalMobileSearchBarInput: false,
          mobileStepSearch: 0,
          keyword: null,
          city: undefined,
          gps: ''
        }),
        className: classes.drawerStyle
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, {
        container: true,
        style: {
          height: '100%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, {
        item: true,
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_20___default.a, {
        "aria-label": "delete",
        onClick: () => this.setState({
          modalMobileSearchBarInput: false,
          mobileStepSearch: 0,
          keyword: null,
          city: undefined,
          gps: ''
        })
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_25___default.a, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, this.state.mobileStepSearch === 0 ? 'Votre Recherche' : this.state.mobileStepSearch === 1 ? 'Où' : 'Dates'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, {
        item: true,
        container: true,
        spacing: 3,
        style: {
          margin: 0
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, {
        item: true,
        xs: 12,
        style: {
          display: 'flex',
          justifyContent: 'center'
        }
      }, this.state.mobileStepSearch === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_23___default.a, {
        value: this.state.keyword,
        onChange: this.onChange,
        name: 'keyword',
        label: 'Quel service recherchez-vous ? ',
        onKeyPress: e => {
          e.key === 'Enter' && e.preventDefault();
        },
        variant: "outlined",
        classes: {
          root: classes.modalMobileSearchBarInputTextField
        }
      }) : this.state.user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_26___default.a, {
        variant: "outlined"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_27___default.a, {
        id: "outlined-select-currency",
        value: 'main',
        name: 'selectedAddress',
        onChange: e => {
          this.onChange(e);
        },
        classes: {
          selectMenu: classes.fitlerMenuLogged
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_28___default.a, {
        value: 'main',
        style: {
          whiteSpace: 'nowrap'
        }
      }, "Adresse principale, ", ' ' + this.state.user.billing_address.address, " ", this.state.user.billing_address.zip_code, ",", this.state.user.billing_address.city), this.state.user.service_address.map((e, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_28___default.a, {
        value: e._id,
        key: index
      }, e.label + ', ', " ", ' ' + e.address, ",", e.zip_code, " ", e.city)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_28___default.a, {
        value: 'all'
      }, "Partout, Rechercher des Alfred partout"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_28___default.a, {
        value: 'addAddress'
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_19__["Typography"], {
        style: {
          color: '#2FBCD3',
          cursor: 'pointer'
        }
      }, "Ajouter une adresse"))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_23___default.a, {
        item: true,
        xs: 12,
        classes: {
          root: classes.modalMobileSearchBartTextFieldWhereP
        },
        value: this.state.city,
        label: _utils_i18n__WEBPACK_IMPORTED_MODULE_31__["SEARCHBAR"].where,
        variant: 'outlined',
        InputProps: {
          inputComponent: inputRef => {
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(algolia_places_react__WEBPACK_IMPORTED_MODULE_29___default.a, _extends({}, inputRef, {
              placeholder: '',
              className: classes.navbarAlgoliaPlace,
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
                gps: ''
              })
            }));
          },
          disableUnderline: true
        }
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, {
        item: true,
        xs: 12,
        style: {
          display: 'flex',
          justifyContent: 'center'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18___default.a, {
        style: {
          width: '90%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_30___default.a, {
        onClick: () => this.state.mobileStepSearch === 0 ? this.setState({
          mobileStepSearch: this.state.mobileStepSearch + 1
        }) : this.findService(),
        color: 'primary',
        classes: {
          root: classes.buttonNextRoot
        },
        variant: 'contained'
      }, this.state.mobileStepSearch === 0 ? 'Suivant' : 'Rechercher')))));
    });

    this.state = {
      user: null,
      indexAccount: props.indexAccount,
      currentIndex: 0,
      anchorEl: null,
      setOpenLogin: false,
      setOpenRegister: false,
      activeStep: 0,
      modalMobileSearchBarInput: false,
      mobileStepSearch: 0,
      keyword: '',
      city: undefined,
      gps: '',
      logged: false
    };
  }

  componentDidMount() {
    let query = next_router__WEBPACK_IMPORTED_MODULE_10___default.a.query;

    if (query.login === 'true') {
      this.handleOpenLogin();
    }

    if (getLoggedUserId()) {
      this.setState({
        logged: true,
        selectedAddress: 'main'
      });
    }

    setAxiosAuthentication();
    axios__WEBPACK_IMPORTED_MODULE_11___default.a.get('/myAlfred/api/users/current').then(res => {
      var allAddresses = {
        'main': res.data.billing_address
      };
      res.data.service_address.forEach(addr => {
        allAddresses[addr._id] = addr;
      });
      this.setState({
        user: res.data,
        allAddresses: allAddresses
      });
    }).catch(err => console.error(err));
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
      classes,
      currentIndex
    } = this.props;
    const {
      setOpenLogin,
      setOpenRegister,
      modalMobileSearchBarInput,
      logged
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_BottomNavigation__WEBPACK_IMPORTED_MODULE_1___default.a, {
      value: currentIndex,
      showLabels: true,
      classes: {
        root: classes.navigationRoot
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_2___default.a, {
      onClick: () => next_router__WEBPACK_IMPORTED_MODULE_10___default.a.push('/'),
      label: "Accueil",
      classes: {
        root: classes.navigationActionRoot,
        label: classes.label
      },
      value: 0,
      icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Home__WEBPACK_IMPORTED_MODULE_3___default.a, null)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_2___default.a, {
      onClick: () => this.setState({
        modalMobileSearchBarInput: true
      }),
      label: "Explorer",
      classes: {
        root: classes.navigationActionRoot,
        label: classes.label
      },
      value: 1,
      icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_4___default.a, null)
    }), logged ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_2___default.a, {
      onClick: () => next_router__WEBPACK_IMPORTED_MODULE_10___default.a.push('/reservations/reservations'),
      label: "R\xE9servations",
      classes: {
        root: classes.navigationActionRoot,
        label: classes.label
      },
      value: 2,
      icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_CalendarToday__WEBPACK_IMPORTED_MODULE_5___default.a, null)
    }) : null, logged ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_2___default.a, {
      onClick: () => next_router__WEBPACK_IMPORTED_MODULE_10___default.a.push(`/profile/messages?user=${this.state.user._id}`),
      label: "Messages",
      classes: {
        root: classes.navigationActionRoot,
        label: classes.label
      },
      value: 3,
      icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_6___default.a, null)
    }) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_2___default.a, {
      onClick: logged ? () => next_router__WEBPACK_IMPORTED_MODULE_10___default.a.push('/account/myProfile') : this.handleOpenLogin,
      label: logged ? "Profil" : 'Connexion',
      classes: {
        root: classes.navigationActionRoot,
        label: classes.label
      },
      value: 4,
      icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Person__WEBPACK_IMPORTED_MODULE_7___default.a, null)
    }), !logged ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_2___default.a, {
      onClick: this.handleOpenRegister,
      label: 'Inscription',
      classes: {
        root: classes.navigationActionRoot,
        label: classes.label
      },
      value: 5,
      icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_GroupAdd__WEBPACK_IMPORTED_MODULE_22___default.a, null)
    }) : null, setOpenLogin ? this.modalLogin(classes) : null, setOpenRegister ? this.modalRegister(classes) : null, modalMobileSearchBarInput ? this.modalMobileSearchBarInput(classes) : null);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_8___default()(_static_css_components_MobileNavbar_MobileNavbar__WEBPACK_IMPORTED_MODULE_9__["default"])(MobileNavbar));

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
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/MenuItem */ "@material-ui/core/MenuItem");
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Menu */ "@material-ui/core/Menu");
/* harmony import */ var _material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_LogIn_LogIn__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/LogIn/LogIn */ "./components/LogIn/LogIn.js");
/* harmony import */ var _components_Register_Register__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../components/Register/Register */ "./components/Register/Register.js");
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Dialog */ "@material-ui/core/Dialog");
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/DialogContent */ "@material-ui/core/DialogContent");
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/Slide */ "@material-ui/core/Slide");
/* harmony import */ var _material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ "@material-ui/core/DialogTitle");
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/icons/Close */ "@material-ui/icons/Close");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/core/Paper */ "@material-ui/core/Paper");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/core/Divider */ "@material-ui/core/Divider");
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/icons/Menu */ "@material-ui/icons/Menu");
/* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/icons/Search */ "@material-ui/icons/Search");
/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! algolia-places-react */ "algolia-places-react");
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(algolia_places_react__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../utils/i18n */ "./utils/i18n.js");
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_utils_i18n__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! react-datepicker */ "react-datepicker");
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(react_datepicker__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @material-ui/core/TextField */ "@material-ui/core/TextField");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _material_ui_core_Select__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @material-ui/core/Select */ "@material-ui/core/Select");
/* harmony import */ var _material_ui_core_Select__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @material-ui/core/FormControl */ "@material-ui/core/FormControl");
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var _material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @material-ui/core/Tabs */ "@material-ui/core/Tabs");
/* harmony import */ var _material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @material-ui/core/Tab */ "@material-ui/core/Tab");
/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var _components_Link_Link__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../../components/Link/Link */ "./components/Link/Link.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @material-ui/core/Hidden */ "@material-ui/core/Hidden");
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "@material-ui/core/styles/withStyles");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var _static_css_components_NavBar_NavBar__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../../../static/css/components/NavBar/NavBar */ "./static/css/components/NavBar/NavBar.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_33___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_33__);
/* harmony import */ var _material_ui_icons_Tune__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @material-ui/icons/Tune */ "@material-ui/icons/Tune");
/* harmony import */ var _material_ui_icons_Tune__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Tune__WEBPACK_IMPORTED_MODULE_34__);
/* harmony import */ var _material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @material-ui/core/InputLabel */ "@material-ui/core/InputLabel");
/* harmony import */ var _material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_35___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_35__);
/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @material-ui/core/DialogActions */ "@material-ui/core/DialogActions");
/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_36___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_36__);
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @material-ui/core/FormControlLabel */ "@material-ui/core/FormControlLabel");
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_37___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_37__);
/* harmony import */ var _material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @material-ui/core/Switch */ "@material-ui/core/Switch");
/* harmony import */ var _material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_38___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_38__);
/* harmony import */ var react_dates__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! react-dates */ "react-dates");
/* harmony import */ var react_dates__WEBPACK_IMPORTED_MODULE_39___default = /*#__PURE__*/__webpack_require__.n(react_dates__WEBPACK_IMPORTED_MODULE_39__);
/* harmony import */ var _material_ui_core_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @material-ui/core/SwipeableDrawer */ "@material-ui/core/SwipeableDrawer");
/* harmony import */ var _material_ui_core_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_40___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_40__);
/* harmony import */ var _material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @material-ui/icons/Clear */ "@material-ui/icons/Clear");
/* harmony import */ var _material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_41___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_41__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const {
  setAxiosAuthentication
} = __webpack_require__(/*! ../../../utils/authentication */ "./utils/authentication.js");









const {
  clearAuthenticationToken
} = __webpack_require__(/*! ../../../utils/authentication */ "./utils/authentication.js");




































const Transition = react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(function Transition(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_13___default.a, _extends({
    direction: "up",
    ref: ref
  }, props));
});
const DialogTitle = _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_31___default()(_static_css_components_NavBar_NavBar__WEBPACK_IMPORTED_MODULE_32__["default"])(props => {
  const {
    children,
    classes,
    onClose,
    ...other
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_14___default.a, _extends({
    disableTypography: true,
    className: classes.root
  }, other), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_33__["Typography"], {
    variant: "h6"
  }, children), onClose ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4___default.a, {
    "aria-label": "close",
    className: classes.closeButton,
    onClick: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_15___default.a, null)) : null);
});

class NavBar extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "logout", () => {
      clearAuthenticationToken();
      localStorage.removeItem('path');
      clearAuthenticationToken();

      if (this.state.ifHomePage) {
        window.location.reload(false);
      } else {
        next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push('/');
      }
    });

    _defineProperty(this, "handleMenuClose", () => {
      this.setState({
        anchorEl: null
      });
    });

    _defineProperty(this, "handleOpenLogin", e => {
      this.handleMenuClose();
      this.setState({
        setOpenLogin: true,
        setOpenRegister: false
      });
    });

    _defineProperty(this, "handleCloseLogin", () => {
      this.setState({
        setOpenLogin: false
      });
    });

    _defineProperty(this, "handleOpenRegister", e => {
      this.handleMenuClose();
      this.setState({
        setOpenRegister: true,
        setOpenLogin: false
      });
    });

    _defineProperty(this, "handleCloseRegister", () => {
      if (this.state.activeStep === 2) {
        this.setState({
          setOpenRegister: false
        }, () => this.componentDidMount());
      } else {
        this.setState({
          setOpenRegister: false
        });
      }
    });

    _defineProperty(this, "needRefresh", () => {
      this.setState({
        setOpenLogin: false
      });
      const path = localStorage.getItem('path');

      if (path) {
        localStorage.removeItem('path');
        next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push(path);
      } else {
        next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push('/search?search=1');
      }
    });

    _defineProperty(this, "getData", e => {
      this.setState({
        activeStep: e
      });
    });

    _defineProperty(this, "onSuggestions", ({
      query
    }) => {
      this.setState({
        city: query
      });
    });

    _defineProperty(this, "onChange", e => {
      let {
        name,
        value
      } = e.target;
      this.setState({
        [name]: value
      });

      if (name === 'selectedAddress') {
        if (value === 'addAddress') {
          next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push('/account/myAddresses?indexAccount=4');
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

    _defineProperty(this, "handleOpenMenuItem", event => {
      this.setState({
        anchorEl: event.currentTarget
      });
    });

    _defineProperty(this, "handleClosenMenuItem", () => {
      this.setState({
        anchorEl: false
      });
    });

    _defineProperty(this, "findService", () => {
      var queryParams = {
        search: 1
      };

      if (this.state.keyword) {
        queryParams['keyword'] = this.state.keyword;
      }

      if (this.state.city) {
        queryParams['city'] = this.state.city;
      }

      if (this.state.gps) {
        queryParams['gps'] = JSON.stringify(this.state.gps);
      }

      if (this.state.selectedAddress) {
        queryParams['selectedAddress'] = this.state.selectedAddress;
      }

      next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push({
        pathname: '/search',
        query: queryParams
      });
    });

    _defineProperty(this, "statusFilterChanged", event => {
      this.setState({
        [event.target.name]: event.target.checked,
        modalFilters: false
      }, () => this.props.filter());
    });

    _defineProperty(this, "handleModalSearchBarInput", () => {
      this.setState({
        modalMobileSearchBarInput: true
      });
    });

    _defineProperty(this, "mobileSearchBarInput", classes => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
        className: this.state.ifHomePage ? classes.navbarSearchContainer : classes.navbarSearchContainerSearchP,
        onClick: this.handleModalSearchBarInput
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_16___default.a, {
        classes: {
          root: this.state.ifHomePage ? classes.navbarSearch : classes.navbarSearchP
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4___default.a, {
        classes: {
          root: classes.iconButton
        },
        "aria-label": "search"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_19___default.a, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
        style: {
          marginLeft: '2vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_33__["Typography"], null, "Commencez votre recherche"))));
    });

    _defineProperty(this, "modalMobileSearchBarInput", classes => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_40___default.a, {
        anchor: 'bottom',
        open: this.state.modalMobileSearchBarInput,
        onOpen: () => this.setState({
          modalMobileSearchBarInput: true
        }),
        onClose: () => this.setState({
          modalMobileSearchBarInput: false,
          mobileStepSearch: 0,
          keyword: null,
          city: undefined,
          gps: ''
        }),
        className: classes.drawerStyle
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
        container: true,
        style: {
          height: '100%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
        item: true,
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4___default.a, {
        "aria-label": "delete",
        onClick: () => this.setState({
          modalMobileSearchBarInput: false,
          mobileStepSearch: 0,
          keyword: null,
          city: undefined,
          gps: ''
        })
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_41___default.a, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, this.state.mobileStepSearch === 0 ? 'Votre Recherche' : this.state.mobileStepSearch === 1 ? 'Où' : 'Dates'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
        item: true,
        container: true,
        spacing: 3,
        style: {
          margin: 0
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
        item: true,
        xs: 12,
        style: {
          display: 'flex',
          justifyContent: 'center'
        }
      }, this.state.mobileStepSearch === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_23___default.a, {
        value: this.state.keyword,
        onChange: this.onChange,
        name: 'keyword',
        label: this.state.ifHomePage ? 'Quel service recherchez-vous ? ' : false,
        onKeyPress: e => {
          e.key === 'Enter' && e.preventDefault();
        },
        variant: "outlined",
        classes: {
          root: classes.modalMobileSearchBarInputTextField
        }
      }) : this.state.user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_25___default.a, {
        variant: "outlined"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_24___default.a, {
        id: "outlined-select-currency",
        value: this.props.selectedAddress ? this.props.selectedAddress : 'main',
        name: 'selectedAddress',
        onChange: e => {
          this.onChange(e);
        },
        classes: {
          selectMenu: classes.fitlerMenuLogged
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5___default.a, {
        value: 'main',
        style: {
          whiteSpace: 'nowrap'
        }
      }, "Adresse principale, ", ' ' + this.state.user.billing_address.address, " ", this.state.user.billing_address.zip_code, ",", this.state.user.billing_address.city), this.state.user.service_address.map((e, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5___default.a, {
        value: e._id,
        key: index
      }, e.label + ', ', " ", ' ' + e.address, ",", e.zip_code, " ", e.city)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5___default.a, {
        value: 'all'
      }, "Partout, Rechercher des Alfred partout"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5___default.a, {
        value: 'addAddress'
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_33__["Typography"], {
        style: {
          color: '#2FBCD3',
          cursor: 'pointer'
        }
      }, "Ajouter une adresse"))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_23___default.a, {
        item: true,
        xs: 12,
        classes: {
          root: classes.modalMobileSearchBartTextFieldWhereP
        },
        value: this.state.city,
        label: _utils_i18n__WEBPACK_IMPORTED_MODULE_21__["SEARCHBAR"].where,
        variant: 'outlined',
        InputProps: {
          inputComponent: inputRef => {
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(algolia_places_react__WEBPACK_IMPORTED_MODULE_20___default.a, _extends({}, inputRef, {
              placeholder: '',
              className: classes.navbarAlgoliaPlace,
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
                gps: ''
              })
            }));
          },
          disableUnderline: true
        }
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
        item: true,
        xs: 12,
        style: {
          display: 'flex',
          justifyContent: 'center'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
        style: {
          width: '90%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default.a, {
        onClick: () => this.state.mobileStepSearch === 0 ? this.setState({
          mobileStepSearch: this.state.mobileStepSearch + 1
        }) : this.findService(),
        color: 'primary',
        classes: {
          root: classes.buttonNextRoot
        },
        variant: 'contained'
      }, this.state.mobileStepSearch === 0 ? 'Suivant' : 'Rechercher')))));
    });

    _defineProperty(this, "mobileSearchBarInputSearchPage", classes => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
        className: classes.navbarSearchContainerSearchPage
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_16___default.a, {
        classes: {
          root: classes.navbarSearch
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4___default.a, {
        classes: {
          root: classes.iconButton
        },
        "aria-label": "search",
        onClick: this.handleModalSearchBarInput
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_19___default.a, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
        style: {
          marginLeft: '2vh',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          cursor: 'pointer'
        },
        onClick: this.handleModalSearchBarInput
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_33__["Typography"], {
        style: {
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden'
        }
      }, "Commencez votre recherche")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
        style: {
          height: 30
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_17___default.a, {
        style: {
          width: 2
        },
        orientation: "vertical"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4___default.a, {
        color: "primary",
        "aria-label": "directions",
        onClick: () => this.setState({
          modalFilters: true
        })
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Tune__WEBPACK_IMPORTED_MODULE_34___default.a, null))));
    });

    _defineProperty(this, "modalMobileFilter", classes => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_11___default.a, {
        onClose: () => this.setState({
          modalFilters: false
        }),
        "aria-labelledby": "customized-dialog-title",
        open: this.state.modalFilters,
        classes: {
          paper: classes.dialogNavbarMobileFilter
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DialogTitle, {
        id: "customized-dialog-title",
        onClose: () => this.setState({
          modalFilters: false
        })
      }, "Filtres"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_12___default.a, {
        dividers: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_37___default.a, {
        control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_38___default.a, {
          checked: this.state.proSelected,
          onChange: e => {
            this.statusFilterChanged(e);
          },
          value: this.state.proSelected,
          color: "primary",
          name: 'proSelected'
        }),
        label: "Pro"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_37___default.a, {
        control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_38___default.a, {
          checked: this.state.individualSelected,
          onChange: e => {
            this.statusFilterChanged(e);
          },
          value: this.state.individualSelected,
          color: "primary",
          name: 'individualSelected'
        }),
        label: "Particulier"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_17___default.a, {
        style: {
          width: '100%',
          marginTop: '2vh',
          marginBottom: '2vh'
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_dates__WEBPACK_IMPORTED_MODULE_39__["DateRangePicker"], {
        startDate: this.state.startDate // momentPropTypes.momentObj or null,
        ,
        startDatePlaceholderText: 'Début',
        endDatePlaceholderText: 'Fin',
        startDateId: "your_unique_start_date_id" // PropTypes.string.isRequired,
        ,
        endDate: this.state.endDate // momentPropTypes.momentObj or null,
        ,
        endDateId: "your_unique_end_date_id" // PropTypes.string.isRequired,
        ,
        onDatesChange: ({
          startDate,
          endDate
        }) => this.onChangeInterval(startDate, endDate) // PropTypes.func.isRequired,
        ,
        focusedInput: this.state.focusedInput // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        ,
        onFocusChange: focusedInput => this.setState({
          focusedInput
        }) // PropTypes.func.isRequired,
        ,
        minimumNights: 0,
        numberOfMonths: 1
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_36___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default.a, {
        autoFocus: true,
        onClick: () => this.setState({
          modalFilters: false
        }, () => this.props.filter()),
        color: "primary"
      }, "Afficher les r\xE9sultats")));
    });

    _defineProperty(this, "searchBarInput", classes => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
        className: this.state.ifHomePage ? classes.navbarSearchContainer : classes.navbarSearchContainerSearchP
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_16___default.a, {
        classes: {
          root: this.state.ifHomePage ? classes.navbarSearch : classes.navbarSearchP
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
        className: classes.navbarTextFieldService
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_23___default.a, {
        classes: {
          root: this.state.ifHomePage ? classes.navbarRootTextField : classes.navbarRootTextFieldP
        },
        placeholder: _utils_i18n__WEBPACK_IMPORTED_MODULE_21__["SEARCHBAR"].what,
        value: this.state.keyword,
        onChange: this.onChange,
        name: 'keyword',
        label: this.state.ifHomePage ? _utils_i18n__WEBPACK_IMPORTED_MODULE_21__["SEARCHBAR"].labelWhat : false,
        onKeyPress: e => {
          e.key === 'Enter' && e.preventDefault();
        },
        InputLabelProps: {
          shrink: true
        },
        InputProps: {
          disableUnderline: true
        },
        style: {
          marginLeft: 20
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_17___default.a, {
        className: classes.divider,
        orientation: "vertical"
      })), this.state.user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
        className: classes.navbarAddressContainer
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_25___default.a, {
        className: classes.navbarFormControlAddress
      }, this.state.ifHomePage ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_35___default.a, {
        shrink: true,
        id: "demo-simple-select-placeholder-label-label"
      }, "L'Adresse") : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_24___default.a, {
        disableUnderline: true,
        id: "outlined-select-currency",
        value: this.state.selectedAddress || 'main',
        name: 'selectedAddress',
        onChange: e => {
          this.onChange(e);
        },
        classes: {
          root: classes.selectRoot
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5___default.a, {
        value: 'main'
      }, "Adresse principale, ", ' ' + this.state.user.billing_address.address, " ", this.state.user.billing_address.zip_code, ",", this.state.user.billing_address.city), this.state.user.service_address.map((e, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5___default.a, {
        value: e._id,
        key: index
      }, e.label + ', ', " ", ' ' + e.address, ",", e.zip_code, " ", e.city)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5___default.a, {
        value: 'all'
      }, "Partout, Rechercher des Alfred partout"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5___default.a, {
        value: 'addAddress'
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_33__["Typography"], {
        style: {
          color: '#2FBCD3',
          cursor: 'pointer'
        }
      }, "Ajouter une adresse"))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
        className: this.state.ifHomePage ? classes.navbarAlgoliaContent : classes.navbarAlgoliaContentP
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_23___default.a, {
        label: this.state.ifHomePage ? _utils_i18n__WEBPACK_IMPORTED_MODULE_21__["SEARCHBAR"].labelWhere : false,
        classes: {
          root: this.state.ifHomePage ? classes.navbarRootTextFieldWhere : classes.navbarRootTextFieldWhereP
        },
        InputLabelProps: {
          shrink: true
        },
        value: this.state.city,
        InputProps: {
          inputComponent: inputRef => {
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(algolia_places_react__WEBPACK_IMPORTED_MODULE_20___default.a, _extends({}, inputRef, {
              placeholder: _utils_i18n__WEBPACK_IMPORTED_MODULE_21__["SEARCHBAR"].where,
              className: classes.navbarAlgoliaPlace,
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
            }));
          },
          disableUnderline: true
        }
      })), this.state.logged === false ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
        className: classes.navbarDatePickerMain
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_17___default.a, {
        className: classes.divider,
        orientation: "vertical"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
        className: this.state.ifHomePage ? classes.navbarDatePickerContainer : classes.navbarDatePickerContainerP
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_23___default.a, {
        label: this.state.ifHomePage ? _utils_i18n__WEBPACK_IMPORTED_MODULE_21__["SEARCHBAR"].labelWhen : false,
        classes: {
          root: this.state.ifHomePage ? classes.navbarRootTextFieldWhen : classes.navbarRootTextFieldWhenP
        },
        InputLabelProps: {
          shrink: true
        },
        InputProps: {
          inputComponent: inputRef => {
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_datepicker__WEBPACK_IMPORTED_MODULE_22___default.a, _extends({}, inputRef, {
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
              locale: "fr",
              showMonthDropdown: true,
              dateFormat: "dd/MM/yyyy",
              placeholderText: _utils_i18n__WEBPACK_IMPORTED_MODULE_21__["SEARCHBAR"].when,
              minDate: new Date(),
              className: this.state.ifHomePage ? classes.inputDatePicker : classes.inputDatePickerP
            }));
          },
          disableUnderline: true
        }
      }))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4___default.a, {
        classes: {
          root: classes.iconButton
        },
        "aria-label": "search",
        onClick: () => this.findService()
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_19___default.a, null)))));
    });

    this.state = {
      anchorEl: null,
      setOpenLogin: false,
      setOpenRegister: false,
      user: null,
      activeStep: 0,
      keyword: '',
      city: undefined,
      gps: '',
      dateSelected: '',
      ifHomePage: false,
      modalMobileSearchBarInput: false,
      mobileStepSearch: 0,
      ifSearchPage: false,
      modalFilters: false,
      individualSelected: false,
      proSelected: false,
      startDate: null,
      endDate: null,
      focusedInput: null
    };
  }

  componentDidMount() {
    let query = next_router__WEBPACK_IMPORTED_MODULE_7___default.a.query;

    if (next_router__WEBPACK_IMPORTED_MODULE_7___default.a.pathname === '/') {
      this.setState({
        ifHomePage: true
      });
    }

    if (next_router__WEBPACK_IMPORTED_MODULE_7___default.a.pathname === '/search') {
      this.setState({
        ifSearchPage: true
      });
    }

    if (query.login === 'true') {
      this.handleOpenLogin();
    }

    setAxiosAuthentication();
    axios__WEBPACK_IMPORTED_MODULE_29___default.a.get('/myAlfred/api/users/current').then(res => {
      var allAddresses = {
        'main': res.data.billing_address
      };
      res.data.service_address.forEach(addr => {
        allAddresses[addr._id] = addr;
      });
      this.setState({
        user: res.data,
        allAddresses: allAddresses
      });
    }).catch(err => console.error(err));
    this.setState({
      selectedAddress: this.props.selectedAddress || 'main'
    });
    this.setState({
      keyword: this.props.keyword || ''
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

  onChangeInterval(startDate, endDate) {
    if (startDate) {
      startDate.hour(0).minute(0).second(0).millisecond(0);
    }

    if (endDate) {
      endDate.hour(23).minute(59).second(59).millisecond(999);
    }

    this.setState({
      startDate: startDate,
      endDate: endDate
    });
  }

  render() {
    const {
      user,
      setOpenLogin,
      setOpenRegister,
      anchorEl,
      ifHomePage,
      modalMobileSearchBarInput,
      ifSearchPage,
      modalFilters
    } = this.state;
    const {
      classes,
      logged
    } = this.props;

    const modalLogin = () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_LogIn_LogIn__WEBPACK_IMPORTED_MODULE_9__["default"], {
        callRegister: this.handleOpenRegister,
        login: this.needRefresh
      });
    };

    const modalRegister = () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Register_Register__WEBPACK_IMPORTED_MODULE_10__["default"], {
        callLogin: this.handleOpenLogin,
        sendParentData: this.getData
      });
    };

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
      className: this.state.ifHomePage ? classes.navbarMainSytle : classes.navbarMainSytleP
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2___default.a, {
      position: 'static',
      className: this.state.ifHomePage ? classes.navbarAppBar : classes.navbarAppBarP
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_3___default.a, {
      classes: {
        root: this.state.ifHomePage ? classes.navBartoolbar : classes.navBartoolbarP
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_30___default.a, {
      only: ['xs']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
      className: this.state.ifHomePage ? classes.navbarTopContainer : classes.navbarTopContainerP
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
      className: ifHomePage ? classes.navbarLogoContainer : classes.navbarLogoContainerP,
      onClick: () => next_router__WEBPACK_IMPORTED_MODULE_7___default.a.push('/')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      alt: 'logo_myAlfred',
      title: 'logo_myAlfred',
      src: '../../../static/assets/icon/logo.svg',
      className: classes.logoMyAlfred,
      height: 64,
      style: {
        filter: 'invert(1)'
      }
    })), ifHomePage ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
      className: ifHomePage ? classes.navabarHomepageMenu : classes.navabarHomepageMenuP
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_26___default.a, {
      value: false,
      "aria-label": "simple tabs example"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      href: '/search?search=1'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_27___default.a, {
      classes: {
        root: classes.navbarTabRoot
      },
      label: _utils_i18n__WEBPACK_IMPORTED_MODULE_21__["NAVBAR_MENU"].ourServices
    })), user ? user.is_alfred ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      href: `/profile/services?user=${user._id}&indexAccount=1`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_27___default.a, {
      classes: {
        root: classes.navbarTabRoot
      },
      label: _utils_i18n__WEBPACK_IMPORTED_MODULE_21__["NAVBAR_MENU"].myServices
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      href: '/creaShop/creaShop'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_27___default.a, {
      classes: {
        root: classes.navbarTabRoot
      },
      label: _utils_i18n__WEBPACK_IMPORTED_MODULE_21__["NAVBAR_MENU"].registerServices
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      onClick: this.handleOpenRegister
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_27___default.a, {
      classes: {
        root: classes.navbarTabRoot
      },
      label: _utils_i18n__WEBPACK_IMPORTED_MODULE_21__["NAVBAR_MENU"].registerServices
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      href: '/footer/contact'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_27___default.a, {
      classes: {
        root: classes.navbarTabRoot
      },
      label: _utils_i18n__WEBPACK_IMPORTED_MODULE_21__["NAVBAR_MENU"].contactUs
    })))) : this.searchBarInput(classes), logged === true ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
      className: ifHomePage ? classes.navbarMenuBurgerContainer : classes.navbarMenuBurgerContainerP
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4___default.a, {
      "aria-label": "open drawer",
      onClick: this.handleOpenMenuItem
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_18___default.a, {
      style: {
        color: 'white'
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_6___default.a, {
      anchorEl: anchorEl,
      keepMounted: true,
      open: Boolean(anchorEl),
      onClose: this.handleClosenMenuItem,
      getContentAnchorEl: null,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center'
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'center'
      }
    }, user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5___default.a, null, "Bonjour ", user.firstname, " !"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      href: `/profile/about?user=${user._id}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5___default.a, null, "Mon profil")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      href: '/account/notifications'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5___default.a, null, "Mes param\xE8tres")), user.is_alfred ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      href: `/profile/services?user=${user._id}&indexAccount=1`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5___default.a, null, "Mes services")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      href: `/creaShop/creaShop`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5___default.a, null, "Proposer mes services")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      href: `/profile/messages?user=${user._id}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5___default.a, null, "Mes messages")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      href: `/reservations/reservations`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5___default.a, null, "Mes r\xE9servations")), user.is_admin ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      href: `/dashboard/home`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5___default.a, null, "Dashboard")) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5___default.a, {
      onClick: this.logout
    }, "D\xE9connexion")) : null)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
      className: ifHomePage ? classes.navbarButtonContainer : classes.navbarButtonContainerP
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.navBarlogIn,
      onClick: this.handleOpenLogin
    }, _utils_i18n__WEBPACK_IMPORTED_MODULE_21__["NAVBAR_MENU"].logIn), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_11___default.a, {
      scroll: 'paper',
      "aria-labelledby": "scroll-dialog-title",
      "aria-describedby": "scroll-dialog-description",
      className: classes.navbarModal,
      open: setOpenLogin,
      onClose: this.handleCloseLogin,
      TransitionComponent: Transition,
      classes: {
        paperWidthSm: classes.navbarPaperWidth
      },
      disableBackdropClick: true,
      disableEscapeKeyDown: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DialogTitle, {
      id: "customized-dialog-title",
      onClose: this.handleCloseLogin
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_12___default.a, {
      classes: {
        root: classes.navbarWidthLoginContent
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.navbarPaper
    }, modalLogin())))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8___default.a, {
      className: classes.navbarRegisterContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default.a, {
      variant: "outlined",
      classes: {
        root: classes.navbarSignIn
      },
      onClick: this.handleOpenRegister
    }, _utils_i18n__WEBPACK_IMPORTED_MODULE_21__["NAVBAR_MENU"].signIn), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_11___default.a, {
      scroll: 'paper',
      "aria-labelledby": "scroll-dialog-title",
      "aria-describedby": "scroll-dialog-description",
      className: classes.navbarModal,
      open: setOpenRegister,
      onClose: this.handleCloseRegister,
      TransitionComponent: Transition,
      disableBackdropClick: true,
      disableEscapeKeyDown: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DialogTitle, {
      id: "customized-dialog-title",
      onClose: this.handleCloseRegister
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_12___default.a, {
      dividers: false,
      className: classes.navbarMuidialogContent
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.navbarPaper
    }, modalRegister())))))), ifHomePage ? this.searchBarInput(classes) : null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_30___default.a, {
      only: ['sm', 'md', 'lg', 'xl']
    }, ifHomePage ? this.mobileSearchBarInput(classes) : null, ifSearchPage ? this.mobileSearchBarInputSearchPage(classes) : null))), modalMobileSearchBarInput ? this.modalMobileSearchBarInput(classes) : null, modalFilters ? this.modalMobileFilter(classes) : null);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_31___default()(_static_css_components_NavBar_NavBar__WEBPACK_IMPORTED_MODULE_32__["default"])(NavBar));

/***/ }),

/***/ "./hoc/Layout/ProfileLayout.js":
/*!*************************************!*\
  !*** ./hoc/Layout/ProfileLayout.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hoc_Layout_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hoc/Layout/Layout */ "./hoc/Layout/Layout.js");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_ScrollMenu_ScrollMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/ScrollMenu/ScrollMenu */ "./components/ScrollMenu/ScrollMenu.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _static_css_components_Layout_ProfileLayout_ProfileLayout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../static/css/components/Layout/ProfileLayout/ProfileLayout */ "./static/css/components/Layout/ProfileLayout/ProfileLayout.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "@material-ui/core/styles/withStyles");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_Avatar_UserAvatar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/Avatar/UserAvatar */ "./components/Avatar/UserAvatar.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  setAxiosAuthentication
} = __webpack_require__(/*! ../../utils/authentication */ "./utils/authentication.js");







const {
  isEditableUser
} = __webpack_require__(/*! ../../utils/functions */ "./utils/functions.js");






class ProfileLayout extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentDidMount", () => {
      setAxiosAuthentication();
      axios__WEBPACK_IMPORTED_MODULE_4___default.a.get(`/myAlfred/api/users/users/${this.props.user}`).then(res => {
        this.setState({
          user: res.data
        });
      }).catch(err => console.error(err));
    });

    this.state = {
      user: null
    };
    this.nonlogged_items = [{
      label: 'À propos',
      url: '/about'
    }, {
      label: 'Services',
      url: '/services'
    }, //{ label: 'Photos', url: '/pictures' }, TODO : Albums 899538 899547
    {
      label: 'Avis',
      url: '/reviews'
    }];
    this.logged_items = [{
      label: 'À propos',
      url: '/about'
    }, {
      label: 'Mes services',
      url: '/services'
    }, //{ label: 'Mes photos', url: '/pictures' }, TODO : Albums 899538 899547
    {
      label: 'Mes avis',
      url: '/reviews'
    }];
    this.logged_alfred_items = [{
      label: 'À propos',
      url: '/about'
    }, {
      label: 'Mes services',
      url: '/services'
    }, //{ label: 'Mes photos', url: '/pictures' }, TODO : Albums 899538 899547
    {
      label: 'Mes avis',
      url: '/reviews'
    }, {
      label: 'Mon calendrier',
      url: '/calendar'
    }, {
      label: 'Mes statistiques',
      url: '/statistics'
    }];
  }

  render() {
    const {
      items,
      user
    } = this.state;
    const {
      children,
      index,
      classes
    } = this.props;

    if (!user) {
      return null;
    }

    const menuItems = isEditableUser(this.props.user) ? user.is_alfred ? this.logged_alfred_items : this.logged_items : this.nonlogged_items;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hoc_Layout_Layout__WEBPACK_IMPORTED_MODULE_1__["default"], {
      user: user
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.profilLayoutMainContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.profilLayoutContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.profilLayoutBackgroundContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.profilLayoutMargin
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.profilLayoutBox
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.profilLayoutBannerImg
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.profilLayoutAvatar
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Avatar_UserAvatar__WEBPACK_IMPORTED_MODULE_8__["default"], {
      alt: user.firstname,
      user: user,
      className: classes.cardPreviewLarge
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
      style: {
        display: 'flex',
        justifyContent: 'center',
        height: '40%',
        alignItems: 'center'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
      style: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, `Je m'appelle ${user ? user.firstname : ''}`)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7___default.a, {
      style: {
        color: 'rgba(39,37,37,35%)'
      }
    }, "et j\u2019ai h\xE2te de vous rencontrer !")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.profilLayoutScrollMenu
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ScrollMenu_ScrollMenu__WEBPACK_IMPORTED_MODULE_3__["default"], {
      categories: menuItems,
      mode: 'profile',
      indexCat: index,
      extraParams: {
        user: this.props.user
      }
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
      className: classes.profilLayoutChildren
    }, children)))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6___default()(_static_css_components_Layout_ProfileLayout_ProfileLayout__WEBPACK_IMPORTED_MODULE_5__["default"])(ProfileLayout));

/***/ }),

/***/ "./hoc/Layout/TrustAndSecurity/TrustAndSecurity.js":
/*!*********************************************************!*\
  !*** ./hoc/Layout/TrustAndSecurity/TrustAndSecurity.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_icons_AlarmOn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/icons/AlarmOn */ "@material-ui/icons/AlarmOn");
/* harmony import */ var _material_ui_icons_AlarmOn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_AlarmOn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_icons_InsertEmoticon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/InsertEmoticon */ "@material-ui/icons/InsertEmoticon");
/* harmony import */ var _material_ui_icons_InsertEmoticon__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_InsertEmoticon__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_icons_VerifiedUser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/icons/VerifiedUser */ "@material-ui/icons/VerifiedUser");
/* harmony import */ var _material_ui_icons_VerifiedUser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_VerifiedUser__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_icons_Textsms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/icons/Textsms */ "@material-ui/icons/Textsms");
/* harmony import */ var _material_ui_icons_Textsms__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Textsms__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "@material-ui/core/styles/withStyles");
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      className: classes.trustAndSecurityMainContainer
    }, items.map((res, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      key: index,
      className: classes.trustAndSecurityContent
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, res.icon), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
      style: {
        marginLeft: '3vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, res.title))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6___default.a, null, res.text))))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_7___default()(_static_css_components_TrustAndSecurity_TrustAndSecurity__WEBPACK_IMPORTED_MODULE_8__["default"])(TrustAndSecurity));

/***/ }),

/***/ "./hoc/Topic/Topic.js":
/*!****************************!*\
  !*** ./hoc/Topic/Topic.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "@material-ui/core/styles/withStyles");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _static_css_components_Topic_Topic__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../static/css/components/Topic/Topic */ "./static/css/components/Topic/Topic.js");








class Topic extends react__WEBPACK_IMPORTED_MODULE_1___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      subTitleColor: 'rgba(39,37,37,35%)'
    };
  }

  componentDidMount() {
    if (next_router__WEBPACK_IMPORTED_MODULE_4___default.a.pathname === '/confirmPayement') {
      this.setState({
        subTitleColor: 'rgba(248, 207, 97, 1)'
      });
    }
  }

  render() {
    const {
      subTitleColor
    } = this.state;
    const {
      titleTopic,
      titleSummary,
      needBackground,
      underline,
      classes
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      style: {
        width: '100%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", null, titleTopic)), titleSummary ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
      style: {
        color: subTitleColor
      }
    }, titleSummary)) : null, underline ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      style: {
        marginTop: '2%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Divider"], {
      className: classes.topicDivider
    })) : null, this.props.children ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0___default.a, {
      style: {
        marginTop: '3vh',
        backgroundColor: needBackground ? 'rgba(229,229,229,1)' : 'white',
        borderRadius: 27
      }
    }, this.props.children) : null);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_5___default()(_static_css_components_Topic_Topic__WEBPACK_IMPORTED_MODULE_6__["default"])(Topic));

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

/***/ "./pages/profile/about.js":
/*!********************************!*\
  !*** ./pages/profile/about.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hoc_Layout_ProfileLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hoc/Layout/ProfileLayout */ "./hoc/Layout/ProfileLayout.js");
/* harmony import */ var _components_About_About__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/About/About */ "./components/About/About.js");
/* harmony import */ var _components_Presentation_Presentation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Presentation/Presentation */ "./components/Presentation/Presentation.js");
/* harmony import */ var _components_Skills_Skills__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Skills/Skills */ "./components/Skills/Skills.js");
/* harmony import */ var _components_Badges_Badges__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Badges/Badges */ "./components/Badges/Badges.js");
/* harmony import */ var _components_Hashtags_Hashtags__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/Hashtags/Hashtags */ "./components/Hashtags/Hashtags.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _static_css_pages_profile_about_about__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../static/css/pages/profile/about/about */ "./static/css/pages/profile/about/about.js");
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Hidden */ "@material-ui/core/Hidden");
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _hoc_Layout_LayoutMobile__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../hoc/Layout/LayoutMobile */ "./hoc/Layout/LayoutMobile.js");
/* harmony import */ var _components_AskQuestion_AskQuestion__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/AskQuestion/AskQuestion */ "./components/AskQuestion/AskQuestion.js");
/* harmony import */ var _components_Box_Box__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/Box/Box */ "./components/Box/Box.js");
/* harmony import */ var _hoc_Layout_LayoutMobileProfile__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../hoc/Layout/LayoutMobileProfile */ "./hoc/Layout/LayoutMobileProfile.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _material_ui_icons_CheckCircleOutline__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/icons/CheckCircleOutline */ "@material-ui/icons/CheckCircleOutline");
/* harmony import */ var _material_ui_icons_CheckCircleOutline__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_CheckCircleOutline__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/core/IconButton */ "@material-ui/core/IconButton");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/icons/Create */ "@material-ui/icons/Create");
/* harmony import */ var _material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../utils/functions */ "./utils/functions.js");
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_utils_functions__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @material-ui/core/Dialog */ "@material-ui/core/Dialog");
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @material-ui/core/DialogContent */ "@material-ui/core/DialogContent");
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _hoc_Topic_Topic__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../hoc/Topic/Topic */ "./hoc/Topic/Topic.js");
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! algolia-places-react */ "algolia-places-react");
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(algolia_places_react__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! react-select */ "react-select");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(react_select__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../utils/consts */ "./utils/consts.js");
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_utils_consts__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @material-ui/core/Divider */ "@material-ui/core/Divider");
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ "@material-ui/core/DialogTitle");
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @material-ui/icons/Close */ "@material-ui/icons/Close");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_30__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const {
  setAxiosAuthentication
} = __webpack_require__(/*! ../../utils/authentication */ "./utils/authentication.js");

































const moment = __webpack_require__(/*! moment */ "moment");

moment.locale('fr');
const DialogTitle = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__["withStyles"])(_static_css_pages_profile_about_about__WEBPACK_IMPORTED_MODULE_9__["default"])(props => {
  const {
    children,
    classes,
    onClose,
    ...other
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_29___default.a, _extends({
    disableTypography: true
  }, other, {
    className: classes.root
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16___default.a, {
    variant: "h6"
  }, children), onClose ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_18___default.a, {
    "aria-label": "close",
    className: classes.closeButton,
    onClick: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_30___default.a, null)) : null);
});

class ProfileAbout extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "openEdition", () => {
      const {
        alfred
      } = this.state;
      this.setState({
        showEdition: true,
        newLanguages: alfred.languages.map(l => ({
          value: l,
          label: l
        })),
        newAddress: alfred.billing_address
      });
    });

    _defineProperty(this, "componentDidMount", () => {
      setAxiosAuthentication();
      axios__WEBPACK_IMPORTED_MODULE_15___default.a.get(`/myAlfred/api/users/users/${this.props.user}`).then(res => {
        this.setState({
          alfred: res.data
        });
      }).catch(err => console.error(err));
    });

    _defineProperty(this, "closeEditDialog", () => {
      this.setState({
        showEdition: false,
        newLanguages: null,
        newAddress: null
      });
    });

    _defineProperty(this, "save", () => {
      // TODO: handle errors, remove timeout
      const {
        newAddress,
        newLanguages
      } = this.state;
      setAxiosAuthentication();
      axios__WEBPACK_IMPORTED_MODULE_15___default.a.put('/myAlfred/api/users/profile/billingAddress', newAddress);
      axios__WEBPACK_IMPORTED_MODULE_15___default.a.put('/myAlfred/api/users/profile/languages', {
        languages: newLanguages.map(l => l.value)
      });
      this.setState({
        showEdition: false
      }, () => setTimeout(this.componentDidMount, 1000));
    });

    _defineProperty(this, "modalEditDialog", classes => {
      const {
        newAddress,
        newLanguages,
        showEdition
      } = this.state;
      const enabled = newAddress;
      const placeholder = newAddress ? `${newAddress.city}, ${newAddress.country}` : 'Entrez votre adresse';
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_21___default.a, {
        open: showEdition,
        onClose: this.closeEditDialog,
        "aria-labelledby": "alert-dialog-title",
        "aria-describedby": "alert-dialog-description"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DialogTitle, {
        id: "customized-dialog-title",
        onClose: this.closeEditDialog
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_22___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hoc_Topic_Topic__WEBPACK_IMPORTED_MODULE_23__["default"], {
        titleTopic: 'Modifiez vos informations',
        titleSummary: 'Ici, vous pouvez modifier vos informations',
        underline: true
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        container: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        container: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        item: true,
        xs: 12,
        lg: 12,
        style: {
          marginTop: '2vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16___default.a, {
        style: {
          fontWeight: 'bold',
          textTransform: 'initial'
        }
      }, "Lieu d'habitation")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        item: true,
        style: {
          width: '100%',
          marginTop: '3vh',
          marginBottom: '3vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(algolia_places_react__WEBPACK_IMPORTED_MODULE_24___default.a, {
        key: moment(),
        placeholder: placeholder,
        options: {
          appId: 'plKATRG826CP',
          apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
          language: 'fr',
          countries: ['fr'],
          type: 'address'
        },
        onChange: this.onAddressChanged,
        onClear: () => this.onAddressChanged(null)
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        container: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        item: true,
        xs: 12,
        lg: 12,
        style: {
          marginTop: '2vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16___default.a, {
        style: {
          fontWeight: 'bold',
          textTransform: 'initial'
        }
      }, "Langues parl\xE9es")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        item: true,
        xs: 12,
        style: {
          marginTop: '3vh',
          marginBottom: '3vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_25___default.a, {
        key: moment(),
        value: newLanguages,
        onChange: this.onLanguagesChanged,
        options: _utils_consts__WEBPACK_IMPORTED_MODULE_26__["LANGUAGES"],
        styles: {
          menu: provided => ({ ...provided,
            zIndex: 2
          })
        },
        isMulti: true,
        isSearchable: true,
        closeMenuOnSelect: false,
        placeholder: 'Sélectionnez vos langues',
        noOptionsMessage: () => 'Plus d\'options disponibles'
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        style: {
          marginTop: '2vh',
          width: '100%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_27___default.a, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        style: {
          marginTop: '2vh',
          width: '100%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_28___default.a, {
        onClick: () => {
          this.save();
        },
        variant: "contained",
        classes: {
          root: classes.buttonSave
        },
        disabled: !enabled
      }, "Modifier"))))));
    });

    _defineProperty(this, "onAddressChanged", result => {
      const newAddress = result ? {
        city: result.suggestion.city,
        address: result.suggestion.name,
        zip_code: result.suggestion.postcode,
        country: result.suggestion.country,
        lat: result.suggestion.latlng.lat,
        lng: result.suggestion.latlng.lng
      } : null;
      this.setState({
        newAddress: newAddress
      });
    });

    _defineProperty(this, "onLanguagesChanged", languages => {
      this.setState({
        newLanguages: languages
      });
    });

    _defineProperty(this, "content", (classes, user, alfred) => {
      const editable = Object(_utils_functions__WEBPACK_IMPORTED_MODULE_20__["isEditableUser"])(user);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        container: true,
        spacing: 3,
        style: {
          marginBottom: '12vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_10___default.a, {
        only: ['xs']
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        item: true,
        xl: 5,
        lg: 5,
        md: 6,
        sm: 12,
        xs: 12
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Box_Box__WEBPACK_IMPORTED_MODULE_13__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_About_About__WEBPACK_IMPORTED_MODULE_3__["default"], {
        user: user
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_10___default.a, {
        only: ['sm', 'md', 'lg', 'xl']
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        item: true,
        xs: 12,
        style: {
          marginTop: '5vh',
          position: 'relative'
        }
      }, editable ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        style: {
          position: 'absolute',
          right: 5
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_18___default.a, {
        "aria-label": "edit",
        onClick: this.openEdition
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_19___default.a, null))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        style: {
          display: 'flex',
          flexDirection: 'row'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16___default.a, {
        style: {
          color: 'rgba(39,37,37,35%)'
        }
      }, "Habite \xE0 ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        style: {
          margin: 3
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16___default.a, {
        style: {
          color: 'black'
        }
      }, alfred ? alfred.billing_address.city + ", " + alfred.billing_address.country : null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        style: {
          display: 'flex',
          flexDirection: 'row',
          marginTop: '4vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16___default.a, {
        style: {
          color: 'rgba(39,37,37,35%)'
        }
      }, "Parle ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        style: {
          margin: 3
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16___default.a, {
        style: {
          color: 'black'
        }
      }, alfred ? alfred.languages.join(',') || 'Français' : null))), alfred ? alfred.id_confirmed ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: '4vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16___default.a, {
        style: {
          color: 'rgba(39,37,37,35%)'
        }
      }, alfred ? alfred.firstname : null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        style: {
          margin: 3
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16___default.a, {
        style: {
          color: 'black'
        }
      }, "\xE0 un profil v\xE9rifi\xE9")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_CheckCircleOutline__WEBPACK_IMPORTED_MODULE_17___default.a, null))) : null : null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        item: true,
        xl: 7,
        lg: 7,
        md: 6,
        sm: 12,
        xs: 12
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Box_Box__WEBPACK_IMPORTED_MODULE_13__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Presentation_Presentation__WEBPACK_IMPORTED_MODULE_4__["default"], {
        user: user,
        classes: classes
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        item: true,
        xl: 8,
        lg: 8,
        md: 6,
        sm: 12,
        xs: 12
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Box_Box__WEBPACK_IMPORTED_MODULE_13__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Skills_Skills__WEBPACK_IMPORTED_MODULE_5__["default"], {
        alfred: user
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        item: true,
        xl: 4,
        lg: 4,
        md: 6,
        sm: 12,
        xs: 12
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Box_Box__WEBPACK_IMPORTED_MODULE_13__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Badges_Badges__WEBPACK_IMPORTED_MODULE_6__["default"], {
        user: user
      }))), false ? /*#__PURE__*/undefined : null, !editable ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_10___default.a, {
        only: ['sm', 'xs']
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        item: true,
        style: {
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1___default.a, {
        style: {
          width: '70%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AskQuestion_AskQuestion__WEBPACK_IMPORTED_MODULE_12__["default"], {
        user: user
      })))) : null);
    });

    this.state = {
      user: props.user,
      alfred: null,
      newAddress: null,
      newLanguages: null,
      showEdition: false
    };
  }

  static getInitialProps({
    query: {
      user,
      indexAccount
    }
  }) {
    return {
      user: user,
      index: indexAccount
    };
  }

  render() {
    const {
      classes,
      index,
      user
    } = this.props;
    const {
      alfred
    } = this.state;

    if (!user && alfred) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_10___default.a, {
      only: ['xs']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hoc_Layout_ProfileLayout__WEBPACK_IMPORTED_MODULE_2__["default"], {
      user: user,
      index: index
    }, this.content(classes, user, alfred))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_10___default.a, {
      only: ['lg', 'xl', 'sm', 'md']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hoc_Layout_LayoutMobileProfile__WEBPACK_IMPORTED_MODULE_14__["default"], {
      user: user,
      index: index,
      currentIndex: 4
    }, this.content(classes, user, alfred))), this.modalEditDialog(classes));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__["withStyles"])(_static_css_pages_profile_about_about__WEBPACK_IMPORTED_MODULE_9__["default"])(ProfileAbout));

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

/***/ "./static/css/components/About/About.js":
/*!**********************************************!*\
  !*** ./static/css/components/About/About.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  skillsContainer: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  skillCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 105,
    [theme.breakpoints.down('xs')]: {
      width: '50%',
      margin: 0
    }
  },
  avatarSize: {
    width: 60,
    height: 60
  },
  skillTitle: {
    fontSize: '0.8rem',
    color: 'rgba(84,89,95,0.95)',
    fontWeight: 'bold'
  },
  skillValue: {
    fontSize: '0.7rem',
    color: 'rgba(84,89,95,0.95)'
  },
  shape: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonSave: {
    textTransform: 'initial',
    width: '100%'
  }
}));

/***/ }),

/***/ "./static/css/components/Footer/Footer.js":
/*!************************************************!*\
  !*** ./static/css/components/Footer/Footer.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  footerMainStyle: {
    display: 'flex',
    flexDirection: 'column'
  },
  footerMainContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'start'
    }
  },
  footerSection: {
    display: 'flex',
    flexDirection: 'column'
  },
  footerSocialSection: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    marginTop: '3%',
    alignItems: 'end',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'start'
    }
  },
  footerDividerContainer: {
    display: 'flex',
    marginTop: '3vh',
    marginBottom: '3vh',
    justifyContent: 'center'
  },
  footerDivider: {
    height: 1,
    width: '80%'
  },
  footerTitileSection: {
    fontFamily: theme.typography.sectionTitle.fontFamily
  },
  footerLink: {
    fontFamily: theme.typography.text.fontFamily
  },
  footerBrandContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '12vh',
      marginTop: '5vh'
    }
  },
  footerBrandStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
    [theme.breakpoints.down('xs')]: {
      width: 'inherit',
      flexDirection: 'row'
    },
    [theme.breakpoints.down('lg')]: {
      width: '100%'
    }
  },
  footerRgpdButtons: {
    display: 'flex',
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      flexDirection: 'column',
      marginBottom: '15vh',
      alignItems: 'end',
      textAlign: 'end'
    },
    [theme.breakpoints.down('lg')]: {
      width: '50%'
    }
  },
  footerLawContainer: {
    [theme.breakpoints.down('lg')]: {
      width: '50%'
    }
  },
  footerSocialContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  footerLinkInfoContainer: {
    [theme.breakpoints.down('xs')]: {
      marginTop: '2vh',
      marginBottom: '2vh'
    }
  }
}));

/***/ }),

/***/ "./static/css/components/InfoBar/InfoBar.js":
/*!**************************************************!*\
  !*** ./static/css/components/InfoBar/InfoBar.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  infoBarMainStyle: {
    backgroundColor: theme.palette.backgroundGrey.main,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoBarLinkContainer: {
    paddingTop: theme.padding.infoBar.paddingTop,
    paddingBottom: theme.padding.infoBar.paddingBottom,
    alignItems: 'center',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      textAlign: 'center'
    }
  },
  infoBarColorText: {
    color: theme.palette.lightBlack.main,
    fontSize: theme.typography.infoBar.fontSize,
    lineHeight: theme.typography.infoBar.lineHeight,
    fontFamily: theme.typography.infoBar.fontFamily,
    margin: 0
  },
  infoBarPicsContainer: {
    width: 15,
    height: 15,
    marginRight: 5
  },
  showmoreContainer: {
    marginLeft: 5
  },
  shomoreLink: {
    color: theme.palette.link.main,
    fontSize: theme.typography.infoBar.fontSize,
    lineHeight: theme.typography.infoBar.lineHeight,
    fontFamily: theme.typography.infoBar.fontFamily,
    fontWeight: theme.typography.infoBar.fontWeight
  }
}));

/***/ }),

/***/ "./static/css/components/InfoWithPics/InfoWithPics.js":
/*!************************************************************!*\
  !*** ./static/css/components/InfoWithPics/InfoWithPics.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  infoWithPicsMainContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '5%'
  },
  infoWithPicsMarginRight: {
    marginRight: '5%',
    [theme.breakpoints.down('xs')]: {
      margin: 0
    }
  },
  infoWithPicsColorText: {
    color: 'rgba(39,37,37,35%)'
  },
  picsSize: {
    width: 80,
    height: 80,
    [theme.breakpoints.down('xs')]: {
      width: 50,
      height: 50
    }
  },
  containerListIcon: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: 10
    }
  }
}));

/***/ }),

/***/ "./static/css/components/Layout/LayoutMobileProfile/LayoutMobileProfile.js":
/*!*********************************************************************************!*\
  !*** ./static/css/components/Layout/LayoutMobileProfile/LayoutMobileProfile.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  layoutMobileProfilHeader: {
    backgroundImage: 'url(../../../../assets/img/banner/banneProfil.svg)',
    height: '30vh',
    backgroundPosition: 'right',
    backgroundSize: 'cover',
    position: 'relative',
    backgroundRepeat: 'no-repeat'
  },
  layoutMobileLayoutProfileHeader: {
    position: 'absolute',
    left: '10px'
  },
  profilLayoutAvatar: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid rgba(178, 204, 251, 1)',
    position: 'absolute',
    bottom: '-50px'
  },
  cardPreviewLarge: {
    width: '90%',
    height: '90%'
  },
  button: {
    textTransform: 'initial',
    color: 'black'
  },
  profilLayoutScrollMenu: {
    display: 'flex',
    justifyContent: 'center',
    height: '10%',
    alignItems: 'flex-end'
  }
}));

/***/ }),

/***/ "./static/css/components/Layout/ProfileLayout/ProfileLayout.js":
/*!*********************************************************************!*\
  !*** ./static/css/components/Layout/ProfileLayout/ProfileLayout.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  profilLayoutMainContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  profilLayoutContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  profilLayoutBackgroundContainer: {
    backgroundColor: 'rgba(249,249,249, 1)',
    width: '100%'
  },
  profilLayoutMargin: {
    margin: '3vh 15%',
    display: 'flex',
    justifyContent: 'center'
  },
  profilLayoutBox: {
    borderRadius: 17,
    border: '1px solid rgba(210, 210, 210, 0.5)',
    width: '100%',
    backgroundColor: 'white',
    height: '60vh',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      height: '55vh'
    }
  },
  profilLayoutBannerImg: {
    display: 'flex',
    justifyContent: 'center',
    height: '50%',
    backgroundImage: 'url(../../../../assets/img/banner/banneProfil.svg)',
    width: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: 17,
    position: 'relative',
    backgroundRepeat: 'no-repeat'
  },
  profilLayoutProfileHeader: {
    position: 'absolute',
    top: '43%',
    left: '50%',
    transform: 'translate(-49%,50%)'
  },
  profilLayoutAvatar: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid rgba(178, 204, 251, 1)',
    position: 'absolute',
    bottom: '-50px'
  },
  cardPreviewLarge: {
    width: '90%',
    height: '90%'
  },
  profilLayoutScrollMenu: {
    display: 'flex',
    justifyContent: 'center',
    height: '10%',
    alignItems: 'flex-end'
  },
  profilLayoutChildren: {
    margin: '3vh 15%',
    display: 'flex',
    justifyContent: 'center'
  }
}));

/***/ }),

/***/ "./static/css/components/MobileNavbar/MobileNavbar.js":
/*!************************************************************!*\
  !*** ./static/css/components/MobileNavbar/MobileNavbar.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  navigationRoot: {
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 16px 32px, rgba(0, 0, 0, 0.1) 0px 3px 8px',
    borderRadius: 10
  },
  navigationActionRoot: {
    minWidth: 'inherit',
    maxWidth: '20%',
    padding: '0px 2px !important',
    '& .Mui-selected': {
      fontSize: 10,
      fontWeight: 600,
      textOverflow: 'ellipsis !important',
      display: '-webkit-box !important',
      overflowWrap: 'break-word !important',
      maxHeight: '24px !important',
      overflow: ' hidden !important',
      lineHeight: '12px !important'
    },
    '& .MuiSvgIcon-root': {
      height: '30px !important',
      marginBottom: '2px !important',
      padding: ' 3px !important'
    }
  },
  navbarModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiDialog-paper': {
      margin: '0px !important'
    }
  },
  navbarPaperWidth: {
    width: '100%'
  },
  navbarWidthLoginContent: {
    display: 'flex',
    justifyContent: 'center'
  },
  navbarPaper: {
    backgroundColor: theme.palette.white.main,
    borderRadius: 10,
    margin: '0px !important',
    padding: 0,
    width: '100%'
  },
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  label: {
    fontSize: 10,
    fontWeight: 600,
    textOverflow: 'ellipsis !important',
    display: '-webkit-box !important',
    overflowWrap: 'break-word !important',
    maxHeight: '24px !important',
    overflow: ' hidden !important',
    lineHeight: '12px !important'
  },
  drawerStyle: {
    '& .MuiDrawer-paperAnchorBottom': {
      height: '50%'
    }
  },
  modalMobileSearchBarInputTextField: {
    width: '100%'
  },
  fitlerMenuLogged: {
    overflow: 'inherit',
    textOverflow: 'inherit',
    whiteSpace: 'inherit'
  },
  buttonNextRoot: {
    textTransform: 'initial',
    fontWeight: 'bold',
    width: '100%',
    color: 'white'
  },
  navbarAlgoliaPlace: {
    border: 'inherit',
    fontFamily: theme.typography.text.fontFamily,
    color: theme.palette.placeHolder.main,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight: theme.typography.placeHolder.fontWeight,
    lineHeight: theme.typography.placeHolder.lineHeight,
    padding: '6px 0 7px',
    height: 'auto',
    [theme.breakpoints.down('xs')]: {
      padding: '18.5px 14px'
    }
  },
  modalMobileSearchBartTextFieldWhereP: {
    flex: 1,
    fontFamily: theme.typography.text.fontFamily,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight: theme.typography.placeHolder.fontWeight,
    lineHeight: theme.typography.placeHolder.lineHeight,
    "& .MuiFormLabel-root": {
      fontWeight: 'bold'
    },
    '& .MuiInputBase-input::placeholder': {
      opacity: '0.5'
    },
    '& div': {
      width: '100%'
    }
  }
}));

/***/ }),

/***/ "./static/css/components/NavBar/NavBar.js":
/*!************************************************!*\
  !*** ./static/css/components/NavBar/NavBar.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  navbarSearchContainer: {
    width: '50%',
    marginTop: '5vh',
    [theme.breakpoints.down('md')]: {
      width: '70%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%'
    },
    [theme.breakpoints.down('xs')]: {
      cursor: 'pointer',
      width: '100%'
    }
  },
  fitlerMenuLogged: {
    overflow: 'inherit',
    textOverflow: 'inherit',
    whiteSpace: 'inherit'
  },
  navbarSearch: {
    padding: 14,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: theme.border.button.borderRadius,
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 16px 32px, rgba(0, 0, 0, 0.1) 0px 3px 8px'
  },
  navbarTextFieldService: {
    flex: 1
  },
  navbarRootTextField: {
    width: '100%',
    fontFamily: theme.typography.text.fontFamily,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight: theme.typography.placeHolder.fontWeight,
    lineHeight: theme.typography.placeHolder.lineHeight,
    "& .MuiFormLabel-root": {
      fontWeight: 'bold',
      '&:focus': {
        color: theme.palette.primary.main
      }
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: theme.palette.primary.main
    },
    '& .MuiInputBase-input::placeholder': {
      opacity: '0.5'
    },
    '& div': {
      width: '100%'
    }
  },
  iconButton: {
    padding: 12,
    backgroundColor: theme.palette.yellow.main,
    color: theme.palette.white.main
  },
  navbarCloseButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1)
  },
  navbarAddressContainer: {
    marginLeft: 20,
    width: '50%'
  },
  divider: {
    height: 28,
    margin: 4
  },
  navbarFormControlAddress: {
    width: '100%'
  },
  navbarAlgoliaContent: {
    flex: 1,
    marginLeft: 20,
    '& .ap-input-icon': {
      display: 'none'
    }
  },
  navbarRootTextFieldWhere: {
    width: '100%',
    fontFamily: theme.typography.text.fontFamily,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight: theme.typography.placeHolder.fontWeight,
    lineHeight: theme.typography.placeHolder.lineHeight,
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      borderRadius: 4
    },
    "& .MuiFormLabel-root": {
      '&:focus': {
        color: theme.palette.primary.main
      }
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: theme.palette.primary.main
    },
    '& .MuiInputBase-input::placeholder': {
      opacity: '0.5'
    },
    '& div': {
      width: '100%'
    }
  },
  buttonIgnore: {
    textTransform: 'initial',
    color: 'rgba(39,37,37,35%)'
  },
  navbarAlgoliaPlace: {
    border: 'inherit',
    fontFamily: theme.typography.text.fontFamily,
    color: theme.palette.placeHolder.main,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight: theme.typography.placeHolder.fontWeight,
    lineHeight: theme.typography.placeHolder.lineHeight,
    padding: '6px 0 7px',
    height: 'auto',
    [theme.breakpoints.down('xs')]: {
      padding: '18.5px 14px'
    }
  },
  navbarDatePickerMain: {
    display: 'flex',
    alignItems: 'center'
  },
  navbarDatePickerContainer: {
    flex: 1,
    marginLeft: 20
  },
  navbarRootTextFieldWhen: {
    width: '100%',
    fontFamily: theme.typography.text.fontFamily,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight: theme.typography.placeHolder.fontWeight,
    lineHeight: theme.typography.placeHolder.lineHeight,
    "& .MuiFormLabel-root": {
      fontWeight: 'bold',
      '&:focus': {
        color: theme.palette.primary.main
      }
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: theme.palette.primary.main
    },
    '& .MuiInputBase-input::placeholder': {
      opacity: '0.5'
    }
  },
  navbarMainSytle: {
    alignItems: 'center',
    width: '80%',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      width: '95%'
    }
  },
  navbarAppBar: {
    backgroundColor: 'transparent',
    boxShadow: 'inherit'
  },
  navBartoolbar: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0
  },
  navbarTopContainer: {
    width: '90%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  navbarLogoContainer: {
    width: '20%',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      width: '10%'
    }
  },
  navbarLogoContainerP: {
    width: '100%',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      width: '40%'
    }
  },
  navabarHomepageMenu: {
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  navabarHomepageMenuP: {
    width: '100%'
  },
  navbarMenuBurgerContainer: {
    width: '20%',
    display: 'flex',
    flexDirection: 'row-reverse',
    [theme.breakpoints.down('md')]: {
      width: '10%'
    }
  },
  navbarMenuBurgerContainerP: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    [theme.breakpoints.down('md')]: {
      width: '40%'
    }
  },
  navbarTabRoot: {
    textTransform: 'inherit',
    opacity: 'inherit',
    color: theme.palette.white.main,
    fontWeight: theme.typography.buttonLink.fontWeight,
    fontSize: theme.typography.buttonLink.fontSize,
    '&:hover': {
      borderBottom: '2px solid rgba(255,255,255,1)'
    }
  },
  inputDatePicker: {
    border: 'inherit',
    fontFamily: theme.typography.text.fontFamily,
    color: theme.palette.placeHolder.main,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight: theme.typography.placeHolder.fontWeight,
    lineHeight: theme.typography.placeHolder.lineHeight,
    padding: '6px 0 7px'
  },
  logoMyAlfred: {
    height: 64
  },
  navbarButtonContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '20%',
    alignItems: 'center'
  },
  navbarButtonContainerP: {
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '100%',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'inherit',
      width: '40%'
    }
  },
  navBarlogIn: {
    textTransform: theme.typography.textTransform,
    borderRadius: theme.border.button.borderRadius,
    color: theme.palette.white.main,
    fontWeight: theme.typography.fontWeight
  },
  navbarModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiDialog-paper': {
      margin: '0px !important'
    }
  },
  navbarMuidialogContent: {
    padding: 0
  },
  navbarWidthLoginContent: {
    display: 'flex',
    justifyContent: 'center'
  },
  navbarPaper: {
    backgroundColor: theme.palette.white.main,
    borderRadius: 10,
    margin: '0px !important',
    padding: 0,
    width: '100%'
  },
  navbarSignIn: {
    borderRadius: theme.border.button.borderRadius,
    textTransform: theme.typography.textTransform,
    fontWeight: theme.typography.fontWeight,
    border: '3px solid rgba(255, 255, 255, 1)',
    color: theme.palette.white.main
  },
  textFieldMobilSearchInput: {
    width: '90%'
  },
  buttonNextRoot: {
    textTransform: 'initial',
    fontWeight: 'bold',
    width: '100%',
    color: 'white'
  },
  drawerStyle: {
    '& .MuiDrawer-paperAnchorBottom': {
      height: '50%'
    }
  },
  navbarRegisterContainer: {
    marginRight: 5
  },
  navbarSearchContainerSearchPage: {
    width: '100%',
    marginTop: '2vh',
    marginBottom: '2vh'
  },
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },

  /**Ifsearchpage**/
  navbarSearchContainerSearchP: {
    width: '100%'
  },
  navbarSearchP: {
    padding: '1%',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: theme.border.button.borderRadius
  },
  navbarRootTextFieldP: {
    marginLeft: 20,
    flex: 1,
    fontFamily: theme.typography.text.fontFamily,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight: theme.typography.placeHolder.fontWeight,
    lineHeight: theme.typography.placeHolder.lineHeight,
    "& .MuiFormLabel-root": {
      fontWeight: 'bold'
    },
    '& .MuiInputBase-input::placeholder': {
      opacity: '0.5'
    },
    '& div': {
      width: '100%'
    }
  },
  navbarRootTextFieldWhereP: {
    flex: 1,
    marginLeft: 20,
    fontFamily: theme.typography.text.fontFamily,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight: theme.typography.placeHolder.fontWeight,
    lineHeight: theme.typography.placeHolder.lineHeight,
    "& .MuiFormLabel-root": {
      fontWeight: 'bold'
    },
    '& .MuiInputBase-input::placeholder': {
      opacity: '0.5'
    },
    '& div': {
      width: '100%'
    }
  },
  navbarRootTextFieldWhenP: {
    width: '100%',
    marginLeft: 20,
    fontFamily: theme.typography.text.fontFamily,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight: theme.typography.placeHolder.fontWeight,
    lineHeight: theme.typography.placeHolder.lineHeight,
    "& .MuiFormLabel-root": {
      fontWeight: 'bold',
      '&:focus': {
        color: theme.palette.primary.main
      }
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: theme.palette.primary.main
    },
    '& .MuiInputBase-input::placeholder': {
      opacity: '0.5'
    }
  },
  navbarAlgoliaContentP: {
    flex: 1,
    '& .ap-input-icon': {
      display: 'none'
    }
  },
  navbarDatePickerContainerP: {
    flex: 1
  },
  navbarMainSytleP: {
    alignItems: 'center',
    width: '100%',
    display: 'flex'
  },
  navbarAppBarP: {
    boxShadow: 'inherit'
  },
  navBartoolbarP: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1%',
    marginBottom: '1%'
  },
  navbarTopContainerP: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  inputDatePickerP: {
    border: 'inherit',
    fontFamily: theme.typography.text.fontFamily,
    color: theme.palette.placeHolder.main,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight: theme.typography.placeHolder.fontWeight,
    lineHeight: theme.typography.placeHolder.lineHeight
  },
  modalMobileSearchBarInputTextField: {
    width: '100%'
  },
  modalMobileSearchBartTextFieldWhereP: {
    flex: 1,
    fontFamily: theme.typography.text.fontFamily,
    fontSize: theme.typography.placeHolder.fontSize,
    fontWeight: theme.typography.placeHolder.fontWeight,
    lineHeight: theme.typography.placeHolder.lineHeight,
    "& .MuiFormLabel-root": {
      fontWeight: 'bold'
    },
    '& .MuiInputBase-input::placeholder': {
      opacity: '0.5'
    },
    '& div': {
      width: '100%'
    }
  },
  dialogNavbarMobileFilter: {
    minWidth: '100%'
  }
}));

/***/ }),

/***/ "./static/css/components/Presentation/Presentation.js":
/*!************************************************************!*\
  !*** ./static/css/components/Presentation/Presentation.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  textField: {
    width: '100%'
  },
  button: {
    textTransform: 'initial',
    width: '100%'
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

/***/ "./static/css/components/Topic/Topic.js":
/*!**********************************************!*\
  !*** ./static/css/components/Topic/Topic.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  topicDivider: {
    height: 6,
    backgroundColor: 'rgba(178, 204, 251, 100%)',
    borderRadius: 27,
    width: '3vw',
    [theme.breakpoints.down('xs')]: {
      width: '15vw'
    }
  }
}));

/***/ }),

/***/ "./static/css/components/TrustAndSecurity/TrustAndSecurity.js":
/*!********************************************************************!*\
  !*** ./static/css/components/TrustAndSecurity/TrustAndSecurity.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  trustAndSecurityMainContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap'
    },
    [theme.breakpoints.down('xs')]: {
      alignItems: 'start'
    }
  },
  trustAndSecurityContent: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: '3vh',
      width: '50%',
      justifyContent: 'start',
      paddingLeft: '7%'
    },
    [theme.breakpoints.down("xs")]: {
      padding: 0
    }
  }
}));

/***/ }),

/***/ "./static/css/pages/layout/layoutStyle.js":
/*!************************************************!*\
  !*** ./static/css/pages/layout/layoutStyle.js ***!
  \************************************************/
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
  filterMenuDivierContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  filterMenuDividerStyle: {
    height: 1,
    width: '100%'
  },
  mainContainerStyleFooter: {
    justifyContent: 'center',
    flexDirection: 'column',
    display: 'flex',
    width: '100%',
    alignItems: 'center'
  },
  generalWidthFooter: {
    backgroundColor: 'rgba(228, 228, 228, 8)',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '2vh'
  }
}));

/***/ }),

/***/ "./static/css/pages/profile/about/about.js":
/*!*************************************************!*\
  !*** ./static/css/pages/profile/about/about.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  aboutHastagsContainer: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: '12vh'
    }
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

/***/ "./utils/passwords.js":
/*!****************************!*\
  !*** ./utils/passwords.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const checkPasswordFormat = pass => pass.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');

const arePasswordsEquals = (pass1, pass2) => pass1 === pass2;

const checkPass1 = pass => {
  if (pass === '') {
    return {
      check: false
    };
  } else if (checkPasswordFormat(pass)) {
    return {
      check: true
    };
  }

  return {
    error: '8 caractères minimum dont une majuscule, une minuscule et un chiffre',
    check: false
  };
};

const checkPass2 = (pass1, pass2) => {
  if (pass2 === '') {
    return {
      check: false
    };
  } else if (arePasswordsEquals(pass1, pass2)) {
    return {
      check: true
    };
  }

  return {
    error: 'Les mots de passe saisis sont différents',
    check: false
  };
};

module.exports = {
  checkPass1,
  checkPass2
};

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
  const r = RegExp('{{\\s*params.([^\\s]+)\\s*}}');

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
  if (!value) {
    return false;
  }

  if (value.length == 10 && value.startsWith('0')) {
    return true;
  }

  if (value.length == 11 && value.startsWith('33')) {
    return true;
  }

  return false;
};

module.exports = {
  fillSms,
  isPhoneOk
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

/***/ 6:
/*!**************************************!*\
  !*** multi ./pages/profile/about.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Edwin\Documents\MyAlfredPro\web\pages\profile\about.js */"./pages/profile/about.js");


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

/***/ "@material-ui/core/BottomNavigation":
/*!*****************************************************!*\
  !*** external "@material-ui/core/BottomNavigation" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/BottomNavigation");

/***/ }),

/***/ "@material-ui/core/BottomNavigationAction":
/*!***********************************************************!*\
  !*** external "@material-ui/core/BottomNavigationAction" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/BottomNavigationAction");

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

/***/ "@material-ui/core/Input":
/*!******************************************!*\
  !*** external "@material-ui/core/Input" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Input");

/***/ }),

/***/ "@material-ui/core/InputAdornment":
/*!***************************************************!*\
  !*** external "@material-ui/core/InputAdornment" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/InputAdornment");

/***/ }),

/***/ "@material-ui/core/InputLabel":
/*!***********************************************!*\
  !*** external "@material-ui/core/InputLabel" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/InputLabel");

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

/***/ "@material-ui/core/Select":
/*!*******************************************!*\
  !*** external "@material-ui/core/Select" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Select");

/***/ }),

/***/ "@material-ui/core/Slide":
/*!******************************************!*\
  !*** external "@material-ui/core/Slide" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Slide");

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

/***/ "@material-ui/icons/AlarmOn":
/*!*********************************************!*\
  !*** external "@material-ui/icons/AlarmOn" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/AlarmOn");

/***/ }),

/***/ "@material-ui/icons/ArrowBackIos":
/*!**************************************************!*\
  !*** external "@material-ui/icons/ArrowBackIos" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/ArrowBackIos");

/***/ }),

/***/ "@material-ui/icons/CalendarToday":
/*!***************************************************!*\
  !*** external "@material-ui/icons/CalendarToday" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/CalendarToday");

/***/ }),

/***/ "@material-ui/icons/ChatBubbleOutlineOutlined":
/*!***************************************************************!*\
  !*** external "@material-ui/icons/ChatBubbleOutlineOutlined" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/ChatBubbleOutlineOutlined");

/***/ }),

/***/ "@material-ui/icons/CheckCircleOutline":
/*!********************************************************!*\
  !*** external "@material-ui/icons/CheckCircleOutline" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/CheckCircleOutline");

/***/ }),

/***/ "@material-ui/icons/Clear":
/*!*******************************************!*\
  !*** external "@material-ui/icons/Clear" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Clear");

/***/ }),

/***/ "@material-ui/icons/Close":
/*!*******************************************!*\
  !*** external "@material-ui/icons/Close" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Close");

/***/ }),

/***/ "@material-ui/icons/Create":
/*!********************************************!*\
  !*** external "@material-ui/icons/Create" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Create");

/***/ }),

/***/ "@material-ui/icons/EmojiEmotions":
/*!***************************************************!*\
  !*** external "@material-ui/icons/EmojiEmotions" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/EmojiEmotions");

/***/ }),

/***/ "@material-ui/icons/Facebook":
/*!**********************************************!*\
  !*** external "@material-ui/icons/Facebook" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Facebook");

/***/ }),

/***/ "@material-ui/icons/GroupAdd":
/*!**********************************************!*\
  !*** external "@material-ui/icons/GroupAdd" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/GroupAdd");

/***/ }),

/***/ "@material-ui/icons/Home":
/*!******************************************!*\
  !*** external "@material-ui/icons/Home" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Home");

/***/ }),

/***/ "@material-ui/icons/InsertEmoticon":
/*!****************************************************!*\
  !*** external "@material-ui/icons/InsertEmoticon" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/InsertEmoticon");

/***/ }),

/***/ "@material-ui/icons/Instagram":
/*!***********************************************!*\
  !*** external "@material-ui/icons/Instagram" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Instagram");

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

/***/ "@material-ui/icons/LinkedIn":
/*!**********************************************!*\
  !*** external "@material-ui/icons/LinkedIn" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/LinkedIn");

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

/***/ "@material-ui/icons/Menu":
/*!******************************************!*\
  !*** external "@material-ui/icons/Menu" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Menu");

/***/ }),

/***/ "@material-ui/icons/Person":
/*!********************************************!*\
  !*** external "@material-ui/icons/Person" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Person");

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

/***/ "@material-ui/icons/Textsms":
/*!*********************************************!*\
  !*** external "@material-ui/icons/Textsms" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Textsms");

/***/ }),

/***/ "@material-ui/icons/Tune":
/*!******************************************!*\
  !*** external "@material-ui/icons/Tune" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Tune");

/***/ }),

/***/ "@material-ui/icons/Twitter":
/*!*********************************************!*\
  !*** external "@material-ui/icons/Twitter" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Twitter");

/***/ }),

/***/ "@material-ui/icons/VerifiedUser":
/*!**************************************************!*\
  !*** external "@material-ui/icons/VerifiedUser" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/VerifiedUser");

/***/ }),

/***/ "@material-ui/icons/Visibility":
/*!************************************************!*\
  !*** external "@material-ui/icons/Visibility" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Visibility");

/***/ }),

/***/ "@material-ui/icons/VisibilityOff":
/*!***************************************************!*\
  !*** external "@material-ui/icons/VisibilityOff" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/VisibilityOff");

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

/***/ "clsx":
/*!***********************!*\
  !*** external "clsx" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("clsx");

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

/***/ "react-dates":
/*!******************************!*\
  !*** external "react-dates" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dates");

/***/ }),

/***/ "react-number-format":
/*!**************************************!*\
  !*** external "react-number-format" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-number-format");

/***/ }),

/***/ "react-select":
/*!*******************************!*\
  !*** external "react-select" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-select");

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

/***/ "url-parse":
/*!****************************!*\
  !*** external "url-parse" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url-parse");

/***/ })

/******/ });
//# sourceMappingURL=about.js.map