import PropTypes from 'prop-types';

import { getMapIconUrl } from 'src/utils/riot-image-asset';

import ImageIcon from './image-icon';

export default function MapIcon({ mapId, sx }) {
  return <ImageIcon type="MapIcon" id={mapId} getImageIconById={getMapIconUrl} sx={sx} />;
}

MapIcon.propTypes = {
  mapId: PropTypes.number,
  sx: PropTypes.object,
};
