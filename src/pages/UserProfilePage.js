import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Card, Container, Stack, Typography, Paper, Link, Divider } from '@mui/material';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
// mock
import { faker } from '@faker-js/faker';
// components
import Iconify from '../components/iconify';
import UserProfileCard from '../sections/@dashboard/user/UserProfileCard';
import { SettingsForm, PasswordForm } from '../sections/auth/user';


// ----------------------------------------------------------------------

export default function UserProfilePage() {
  const navigate = useNavigate()
  
  let user;
  if (localStorage.getItem('profile')){
    user = JSON.parse(localStorage.getItem('profile'))
    user.result.avatar = `/assets/images/avatars/${user.result.avatar}`
  }else{
    user = false
  }

  return (
    <>
    {user?
      <>
        <Helmet>
          <title> Kooch | Profile </title>
        </Helmet>

        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Your Profile & Settings
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
              <UserProfileCard key={user.result._id} author={user.result.name} avatar={user.result.avatar} joined={faker.date.past()}/>
            </Grid>

            <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
              <Paper elevation={3} sx={{borderRadius:'15px', padding:'15px'}}>
                <SettingsForm/>
              </Paper>
              <Paper elevation={3} sx={{borderRadius:'15px', padding:'15px', mt:2}}>
                <PasswordForm/>
              </Paper>
            </Grid>
            
          </Grid>
        </Container>
      </>
      :
      <>
        <Navigate to={'/dashboard'}/>
      </>
    }
    </>
  );
}
