import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { IconButton, InputAdornment, TextField, Grid, InputLabel, Select, MenuItem, FormControl, Typography, Divider, FormControlLabel, Switch, Snackbar, Stack } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import { LoadingButton } from '@mui/lab';

// list of countries
import countries from '../../../_mock/countries';

// components
import Iconify from '../../../components/iconify';
import { updateUserInfo } from '../../../api/actions/users';


// ----------------------------------------------------------------------

export default function SettingsForm() {

  let user;
  if (localStorage.getItem('profile')){
    user = JSON.parse(localStorage.getItem('profile'))
    user.result.avatar = `/assets/images/avatars/${user?.result?.avatar}` || "/assets/images/avatars/avatar_13.jpg"
  }else{
    user = false
  }

  const [userUpdateInfo, setUserUpdateInfo] = useState({
    country: user?.result?.country || countries[0].name,
    state: user?.result?.state,
    phone: user?.result?.phone || Number(""),
    theme: user?.result?.theme|| false,
    visibility: user?.result?.visibility,
    telegramId: user?.result?.telegramId || "",
    instagramId: user?.result?.instagramId || "",
    website: user?.result?.website || "",

  })
  const selectedCountryProps = countries.filter(country=> country.name===userUpdateInfo.country)
  const [selectedCountry, setSelectedCountry] = useState(selectedCountryProps[0])

  const [showPassword, setShowPassword] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false)
  const [notificationOfUpdate, setNotificationOfUpdate] = useState(false)
  
  const handleSelectCountry = (e) => {
    const selectedCountryInfo = countries.filter((country) => country.name===e.target.value)
    setUserUpdateInfo({...userUpdateInfo, country: selectedCountryInfo[0].name})
    setSelectedCountry(selectedCountryInfo[0])
  }
  
  const handleSelectState = (e) => {
    setUserUpdateInfo({...userUpdateInfo, state:e.target.value})
  }
  
  const handleChangeOnForm = (e) => {
    setUserUpdateInfo({...userUpdateInfo, [e.target.name]:e.target.value})
  }
  
  const handleUpdateUserInfo = async (e) => {
    e.preventDefault()
    console.log(userUpdateInfo)
    setBtnLoading(true)
    const data = await updateUserInfo(userUpdateInfo)
    localStorage.setItem('profile', JSON.stringify({...data}))
    setBtnLoading(false)
    setNotificationOfUpdate(true)
    setTimeout(() => {
      setNotificationOfUpdate(false)
    }, 2000);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Divider>Personal Info</Divider>
        </Grid>

        <Grid item xs={12}>
          <TextField 
            sx={{width:'100%'}} 
            name="email" 
            disabled
            defaultValue={user.result.email} 
            label="Email address" 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton edge="start">
                    <Iconify icon={'ic:outline-email'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>  
            <InputLabel sx={{width:'100%'}} id="country-label">Country</InputLabel>
            <Select
              sx={{width:'100%'}}
              labelId="country-label"
              id="country-label"
              defaultValue={selectedCountry.name}
              value={selectedCountry.name}
              label="Country"
              onChange={handleSelectCountry}
            >
              {countries.map((country)=>(
                    <MenuItem key={country.name} value={country.name}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>

        </Grid>
         
        
        {selectedCountry.name!=="Select Your Country" ?
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>  
              <InputLabel sx={{width:'100%'}} id="state-label">State</InputLabel>
              <Select
                sx={{width:'100%'}}
                labelId="state-label"
                id="state-label"
                defaultValue={user.result?.state}
                value={userUpdateInfo.state}
                label="State"
                onChange={handleSelectState}

              >
                {selectedCountry.stateProvinces.map((state)=>(
                      <MenuItem key={state.name} value={state.name}>{state.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          :
          <Grid item xs={12} sm={6}/>
        }

        
        <Grid item xs={12} sm={6}>
          <TextField 
            sx={{width:'100%'}} 
            name="phone" 
            value={userUpdateInfo.phone}
            onChange={handleChangeOnForm}
            type='number'
            label="Phone Number" 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton edge="start">
                    <Iconify icon={'ic:round-phone-iphone'} />
                  </IconButton>
                  <Typography>
                    (+{selectedCountry?.phone})
                  </Typography>
                </InputAdornment>
              ),
            }}
            />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField 
            sx={{width:'100%'}} 
            name="telegramId" 
            value={userUpdateInfo.telegramId}
            onChange={handleChangeOnForm}
            label="Telegram ID" 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton edge="start">
                    <Iconify icon={'la:telegram'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField 
            sx={{width:'100%'}} 
            name="instagramId" 
            value={userUpdateInfo.instagramId} 
            onChange={handleChangeOnForm}
            label="Instagram ID" 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton edge="start">
                    <Iconify icon={'ph:instagram-logo-light'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField 
            sx={{width:'100%'}} 
            name="website" 
            value={userUpdateInfo.website} 
            onChange={handleChangeOnForm}
            label="Website URL" 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton edge="start">
                    <Iconify icon={'iconoir:www'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        
        
        <Grid item xs={12}>
          <Divider>Settings</Divider>
        </Grid>

        <Grid item xs={12} sm={6}>
          Theme: 
          <FormControlLabel sx={{ml:'0px'}} control={<Switch disabled checked={userUpdateInfo.theme} value={userUpdateInfo.theme} onChange={(e)=>setUserUpdateInfo({...userUpdateInfo, theme: e.target.checked})} />} label={userUpdateInfo.theme?"Dark (Night)":"Light (Day)"} />
        </Grid>

        <Grid item xs={12} sm={6}>
          Info: 
          <FormControlLabel sx={{ml:'0px'}} control={<Switch disabled checked={userUpdateInfo.visibility} value={userUpdateInfo.visibility} onChange={(e)=>setUserUpdateInfo({...userUpdateInfo, visibility: e.target.checked})}/>} label={userUpdateInfo.visibility?"Public":"Private"} />
        </Grid>

      </Grid>


      <LoadingButton loading={btnLoading} fullWidth size="large" type="submit" variant="contained" color='secondary' onClick={handleUpdateUserInfo} sx={{mt:2}}>
        Update
      </LoadingButton>

      <Snackbar anchorOrigin={{horizontal: 'center', vertical:'bottom'}} open={notificationOfUpdate} autoHideDuration={6000}>
        <MuiAlert elevation={6} variant="filled" severity="success" sx={{ width: '100%', backgroundColor:'greenyellow' }}>Success! Your information has been updated.</MuiAlert>
      </Snackbar>
    </>
  );
}
