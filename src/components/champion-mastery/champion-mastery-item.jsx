import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

import MasteryIcon from './mastery-icon';
import { ChampAvatar } from '../match-history-icon';
import ImageIcon from '../image-icon';

export default function ChampionMastery({ masteryInfo }) {
  return (
    <Stack>
      <ImageIcon
        id={masteryInfo.}
        getImageIconById={}
        sx={{
          width: 45,
          height: 45,
          borderRadius: 5,
          flexShrink: 0,
          border: '2px solid SlateGrey',
        }}
      />
      <MasteryIcon level={7} />
    </Stack>
  );
}

ChampionMastery.propTypes = {
  masteryInfo: PropTypes.object,
// puuid: PropTypes
// championId
// championLevel
// championPoints
// lastPlayTime
// championPointsSinceLastLevel
// championPointsUntilNextLevel
// chestGranted
// tokensEarned
// summonerId
};
