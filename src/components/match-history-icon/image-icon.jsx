import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import Loading from '../loading';

export default function ImageIcon({ type, id, getImageIconById, sx }) {
  const [imageIcon, setImageIcon] = useState();

  useEffect(() => {
    setImageIcon(getImageIconById(id));
  }, [id, getImageIconById]);

  if (!id || !ImageIcon) {
    return <Loading type="circle" variant="indeterminate" />;
  }

  return <Box component="img" alt={`${type}Id-${id}`} src={imageIcon} sx={sx} />;
}

ImageIcon.propTypes = {
  type: PropTypes.string,
  id: PropTypes.number,
  getImageIconById: PropTypes.func,
  sx: PropTypes.object,
};
