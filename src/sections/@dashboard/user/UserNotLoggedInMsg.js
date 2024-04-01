import { Link as RouterLink } from 'react-router-dom';

import { Grid, Typography, Card, Link} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import Iconify from '../../../components/iconify';

UserNotLoggedIn.propTypes = {

};

export default function UserNotLoggedIn() {
    
  return (
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
                {'It seems that you are not a user! Please create your account or login to use the platform.'}
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
  );
}
