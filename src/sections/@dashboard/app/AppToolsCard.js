import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Divider, Typography, Grid } from '@mui/material';

import { fShortenNumber } from '../../../utils/formatNumber';

// components
import Iconify from '../../../components/iconify';
import { likeATool } from '../../../api/actions/tools';
import { saveATool } from '../../../api/actions/users';

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(6),
  height: theme.spacing(6),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppToolsCard.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  sx: PropTypes.object,
  link: PropTypes.string
};

export default function AppToolsCard({ id, title, description, icon, color = 'primary', isLiked, numberOfLikes, numberOfComments ,sx, link, ...other }) {
  const user = JSON.parse(localStorage.getItem('profile'))

  const [likedTool, setLikedTool] = useState(isLiked)

  const [savedTool, setSavedTool] = useState(user? user.result.savedTools.find((idOfTool)=> idOfTool===id) : false)
  const [numLikes, setNumLikes] = useState(numberOfLikes)
  const [numComments, setNumComments] = useState(numberOfComments)

  const navigate = useNavigate()

  const handleLikeATool = async () => {
    setLikedTool((value)=>!value)
    if (likedTool){
      setNumLikes((numLikes)=>numLikes-1)
      // Request to server to unlike this tool (it is handled server-side)
      await likeATool(id)
    }else{
      setNumLikes((numLikes)=>numLikes+1)
      // Request to server to like this tool
      await likeATool(id)
    }
  }

  const handleNotAUser = () => {
    navigate('/login')
  }

  const handleSaveATool = async () => {
    setSavedTool((value)=>!value)
    const updatedUser = await saveATool(id)
    localStorage.setItem('profile', JSON.stringify({...updatedUser}))
  }


  useEffect(()=>{
    setLikedTool(isLiked)
    setNumLikes(numberOfLikes)
    setNumComments(numberOfComments)

  }, [numberOfLikes, numberOfComments, isLiked])


  return (
    
    <Card
      sx={{
        py: 3,
        boxShadow: 5,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <Grid container>
        <Grid item sx={{width:'44px'}}>
          <Grid item>
            <Iconify icon={'tabler:help'} width={28} height={28} sx={{cursor:'pointer'}}/><br/>
            <Typography variant='body2'>Help</Typography>
          </Grid>
          <Grid mt={2} item>
            <Iconify icon={likedTool?'icon-park-solid:like':'icon-park-outline:like'} color={likedTool?"#d1001f":""} width={24} height={24} sx={{cursor:'pointer'}} onClick={user?handleLikeATool:handleNotAUser}/><br/>
            <Typography variant='subtitile2'>{numLikes>0? fShortenNumber(numLikes): numLikes}</Typography>
          </Grid>
          <Grid item mt={2} sx={{cursor:'pointer'}} onClick={user?handleSaveATool:handleNotAUser}>
            <Iconify icon={savedTool?'ic:round-bookmark':'ic:round-bookmark-border'} width={24} height={24} />
            <Typography variant='body2' sx={{textAlign:'center'}}>{savedTool?"Saved":"Save"}</Typography>
          </Grid> 
        </Grid>
        <Grid item>
          <Divider orientation='vertical'/>
        </Grid>
        <Grid item xs={10}>
          <Link to={link} style={{textDecoration:'none'}}>
          <StyledIcon
            sx={{
              color: (theme) => theme.palette[color].dark,
              backgroundImage: (theme) =>
                `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                  theme.palette[color].dark,
                  0.24
                )} 100%)`,
              height: 84,
              width: 84 
            }}
          >
            <Iconify icon={icon} width={48} height={48} />
          </StyledIcon>
          <Typography variant="h4">{title}</Typography>

          <Typography variant="body2" sx={{ opacity: 0.84 }} style={{marginBottom:'25px'}}>
            {description}
          </Typography>
          </Link>
        </Grid>
      </Grid>

    </Card>
  );
}
