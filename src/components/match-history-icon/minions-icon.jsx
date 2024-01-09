import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

export default function MinionsIcon({ sx }) {
  return <Box component="img" src="src/assets/icon_minions1.png" sx={sx} />;
}

MinionsIcon.propTypes = {
  sx: PropTypes.object,
};
