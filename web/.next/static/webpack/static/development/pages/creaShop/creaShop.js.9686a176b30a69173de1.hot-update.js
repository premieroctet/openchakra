webpackHotUpdate("static\\development\\pages\\creaShop\\creaShop.js",{

/***/ "./components/CreaShop/SelectPrestation/SelectPrestation.js":
/*!******************************************************************!*\
  !*** ./components/CreaShop/SelectPrestation/SelectPrestation.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ButtonSwitch/ButtonSwitch */ "./components/ButtonSwitch/ButtonSwitch.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _componentStyle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../componentStyle */ "./components/CreaShop/componentStyle.js");
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../utils/consts */ "./utils/consts.js");
/* harmony import */ var _utils_consts__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_utils_consts__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Fab */ "./node_modules/@material-ui/core/esm/Fab/index.js");
/* harmony import */ var _material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/icons/Add */ "./node_modules/@material-ui/icons/Add.js");
/* harmony import */ var _material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.mainContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.contentContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.maxWidth
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.contentLeftTop
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.contentTitle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Typography"], {
      className: classes.policySizeTitle
    }, this.state.service_name, " : indiquez vos prestations"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.containerPrestas
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.bottomSpacer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__["Typography"], {
      className: classes.policySizeContent
    }, "Quelles prestations souhaitez-vous r\xE9aliser ? Indiquez vos tarifs et votre unit\xE9 de facturation. ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.buttonAddPrestas
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      item: true,
      className: classes.maxWidth,
      style: {
        marginBottom: 100
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_9__["default"], {
      variant: "extended",
      color: "primary",
      "aria-label": "add",
      onClick: () => this.addCustomPrestation(),
      className: classes.margin
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_10___default.a, {
      className: classes.extendedIcon
    }), "Ajouter une prestation personnalis\xE9e")), Object.keys(this.state.grouped).map((fltr, i) => {
      let prestas = this.state.grouped[fltr];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        key: i,
        className: classes.maxWidth
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        className: classes.marginThirty
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        item: true
      }, fltr === 'Aucun' ? '' : fltr === 'Prestations personnalisées' && this.state.grouped['Prestations personnalisées'].length === 0 ? '' : fltr)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        container: true,
        spacing: 2
      }, prestas.map((p, j) => {
        let isEditable = p._id.length == _utils_consts__WEBPACK_IMPORTED_MODULE_8__["GID_LEN"];
        let presta = this.state.prestations[p._id];
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _componentStyle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../componentStyle */ "./components/CreaShop/componentStyle.js");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/TextField */ "./node_modules/@material-ui/core/esm/TextField/index.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_lab_Autocomplete__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/lab/Autocomplete */ "./node_modules/@material-ui/lab/esm/Autocomplete/index.js");
/* harmony import */ var react_dropdown_select__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-dropdown-select */ "./node_modules/react-dropdown-select/lib/index.js");
/* harmony import */ var react_dropdown_select__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_dropdown_select__WEBPACK_IMPORTED_MODULE_9__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  setAxiosAuthentication
} = __webpack_require__(/*! ../../../utils/authentication */ "./utils/authentication.js");

const AUTOCOMPLETE = false;











