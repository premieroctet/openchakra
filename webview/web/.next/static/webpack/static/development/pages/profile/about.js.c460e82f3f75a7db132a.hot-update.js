webpackHotUpdate("static\\development\\pages\\profile\\about.js",{

/***/ "./components/About/About.js":
/*!***********************************!*\
  !*** ./components/About/About.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _static_css_components_About_About__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../static/css/components/About/About */ "./static/css/components/About/About.js");
/* harmony import */ var _ListAlfredConditions_ListAlfredConditions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ListAlfredConditions/ListAlfredConditions */ "./components/ListAlfredConditions/ListAlfredConditions.js");
/* harmony import */ var _material_ui_icons_Room__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/icons/Room */ "./node_modules/@material-ui/icons/Room.js");
/* harmony import */ var _material_ui_icons_Room__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Room__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_icons_CheckCircleOutline__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/CheckCircleOutline */ "./node_modules/@material-ui/icons/CheckCircleOutline.js");
/* harmony import */ var _material_ui_icons_CheckCircleOutline__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_CheckCircleOutline__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_icons_ChatBubbleOutlineOutlined__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/icons/ChatBubbleOutlineOutlined */ "./node_modules/@material-ui/icons/ChatBubbleOutlineOutlined.js");
/* harmony import */ var _material_ui_icons_ChatBubbleOutlineOutlined__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ChatBubbleOutlineOutlined__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Avatar_UserAvatar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Avatar/UserAvatar */ "./components/Avatar/UserAvatar.js");
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ "./node_modules/@material-ui/core/esm/DialogTitle/index.js");
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Dialog */ "./node_modules/@material-ui/core/esm/Dialog/index.js");
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/DialogContent */ "./node_modules/@material-ui/core/esm/DialogContent/index.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/index.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var _hoc_Topic_Topic__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../hoc/Topic/Topic */ "./hoc/Topic/Topic.js");
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! algolia-places-react */ "./node_modules/algolia-places-react/dist/index.es.js");
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(algolia_places_react__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.browser.esm.js");
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../utils/consts */ "./utils/consts.js");
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_utils_consts__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/icons/Create */ "./node_modules/@material-ui/icons/Create.js");
/* harmony import */ var _material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../utils/functions */ "./utils/functions.js");
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_utils_functions__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @material-ui/core/IconButton */ "./node_modules/@material-ui/core/esm/IconButton/index.js");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @material-ui/icons/Close */ "./node_modules/@material-ui/icons/Close.js");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @material-ui/core/Divider */ "./node_modules/@material-ui/core/esm/Divider/index.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const {
  setAxiosAuthentication
} = __webpack_require__(/*! ../../utils/authentication */ "./utils/authentication.js");


























const {
  frenchFormat
} = __webpack_require__(/*! ../../utils/text */ "./utils/text.js");

const moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

moment.locale('fr');
const DialogTitle = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(_static_css_components_About_About__WEBPACK_IMPORTED_MODULE_4__["default"])(props => {
  const {
    children,
    classes,
    onClose,
    ...other
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_10__["default"], _extends({
    disableTypography: true
  }, other, {
    className: classes.root
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_13__["default"], {
    variant: "h6"
  }, children), onClose ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_21__["default"], {
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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_11__["default"], {
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
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_12__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hoc_Topic_Topic__WEBPACK_IMPORTED_MODULE_15__["default"], {
        titleTopic: 'Modifiez vos informations',
        titleSummary: 'Ici, vous pouvez modifier vos informations',
        underline: true
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        container: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        container: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
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
      }, "Lieu d'habitation")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
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
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        container: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        item: true,
        xs: 12,
        lg: 12,
        style: {
          marginTop: '2vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_13__["default"], {
        style: {
          fontWeight: 'bold',
          textTransform: 'initial'
        }
      }, "Langues parl\xE9es")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        item: true,
        xs: 12,
        style: {
          marginTop: '3vh',
          marginBottom: '3vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_17__["default"], {
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
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        style: {
          marginTop: '2vh',
          width: '100%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_23__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        style: {
          marginTop: '2vh',
          width: '100%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_14__["default"], {
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }
    }, displayTitlePicture ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, frenchFormat(`A propos de ${user ? user.firstname : ''}`)) : null, editable ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        position: 'absolute',
        right: 0
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_21__["default"], {
      "aria-label": "edit",
      onClick: this.openEdition
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_19___default.a, null))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        display: 'flex',
        flexDirection: 'row'
      }
    }, displayTitlePicture ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
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

/***/ "./components/Avatar/UserAvatar.js":
/*!*****************************************!*\
  !*** ./components/Avatar/UserAvatar.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Avatar */ "./node_modules/@material-ui/core/esm/Avatar/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_Badge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Badge */ "./node_modules/@material-ui/core/esm/Badge/index.js");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _material_ui_core_Popover__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Popover */ "./node_modules/@material-ui/core/esm/Popover/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _UserAvatarStyle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./UserAvatarStyle */ "./components/Avatar/UserAvatarStyle.js");
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/functions */ "./utils/functions.js");
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_utils_functions__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/index.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  setAxiosAuthentication
} = __webpack_require__(/*! ../../utils/authentication */ "./utils/authentication.js");











const {
  getLoggedUserId
} = __webpack_require__(/*! ../../utils/functions */ "./utils/functions.js");



const jwt = __webpack_require__(/*! jsonwebtoken */ "./node_modules/jsonwebtoken/index.js");

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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1__["default"], {
      alt: "photo de profil",
      src: url,
      className: className,
      onClick: this.selectPicture
    });
  }

  avatarWithoutPics(user, className) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1__["default"], {
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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
        style: {
          width: '100%',
          height: '100%'
        }
      }, owner && kyc ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Badge__WEBPACK_IMPORTED_MODULE_3__["default"], {
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
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Popover__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, kyc.map(res => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, res))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_1__["default"], {
        alt: "photo de profil",
        src: "/static/basicavatar.png",
        className: className
      });
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(_UserAvatarStyle__WEBPACK_IMPORTED_MODULE_7__["default"])(UserAvatar));

