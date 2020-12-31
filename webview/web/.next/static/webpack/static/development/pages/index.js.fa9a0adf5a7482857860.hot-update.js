webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./components/Card/CategoryCard/CategoryCard.js":
/*!******************************************************!*\
  !*** ./components/Card/CategoryCard/CategoryCard.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _static_css_components_Card_CategoryCard_CategoryCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../static/css/components/Card/CategoryCard/CategoryCard */ "./static/css/components/Card/CategoryCard/CategoryCard.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "./node_modules/@material-ui/core/styles/withStyles.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-cookies */ "./node_modules/react-cookies/build/cookie.js");
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_cookies__WEBPACK_IMPORTED_MODULE_6__);








class CategoryCard extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      gps: null
    };
  }

  componentDidMount() {
    axios__WEBPACK_IMPORTED_MODULE_5___default.a.defaults.headers.common['Authorization'] = react_cookies__WEBPACK_IMPORTED_MODULE_6___default.a.load('token');
    axios__WEBPACK_IMPORTED_MODULE_5___default.a.get('/myAlfred/api/users/current').then(res => {
      let data = res.data;
      this.setState({
        user: data,
        gps: data.billing_address.gps
      });
    }).catch(err => {
      console.error(err);
    });
  }

  render() {
    const {
      classes,
      item
    } = this.props;
    const {
      gps
    } = this.state;

    if (!item) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_4___default.a, {
      href: '/search?search=1&category=' + item._id + (gps ? '&gps=' + JSON.stringify(gps) : '')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.categoryCardMedia
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        backgroundImage: `url('${item.picture}')`
      },
      className: classes.categoryCardBackground
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", null, item.label))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_3___default()(_static_css_components_Card_CategoryCard_CategoryCard__WEBPACK_IMPORTED_MODULE_2__["default"])(CategoryCard));

/***/ }),

/***/ "./components/LogIn/LogIn.js":
/*!***********************************!*\
  !*** ./components/LogIn/LogIn.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _LogInStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LogInStyle */ "./components/LogIn/LogInStyle.js");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/TextField */ "./node_modules/@material-ui/core/esm/TextField/index.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/icons/MailOutline */ "./node_modules/@material-ui/icons/MailOutline.js");
/* harmony import */ var _material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_icons_LockOpenOutlined__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/icons/LockOpenOutlined */ "./node_modules/@material-ui/icons/LockOpenOutlined.js");
/* harmony import */ var _material_ui_icons_LockOpenOutlined__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LockOpenOutlined__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _OAuth_OAuth__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../OAuth/OAuth */ "./components/OAuth/OAuth.js");
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-cookies */ "./node_modules/react-cookies/build/cookie.js");
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_cookies__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/Visibility */ "./node_modules/@material-ui/icons/Visibility.js");
/* harmony import */ var _material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_icons_VisibilityOff__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/icons/VisibilityOff */ "./node_modules/@material-ui/icons/VisibilityOff.js");
/* harmony import */ var _material_ui_icons_VisibilityOff__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_VisibilityOff__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/InputAdornment */ "./node_modules/@material-ui/core/esm/InputAdornment/index.js");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/core/IconButton */ "./node_modules/@material-ui/core/esm/IconButton/index.js");
/* harmony import */ var _material_ui_core_Input__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/core/Input */ "./node_modules/@material-ui/core/esm/Input/index.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









const {
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
        const token = react_cookies__WEBPACK_IMPORTED_MODULE_11___default.a.load('token');
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      className: classes.fullContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      style: {
        width: '100%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      className: classes.newContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
      className: classes.titleRegister
    }, "Connexion")), ENABLE_GF_LOGIN ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      className: classes.margin
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      container: true,
      spacing: 1,
      alignItems: "flex-end",
      className: classes.genericContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      className: classes.margin
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      container: true,
      spacing: 1,
      alignItems: "flex-end",
      className: classes.flexContainerPics
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      style: {
        width: '100%'
      }
    }, PROVIDERS.map(provider => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OAuth_OAuth__WEBPACK_IMPORTED_MODULE_10__["default"], {
      login: true,
      provider: provider,
      key: provider
    }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      className: classes.margin
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      container: true,
      spacing: 1,
      alignItems: "flex-end",
      className: classes.flexContainerPics
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      style: {
        color: 'rgba(84,89,95,0.95)',
        fontWeight: 'bold',
        letterSpacing: -1
      }
    }, "Ou")))))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      className: classes.containerDialogContent
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      onSubmit: this.onSubmit,
      style: {
        marginBottom: 15
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      className: classes.margin
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      container: true,
      spacing: 1,
      alignItems: "flex-end",
      className: classes.genericContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_8___default.a, {
      className: classes.colorIcon
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      className: classes.widthTextField
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Input__WEBPACK_IMPORTED_MODULE_16__["default"], {
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
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", null, errors.username)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      className: classes.margin
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      container: true,
      spacing: 1,
      alignItems: "flex-end",
      className: classes.genericContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_LockOpenOutlined__WEBPACK_IMPORTED_MODULE_9___default.a, {
      className: classes.colorIcon
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      className: classes.widthTextField
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Input__WEBPACK_IMPORTED_MODULE_16__["default"], {
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
      endAdornment: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_14__["default"], {
        position: "end"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_15__["default"], {
        "aria-label": "toggle password visibility",
        onClick: this.handleClickShowPassword,
        onMouseDown: this.handleMouseDownPassword
      }, showPassword ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_12___default.a, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_VisibilityOff__WEBPACK_IMPORTED_MODULE_13___default.a, null)))
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", null, errors.password)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: true,
      style: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 30
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_6__["default"], {
      type: "submit",
      variant: "contained",
      color: "primary",
      style: {
        width: '100%',
        color: 'white'
      }
    }, "Connexion")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
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

/***/ "./components/Register/Register.js":
/*!*****************************************!*\
  !*** ./components/Register/Register.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/esm/react-toastify.js");
/* harmony import */ var _utils_passwords__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/passwords */ "./utils/passwords.js");
/* harmony import */ var _utils_passwords__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_utils_passwords__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/TextField */ "./node_modules/@material-ui/core/esm/TextField/index.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! algolia-places-react */ "./node_modules/algolia-places-react/dist/index.es.js");
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(algolia_places_react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-datepicker */ "./node_modules/react-datepicker/dist/react-datepicker.min.js");
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_datepicker__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Checkbox */ "./node_modules/@material-ui/core/esm/Checkbox/index.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var date_fns_locale_fr__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! date-fns/locale/fr */ "./node_modules/date-fns/esm/locale/fr/index.js");
/* harmony import */ var _RegisterStyle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./RegisterStyle */ "./components/Register/RegisterStyle.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_MobileStepper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/MobileStepper */ "./node_modules/@material-ui/core/esm/MobileStepper/index.js");
/* harmony import */ var _material_ui_icons_KeyboardArrowLeft__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/icons/KeyboardArrowLeft */ "./node_modules/@material-ui/icons/KeyboardArrowLeft.js");
/* harmony import */ var _material_ui_icons_KeyboardArrowLeft__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_KeyboardArrowLeft__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _material_ui_icons_KeyboardArrowRight__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/icons/KeyboardArrowRight */ "./node_modules/@material-ui/icons/KeyboardArrowRight.js");
/* harmony import */ var _material_ui_icons_KeyboardArrowRight__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_KeyboardArrowRight__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _material_ui_icons_PersonOutline__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/icons/PersonOutline */ "./node_modules/@material-ui/icons/PersonOutline.js");
/* harmony import */ var _material_ui_icons_PersonOutline__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_PersonOutline__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/icons/MailOutline */ "./node_modules/@material-ui/icons/MailOutline.js");
/* harmony import */ var _material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _material_ui_icons_LockOpenOutlined__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/icons/LockOpenOutlined */ "./node_modules/@material-ui/icons/LockOpenOutlined.js");
/* harmony import */ var _material_ui_icons_LockOpenOutlined__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LockOpenOutlined__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @material-ui/icons/LockOutlined */ "./node_modules/@material-ui/icons/LockOutlined.js");
/* harmony import */ var _material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @material-ui/core/IconButton */ "./node_modules/@material-ui/core/esm/IconButton/index.js");
/* harmony import */ var _material_ui_icons_PhotoCamera__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @material-ui/icons/PhotoCamera */ "./node_modules/@material-ui/icons/PhotoCamera.js");
/* harmony import */ var _material_ui_icons_PhotoCamera__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_PhotoCamera__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var react_number_format__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! react-number-format */ "./node_modules/react-number-format/dist/react-number-format.es.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ "./node_modules/@material-ui/core/esm/DialogTitle/index.js");
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @material-ui/core/DialogContent */ "./node_modules/@material-ui/core/esm/DialogContent/index.js");
/* harmony import */ var _material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @material-ui/core/DialogContentText */ "./node_modules/@material-ui/core/esm/DialogContentText/index.js");
/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @material-ui/core/DialogActions */ "./node_modules/@material-ui/core/esm/DialogActions/index.js");
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @material-ui/core/Dialog */ "./node_modules/@material-ui/core/esm/Dialog/index.js");
/* harmony import */ var _material_ui_icons_PhoneIphoneOutlined__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @material-ui/icons/PhoneIphoneOutlined */ "./node_modules/@material-ui/icons/PhoneIphoneOutlined.js");
/* harmony import */ var _material_ui_icons_PhoneIphoneOutlined__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_PhoneIphoneOutlined__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! react-cookies */ "./node_modules/react-cookies/build/cookie.js");
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_33___default = /*#__PURE__*/__webpack_require__.n(react_cookies__WEBPACK_IMPORTED_MODULE_33__);
/* harmony import */ var _OAuth_OAuth__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../OAuth/OAuth */ "./components/OAuth/OAuth.js");
/* harmony import */ var _Information_Information__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../Information/Information */ "./components/Information/Information.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






































