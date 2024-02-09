import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function AppDetailSummary({ title, total, isTimeField }) {
  return (
    <Stack spacing={5} direction="row" justifyContent="space-between">
      <Typography variant="h6" sx={{ color: 'text.disabled' }}>
        {title}:
      </Typography>
      {isTimeField && <Typography variant="h6">{(Math.round(total / 60 * 100) / 100).toFixed(2)}mins</Typography>}
      {!isTimeField && (
        <Typography variant="h6">{total === 0 ? 0 : fShortenNumber(total)}</Typography>
      )}
    </Stack>
  );
}

AppDetailSummary.propTypes = {
  title: PropTypes.string,
  total: PropTypes.number,
  isTimeField: PropTypes.bool,
};
