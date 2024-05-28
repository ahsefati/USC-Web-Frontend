import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, Box } from '@mui/material';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { ForgotPassForm } from '../sections/auth/user';

// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Iconify from '../components/iconify';

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

export default function ForgotPassPage() {
  const mdUp = useResponsive('up', 'md');

  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title> USC: TrajDash | Forgot Password </title>
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
              Don't Worry! We are here!
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Can't remember anything? {''}
              <Link component={RouterLink} to='/signup' variant="subtitle2" underline='hover' sx={{cursor:'pointer'}}>Create another one, it's free!</Link>
            </Typography>

            <ForgotPassForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
