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
  getRunesIconImageUrl,
} from 'src/utils/riot-image-url';

import { selectCurrentAccountPuuid } from 'src/redux/slice/accountSlice';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import CustomModal from 'src/components/modal/modal';

// ----------------------------------------------------------------------

export default function AppMatchHistory({ title, subheader, list, ...other }) {
  const [openMatchDetail, setOpenMatchDetail] = useState(false);

  const [selectedMatch, setSelectedMatch] = useState({});

  const handleOpenMatchDetail = (match) => {
    setOpenMatchDetail(true);
    setSelectedMatch(match);
  };

  return (
    <Box>
      <CustomModal open={openMatchDetail} setOpen={setOpenMatchDetail}>
        <MatchDetail match={selectedMatch} />
      </CustomModal>
      <Card {...other}>
        <CardHeader title={title} subheader={subheader} />

        <Scrollbar>
          <Stack sx={{ p: 3, pr: 0 }}>
            {list.map((match) => (
              <Box key={match.matchId} onClick={() => handleOpenMatchDetail(match)}>
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
    </Box>
  );
}

AppMatchHistory.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

// ----------------------------------------------------------------------
function RuneIcon({ runeId, sx }) {
  const [runeIcon, setRuneIcon] = useState();

  useEffect(() => {
    setRuneIcon(getRunesIconImageUrl(runeId));
  }, [runeId]);

  if (!runeIcon) {
    return <Box />;
  }

  return <Box component="img" alt={`runeId-${runeId}`} src={runeIcon} sx={sx} />;
}

RuneIcon.propTypes = {
  runeId: PropTypes.number,
  sx: PropTypes.object,
};

// ----------------------------------------------------------------------
function ChampAvatar({ champName, sx }) {
  return <Box component="img" alt={champName} src={getChampionImageUrl(champName)} sx={sx} />;
}

ChampAvatar.propTypes = {
  champName: PropTypes.string,
  sx: PropTypes.object,
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
        <ChampAvatar
          champName={currentUserChamp?.championName}
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
          variant="h6"
          sx={currentUserChamp?.win ? { color: 'green', height: 18 } : { color: 'red', height: 18 }}
        >
          {currentUserChamp?.win ? 'WIN' : 'LOST'}
        </Typography>
        <Typography variant="caption">{match?.gameMode}</Typography>
        <Spells
          spellD={currentUserChamp?.spellD}
          spellF={currentUserChamp?.spellF}
          width={25}
          height={25}
          direction="row"
        />
      </Box>
      <Box sx={{ width: 40 }} />
      <Stack>
        <ItemList items={currentUserChamp?.items} width={40} height={40} />
        <Stack
          direction="row"
          alignItems="center"
          sx={{ pt: 1, height: 1 }}
          justifyContent="space-between"
        >
          <KDA
            sx={{ height: 18, width: '100px' }}
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

// ----------------------------------------------------------------------

function Spells({ spellD, spellF, width, height, direction }) {
  const style = {
    width,
    height,
    flexShrink: 0,
  };
  return (
    <Stack sx={{ border: '1px solid brown', mt: 0.5 }} direction={direction}>
      <Box component="img" alt="Spell D" src={getSummonerImageUrl(spellD)} sx={style} />
      <Box component="img" alt="Spell F" src={getSummonerImageUrl(spellF)} sx={style} />
    </Stack>
  );
}

Spells.propTypes = {
  spellD: PropTypes.number,
  spellF: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  direction: PropTypes.string,
};

// ----------------------------------------------------------------------

function KDA({ kills, deaths, assists }) {
  return (
    <Stack direction="row">
      <Typography variant="subtitle1" sx={{ width: 25, textAlign: 'center' }}>
        {kills}
      </Typography>
      <Typography variant="subtitle1" sx={{ width: 15, textAlign: 'center' }}>
        /
      </Typography>
      <Typography variant="subtitle1" sx={{ width: 25, textAlign: 'center' }}>
        {deaths}
      </Typography>
      <Typography variant="subtitle1" sx={{ width: 15, textAlign: 'center' }}>
        /
      </Typography>
      <Typography variant="subtitle1" sx={{ width: 25, textAlign: 'center' }}>
        {assists}
      </Typography>
    </Stack>
  );
}

KDA.propTypes = {
  kills: PropTypes.number,
  deaths: PropTypes.number,
  assists: PropTypes.number,
};

// ----------------------------------------------------------------------

function AttackIcon({ sx }) {
  return <Box component="img" src="src/assets/kills.png" sx={sx} />;
}

AttackIcon.propTypes = {
  sx: PropTypes.object,
};

// ----------------------------------------------------------------------

function GoldIcon({ sx }) {
  return <Box component="img" src="src/assets/icon_gold1.png" sx={sx} />;
}

GoldIcon.propTypes = {
  sx: PropTypes.object,
};

// ----------------------------------------------------------------------

function MinionsIcon({ sx }) {
  return <Box component="img" src="src/assets/icon_minions1.png" sx={sx} />;
}

MinionsIcon.propTypes = {
  sx: PropTypes.object,
};

// ----------------------------------------------------------------------

function ItemList({ items, width, height }) {
  return (
    <Stack direction="row" alignItems="center">
      {items?.map((item) => (
        <ItemBox key={item} itemId={item} width={width} height={height} />
      ))}
    </Stack>
  );
}

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.number),
  width: PropTypes.number,
  height: PropTypes.number,
};

// ----------------------------------------------------------------------

const ItemBox = ({ itemId, width, height }) => {
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    setImageUrl(getItemImageUrl(itemId));
  }, [itemId]);

  const style1 = {
    display: 'inline-block',
    width,
    height,
    border: '1px solid brown',
    marginLeft: '-1px',
  };

  const style2 = {
    width,
    height,
    flexShrink: 0,
    border: '1px solid brown',
    marginLeft: '-1px',
  };

  if (itemId === 0 || !imageUrl) {
    return <Box sx={style1} />;
  }

  return <Box component="img" alt={`item-${itemId}`} src={imageUrl} sx={style2} />;
};

