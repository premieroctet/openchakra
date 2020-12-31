webpackHotUpdate("static\\development\\pages\\profile\\about.js",{

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
    }, Object.keys(SKILLS).map((skill, index) => {
      const name = SKILLS[skill].entrieName;
      const count = skills ? skills[name] : skill_values[skill];
      const pic = `/static/assets/img/skillsAlfred/${SKILLS[skill].picture}${count ? '' : '_disabled'}.svg`;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_1__["default"], {
        key: index,
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

/***/ })

})
//# sourceMappingURL=about.js.ddd8da29cdc00b54ed67.hot-update.js.map