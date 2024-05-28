import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
// @mui
import {Typography, Paper, Box } from '@mui/material';
import Iconify from '../iconify';

// ----------------------------------------------------------------------

const Ribbon = () => (
  <Box
    sx={{
      position: 'absolute',
      top: 8,
      right: -10,
      backgroundColor: 'blueviolet',
      color: '#fff',
      padding: '4px 12px',
      transform: 'rotate(30deg)',
      transformOrigin: 'top right',
      fontSize: '14px',
      fontWeight: 'bold',
      zIndex: 1,
      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    }}
  >
    Soon!
  </Box>
);


const MyPaper = forwardRef(({ disabled, icon, text, description, width = 20, sx, ...other }, ref) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Paper 
      elevation={hovered ? 12 : 6}
      sx={{textAlign:'center', transition: 'elevation 0.3s ease', cursor:'pointer', padding:"24px", position: 'relative',}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {disabled && 
        <Ribbon/>
      } 
      <Iconify icon={icon} width="48px"/>
      <Typography variant='h5'>{text}</Typography>
      <Typography variant='body1'>{description}</Typography>
    </Paper>
  )
  }
);

MyPaper.propTypes = {
  sx: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  text: PropTypes.string,
  description: PropTypes.string,
};

export default MyPaper;