/***/ }),

/***/ "./components/Badges/Badges.js":
/*!*************************************!*\
  !*** ./components/Badges/Badges.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
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

/***/ "./components/Hashtags/Hashtags.js":
/*!*****************************************!*\
  !*** ./components/Hashtags/Hashtags.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _HashtagsStyle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./HashtagsStyle */ "./components/Hashtags/HashtagsStyle.js");
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Avatar */ "./node_modules/@material-ui/core/esm/Avatar/index.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/index.js");
/* harmony import */ var _material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Chip */ "./node_modules/@material-ui/core/esm/Chip/index.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var _material_ui_core_Badge__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Badge */ "./node_modules/@material-ui/core/esm/Badge/index.js");
/* harmony import */ var _material_ui_icons_EmojiEmotions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/EmojiEmotions */ "./node_modules/@material-ui/icons/EmojiEmotions.js");
/* harmony import */ var _material_ui_icons_EmojiEmotions__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_EmojiEmotions__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _hoc_Topic_Topic__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../hoc/Topic/Topic */ "./hoc/Topic/Topic.js");
/* harmony import */ var _ListAlfredConditions_ListAlfredConditions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../ListAlfredConditions/ListAlfredConditions */ "./components/ListAlfredConditions/ListAlfredConditions.js");
/* harmony import */ var _material_ui_icons_Room__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/icons/Room */ "./node_modules/@material-ui/icons/Room.js");
/* harmony import */ var _material_ui_icons_Room__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Room__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _material_ui_icons_CheckCircleOutline__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/icons/CheckCircleOutline */ "./node_modules/@material-ui/icons/CheckCircleOutline.js");
/* harmony import */ var _material_ui_icons_CheckCircleOutline__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_CheckCircleOutline__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _material_ui_icons_ChatBubbleOutlineOutlined__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/icons/ChatBubbleOutlineOutlined */ "./node_modules/@material-ui/icons/ChatBubbleOutlineOutlined.js");
/* harmony import */ var _material_ui_icons_ChatBubbleOutlineOutlined__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ChatBubbleOutlineOutlined__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _material_ui_icons_Person__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/icons/Person */ "./node_modules/@material-ui/icons/Person.js");
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

const moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

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
/* harmony import */ var _material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/Visibility */ "./node_modules/@material-ui/icons/Visibility.js");
/* harmony import */ var _material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_icons_VisibilityOff__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/VisibilityOff */ "./node_modules/@material-ui/icons/VisibilityOff.js");
/* harmony import */ var _material_ui_icons_VisibilityOff__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_VisibilityOff__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/InputAdornment */ "./node_modules/@material-ui/core/esm/InputAdornment/index.js");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/IconButton */ "./node_modules/@material-ui/core/esm/IconButton/index.js");
/* harmony import */ var _material_ui_core_Input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/core/Input */ "./node_modules/@material-ui/core/esm/Input/index.js");
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
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Input__WEBPACK_IMPORTED_MODULE_15__["default"], {
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
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Input__WEBPACK_IMPORTED_MODULE_15__["default"], {
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
      endAdornment: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_13__["default"], {
        position: "end"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_14__["default"], {
        "aria-label": "toggle password visibility",
        onClick: this.handleClickShowPassword,
        onMouseDown: this.handleMouseDownPassword
      }, showPassword ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_11___default.a, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_VisibilityOff__WEBPACK_IMPORTED_MODULE_12___default.a, null)))
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

/***/ "./components/Presentation/Presentation.js":
/*!*************************************************!*\
  !*** ./components/Presentation/Presentation.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _static_css_components_Presentation_Presentation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../static/css/components/Presentation/Presentation */ "./static/css/components/Presentation/Presentation.js");
/* harmony import */ var _hoc_Topic_Topic__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hoc/Topic/Topic */ "./hoc/Topic/Topic.js");
/* harmony import */ var _Box_Box__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Box/Box */ "./components/Box/Box.js");
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ "./node_modules/@material-ui/core/esm/DialogTitle/index.js");
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Dialog */ "./node_modules/@material-ui/core/esm/Dialog/index.js");
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/DialogContent */ "./node_modules/@material-ui/core/esm/DialogContent/index.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/index.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/TextField */ "./node_modules/@material-ui/core/esm/TextField/index.js");
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../utils/i18n */ "./utils/i18n.js");
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_utils_i18n__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../utils/consts */ "./utils/consts.js");
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_utils_consts__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../utils/functions */ "./utils/functions.js");
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_utils_functions__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/icons/Create */ "./node_modules/@material-ui/icons/Create.js");
/* harmony import */ var _material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/core/IconButton */ "./node_modules/@material-ui/core/esm/IconButton/index.js");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/icons/Close */ "./node_modules/@material-ui/icons/Close.js");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_18__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const {
  setAxiosAuthentication
} = __webpack_require__(/*! ../../utils/authentication */ "./utils/authentication.js");


















const {
  frenchFormat
} = __webpack_require__(/*! ../../utils/text */ "./utils/text.js");





const moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

