import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// API
import { signup } from '../../../api/actions/users';

// components
import Iconify from '../../../components/iconify';


// ----------------------------------------------------------------------

export default function SignupForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);


  const initialState = {
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    isFromGoogle: false
  }
  const [formData, setFormData] = useState(initialState)
  const [btnLoading, setBtnLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleClick = async (e) => {
    setBtnLoading(true)
    e.preventDefault()


    const data = await signup(formData)

    if (data?.response?.data?.message===1){
      setErrorMessage("Passwords don't match!")
    }else if (data?.response?.data?.message===2){
      setErrorMessage("User exist!")
    } else{
      localStorage.setItem('profile', JSON.stringify({...data}))
      navigate('/dashboard', { replace: true });
    }
    
    setBtnLoading(false)
  };

  const handleFormChange= (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  return (
    <>
      <Stack spacing={2}>

        <TextField name="fullname" label="Full Name" onChange={handleFormChange}/>
        <TextField name="email" label="Email address" onChange={handleFormChange}/>

        <TextField
          name="password"
          onChange={handleFormChange}
          label="Password"
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
        />

        <TextField
          onChange={handleFormChange}
          name="confirmPassword"
          label="Repeat Password"
          type={'password'}
        />
      </Stack>

      <Stack direction="row" alignItems="flex-end" justifyContent="space-between" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover" sx={{cursor:'pointer'}}>
          Forgot password?
        </Link>
      </Stack>
      <Typography variant='body' sx={{color: (theme)=> theme.palette.error.main}}>{errorMessage}</Typography>
      <LoadingButton loading={btnLoading} fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
