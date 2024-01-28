import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import { getItemImageUrl } from 'src/utils/riot-image-asset';

const ItemBox = ({ itemId, version, width, height }) => {
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    const getItemImage = async () => {
      const image = await getItemImageUrl(itemId, version);
      setImageUrl(image);
    }

    getItemImage();

  }, [itemId, version]);

  const style1 = {
    display: 'inline-block',
    width,
    height,
    border: '1px solid SlateGrey',
    marginLeft: '-1px',
  };

  const style2 = {
    width,
    height,
    flexShrink: 0,
    border: '1px solid SlateGrey',
    marginLeft: '-1px',
  };

  if (itemId === 0 || !imageUrl) {
    return <Box sx={style1} />;
  }

  return <Box component="img" alt={`item-${itemId}`} src={imageUrl} sx={style2} />;
};

ItemBox.propTypes = {
  itemId: PropTypes.number,
  version: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default ItemBox;