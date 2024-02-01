import PropTypes from 'prop-types';

import { getProfileIconImageUrl } from 'src/utils/riot-image-asset';

import ImageIcon from '../image-icon';

export default function ProfileIcon({ version, profileIconId, sx }) {
  return <ImageIcon type="ProfileIcon" id={profileIconId} version={version} getImageIconById={getProfileIconImageUrl} sx={sx} />;
}

ProfileIcon.propTypes = {
  version: PropTypes.string,
  profileIconId: PropTypes.number,
  sx: PropTypes.object,
};
