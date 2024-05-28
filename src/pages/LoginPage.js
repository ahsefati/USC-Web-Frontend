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
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/user';

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

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  const navigate = useNavigate()

  const handleUserLoginWithGoogle = (accessToken) => {
    console.log("OK")
    console.log(accessToken)
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
    onError: error => console.log(error)
  });

  return (
    <>
      <Helmet>
        <title> USC: TrajDash | Login </title>
      </Helmet>

      <StyledRoot>

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome to USC: TrajDash!
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to USC: TrajDash
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <Link component={RouterLink} to='/signup' variant="subtitle2" underline='hover' sx={{cursor:'pointer'}}>Create one, it's free!</Link>
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined" onClick={loginWithGoogle}>
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
                <Typography sx={{marginLeft:'10px'}}> Sign in with Google</Typography>
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
