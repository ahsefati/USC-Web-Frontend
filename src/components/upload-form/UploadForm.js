import { useState } from 'react';
// @mui
import {Typography, Paper, Box, Input, Button, Grid, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';
import Iconify from '../iconify';
import { baseURL } from 'src/api';

// ----------------------------------------------------------------------

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [userName, setUserName] = useState('');
  const [datasetName, setDatasetName] = useState('');
  const [referenceLink, setReferenceLink] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || file.size > 512 * 1024 * 1024 || !file.name.endsWith('.csv')) {
      alert('Please upload a valid CSV file less than 512 MB.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userName', userName);
    formData.append('datasetName', datasetName);
    formData.append('referenceLink', referenceLink);

    try {
      await axios.post(`${baseURL}upload`, formData, {
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          setUploadProgress(progress);
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.log(error)
      alert('File upload failed');
    }
  };

  return (
    <Grid container xs={12} justifyContent={'space-evenly'}>
      <Grid container spacing={0} xs={12} md={7} lg={8} sx={{mt:1, border:'2px solid black', borderRadius: '40px', padding: 4,}}>
        <Grid container spacing={8}>
          <Grid item xs={6} sx={{marginBottom: 4}}>
            <Input fullWidth type="text" placeholder="Dataset Owner Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <Input fullWidth type="text" placeholder="Dataset Name" value={datasetName} onChange={(e) => setDatasetName(e.target.value)} />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{marginBottom: 4}}>
          <Input fullWidth type="text" placeholder="Reference Link" value={referenceLink} onChange={(e) => setReferenceLink(e.target.value)} />
        </Grid>
        <Grid item xs={12} sx={{marginBottom: 4}}>
          <TextField fullWidth type="file" inputProps={{accept:".csv"}} onChange={handleFileChange}/>
        </Grid>
        <Grid item xs={12} sx={{marginBottom: 2}}>
          <Button sx={{height: '50px'}} fullWidth variant='contained' onClick={handleUpload}>Upload</Button>
        </Grid>
      </Grid>
      <Grid xs={12} md={4} lg={3} sx={{mt:1, border:'2px solid black', borderRadius: '40px', padding: 4,}}>
          {uploadProgress > 0 && uploadProgress < 100 && 
            <Grid container justifyContent={'center'}>
              <CircularProgress size={'40%'} variant="determinate" value={uploadProgress} />
              <Typography variant='h2'>Upload: {uploadProgress.toFixed(2)}%</Typography>
              <Typography variant='h6' sx={{textAlign:'center'}}>Please wait until upload is in progress.</Typography>
            </Grid>
          }
          {uploadProgress>=100 &&
            <Grid container justifyContent={'center'}>
              <Iconify width='40%' sx={{color:'#008000'}} icon='ph:check-circle-fill'/>
              <Typography variant='h3' sx={{textAlign:'center', marginBottom:'8px'}}>Upload was successful!</Typography>
              <Typography variant='h6' sx={{textAlign:'center'}}>You can analyze your data after data processing is finished which may take up to 1 hour based on the it's size and complexity.</Typography>
            </Grid>
          }
      </Grid>
    </Grid>
  );
}

export default UploadForm;
