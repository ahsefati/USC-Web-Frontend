import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import 'chart.js/auto';
import 'moment';
import 'chartjs-adapter-moment';

// @mui
import { Grid, Container, Stack, Button, Checkbox, FormControlLabel, Typography, Paper} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useEffect, useRef, useState } from 'react';

// Needed Sections
import MyPaper from '../components/my-paper';
import UserNotLoggedIn from '../sections/@dashboard/user/UserNotLoggedInMsg';


export default function GeneralAnalysisPage() {
  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <>
      <Helmet>
        <title>USC: TrajDash | General Analysis</title>
      </Helmet>

      <Container maxWidth="xxl">
        {user ? 
          <Grid container sx={{mt:1}} spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
              <Link to={'/dashboard/generalanalysis/generalinfo'} style={{textDecoration:'none'}}>
                <MyPaper 
                  icon="material-symbols:info-outline" 
                  text="Sources & Users" 
                  description="Get sources and users general information"
                />
              </Link>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Link to={'/dashboard/generalanalysis/generatehistogram'} style={{textDecoration:'none'}}>
                <MyPaper 
                  icon="material-symbols:bar-chart-4-bars-rounded" 
                  text="Generate Histograms" 
                  description="Show how points of a data source are distributed"
                />
              </Link>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MyPaper 
                disabled={true}
                icon="material-symbols:local-see-outline" 
                text="Common Places Analysis" 
                description="Show where users wanted to go the most"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MyPaper 
                disabled={true}
                icon="material-symbols:scatter-plot-outline" 
                text="Outlier Analysis" 
                description="Analyze outliers in a data source"
              />
            </Grid>
          </Grid>
          :
          <UserNotLoggedIn/>
        }

        {/* <Grid item xs={24} md={24} lg={24} style={{paddingTop:'0px', marginTop:'0px'}}>
          <h5>Copyright © 2024 - Supervised by <a href='https://scholar.google.com/citations?user=qWGk7FUAAAAJ&hl=en' style={{textDecoration:'none'}}>Dr. John Kerumm</a> and <a href='https://scholar.google.com/citations?user=jEdhxGMAAAAJ&hl=en' style={{textDecoration:'none'}}>Dr. Cyrus Shahabi</a>. Implemented by <a href='https://ahsefati.github.io' style={{textDecoration:'none'}}>Amirhossein Sefati</a>. All rights reserved.</h5>
        </Grid> */}
      </Container>
    </>
  );
}
