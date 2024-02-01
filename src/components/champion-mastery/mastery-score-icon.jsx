import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

export default function MasteryScoreIcon({ sx }) {
  return <Box component="img" src="src/assets/mastery/score_icon.png" sx={sx} />;
}

MasteryScoreIcon.propTypes = {
  sx: PropTypes.object,
};
