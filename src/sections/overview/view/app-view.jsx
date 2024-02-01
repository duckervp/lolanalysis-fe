import axios from 'axios';
import { faker } from '@faker-js/faker';
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

import Iconify from 'src/components/iconify';
import ChampionMastery from 'src/components/champion-mastery';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppMatchHistory from '../app-match-history';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppDetailSummary from '../app-detail-summary';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
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

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
