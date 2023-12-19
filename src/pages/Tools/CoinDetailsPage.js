import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';


// @mui
import { Grid, Button, Container, Stack, Typography, Paper, CircularProgress, Modal, Fade, Box, List, ListItem, ListItemIcon, ListItemText, TextField, FormControl, InputLabel, Select, MenuItem, Input, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { fShortenNumber, fSixDigitNumber } from '../../utils/formatNumber';

// apis
import { getLatestCoinsInfo, getLatestCoinInfo } from '../../api';

// components
import Iconify from '../../components/iconify';

import btcchartData from '../../_mock/btcchart';
import coins from '../../_mock/tools';

export default function CoinDetailsPage() {
  const {id} = useParams()  
  const [selectedPeriod, setSelectedPeriod] = useState('24h')
  
  const [chartData, setChartData] = useState(btcchartData)
  const [isLoading, setIsLoading] = useState(0)

  const labels = chartData.map(data => new Date(data[0] * 1000)); // Converting Unix timestamp to Date
  const dataPoints = chartData.map(data => data[1]);
  const data = {
    labels,
    datasets: [
      {
        label: 'BTC Price',
        data: dataPoints,
        fill: window.innerWidth < 768,
        backgroundColor: 'rgb(220,175,27,0.5)',
        borderColor: 'rgba(220,175,27, 1)',
        lineTension: 0.4,
        pointRadius: 0
      },
    ],
  };
  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          tooltipFormat: 'MM/DD/YYYY',
        },
      },
      y: {
        ticks: {
          callback: (value) => {
            // Check if the screen width is less than a certain threshold (e.g., 768px for mobile)
            if (window.innerWidth < 768) {
              // Format for mobile (e.g., dividing by 1000 to show in 'K' format)
              return value / 1000;
            } 
            // Format for desktop
            return value;
            
          },
          font: {
            size: window.innerWidth < 768 ? 9 : 12
          }
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            size: window.innerWidth < 768 ? 12 : 14
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    
  };

  // Coins Data Fetching
  
  const [coinData, setCoinData] = useState({})

  const updateCoinsData = async () => {
    const {data} = await getLatestCoinsInfo()
    
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
          volume: coin.volume,
          supply: coin.supply,
          marketCap: coin.marketCap
      };
    });
    setCoinData(updatedCoins.filter(coin => coin.id === id)[0])
  }

  
  useEffect(() => {
    // Call the function immediately on mount
    updateCoinsData();
  
    // Then set up the interval for subsequent calls
    const interval = setInterval(() => {
      updateCoinsData();
    }, 2500);
  
    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
    fetchCoinChartData()
  },[selectedPeriod])

  const fetchCoinChartData = async () => {
    setIsLoading(1)
    const {data} = await getLatestCoinInfo({id, period:selectedPeriod})
    setChartData(data)
    setIsLoading(0)
  }


  return (
    <>
      <Helmet>
        <title> CoinSigma | {id} Details </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack style={{touchAction:'none'}} direction="row" alignItems="center" justifyContent="start" mb={1}>
          <Link to={'/dashboard'} style={{textDecoration:'none'}}>
            <Iconify icon={'ic:round-arrow-back'} width={24} height={24} style={{color:'black', marginRight:'16px'}}/>
          </Link>
          <Typography variant="h4" gutterBottom>
            Coin Details
          </Typography>
        </Stack>

        <Grid container>
          <Grid item xs={12} lg={4} sx={{pr:2, mb:4}}>
            <Card
              sx={{
                p: 1,
                px:2,
                boxShadow: 5,
                textAlign: 'center',
                color: '#212427',
                bgcolor: '#fdfdfd',
              }}
            >
              <Grid container alignItems={'center'}>
                <img alt='coin' height={'48px'} src={coinData.icon} />
                <Typography sx={{ml:1}} variant="h4">{coinData.title} ({coinData.symbol})</Typography>
              </Grid>

              <Grid container alignItems={'center'} justifyContent={'center'}>
                <Typography variant="h2">
                  <strong>{fSixDigitNumber(coinData.price)}</strong> 
                </Typography>
                <Typography variant="h4" style={{marginLeft:'8px', marginTop:'16px'}}>
                  USD
                </Typography>
              </Grid>

              <Grid container alignItems={'center'} justifyContent={'center'}>
                <Grid container xs={4} alignContent={'center'} justifyContent={'center'}>
                  <Grid container alignItems={'center'} justifyContent={'center'}>
                    <Iconify color={coinData.priceChange1h < 0 ? '#D30000':'#008000'} icon={coinData.priceChange1h < 0 ?'mdi:menu-down':'mdi:menu-up'} width={36} height={36}/>
                    <Typography sx={{ml:-1}} variant="h6">
                      {fShortenNumber(coinData.priceChange1h)}%
                    </Typography>
                  </Grid>
                  <Grid container alignItems={'center'} justifyContent={'center'}>
                    <Typography variant="body2" sx={{mt:-1}}>
                      Past Hour
                    </Typography>
                  </Grid>
                </Grid>
                
                <Grid container xs={4} alignContent={'center'} justifyContent={'center'}>
                  <Grid container alignItems={'center'} justifyContent={'center'}>
                    <Iconify color={coinData.priceChange1d < 0 ? '#D30000':'#008000'} icon={coinData.priceChange1d < 0 ?'mdi:menu-down':'mdi:menu-up'} width={36} height={36}/>
                    <Typography sx={{ml:-1}} variant="h6">
                      {fShortenNumber(coinData.priceChange1d)}%
                    </Typography>
                  </Grid>
                  <Grid container alignItems={'center'} justifyContent={'center'}>
                    <Typography variant="body2" sx={{mt:-1}}>
                      Past Day
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container xs={4} alignContent={'center'} justifyContent={'center'}>
                  <Grid container alignItems={'center'} justifyContent={'center'}>
                    <Iconify color={coinData.priceChange1w < 0 ? '#D30000':'#008000'} icon={coinData.priceChange1w < 0 ?'mdi:menu-down':'mdi:menu-up'} width={36} height={36}/>
                    <Typography sx={{ml:-1}} variant="h6">
                      {fShortenNumber(coinData.priceChange1w)}%
                    </Typography>
                  </Grid>
                  <Grid container alignItems={'center'} justifyContent={'center'}>
                    <Typography variant="body2" sx={{mt:-1}}>
                      Past Week
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container alignItems={'center'} justifyContent={'center'} sx={{mt:2}}>
                <Grid container xs={4} alignContent={'center'} justifyContent={'center'}>
                  <Grid container alignItems={'center'} justifyContent={'center'}>
                    <strong>${fShortenNumber(coinData.volume/1000000000)}B</strong>
                  </Grid>
                  <Grid container alignItems={'center'} justifyContent={'center'}>
                    <Typography variant="body2" sx={{mt:-1}}>
                      Volume (24h)
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container xs={4} alignContent={'center'} justifyContent={'center'}>
                  <Grid container alignItems={'center'} justifyContent={'center'}>
                    <strong>${fShortenNumber(coinData.marketCap/1000000000)}B</strong>
                  </Grid>
                  <Grid container alignItems={'center'} justifyContent={'center'}>
                    <Typography variant="body2" sx={{mt:-1}}>
                      Market Cap
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container xs={4} alignContent={'center'} justifyContent={'center'}>
                  <Grid container alignItems={'center'} justifyContent={'center'}>
                    <strong>${fShortenNumber(coinData.supply/1000000000)}B</strong>
                  </Grid>
                  <Grid container alignItems={'center'} justifyContent={'center'}>
                    <Typography variant="body2" sx={{mt:-1}}>
                      Circulation Supply
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Grid alignContent={'center'} sx={{mb:2}}>
              <LoadingButton onClick={()=>setSelectedPeriod('24h')} sx={{mr:1, mb:1}} size="medium" type="submit" variant={selectedPeriod==='24h'?'contained':'outlined'}>
                24H
              </LoadingButton>
              <LoadingButton onClick={()=>setSelectedPeriod('1w')} sx={{mr:1, mb:1}} size="medium" type="submit" variant={selectedPeriod==='1w'?'contained':'outlined'}>
                7D
              </LoadingButton>
              <LoadingButton onClick={()=>setSelectedPeriod('1m')} sx={{mr:1, mb:1}} size="medium" type="submit" variant={selectedPeriod==='1m'?'contained':'outlined'}>
                1M
              </LoadingButton>
              <LoadingButton onClick={()=>setSelectedPeriod('3m')} sx={{mr:1, mb:1}} size="medium" type="submit" variant={selectedPeriod==='3m'?'contained':'outlined'}>
                3M
              </LoadingButton>
              <LoadingButton onClick={()=>setSelectedPeriod('6m')} sx={{mr:1, mb:1}} size="medium" type="submit" variant={selectedPeriod==='6m'?'contained':'outlined'}>
                6M
              </LoadingButton>
              <LoadingButton onClick={()=>setSelectedPeriod('1y')} sx={{mr:1, mb:1}} size="medium" type="submit" variant={selectedPeriod==='1y'?'contained':'outlined'}>
                1Y
              </LoadingButton>
              <LoadingButton onClick={()=>setSelectedPeriod('all')} sx={{mb:1}} size="medium" type="submit" variant={selectedPeriod==='all'?'contained':'outlined'}>
                ALL
              </LoadingButton>
            </Grid>
            {isLoading===0?
              <Line data={data} options={options} />
              :
              <h4>Loading Data...</h4>
            }
          </Grid>
        </Grid>


      </Container>
          
    </>
  );
}
