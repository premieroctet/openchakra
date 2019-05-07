import React from 'react';
import Button from '@material-ui/core/Button';

const button = (props) => {
  // eslint-disable-next-line react/prop-types
  const { text } = props;
  return (
    <Button>{text}</Button>
  );
};

export default button;
