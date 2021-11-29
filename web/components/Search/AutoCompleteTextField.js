import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import getCaretCoordinates from 'textarea-caret';
import getInputSelection, { setCaretPosition } from 'get-input-selection';
import './AutoCompleteTextField.css';

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_RETURN = 13;
const KEY_ENTER = 14;
const KEY_ESCAPE = 27;
const KEY_TAB = 9;

const OPTION_LIST_Y_OFFSET = 10;
const OPTION_LIST_MIN_WIDTH = 100;

const propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType,
  ]),
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  maxOptions: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onRequestOptions: PropTypes.func,
  onSelect: PropTypes.func,
  changeOnSelect: PropTypes.func,
  options: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  regex: PropTypes.string,
  matchAny: PropTypes.bool,
  minChars: PropTypes.number,
  requestOnlyIfNoOptions: PropTypes.bool,
  spaceRemovers: PropTypes.arrayOf(PropTypes.string),
  spacer: PropTypes.string,
  trigger: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  value: PropTypes.string,
  offsetX: PropTypes.number,
  offsetY: PropTypes.number,
  passThroughEnter: PropTypes.bool,
};

const defaultProps = {
  Component: 'textarea',
  defaultValue: '',
  disabled: false,
  maxOptions: 6,
  onBlur: () => {},
  onChange: () => {},
  onKeyDown: () => {},
  onRequestOptions: () => {},
  onSelect: () => {},
  changeOnSelect: (trigger, slug) => trigger + slug,
  options: [],
  regex: '^[A-Za-z0-9\\-_]+$',
  matchAny: false,
  minChars: 0,
  requestOnlyIfNoOptions: true,
  spaceRemovers: [',', '.', '!', '?'],
  spacer: ' ',
  trigger: '@',
  offsetX: 0,
  offsetY: 0,
  value: null,
  passThroughEnter: false,
};

