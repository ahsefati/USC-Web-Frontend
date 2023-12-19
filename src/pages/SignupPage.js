import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, Box } from '@mui/material';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

// hooks
import useResponsive from '../hooks/useResponsive';

// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';

// sections
import { SignupForm } from '../sections/auth/user';

// API
import {signup } from '../api/actions/users';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function SignupPage() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate()

  const handleUserLoginWithGoogle = (accessToken) => {

    const config = {
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    } 
    axios.get("https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos", config)
        .then(async (res)=> {
            const dataFromGoogle = {
                fullname: `${res.data.names[0].givenName} ${res.data.names[0].familyName}`,
                email: res.data.emailAddresses[0].value.toLowerCase(),
                password: '__Google',
                confirmPassword: '__Google',
                isFromGoogle: true
            }
            const data = await signup(dataFromGoogle)
            localStorage.setItem('profile', JSON.stringify({...data}))
            navigate('/dashboard/app')
        })
        .catch((err)=>console.log(err))
  }

  const loginWithGoogle = useGoogleLogin({
    onSuccess: tokenResponse => handleUserLoginWithGoogle(tokenResponse.access_token),
  });

  return (
    <>
      <Helmet>
        <title> CoinSigma | Sign up </title>
      </Helmet>

      <StyledRoot>
        
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome to CoinSigma!
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign up in CoinSigma
            </Typography>

            <Typography variant="body2" sx={{ mb: 4 }}>
              Already have an account? {''}
              <Link component={RouterLink} to='/login' variant="subtitle2" underline='hover' sx={{cursor:'pointer'}}>Login to it!</Link>
            </Typography>

            <Stack direction="row">
              <Button fullWidth size="large" color="inherit" variant="outlined" onClick={loginWithGoogle}>
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
                <Typography sx={{marginLeft:'10px'}}> Sign in with Google</Typography>
              </Button>
            </Stack>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <SignupForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