const {
  getLoggedUserId
} = __webpack_require__(/*! ../../utils/functions */ "./utils/functions.js");

var parse = __webpack_require__(/*! url-parse */ "./node_modules/url-parse/index.js");

const {
  PROVIDERS
} = __webpack_require__(/*! ../../utils/consts */ "./utils/consts.js");

const {
  ENABLE_GF_LOGIN
} = __webpack_require__(/*! ../../config/config */ "./config/config.js");

const {
  isPhoneOk
} = __webpack_require__(/*! ../../utils/sms */ "./utils/sms.js");

Object(react_datepicker__WEBPACK_IMPORTED_MODULE_8__["registerLocale"])('fr', date_fns_locale_fr__WEBPACK_IMPORTED_MODULE_11__["default"]);

function NumberFormatCustom(props) {
  const {
    inputRef,
    onChange,
    ...other
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_number_format__WEBPACK_IMPORTED_MODULE_23__["default"], _extends({}, other, {
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
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.defaults.headers.common['Authorization'] = react_cookies__WEBPACK_IMPORTED_MODULE_33___default.a.load('token');
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
          const token = react_cookies__WEBPACK_IMPORTED_MODULE_33___default.a.load('token');
          axios__WEBPACK_IMPORTED_MODULE_3___default.a.defaults.headers.common['Authorization'] = token;
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
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.defaults.headers.common['Authorization'] = react_cookies__WEBPACK_IMPORTED_MODULE_33___default.a.load('token');

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

    const token = react_cookies__WEBPACK_IMPORTED_MODULE_33___default.a.load('token');

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
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          container: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Information_Information__WEBPACK_IMPORTED_MODULE_35__["default"], {
          open: this.state.errorExistEmail,
          onClose: () => this.setState({
            errorExistEmail: false
          }),
          type: "warning",
          text: 'Oups ! Un compte utilisant cette adresse mail existe déjà'
        }), !this.state.google_id && ENABLE_GF_LOGIN ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.flexContainerPics
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          item: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
          style: {
            color: 'rgba(84,89,95,0.95)',
            fontWeight: 'bold',
            letterSpacing: -1
          }
        }, "Avec")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          style: {
            width: '70%'
          }
        }, PROVIDERS.map(provider => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OAuth_OAuth__WEBPACK_IMPORTED_MODULE_34__["default"], {
          login: false,
          provider: provider,
          key: provider
        }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.flexContainerPics
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
          style: {
            color: 'rgba(84,89,95,0.95)',
            fontWeight: 'bold',
            letterSpacing: -1
          }
        }, "Ou")))))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          item: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_18___default.a, {
          className: classes.colorIcon
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          item: true,
          className: classes.widthTextField
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
        }, errors.email)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          item: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_PersonOutline__WEBPACK_IMPORTED_MODULE_17___default.a, {
          className: classes.colorIcon
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          item: true,
          className: classes.widthTextField
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
        }, errors.firstname))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          item: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_PersonOutline__WEBPACK_IMPORTED_MODULE_17___default.a, {
          className: classes.colorIcon
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          item: true,
          className: classes.widthTextField
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
        }, errors.name))), !this.state.google_id ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          item: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_LockOpenOutlined__WEBPACK_IMPORTED_MODULE_19___default.a, {
          className: classes.colorIcon
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          item: true,
          className: classes.widthTextField
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
        })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          item: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_20___default.a, {
          className: classes.colorIcon
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          item: true,
          className: classes.widthTextField
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          container: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
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
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_21__["default"], {
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
        }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Typography"], {
          className: classes.subtitle
        }, "Adresse postale")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          className: classes.textStyle
        }, "Votre adresse ne sera pas visible, mais nous l\u2019utiliserons pour vous proposer ou proposer vos services aux utilisateurs ou Alfred proches de chez vous.")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
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
        }, this.state.cityError)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Typography"], {
          className: classes.subtitle
        }, "Date de naissance")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          className: classes.textStyle
        }, "Pour vous inscrire, vous devez e\u0302tre \xE2ge\u0301 d\u2019au moins 16 ans. Les autres utilisateurs ne verront pas votre date de naissance.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          item: true,
          className: classes.datenaissance,
          style: {
            display: 'flex',
            alignItems: 'center'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          container: true,
          style: {
            justifyContent: 'space-between',
            flexWrap: 'nowrap'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          item: true,
          style: {
            width: '30%'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          item: true,
          style: {
            width: '30%'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          item: true,
          style: {
            width: '30%'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
        })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: classes.newContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Typography"], {
          className: classes.subtitle
        }, "T\xE9l\xE9phone")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          className: classes.textStyle
        }, "L'ajout de votre num\xE9ro de t\xE9l\xE9phone permet aux membres My-Alfred de disposer d'un moyen pour vous contacter."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          item: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_PhoneIphoneOutlined__WEBPACK_IMPORTED_MODULE_30___default.a, {
          className: classes.colorIcon
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          item: true,
          style: {
            width: '70%'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
        }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          container: true,
          style: {
            marginTop: 15,
            alignItems: 'center'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_9__["default"], {
          checked: this.state.checked,
          onChange: this.handleChecked,
          value: "checked",
          color: "primary"
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: 'footer/cguPage',
          target: "_blank",
          style: {
            color: '#2FBCD3'
          }
        }, "J\u2019accepte les conditions ge\u0301ne\u0301rales d\u2019utilisation de My-Alfred.")))))));

      case 2:
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          container: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
          className: classes.titleRegister
        }, "Inscription termin\xE9e")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: classes.newContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
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
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          item: true,
          style: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: 20,
            textAlign: 'center'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Inscription r\xE9ussie ! Vous pouvez maintenant proposer ou rechercher vos services sur My Alfred")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          item: true,
          className: classes.responsiveButton
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
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
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__["default"], {
          variant: 'contained',
          color: 'primary',
          style: {
            color: 'white'
          }
        }, "Commencez \xE0 explorer")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          item: true,
          className: classes.responsiveSecondaryButton
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_32___default.a, {
          href: '/creaShop/creaShop'
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          style: {
            textDecoration: 'none'
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__["default"], {
          variant: 'contained',
          color: 'secondary',
          style: {
            color: 'white'
          }
        }, "Proposer mes services"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          style: {
            marginTop: 20
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
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
        }, "Besoin d'aide pour proposer vos services ? Prenez rendez-vous avec l'\xE9quipe My Alfred ici !"))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: classes.margin
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          container: true,
          spacing: 1,
          alignItems: "flex-end",
          className: classes.genericContainer
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_29__["default"], {
          open: this.state.smsCodeOpen,
          "aria-labelledby": "form-dialog-title"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_25__["default"], {
          id: "form-dialog-title"
        }, "Confirmation du num\xE9ro de t\xE9l\xE9phone"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_26__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_27__["default"], null, "Saisissez le code re\xE7u par SMS"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_28__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__["default"], {
          onClick: () => this.confirmLater(),
          color: "primary"
        }, "Confirmer plus tard"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__["default"], {
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
      className: classes.fullContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
      className: classes.newContainer
    }, activeStep === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
      className: classes.titleRegister
    }, "Inscription")) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
      className: classes.containerSwitch
    }, this.renderSwitch(activeStep, classes, errors)), activeStep < 2 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
      style: {
        marginTop: 10
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MobileStepper__WEBPACK_IMPORTED_MODULE_14__["default"], {
      variant: "progress",
      steps: 2,
      position: "static",
      activeStep: activeStep,
      className: classes.rootStepper,
      classes: {
        progress: classes.progress
      },
      nextButton: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__["default"], {
        size: "small",
        onClick: () => this.handleNext(activeStep),
        disabled: activeStep === 0 ? firstPageValidator : secondPageValidator
      }, activeStep === 0 ? 'Suivant' : 'Terminer', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_KeyboardArrowRight__WEBPACK_IMPORTED_MODULE_16___default.a, null)),
      backButton: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__["default"], {
        size: "small",
        onClick: this.handleBack,
        disabled: activeStep === 0
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_KeyboardArrowLeft__WEBPACK_IMPORTED_MODULE_15___default.a, null), "Pr\xE9c\xE9dent")
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
      container: true,
      className: classes.bottomContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
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

