/* eslint-disable react/forbid-foreign-prop-types */
// This higher-order component consumes a string from React context that is
// provided by the DirectionProvider component.
// We can use this to conditionally switch layout/direction for right-to-left layouts.

import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import deepmerge from 'deepmerge';
import getComponentName from 'airbnb-prop-types/build/helpers/getComponentName';
import { CHANNEL, DIRECTIONS } from './constants';
import brcastShape from './proptypes/brcast';
import directionPropType from './proptypes/direction';

const contextTypes = {
  [CHANNEL]: brcastShape,
};

export { DIRECTIONS };

// set a default direction so that a component wrapped with this HOC can be
// used even without a DirectionProvider ancestor in its react tree.
const defaultDirection = DIRECTIONS.LTR;

// export for convenience, in order for components to spread these onto their propTypes
export const withDirectionPropTypes = {
  direction: directionPropType.isRequired,
};

export default function withDirection(WrappedComponent) {
  class WithDirection extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        direction: context[CHANNEL] ? context[CHANNEL].getState() : defaultDirection,
      };
    }

    componentDidMount() {
      if (this.context[CHANNEL]) {
        // subscribe to future direction changes
        this.channelUnsubscribe = this.context[CHANNEL].subscribe((direction) => {
          this.setState({ direction });
        });
      }
    }

    componentWillUnmount() {
      if (this.channelUnsubscribe) {
        this.channelUnsubscribe();
      }
    }

    render() {
      const { direction } = this.state;

      return (
        <WrappedComponent
          {...this.props}
          direction={direction}
        />
      );
    }
  }

  const wrappedComponentName = getComponentName(WrappedComponent) || 'Component';

  WithDirection.WrappedComponent = WrappedComponent;
  WithDirection.contextTypes = contextTypes;
  WithDirection.displayName = `withDirection(${wrappedComponentName})`;
  if (WrappedComponent.propTypes) {
    WithDirection.propTypes = deepmerge({}, WrappedComponent.propTypes);
    delete WithDirection.propTypes.direction;
  }
  if (WrappedComponent.defaultProps) {
    WithDirection.defaultProps = deepmerge({}, WrappedComponent.defaultProps);
  }

  return hoistNonReactStatics(WithDirection, WrappedComponent);
}
