import PropTypes from 'prop-types';

export default PropTypes.shape({
  getState: PropTypes.func,
  setState: PropTypes.func,
  subscribe: PropTypes.func,
});