/***/ "./hoc/Layout/NavBar/MobileNavbar.js":
/*!*******************************************!*\
  !*** ./hoc/Layout/NavBar/MobileNavbar.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_BottomNavigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/BottomNavigation */ "./node_modules/@material-ui/core/esm/BottomNavigation/index.js");
/* harmony import */ var _material_ui_core_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/BottomNavigationAction */ "./node_modules/@material-ui/core/esm/BottomNavigationAction/index.js");
/* harmony import */ var _material_ui_icons_Home__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/Home */ "./node_modules/@material-ui/icons/Home.js");
/* harmony import */ var _material_ui_icons_Home__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Home__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/icons/Search */ "./node_modules/@material-ui/icons/Search.js");
/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_icons_CalendarToday__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/icons/CalendarToday */ "./node_modules/@material-ui/icons/CalendarToday.js");
/* harmony import */ var _material_ui_icons_CalendarToday__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_CalendarToday__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/icons/MailOutline */ "./node_modules/@material-ui/icons/MailOutline.js");
/* harmony import */ var _material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_icons_Person__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/Person */ "./node_modules/@material-ui/icons/Person.js");
/* harmony import */ var _material_ui_icons_Person__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Person__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "./node_modules/@material-ui/core/styles/withStyles.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _static_css_components_MobileNavbar_MobileNavbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../static/css/components/MobileNavbar/MobileNavbar */ "./static/css/components/MobileNavbar/MobileNavbar.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-cookies */ "./node_modules/react-cookies/build/cookie.js");
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_cookies__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _components_LogIn_LogIn__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../components/LogIn/LogIn */ "./components/LogIn/LogIn.js");
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/DialogContent */ "./node_modules/@material-ui/core/esm/DialogContent/index.js");
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/core/Dialog */ "./node_modules/@material-ui/core/esm/Dialog/index.js");
/* harmony import */ var _material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/core/Slide */ "./node_modules/@material-ui/core/esm/Slide/index.js");
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ "./node_modules/@material-ui/core/esm/DialogTitle/index.js");
/* harmony import */ var _components_Register_Register__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../components/Register/Register */ "./components/Register/Register.js");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @material-ui/core/IconButton */ "./node_modules/@material-ui/core/esm/IconButton/index.js");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @material-ui/icons/Close */ "./node_modules/@material-ui/icons/Close.js");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _material_ui_icons_GroupAdd__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @material-ui/icons/GroupAdd */ "./node_modules/@material-ui/icons/GroupAdd.js");
/* harmony import */ var _material_ui_icons_GroupAdd__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_GroupAdd__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @material-ui/core/TextField */ "./node_modules/@material-ui/core/esm/TextField/index.js");
/* harmony import */ var _material_ui_core_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @material-ui/core/SwipeableDrawer */ "./node_modules/@material-ui/core/esm/SwipeableDrawer/index.js");
/* harmony import */ var _material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @material-ui/icons/Clear */ "./node_modules/@material-ui/icons/Clear.js");
/* harmony import */ var _material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @material-ui/core/FormControl */ "./node_modules/@material-ui/core/esm/FormControl/index.js");
/* harmony import */ var _material_ui_core_Select__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @material-ui/core/Select */ "./node_modules/@material-ui/core/esm/Select/index.js");
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @material-ui/core/MenuItem */ "./node_modules/@material-ui/core/esm/MenuItem/index.js");
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! algolia-places-react */ "./node_modules/algolia-places-react/dist/index.es.js");
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(algolia_places_react__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../../../utils/i18n */ "./utils/i18n.js");
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(_utils_i18n__WEBPACK_IMPORTED_MODULE_32__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

























const {
  getLoggedUserId
} = __webpack_require__(/*! ../../../utils/functions */ "./utils/functions.js");











const Transition = react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(function Transition(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_16__["default"], _extends({
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_17__["default"], _extends({
    disableTypography: true,
    className: classes.root
  }, other), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_20__["Typography"], {
    variant: "h6"
  }, children), onClose ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_21__["default"], {
    "aria-label": "close",
    className: classes.closeButton,
    onClick: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_22___default.a, null)) : null);
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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_15__["default"], {
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
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_14__["default"], {
        classes: {
          root: classes.navbarWidthLoginContent
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_19__["default"], {
        className: classes.navbarPaper
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_LogIn_LogIn__WEBPACK_IMPORTED_MODULE_13__["default"], {
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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_15__["default"], {
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
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_14__["default"], {
        dividers: false,
        className: classes.navbarMuidialogContent
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_19__["default"], {
        className: classes.navbarPaper
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Register_Register__WEBPACK_IMPORTED_MODULE_18__["default"], {
        callLogin: this.handleOpenLogin,
        sendParentData: this.getData
      }))));
    });

    _defineProperty(this, "modalMobileSearchBarInput", classes => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_25__["default"], {
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
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_19__["default"], {
        container: true,
        style: {
          height: '100%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_19__["default"], {
        item: true,
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_19__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_21__["default"], {
        "aria-label": "delete",
        onClick: () => this.setState({
          modalMobileSearchBarInput: false,
          mobileStepSearch: 0,
          keyword: null,
          city: undefined,
          gps: ''
        })
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_26___default.a, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_19__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, this.state.mobileStepSearch === 0 ? 'Votre Recherche' : this.state.mobileStepSearch === 1 ? 'Où' : 'Dates'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_19__["default"], {
        item: true,
        container: true,
        spacing: 3,
        style: {
          margin: 0
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_19__["default"], {
        item: true,
        xs: 12,
        style: {
          display: 'flex',
          justifyContent: 'center'
        }
      }, this.state.mobileStepSearch === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_24__["default"], {
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
      }) : this.state.user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_19__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_27__["default"], {
        variant: "outlined"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_28__["default"], {
        id: "outlined-select-currency",
        value: 'main',
        name: 'selectedAddress',
        onChange: e => {
          this.onChange(e);
        },
        classes: {
          selectMenu: classes.fitlerMenuLogged
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_29__["default"], {
        value: 'main',
        style: {
          whiteSpace: 'nowrap'
        }
      }, "Adresse principale, ", ' ' + this.state.user.billing_address.address, " ", this.state.user.billing_address.zip_code, ",", this.state.user.billing_address.city), this.state.user.service_address.map((e, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_29__["default"], {
        value: e._id,
        key: index
      }, e.label + ', ', " ", ' ' + e.address, ",", e.zip_code, " ", e.city)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_29__["default"], {
        value: 'all'
      }, "Partout, Rechercher des Alfred partout"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_29__["default"], {
        value: 'addAddress'
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_20__["Typography"], {
        style: {
          color: '#2FBCD3',
          cursor: 'pointer'
        }
      }, "Ajouter une adresse"))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_24__["default"], {
        item: true,
        xs: 12,
        classes: {
          root: classes.modalMobileSearchBartTextFieldWhereP
        },
        value: this.state.city,
        label: _utils_i18n__WEBPACK_IMPORTED_MODULE_32__["SEARCHBAR"].where,
        variant: 'outlined',
        InputProps: {
          inputComponent: inputRef => {
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(algolia_places_react__WEBPACK_IMPORTED_MODULE_30___default.a, _extends({}, inputRef, {
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
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_19__["default"], {
        item: true,
        xs: 12,
        style: {
          display: 'flex',
          justifyContent: 'center'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_19__["default"], {
        style: {
          width: '90%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_31__["default"], {
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

    const token = react_cookies__WEBPACK_IMPORTED_MODULE_12___default.a.load('token');

    if (getLoggedUserId()) {
      this.setState({
        logged: true,
        selectedAddress: 'main'
      });
    }

    axios__WEBPACK_IMPORTED_MODULE_11___default.a.defaults.headers.common['Authorization'] = react_cookies__WEBPACK_IMPORTED_MODULE_12___default.a.load('token');
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_BottomNavigation__WEBPACK_IMPORTED_MODULE_1__["default"], {
      value: currentIndex,
      showLabels: true,
      classes: {
        root: classes.navigationRoot
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_2__["default"], {
      onClick: () => next_router__WEBPACK_IMPORTED_MODULE_10___default.a.push('/'),
      label: "Accueil",
      classes: {
        root: classes.navigationActionRoot,
        label: classes.label
      },
      value: 0,
      icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Home__WEBPACK_IMPORTED_MODULE_3___default.a, null)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_2__["default"], {
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
    }), logged ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_2__["default"], {
      onClick: () => next_router__WEBPACK_IMPORTED_MODULE_10___default.a.push('/reservations/reservations'),
      label: "R\xE9servations",
      classes: {
        root: classes.navigationActionRoot,
        label: classes.label
      },
      value: 2,
      icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_CalendarToday__WEBPACK_IMPORTED_MODULE_5___default.a, null)
    }) : null, logged ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_2__["default"], {
      onClick: () => next_router__WEBPACK_IMPORTED_MODULE_10___default.a.push(`/profile/messages?user=${this.state.user._id}`),
      label: "Messages",
      classes: {
        root: classes.navigationActionRoot,
        label: classes.label
      },
      value: 3,
      icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_MailOutline__WEBPACK_IMPORTED_MODULE_6___default.a, null)
    }) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_2__["default"], {
      onClick: logged ? () => next_router__WEBPACK_IMPORTED_MODULE_10___default.a.push('/account/myProfile') : this.handleOpenLogin,
      label: logged ? "Profil" : 'Connexion',
      classes: {
        root: classes.navigationActionRoot,
        label: classes.label
      },
      value: 4,
      icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Person__WEBPACK_IMPORTED_MODULE_7___default.a, null)
    }), !logged ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_BottomNavigationAction__WEBPACK_IMPORTED_MODULE_2__["default"], {
      onClick: this.handleOpenRegister,
      label: 'Inscription',
      classes: {
        root: classes.navigationActionRoot,
        label: classes.label
      },
      value: 5,
      icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_GroupAdd__WEBPACK_IMPORTED_MODULE_23___default.a, null)
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/AppBar */ "./node_modules/@material-ui/core/esm/AppBar/index.js");
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Toolbar */ "./node_modules/@material-ui/core/esm/Toolbar/index.js");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/IconButton */ "./node_modules/@material-ui/core/esm/IconButton/index.js");
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/MenuItem */ "./node_modules/@material-ui/core/esm/MenuItem/index.js");
/* harmony import */ var _material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Menu */ "./node_modules/@material-ui/core/esm/Menu/index.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-cookies */ "./node_modules/react-cookies/build/cookie.js");
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_cookies__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _components_LogIn_LogIn__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../components/LogIn/LogIn */ "./components/LogIn/LogIn.js");
/* harmony import */ var _components_Register_Register__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../components/Register/Register */ "./components/Register/Register.js");
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/Dialog */ "./node_modules/@material-ui/core/esm/Dialog/index.js");
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/DialogContent */ "./node_modules/@material-ui/core/esm/DialogContent/index.js");
/* harmony import */ var _material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/Slide */ "./node_modules/@material-ui/core/esm/Slide/index.js");
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ "./node_modules/@material-ui/core/esm/DialogTitle/index.js");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/icons/Close */ "./node_modules/@material-ui/icons/Close.js");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/core/Paper */ "./node_modules/@material-ui/core/esm/Paper/index.js");
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/core/Divider */ "./node_modules/@material-ui/core/esm/Divider/index.js");
/* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/icons/Menu */ "./node_modules/@material-ui/icons/Menu.js");
/* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @material-ui/icons/Search */ "./node_modules/@material-ui/icons/Search.js");
/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! algolia-places-react */ "./node_modules/algolia-places-react/dist/index.es.js");
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(algolia_places_react__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../utils/i18n */ "./utils/i18n.js");
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_utils_i18n__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! react-datepicker */ "./node_modules/react-datepicker/dist/react-datepicker.min.js");
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(react_datepicker__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @material-ui/core/TextField */ "./node_modules/@material-ui/core/esm/TextField/index.js");
/* harmony import */ var _material_ui_core_Select__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @material-ui/core/Select */ "./node_modules/@material-ui/core/esm/Select/index.js");
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @material-ui/core/FormControl */ "./node_modules/@material-ui/core/esm/FormControl/index.js");
/* harmony import */ var _material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @material-ui/core/Tabs */ "./node_modules/@material-ui/core/esm/Tabs/index.js");
/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @material-ui/core/Tab */ "./node_modules/@material-ui/core/esm/Tab/index.js");
/* harmony import */ var _components_Link_Link__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../../../components/Link/Link */ "./components/Link/Link.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @material-ui/core/Hidden */ "./node_modules/@material-ui/core/esm/Hidden/index.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "./node_modules/@material-ui/core/styles/withStyles.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var _static_css_components_NavBar_NavBar__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../../../static/css/components/NavBar/NavBar */ "./static/css/components/NavBar/NavBar.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_icons_Tune__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @material-ui/icons/Tune */ "./node_modules/@material-ui/icons/Tune.js");
/* harmony import */ var _material_ui_icons_Tune__WEBPACK_IMPORTED_MODULE_35___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Tune__WEBPACK_IMPORTED_MODULE_35__);
/* harmony import */ var _material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @material-ui/core/InputLabel */ "./node_modules/@material-ui/core/esm/InputLabel/index.js");
/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @material-ui/core/DialogActions */ "./node_modules/@material-ui/core/esm/DialogActions/index.js");
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @material-ui/core/FormControlLabel */ "./node_modules/@material-ui/core/esm/FormControlLabel/index.js");
/* harmony import */ var _material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @material-ui/core/Switch */ "./node_modules/@material-ui/core/esm/Switch/index.js");
/* harmony import */ var react_dates__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! react-dates */ "./node_modules/react-dates/index.js");
/* harmony import */ var react_dates__WEBPACK_IMPORTED_MODULE_40___default = /*#__PURE__*/__webpack_require__.n(react_dates__WEBPACK_IMPORTED_MODULE_40__);
/* harmony import */ var _material_ui_core_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @material-ui/core/SwipeableDrawer */ "./node_modules/@material-ui/core/esm/SwipeableDrawer/index.js");
/* harmony import */ var _material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! @material-ui/icons/Clear */ "./node_modules/@material-ui/icons/Clear.js");
/* harmony import */ var _material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_42___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_42__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }









