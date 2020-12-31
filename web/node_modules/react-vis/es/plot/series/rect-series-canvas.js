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

import { DEFAULT_OPACITY } from '../../theme';
import { getAttributeFunctor, getAttr0Functor } from '../../utils/scales-utils';
import AbstractSeries from './abstract-series';

var RectSeriesCanvas = function (_AbstractSeries) {
  _inherits(RectSeriesCanvas, _AbstractSeries);

  function RectSeriesCanvas() {
    _classCallCheck(this, RectSeriesCanvas);

    return _possibleConstructorReturn(this, (RectSeriesCanvas.__proto__ || Object.getPrototypeOf(RectSeriesCanvas)).apply(this, arguments));
  }

  _createClass(RectSeriesCanvas, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }], [{
    key: 'renderLayer',
    value: function renderLayer(props, ctx) {
      var data = props.data,
          linePosAttr = props.linePosAttr,
          lineSizeAttr = props.lineSizeAttr,
          marginLeft = props.marginLeft,
          marginTop = props.marginTop,
          valuePosAttr = props.valuePosAttr;

      if (!data || data.length === 0) {
        return;
      }

      var line = getAttributeFunctor(props, linePosAttr);
      var line0 = getAttr0Functor(props, linePosAttr);
      var value = getAttributeFunctor(props, valuePosAttr);
      var value0 = getAttr0Functor(props, valuePosAttr);
      var fill = getAttributeFunctor(props, 'fill') || getAttributeFunctor(props, 'color');
      var stroke = getAttributeFunctor(props, 'stroke') || getAttributeFunctor(props, 'color');
      var opacity = getAttributeFunctor(props, 'opacity');

      data.forEach(function (row) {
        var fillColor = rgb(fill(row));
        var strokeColor = rgb(stroke(row));
        var rowOpacity = opacity(row) || DEFAULT_OPACITY;

        var linePos = line0(row);
        var valuePos = Math.min(value0(row), value(row));
        var x = valuePosAttr === 'x' ? valuePos : linePos;
        var y = valuePosAttr === 'y' ? valuePos : linePos;

        var lineSize = Math.abs(line(row) - line0(row));
        var valueSize = Math.abs(-value0(row) + value(row));
        var height = lineSizeAttr === 'height' ? lineSize : valueSize;
        var width = lineSizeAttr === 'width' ? lineSize : valueSize;

        ctx.beginPath();
        ctx.rect(x + marginLeft, y + marginTop, width, height);
        ctx.fillStyle = 'rgba(' + fillColor.r + ', ' + fillColor.g + ', ' + fillColor.b + ', ' + rowOpacity + ')';
        ctx.fill();
        ctx.strokeStyle = 'rgba(' + strokeColor.r + ', ' + strokeColor.g + ', ' + strokeColor.b + ', ' + rowOpacity + ')';
        ctx.stroke();
      });
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

  return RectSeriesCanvas;
}(AbstractSeries);

RectSeriesCanvas.displayName = 'RectSeriesCanvas';
RectSeriesCanvas.defaultProps = _extends({}, AbstractSeries.defaultProps, {
  linePosAttr: PropTypes.string.isRequired,
  valuePosAttr: PropTypes.string.isRequired,
  lineSizeAttr: PropTypes.string.isRequired,
  valueSizeAttr: PropTypes.string.isRequired
});

RectSeriesCanvas.propTypes = _extends({}, AbstractSeries.propTypes);

export default RectSeriesCanvas;