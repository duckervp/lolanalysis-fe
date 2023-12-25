import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

// import { fToNow } from 'src/utils/format-time';
import { numberWithCommas } from 'src/utils/format-number';
import {
  getItemImageUrl,
  getChampionImageUrl,
  getSummonerImageUrl,
} from 'src/utils/riot-image-url';

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
            <>
              <MatchItem key={match.matchId} match={match} />
              <Divider variant="middle" />
            </>
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
      const currentAccount = JSON.parse(localStorage.getItem(ACCOUNT_ATTR));
      match.participantDetails.forEach((participantDetail, index) => {
        if (participantDetail.puuid === currentAccount.puuid) {
          setCurrentUserChamp(participantDetail);
        }
      });
    };

    getCurrentUserChampion();
  }, [match]);

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          alt={currentUserChamp?.championName}
          src={getChampionImageUrl(currentUserChamp?.championName)}
          sx={{ width: 70, height: 70, borderRadius: 5, flexShrink: 0, border: '2px solid brown' }}
        />
        <Box
          sx={{
            width: 25,
            height: 25,
            backgroundColor: 'black',
            color: 'white',
            fontSize: '14px',
            borderRadius: 5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px solid brown',
            position: 'absolute',
            top: 45,
            left: 50,
          }}
        >
          {currentUserChamp?.championLevel}
        </Box>
      </Box>
      <Box sx={{ width: 5 }} />
      <Box>
        <Typography variant="subtitle1" sx={{ height: 15 }}>
          {currentUserChamp?.win ? 'WIN' : 'LOST'}
        </Typography>
        <Typography variant="caption">{match?.gameMode}</Typography>
        <Box sx={{ border: '1px solid brown', mt: 0.5 }}>
          <Box
            component="img"
            alt="Spell D"
            src={getSummonerImageUrl(currentUserChamp?.spellD)}
            sx={{ width: 25, height: 25, flexShrink: 0 }}
          />
          <Box
            component="img"
            alt="Spell F"
            src={getSummonerImageUrl(currentUserChamp?.spellF)}
            sx={{ width: 25, height: 25, flexShrink: 0 }}
          />
        </Box>
      </Box>
      <Box sx={{ width: 40 }} />
      <Stack>
        <Stack direction="row" alignItems="center">
          {getItemBox(currentUserChamp?.item0)}
          {getItemBox(currentUserChamp?.item1)}
          {getItemBox(currentUserChamp?.item2)}
          {getItemBox(currentUserChamp?.item3)}
          {getItemBox(currentUserChamp?.item4)}
          {getItemBox(currentUserChamp?.item5)}
          {getItemBox(currentUserChamp?.item6)}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ pt: 1, height: 1 }}
          justifyContent="space-between"
        >
          <Typography variant="body1" sx={{ height: 18 }}>
            {currentUserChamp?.kills} / {currentUserChamp?.deaths} / {currentUserChamp?.assists}
          </Typography>
          <Stack direction="row" alignItems="center">
            <Typography variant="body1" sx={{ height: 18 }}>
              {currentUserChamp?.totalMinionsKilled}
            </Typography>
            <Box
              component="img"
              src="src/assets/Minion_icon.webp"
              sx={{ width: 15, height: 15, backgroundColor: 'darkgray' }}
            />
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography variant="body1" sx={{ height: 18 }}>
              {numberWithCommas(currentUserChamp?.goldEarned)}
            </Typography>
            <Box component="img" src="src/assets/Gold.webp" sx={{ height: 15 }} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

const getItemBox = (itemId) => {
  if (itemId === 0) {
    return (
      <Box
        sx={{
          display: 'inline-block',
          width: 40,
          height: 40,
          border: '1px solid brown',
          marginLeft: '-1px',
        }}
      />
    );
  }
  return (
    <Box
      component="img"
      alt={`item-${itemId}`}
      src={getItemImageUrl(itemId)}
      sx={{ width: 40, height: 40, flexShrink: 0, border: '1px solid brown', marginLeft: '-1px' }}
    />
  );
};

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
        totalMinionsKilled:  PropTypes.number,
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
