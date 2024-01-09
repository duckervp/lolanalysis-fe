import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

export default function AttackIcon({ sx }) {
  return <Box component="img" src="src/assets/kills.png" sx={sx} />;
}

AttackIcon.propTypes = {
  sx: PropTypes.object,
};
