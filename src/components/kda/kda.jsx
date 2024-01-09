import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


export default function KDA({ kills, deaths, assists, height }) {
    return (
      <Stack direction="row">
        <Typography
          variant="subtitle1"
          sx={
            height ? { height, width: 25, textAlign: 'center' } : { width: 25, textAlign: 'center' }
          }
        >
          {kills}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={
            height ? { height, width: 15, textAlign: 'center' } : { width: 15, textAlign: 'center' }
          }
        >
          /
        </Typography>
        <Typography
          variant="subtitle1"
          sx={
            height ? { height, width: 25, textAlign: 'center' } : { width: 25, textAlign: 'center' }
          }
        >
          {deaths}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={
            height ? { height, width: 15, textAlign: 'center' } : { width: 15, textAlign: 'center' }
          }
        >
          /
        </Typography>
        <Typography
          variant="subtitle1"
          sx={
            height ? { height, width: 25, textAlign: 'center' } : { width: 25, textAlign: 'center' }
          }
        >
          {assists}
        </Typography>
      </Stack>
    );
  }
  
  KDA.propTypes = {
    kills: PropTypes.number,
    deaths: PropTypes.number,
    assists: PropTypes.number,
    height: PropTypes.number,
  };