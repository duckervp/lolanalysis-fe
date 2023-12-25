import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
// import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

// import { fToNow } from 'src/utils/format-time';
import { getChampionImageUrl } from 'src/utils/riot-image-url';

import { ACCOUNT_ATTR } from 'src/app-config';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export default function AppMatchHistory({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.map((match) => (
            <MatchItem key={match.matchId} match={match} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

AppMatchHistory.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

// ----------------------------------------------------------------------

function MatchItem({ match }) {
  console.log(match);

  const [currentUserChamp, setCurrentUserChamp] = useState();

  useEffect(() => {
    const getCurrentUserChampion = () => {
    const currentAccount = JSON.parse(localStorage.getItem(ACCOUNT_ATTR))
    match.participantDetails.forEach((participantDetail, index) => {
      if (participantDetail.puuid === currentAccount.puuid) {
        setCurrentUserChamp(participantDetail);
      }
    })
  }

    getCurrentUserChampion();
  }, [match]);

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {match.gameMode}
      <Box
        component="img"
        alt={currentUserChamp?.championName}
        src={getChampionImageUrl(currentUserChamp?.championName)}
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />
    </Stack>
  );
}

MatchItem.propTypes = {
  match: PropTypes.shape({
    matchId: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.string),
    gameCreation: PropTypes.number,
    gameDuration: PropTypes.number,
    gameMode: PropTypes.string,
    participantDetails: PropTypes.arrayOf(
      PropTypes.shape({
        win: PropTypes.bool,
        kills: PropTypes.number,
        deaths: PropTypes.number,
        assists: PropTypes.number,
        championName: PropTypes.string,
        championLevel: PropTypes.number,
        goldEarned: PropTypes.number,
        item0: PropTypes.number,
        item1: PropTypes.number,
        item2: PropTypes.number,
        item3: PropTypes.number,
        item4: PropTypes.number,
        item5: PropTypes.number,
        item6: PropTypes.number,
        spellD: PropTypes.number,
        spellF: PropTypes.number,
        riotIdGameName: PropTypes.string,
        riotIdTagline: PropTypes.string,
        puuid: PropTypes.string,
      })
    ),
  }),
};
