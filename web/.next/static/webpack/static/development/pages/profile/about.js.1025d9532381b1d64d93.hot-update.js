webpackHotUpdate("static\\development\\pages\\profile\\about.js",{

/***/ "./components/ListAlfredConditions/ListAlfredConditions.js":
/*!*****************************************************************!*\
  !*** ./components/ListAlfredConditions/ListAlfredConditions.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/esm/Grid/index.js");
/* harmony import */ var _InfoWithPics_InfoWithPics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../InfoWithPics/InfoWithPics */ "./components/InfoWithPics/InfoWithPics.js");
/* harmony import */ var _static_css_components_ListAlfredConditions_ListAlfredConditions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../static/css/components/ListAlfredConditions/ListAlfredConditions */ "./static/css/components/ListAlfredConditions/ListAlfredConditions.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles/withStyles */ "./node_modules/@material-ui/core/styles/withStyles.js");
/* harmony import */ var _material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__);
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
      wrapperComponentProps,
      classes
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      container: true,
      className: classes.mainContainerListAlfred
    }, wrapperComponentProps ? Object.keys(wrapperComponentProps).map((res, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
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

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_styles_withStyles__WEBPACK_IMPORTED_MODULE_4___default()(_static_css_components_ListAlfredConditions_ListAlfredConditions__WEBPACK_IMPORTED_MODULE_3__["default"])(ListAlfredConditions));

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
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-cookies */ "./node_modules/react-cookies/build/cookie.js");
/* harmony import */ var react_cookies__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_cookies__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _hoc_Topic_Topic__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../hoc/Topic/Topic */ "./hoc/Topic/Topic.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const {
  SKILLS
} = __webpack_require__(/*! ../../utils/consts */ "./utils/consts.js");



class Skills extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentDidMount", () => {
      axios__WEBPACK_IMPORTED_MODULE_2___default.a.defaults.headers.common['Authorization'] = react_cookies__WEBPACK_IMPORTED_MODULE_5___default.a.load('token');

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

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_hoc_Topic_Topic__WEBPACK_IMPORTED_MODULE_6__["default"], {
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
    backgroundPosition: 'center',
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

/***/ "./static/css/components/ListAlfredConditions/ListAlfredConditions.js":
/*!****************************************************************************!*\
  !*** ./static/css/components/ListAlfredConditions/ListAlfredConditions.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (theme => ({
  mainContainerListAlfred: {
    padding: '1%',
    display: 'flex'
  }
}));

/***/ })

})
//# sourceMappingURL=about.js.1025d9532381b1d64d93.hot-update.js.map