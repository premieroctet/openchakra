var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
import PropTypes from 'prop-types';
import { rgb } from 'd3-color';
import * as d3Shape from 'd3-shape';
import React from 'react';

import { DEFAULT_OPACITY } from '../../theme';
import { getAttributeFunctor, getAttributeValue } from '../../utils/scales-utils';
import AbstractSeries from './abstract-series';

var LineSeriesCanvas = function (_AbstractSeries) {
  _inherits(LineSeriesCanvas, _AbstractSeries);

  function LineSeriesCanvas() {
    _classCallCheck(this, LineSeriesCanvas);

    return _possibleConstructorReturn(this, (LineSeriesCanvas.__proto__ || Object.getPrototypeOf(LineSeriesCanvas)).apply(this, arguments));
  }

  _createClass(LineSeriesCanvas, [{
    key: 'render',
    value: function render() {
      return React.createElement('div', null);
    }
  }], [{
    key: 'renderLayer',
    value: function renderLayer(props, ctx) {
      var curve = props.curve,
          data = props.data,
          marginLeft = props.marginLeft,
          marginTop = props.marginTop,
          strokeWidth = props.strokeWidth,
          strokeDasharray = props.strokeDasharray;

      if (!data || data.length === 0) {
        return;
      }

      var x = getAttributeFunctor(props, 'x');
      var y = getAttributeFunctor(props, 'y');
      var stroke = getAttributeValue(props, 'stroke') || getAttributeValue(props, 'color');
      var strokeColor = rgb(stroke);
      var newOpacity = getAttributeValue(props, 'opacity');
      var opacity = Number.isFinite(newOpacity) ? newOpacity : DEFAULT_OPACITY;
      var line = d3Shape.line().x(function (row) {
        return x(row) + marginLeft;
      }).y(function (row) {
        return y(row) + marginTop;
      });
      if (typeof curve === 'string' && d3Shape[curve]) {
        line = line.curve(d3Shape[curve]);
      } else if (typeof curve === 'function') {
        line = line.curve(curve);
      }

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(' + strokeColor.r + ', ' + strokeColor.g + ', ' + strokeColor.b + ', ' + opacity + ')';
      ctx.lineWidth = strokeWidth;

      if (strokeDasharray) {
        ctx.setLineDash(strokeDasharray);
      }

      line.context(ctx)(data);
      ctx.stroke();
      ctx.closePath();
      // set back to default
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
    }
  }, {
    key: 'requiresSVG',
    get: function get() {
      return false;
    }
  }, {
    key: 'isCanvas',
    get: function get() {
      return true;
    }
  }]);

  return LineSeriesCanvas;
}(AbstractSeries);

LineSeriesCanvas.displayName = 'LineSeriesCanvas';
LineSeriesCanvas.defaultProps = _extends({}, AbstractSeries.defaultProps, {
  strokeWidth: 2
});

LineSeriesCanvas.propTypes = _extends({}, AbstractSeries.propTypes, {
  strokeWidth: PropTypes.number
});

export default LineSeriesCanvas;