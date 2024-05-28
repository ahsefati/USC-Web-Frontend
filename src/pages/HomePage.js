import { Helmet } from 'react-helmet-async';

// @mui
import { Grid, Container, Stack, Typography, Paper, TableContainer, Table, TableBody, TableRow, TableCell, TablePagination, Button } from '@mui/material';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------
export default function HomePage() {

  return (
    <>
      <Helmet>
        <title> Home | USC: TrajDash </title>
      </Helmet>

      <Container maxWidth="xxl">
        <Grid container spacing={6} style={{marginBottom:"24px"}}>
          <Grid item xs={12} md={12} lg={5} style={{textAlign:"left", marginTop:"1%"}} order={{xs:2, lg:1}}>
            <Typography variant='h1' style={{margin:"0px"}}>TrajDash: <br/> <span style={{color:"#990000"}}>Uncover</span> the Story of Your <span style={{color:"#990000"}}>Trajectories</span></Typography>
            <Typography variant='h6' style={{marginLeft:"12px", marginTop: "18px"}}>
              * TrajDash: A Trajectory Database Dashboard (Demo Paper)
              <br/>
              Mobility trajectories are important for many different research and
              analysis tasks. We present TrajDahs, the first online dashboard
              that gives access to different mobility datasets and enables users
              to query, analyze and visualize the trajectories. Our dashboard
              makes it convenient to find relevant trajectory data, summarize
              its characteristics and statistics, and create maps for presentation.
              In this paper, we explain the functions and implementation of our
              trajectory dashboard.
            </Typography>
            <div style={{marginTop:"36px", marginLeft:"12px"}} >
              <Button onClick={()=>window.location.href='/dashboard/generalanalysis'} style={{fontSize:"18px", marginRight:"12px"}} variant='contained' size='large'>Let's Try It!</Button>
              <Button style={{fontSize:"18px", textDecoration:"green wavy underline"}} endIcon={<Iconify icon="material-symbols:arrow-forward-rounded"/>} size='large'>Talk to Us</Button>
            </div>
          </Grid>
          <Grid item xs={12} md={12} lg={7} style={{marginTop:"36px"}} order={{xs:1, lg:2}}>
            <iframe style={{borderRadius:"24px", minHeight:"240px"}} width="100%" height="100%" src="https://www.youtube.com/embed/VqOqZBRZsj8?si=cFyP4JqYaRDnJlJZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