const {
  inspect
} = __webpack_require__(/*! util */ "./node_modules/util/util.js");

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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.mainContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.contentContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.contentLeftTop
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.contentTitle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__["default"], {
      className: classes.policySizeTitle
    }, creationBoutique ? 'Créez votre boutique de services' : this.isCreation() ? 'Ajouter un service' : 'Modifier un service')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.policySizeSubtitle
    }, this.isCreation() ? 'Quel service souhaitez-vous réaliser ?' : `Vous allez modifier votre service "${service ? service.label : ''}"`, " ")), creationBoutique ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.bottomSpacer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__["default"], {
      className: classes.policySizeContent
    }, "Identifiez maintenant le premier service que vous souhaitez configurer dans votre boutique de services. Vous pourrez en ajouter autant que vous voulez dans votre boutique. Un service n\u2019apparait pas ? Cliquez ici pour l\u2019ajouter.")) : null), this.isCreation() ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, AUTOCOMPLETE ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_lab_Autocomplete__WEBPACK_IMPORTED_MODULE_8__["default"], {
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
      renderInput: params => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__["default"], _extends({}, params, {
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _componentStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../componentStyle */ "./components/CreaShop/componentStyle.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Checkbox */ "./node_modules/@material-ui/core/esm/Checkbox/index.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/index.js");
/* harmony import */ var _ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../ButtonSwitch/ButtonSwitch */ "./components/ButtonSwitch/ButtonSwitch.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.mainContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.contentContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.contentLeftTop
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.contentTitle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__["default"], {
      className: classes.policySizeTitle
    }, service ? service.label : '', " : param\xE9trage")), service && service.equipments.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.policySizeSubtitle
    }, "Quel(s) produit(s) / mat\xE9riel(s) fournissez-vous dans le cadre de ce service ? ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.bottomSpacer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      container: true,
      spacing: 1
    }, service.equipments.map((result, index) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
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
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_5__["default"], {
        style: {
          display: 'none'
        },
        color: "primary",
        type: "checkbox",
        name: result._id,
        checked: this.state.selectedEquipments.includes(result._id),
        onChange: this.onEquipmentChecked
      })));
    })))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.policySizeSubtitle
    }, "O\xF9 acceptez-vous de r\xE9aliser votre prestation ?")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        marginLeft: 15
      }
    }, 'client' in this.state.location ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_7__["default"], {
      checked: location.client === true,
      label: 'A l\'adresse de mon client',
      id: "client",
      onChange: this.onLocationChange
    })) : null, 'alfred' in location ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_7__["default"], {
      checked: location.alfred === true,
      label: 'A mon adresse',
      id: "alfred",
      onChange: this.onLocationChange
    })) : null, 'visio' in location ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_7__["default"], {
      checked: location.visio === true,
      label: 'En visioconférence',
      id: "visio",
      onChange: this.onLocationChange
    })) : null, 'ext' in location ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_7__["default"], {
      checked: location.ext === true,
      label: 'En extérieur',
      id: "ext",
      onChange: this.onLocationChange
    })) : null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      style: {
        marginLeft: 15
      },
      className: classes.options
    }, service && (service.travel_tax || service.pick_tax) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: classes.policySizeSubtitle
    }, "Options")) : null, service && service.travel_tax ?
    /*#__PURE__*/
    // FIX : voir pourquoi le ButtonSwitch ne se checke pas
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_7__["default"], {
      ckecked: travel_tax != null,
      price: travel_tax,
      id: "travel_tax",
      label: 'Appliquer un forfait déplacement de',
      isPrice: true,
      onChange: this.onOptionChanged
    })) : null, service && service.pick_tax ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonSwitch_ButtonSwitch__WEBPACK_IMPORTED_MODULE_7__["default"], {
      checked: pick_tax != null,
      price: pick_tax,
      id: "pick_tax",
      label: 'Proposer un forfait retrait & livraison de',
      isPrice: true,
      onChange: this.onOptionChanged
    })) : null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.contentRight
    })));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__["withStyles"])(_componentStyle__WEBPACK_IMPORTED_MODULE_2__["default"])(SettingService));

/***/ }),

/***/ "./components/Drawer/DrawerEditingSchedule/DrawerEditingSchedule.js":
/*!**************************************************************************!*\
  !*** ./components/Drawer/DrawerEditingSchedule/DrawerEditingSchedule.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Hidden */ "./node_modules/@material-ui/core/esm/Hidden/index.js");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/IconButton */ "./node_modules/@material-ui/core/esm/IconButton/index.js");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/Close */ "./node_modules/@material-ui/icons/Close.js");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Divider */ "./node_modules/@material-ui/core/esm/Divider/index.js");
