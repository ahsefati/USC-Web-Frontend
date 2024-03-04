import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack, Grid } from '@mui/material';
// mock
import account from '../../../_mock/account';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
import Iconify from '../../../components/iconify';
//
import navConfig from './config';

// ----------------------------------------------------------------------

const NAV_WIDTH = 240;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 1.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.primary.main, 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  
  let user;
  if (localStorage.getItem('profile')){
    user = JSON.parse(localStorage.getItem('profile'))
    user.result.avatar = `/assets/images/avatars/${user.result.avatar}`
  }else{
    user = false
  }

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >

      <Box sx={{mx: 2.5 }}>
        <h1 style={{fontSize:'200%', marginTop:'12px'}}>USC-WEB</h1>
      </Box>
    
      <Box sx={{ mb: 3, mx: 2.5 }}>
        {user?
          <Link underline="none">
            <StyledAccount>
              <Avatar src={user.result.avatar} alt="photoURL" sx={{width:'50px', height:'50px'}}/>
              <Box sx={{ ml: 1 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {user.result.name.split(" ")[0]}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {"Normal User"}
                </Typography>
              </Box>
            </StyledAccount>
          </Link>
          :
          <Link underline="none">
            <StyledAccount>
              <Iconify icon="ph:user-bold"/>

              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  Not a member yet? <strong><NavLink to={'/signup'}>Signup</NavLink></strong>
                </Typography>
              </Box>
            </StyledAccount>
          </Link>
        }
      </Box>



      <NavSection data={navConfig} />


      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
