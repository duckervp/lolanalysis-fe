import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import PanoramaFishEyeTwoToneIcon from '@mui/icons-material/PanoramaFishEyeTwoTone';

import { getMapName } from 'src/utils/riot-image-asset';

import { selectCurrentAccountPuuid } from 'src/redux/slice/accountSlice';

import Scrollbar from 'src/components/scrollbar';
import { MapIcon } from 'src/components/match-history-icon';

import { getMatchVersion } from 'src/sections/overview/utils';

import TeamParticipants from './team-participants';
import MatchTimeDetail from '../match-item/match-time-detail';

export default function MatchDetail({ match }) {
  const currentAccountPuuid = useSelector(selectCurrentAccountPuuid);

  const [blueTeamParticipants, setBlueTeamParticipants] = useState([]);

  const [redTeamParticipants, setRedTeamParticipants] = useState([]);

  const [matchMapName, setMatchMapName] = useState();

  const [win, setWin] = useState();

  useEffect(() => {
    const fetchMapName = async () => {
      const version = getMatchVersion(match);
      const mapName = await getMapName(match?.mapId, version);
      setMatchMapName(mapName);
    }

    fetchMapName();
  }, [match]);

  useEffect(() => {
    const blueTeamMembers = [];
    const redTeamMembers = [];

    let currentAccountTeamId = 0;
    let currentAccountParticipant = {};
    match?.participantDetails?.forEach((participant) => {
      if (participant.puuid === currentAccountPuuid) {
        currentAccountTeamId = participant.teamId;
        currentAccountParticipant = participant;
        setWin(participant.win);
      }
    });

    if (currentAccountTeamId !== 0) {
      match?.participantDetails?.forEach((participant) => {
        if (participant.teamId === currentAccountTeamId) {
          if (participant.puuid !== currentAccountPuuid) {
            blueTeamMembers.push(participant);
          }
        } else {
          redTeamMembers.push(participant);
        }
      });

      blueTeamMembers.unshift(currentAccountParticipant);

      setBlueTeamParticipants(blueTeamMembers);
      setRedTeamParticipants(redTeamMembers);
    }
  }, [match, currentAccountPuuid]);



  return (
    <Card>
      <Scrollbar sx={{ padding: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <MapIcon
            mapId={match?.mapId}
            version={getMatchVersion(match)}
            sx={{ width: 65, height: 65, borderRadius: 0.5, backgroundColor: 'lightblue' }}
          />
          <Stack>
            <Typography variant="h3">{win ? "VICTORY" : "DEFEAT"}</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2">{matchMapName}</Typography>
              <PanoramaFishEyeTwoToneIcon style={{ fontSize: 7 }} />
              <Typography variant="caption">{match?.gameMode}</Typography>
              <PanoramaFishEyeTwoToneIcon style={{ fontSize: 7 }} />
              <MatchTimeDetail
                gameCreation={match?.gameCreation}
                gameDuration={match?.gameDuration}
              />
            </Stack>
          </Stack>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Stack>
          <TeamParticipants version={getMatchVersion(match)} team="TEAM 1" participants={blueTeamParticipants} />
          <TeamParticipants version={getMatchVersion(match)} team="TEAM 2" participants={redTeamParticipants} />
        </Stack>
      </Scrollbar>
    </Card>
  );
}

MatchDetail.propTypes = {
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
