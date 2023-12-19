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
  
  let user = JSON.parse(localStorage.getItem('profile'))

  const [coinsData, setCoinsData] = useState(coins)

  const updateCoinsData = async () => {
    user = JSON.parse(localStorage.getItem('profile'))
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
    }, 2000);
  
    
    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
    
    
  }, []);
  
  const labels = coinsData.filter(item => item.balance > 0).map(item => item.title)
  const shares = coinsData.filter(item => item.balance > 0).map(item => parseFloat(item.balance)*parseFloat(item.price))
  const coinBalance = shares.length > 0 ? shares.reduce((a,b) => a+b) : 0
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


  // Modal state for handling cash
  const [openModalToHandleCash, setOpenModalToHandleCash] = useState(0)
  const [valueToHandleCash, setValueToHandleCash] = useState(0)
  const [isLoadingForHandlingCash, setIsLoadingForHandlingCash] = useState(false)
  const handleCash = async () => {
    setIsLoadingForHandlingCash(true)
    if (openModalToHandleCash===1){
      const cashData = await addCash({valueToDeposit: valueToHandleCash})
      console.log(cashData)
      localStorage.setItem('profile', JSON.stringify({...cashData}))
    }else{
      const cashData = await withdrawCash({valueToWithdraw: valueToHandleCash})
      console.log(cashData)
      localStorage.setItem('profile', JSON.stringify({...cashData}))
    }
    setIsLoadingForHandlingCash(false)
    setOpenModalToHandleCash(0)
  }

  const handleCoin = async () => {
    if (operationMode===0){
      const coinData = await buyCoin({valueToHandleCoin, idToHandleCoin})
      localStorage.setItem('profile', JSON.stringify({...coinData}))
    }else{
      const coinData = await sellCoin({valueToHandleCoin, idToHandleCoin})
      localStorage.setItem('profile', JSON.stringify({...coinData}))
    }
    updateCoinsData()
    setOpenModalToHandleCoins(0)
  }

  // Modal for handling coin
  const [openModalToHandleCoins, setOpenModalToHandleCoins] = useState(0)
  const [idToHandleCoin, setIdToHandleCoin] = useState("bitcoin")
  const [valueToHandleCoin, setValueToHandleCoin] = useState(0)
  const [disableSendingOffer, setDisableSendingOffer] = useState(false)
  const [operationMode, setOperationMode] = useState(0)

  const handleOnChangeBuySellAmount = (value) => {
    setValueToHandleCoin(value)
    if (operationMode===0 && value > parseFloat(user?.result.cashBalance.$numberDecimal)){
      setDisableSendingOffer(true)
    }else if (operationMode===0 && value < parseFloat(user?.result.cashBalance.$numberDecimal)){
      setDisableSendingOffer(false)
    }

    if (operationMode===1 && value > parseFloat(coinsData.filter(coin=>coin.id===idToHandleCoin)[0].balance)){
      setDisableSendingOffer(true)
    } else if (operationMode===1 && value < parseFloat(coinsData.filter(coin=>coin.id===idToHandleCoin)[0].balance)) {
      setDisableSendingOffer(false)
    }
  }



  return (
    <>
      <Helmet>
        <title>CoinSigma | Dashboard</title>
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
                  <Grid container alignItems={'center'} justifyContent={'space-evenly'}>
                    <Grid item xs={12} md={12} lg={4} xl={4}>
                      <Grid container alignItems={'center'}>
                        <Grid item xs={12}>
                          <h3>Total Balance:</h3>
                          <h1 style={{marginTop:'-18px'}}>${fSixDigitNumber(parseFloat(shares.reduce((a,b) => a+b)) + parseFloat(user?.result.cashBalance.$numberDecimal))}</h1>
                        </Grid>
                        <Grid item sx={{mt:-3}} xs={6}>
                          <h3>Crypto Balance:</h3>
                          <h2 style={{marginTop:'-18px'}}>${fSixDigitNumber(coinBalance)} </h2>
                        </Grid>
                        <Grid item sx={{mt:-3}} xs={6}>
                          <h3>Cash Balance:</h3>
                          <h2 style={{marginTop:'-18px'}}>${fSixDigitNumber(parseFloat(user?.result.cashBalance.$numberDecimal))}</h2>
                        </Grid>
                        <Grid container justifyContent={'center'}>
                          <Grid item xs={8}>
                            <hr/>
                          </Grid>
                        </Grid>
                        <Grid container justifyContent={'center'}>
                          <Grid item xs={11} lg={7} >
                            <LoadingButton onClick={()=>setOpenModalToHandleCash(1)} sx={{mb:1}} fullWidth variant='contained' color='primary'>
                              Deposit
                            </LoadingButton>
                            <LoadingButton onClick={()=>setOpenModalToHandleCash(2)} sx={{mb:1}} fullWidth variant='contained' color='error'>
                              Withdraw
                            </LoadingButton>
                            <LoadingButton onClick={()=>setOpenModalToHandleCoins(1)} sx={{mb:2}} fullWidth variant='contained' color='warning'>
                              Buy/Sell Coins
                            </LoadingButton>
                          </Grid>
                          
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={5} lg={3} xl={3} sx={{ml:-2}}>
                        <Pie data={dataPie} />
                        <h5>Shares of Coins (%)</h5>
                    </Grid>
                    <Grid item xs={12} md={7} lg={5} xl={5} sx={{mr:2}}>
                        <h2>Live Balance: ${fSixDigitNumber(shares.reduce((a,b) => a+b))}</h2>
                        <Bar data={dataBar} options={optionsBar}/>
                        <h5>Stock of Coins ($)</h5>
                    </Grid>
                  </Grid>
                  :
                  <Grid container justifyContent={'center'}>
                    <Grid xs={12} md={6} lg={6}>
                      <h3>You don't have anything in you wallet yet.</h3>
                    </Grid>
                    <Grid item xs={11} lg={3} >
                      <LoadingButton onClick={()=>setOpenModalToHandleCash(1)} sx={{mb:1}} fullWidth variant='contained' color='primary'>
                        Deposit
                      </LoadingButton>
                      <LoadingButton onClick={()=>setOpenModalToHandleCash(2)} sx={{mb:1}} fullWidth variant='contained' color='error'>
                        Withdraw
                      </LoadingButton>
                      <LoadingButton onClick={()=>setOpenModalToHandleCoins(1)} sx={{mb:2}} fullWidth variant='contained' color='warning'>
                        Buy/Sell Coins
                      </LoadingButton>
                    </Grid>
                    
                  </Grid>                   
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



        {/* Modal to handle cash */}
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModalToHandleCash}
            onClose={()=>setOpenModalToHandleCash(0)}
            closeAfterTransition
        >
          <Fade in={openModalToHandleCash}>
            <Box sx={styledModal}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                {openModalToHandleCash===1 && "Deposit Money"}
                {openModalToHandleCash===2 && "Withdraw Money"}
              </Typography>
              <Grid container alignItems={'center'} spacing={1} sx={{mt:2, maxHeight:'450px', overflow:'auto',}}>
                <Grid item xs={1}><h1>$</h1></Grid>
                <Grid item xs={11}>
                  <TextField fullWidth label={openModalToHandleCash===1?"Value to Deposit":"Value to Withdraw"} onChange={(e)=>setValueToHandleCash(e.target.value)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{mt:1}} justifyContent="space-around">
                  <Grid item>
                    <LoadingButton color='error' onClick={()=>setOpenModalToHandleCash(0)}>
                      Close
                    </LoadingButton>
                  </Grid>
                  <Grid item xs={8}>
                    <LoadingButton loading={isLoadingForHandlingCash} sx={{width:'100%'}} variant="contained" onClick={handleCash}>
                      {openModalToHandleCash===2 && 'Withdraw'}
                      {openModalToHandleCash===1 && 'Deposit'}
                    </LoadingButton>
                  </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>


        {/* Modal for Coin Selling/Buying */}
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModalToHandleCoins}
            onClose={()=>setOpenModalToHandleCoins(0)}
            closeAfterTransition
        >
          <Fade in={openModalToHandleCoins}>
            <Box sx={styledModal}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Buy/Sell Coins
              </Typography>
              <Grid container alignItems={'center'} justifyContent={'center'} sx={{mt:2}}>
                <Grid item xs={5} sx={{mr:2}}>
                  <Select
                    labelId="Select the Language Exam"
                    fullWidth
                    id="Which language exam are you going to take?"
                    value={idToHandleCoin}
                    label="Select the Language Exam"
                    onChange={(e) => setIdToHandleCoin(e.target.value)}
                  >
                    <MenuItem value={"bitcoin"}>BTC</MenuItem>
                    <MenuItem value={"ethereum"}>ETH</MenuItem>
                    <MenuItem value={"tether"}>USDT</MenuItem>
                    <MenuItem value={"binance-coin"}>BNB</MenuItem>
                    <MenuItem value={"solana"}>SOL</MenuItem>
                    <MenuItem value={"cardano"}>ADA</MenuItem>
                    <MenuItem value={"usd-coin"}>USDC</MenuItem>
                    <MenuItem value={"ripple"}>XRP</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <LoadingButton onClick={()=>setOperationMode(0)} variant={operationMode===0?"contained":"outlined"} color='primary'>
                    Buy
                  </LoadingButton>
                  <LoadingButton onClick={()=>setOperationMode(1)} sx={{ml:1}} variant={operationMode===1?"contained":"outlined"} color='primary'>
                    Sell
                  </LoadingButton>
                </Grid>
              </Grid>
              <Grid container justifyContent={'center'} alignItems={'center'} sx={{mt:2}}>
                <Grid container justifyContent={'center'}>
                  <Grid item xs={8}>
                    <TextField fullWidth onChange={(e)=>handleOnChangeBuySellAmount(e.target.value)} label={operationMode===0?"Value to Buy":"Selling Amount"} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                  </Grid>
                  <Grid item xs={1} sx={{mr:1, ml:operationMode===0?1:1, mt:1}}>
                    <Iconify width="30px" icon="mdi:arrow-right-bold-outline" />
                  </Grid>
                  <Grid item xs={2}>
                    {operationMode===1?
                      <img alt='dollar' height={'45px'} src={"/assets/images/coins/dollar.jpg"} />
                      :
                      <img alt='coin' height={'45px'} src={coinsData.filter(coin=>coin.id===idToHandleCoin)[0].icon} />
                    }
                  </Grid>
                </Grid>

                <Grid container justifyContent={'space-between'}>
                  <Grid order={4} item xs={8} sx={{ml:1}}>
                    {operationMode===0?
                      <Typography color={disableSendingOffer?'red':'inherit'} variant='body2'>Available: ${fSixDigitNumber(parseFloat(user?.result.cashBalance.$numberDecimal))}</Typography>
                      :
                      <Typography color={disableSendingOffer?'red':'inherit'} variant='body2'>Available: {coinsData.filter(coin=>coin.id===idToHandleCoin)[0].balance}</Typography>
                    }
                  </Grid>
                  <Grid order={4} item xs={3}>
                    {operationMode===0?
                      <Typography sx={{ml:2}} variant='body2'>{fSixDigitNumber(parseFloat(valueToHandleCoin/coinsData.filter(coin=>coin.id===idToHandleCoin)[0].price))}</Typography>
                      :
                      <Typography sx={{ml:2}} variant='body2'>{fSixDigitNumber(valueToHandleCoin*coinsData.filter(coin=>coin.id===idToHandleCoin)[0].price)}</Typography>
                    }
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{mt:1}} justifyContent="space-around">
                  <Grid item>
                    <LoadingButton color='error' onClick={()=>setOpenModalToHandleCoins(0)}>
                      Close
                    </LoadingButton>
                  </Grid>
                  <Grid item xs={8}>
                    <LoadingButton disabled={disableSendingOffer} loading={isLoadingForHandlingCash} sx={{width:'100%'}} variant="contained" onClick={handleCoin}>
                      Send Offer
                    </LoadingButton>
                  </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
      </Container>
    </>
  );
}
