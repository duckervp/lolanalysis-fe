import Stack from '@mui/material/Stack';

import MasteryIcon from './mastery-icon';
import ImageIcon from '../match-history-icon';

const DATA = [
    {
        "puuid": "miyF5bYOgWve2J82vsSgzA6BdMg2FV4rf6V4xXCtkxV5Z0gJYcV_XpzgD5eQ68NjB7IY85pC6PLF1Q",
        "championId": 103,
        "championLevel": 7,
        "championPoints": 142728,
        "lastPlayTime": 1703177884000,
        "championPointsSinceLastLevel": 121128,
        "championPointsUntilNextLevel": 0,
        "chestGranted": false,
        "tokensEarned": 0,
        "summonerId": "pS5pOEOx8y54PZ4qygkheTmBBEQSGtGhdeOTemxej9kxyoCG"
    },
    {
        "puuid": "miyF5bYOgWve2J82vsSgzA6BdMg2FV4rf6V4xXCtkxV5Z0gJYcV_XpzgD5eQ68NjB7IY85pC6PLF1Q",
        "championId": 99,
        "championLevel": 7,
        "championPoints": 129514,
        "lastPlayTime": 1704548828000,
        "championPointsSinceLastLevel": 107914,
        "championPointsUntilNextLevel": 0,
        "chestGranted": false,
        "tokensEarned": 0,
        "summonerId": "pS5pOEOx8y54PZ4qygkheTmBBEQSGtGhdeOTemxej9kxyoCG"
    },
    {
        "puuid": "miyF5bYOgWve2J82vsSgzA6BdMg2FV4rf6V4xXCtkxV5Z0gJYcV_XpzgD5eQ68NjB7IY85pC6PLF1Q",
        "championId": 25,
        "championLevel": 6,
        "championPoints": 86066,
        "lastPlayTime": 1704562092000,
        "championPointsSinceLastLevel": 64466,
        "championPointsUntilNextLevel": 0,
        "chestGranted": false,
        "tokensEarned": 2,
        "summonerId": "pS5pOEOx8y54PZ4qygkheTmBBEQSGtGhdeOTemxej9kxyoCG"
    }
];

export default function ChampionMastery() {
  return (
    <Stack>
      <Stack>
        <ImageIcon
          id
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
    </Stack>
  );
}
