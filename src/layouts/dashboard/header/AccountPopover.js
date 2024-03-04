import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import Iconify from '../../../components/iconify/Iconify';

// mocks_
import account from '../../../_mock/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS_LOGGEDIN = [
  {
    label: 'Dashboard',
    icon: 'eva:home-fill',
    to: '/dashboard'
  },
  {
    label: 'Settings',
    icon: 'eva:person-fill',
    to:'/dashboard/userprofile'
  },
  {
    label: 'Help',
    icon: 'eva:person-fill',
    to:'/dashboard/savedtools'
  },
];

const MENU_OPTIONS_LOGGEDOUT = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    to: '/dashboard'
  },
  {
    label: 'Login',
    icon: 'eva:person-fill',
    to:'/login'
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  let user;
  if (localStorage.getItem('profile')){
    user = JSON.parse(localStorage.getItem('profile'))
    user.result.avatar = `/assets/images/avatars/${user.result.avatar}`
  }else{
    user = false
  }

  const [open, setOpen] = useState(null);
  const navigate = useNavigate()

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClick = (action) => {
    setOpen(null)
    navigate(action, { replace: true });
  }
  const handleClose = () => {
    setOpen(null)
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/dashboard')
    window.location.reload(false); 
    setOpen(null);
  };

  return (
    <>
    {user ?
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[300], 0.6),
            },
          }),
        }}
      >
        <Avatar src={user.result.avatar} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            Hi, {user.result.name.split(" ")[0]}!
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user.result.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS_LOGGEDIN.map((option) => (
            <MenuItem key={option.label} onClick={()=>handleClick(option.to)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </> 

    :
      <>
        <IconButton
            onClick={handleOpen}
            sx={{
              p: 0,
              ...(open && {
                '&:before': {
                  zIndex: 1,
                  content: "''",
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  position: 'absolute',
                  bgcolor: (theme) => alpha(theme.palette.grey[300], 0.6),
                },
              }),
            }}
          >
           <Iconify icon="ph:user-bold"/>
        </IconButton>

        <Popover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              p: 0,
              mt: 1.5,
              ml: 0.75,
              width: 180,
              '& .MuiMenuItem-root': {
                typography: 'body2',
                borderRadius: 0.75,
              },
            },
          }}
        >
          <Box sx={{ my: 1.5, px: 2.5 }}>
            <Typography variant="subtitle2" noWrap>
              Hi, Friend!
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              Please signup/login.
            </Typography>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack sx={{ p: 1 }}>
            {MENU_OPTIONS_LOGGEDOUT.map((option) => (
              <MenuItem key={option.label} onClick={()=>handleClick(option.to)}>
                {option.label}
              </MenuItem>
            ))}
          </Stack>
        </Popover>
      </>
    }

    </>
  );
}
