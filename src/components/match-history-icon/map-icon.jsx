import PropTypes from 'prop-types';

import { getMapIconUrl } from 'src/utils/riot-image-asset';

import ImageIcon from '../image-icon';

export default function MapIcon({ version, mapId, sx }) {
  return <ImageIcon type="MapIcon" id={mapId} version={version} getImageIconById={getMapIconUrl} sx={sx} />;
}

MapIcon.propTypes = {
  version: PropTypes.string,
  mapId: PropTypes.number,
  sx: PropTypes.object,
};
