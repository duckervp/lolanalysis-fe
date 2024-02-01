import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';

import { fetchVersion } from 'src/utils/riot-image-asset';

import { BASE_URL } from 'src/app-config';
import { selectCurrentAccountPuuid } from 'src/redux/slice/accountSlice';

import ChampionMastery from 'src/components/champion-mastery';

import AppMatchHistory from '../app-match-history';
import AppDetailSummary from '../app-detail-summary';
import AppWidgetSummary from '../app-widget-summary';
import AppSummonerProfile from '../app-summoner-profile';

// ----------------------------------------------------------------------

export default function AppView() {
  const [summonerInfo, setSummonerInfo] = useState({});
  const [indexes, setIndexes] = useState({});
  const [lolCurrentVersion, setLolCurrentVersion] = useState();
  const puuid = useSelector(selectCurrentAccountPuuid);

  useEffect(() => {
    const getLOLVersion = async () => {
      const versions = await fetchVersion();
      const currentVersion = versions.length > 0 ? versions.at(0) : undefined;
      setLolCurrentVersion(currentVersion);
    };

    getLOLVersion();
  }, []);

  useEffect(() => {
    const initialize = () => {
      const indexesPromise = axios.get(`${BASE_URL}/statistics/${puuid}/indexes?count=10`);
      const summonerInfoPromise = axios.get(`${BASE_URL}/riot/lol/summoners/${puuid}`);

      Promise.all([summonerInfoPromise, indexesPromise]).then((values) => {
        const [summonerInfoResult, indexesResult] = values;
        setSummonerInfo(summonerInfoResult.data.data);
        setIndexes(indexesResult.data.data);
      });
    };

    if (puuid) {
      initialize();
    }
  }, [puuid]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <AppSummonerProfile summonerInfo={summonerInfo} version={lolCurrentVersion} />
        </Grid>

        <Grid xs={12} md={6}>
          <ChampionMastery lolCurrentVersion={lolCurrentVersion} puuid={puuid} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Victory"
            total={indexes?.totalWin}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Kills"
            total={indexes?.totalKills}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Deaths"
            total={indexes?.totalDeaths}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Assists"
            total={indexes?.totalAssists}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={12} lg={8}>
          <AppMatchHistory title="Match History" />
        </Grid>

        <Grid xs={12} md={12} lg={4}>
          <Card
            component={Stack}
            spacing={3}
            direction="row"
            sx={{
              px: 3,
              py: 5,
              borderRadius: 2,
            }}
          >
            <Stack spacing={2}>
              <AppDetailSummary
                title="Unique Champ Played"
                total={indexes?.totalUniqueChampPlayed}
              />
              <AppDetailSummary title="First Blood Kills" total={indexes?.totalFirstBloodKills} />
              <AppDetailSummary title="Double Kills" total={indexes?.totalDoubleKills} />
              <AppDetailSummary title="Triple Kills" total={indexes?.totalTripleKills} />
              <AppDetailSummary title="Quadra Kills" total={indexes?.totalQuadraKills} />
              <AppDetailSummary title="Penta Kills" total={indexes?.totalPentaKills} />
              <AppDetailSummary title="Total Gold Eearned" total={indexes?.totalGoldEarned} />
              <AppDetailSummary title="Total Damage Dealt" total={indexes?.totalDamageDealt} />
              <AppDetailSummary title="Total Damage Taken" total={indexes?.totalDamageTaken} />
              <AppDetailSummary
                title="Total Dead Time"
                total={indexes?.totalTimeSpentDead}
                isTimeField
              />
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
