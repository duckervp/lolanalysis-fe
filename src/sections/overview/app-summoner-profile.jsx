import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ProfileIcon from 'src/components/match-history-icon/profile-icon';

// ----------------------------------------------------------------------

export default function AppSummonerProfile({ summonerInfo, version }) {
  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        height: 250,
        alignItems: 'center',
      }}
    >
      <Stack direction="row" spacing={5}>
        <ProfileIcon
          profileIconId={summonerInfo?.profileIconId}
          version={version}
          sx={{ width: 100, height: 100 }}
        />
        <Stack spacing={0.5}>
          <Typography variant="h4">{summonerInfo?.name}</Typography>

          <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
            Level {summonerInfo?.summonerLevel}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

AppSummonerProfile.propTypes = {
  summonerInfo: PropTypes.object,
  version: PropTypes.string,
};
