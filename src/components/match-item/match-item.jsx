import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { getMapName } from 'src/utils/riot-image-asset';
import { numberWithCommas } from 'src/utils/format-number';

import { selectCurrentAccountPuuid } from 'src/redux/slice/accountSlice';

import { Spells, GoldIcon, MinionsIcon, ChampAvatar } from 'src/components/match-history-icon';

import { getMatchVersion } from 'src/sections/overview/utils';

import KDA from '../kda';
import ItemBoxList from './item-box-list';
import MatchTimeDetail from './match-time-detail';

function MatchItem({ match }) {
  console.log("MatchItem re-render");
  const currentAccountPuuid = useSelector(selectCurrentAccountPuuid);

  const [currentUserChamp, setCurrentUserChamp] = useState();

  const [matchMapName, setMatchMapName] = useState();

  useEffect(() => {
    const fetchMapName = async () => {
      const version = getMatchVersion(match);
      const mapName = await getMapName(match?.mapId, version);
      setMatchMapName(mapName);
    };

    fetchMapName();
  }, [match]);

  useEffect(() => {
    const getCurrentUserChampion = () => {
      match.participantDetails.forEach((participantDetail) => {
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
        <ChampAvatar
          champName={currentUserChamp?.championName}
          version={getMatchVersion(match)}
          sx={{
            width: 70,
            height: 70,
            borderRadius: 5,
            flexShrink: 0,
            border: '2px solid SlateGrey',
          }}
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
            border: '2px solid SlateGrey',
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
          variant="h6"
          sx={currentUserChamp?.win ? { color: 'green', height: 18 } : { color: 'red', height: 18 }}
        >
          {currentUserChamp?.win ? 'WIN' : 'LOST'}
        </Typography>
        <Typography variant="caption">{match?.gameMode}</Typography>
        <Spells
          spellD={currentUserChamp?.spellD}
          spellF={currentUserChamp?.spellF}
          version={getMatchVersion(match)}
          width={25}
          height={25}
          direction="row"
        />
      </Box>
      <Box sx={{ width: 40 }} />
      <Stack>
        <ItemBoxList
          items={currentUserChamp?.items}
          version={getMatchVersion(match)}
          width={40}
          height={40}
        />
        <Stack
          direction="row"
          alignItems="center"
          sx={{ pt: 1, height: 1 }}
          justifyContent="space-between"
        >
          <KDA
            height={18}
            kills={currentUserChamp?.kills}
            deaths={currentUserChamp?.deaths}
            assists={currentUserChamp?.assists}
          />
          <Stack direction="row" alignItems="flex-end" spacing={0.5} width="50px">
            <Typography variant="subtitle1" sx={{ height: 18 }}>
              {currentUserChamp?.totalMinionsKilled}
            </Typography>
            <MinionsIcon sx={{ width: 12.5, height: 12.5 }} />
          </Stack>
          <Stack direction="row" alignItems="flex-end" spacing={0.5}>
            <Typography variant="subtitle1" sx={{ height: 18 }}>
              {numberWithCommas(currentUserChamp?.goldEarned)}
            </Typography>
            <GoldIcon sx={{ height: 12.5 }} />
          </Stack>
        </Stack>
      </Stack>
      <Stack alignItems="flex-start">
        <Typography variant="body2">{matchMapName}</Typography>
        <MatchTimeDetail gameCreation={match?.gameCreation} gameDuration={match?.gameDuration} />
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
    version: PropTypes.string,
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
        items: PropTypes.arrayOf(PropTypes.number),
        spellD: PropTypes.number,
        spellF: PropTypes.number,
        riotIdGameName: PropTypes.string,
        riotIdTagline: PropTypes.string,
        puuid: PropTypes.string,
        teamId: PropTypes.number,
        primaryRuneId: PropTypes.number,
      })
    ),
  }),
};

export default MatchItem;