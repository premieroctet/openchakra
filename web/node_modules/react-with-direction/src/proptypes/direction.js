import values from 'object.values';
import PropTypes from 'prop-types';

import { DIRECTIONS } from '../constants';

export default PropTypes.oneOf(values(DIRECTIONS));
