import { Helmet } from 'react-helmet-async';

// @mui
import { Grid, Container, Stack, Typography, Paper, TableContainer, Table, TableBody, TableRow, TableCell, TablePagination, Button } from '@mui/material';
import Iconify from 'src/components/iconify';
import { Link } from 'react-router-dom';


import Amir from '../Logo/amir.jpeg'
import John from '../Logo/john.webp'
import Cyrus from '../Logo/cyrus.webp'

// ----------------------------------------------------------------------
export default function HomePage() {

  return (
    <>
      <Helmet>
        <title> TrajDash | Home </title>
      </Helmet>

      <Container maxWidth="xxl">
        <Grid container spacing={6} style={{marginBottom:"24px"}}>
          <Grid item xs={12} md={12} lg={5} style={{textAlign:"left", marginTop:"1%"}} order={{xs:2, lg:1}}>
            <Typography variant='h1' style={{margin:"0px"}}>TrajDash: <br/> <span style={{color:"#990000"}}>Uncover</span> the Story of Your <span style={{color:"#990000"}}>Trajectories</span></Typography>
            <Typography variant='h6' style={{marginLeft:"12px", marginTop: "18px"}}>
              * TrajDash: A Trajectory Database Dashboard (Demo Paper)
              <br/>
              Mobility trajectories are important for many different research and
              analysis tasks. We present TrajDash, the first online dashboard
              that gives access to different mobility datasets and enables users
              to query, analyze and visualize the trajectories. Our dashboard
              makes it convenient to find relevant trajectory data, summarize
              its characteristics and statistics, and create maps for presentation.
              In this paper, we explain the functions and implementation of our
              trajectory dashboard.
            </Typography>
            <div style={{marginTop:"36px", marginLeft:"12px"}} >
              <Link to={'/dashboard/generalanalysis'}>
                <Button fullWidth endIcon={<Iconify icon="material-symbols:arrow-forward-rounded"/>} style={{fontSize:"18px", marginRight:"12px"}} variant='outlined' size='large'>
                    Let's Try It!
                </Button>
              </Link>
            </div>
          </Grid>
          <Grid item xs={12} md={12} lg={7} style={{marginTop:"36px"}} order={{xs:1, lg:2}}>
            <iframe style={{borderRadius:"24px", minHeight:"240px"}} width="100%" height="100%" src="https://www.youtube.com/embed/WCjLd7QAJq8?si=fEwDhLfkeuhSIURl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </Grid>
        </Grid>
        <Grid container xs={12} sx={{marginTop:'5%'}}>
          <Grid xs={12} md={12} lg={4}>
            <Grid alignItems={'center'} gap={2} style={{display:'flex'}}>
              <img src={Amir} style={{height:'120px', width: '120px', borderRadius: '50%'}}/>
              <Typography variant='body1'>
                Amirhossein Sefati
                <br/>
                Full Stack Developer / Researcher
                <br/>
                MSc at Computer Science, University of Calgary
              </Typography>
            </Grid>
          </Grid>
          <Grid xs={12} md={12} lg={4}>
            <Grid alignItems={'center'} gap={2} style={{display:'flex'}}>
              <img src={John} style={{height:'120px', width: '120px', borderRadius: '50%'}}/>
              <Typography variant='body1'>
                Prof. John Krumm
                <br/>
                Microsoft Researcher
                <br/>
                Computer Science Dept. of University of Southern California
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <Grid alignItems={'center'} gap={2} style={{display:'flex'}}>
              <img src={Cyrus} style={{height:'120px', width: '120px', borderRadius: '50%'}}/>
              <Typography variant='body1'>
                Prof. Cyrus Shahabi
                <br/>
                Director of the Integrated Media Systems Center (IMSC)
                <br/>
                Computer Science Dept. of University of Southern California
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
