import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

export default function ImageIcon({ type, id, version, getImageIconById, sx }) {
  const [imageIcon, setImageIcon] = useState();

  useEffect(() => {
    const fetchImage = async () => {
      const image = await getImageIconById(id, version);
      setImageIcon(image);
    }

    fetchImage();
    
  }, [id, version, getImageIconById]);

  if (!id || !imageIcon) {
    return <Box sx={sx} />;
  }

  return <Box component="img" alt={`${type}Id-${id}`} src={imageIcon} sx={sx} />;
}

ImageIcon.propTypes = {
  type: PropTypes.string,
  id: PropTypes.number,
  version: PropTypes.string,
  getImageIconById: PropTypes.func,
  sx: PropTypes.object,
};
