import PropTypes from 'prop-types';

import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';

/**
 *
 * @param {string} type Values: circle | linear
 * @param {string} variant Values: circle (indeterminate, determinate) | linear (indeterminate, determinate, buffer, query)
 * @returns
 */
function Loading({ type, variant }) {
  return (
    <>
      {type === 'circle' && <CircularProgress variant={variant} />}
      {type === 'linear' && <LinearProgress variant={variant} />}
    </>
  );
}

Loading.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.string,
};

export default Loading;
