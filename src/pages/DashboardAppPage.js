import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import 'moment';
import 'chartjs-adapter-moment';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Card, Link, FormControl, InputLabel, Select, MenuItem, TextField, Modal, Chip, Fade, Box, List, ListSubheader, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useEffect, useState } from 'react';
import { fShortenNumber, fSixDigitNumber } from '../utils/formatNumber';

import CoinsCard from '../sections/@dashboard/app/CoinsCard';
// Data
import coins from '../_mock/tools';

// components
import Iconify from '../components/iconify';

// sections
import { getLatestCoinsInfo, addCash, withdrawCash, buyCoin, sellCoin } from '../api/actions/tools';

// Modal Styles
const styledModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '350px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: '10px',
  border: '0px solid black',
};

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  
  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <>
      <Helmet>
        <title>USC-WEB | Dashboard</title>
      </Helmet>

      <Container maxWidth="xl">
        {user ? 
          <Grid container spacing={3} sx={{mt:1}}>
            <Typography variant="body2">Hi User!</Typography>
          </Grid>
          :
          <Grid container spacing={3} justifyContent='space-around' sx={{mb:10, mt:0}}>
            <Grid item xs={12} md={12}>
              <Card
                sx={{
                  py: 3,
                  boxShadow: 10,
                  textAlign: 'center',
                  color: (theme) => theme.palette.primary.dark,
                  bgcolor: (theme) => theme.palette.error.lighter,
                }}
                
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Iconify icon={'mdi:account-alert-outline'} width={48} height={48} />
                    <Typography variant="h4">{'Are you a user? 🤔'}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.84 }} style={{marginBottom:'25px'}}>
                      {'It seems that you are not a user! Please create your account or login to use all the features.'}
                    </Typography>
                    <Link component={RouterLink} to='/login'>
                      <LoadingButton sx={{mr:1}} size="large" type="submit" variant="contained">
                        Login
                      </LoadingButton>
                    </Link>
                    <Link component={RouterLink} to='/signup'>
                      <LoadingButton size="large" type="submit" variant="text">
                        Signup
                      </LoadingButton>
                    </Link>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        }
      </Container>
    </>
  );
}
