import PropTypes from 'prop-types';
import React from 'react';
import { forbidExtraProps } from 'airbnb-prop-types';
import getDirection from 'direction';
import directionPropType from './proptypes/direction';
import DirectionProvider from './DirectionProvider';
import withDirection from './withDirection';

const propTypes = forbidExtraProps({
  children: PropTypes.node.isRequired,
  direction: directionPropType.isRequired,
  inline: PropTypes.bool,
  text: PropTypes.string.isRequired,
});

const defaultProps = {
  inline: false,
};

function AutoDirectionProvider({
  children,
  direction,
  inline,
  text,
}) {
  const textDirection = getDirection(text);
  const dir = textDirection === 'neutral' ? direction : textDirection;

  return (
    <DirectionProvider
      direction={dir}
      inline={inline}
    >
      {React.Children.only(children)}
    </DirectionProvider>
  );
}

AutoDirectionProvider.propTypes = propTypes;
AutoDirectionProvider.defaultProps = defaultProps;

export default withDirection(AutoDirectionProvider);
