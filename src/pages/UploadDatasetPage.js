import { Helmet } from 'react-helmet-async';

// @mui
import { Grid, Container, Stack, Typography, Paper, TableContainer, Table, TableBody, TableRow, TableCell, TablePagination, Button, Input } from '@mui/material';
import Iconify from 'src/components/iconify';
import UploadForm from 'src/components/upload-form';

// ----------------------------------------------------------------------
export default function UploadDatasetPage() {

  return (
    <>
      <Helmet>
        <title> TrajDash | Upload Dataset </title>
      </Helmet>

      <Container maxWidth="xxl" sx={{justifyItems:'center', alignItems:'center'}}>
        <Grid container spacing={6} style={{marginBottom:"48px"}}>
          <Grid item xs={12} md={12} lg={5} style={{textAlign:"left", marginTop:"1%", minHeight:'400px'}} order={{xs:2, lg:1}}>
            <Typography variant='h2' style={{margin:"0px"}}>UPDT: <br/> Upload Your Own Dataset to TrajDash! <span style={{fontSize:'24px', color:'green'}}>(Free, signup required.)</span></Typography>
            <Typography variant='h6' style={{marginLeft:"12px", marginTop: "18px"}}>
              You can upload up to 512 MB of trajectory data (in CSV format) to TrajDash and start exploring it afterwards!
              <br/>
              Start uploading your dataset using the form below and then you can visualize, analyze, and perform queries on it.
              <br/>
              <br/>
              <span style={{fontSize:'16px'}}>
                * Please watch the video to learn how to prepare your dataset before uploading to TrajDash. Any inappropriate usage of this feature will be blocked immediately.
              </span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={7} style={{marginTop:"36px"}} order={{xs:1, lg:2}}>
            <iframe style={{borderRadius:"24px", minHeight:"240px"}} width="100%" height="100%" src="https://www.youtube.com/embed/WCjLd7QAJq8?si=fEwDhLfkeuhSIURl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </Grid>
        </Grid>
        <UploadForm/>
      </Container>
    </>
  );
}
