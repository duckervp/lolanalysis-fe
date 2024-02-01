import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import { BASE_URL } from 'src/app-config';

import ChampionMasteryItem from './champion-mastery-item';

export default function ChampionMastery({ lolCurrentVersion, puuid }) {
  const [masteryData, setMasteryData] = useState([]);

  useEffect(() => {
    const fetchChampionMastery = async () => {
      const data = await callMasteryAPI(puuid);
      setMasteryData(data);
    };

    if (puuid && lolCurrentVersion) {
      fetchChampionMastery();
    }
  }, [lolCurrentVersion, puuid]);

  const callMasteryAPI = async (uuid) => {
    const url = `${BASE_URL}/riot/lol/champion-mastery/${uuid}?orderByLevel=true&count=3`;
    const { data: result } = await axios.get(url);
    return result.data;
  };

  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 3,
        borderRadius: 2,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack direction="row" spacing={4}>
        {abc(masteryData).map((item, index) => (
          <ChampionMasteryItem
            key={item.championId}
            version={lolCurrentVersion}
            masteryInfo={item}
            main={index === 1}
          />
        ))}
      </Stack>
    </Card>
  );
}

function abc(masteries) {
  if (masteries.length !== 3) {
    return masteries;
  }
  const [main, sub1, sub2] = masteries;
  return [sub1, main, sub2];
}

ChampionMastery.propTypes = {
  lolCurrentVersion: PropTypes.string,
  puuid: PropTypes.string,
};