ItemBox.propTypes = {
  itemId: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

// ----------------------------------------------------------------------

function DetailParticipantHeader({ teamName, teamGolds, teamKills, teamDeaths, teamAssists }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1} py={0.5} justifyContent="space-between">
      <Stack sx={{ width: 405 }} direction="row" justifyContent="space-between">
        <Typography variant="">{teamName}</Typography>
        <Stack direction="row" alignItems="center">
          <KDA kills={teamKills} deaths={teamDeaths} assists={teamAssists} />
          <AttackIcon sx={{ width: 12.5, height: 12.5 }} />
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" sx={{ width: 280 }} textAlign="center">
        <Typography variant="subtitle2">{teamGolds}</Typography>
        <GoldIcon sx={{ height: 12.5 }} />
      </Stack>
      <Box width={20} />
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box width={100} textAlign="center">
          <AttackIcon sx={{ width: 12.5, height: 12.5 }} />
        </Box>
        <Box width={100} textAlign="center">
          <MinionsIcon sx={{ width: 12.5, height: 12.5 }} />
        </Box>
        <Box width={100} textAlign="center">
          <GoldIcon sx={{ height: 12.5 }} />
        </Box>
      </Stack>
    </Stack>
  );
}

DetailParticipantHeader.propTypes = {
  teamName: PropTypes.string,
  teamGolds: PropTypes.number,
  teamKills: PropTypes.number,
  teamDeaths: PropTypes.number,
  teamAssists: PropTypes.number,
};

// ----------------------------------------------------------------------

function DetailParticipantItem({ participant }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1} py={0.5} justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1}>
        <RuneIcon
          runeId={participant?.primaryRuneId}
          sx={{ width: 40, height: 40, background: 'gray', borderRadius: 5 }}
        />
        <Spells
          spellD={participant?.spellD}
          spellF={participant?.spellF}
          width={20}
          height={20}
          direction="column"
        />
        <Typography variant="subtitle1">{participant?.championLevel}</Typography>
        <ChampAvatar
          champName={participant?.championName}
          sx={{ width: 45, height: 45, borderRadius: 5, flexShrink: 0, border: '2px solid brown' }}
        />
        <Typography width="250px" variant="body2">
          {participant?.riotIdGameName}
        </Typography>
      </Stack>
      <ItemList items={participant?.items} width={40} height={40} />
      <Box width={20} />
      <Stack direction="row" alignItems="center" spacing={1}>
        <KDA
          kills={participant?.kills}
          deaths={participant?.deaths}
          assists={participant?.assists}
        />
        <Typography variant="subtitle1" width={100} textAlign="center">
          {participant?.totalMinionsKilled}
        </Typography>
        <Typography variant="subtitle1" width={100} textAlign="center">
          {numberWithCommas(participant?.goldEarned)}
        </Typography>
      </Stack>
    </Stack>
  );
}

DetailParticipantItem.propTypes = {
  participant: PropTypes.shape({
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
  }),
};

// ----------------------------------------------------------------------

function MatchDetail({ match }) {
  const [blueTeamParticipants, setBlueTeamParticipants] = useState([]);

  const [redTeamParticipants, setRedTeamParticipants] = useState([]);

  useEffect(() => {
    const blueTeamMembers = [];
    const redTeamMembers = [];
    match?.participantDetails?.forEach((participant) => {
      if (participant.win) {
        blueTeamMembers.push(participant);
      } else {
        redTeamMembers.push(participant);
      }
    });

    setBlueTeamParticipants(blueTeamMembers);
    setRedTeamParticipants(redTeamMembers);
  }, [match]);

  return (
    <Card>
      <Scrollbar>
        <Stack sx={{ padding: 4 }}>
          <TeamParticipants team="TEAM 1" participants={blueTeamParticipants} />
          <TeamParticipants team="TEAM 2" participants={redTeamParticipants} />
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

function TeamParticipants({ team, participants }) {
  const [teamKills, setTeamKills] = useState(0);
  const [teamDeaths, setTeamDeaths] = useState(0);
  const [teamAssists, setTeamAssists] = useState(0);
  const [teamGolds, setTeamGolds] = useState(0);

  useEffect(() => {
    const kills = participants.reduce((p1, p2) => p1.kills + p2.kills);
    const kills = participants.reduce((p1, p2) => p1.kills + p2.kills);
    const kills = participants.reduce((p1, p2) => p1.kills + p2.kills);
    const kills = participants.reduce((p1, p2) => p1.kills + p2.kills);
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
        <DetailParticipantItem key={participant?.puuid} participant={participant} />
      ))}
    </Stack>
  );
}

TeamParticipants.propTypes = {
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
