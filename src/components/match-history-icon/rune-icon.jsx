import PropTypes from 'prop-types';

import { getRunesIconImageUrl } from 'src/utils/riot-image-asset';

import ImageIcon from './image-icon';

export default function RuneIcon({ runeId, sx }) {
  return <ImageIcon type="RuneIcon" id={runeId} getImageIconById={getRunesIconImageUrl} sx={sx} />;
}

RuneIcon.propTypes = {
  runeId: PropTypes.number,
  sx: PropTypes.object,
};