moment.locale('fr');
const DialogTitle = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(_static_css_components_Presentation_Presentation__WEBPACK_IMPORTED_MODULE_4__["default"])(props => {
  const {
    children,
    classes,
    onClose,
    ...other
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_7__["default"], _extends({
    disableTypography: true
  }, other, {
    className: classes.root
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__["default"], {
    variant: "h6"
  }, children), onClose ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_17__["default"], {
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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_8__["default"], {
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
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_9__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hoc_Topic_Topic__WEBPACK_IMPORTED_MODULE_5__["default"], {
        titleTopic: 'Modifiez votre description',
        titleSummary: 'Ajoutez ou modifiez votre "À propos" ',
        underline: true
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], {
        container: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], {
        item: true,
        xs: 12,
        lg: 12,
        style: {
          marginTop: '2vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_12__["default"], {
        multiline: true,
        classes: {
          root: classes.textField
        },
        rowsMax: 4,
        rows: 4,
        value: newDescription,
        placeholder: placeholder,
        onChange: this.onTextChanged
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], {
        style: {
          marginTop: '2vh',
          display: 'flex',
          alignItems: 'flex-end',
          width: '100%',
          flexDirection: 'column'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__["default"], null, `${_utils_consts__WEBPACK_IMPORTED_MODULE_14__["MAX_TEXT_SIZE"]} caractères max`)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], {
        style: {
          width: '100%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11__["default"], {
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], {
      style: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }
    }, editable ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], {
      style: {
        position: 'absolute',
        right: 0
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_17__["default"], {
      "aria-label": "edit",
      onClick: this.openEdition
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_16___default.a, null))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hoc_Topic_Topic__WEBPACK_IMPORTED_MODULE_5__["default"], {
      titleTopic: title,
      titleSummary: user ? `membre depuis ${moment(user.creation_date).format("MMMM YYYY")}` : ''
    }, user ? user.description : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], null, this.modalEditDialog(classes)));
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
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
          container: true
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Information_Information__WEBPACK_IMPORTED_MODULE_34__["default"], {
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
        }, PROVIDERS.map(provider => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OAuth_OAuth__WEBPACK_IMPORTED_MODULE_33__["default"], {
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

/***/ "./components/Skills/Skills.js":
/*!*************************************!*\
  !*** ./components/Skills/Skills.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
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
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      container: true,
      className: classes.skillsContainer,
      spacing: 3
    }, Object.keys(SKILLS).map(skill => {
      const name = SKILLS[skill].entrieName;
      const count = skills ? skills[name] : skill_values[skill];
      const pic = `/static/assets/img/skillsAlfred/${SKILLS[skill].picture}${count ? '' : '_disabled'}.svg`;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        item: true,
        xs: 6,
        lg: 3,
        xl: 3,
        sm: 6,
        md: 6,
        className: classes.skillCard,
        onClick: e => skillClicked(e, name)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        title: 'pics',
        alt: 'pics',
        src: pic,
        className: classes.avatarSize
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        className: classes.skillTitle
      }, SKILLS[skill].label), hideCount ? null : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        className: classes.skillValue
      }, `(${skill_values[skill]})`));
    })));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(_SkillsStyle__WEBPACK_IMPORTED_MODULE_4__["default"])(Skills));

/***/ }),

/***/ "./hoc/Layout/Layout.js":
/*!******************************!*\
  !*** ./hoc/Layout/Layout.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _NavBar_NavBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NavBar/NavBar */ "./hoc/Layout/NavBar/NavBar.js");
/* harmony import */ var _Footer_Footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Footer/Footer */ "./hoc/Layout/Footer/Footer.js");
/* harmony import */ var _static_css_pages_layout_layoutStyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../static/css/pages/layout/layoutStyle */ "./static/css/pages/layout/layoutStyle.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _components_InfoBar_InfoBar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/InfoBar/InfoBar */ "./components/InfoBar/InfoBar.js");
/* harmony import */ var _components_ScrollMenu_ScrollMenu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/ScrollMenu/ScrollMenu */ "./components/ScrollMenu/ScrollMenu.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _TrustAndSecurity_TrustAndSecurity__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./TrustAndSecurity/TrustAndSecurity */ "./hoc/Layout/TrustAndSecurity/TrustAndSecurity.js");
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Divider */ "./node_modules/@material-ui/core/esm/Divider/index.js");
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InfoBar_InfoBar__WEBPACK_IMPORTED_MODULE_6__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NavBar_NavBar__WEBPACK_IMPORTED_MODULE_1__["default"], {
      selectedAddress: selectedAddress,
      keyword: keyword,
      logged: logged,
      key: this.logged
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      className: classes.layoutScrollMenu
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ScrollMenu_ScrollMenu__WEBPACK_IMPORTED_MODULE_7__["default"], {
      categories: categories,
      gps: gps,
      indexCat: indexCat,
      mode: false
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      className: classes.filterMenuDivierContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_10__["default"], {
      className: classes.filterMenuDividerStyle
    }))), children, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      className: classes.mainContainerStyleFooter
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_10__["default"], {
      style: {
        width: '100%'
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      style: {
        width: '90%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TrustAndSecurity_TrustAndSecurity__WEBPACK_IMPORTED_MODULE_9__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      className: classes.generalWidthFooter
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      style: {
        width: '85%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Footer_Footer__WEBPACK_IMPORTED_MODULE_2__["default"], null)))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__["withStyles"])(_static_css_pages_layout_layoutStyle__WEBPACK_IMPORTED_MODULE_3__["default"])(Layout));

/***/ }),

/***/ "./hoc/Layout/LayoutMobileProfile.js":
/*!*******************************************!*\
  !*** ./hoc/Layout/LayoutMobileProfile.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/IconButton */ "./node_modules/@material-ui/core/esm/IconButton/index.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_icons_ArrowBackIos__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/icons/ArrowBackIos */ "./node_modules/@material-ui/icons/ArrowBackIos.js");
/* harmony import */ var _material_ui_icons_ArrowBackIos__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ArrowBackIos__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _NavBar_MobileNavbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NavBar/MobileNavbar */ "./hoc/Layout/NavBar/MobileNavbar.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "./node_modules/@material-ui/core/styles/withStyles.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _static_css_components_Layout_LayoutMobileProfile_LayoutMobileProfile__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../static/css/components/Layout/LayoutMobileProfile/LayoutMobileProfile */ "./static/css/components/Layout/LayoutMobileProfile/LayoutMobileProfile.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Avatar */ "./node_modules/@material-ui/core/esm/Avatar/index.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/index.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var _material_ui_icons_CalendarToday__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/CalendarToday */ "./node_modules/@material-ui/icons/CalendarToday.js");
/* harmony import */ var _material_ui_icons_CalendarToday__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_CalendarToday__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _components_ScrollMenu_ScrollMenu__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/ScrollMenu/ScrollMenu */ "./components/ScrollMenu/ScrollMenu.js");
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/Divider */ "./node_modules/@material-ui/core/esm/Divider/index.js");
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.layoutMobileProfilHeader
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_2__["default"], {
      "aria-label": "ArrowBackIosIcon",
      onClick: () => next_router__WEBPACK_IMPORTED_MODULE_3___default.a.back()
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ArrowBackIos__WEBPACK_IMPORTED_MODULE_4___default.a, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.layoutMobileLayoutProfileHeader
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.profilLayoutAvatar
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Avatar_UserAvatar__WEBPACK_IMPORTED_MODULE_15__["default"], {
      alt: user.firstname,
      user: user,
      className: classes.cardPreviewLarge
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        display: 'flex',
        height: '40%',
        alignItems: 'center',
        marginTop: '10vh',
        marginLeft: '5vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, `Je m'appelle ${user ? user.firstname : ''}`)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__["default"], {
      style: {
        color: 'rgba(39,37,37,35%)'
      }
    }, "et j\u2019ai h\xE2te de vous rencontrer !"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        marginTop: '5vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_14__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.profilLayoutScrollMenu
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ScrollMenu_ScrollMenu__WEBPACK_IMPORTED_MODULE_13__["default"], {
      categories: menuItems,
      mode: 'profile',
      indexCat: index,
      extraParams: {
        user: this.props.user
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        padding: '10%'
      }
    }, children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        position: 'fixed',
        bottom: '3%',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        zIndex: 4
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
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
/* harmony import */ var _components_LogIn_LogIn__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../components/LogIn/LogIn */ "./components/LogIn/LogIn.js");
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/DialogContent */ "./node_modules/@material-ui/core/esm/DialogContent/index.js");
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/Dialog */ "./node_modules/@material-ui/core/esm/Dialog/index.js");
/* harmony import */ var _material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/core/Slide */ "./node_modules/@material-ui/core/esm/Slide/index.js");
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ "./node_modules/@material-ui/core/esm/DialogTitle/index.js");
/* harmony import */ var _components_Register_Register__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../components/Register/Register */ "./components/Register/Register.js");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @material-ui/core/IconButton */ "./node_modules/@material-ui/core/esm/IconButton/index.js");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @material-ui/icons/Close */ "./node_modules/@material-ui/icons/Close.js");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _material_ui_icons_GroupAdd__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @material-ui/icons/GroupAdd */ "./node_modules/@material-ui/icons/GroupAdd.js");
/* harmony import */ var _material_ui_icons_GroupAdd__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_GroupAdd__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @material-ui/core/TextField */ "./node_modules/@material-ui/core/esm/TextField/index.js");
/* harmony import */ var _material_ui_core_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @material-ui/core/SwipeableDrawer */ "./node_modules/@material-ui/core/esm/SwipeableDrawer/index.js");
/* harmony import */ var _material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @material-ui/icons/Clear */ "./node_modules/@material-ui/icons/Clear.js");
/* harmony import */ var _material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @material-ui/core/FormControl */ "./node_modules/@material-ui/core/esm/FormControl/index.js");
/* harmony import */ var _material_ui_core_Select__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @material-ui/core/Select */ "./node_modules/@material-ui/core/esm/Select/index.js");
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @material-ui/core/MenuItem */ "./node_modules/@material-ui/core/esm/MenuItem/index.js");
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! algolia-places-react */ "./node_modules/algolia-places-react/dist/index.es.js");
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(algolia_places_react__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_15__["default"], _extends({
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_16__["default"], _extends({
    disableTypography: true,
    className: classes.root
  }, other), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_19__["Typography"], {
    variant: "h6"
  }, children), onClose ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_20__["default"], {
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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_14__["default"], {
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
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_13__["default"], {
        classes: {
          root: classes.navbarWidthLoginContent
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18__["default"], {
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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_14__["default"], {
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
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_13__["default"], {
        dividers: false,
        className: classes.navbarMuidialogContent
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18__["default"], {
        className: classes.navbarPaper
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Register_Register__WEBPACK_IMPORTED_MODULE_17__["default"], {
        callLogin: this.handleOpenLogin,
        sendParentData: this.getData
      }))));
    });

    _defineProperty(this, "modalMobileSearchBarInput", classes => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_24__["default"], {
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
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18__["default"], {
        container: true,
        style: {
          height: '100%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18__["default"], {
        item: true,
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_20__["default"], {
        "aria-label": "delete",
        onClick: () => this.setState({
          modalMobileSearchBarInput: false,
          mobileStepSearch: 0,
          keyword: null,
          city: undefined,
          gps: ''
        })
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_25___default.a, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, this.state.mobileStepSearch === 0 ? 'Votre Recherche' : this.state.mobileStepSearch === 1 ? 'Où' : 'Dates'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18__["default"], {
        item: true,
        container: true,
        spacing: 3,
        style: {
          margin: 0
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18__["default"], {
        item: true,
        xs: 12,
        style: {
          display: 'flex',
          justifyContent: 'center'
        }
      }, this.state.mobileStepSearch === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_23__["default"], {
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
      }) : this.state.user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_26__["default"], {
        variant: "outlined"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_27__["default"], {
        id: "outlined-select-currency",
        value: 'main',
        name: 'selectedAddress',
        onChange: e => {
          this.onChange(e);
        },
        classes: {
          selectMenu: classes.fitlerMenuLogged
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_28__["default"], {
        value: 'main',
        style: {
          whiteSpace: 'nowrap'
        }
      }, "Adresse principale, ", ' ' + this.state.user.billing_address.address, " ", this.state.user.billing_address.zip_code, ",", this.state.user.billing_address.city), this.state.user.service_address.map((e, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_28__["default"], {
        value: e._id,
        key: index
      }, e.label + ', ', " ", ' ' + e.address, ",", e.zip_code, " ", e.city)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_28__["default"], {
        value: 'all'
      }, "Partout, Rechercher des Alfred partout"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_28__["default"], {
        value: 'addAddress'
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_19__["Typography"], {
        style: {
          color: '#2FBCD3',
          cursor: 'pointer'
        }
      }, "Ajouter une adresse"))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_23__["default"], {
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
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18__["default"], {
        item: true,
        xs: 12,
        style: {
          display: 'flex',
          justifyContent: 'center'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_18__["default"], {
        style: {
          width: '90%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_30__["default"], {
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
/* harmony import */ var _components_LogIn_LogIn__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/LogIn/LogIn */ "./components/LogIn/LogIn.js");
/* harmony import */ var _components_Register_Register__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../components/Register/Register */ "./components/Register/Register.js");
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Dialog */ "./node_modules/@material-ui/core/esm/Dialog/index.js");
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/DialogContent */ "./node_modules/@material-ui/core/esm/DialogContent/index.js");
/* harmony import */ var _material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/Slide */ "./node_modules/@material-ui/core/esm/Slide/index.js");
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ "./node_modules/@material-ui/core/esm/DialogTitle/index.js");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/icons/Close */ "./node_modules/@material-ui/icons/Close.js");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/core/Paper */ "./node_modules/@material-ui/core/esm/Paper/index.js");
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/core/Divider */ "./node_modules/@material-ui/core/esm/Divider/index.js");
/* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/icons/Menu */ "./node_modules/@material-ui/icons/Menu.js");
/* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/icons/Search */ "./node_modules/@material-ui/icons/Search.js");
/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! algolia-places-react */ "./node_modules/algolia-places-react/dist/index.es.js");
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(algolia_places_react__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../utils/i18n */ "./utils/i18n.js");
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_utils_i18n__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! react-datepicker */ "./node_modules/react-datepicker/dist/react-datepicker.min.js");
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(react_datepicker__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @material-ui/core/TextField */ "./node_modules/@material-ui/core/esm/TextField/index.js");
/* harmony import */ var _material_ui_core_Select__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @material-ui/core/Select */ "./node_modules/@material-ui/core/esm/Select/index.js");
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @material-ui/core/FormControl */ "./node_modules/@material-ui/core/esm/FormControl/index.js");
/* harmony import */ var _material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @material-ui/core/Tabs */ "./node_modules/@material-ui/core/esm/Tabs/index.js");
/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @material-ui/core/Tab */ "./node_modules/@material-ui/core/esm/Tab/index.js");
/* harmony import */ var _components_Link_Link__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../../components/Link/Link */ "./components/Link/Link.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @material-ui/core/Hidden */ "./node_modules/@material-ui/core/esm/Hidden/index.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "./node_modules/@material-ui/core/styles/withStyles.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var _static_css_components_NavBar_NavBar__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../../../static/css/components/NavBar/NavBar */ "./static/css/components/NavBar/NavBar.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_icons_Tune__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @material-ui/icons/Tune */ "./node_modules/@material-ui/icons/Tune.js");
/* harmony import */ var _material_ui_icons_Tune__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Tune__WEBPACK_IMPORTED_MODULE_34__);
/* harmony import */ var _material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @material-ui/core/InputLabel */ "./node_modules/@material-ui/core/esm/InputLabel/index.js");
/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @material-ui/core/DialogActions */ "./node_modules/@material-ui/core/esm/DialogActions/index.js");
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @material-ui/core/FormControlLabel */ "./node_modules/@material-ui/core/esm/FormControlLabel/index.js");
/* harmony import */ var _material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @material-ui/core/Switch */ "./node_modules/@material-ui/core/esm/Switch/index.js");
/* harmony import */ var react_dates__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! react-dates */ "./node_modules/react-dates/index.js");
/* harmony import */ var react_dates__WEBPACK_IMPORTED_MODULE_39___default = /*#__PURE__*/__webpack_require__.n(react_dates__WEBPACK_IMPORTED_MODULE_39__);
/* harmony import */ var _material_ui_core_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @material-ui/core/SwipeableDrawer */ "./node_modules/@material-ui/core/esm/SwipeableDrawer/index.js");
/* harmony import */ var _material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @material-ui/icons/Clear */ "./node_modules/@material-ui/icons/Clear.js");
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Slide__WEBPACK_IMPORTED_MODULE_13__["default"], _extends({
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_14__["default"], _extends({
    disableTypography: true,
    className: classes.root
  }, other), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_33__["Typography"], {
    variant: "h6"
  }, children), onClose ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        className: this.state.ifHomePage ? classes.navbarSearchContainer : classes.navbarSearchContainerSearchP,
        onClick: this.handleModalSearchBarInput
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_16__["default"], {
        classes: {
          root: this.state.ifHomePage ? classes.navbarSearch : classes.navbarSearchP
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
        classes: {
          root: classes.iconButton
        },
        "aria-label": "search"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_19___default.a, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        style: {
          marginLeft: '2vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_33__["Typography"], null, "Commencez votre recherche"))));
    });

    _defineProperty(this, "modalMobileSearchBarInput", classes => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_40__["default"], {
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
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Clear__WEBPACK_IMPORTED_MODULE_41___default.a, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, this.state.mobileStepSearch === 0 ? 'Votre Recherche' : this.state.mobileStepSearch === 1 ? 'Où' : 'Dates'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
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
      }, this.state.mobileStepSearch === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_23__["default"], {
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
      }) : this.state.user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_25__["default"], {
        variant: "outlined"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_24__["default"], {
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
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_33__["Typography"], {
        style: {
          color: '#2FBCD3',
          cursor: 'pointer'
        }
      }, "Ajouter une adresse"))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_23__["default"], {
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
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_16__["default"], {
        classes: {
          root: classes.navbarSearch
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
        classes: {
          root: classes.iconButton
        },
        "aria-label": "search",
        onClick: this.handleModalSearchBarInput
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_19___default.a, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
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
      }, "Commencez votre recherche")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        style: {
          height: 30
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_17__["default"], {
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
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Tune__WEBPACK_IMPORTED_MODULE_34___default.a, null))));
    });

    _defineProperty(this, "modalMobileFilter", classes => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_11__["default"], {
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
      }, "Filtres"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_12__["default"], {
        dividers: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_37__["default"], {
        control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_38__["default"], {
          checked: this.state.proSelected,
          onChange: e => {
            this.statusFilterChanged(e);
          },
          value: this.state.proSelected,
          color: "primary",
          name: 'proSelected'
        }),
        label: "Pro"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_37__["default"], {
        control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Switch__WEBPACK_IMPORTED_MODULE_38__["default"], {
          checked: this.state.individualSelected,
          onChange: e => {
            this.statusFilterChanged(e);
          },
          value: this.state.individualSelected,
          color: "primary",
          name: 'individualSelected'
        }),
        label: "Particulier"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_17__["default"], {
        style: {
          width: '100%',
          marginTop: '2vh',
          marginBottom: '2vh'
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_dates__WEBPACK_IMPORTED_MODULE_39__["DateRangePicker"], {
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
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_36__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
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
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_16__["default"], {
        classes: {
          root: this.state.ifHomePage ? classes.navbarSearch : classes.navbarSearchP
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        className: classes.navbarTextFieldService
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_23__["default"], {
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
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_17__["default"], {
        className: classes.divider,
        orientation: "vertical"
      })), this.state.user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        className: classes.navbarAddressContainer
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_25__["default"], {
        className: classes.navbarFormControlAddress
      }, this.state.ifHomePage ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_35__["default"], {
        shrink: true,
        id: "demo-simple-select-placeholder-label-label"
      }, "L'Adresse") : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_24__["default"], {
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
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_33__["Typography"], {
        style: {
          color: '#2FBCD3',
          cursor: 'pointer'
        }
      }, "Ajouter une adresse"))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        className: this.state.ifHomePage ? classes.navbarAlgoliaContent : classes.navbarAlgoliaContentP
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_23__["default"], {
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
      })), this.state.logged === false ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        className: classes.navbarDatePickerMain
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_17__["default"], {
        className: classes.divider,
        orientation: "vertical"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
        className: this.state.ifHomePage ? classes.navbarDatePickerContainer : classes.navbarDatePickerContainerP
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_23__["default"], {
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
      }))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
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

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
      className: this.state.ifHomePage ? classes.navbarMainSytle : classes.navbarMainSytleP
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2__["default"], {
      position: 'static',
      className: this.state.ifHomePage ? classes.navbarAppBar : classes.navbarAppBarP
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_3__["default"], {
      classes: {
        root: this.state.ifHomePage ? classes.navBartoolbar : classes.navBartoolbarP
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_30__["default"], {
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
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_26__["default"], {
      value: false,
      "aria-label": "simple tabs example"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      href: '/search?search=1'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_27__["default"], {
      classes: {
        root: classes.navbarTabRoot
      },
      label: _utils_i18n__WEBPACK_IMPORTED_MODULE_21__["NAVBAR_MENU"].ourServices
    })), user ? user.is_alfred ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      href: `/profile/services?user=${user._id}&indexAccount=1`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_27__["default"], {
      classes: {
        root: classes.navbarTabRoot
      },
      label: _utils_i18n__WEBPACK_IMPORTED_MODULE_21__["NAVBAR_MENU"].myServices
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      href: '/creaShop/creaShop'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_27__["default"], {
      classes: {
        root: classes.navbarTabRoot
      },
      label: _utils_i18n__WEBPACK_IMPORTED_MODULE_21__["NAVBAR_MENU"].registerServices
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      onClick: this.handleOpenRegister
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_27__["default"], {
      classes: {
        root: classes.navbarTabRoot
      },
      label: _utils_i18n__WEBPACK_IMPORTED_MODULE_21__["NAVBAR_MENU"].registerServices
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      href: '/footer/contact'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_27__["default"], {
      classes: {
        root: classes.navbarTabRoot
      },
      label: _utils_i18n__WEBPACK_IMPORTED_MODULE_21__["NAVBAR_MENU"].contactUs
    })))) : this.searchBarInput(classes), logged === true ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
      className: ifHomePage ? classes.navbarMenuBurgerContainer : classes.navbarMenuBurgerContainerP
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
      "aria-label": "open drawer",
      onClick: this.handleOpenMenuItem
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_18___default.a, {
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
    }, user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], null, "Bonjour ", user.firstname, " !"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      href: `/profile/about?user=${user._id}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], null, "Mon profil")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      href: '/account/notifications'
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], null, "Mes param\xE8tres")), user.is_alfred ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      href: `/profile/services?user=${user._id}&indexAccount=1`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], null, "Mes services")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      href: `/creaShop/creaShop`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], null, "Proposer mes services")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      href: `/profile/messages?user=${user._id}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], null, "Mes messages")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      href: `/reservations/reservations`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], null, "Mes r\xE9servations")), user.is_admin ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Link_Link__WEBPACK_IMPORTED_MODULE_28__["default"], {
      href: `/dashboard/home`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], null, "Dashboard")) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
      onClick: this.logout
    }, "D\xE9connexion")) : null)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], {
      className: ifHomePage ? classes.navbarButtonContainer : classes.navbarButtonContainerP
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.navBarlogIn,
      onClick: this.handleOpenLogin
    }, _utils_i18n__WEBPACK_IMPORTED_MODULE_21__["NAVBAR_MENU"].logIn), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_11__["default"], {
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
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_12__["default"], {
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
    }, _utils_i18n__WEBPACK_IMPORTED_MODULE_21__["NAVBAR_MENU"].signIn), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_11__["default"], {
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
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_12__["default"], {
      dividers: false,
      className: classes.navbarMuidialogContent
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: classes.navbarPaper
    }, modalRegister())))))), ifHomePage ? this.searchBarInput(classes) : null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_30__["default"], {
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hoc_Layout_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hoc/Layout/Layout */ "./hoc/Layout/Layout.js");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _components_ScrollMenu_ScrollMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/ScrollMenu/ScrollMenu */ "./components/ScrollMenu/ScrollMenu.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _static_css_components_Layout_ProfileLayout_ProfileLayout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../static/css/components/Layout/ProfileLayout/ProfileLayout */ "./static/css/components/Layout/ProfileLayout/ProfileLayout.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "./node_modules/@material-ui/core/styles/withStyles.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/index.js");
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
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: classes.profilLayoutMainContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: classes.profilLayoutContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: classes.profilLayoutBackgroundContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: classes.profilLayoutMargin
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: classes.profilLayoutBox
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: classes.profilLayoutBannerImg
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: classes.profilLayoutAvatar
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Avatar_UserAvatar__WEBPACK_IMPORTED_MODULE_8__["default"], {
      alt: user.firstname,
      user: user,
      className: classes.cardPreviewLarge
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], {
      style: {
        display: 'flex',
        justifyContent: 'center',
        height: '40%',
        alignItems: 'center'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], {
      style: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, `Je m'appelle ${user ? user.firstname : ''}`)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7__["default"], {
      style: {
        color: 'rgba(39,37,37,35%)'
      }
    }, "et j\u2019ai h\xE2te de vous rencontrer !")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: classes.profilLayoutScrollMenu
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ScrollMenu_ScrollMenu__WEBPACK_IMPORTED_MODULE_3__["default"], {
      categories: menuItems,
      mode: 'profile',
      indexCat: index,
      extraParams: {
        user: this.props.user
      }
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: classes.profilLayoutChildren
    }, children)))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_6___default()(_static_css_components_Layout_ProfileLayout_ProfileLayout__WEBPACK_IMPORTED_MODULE_5__["default"])(ProfileLayout));

