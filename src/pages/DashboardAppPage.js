import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import 'moment';
import 'chartjs-adapter-moment';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Divider, Card, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useEffect, useState } from 'react';
import { fShortenNumber, fSixDigitNumber } from '../utils/formatNumber';

import CoinsCard from '../sections/@dashboard/app/CoinsCard';
// Data
import coins from '../_mock/tools';

// components
import Iconify from '../components/iconify';

// sections
import { getToolsInfo, getLatestCoinsInfo } from '../api/actions/tools';


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  
  const user = JSON.parse(localStorage.getItem('profile'))

  const [coinsData, setCoinsData] = useState(coins)

  const updateCoinsData = async () => {
    const data = await getLatestCoinsInfo()
    const updatedCoins = data.map(coin => {
      // Find the corresponding mock coin data
      const mockCoin = coins.find(mockcoin => mockcoin.id === coin.id);

      // Return a new object combining the mock data and the updated values
      return {
          ...mockCoin,
          price: coin.price,
          priceChange1h: coin.priceChange1h,
          priceChange1d: coin.priceChange1d,
          priceChange1w: coin.priceChange1w,
          balance: user?.result.wallet.filter(currency => currency.id===coin.id)[0].balance.$numberDecimal
      };
    });
    
    setCoinsData(updatedCoins)
  }

  useEffect(() => {
    // Call the function immediately on mount
    updateCoinsData();
  
    // Then set up the interval for subsequent calls
    const interval = setInterval(() => {
      updateCoinsData();
    }, 1000);
  
    
    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
    
    
  }, []);
  
  const labels = coinsData.filter(item => item.balance > 0).map(item => item.title)
  const shares = coinsData.filter(item => item.balance > 0).map(item => parseFloat(item.balance)*parseFloat(item.price))
  const sumOfShares = shares.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
  const adjPie = shares?.map(share => (100*share/sumOfShares))
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'];
  const dataPie = {
    labels,
    datasets: [{
      data: adjPie,
      backgroundColor: colors,
      hoverBackgroundColor: colors,
    }],
  };
  const dataBar = {
    labels,
    datasets: [{
      data: shares,
      backgroundColor: colors,
      hoverBackgroundColor: colors,
    }],
  };

  const optionsBar = {
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false
      }
    }
  }

  return (
    <>
      <Helmet>
        <title> Dashboard | KOOCH </title>
      </Helmet>

      <Container maxWidth="xl">
        {user ? 
          <Grid container spacing={3} justifyContent='space-around' sx={{mb:10, mt:0}}>
            <Grid item xs={12} md={12}>
              <Card
                sx={{
                  py: 1,
                  boxShadow: 10,
                  textAlign: 'center',
                  color: (theme) => theme.palette.primary.dark,
                  bgcolor: (theme) => theme.palette.primary.lighter,
                }}
                
              >
                <Grid container>
                  <Typography variant='h4' sx={{px:2, mb:1}}>Your Portfolio</Typography>
                </Grid>
                {shares.length > 0 ?
                  <Grid container alignItems={'center'}>
                    <Grid item xs={12} md={5} lg={3} xl={3}>
                        <>
                          <Pie data={dataPie} />
                          <h5>Shares of Coins (%)</h5>
                        </>
                    </Grid>
                    <Grid item xs={12} md={7} lg={5} xl={5}>
                        <>
                          <h2>Live Balance: ${fSixDigitNumber(shares.reduce((a,b) => a+b))}</h2>
                          <Bar data={dataBar} options={optionsBar}/>
                          <h5>Stock of Coins ($)</h5>
                        </>
                    </Grid>
                  </Grid>
                  :
                  <h5>You don't have anything in you wallet yet.</h5>
                }
              </Card>
            </Grid>
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

        <Grid container spacing={3}>

          {coinsData.map((coin) => (
              <Grid key={coin.id} item xs={12} sm={6} md={4} lg={4} xl={3}>
                <CoinsCard coin={coin}/>
              </Grid>
            ))
          }
          
        </Grid>

      </Container>
    </>
  );
}
