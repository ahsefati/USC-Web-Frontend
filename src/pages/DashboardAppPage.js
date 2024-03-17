import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import 'chart.js/auto';
import 'moment';
import 'chartjs-adapter-moment';


// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Card, Link, FormControl, InputLabel, Select, MenuItem, Stack, Input, Button} from '@mui/material';
import {DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {LocalizationProvider} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LoadingButton } from '@mui/lab';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'

// data
import sqlCommands from '../data/sqlCommands';

// API for Points Test
import { getAllSources, getPoints } from '../api/actions/points';


// components
import Iconify from '../components/iconify';



const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  
  const user = JSON.parse(localStorage.getItem('profile'))
  const [sources, setSources] = useState([])
  const [selectedSource, setSelectedSource] = useState(-1)
  const [sqlCommand, setSqlCommand] = useState(-1)
  const [pointsTest, setPointsTest] = useState([])
  const [executeLoading, setExecuteLoading] = useState(false)
  const [latCenter, setLatCenter] = useState(39)
  const [lonCenter, setLonCenter] = useState(-122)
  
  // The inputs for different Points APIs
  const [formData, setFormData] = useState({})

  const handleCalculateMapCenter = () => {
    const { sumLatitude, sumLongitude } = pointsTest.reduce((sums, point) => {
      sums.sumLatitude += point.latitude;
      sums.sumLongitude += point.longitude;
      return sums;
    }, { sumLatitude: 0, sumLongitude: 0 });
    
    const meanLatitude = sumLatitude / pointsTest.length;
    const meanLongitude = sumLongitude / pointsTest.length;
    setLatCenter(meanLongitude)
    setLonCenter(meanLatitude)
    return [meanLongitude, meanLatitude]
  }

  useEffect(()=>{
    if (sqlCommand!==-1){
      const selectedEndpoint = sqlCommands.filter(command=>command.id===sqlCommand)[0].endpoint
      setFormData({...formData, "endpoint": selectedEndpoint })
    }
    if (selectedSource!==-1){
      setFormData({...formData, "sourceId": selectedSource})
    }
  },[latCenter, lonCenter, sqlCommand, selectedSource])

  const handleGetPoints = async () => {
    setExecuteLoading(true)
    console.log(formData)
    const data = await getPoints(formData)
    setPointsTest(data)
    setExecuteLoading(false)
  }

  const handleGetSources = async () => {
    const sourcesData = await getAllSources()
    setSources(sourcesData)
  }

  useEffect(()=>{
    if (pointsTest.length>0){
      handleCalculateMapCenter()
    }
    handleGetSources()
  }, [pointsTest])


  return (
    <>
      <Helmet>
        <title>USC-WEB | Dashboard</title>
      </Helmet>

      <Container maxWidth="xxl">
        {user ? 
          <Grid container sx={{mt:3}} spacing={2}>
            <Grid item xs={12} md={12} lg={3}>
              <Stack direction="column" alignItems="center">
                {sources.length > 0 && 
                  <FormControl fullWidth>
                    <InputLabel id="Select Source to Explore">Select Source to Explore:</InputLabel>
                    <Select
                      fullWidth
                      labelId="Select Source to Explore"
                      id="Select Source to Explore"
                      value={selectedSource}
                      label="Select Source to Explore"
                      onChange={(e) => {
                        setSelectedSource(e.target.value)
                      }}
                    >
                      <MenuItem value={-1}>ALL</MenuItem>
                      {sources.map(source => {
                        return (
                          <MenuItem value={source.sourceId}>{source.name}</MenuItem>
                        )
                      })

                      }
                    </Select>
                  </FormControl>
                }
                <FormControl style={{marginTop:'24px'}} fullWidth>
                  <InputLabel id="Select The Command to Execute">Select The Command to Execute:</InputLabel>
                  <Select
                    fullWidth
                    labelId="Select The Command to Execute"
                    id="Select The Command to Execute"
                    value={sqlCommand}
                    label="Select The Command to Execute"
                    onChange={(e) => {
                      setSqlCommand(e.target.value)
                    }}
                  >
                    <MenuItem value={-1}>Choose Your Command</MenuItem>
                    {sqlCommands.map(command => {
                      return (
                        <MenuItem value={command.id}>{command.title}</MenuItem>
                      )
                    })

                    }
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction="column" alignItems="center">
                {sqlCommand!==-1&&
                  sqlCommands.filter(command=>command.id===sqlCommand)[0].variables.map(vars => {
                    return (
                      <div style={{width:'100%', marginTop:'24px'}} key={vars.varCode}>
                        <Typography variant="subtitle2">
                          {vars.varTitle}
                        </Typography>
                        {vars.type==="normal_input"?
                          <Input
                            fullWidth
                            value={formData[vars.varCode]}
                            onChange={(e) =>
                              {
                                if (e.target.value!==''){
                                  setFormData({
                                    ...formData,
                                    [vars.varCode]: e.target.value,
                                  })
                                }else{
                                  const updatedFormData = { ...formData };
                                  delete updatedFormData[vars.varCode];
                                  setFormData(updatedFormData);
                                }
                              }
                            }
                            placeholder={vars.varTitle}
                          />
                          :
                          vars.type==="datetime_input"?
                          <LocalizationProvider dateAdapter={AdapterDayjs} locale="en-US">
                            <DateTimePicker
                              value={formData[vars.varCode] ? new Date(formData[vars.varCode] * 1000) : null}
                              onChange={(newValue) => {
                                if (newValue!==''){
                                  setFormData({
                                    ...formData,
                                    [vars.varCode]: newValue.unix()
                                  })
                                }else{
                                  const updatedFormData = { ...formData };
                                  delete updatedFormData[vars.varCode];
                                  setFormData(updatedFormData);
                                }
                              }
                              }
                            />
                          </LocalizationProvider>
                          :
                          'Nothing found. Contact me: ahsefati1998@gmail.com'
                        }
                      </div>
                    )
                  })
                }
              </Stack>
              {sqlCommand!==-1 &&
                <Stack style={{marginTop:'24px'}} direction="row" alignItems="center">
                  <LoadingButton loading={executeLoading} onClick={handleGetPoints} color='secondary' type='submit' variant='contained' fullWidth>Execute</LoadingButton>
                </Stack>
              }
            </Grid>
            <Grid item xs={12} md={12} lg={9} sx={{display:{xs:'none', lg:'block'}}}>
                <MapContainer key={`${latCenter}-${lonCenter}`} center={[latCenter, lonCenter]} zoom={16} style={{ height: '780px' }}>
                  <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                    {pointsTest.length>0 && pointsTest.map(point => (
                        <Marker
                          key={point.point_id}
                          position={[point.longitude, point.latitude]}
                          icon={point.metadata==="Occupied Taxi"?greenIcon:blueIcon} 
                        >
                          <Popup>
                              <strong>Username:</strong> {point.username}<br/>
                              <strong>Date:</strong> {point.datetime}<br/>
                              <strong>Lon:</strong> {point.longitude}<br/>
                              <strong>Lat:</strong> {point.latitude}<br/>
                              <strong>Metadata:</strong> {point.metadata}
                          </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </Grid>
            <Grid item xs={12} md={12} lg={9} sx={{display:{xs:'block', lg:'none'}}}>
                <MapContainer key={`${latCenter}-${lonCenter}`} center={[latCenter, lonCenter]} zoom={16} style={{ height: '560px' }}>
                  <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                    {pointsTest.length>0 && pointsTest.map(point => (
                        <Marker
                          key={point.point_id}
                          position={[point.longitude, point.latitude]}
                          icon={point.metadata==="Occupied Taxi"?greenIcon:blueIcon} 
                        >
                          <Popup>
                              <strong>Username:</strong> {point.username}<br/>
                              <strong>Date:</strong> {point.datetime}<br/>
                              <strong>Lon:</strong> {point.longitude}<br/>
                              <strong>Lat:</strong> {point.latitude}<br/>
                              <strong>Metadata:</strong> {point.metadata}
                          </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </Grid>
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
        <Grid item xs={24} md={24} lg={24} style={{paddingTop:'0px', marginTop:'0px'}}>
          <h5>Copyright © 2024 - Supervised by <a href='https://scholar.google.com/citations?user=qWGk7FUAAAAJ&hl=en' style={{textDecoration:'none'}}>Dr. John Kerumm</a> and <a href='https://scholar.google.com/citations?user=jEdhxGMAAAAJ&hl=en' style={{textDecoration:'none'}}>Dr. Cyrus Shahabi</a>. Implemented by <a href='https://ahsefati.github.io' style={{textDecoration:'none'}}>Amirhossein Sefati</a>. All rights reserved.</h5>
        </Grid>
      </Container>
    </>
  );
}