class AutocompleteTextField extends React.Component {
  constructor(props) {
    super(props);

    this.isTrigger = this.isTrigger.bind(this);
    this.arrayTriggerMatch = this.arrayTriggerMatch.bind(this);
    this.getMatch = this.getMatch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.updateCaretPosition = this.updateCaretPosition.bind(this);
    this.updateHelper = this.updateHelper.bind(this);
    this.resetHelper = this.resetHelper.bind(this);
    this.renderAutocompleteList = this.renderAutocompleteList.bind(this);

    this.state = {
      helperVisible: false,
      left: 0,
      trigger: null,
      matchLength: 0,
      matchStart: 0,
      options: [],
      selection: 0,
      top: 0,
      value: null,
    };

    this.recentValue = props.defaultValue;
    this.enableSpaceRemovers = false;
    this.refInput = createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate(prevProps) {
    const { options } = this.props;
    const { caret } = this.state;

    if (options.length !== prevProps.options.length) {
      this.updateHelper(this.recentValue, caret, options);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  getMatch(str, caret, providedOptions) {
    const { trigger, matchAny, regex } = this.props;
    const re = new RegExp(regex);

    let triggers = trigger;
    if (!Array.isArray(triggers)) {
      triggers = new Array(trigger);
    }
    triggers.sort();

    const providedOptionsObject = providedOptions;
    if (Array.isArray(providedOptions)) {
      triggers.forEach((triggerStr) => {
        providedOptionsObject[triggerStr] = providedOptions;
      });
    }

    const triggersMatch = this.arrayTriggerMatch(triggers, re);
    let slugData = null;

    for (let triggersIndex = 0; triggersIndex < triggersMatch.length; triggersIndex++) {
      const { triggerStr, triggerMatch, triggerLength } = triggersMatch[triggersIndex];

      for (let i = caret - 1; i >= 0; --i) {
        const substr = str.substring(i, caret);
        const match = substr.match(re);
        let matchStart = -1;

        if (triggerLength > 0) {
          const triggerIdx = triggerMatch ? i : i - triggerLength + 1;

          if (triggerIdx < 0) { // out of input
            break;
          }

          if (this.isTrigger(triggerStr, str, triggerIdx)) {
            matchStart = triggerIdx + triggerLength;
          }

          if (!match && matchStart < 0) {
            break;
          }
        } else {
          if (match && i > 0) { // find first non-matching character or begin of input
            continue;
          }
          matchStart = i === 0 && match ? 0 : i + 1;

          if (caret - matchStart === 0) { // matched slug is empty
            break;
          }
        }

        if (matchStart >= 0) {
          const triggerOptions = providedOptionsObject[triggerStr];
          if (triggerOptions == null) {
            continue;
          }

          const matchedSlug = str.substring(matchStart, caret);

          const options = triggerOptions.filter((slug) => {
            const idx = slug.toLowerCase().indexOf(matchedSlug.toLowerCase());
            return idx !== -1 && (matchAny || idx === 0);
          });

          const currTrigger = triggerStr;
          const matchLength = matchedSlug.length;

          if (slugData === null) {
            slugData = {
              trigger: currTrigger, matchStart, matchLength, options,
            };
          }
          else {
            slugData = {
              ...slugData, trigger: currTrigger, matchStart, matchLength, options,
            };
          }
        }
      }
    }

    return slugData;
  }

  arrayTriggerMatch(triggers, re) {
    const triggersMatch = triggers.map((trigger) => ({
      triggerStr: trigger,
      triggerMatch: trigger.match(re),
      triggerLength: trigger.length,
    }));

    return triggersMatch;
  }

  isTrigger(trigger, str, i) {
    if (!trigger || !trigger.length) {
      return true;
    }

    if (str.substr(i, trigger.length) === trigger) {
      return true;
    }

    return false;
  }

  handleChange(e) {
    const {
      onChange,
      options,
      spaceRemovers,
      spacer,
      value,
    } = this.props;

    const old = this.recentValue;
    const str = e.target.value;
    const caret = getInputSelection(e.target).end;

    if (!str.length) {
      this.setState({ helperVisible: false });
    }

    this.recentValue = str;

    this.setState({ caret, value: e.target.value });

    if (!str.length || !caret) {
      return onChange(e.target.value);
    }

    // '@wonderjenny ,|' -> '@wonderjenny, |'
    if (this.enableSpaceRemovers && spaceRemovers.length && str.length > 2 && spacer.length) {
      for (let i = 0; i < Math.max(old.length, str.length); ++i) {
        if (old[i] !== str[i]) {
          if (
            i >= 2
            && str[i - 1] === spacer
            && spaceRemovers.indexOf(str[i - 2]) === -1
            && spaceRemovers.indexOf(str[i]) !== -1
            && this.getMatch(str.substring(0, i - 2), caret - 3, options)
          ) {
            const newValue = (`${str.slice(0, i - 1)}${str.slice(i, i + 1)}${str.slice(i - 1, i)}${str.slice(i + 1)}`);

            this.updateCaretPosition(i + 1);
            this.refInput.current.value = newValue;

            if (!value) {
              this.setState({ value: newValue });
            }

            return onChange(newValue);
          }

          break;
        }
      }

      this.enableSpaceRemovers = false;
    }

    this.updateHelper(str, caret, options);

    if (!value) {
      this.setState({ value: e.target.value });
    }

    return onChange(e.target.value);
  }

  handleKeyDown(event) {
    const { helperVisible, options, selection } = this.state;
    const { onKeyDown, passThroughEnter } = this.props;

    if (helperVisible) {
      switch (event.keyCode) {
        case KEY_ESCAPE:
          event.preventDefault();
          this.resetHelper();
          break;
        case KEY_UP:
          event.preventDefault();
          this.setState({ selection: ((options.length + selection) - 1) % options.length });
          break;
        case KEY_DOWN:
          event.preventDefault();
          this.setState({ selection: (selection + 1) % options.length });
          break;
        case KEY_ENTER:
        case KEY_RETURN:
          if (!passThroughEnter) { event.preventDefault(); }
          this.handleSelection(selection);
          break;
        case KEY_TAB:
          this.handleSelection(selection);
          break;
        default:
          onKeyDown(event);
          break;
      }
    } else {
      onKeyDown(event);
    }
  }

  handleResize() {
    this.setState({ helperVisible: false });
  }

  handleSelection(idx) {
    const { spacer, onSelect, changeOnSelect } = this.props;
    const {
      matchStart, matchLength, options, trigger,
    } = this.state;

    const slug = options[idx];
    const value = this.recentValue;
    const part1 = value.substring(0, matchStart - trigger.length);
    const part2 = value.substring(matchStart + matchLength);

    const event = { target: this.refInput.current };
    const changedStr = changeOnSelect(trigger, slug);

    event.target.value = `${part1}${changedStr}${spacer}${part2}`;
    this.handleChange(event);
    onSelect(event.target.value);

    this.resetHelper();

    this.updateCaretPosition(part1.length + changedStr.length + 1);

    this.enableSpaceRemovers = true;
  }

  updateCaretPosition(caret) {
    this.setState({ caret }, () => setCaretPosition(this.refInput.current, caret));
  }

  updateHelper(str, caret, options) {
    const input = this.refInput.current;

    const slug = this.getMatch(str, caret, options);

    if (slug) {
      const caretPos = getCaretCoordinates(input, caret);
      const rect = input.getBoundingClientRect();

      const top = caretPos.top + input.offsetTop;
      const left = Math.min(
        caretPos.left + input.offsetLeft - OPTION_LIST_Y_OFFSET,
        input.offsetLeft + rect.width - OPTION_LIST_MIN_WIDTH,
      );

      const { minChars, onRequestOptions, requestOnlyIfNoOptions } = this.props;
      if (
        slug.matchLength >= minChars
        && (
          slug.options.length > 1
          || (
            slug.options.length === 1
            && slug.options[0].length !== slug.matchLength
          )
        )
      ) {
        this.setState({
          helperVisible: true,
          top,
          left,
          ...slug,
        });
      } else {
        if (!requestOnlyIfNoOptions || !slug.options.length) {
          onRequestOptions(str.substr(slug.matchStart, slug.matchLength));
        }

        this.resetHelper();
      }
    } else {
      this.resetHelper();
    }
  }

  resetHelper() {
    this.setState({ helperVisible: false, selection: 0 });
  }

  renderAutocompleteList() {
    const {
      helperVisible,
      left,
      matchStart,
      matchLength,
      options,
      selection,
      top,
      value,
    } = this.state;

    if (!helperVisible) {
      return null;
    }

    const { maxOptions, offsetX, offsetY } = this.props;

    if (options.length === 0) {
      return null;
    }

    if (selection >= options.length) {
      this.setState({ selection: 0 });

      return null;
    }

    const optionNumber = maxOptions === 0 ? options.length : maxOptions;

    const helperOptions = options.slice(0, optionNumber).map((val, idx) => {
      const highlightStart = val.toLowerCase().indexOf(value.substr(matchStart, matchLength).toLowerCase());

      return (
        <li
          className={idx === selection ? 'active' : null}
          key={val}
          onClick={() => { this.handleSelection(idx); }}
          onMouseEnter={() => { this.setState({ selection: idx }); }}
        >
          {val.slice(0, highlightStart)}
          <strong>{val.substr(highlightStart, matchLength)}</strong>
          {val.slice(highlightStart + matchLength)}
        </li>
      );
    });

    return (
      <ul className="react-autocomplete-input" style={{ left: left + offsetX, top: top + offsetY }}>
        {helperOptions}
      </ul>
    );
  }

  render() {
    const {
      Component,
      defaultValue,
      disabled,
      onBlur,
      value,
      ...rest
    } = this.props;

    const { value: stateValue } = this.state;

    const propagated = Object.assign({}, rest);
    Object.keys(propTypes).forEach((k) => { delete propagated[k]; });

    let val = '';

    if (typeof value !== 'undefined' && value !== null) {
      val = value;
    } else if (stateValue) {
      val = stateValue;
    } else if (defaultValue) {
      val = defaultValue;
    }

    return (
      <span>
        <Component
          disabled={disabled}
          onBlur={onBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          ref={this.refInput}
          value={val}
          {...propagated}
        />
        {this.renderAutocompleteList()}
      </span>
    );
  }
}

AutocompleteTextField.propTypes = propTypes;
AutocompleteTextField.defaultProps = defaultProps;

export default AutocompleteTextField;
