import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography, Button, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom'; // If using react-router-dom

import Logo from '../../../components/logo';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------
const NAV_WIDTH = 280;

const HEADER_MOBILE = 48;

const HEADER_DESKTOP = 72;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100%)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
  },
  ...bgBlur({ color: theme.palette.background.header}),
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  
  let user;
  if (localStorage.getItem('profile')){
    user = JSON.parse(localStorage.getItem('profile'))
    // user.result.avatar = `/assets/images/avatars/${user?.result?.avatar}` || "/assets/images/avatars/avatar_13.jpg"
  }else{
    user = false
  }

  return (
    <StyledRoot>
      <StyledToolbar>
        {/* <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton> */}
        <Box sx={{display:{xs:'none', lg:'block'}}}>
          <Stack direction={'row'}>
              <Logo sx={{marginTop:'10px', height:'70px'}}/>
              <h1 style={{color:'#990000', fontSize:'39px', fontFamily:'adobe caslon pro', margin:'25px 0px 5px 5px'}}>USC</h1>
          </Stack>
        </Box>
        <Box sx={{display:{xs:'block', lg:'none'}}}>
          <Stack direction={'row'}>
              <Logo sx={{marginTop:'12px', height:'50px'}}/>
              <h2 style={{color:'#990000', fontFamily:'adobe caslon pro', fontSize:'32px', margin:'20px 0px 0px 0px'}}>USC</h2>
          </Stack>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 0.5,
          }}
        >
          <LanguagePopover />
          {user &&
            <NotificationsPopover />
          }
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
