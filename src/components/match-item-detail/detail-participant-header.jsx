import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { numberWithDot } from 'src/utils/format-number';

import { GoldIcon, AttackIcon, MinionsIcon } from 'src/components/match-history-icon';

import KDA from '../kda';

export default function DetailParticipantHeader({
  teamName,
  teamGolds,
  teamKills,
  teamDeaths,
  teamAssists,
}) {
  const iconSize = 15;
  return (
    <Stack direction="row" alignItems="center" spacing={1} py={2} justifyContent="space-between">
      <Stack sx={{ width: 366.27 }} direction="row" justifyContent="space-between">
        <Typography variant="subtitle1" color={teamName.includes('1') ? 'blue' : 'red'}>
          {teamName}
        </Typography>
        <Stack direction="row" alignItems="center" color={teamName.includes('1') ? 'blue' : 'red'}>
          <KDA kills={teamKills} deaths={teamDeaths} assists={teamAssists} height={22} />
          <Box width={5} />
          <AttackIcon sx={{ width: iconSize, height: iconSize }} />
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" sx={{ width: 273 }} justifyContent="center">
        <Typography variant="subtitle1" mr={0.5} color="GrayText">
          {numberWithDot(teamGolds)}
        </Typography>
        <GoldIcon sx={{ height: iconSize }} />
      </Stack>
      <Box width={20} />
      <Stack direction="row" alignItems="center" spacing={1}>
        <Stack width={100} alignItems="center" justifyContent="center">
          <AttackIcon sx={{ width: iconSize, height: iconSize }} />
        </Stack>
        <Stack width={100} alignItems="center" justifyContent="center">
          <MinionsIcon sx={{ width: iconSize, height: iconSize }} />
        </Stack>
        <Stack width={100} alignItems="center" justifyContent="center">
          <GoldIcon sx={{ height: iconSize }} />
        </Stack>
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
