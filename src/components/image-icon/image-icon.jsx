import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import Loading from '../loading';

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
    return <Loading type="circle" variant="indeterminate" />;
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
