import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { getChampionImageUrl } from 'src/utils/riot-image-asset';

export default function ChampAvatar({ champName, sx }) {
  return <Box component="img" alt={champName} src={getChampionImageUrl(champName)} sx={sx} />;
}

ChampAvatar.propTypes = {
  champName: PropTypes.string,
  sx: PropTypes.object,
};