/***/ }),

/***/ "./pages/profile/about.js":
/*!********************************!*\
  !*** ./pages/profile/about.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _hoc_Layout_ProfileLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hoc/Layout/ProfileLayout */ "./hoc/Layout/ProfileLayout.js");
/* harmony import */ var _components_About_About__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/About/About */ "./components/About/About.js");
/* harmony import */ var _components_Presentation_Presentation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Presentation/Presentation */ "./components/Presentation/Presentation.js");
/* harmony import */ var _components_Skills_Skills__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Skills/Skills */ "./components/Skills/Skills.js");
/* harmony import */ var _components_Badges_Badges__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Badges/Badges */ "./components/Badges/Badges.js");
/* harmony import */ var _components_Hashtags_Hashtags__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/Hashtags/Hashtags */ "./components/Hashtags/Hashtags.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _static_css_pages_profile_about_about__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../static/css/pages/profile/about/about */ "./static/css/pages/profile/about/about.js");
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Hidden */ "./node_modules/@material-ui/core/esm/Hidden/index.js");
/* harmony import */ var _hoc_Layout_LayoutMobile__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../hoc/Layout/LayoutMobile */ "./hoc/Layout/LayoutMobile.js");
/* harmony import */ var _components_AskQuestion_AskQuestion__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/AskQuestion/AskQuestion */ "./components/AskQuestion/AskQuestion.js");
/* harmony import */ var _components_Box_Box__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/Box/Box */ "./components/Box/Box.js");
/* harmony import */ var _hoc_Layout_LayoutMobileProfile__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../hoc/Layout/LayoutMobileProfile */ "./hoc/Layout/LayoutMobileProfile.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/index.js");
/* harmony import */ var _material_ui_icons_CheckCircleOutline__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/icons/CheckCircleOutline */ "./node_modules/@material-ui/icons/CheckCircleOutline.js");
/* harmony import */ var _material_ui_icons_CheckCircleOutline__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_CheckCircleOutline__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/core/IconButton */ "./node_modules/@material-ui/core/esm/IconButton/index.js");
/* harmony import */ var _material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/icons/Create */ "./node_modules/@material-ui/icons/Create.js");
/* harmony import */ var _material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../utils/functions */ "./utils/functions.js");
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_utils_functions__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @material-ui/core/Dialog */ "./node_modules/@material-ui/core/esm/Dialog/index.js");
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @material-ui/core/DialogContent */ "./node_modules/@material-ui/core/esm/DialogContent/index.js");
/* harmony import */ var _hoc_Topic_Topic__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../hoc/Topic/Topic */ "./hoc/Topic/Topic.js");
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! algolia-places-react */ "./node_modules/algolia-places-react/dist/index.es.js");
/* harmony import */ var algolia_places_react__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(algolia_places_react__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.browser.esm.js");
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../utils/consts */ "./utils/consts.js");
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_utils_consts__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @material-ui/core/Divider */ "./node_modules/@material-ui/core/esm/Divider/index.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ "./node_modules/@material-ui/core/esm/DialogTitle/index.js");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @material-ui/icons/Close */ "./node_modules/@material-ui/icons/Close.js");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_30__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const {
  setAxiosAuthentication
} = __webpack_require__(/*! ../../utils/authentication */ "./utils/authentication.js");

































const moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

moment.locale('fr');
const DialogTitle = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__["withStyles"])(_static_css_pages_profile_about_about__WEBPACK_IMPORTED_MODULE_9__["default"])(props => {
  const {
    children,
    classes,
    onClose,
    ...other
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_29__["default"], _extends({
    disableTypography: true
  }, other, {
    className: classes.root
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16__["default"], {
    variant: "h6"
  }, children), onClose ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_18__["default"], {
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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_21__["default"], {
        open: showEdition,
        onClose: this.closeEditDialog,
        "aria-labelledby": "alert-dialog-title",
        "aria-describedby": "alert-dialog-description"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DialogTitle, {
        id: "customized-dialog-title",
        onClose: this.closeEditDialog
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_22__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hoc_Topic_Topic__WEBPACK_IMPORTED_MODULE_23__["default"], {
        titleTopic: 'Modifiez vos informations',
        titleSummary: 'Ici, vous pouvez modifier vos informations',
        underline: true
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        container: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        container: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        item: true,
        xs: 12,
        lg: 12,
        style: {
          marginTop: '2vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16__["default"], {
        style: {
          fontWeight: 'bold',
          textTransform: 'initial'
        }
      }, "Lieu d'habitation")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
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
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        container: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        item: true,
        xs: 12,
        lg: 12,
        style: {
          marginTop: '2vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16__["default"], {
        style: {
          fontWeight: 'bold',
          textTransform: 'initial'
        }
      }, "Langues parl\xE9es")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        item: true,
        xs: 12,
        style: {
          marginTop: '3vh',
          marginBottom: '3vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_25__["default"], {
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
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        style: {
          marginTop: '2vh',
          width: '100%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_27__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        style: {
          marginTop: '2vh',
          width: '100%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_28__["default"], {
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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        container: true,
        spacing: 3,
        style: {
          marginBottom: '12vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_10__["default"], {
        only: ['xs']
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        item: true,
        xl: 5,
        lg: 5,
        md: 6,
        sm: 12,
        xs: 12
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Box_Box__WEBPACK_IMPORTED_MODULE_13__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_About_About__WEBPACK_IMPORTED_MODULE_3__["default"], {
        user: user
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_10__["default"], {
        only: ['sm', 'md', 'lg', 'xl']
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        item: true,
        xs: 12,
        style: {
          marginTop: '5vh',
          position: 'relative'
        }
      }, editable ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        style: {
          position: 'absolute',
          right: 5
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_18__["default"], {
        "aria-label": "edit",
        onClick: this.openEdition
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Create__WEBPACK_IMPORTED_MODULE_19___default.a, null))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        style: {
          display: 'flex',
          flexDirection: 'row'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16__["default"], {
        style: {
          color: 'rgba(39,37,37,35%)'
        }
      }, "Habite \xE0 ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        style: {
          margin: 3
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16__["default"], {
        style: {
          color: 'black'
        }
      }, alfred ? alfred.billing_address.city + ", " + alfred.billing_address.country : null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        style: {
          display: 'flex',
          flexDirection: 'row',
          marginTop: '4vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16__["default"], {
        style: {
          color: 'rgba(39,37,37,35%)'
        }
      }, "Parle ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        style: {
          margin: 3
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16__["default"], {
        style: {
          color: 'black'
        }
      }, alfred ? alfred.languages.join(',') || 'Français' : null))), alfred ? alfred.id_confirmed ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: '4vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16__["default"], {
        style: {
          color: 'rgba(39,37,37,35%)'
        }
      }, alfred ? alfred.firstname : null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        style: {
          margin: 3
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_16__["default"], {
        style: {
          color: 'black'
        }
      }, "\xE0 un profil v\xE9rifi\xE9")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_CheckCircleOutline__WEBPACK_IMPORTED_MODULE_17___default.a, null))) : null : null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        item: true,
        xl: 7,
        lg: 7,
        md: 6,
        sm: 12,
        xs: 12
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Box_Box__WEBPACK_IMPORTED_MODULE_13__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Presentation_Presentation__WEBPACK_IMPORTED_MODULE_4__["default"], {
        user: user,
        classes: classes
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        item: true,
        xl: 8,
        lg: 8,
        md: 6,
        sm: 12,
        xs: 12
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Box_Box__WEBPACK_IMPORTED_MODULE_13__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Skills_Skills__WEBPACK_IMPORTED_MODULE_5__["default"], {
        alfred: user
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        item: true,
        xl: 4,
        lg: 4,
        md: 6,
        sm: 12,
        xs: 12
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Box_Box__WEBPACK_IMPORTED_MODULE_13__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Badges_Badges__WEBPACK_IMPORTED_MODULE_6__["default"], {
        user: user
      }))), false ? /*#__PURE__*/undefined : null, !editable ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_10__["default"], {
        only: ['sm', 'xs']
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        item: true,
        style: {
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
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

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_10__["default"], {
      only: ['xs']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hoc_Layout_ProfileLayout__WEBPACK_IMPORTED_MODULE_2__["default"], {
      user: user,
      index: index
    }, this.content(classes, user, alfred))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_10__["default"], {
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

/***/ "./utils/functions.js":
/*!****************************!*\
  !*** ./utils/functions.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getDistance = _interopRequireDefault(__webpack_require__(/*! geolib/es/getDistance */ "./node_modules/geolib/es/getDistance.js"));

var _convertDistance = _interopRequireDefault(__webpack_require__(/*! geolib/es/convertDistance */ "./node_modules/geolib/es/convertDistance.js"));

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

/***/ })

})
//# sourceMappingURL=about.js.c460e82f3f75a7db132a.hot-update.js.map