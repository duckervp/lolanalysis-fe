import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

export default function MasteryIcon({ level, sx }) {
  const src = `src/assets/champion_mastery_level_${level}_flair.png`;
  return <Box component="img" src={src} sx={sx} />;
}

MasteryIcon.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7]),
  sx: PropTypes.object,
};
