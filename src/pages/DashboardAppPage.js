import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import 'moment';
import 'chartjs-adapter-moment';


// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Card, Link, FormControl, InputLabel, Select, MenuItem, TextField, Modal, Chip, Fade, Box, List, ListSubheader, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { fShortenNumber, fSixDigitNumber } from '../utils/formatNumber';

// API for Points Test
import { getPointsInBoxTest } from '../api/actions/points';

import CoinsCard from '../sections/@dashboard/app/CoinsCard';
// Data
import coins from '../_mock/tools';

// components
import Iconify from '../components/iconify';



const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  
  const user = JSON.parse(localStorage.getItem('profile'))
  const [pointsTest, setPointsTest] = useState([])

  // The inputs for different Points APIs
  const initialState = {
    min_lat: 37.75, 
    min_lon: -122.39, 
    max_lat: 37.752,
    max_lon: -122.392
  }
  const [formData, setFormData] = useState(initialState)

  const handleCalculateMapCenter = () => {
    const { sumLatitude, sumLongitude } = pointsTest.reduce((sums, point) => {
      sums.sumLatitude += point.latitude;
      sums.sumLongitude += point.longitude;
      return sums;
    }, { sumLatitude: 0, sumLongitude: 0 });
    
    const meanLatitude = sumLatitude / pointsTest.length;
    const meanLongitude = sumLongitude / pointsTest.length;

    return [meanLongitude, meanLatitude]
  }

  const handleGetPointsInBoxTest = async () => {
    const data = await getPointsInBoxTest(formData)
    setPointsTest(data)
  }

  useEffect(()=>{
    handleGetPointsInBoxTest()
  },[])

  const renderMap = pointsTest.length > 0;

  return (
    <>
      <Helmet>
        <title>USC-WEB | Dashboard</title>
      </Helmet>

      <Container maxWidth="xl">
        {user ? 
          <Grid container spacing={3} sx={{mt:1}}>
            {!renderMap ?
              <Typography variant="body2">Hi! I am loading...!!</Typography>
              :
              <MapContainer center={handleCalculateMapCenter()} zoom={16} style={{ height: '780px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                  {pointsTest.map(point => (
                      <Marker
                        key={point.point_id}
                        position={[point.longitude, point.latitude]}
                        icon={defaultIcon} 
                      >
                        <Popup>
                            <strong>Username:</strong> {point.userid}<br/>
                            <strong>Timestamp:</strong> {point.timestamp}<br/>
                            <strong>Lon:</strong> {point.longitude}<br/>
                            <strong>Lat:</strong> {point.latitude}<br/>
                            <strong>#Points:</strong> {point.cluster_size}
                        </Popup>
                      </Marker>
                  ))}
              </MapContainer>
            }
          </Grid>
          :
          <Grid container spacing={3} justifyContent='space-around' sx={{mb:10, mt:0}}>
            <Grid item xs={12} md={12}>
              <Card
                sx={{
                  py: 3,
                  boxShadow: 10,
                  textAlign: 'center',
                  color: (theme) => theme.palette.primary.dark,
                  bgcolor: (theme) => theme.palette.error.lighter,
                }}
                
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Iconify icon={'mdi:account-alert-outline'} width={48} height={48} />
                    <Typography variant="h4">{'Are you a user? 🤔'}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.84 }} style={{marginBottom:'25px'}}>
                      {'It seems that you are not a user! Please create your account or login to use all the features.'}
                    </Typography>
                    <Link component={RouterLink} to='/login'>
                      <LoadingButton sx={{mr:1}} size="large" type="submit" variant="contained">
                        Login
                      </LoadingButton>
                    </Link>
                    <Link component={RouterLink} to='/signup'>
                      <LoadingButton size="large" type="submit" variant="text">
                        Signup
                      </LoadingButton>
                    </Link>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        }
      </Container>
    </>
  );
}
