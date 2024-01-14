import axios from 'axios';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';

import { BASE_URL } from 'src/app-config';
import { selectCurrentAccountPuuid } from 'src/redux/slice/accountSlice';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import MatchItem from 'src/components/match-item';
import Loading from 'src/components/loading/loading';
import CustomModal from 'src/components/modal/modal';
import MatchItemDetail from 'src/components/match-item-detail';

import { convertMatch } from './utils';
// ----------------------------------------------------------------------

export default function AppMatchHistory({ title, subheader, ...other }) {
  const currentAccountPuuid = useSelector(selectCurrentAccountPuuid);

  const [loading, setLoading] = useState(false);

  const [matchIds, setMatchIds] = useState([]);

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatchHistory = async () => {
      const matchIdsData = await callRiotMatchHistoryAPI(currentAccountPuuid);
      setMatchIds(matchIdsData);
    };
    if (currentAccountPuuid) {
      setLoading(true);
      fetchMatchHistory();
    } else {
      setMatchIds([]);
      setMatches([]);
    }
  }, [currentAccountPuuid]);

  useEffect(() => {
    const fetchMatches = async () => {
      if (matchIds.length > 0) {
        const matchesData = await callInternalMatchesAPI(matchIds);
        setMatches(matchesData.map((matchData) => convertMatch(matchData)));
      }
    };

    fetchMatches();
    setLoading(false);
  }, [matchIds]);

  const callRiotMatchHistoryAPI = async (puuid) => {
    const url = `${BASE_URL}/riot/lol/matches?puuid=${puuid}&count=20`;
    const { data: result } = await axios.get(url);
    return result.data;
  };

  const callInternalMatchesAPI = async (ids) => {
    const queryString = `?matchIds=${ids.join(',')}`;
    const url = `${BASE_URL}/matches/by-ids${queryString}`;
    const { data: result } = await axios.get(url);
    console.log(result);
    return result.data;
  };

  const [openMatchDetail, setOpenMatchDetail] = useState(false);

  const [selectedMatch, setSelectedMatch] = useState({});

  const handleOpenMatchDetail = (match) => {
    setOpenMatchDetail(true);
    setSelectedMatch(match);
  };

  if (loading) {
    return <Loading type="linear" variant="indeterminate" />;
  }

  return (
    <Box>
      <CustomModal open={openMatchDetail} setOpen={setOpenMatchDetail}>
        <MatchItemDetail match={selectedMatch} />
      </CustomModal>
      <Card {...other}>
        <CardHeader title={title} subheader={subheader} />

        <Scrollbar>
          <Stack sx={{ p: 3, pr: 0 }}>
            {matches?.map((match) => (
              <Box key={match.matchId} onClick={() => handleOpenMatchDetail(match)}>
                <MatchItem match={match} />
                <Divider sx={{ my: 2.5 }} />
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
};
