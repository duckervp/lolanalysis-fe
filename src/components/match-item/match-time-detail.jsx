import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PanoramaFishEyeTwoToneIcon from '@mui/icons-material/PanoramaFishEyeTwoTone';

import { fDate, fDateTime, fToMinuteSecondString } from 'src/utils/format-time';

export default function MatchTimeDetail({ gameCreation, gameDuration, gameCreationTime }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography variant="body2">{fToMinuteSecondString(gameDuration)}</Typography>
      <PanoramaFishEyeTwoToneIcon style={{ fontSize: 7 }} />
      <Typography variant="body2">{fDate(gameCreation, 'dd/MM/yyyy')}</Typography>
      {gameCreationTime && <PanoramaFishEyeTwoToneIcon style={{ fontSize: 7 }} />}
      {gameCreationTime && <Typography variant="body2">{fDateTime(gameCreation, 'p')}</Typography>}
    </Stack>
  );
}

MatchTimeDetail.propTypes = {
  gameCreation: PropTypes.number,
  gameDuration: PropTypes.number,
  gameCreationTime: PropTypes.bool,
};
