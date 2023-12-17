import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { IconButton, InputAdornment, TextField, Grid, InputLabel, Select, MenuItem, FormControl, Typography, Divider, FormControlLabel, Switch, Snackbar, Stack } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import { LoadingButton } from '@mui/lab';

// components
import Iconify from '../../../components/iconify';
import { changeUserPass } from '../../../api/actions/users';


// ----------------------------------------------------------------------

export default function PasswordForm() {

  let user;
  if (localStorage.getItem('profile')){
    user = JSON.parse(localStorage.getItem('profile'))
    user.result.avatar = `/assets/images/avatars/${user?.result?.avatar}` || "/assets/images/avatars/avatar_13.jpg"
  }else{
    user = false
  }

  const [showPassword, setShowPassword] = useState(false);
  const [currentPass, setCurrentPass] = useState("")
  const [newPass, setNewPass] = useState("")

  const [btnLoading, setBtnLoading] = useState(false)
  const [notificationOfUpdate, setNotificationOfUpdate] = useState(false)
  const [notificationOfUpdateWhenWrong, setNotificationOfUpdateWhenWrong] = useState(false)

  const handleChangeUserPass = async (e) => {
    e.preventDefault()
    setBtnLoading(true)
    const data = await changeUserPass({currentPass, newPass})
    if (data?.message){
      setBtnLoading(false)
      setNotificationOfUpdateWhenWrong(true)
      setTimeout(() => {
        setNotificationOfUpdateWhenWrong(false)
      }, 2000);
    }else{
      localStorage.setItem('profile', JSON.stringify({...data}))
      setBtnLoading(false)
      setNotificationOfUpdate(true)
      setTimeout(() => {
        setNotificationOfUpdate(false)
      }, 2000);
    }
    
  };

  return (
    <>
      <Grid container spacing={3}>

        <Grid item xs={12}>
          <Divider>Change Password</Divider>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            name="oldpassword"
            label="Current Password"
            value={currentPass}
            onChange={e=>setCurrentPass(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{width:'100%'}}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            name="newpassword"
            label="New Password"
            value={newPass}
            onChange={e=>setNewPass(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{width:'100%'}}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <LoadingButton loading={btnLoading} fullWidth size="large" type="submit" variant="contained" color='warning' onClick={handleChangeUserPass}>
            Change
          </LoadingButton>
        </Grid>
      </Grid>


      

      <Snackbar anchorOrigin={{horizontal: 'center', vertical:'bottom'}} open={notificationOfUpdate} autoHideDuration={6000}>
        <MuiAlert elevation={6} variant="filled" severity="success" sx={{ width: '100%', backgroundColor:'greenyellow' }}>Success! Your information has been updated.</MuiAlert>
      </Snackbar>
      <Snackbar anchorOrigin={{horizontal: 'center', vertical:'bottom'}} open={notificationOfUpdateWhenWrong} autoHideDuration={6000}>
        <MuiAlert elevation={6} variant="filled" severity="error" sx={{ width: '100%' }}>Error! Something is wrong!</MuiAlert>
      </Snackbar>
    </>
  );
}
