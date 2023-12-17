import { useState } from 'react';


// @mui
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, Link, Card, Avatar, Typography, CardContent, Modal, Fade, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// utils
import { fDate } from '../../../utils/formatTime';
//
import SvgColor from '../../../components/svg-color';
import { updateUserAvatar } from '../../../api/actions/users';

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 20,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 128,
  height: 128,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const styledModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '350px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: '10px',
  border: '0px solid black',
};

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

UserProfileCard.propTypes = {
  author: PropTypes.string,
  avatar: PropTypes.string,
};

// ----------------------------------------------------------------------
export default function UserProfileCard({ author, joined, avatar }) {

  // MODAL
  const [openModalToSelectAvatar, setOpenModalToSelectAvatar] = useState(false);
  const handleOpenToSelectAvatar = () => setOpenModalToSelectAvatar(true);
  const handleClose = () => setOpenModalToSelectAvatar(false);

  // LoadingBtn
  const [loadingBtn, setLoadingBtn] = useState(false)
  // AVATAR
  const avatarsIDs = Array.from({length: 25}, (_, i) => i + 1)
  const [selectedAvatarSrc, setSelectedAvatarSrc] = useState(avatar)
  const [avatarToSend, setAvatarToSend] = useState({
    avatar: ""
  })


  const handleUpdateAvatar = async () => {
    setLoadingBtn(true)
    const data = await updateUserAvatar(avatarToSend)
    localStorage.setItem('profile', JSON.stringify({...data}))
    setLoadingBtn(false)
    handleClose()
  }

  return (
    
    <Card sx={{ position: 'relative' }}>
      <StyledCardMedia>
        <SvgColor
          color="paper"
          src="/assets/icons/shape-avatar.svg"
          sx={{
            width: 130,
            height: 90,
            zIndex: 9,
            bottom: -20,
            position: 'absolute',
            color: 'background.paper',
          }}
        />
        
        <StyledAvatar
          onClick={handleOpenToSelectAvatar}
          sx={{cursor:'pointer', '&:hover':{border:(theme)=>`2px solid ${theme.palette.grey[500]}`}}}
          alt={author}
          src={selectedAvatarSrc}
        />


        <StyledCover alt={author} src={"/assets/images/covers/cover_3.jpg"} />
      </StyledCardMedia>
      
      <CardContent
        sx={{
          pt: 4,
        }}
      >
        <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
          Joined: {fDate(joined)}
        </Typography>

        <StyledTitle
          color="inherit"
          variant="subtitle2"
          underline="hover"
          sx={{
            ...({ typography: 'h4', height: 30 }),
          }}
        >
          {author}
        </StyledTitle>

      </CardContent>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModalToSelectAvatar}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={openModalToSelectAvatar}>
          <Box sx={styledModal}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Select your avatar:
            </Typography>
            <Grid container justifyContent='space-between' spacing={1} sx={{mt:2, maxHeight:'450px', overflow:'auto',}}>
                {
                  avatarsIDs.map((avatarId)=>{
                    return(
                      <Grid item xs={4} key={avatarId}>
                        <Avatar src={`/assets/images/avatars/avatar_${avatarId}.jpg`} alt="Avatar" sx={{ width: 64, height: 64, cursor:'pointer', '&:hover':{border:'2px solid gray'} }} 
                                onClick={()=>{
                                    setSelectedAvatarSrc(`/assets/images/avatars/avatar_${avatarId}.jpg`)
                                    setAvatarToSend({avatar: `avatar_${avatarId}.jpg`})
                                  }
                                } 
                        />
                      </Grid>
                    )
                  })
                }
            </Grid>
            <Grid container spacing={2} sx={{mt:1}} justifyContent="space-around">
                <Grid item>
                  <LoadingButton color='error' onClick={handleClose}>
                    Cancel
                  </LoadingButton>
                </Grid>
                <Grid item xs={8}>
                  <LoadingButton loading={loadingBtn} sx={{width:'100%'}} variant="contained" onClick={handleUpdateAvatar}>
                    Update
                  </LoadingButton>
                </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>

    </Card>


  );
}
