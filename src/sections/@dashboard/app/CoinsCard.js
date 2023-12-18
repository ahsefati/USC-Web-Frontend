import { useEffect, useState } from 'react';
import { Link as ReactRouter, useNavigate } from 'react-router-dom';
// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Divider, Typography, Grid, Link } from '@mui/material';

import Iconify from '../../../components/iconify';
import { fCurrency, fShortenNumber, fSixDigitNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

CoinsCard.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  sx: PropTypes.object,
  link: PropTypes.string
};

export default function CoinsCard ({coin}) {
  const user = JSON.parse(localStorage.getItem('profile'))

  const navigate = useNavigate()

  const handleNotAUser = () => {
    navigate('/login')
  }


  return (
    <Link component={ReactRouter} underline='none' to={`/dashboard/coindetails/${coin.id}`}>
      <Card
        sx={{
          p: 1,
          px:1,
          boxShadow: 5,
          textAlign: 'center',
          color: '#212427',
          bgcolor: '#fdfdfd',
        }}
      >
        <Grid container alignItems={'center'}>
          <img alt={"bitcoin"} height={'48px'} src={coin.icon} />
          <Typography sx={{ml:1}} variant="h4">{coin.title}</Typography>
        </Grid>

        <Grid container alignItems={'center'} justifyContent={'center'}>
          <Typography variant="h2">
            <strong>{fSixDigitNumber(coin.price)}</strong> 
          </Typography>
          <Typography variant="h4" style={{marginLeft:'8px', marginTop:'16px'}}>
            USD
          </Typography>
        </Grid>

        <Grid container alignItems={'center'} justifyContent={'center'}>
          <Grid container xs={4} alignContent={'center'} justifyContent={'center'}>
            <Grid container alignItems={'center'} justifyContent={'center'}>
              <Iconify sx={{ml:-1}} color={coin.priceChange1h < 0 ? '#D30000':'#008000'} icon={coin.priceChange1h < 0 ?'mdi:menu-down':'mdi:menu-up'} width={34} height={34}/>
              <Typography sx={{ml:-1}} variant="body">
                <strong>{fShortenNumber(coin.priceChange1h)}%</strong>
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
              <Iconify sx={{ml:-1}} color={coin.priceChange1d < 0 ? '#D30000':'#008000'} icon={coin.priceChange1d < 0 ?'mdi:menu-down':'mdi:menu-up'} width={34} height={34}/>
              <Typography sx={{ml:-1}} variant="body">
                <strong>{fShortenNumber(coin.priceChange1d)}%</strong>
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
              <Iconify sx={{ml:-1}} color={coin.priceChange1w < 0 ? '#D30000':'#008000'} icon={coin.priceChange1w < 0 ?'mdi:menu-down':'mdi:menu-up'} width={34} height={34}/>
              <Typography sx={{ml:-1}} variant="body">
                <strong>{fShortenNumber(coin.priceChange1w)}%</strong>
              </Typography>
            </Grid>
            <Grid container alignItems={'center'} justifyContent={'center'}>
              <Typography variant="body2" sx={{mt:-1}}>
                Past Week
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
}
