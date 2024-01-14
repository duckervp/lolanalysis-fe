import PropTypes from 'prop-types';

import { getRunesIconImageUrl } from 'src/utils/riot-image-asset';

import ImageIcon from '../image-icon';

export default function RuneIcon({ version, runeId, sx }) {
  return <ImageIcon type="RuneIcon" id={runeId} version={version} getImageIconById={getRunesIconImageUrl} sx={sx} />;
}

RuneIcon.propTypes = {
  version: PropTypes.string,
  runeId: PropTypes.number,
  sx: PropTypes.object,
};
