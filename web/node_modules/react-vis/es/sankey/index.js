var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import React from 'react';
import PropTypes from 'prop-types';
import { sankey, sankeyLinkHorizontal, sankeyLeft, sankeyRight, sankeyCenter, sankeyJustify } from 'd3-sankey';
import XYPlot from '../plot/xy-plot';

import { MarginPropType, getInnerDimensions } from '../utils/chart-utils';
import VerticalRectSeries from '../plot/series/vertical-rect-series';
import LabelSeries from '../plot/series/label-series';
import Voronoi from '../plot/voronoi';
import { DISCRETE_COLOR_RANGE } from '../theme';

import SankeyLink from './sankey-link';
var NOOP = function NOOP(f) {
  return f;
};

var ALIGNMENTS = {
  justify: sankeyJustify,
  center: sankeyCenter,
  left: sankeyLeft,
  right: sankeyRight
};

var DEFAULT_MARGINS = {
  top: 20,
  left: 20,
  right: 20,
  bottom: 20
};

function Sankey(props) {
  var align = props.align,
      animation = props.animation,
      children = props.children,
      className = props.className,
      hasVoronoi = props.hasVoronoi,
      height = props.height,
      hideLabels = props.hideLabels,
      labelRotation = props.labelRotation,
      layout = props.layout,
      links = props.links,
      linkOpacity = props.linkOpacity,
      margin = props.margin,
      nodePadding = props.nodePadding,
      nodes = props.nodes,
      nodeWidth = props.nodeWidth,
      onValueClick = props.onValueClick,
      onValueMouseOver = props.onValueMouseOver,
      onValueMouseOut = props.onValueMouseOut,
      onLinkClick = props.onLinkClick,
      onLinkMouseOver = props.onLinkMouseOver,
      onLinkMouseOut = props.onLinkMouseOut,
      style = props.style,
      width = props.width;

  var nodesCopy = [].concat(_toConsumableArray(new Array(nodes.length))).map(function (e, i) {
    return _extends({}, nodes[i]);
  });
  var linksCopy = [].concat(_toConsumableArray(new Array(links.length))).map(function (e, i) {
    return _extends({}, links[i]);
  });

  var _getInnerDimensions = getInnerDimensions({
    margin: margin,
    height: height,
    width: width
  }, DEFAULT_MARGINS),
      marginLeft = _getInnerDimensions.marginLeft,
      marginTop = _getInnerDimensions.marginTop,
      marginRight = _getInnerDimensions.marginRight,
      marginBottom = _getInnerDimensions.marginBottom;

  var sankeyInstance = sankey().extent([[marginLeft, marginTop], [width - marginRight, height - marginBottom - marginTop]]).nodeWidth(nodeWidth).nodePadding(nodePadding).nodes(nodesCopy).links(linksCopy).nodeAlign(ALIGNMENTS[align]).iterations(layout);
  sankeyInstance(nodesCopy);

  var nWidth = sankeyInstance.nodeWidth();
  var path = sankeyLinkHorizontal();

  return React.createElement(
    XYPlot,
    _extends({}, props, { yType: 'literal', className: 'rv-sankey ' + className }),
    linksCopy.map(function (link, i) {
      return React.createElement(SankeyLink, {
        style: style.links,
        data: path(link),
        opacity: link.opacity || linkOpacity,
        color: link.color,
        onLinkClick: onLinkClick,
        onLinkMouseOver: onLinkMouseOver,
        onLinkMouseOut: onLinkMouseOut,
        strokeWidth: Math.max(link.width, 1),
        node: link,
        nWidth: nWidth,
        key: 'link-' + i
      });
    }),
    React.createElement(VerticalRectSeries, {
      animation: animation,
      className: className + ' rv-sankey__node',
      data: nodesCopy.map(function (node) {
        return _extends({}, node, {
          y: node.y1 - marginTop,
          y0: node.y0 - marginTop,
          x: node.x1,
          x0: node.x0,
          color: node.color || DISCRETE_COLOR_RANGE[0],
          sourceLinks: null,
          targetLinks: null
        });
      }),
      style: style.rects,
      onValueClick: onValueClick,
      onValueMouseOver: onValueMouseOver,
      onValueMouseOut: onValueMouseOut,
      colorType: 'literal'
    }),
    !hideLabels && React.createElement(LabelSeries, {
      animation: animation,
      className: className,
      rotation: labelRotation,
      labelAnchorY: 'text-before-edge',
      data: nodesCopy.map(function (node, i) {
        return _extends({
          x: node.x0 + (node.x0 < width / 2 ? nWidth + 10 : -10),
          y: (node.y0 + node.y1) / 2 - marginTop,
          label: node.name,
          style: _extends({
            textAnchor: node.x0 < width / 2 ? 'start' : 'end',
            dy: '-.5em'
          }, style.labels)
        }, nodes[i]);
      })
    }),
    hasVoronoi && React.createElement(Voronoi, {
      className: 'rv-sankey__voronoi',
      extent: [[-marginLeft, -marginTop], [width + marginRight, height + marginBottom]],
      nodes: nodesCopy,
      onClick: onValueClick,
      onHover: onValueMouseOver,
      onBlur: onValueMouseOut,
      x: function x(d) {
        return d.x0 + (d.x1 - d.x0) / 2;
      },
      y: function y(d) {
        return d.y0 + (d.y1 - d.y0) / 2;
      }
    }),
    children
  );
}

Sankey.defaultProps = {
  align: 'justify',
  className: '',
  hasVoronoi: false,
  hideLabels: false,
  labelRotation: 0,
  layout: 50,
  margin: DEFAULT_MARGINS,
  nodePadding: 10,
  nodeWidth: 10,
  onValueMouseOver: NOOP,
  onValueClick: NOOP,
  onValueMouseOut: NOOP,
  onLinkClick: NOOP,
  onLinkMouseOver: NOOP,
  onLinkMouseOut: NOOP,
  style: {
    links: {},
    rects: {},
    labels: {}
  }
};

Sankey.propTypes = {
  align: PropTypes.oneOf(['justify', 'left', 'right', 'center']),
  className: PropTypes.string,
  hasVoronoi: PropTypes.bool,
  height: PropTypes.number.isRequired,
  hideLabels: PropTypes.bool,
  labelRotation: PropTypes.number,
  layout: PropTypes.number,
  links: PropTypes.arrayOf(PropTypes.shape({
    source: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
    target: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired
  })).isRequired,
  margin: MarginPropType,
  nodePadding: PropTypes.number,
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  nodeWidth: PropTypes.number,
  onValueMouseOver: PropTypes.func,
  onValueClick: PropTypes.func,
  onValueMouseOut: PropTypes.func,
  onLinkClick: PropTypes.func,
  onLinkMouseOver: PropTypes.func,
  onLinkMouseOut: PropTypes.func,
  style: PropTypes.shape({
    links: PropTypes.object,
    rects: PropTypes.object,
    labels: PropTypes.object
  }),
  width: PropTypes.number.isRequired
};
export default Sankey;