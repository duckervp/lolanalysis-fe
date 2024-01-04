import * as React from 'react';
import PropTypes from 'prop-types';

import { Card, Stack, CardHeader } from '@mui/material';

import Scrollbar from 'src/components/scrollbar';
import CustomModal from 'src/components/modal/modal';

export default function AppMatchDetailModal({ open, setOpen }) {
  return (
    <CustomModal open={open} setOpen={setOpen}>
      <MatchDetail title="1" subheader="2" />
    </CustomModal>
  );
}

AppMatchDetailModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

const MatchDetail = ({ title, subheader }) => {
  <Card>
    <CardHeader title={title} subheader={subheader} />

    <Scrollbar>
      <Stack sx={{ p: 3, pr: 0 }}>
        <Stack sx={{ p: 3, pr: 0 }}>team xanh</Stack>
        <Stack sx={{ p: 3, pr: 0 }}>team do</Stack>
      </Stack>
    </Scrollbar>
  </Card>;
};

MatchDetail.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
};
