import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { numberWithCommas } from 'src/utils/format-number';
import {
  getChampionNameByChampionId,
  getChampionImageByChampionId,
} from 'src/utils/riot-image-asset';

import ImageIcon from '../image-icon';
import MasteryIcon from './mastery-icon';
import MasteryScoreIcon from './mastery-score-icon';

export default function ChampionMasteryItem({ version, masteryInfo, main }) {
  const [champName, setChampName] = useState();

  useEffect(() => {
    const getChampName = async () => {
      const championName = await getChampionNameByChampionId(masteryInfo?.championId, version);
      setChampName(championName);
    };

    getChampName();
  }, [masteryInfo, version]);

  return (
    <Stack alignItems="center" sx={{ position: 'relative' }} justifyContent="flex-end" width={100}>
      <ImageIcon
        id={masteryInfo?.championId}
        getImageIconById={getChampionImageByChampionId}
        version={version}
        sx={{
          width: main ? 72 : 59,
          height: main ? 72 : 59,
          flexShrink: 0,
          border: '2px solid SlateGrey',
          position: 'absolute',
          top: main ? 10 : 24,
        }}
      />
      <MasteryIcon
        level={masteryInfo?.championLevel}
        sx={{
          width: main ? 78 : 60,
          height: main ? 141 : 105,
          mb: main ? 0 : 2,
        }}
      />

      <Typography variant="button">{champName?.toUpperCase()}</Typography>
      <Divider variant="middle" sx={{ width: main ? 72 : 59, my: 0.5 }} />
      <Typography variant="caption">
        <MasteryScoreIcon sx={{height: 20, width: 20, mr: .5}}/>
        {numberWithCommas(masteryInfo?.championPoints)} pts
      </Typography>
    </Stack>
  );
}

ChampionMasteryItem.propTypes = {
  version: PropTypes.string,
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
