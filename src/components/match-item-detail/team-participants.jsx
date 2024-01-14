import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';

import DetailParticipantItem from './detail-participant-item';
import DetailParticipantHeader from './detail-participant-header';

export default function TeamParticipants({ version, team, participants }) {
    const [teamKills, setTeamKills] = useState(0);
    const [teamDeaths, setTeamDeaths] = useState(0);
    const [teamAssists, setTeamAssists] = useState(0);
    const [teamGolds, setTeamGolds] = useState(0);
  
    useEffect(() => {
      if (participants.length > 0) {
        let kills = 0;
        let deaths = 0;
        let assists = 0;
        let goldEarned = 0;
        participants.forEach((participant) => {
          kills += participant.kills;
          deaths += participant.deaths;
          assists += participant.assists;
          goldEarned += participant.goldEarned;
        });
        setTeamKills(kills);
        setTeamDeaths(deaths);
        setTeamAssists(assists);
        setTeamGolds(goldEarned);
      }
    }, [participants]);
  
    return (
      <Stack>
        <DetailParticipantHeader
          teamName={team}
          teamKills={teamKills}
          teamDeaths={teamDeaths}
          teamAssists={teamAssists}
          teamGolds={teamGolds}
        />
        {participants?.map((participant) => (
          <DetailParticipantItem key={participant?.puuid} version={version} participant={participant} />
        ))}
      </Stack>
    );
  }
  
  TeamParticipants.propTypes = {
    version: PropTypes.string,
    team: PropTypes.string,
    participants: PropTypes.arrayOf(
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
  };