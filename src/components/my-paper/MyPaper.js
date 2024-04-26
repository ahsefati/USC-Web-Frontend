import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
// @mui
import {Typography, Paper } from '@mui/material';
import Iconify from '../iconify';

// ----------------------------------------------------------------------

const MyPaper = forwardRef(({ icon, text, description, width = 20, sx, ...other }, ref) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Paper 
      elevation={hovered ? 12 : 6}
      sx={{textAlign:'center', transition: 'elevation 0.3s ease', cursor:'pointer', padding:"24px"}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
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
