import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { Box } from '@mui/system';

const CachedImage = ({ imageUrl, imageAlt, sx }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [cachedImages, setCachedImages] = useState({});

  useEffect(() => {
    if (!cachedImages[imageUrl]) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        setCachedImages((prevCache) => ({
          ...prevCache,
          [imageUrl]: img,
        }));
        setImageLoaded(true);
      };
    } else {
      setImageLoaded(true);
    }
  }, [imageUrl, cachedImages]);

  return (
    <>
      {imageLoaded ? (
        <Box component="img" src={cachedImages[imageUrl]?.src} alt={imageAlt} sx={sx} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

CachedImage.propTypes = {
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
  sx: PropTypes.object,
};

export default CachedImage;
