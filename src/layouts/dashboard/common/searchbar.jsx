import axios from 'axios';
import { useState } from 'react';

import Slide from '@mui/material/Slide';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { bgBlur } from 'src/theme/css';
import { BASE_URL, ACCOUNT_ATTR } from 'src/app-config';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled('div')(({ theme }) => ({
  ...bgBlur({
    color: theme.palette.background.default,
  }),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [open, setOpen] = useState(false);

  const [searchValue, updateSearchValue] = useState();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchValueChange = (e) => {
    updateSearchValue(e.target.value);
  };

  const handleSearchButtonClick = () => {
    const searchParts = searchValue.split('#');
    if (searchParts.length !== 2) {
      alert("Wrong Riot ID (ex: GameName#TagLine)");
    }

    const [gameName, tagLine] = searchParts;
    if (localStorage.getItem(ACCOUNT_ATTR)) {
      const currentAccount = JSON.parse(localStorage.getItem(ACCOUNT_ATTR));
      if (currentAccount.gameName !== gameName || currentAccount.tagLine !== tagLine) {
        callRiotAccountApi(gameName, tagLine);
      }
    } else {
      callRiotAccountApi(gameName, tagLine);
    }
    handleClose();
  };

  const callRiotAccountApi = async (gameName, tagLine) => {
    console.log("Call api");
    const url = `${BASE_URL}/riot/accounts?gameName=${gameName}&tagLine=${tagLine}`;
    const { data: result } = await axios.get(url);
    localStorage.setItem("current-account", JSON.stringify(result.data));
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open && (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" />
          </IconButton>
        )}

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <StyledSearchbar>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
              defaultValue={searchValue}
              onChange={handleSearchValueChange}
            />
            <Button variant="contained" onClick={handleSearchButtonClick}>
              Search
            </Button>
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
