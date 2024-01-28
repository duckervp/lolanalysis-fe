import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import { getChampionImageUrl } from 'src/utils/riot-image-asset';

export default function ChampAvatar({ champName, version, sx }) {
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    const fetchImage = async () => {
      const image = await getChampionImageUrl(champName, version);
      setImageUrl(image);
    }

    fetchImage();
  }, [champName, version]);

  if (!imageUrl) {
    return <Box sx={sx} />;
  }

  return <Box component="img" alt={champName} src={imageUrl} sx={sx} />;
}

ChampAvatar.propTypes = {
  champName: PropTypes.string,
  version: PropTypes.string,
  sx: PropTypes.object,
};
