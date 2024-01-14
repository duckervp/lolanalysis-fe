import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { numberWithCommas } from 'src/utils/format-number';

import { selectCurrentAccountPuuid } from 'src/redux/slice/accountSlice';

import { Spells, RuneIcon, ChampAvatar } from 'src/components/match-history-icon';

import KDA from '../kda';
import ItemBoxList from '../match-item/item-box-list';

export default function DetailParticipantItem({ participant, version }) {
  const currentAccountPuuid = useSelector(selectCurrentAccountPuuid);

  return (
    <Stack direction="row" alignItems="center" spacing={1} py={0.5} justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1}>
        <RuneIcon
          runeId={participant?.primaryRuneId}
          version={version}
          sx={{ width: 40, height: 40, background: 'gray', borderRadius: 0.5 }}
        />
        <Spells
          spellD={participant?.spellD}
          spellF={participant?.spellF}
          version={version}
          width={20}
          height={20}
          direction="column"
        />
        <Typography
          variant="subtitle1"
          color={getDetailParticipantColor(participant, currentAccountPuuid)}
        >
          {participant?.championLevel}
        </Typography>
        <ChampAvatar
          champName={participant?.championName}
          version={version}
          sx={{
            width: 45,
            height: 45,
            borderRadius: 5,
            flexShrink: 0,
            border: '2px solid SlateGrey',
          }}
        />
        <Typography
          width="250px"
          variant="body2"
          color={getDetailParticipantColor(participant, currentAccountPuuid)}
        >
          {participant?.riotIdGameName}
        </Typography>
      </Stack>
      <ItemBoxList items={participant?.items} version={version} width={40} height={40} />
      <Box width={20} />
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        color={getDetailParticipantColor(participant, currentAccountPuuid)}
      >
        <KDA
          kills={participant?.kills}
          deaths={participant?.deaths}
          assists={participant?.assists}
          height={14}
        />
        <Typography
          variant="subtitle1"
          width={100}
          textAlign="center"
          color={getDetailParticipantColor(participant, currentAccountPuuid)}
        >
          {participant?.totalMinionsKilled}
        </Typography>
        <Typography
          variant="subtitle1"
          width={100}
          textAlign="center"
          color={getDetailParticipantColor(participant, currentAccountPuuid)}
        >
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
  version: PropTypes.string,
};

const getDetailParticipantColor = (participant, currentAccountPuuid) =>
  participant.puuid === currentAccountPuuid ? 'GoldenRod' : 'black';
