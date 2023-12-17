import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// API
import { changeUserPassWithVerificationCode, sendVerificationCode } from '../../../api/actions/users';

// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function ForgotPassForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [btnLoading, setBtnLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const [userEmail, setUserEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [newPass, setNewPass] = useState("")
  const [firstLevel, setFirstLevel] = useState(true)
  const [errorInLevelOne, setErrorInLevelOne] = useState(false)

  const handleFirstLevel = async (e) => {
    e.preventDefault()
    setBtnLoading(true)
    console.log(userEmail)
    const data = await sendVerificationCode({userEmail})
    console.log(data)
    if (data?.message===0){
      setFirstLevel(false)
      setBtnLoading(false)
      setErrorInLevelOne(false)
    } else{
      setBtnLoading(false)
      setErrorInLevelOne(true)
    }
  };

  const handleSecondLevel= async (e) => {
    e.preventDefault()
    setBtnLoading(true)
    const data = await changeUserPassWithVerificationCode({userEmail, verificationCode, newPass})
    console.log(data)
    if (data?.message){
      setFirstLevel(true)
      setBtnLoading(false)
      setErrorInLevelOne(true)
    } else{
      localStorage.setItem('profile', JSON.stringify({...data}))
      navigate('/dashboard/app')
    }
  }

  return (
    <>
      <Stack spacing={3}>
        <TextField disabled={!firstLevel} value={userEmail} name="email" label="Email address" onChange={e=>setUserEmail(e.target.value)}/>
        <Typography variant='body' sx={{color: (theme)=> theme.palette.success.main, display:firstLevel?'none':'inherit'}}>{"We just sent a verification code to your email. Put the code in the form below and choose a new password."}</Typography>
        <Typography variant='body' sx={{color: (theme)=> theme.palette.error.main, display:errorInLevelOne?'inherit':'none'}}>{"There is an error!"}</Typography>
      </Stack>

      <Stack spacing={3} sx={{display:(firstLevel?'none':'block'), mt:2}}>
        <TextField name="passcode" value={verificationCode} label="Verification Code" onChange={e=>setVerificationCode(e.target.value)}/>
      </Stack>
      <Stack spacing={3} sx={{display:(firstLevel?'none':'block'), mt:1}}>
        <TextField name="password" value={newPass} label="New Password" onChange={e=>setNewPass(e.target.value)}/>
      </Stack>

      <Typography variant='body' sx={{color: (theme)=> theme.palette.error.main}}>{errorMessage}</Typography>
      
      <LoadingButton sx={{mt:2, display:(firstLevel?'inherit':'none')}} loading={btnLoading} fullWidth size="large" type="submit" variant="contained" onClick={handleFirstLevel}>
        Send Verification
      </LoadingButton>
      <LoadingButton sx={{mt:2, display:(firstLevel?'none':'inherit')}} loading={btnLoading} fullWidth size="large" type="submit" variant="contained" onClick={handleSecondLevel}>
        Verify and Change Password
      </LoadingButton>
    </>
  );
}