const {
  clearAuthenticationToken
} = __webpack_require__(/*! ../../../utils/authentication */ "./utils/authentication.js");





































const Transition = react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(function Transition(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_14__["default"], _extends({
    direction: "up",
    ref: ref
  }, props));
});
const DialogTitle = _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_32___default()(_static_css_components_NavBar_NavBar__WEBPACK_IMPORTED_MODULE_33__["default"])(props => {
  const {
    children,
    classes,
    onClose,
    ...other
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_15__["default"], _extends({
    disableTypography: true,
    className: classes.root
  }, other), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_34__["Typography"], {
    variant: "h6"
  }, children), onClose ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
    "aria-label": "close",
    className: classes.closeButton,
    onClick: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_16___default.a, null)) : null);
});

class NavBar extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "logout", () => {
      react_cookies__WEBPACK_IMPORTED_MODULE_9___default.a.remove('token', {
        path: '/'
      });
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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        className: this.state.ifHomePage ? classes.navbarSearchContainer : classes.navbarSearchContainerSearchP,
        onClick: this.handleModalSearchBarInput
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_17__["default"], {
        classes: {
          root: this.state.ifHomePage ? classes.navbarSearch : classes.navbarSearchP
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
        classes: {
          root: classes.iconButton
        },
        "aria-label": "search"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_20___default.a, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        style: {
          marginLeft: '2vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_34__["Typography"], null, "Commencez votre recherche"))));
    });

    _defineProperty(this, "modalMobileSearchBarInput", classes => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_41__["default"], {
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
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        container: true,
        style: {
          height: '100%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        item: true,
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
        "aria-label": "delete",
        onClick: () => this.setState({
          modalMobileSearchBarInput: false,
          mobileStepSearch: 0,
          keyword: null,
          city: undefined,
          gps: ''
        })
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_42___default.a, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, this.state.mobileStepSearch === 0 ? 'Votre Recherche' : this.state.mobileStepSearch === 1 ? 'Où' : 'Dates'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        item: true,
        container: true,
        spacing: 3,
        style: {
          margin: 0
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        item: true,
        xs: 12,
        style: {
          display: 'flex',
          justifyContent: 'center'
        }
      }, this.state.mobileStepSearch === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_24__["default"], {
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
      }) : this.state.user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_26__["default"], {
        variant: "outlined"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_25__["default"], {
        id: "outlined-select-currency",
        value: this.props.selectedAddress ? this.props.selectedAddress : 'main',
        name: 'selectedAddress',
        onChange: e => {
          this.onChange(e);
        },
        classes: {
          selectMenu: classes.fitlerMenuLogged
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
        value: 'main',
        style: {
          whiteSpace: 'nowrap'
        }
      }, "Adresse principale, ", ' ' + this.state.user.billing_address.address, " ", this.state.user.billing_address.zip_code, ",", this.state.user.billing_address.city), this.state.user.service_address.map((e, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
        value: e._id,
        key: index
      }, e.label + ', ', " ", ' ' + e.address, ",", e.zip_code, " ", e.city)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
        value: 'all'
      }, "Partout, Rechercher des Alfred partout"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
        value: 'addAddress'
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_34__["Typography"], {
        style: {
          color: '#2FBCD3',
          cursor: 'pointer'
        }
      }, "Ajouter une adresse"))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_24__["default"], {
        item: true,
        xs: 12,
        classes: {
          root: classes.modalMobileSearchBartTextFieldWhereP
        },
        value: this.state.city,
        label: _utils_i18n__WEBPACK_IMPORTED_MODULE_22__["SEARCHBAR"].where,
        variant: 'outlined',
        InputProps: {
          inputComponent: inputRef => {
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(algolia_places_react__WEBPACK_IMPORTED_MODULE_21___default.a, _extends({}, inputRef, {
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
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        item: true,
        xs: 12,
        style: {
          display: 'flex',
          justifyContent: 'center'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        style: {
          width: '90%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        className: classes.navbarSearchContainerSearchPage
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_17__["default"], {
        classes: {
          root: classes.navbarSearch
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
        classes: {
          root: classes.iconButton
        },
        "aria-label": "search",
        onClick: this.handleModalSearchBarInput
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_20___default.a, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        style: {
          marginLeft: '2vh',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          cursor: 'pointer'
        },
        onClick: this.handleModalSearchBarInput
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_34__["Typography"], {
        style: {
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden'
        }
      }, "Commencez votre recherche")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        style: {
          height: 30
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_18__["default"], {
        style: {
          width: 2
        },
        orientation: "vertical"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
        color: "primary",
        "aria-label": "directions",
        onClick: () => this.setState({
          modalFilters: true
        })
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Tune__WEBPACK_IMPORTED_MODULE_35___default.a, null))));
    });

    _defineProperty(this, "modalMobileFilter", classes => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_12__["default"], {
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
      }, "Filtres"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_13__["default"], {
        dividers: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_38__["default"], {
        control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_39__["default"], {
          checked: this.state.proSelected,
          onChange: e => {
            this.statusFilterChanged(e);
          },
          value: this.state.proSelected,
          color: "primary",
          name: 'proSelected'
        }),
        label: "Pro"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_38__["default"], {
        control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_39__["default"], {
          checked: this.state.individualSelected,
          onChange: e => {
            this.statusFilterChanged(e);
          },
          value: this.state.individualSelected,
          color: "primary",
          name: 'individualSelected'
        }),
        label: "Particulier"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_18__["default"], {
        style: {
          width: '100%',
          marginTop: '2vh',
          marginBottom: '2vh'
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_dates__WEBPACK_IMPORTED_MODULE_40__["DateRangePicker"], {
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
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_37__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
        autoFocus: true,
        onClick: () => this.setState({
          modalFilters: false
        }, () => this.props.filter()),
        color: "primary"
      }, "Afficher les r\xE9sultats")));
    });

    _defineProperty(this, "searchBarInput", classes => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        className: this.state.ifHomePage ? classes.navbarSearchContainer : classes.navbarSearchContainerSearchP
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_17__["default"], {
        classes: {
          root: this.state.ifHomePage ? classes.navbarSearch : classes.navbarSearchP
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        className: classes.navbarTextFieldService
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_24__["default"], {
        classes: {
          root: this.state.ifHomePage ? classes.navbarRootTextField : classes.navbarRootTextFieldP
        },
        placeholder: _utils_i18n__WEBPACK_IMPORTED_MODULE_22__["SEARCHBAR"].what,
        value: this.state.keyword,
        onChange: this.onChange,
        name: 'keyword',
        label: this.state.ifHomePage ? _utils_i18n__WEBPACK_IMPORTED_MODULE_22__["SEARCHBAR"].labelWhat : false,
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
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_18__["default"], {
        className: classes.divider,
        orientation: "vertical"
      })), this.state.user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        className: classes.navbarAddressContainer
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_26__["default"], {
        className: classes.navbarFormControlAddress
      }, this.state.ifHomePage ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_36__["default"], {
        shrink: true,
        id: "demo-simple-select-placeholder-label-label"
      }, "L'Adresse") : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_25__["default"], {
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
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
        value: 'main'
      }, "Adresse principale, ", ' ' + this.state.user.billing_address.address, " ", this.state.user.billing_address.zip_code, ",", this.state.user.billing_address.city), this.state.user.service_address.map((e, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
        value: e._id,
        key: index
      }, e.label + ', ', " ", ' ' + e.address, ",", e.zip_code, " ", e.city)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
        value: 'all'
      }, "Partout, Rechercher des Alfred partout"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
        value: 'addAddress'
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_34__["Typography"], {
        style: {
          color: '#2FBCD3',
          cursor: 'pointer'
        }
      }, "Ajouter une adresse"))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        className: this.state.ifHomePage ? classes.navbarAlgoliaContent : classes.navbarAlgoliaContentP
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_24__["default"], {
        label: this.state.ifHomePage ? _utils_i18n__WEBPACK_IMPORTED_MODULE_22__["SEARCHBAR"].labelWhere : false,
        classes: {
          root: this.state.ifHomePage ? classes.navbarRootTextFieldWhere : classes.navbarRootTextFieldWhereP
        },
        InputLabelProps: {
          shrink: true
        },
        value: this.state.city,
        InputProps: {
          inputComponent: inputRef => {
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(algolia_places_react__WEBPACK_IMPORTED_MODULE_21___default.a, _extends({}, inputRef, {
              placeholder: _utils_i18n__WEBPACK_IMPORTED_MODULE_22__["SEARCHBAR"].where,
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
      })), this.state.logged === false ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        className: classes.navbarDatePickerMain
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_18__["default"], {
        className: classes.divider,
        orientation: "vertical"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        className: this.state.ifHomePage ? classes.navbarDatePickerContainer : classes.navbarDatePickerContainerP
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_24__["default"], {
        label: this.state.ifHomePage ? _utils_i18n__WEBPACK_IMPORTED_MODULE_22__["SEARCHBAR"].labelWhen : false,
        classes: {
          root: this.state.ifHomePage ? classes.navbarRootTextFieldWhen : classes.navbarRootTextFieldWhenP
        },
        InputLabelProps: {
          shrink: true
        },
        InputProps: {
          inputComponent: inputRef => {
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_datepicker__WEBPACK_IMPORTED_MODULE_23___default.a, _extends({}, inputRef, {
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
              placeholderText: _utils_i18n__WEBPACK_IMPORTED_MODULE_22__["SEARCHBAR"].when,
              minDate: new Date(),
              className: this.state.ifHomePage ? classes.inputDatePicker : classes.inputDatePickerP
            }));
          },
          disableUnderline: true
        }
      }))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
        classes: {
          root: classes.iconButton
        },
        "aria-label": "search",
        onClick: () => this.findService()
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_20___default.a, null)))));
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

    axios__WEBPACK_IMPORTED_MODULE_30___default.a.defaults.headers.common['Authorization'] = react_cookies__WEBPACK_IMPORTED_MODULE_9___default.a.load('token');
    axios__WEBPACK_IMPORTED_MODULE_30___default.a.get('/myAlfred/api/users/current').then(res => {
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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_LogIn_LogIn__WEBPACK_IMPORTED_MODULE_10__["default"], {
        callRegister: this.handleOpenRegister,
        login: this.needRefresh
      });
    };

    const modalRegister = () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Register_Register__WEBPACK_IMPORTED_MODULE_11__["default"], {
        callLogin: this.handleOpenLogin,
        sendParentData: this.getData
      });
    };

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
      className: this.state.ifHomePage ? classes.navbarMainSytle : classes.navbarMainSytleP
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2__["default"], {
      position: 'static',
      className: this.state.ifHomePage ? classes.navbarAppBar : classes.navbarAppBarP
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_3__["default"], {
      classes: {
        root: this.state.ifHomePage ? classes.navBartoolbar : classes.navBartoolbarP
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_31__["default"], {
      only: ['xs']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
      className: this.state.ifHomePage ? classes.navbarTopContainer : classes.navbarTopContainerP
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
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
    })), ifHomePage ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
      className: ifHomePage ? classes.navabarHomepageMenu : classes.navabarHomepageMenuP
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_27__["default"], {
      value: false,
      "aria-label": "simple tabs example"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_29__["default"], {
      href: '/search?search=1'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_28__["default"], {
      classes: {
        root: classes.navbarTabRoot
      },
      label: _utils_i18n__WEBPACK_IMPORTED_MODULE_22__["NAVBAR_MENU"].ourServices
    })), user ? user.is_alfred ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_29__["default"], {
      href: `/profile/services?user=${user._id}&indexAccount=1`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_28__["default"], {
      classes: {
        root: classes.navbarTabRoot
      },
      label: _utils_i18n__WEBPACK_IMPORTED_MODULE_22__["NAVBAR_MENU"].myServices
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_29__["default"], {
      href: '/creaShop/creaShop'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_28__["default"], {
      classes: {
        root: classes.navbarTabRoot
      },
      label: _utils_i18n__WEBPACK_IMPORTED_MODULE_22__["NAVBAR_MENU"].registerServices
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_29__["default"], {
      onClick: this.handleOpenRegister
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_28__["default"], {
      classes: {
        root: classes.navbarTabRoot
      },
      label: _utils_i18n__WEBPACK_IMPORTED_MODULE_22__["NAVBAR_MENU"].registerServices
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_29__["default"], {
      href: '/footer/contact'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_28__["default"], {
      classes: {
        root: classes.navbarTabRoot
      },
      label: _utils_i18n__WEBPACK_IMPORTED_MODULE_22__["NAVBAR_MENU"].contactUs
    })))) : this.searchBarInput(classes), logged === true ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
      className: ifHomePage ? classes.navbarMenuBurgerContainer : classes.navbarMenuBurgerContainerP
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
      "aria-label": "open drawer",
      onClick: this.handleOpenMenuItem
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_19___default.a, {
      style: {
        color: 'white'
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_6__["default"], {
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
    }, user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], null, "Bonjour ", user.firstname, " !"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_29__["default"], {
      href: `/profile/about?user=${user._id}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], null, "Mon profil")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_29__["default"], {
      href: '/account/notifications'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], null, "Mes param\xE8tres")), user.is_alfred ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_29__["default"], {
      href: `/profile/services?user=${user._id}&indexAccount=1`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], null, "Mes services")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_29__["default"], {
      href: `/creaShop/creaShop`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], null, "Proposer mes services")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_29__["default"], {
      href: `/profile/messages?user=${user._id}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], null, "Mes messages")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_29__["default"], {
      href: `/reservations/reservations`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], null, "Mes r\xE9servations")), user.is_admin ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_29__["default"], {
      href: `/dashboard/home`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], null, "Dashboard")) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
      onClick: this.logout
    }, "D\xE9connexion")) : null)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
      className: ifHomePage ? classes.navbarButtonContainer : classes.navbarButtonContainerP
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.navBarlogIn,
      onClick: this.handleOpenLogin
    }, _utils_i18n__WEBPACK_IMPORTED_MODULE_22__["NAVBAR_MENU"].logIn), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_12__["default"], {
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
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_13__["default"], {
      classes: {
        root: classes.navbarWidthLoginContent
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.navbarPaper
    }, modalLogin())))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
      className: classes.navbarRegisterContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
      variant: "outlined",
      classes: {
        root: classes.navbarSignIn
      },
      onClick: this.handleOpenRegister
    }, _utils_i18n__WEBPACK_IMPORTED_MODULE_22__["NAVBAR_MENU"].signIn), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_12__["default"], {
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
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_13__["default"], {
      dividers: false,
      className: classes.navbarMuidialogContent
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.navbarPaper
    }, modalRegister())))))), ifHomePage ? this.searchBarInput(classes) : null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_31__["default"], {
      only: ['sm', 'md', 'lg', 'xl']
    }, ifHomePage ? this.mobileSearchBarInput(classes) : null, ifSearchPage ? this.mobileSearchBarInputSearchPage(classes) : null))), modalMobileSearchBarInput ? this.modalMobileSearchBarInput(classes) : null, modalFilters ? this.modalMobileFilter(classes) : null);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_32___default()(_static_css_components_NavBar_NavBar__WEBPACK_IMPORTED_MODULE_33__["default"])(NavBar));

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
/* harmony import */ var _components_HomePage_BecomeAlfred_BecomeAlfred__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/HomePage/BecomeAlfred/BecomeAlfred */ "./components/HomePage/BecomeAlfred/BecomeAlfred.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-helmet */ "./node_modules/react-helmet/lib/Helmet.js");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-cookies */ "./node_modules/react-cookies/build/cookie.js");
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_cookies__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _components_InfoBar_InfoBar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/InfoBar/InfoBar */ "./components/InfoBar/InfoBar.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _static_css_pages_homePage_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../static/css/pages/homePage/index */ "./static/css/pages/homePage/index.js");
/* harmony import */ var _hoc_Layout_NavBar_NavBar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../hoc/Layout/NavBar/NavBar */ "./hoc/Layout/NavBar/NavBar.js");
/* harmony import */ var _components_HomePage_BannerPresentation_BannerPresentation__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/HomePage/BannerPresentation/BannerPresentation */ "./components/HomePage/BannerPresentation/BannerPresentation.js");
/* harmony import */ var _components_HomePage_Category_CategoryTopic__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/HomePage/Category/CategoryTopic */ "./components/HomePage/Category/CategoryTopic.js");
/* harmony import */ var _components_HomePage_OurAlfred_OurAlfred__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/HomePage/OurAlfred/OurAlfred */ "./components/HomePage/OurAlfred/OurAlfred.js");
/* harmony import */ var _components_HomePage_HowItWorks_HowItWorks__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../components/HomePage/HowItWorks/HowItWorks */ "./components/HomePage/HowItWorks/HowItWorks.js");
/* harmony import */ var _components_HomePage_NewsLetter_NewsLetter__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../components/HomePage/NewsLetter/NewsLetter */ "./components/HomePage/NewsLetter/NewsLetter.js");
/* harmony import */ var _hoc_Layout_NavBar_MobileNavbar__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../hoc/Layout/NavBar/MobileNavbar */ "./hoc/Layout/NavBar/MobileNavbar.js");
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/core/Hidden */ "./node_modules/@material-ui/core/esm/Hidden/index.js");
/* harmony import */ var _hoc_Layout_TrustAndSecurity_TrustAndSecurity__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../hoc/Layout/TrustAndSecurity/TrustAndSecurity */ "./hoc/Layout/TrustAndSecurity/TrustAndSecurity.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");






















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
    const token = react_cookies__WEBPACK_IMPORTED_MODULE_6___default.a.load('token');

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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_5__["Helmet"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("title", null, "Services r\xE9mun\xE9r\xE9s entre particuliers - My Alfred "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("meta", {
      property: "description",
      content: "Des milliers de services r\xE9f\xE9renc\xE9s ! Consultez les offres de service r\xE9mun\xE9r\xE9s de milliers de particuliers avec My Alfred, premi\xE8re application d\u2019offres de services entre particuliers. Rendre service en \xE9tant r\xE9mun\xE9r\xE9 autour de chez soi n\u2019a jamais \xE9t\xE9 aussi simple"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_InfoBar_InfoBar__WEBPACK_IMPORTED_MODULE_8__["default"], {
      style: classes
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
      container: true,
      className: classes.navbarAndBannerContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
      className: classes.navbarAndBannerBackground
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
      className: classes.navbarComponentPosition
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_hoc_Layout_NavBar_NavBar__WEBPACK_IMPORTED_MODULE_11__["default"], {
      logged: logged
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
      className: classes.bannerPresentationContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
      className: classes.bannerSize
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_HomePage_BannerPresentation_BannerPresentation__WEBPACK_IMPORTED_MODULE_12__["default"], null))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
      container: true,
      className: classes.mainContainerStyle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
      className: classes.generalWidthContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_HomePage_Category_CategoryTopic__WEBPACK_IMPORTED_MODULE_13__["default"], {
      category: category
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
      container: true,
      className: classes.howItWorksComponent
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
      className: classes.generalWidthContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_HomePage_HowItWorks_HowItWorks__WEBPACK_IMPORTED_MODULE_15__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
      container: true,
      className: classes.mainContainerStyle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
      className: classes.generalWidthContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_HomePage_OurAlfred_OurAlfred__WEBPACK_IMPORTED_MODULE_14__["default"], {
      alfred: alfred
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
      container: true,
      className: classes.becomeAlfredComponent
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
      className: classes.generalWidthContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_HomePage_BecomeAlfred_BecomeAlfred__WEBPACK_IMPORTED_MODULE_3__["default"], {
      style: classes
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_18__["default"], {
      only: ['xs', 'sm']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
      container: true,
      className: classes.mainNewsLetterStyle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
      className: classes.generalWidthContainerNewsLtter
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_HomePage_NewsLetter_NewsLetter__WEBPACK_IMPORTED_MODULE_16__["default"], null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_20__["Divider"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
      className: classes.trustAndSecurityContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
      className: classes.trustAndSecurityComponent
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_hoc_Layout_TrustAndSecurity_TrustAndSecurity__WEBPACK_IMPORTED_MODULE_19__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
      container: true,
      className: classes.mainContainerStyleFooter
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
      className: classes.generalWidthFooter
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_hoc_Layout_Footer_Footer__WEBPACK_IMPORTED_MODULE_2__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_18__["default"], {
      only: ['xl', 'lg', 'md', 'sm']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
      style: {
        position: 'fixed',
        bottom: '3%',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        zIndex: 1
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_7__["default"], {
      style: {
        width: '100%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_hoc_Layout_NavBar_MobileNavbar__WEBPACK_IMPORTED_MODULE_17__["default"], {
      currentIndex: 0
    }))))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__["withStyles"])(_static_css_pages_homePage_index__WEBPACK_IMPORTED_MODULE_10__["default"])(Home));

/***/ }),

/***/ "./utils/authentication.js":
/*!*********************************!*\
  !*** ./utils/authentication.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var _reactCookies = _interopRequireDefault(__webpack_require__(/*! react-cookies */ "./node_modules/react-cookies/build/cookie.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setAxiosAuthentication = () => {
  const token = _reactCookies.default.load('token');

  if (token) {
    // Apply to every request
    _axios.default.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete _axios.default.defaults.headers.common['Authorization'];
  }
};

const clearAuthenticationToken = () => {
  _reactCookies.default.remove('token', {
    path: '/'
  });
};

module.exports = {
  setAxiosAuthentication,
  clearAuthenticationToken
};

/***/ }),

/***/ "./utils/functions.js":
/*!****************************!*\
  !*** ./utils/functions.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getDistance = _interopRequireDefault(__webpack_require__(/*! geolib/es/getDistance */ "./node_modules/geolib/es/getDistance.js"));

var _convertDistance = _interopRequireDefault(__webpack_require__(/*! geolib/es/convertDistance */ "./node_modules/geolib/es/convertDistance.js"));

var _reactCookies = _interopRequireDefault(__webpack_require__(/*! react-cookies */ "./node_modules/react-cookies/build/cookie.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const jwt = __webpack_require__(/*! jsonwebtoken */ "./node_modules/jsonwebtoken/index.js");

const isEmpty = __webpack_require__(/*! ../server/validation/is-empty */ "./server/validation/is-empty.js");

const moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

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
  const token = _reactCookies.default.load('token');

  if (!token) {
    console.log('Pas de cookie');
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

/***/ })

})
//# sourceMappingURL=index.js.fa9a0adf5a7482857860.hot-update.js.map