/* harmony import */ var _SelectSlotTimer_SelectSlotTimer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../SelectSlotTimer/SelectSlotTimer */ "./components/SelectSlotTimer/SelectSlotTimer.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _DrawerEditingScheduleStyle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DrawerEditingScheduleStyle */ "./components/Drawer/DrawerEditingSchedule/DrawerEditingScheduleStyle.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "./node_modules/@material-ui/core/styles/withStyles.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/FormControl */ "./node_modules/@material-ui/core/esm/FormControl/index.js");
/* harmony import */ var _material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/RadioGroup */ "./node_modules/@material-ui/core/esm/RadioGroup/index.js");
/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/FormControlLabel */ "./node_modules/@material-ui/core/esm/FormControlLabel/index.js");
/* harmony import */ var _material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/Radio */ "./node_modules/@material-ui/core/esm/Radio/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/index.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__["default"], {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15__["default"], {
      className: classes.policySizeTitle
    }, "Modifier vos disponibilit\xE9s")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_2__["default"], {
      "aria-label": "CLOSE"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_3___default.a, {
      color: 'secondary',
      onClick: this.props.handleDrawer
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__["default"], {
      style: {
        marginTop: '5vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__["default"], {
      style: {
        width: '100%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("h3", null, "\xCAtes-vous disponible ?"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("em", {
      style: {
        color: 'red'
      }
    }, errors.available)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__["default"], {
      container: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_10__["default"], {
      component: "fieldset"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11__["default"], {
      "aria-label": "availabilities",
      name: "availabilities",
      value: availabilities,
      onChange: this.handleAvailabilities
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_12__["default"], {
      onChange: this.toggleAvailability,
      checked: !this.state.available,
      value: "notavailabilities",
      control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_13__["default"], {
        color: "primary"
      }),
      label: "Indisponible pour la journ\xE9e"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_12__["default"], {
      onChange: this.toggleAvailability,
      checked: this.state.available,
      value: "availabilities",
      control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_13__["default"], {
        color: "primary"
      }),
      label: "Disponible sur ces horaires : "
    }))))), available ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("h3", null, "Vos horaires travaill\xE9s"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("em", {
      style: {
        color: 'red'
      }
    }, errors.timelapses)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__["default"], {
      container: true
    }, 'Nuit Matin Après-midi Soirée'.split(' ').map((title, index) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__["default"], {
        item: true,
        className: classes.containerSelectSlotTimer
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("h4", null, title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_SelectSlotTimer_SelectSlotTimer__WEBPACK_IMPORTED_MODULE_5__["default"], {
        arrayLength: 6,
        index: index * 6,
        slots: timelapses,
        bookings: bookings,
        onChange: this.slotTimerChanged
      })));
    }))) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__["default"], {
      style: {
        marginTop: 30,
        marginBottom: 110
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_0__["default"], {
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

/***/ "./components/DrawerSchedule/DrawerSchedule.js":
/*!*****************************************************!*\
  !*** ./components/DrawerSchedule/DrawerSchedule.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Hidden */ "./node_modules/@material-ui/core/esm/Hidden/index.js");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "./node_modules/@material-ui/core/styles/withStyles.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _static_css_components_DrawerSchedule_DrawerSchedule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../static/css/components/DrawerSchedule/DrawerSchedule */ "./static/css/components/DrawerSchedule/DrawerSchedule.js");
/* harmony import */ var _material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Fab */ "./node_modules/@material-ui/core/esm/Fab/index.js");
/* harmony import */ var _material_ui_icons_Settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/icons/Settings */ "./node_modules/@material-ui/icons/Settings.js");
/* harmony import */ var _material_ui_icons_Settings__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Settings__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Drawer_DrawerEditingSchedule_DrawerEditingSchedule__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Drawer/DrawerEditingSchedule/DrawerEditingSchedule */ "./components/Drawer/DrawerEditingSchedule/DrawerEditingSchedule.js");
/* harmony import */ var _Drawer_DrawerSettingSchedule_DrawerSettingSchedule__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Drawer/DrawerSettingSchedule/DrawerSettingSchedule */ "./components/Drawer/DrawerSettingSchedule/DrawerSettingSchedule.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/SwipeableDrawer */ "./node_modules/@material-ui/core/esm/SwipeableDrawer/index.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var _material_ui_icons_AddCircleOutline__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/AddCircleOutline */ "./node_modules/@material-ui/icons/AddCircleOutline.js");
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], {
      style: {
        width: '100%',
        height: '100%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_SwipeableDrawer__WEBPACK_IMPORTED_MODULE_10__["default"], {
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
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], {
      style: {
        display: 'flex',
        flexDirection: 'row-reverse'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_1__["default"], {
      only: ['xs']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], {
      style: {
        marginTop: '5vh'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11__["default"], {
      startIcon: this.state.eventsSelected.size > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Settings__WEBPACK_IMPORTED_MODULE_6___default.a, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_AddCircleOutline__WEBPACK_IMPORTED_MODULE_12___default.a, null),
      onClick: this.handleDrawerToggle,
      color: 'primary'
    }, this.state.eventsSelected.size > 0 ? 'Modifier vos disponibilités' : 'Paramétrez vos disponibilités'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_1__["default"], {
      only: ['lg', 'xl', 'md', 'sm']
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__["default"], {
      style: {
        position: 'fixed',
        bottom: '15vh',
        zIndex: 6,
        right: 0
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Fab__WEBPACK_IMPORTED_MODULE_5__["default"], {
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

/***/ "./pages/creaShop/creaShop.js":
/*!************************************!*\
  !*** ./pages/creaShop/creaShop.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _creaShopStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./creaShopStyle */ "./pages/creaShop/creaShopStyle.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
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
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _utils_consts_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../utils/consts.js */ "./utils/consts.js");
/* harmony import */ var _utils_consts_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_utils_consts_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/esm/react-toastify.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.mainHeader
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
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
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.contentStepper
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Stepper_Stepper__WEBPACK_IMPORTED_MODULE_6__["default"], {
      activeStep: this.state.activeStep,
      isType: 'creaShop'
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.marginContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.mainContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: hideRightPanel ? classes.mainContainerNoImg : classes.leftContentComponent
    }, this.renderSwitch(this.state.activeStep)), hideRightPanel ? null : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.rightContentComponent
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.contentRight,
      style: {
        backgroundImage: `url(../../static/assets/icon/creaShopBg.svg)`,
        height: '90vh'
      }
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.footerMainContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.footerContainer
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.marginHr
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
      style: {
        color: 'rgb(255, 249, 249, 0.6)',
        borderRadius: 10
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: classes.navButtonContent
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, false ?
    /*#__PURE__*/
    // FIX : corriger pb retour sur panel précédent
    undefined : null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_16__["default"], {
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
//# sourceMappingURL=creaShop.js.9686a176b30a69173de1.hot-update.js.map