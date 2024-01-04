import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import PanoramaFishEyeTwoToneIcon from '@mui/icons-material/PanoramaFishEyeTwoTone';

import { numberWithCommas } from 'src/utils/format-number';
import { fDate, fDateTime, fToMinuteSecondString } from 'src/utils/format-time';
import {
  getMapName,
  getItemImageUrl,
  getChampionImageUrl,
  getSummonerImageUrl,
} from 'src/utils/riot-image-url';

import { selectCurrentAccountPuuid } from 'src/redux/slice/accountSlice';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// import AppMatchDetailModal from './app-match-detail';

// ----------------------------------------------------------------------

export default function AppMatchHistory({ title, subheader, list, ...other }) {
  // const [openMatchDetail, setOpenMatchDetail] = useState(false);

  // const handleOpenMatchDetail = () => {
  //   setOpenMatchDetail(true);
  // }

  return (
    // <Box>
    //   <AppMatchDetailModal open={openMatchDetail} setOpen={setOpenMatchDetail}/>
      <Card {...other}>
        <CardHeader title={title} subheader={subheader} />

        <Scrollbar>
          <Stack sx={{ p: 3, pr: 0 }}>
            {list.map((match) => (
              <Box key={match.matchId}>
                <MatchItem match={match} />
                <Divider variant="middle" sx={{ my: 2.5 }} />
              </Box>
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
    // </Box>
  );
}

AppMatchHistory.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

// ----------------------------------------------------------------------

function MatchItem({ match }) {
  const currentAccountPuuid = useSelector(selectCurrentAccountPuuid);
  const [currentUserChamp, setCurrentUserChamp] = useState();

  useEffect(() => {
    const getCurrentUserChampion = () => {
      match.participantDetails.forEach((participantDetail, index) => {
        if (participantDetail.puuid === currentAccountPuuid) {
          setCurrentUserChamp(participantDetail);
        }
      });
    };

    getCurrentUserChampion();
  }, [match, currentAccountPuuid]);

  return (
    <Stack direction="row" spacing={2}>
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
        <Typography
          variant="subtitle1"
          sx={currentUserChamp?.win ? { color: 'green', height: 15 } : { color: 'red', height: 15 }}
        >
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
          <ItemBox itemId={currentUserChamp?.item0} />
          <ItemBox itemId={currentUserChamp?.item1} />
          <ItemBox itemId={currentUserChamp?.item2} />
          <ItemBox itemId={currentUserChamp?.item3} />
          <ItemBox itemId={currentUserChamp?.item4} />
          <ItemBox itemId={currentUserChamp?.item5} />
          <ItemBox itemId={currentUserChamp?.item6} />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ pt: 1, height: 1 }}
          justifyContent="space-between"
        >
          <Typography variant="body1" sx={{ height: 18 }} width="80px">
            {currentUserChamp?.kills} / {currentUserChamp?.deaths} / {currentUserChamp?.assists}
          </Typography>
          <Stack direction="row" alignItems="flex-end" spacing={0.5} width="50px">
            <Typography variant="body1" sx={{ height: 18 }}>
              {currentUserChamp?.totalMinionsKilled}
            </Typography>
            <Box
              component="img"
              src="src/assets/Minion_icon.webp"
              sx={{ width: 12.5, height: 12.5, backgroundColor: 'darkgray' }}
            />
          </Stack>
          <Stack direction="row" alignItems="flex-end" spacing={0.5}>
            <Typography variant="body1" sx={{ height: 18 }}>
              {numberWithCommas(currentUserChamp?.goldEarned)}
            </Typography>
            <Box component="img" src="src/assets/Gold.webp" sx={{ height: 12.5 }} />
          </Stack>
        </Stack>
      </Stack>
      <Stack alignItems="flex-start">
        <Typography variant="body2">{getMapName(match?.mapId)}</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2">{fToMinuteSecondString(match?.gameDuration)}</Typography>
          <PanoramaFishEyeTwoToneIcon style={{ fontSize: 7 }} />
          <Typography variant="body2">{fDate(match?.gameCreation, 'dd/MM/yyyy')}</Typography>
          <PanoramaFishEyeTwoToneIcon style={{ fontSize: 7 }} />
          <Typography variant="body2">{fDateTime(match?.gameCreation, 'p')}</Typography>
        </Stack>
      </Stack>
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
    mapId: PropTypes.number,
    participantDetails: PropTypes.arrayOf(
      PropTypes.shape({
        win: PropTypes.bool,
        kills: PropTypes.number,
        deaths: PropTypes.number,
        assists: PropTypes.number,
        championName: PropTypes.string,
        championLevel: PropTypes.number,
        goldEarned: PropTypes.number,
        totalMinionsKilled: PropTypes.number,
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
        teamId: PropTypes.number,
      })
    ),
  }),
};

// ----------------------------------------------------------------------

const ItemBox = ({ itemId }) => {
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    setImageUrl(getItemImageUrl(itemId));
  }, [itemId]);

  if (itemId === 0 || !imageUrl) {
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
      src={imageUrl}
      sx={{ width: 40, height: 40, flexShrink: 0, border: '1px solid brown', marginLeft: '-1px' }}
    />
  );
};

ItemBox.propTypes = {
  itemId: PropTypes.number,
};
