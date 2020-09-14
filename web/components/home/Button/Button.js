import React from 'react';
import Button from '@material-ui/core/Button';

const button = (props) => {
  // eslint-disable-next-line react/prop-types
  const {text, variant} = props;
  return (
    <Button variant={variant}>
      {text}
    </Button>
  );
};

export default button;
