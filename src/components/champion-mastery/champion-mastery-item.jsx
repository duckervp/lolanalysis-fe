import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

import { getChampionImageByChampionId } from 'src/utils/riot-image-asset';

import ImageIcon from '../image-icon';
import MasteryIcon from './mastery-icon';

export default function ChampionMasteryItem({ masteryInfo, main }) {
  const champAvatarSize = main ? 70 : 55;
  const masteryIconSize = main ? 50 : 45;
  return (
    <Stack alignItems="center" sx={{ position: 'relative'}} justifyContent="flex-end">
      <ImageIcon
        id={masteryInfo?.championId}
        getImageIconById={getChampionImageByChampionId}
        sx={{
          width: champAvatarSize,
          height: champAvatarSize,
          borderRadius: 5,
          flexShrink: 0,
          border: '2px solid SlateGrey',
        }}
      />
      <MasteryIcon
        level={masteryInfo?.championLevel}
        sx={{
          width: masteryIconSize,
          height: masteryIconSize,
          position: 'absolute',
          top: 58,
        }}
      />
    </Stack>
  );
}

ChampionMasteryItem.propTypes = {
  masteryInfo: PropTypes.shape({
    puuid: PropTypes.string,
    championId: PropTypes.number,
    championLevel: PropTypes.number,
    championPoints: PropTypes.number,
    lastPlayTime: PropTypes.number,
    championPointsSinceLastLevel: PropTypes.number,
    championPointsUntilNextLevel: PropTypes.number,
    chestGranted: PropTypes.bool,
    tokensEarned: PropTypes.number,
    summonerId: PropTypes.string,
  }),
  main: PropTypes.bool,
};
