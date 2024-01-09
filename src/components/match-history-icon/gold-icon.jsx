import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

export default function GoldIcon({ sx }) {
  return <Box component="img" src="src/assets/icon_gold1.png" sx={sx} />;
}

GoldIcon.propTypes = {
  sx: PropTypes.object,
};