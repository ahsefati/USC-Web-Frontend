import { Helmet } from 'react-helmet-async';
import 'chart.js/auto';
import 'moment';
import 'chartjs-adapter-moment';
import useScreenshot from 'use-screenshot-hook';

// @mui
import { Grid, Container, Stack, Button, Checkbox, FormControlLabel, Input, Typography} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useEffect, useRef, useState } from 'react';

// Needed Sections
import UserNotLoggedIn from '../sections/@dashboard/user/UserNotLoggedInMsg';
import RequestToExecuteForm from '../sections/@dashboard/app/RequestToExecuteForm';
import ResultMap from '../sections/@dashboard/app/ResultMap';
import ResultTable from '../sections/@dashboard/app/ResultTable';
import ResultStats from '../sections/@dashboard/app/ResultStats';

// data
import sqlCommands from '../data/sqlCommands';

// API for Points Test
import { getAllSources, getPoints } from '../api/actions/points';

import Iconify from '../components/iconify';


export default function DashboardAppPage() {
  const mapRef = useRef();
  const { image, takeScreenshot } = useScreenshot(mapRef);
  const user = JSON.parse(localStorage.getItem('profile'))
  const [sources, setSources] = useState([])
  const [selectedSource, setSelectedSource] = useState(-1)
  const [sqlCommand, setSqlCommand] = useState(0)
  const [pointsTest, setPointsTest] = useState([])
  const [userStats, setUserStats] = useState([])

  const [showPoints, setShowPoints] = useState(true)
  const [showMedianUsers, setShowMedianUsers] = useState(false)
  const [showGeneralHeatmap, setShowGeneralHeatmap] = useState(false)
  const [showTrajectoryLines, setShowTrajectoryLines] = useState(false)
  const [showSpeedRange, setShowSpeedRange] = useState(false)
  const [minSpeedRange, setMinSpeedRange] = useState(null)
  const [maxSpeedRange, setMaxSpeedRange] = useState(null)
  const [detectOutliers, setDetectOutliers] = useState(false)
  const [outlierSpeedThreshold, setOutlierSpeedThreshold] = useState(null)

  const [generalStats, setGeneralStats] = useState()
  const [executeLoading, setExecuteLoading] = useState(false)
  const [latCenter, setLatCenter] = useState(37.94)
  const [lonCenter, setLonCenter] = useState(-122.34)

  // Result Mode
  const [resultMode, setResultMode] = useState(0)
  
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
    setLatCenter(meanLatitude)
    setLonCenter(meanLongitude)
    return [meanLatitude, meanLongitude]
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

  useEffect(()=>{
  }, [mapRef])

  const handleGetPoints = async () => {
    setExecuteLoading(true)
    const data = await getPoints(formData)
    setGeneralStats(data.general_stats)
    setPointsTest(data.points)
    setUserStats(data.user_stats)
    setExecuteLoading(false)
  }

  const handleGetSources = async () => {
    const sourcesData = await getAllSources()
    setSources(sourcesData)
  }

  const handleResultMode = (id) => {
    setResultMode(id)
  }

  useEffect(()=>{
    if (pointsTest.length>0){
      handleCalculateMapCenter()
    }
    handleGetSources()
  }, [pointsTest])


  const handleDownloadImage = async () => {
    takeScreenshot(mapRef.current).then(image=>{
      const a = document.createElement('a');
      a.href = image;
      a.download = 'screenshot.png';
      a.click();
    })
  };

  return (
    <>
      <Helmet>
        <title>USC: TrajDash | Dashboard</title>
      </Helmet>

      <Container maxWidth="xxl">
        {user ? 
          <Grid container sx={{mt:1}} spacing={2}>
            <RequestToExecuteForm sources={sources} selectedSource={selectedSource} setSelectedSource={setSelectedSource} sqlCommand={sqlCommand} setSqlCommand={setSqlCommand} formData={formData} setFormData={setFormData} executeLoading={executeLoading} handleGetPoints={handleGetPoints}/>
            <Grid item xs={12} md={12} lg={10}>
              <Stack direction={"row"} spacing={1} sx={{mb:0}}>
                <Button startIcon={<Iconify icon="material-symbols:map-outline"/>} variant={resultMode===0?'contained':'outlined'} color={resultMode===0?'primary':'secondary'} onClick={()=>handleResultMode(0)}>Map</Button>
                <Button startIcon={<Iconify icon="material-symbols:table-rows-outline"/>} variant={resultMode===1?'contained':'outlined'} color={resultMode===1?'primary':'secondary'} onClick={()=>handleResultMode(1)}>Table</Button>
                <Button startIcon={<Iconify icon="material-symbols:bar-chart-rounded"/>} variant={resultMode===2?'contained':'outlined'} color={resultMode===2?'primary':'secondary'} onClick={()=>handleResultMode(2)}>Statistics</Button>
              </Stack>
              {resultMode===0 &&
              <Stack direction={"row"} spacing={1} sx={{mb:1}}>
                  <Grid container justifyContent={'space-between'}>
                    <Grid item>  
                      <FormControlLabel control={<Checkbox checked={showPoints} onClick={(e)=>setShowPoints(e.target.checked)}/>} label="Show Points?"/>
                      <FormControlLabel control={<Checkbox checked={showMedianUsers} onClick={(e)=>setShowMedianUsers(e.target.checked)}/>} label="Show User Median Points?"/>
                      <FormControlLabel control={<Checkbox checked={showGeneralHeatmap} onClick={(e)=>setShowGeneralHeatmap(e.target.checked)}/>} label="Show Heat Map?"/>
                      <FormControlLabel control={<Checkbox checked={showTrajectoryLines} onClick={(e)=>setShowTrajectoryLines(e.target.checked)}/>} label="Show Trajectories?"/>
                      <FormControlLabel 
                        control={
                          <Checkbox checked={showSpeedRange} 
                            onClick={(e)=>{
                              if (e.target.checked){
                                setShowSpeedRange(true)
                                setDetectOutliers(false)
                                setOutlierSpeedThreshold(null)
                              }else {
                                setShowSpeedRange(false)
                                setMinSpeedRange(null)
                                setMaxSpeedRange(null)
                              }
                            }}
                          />
                        } 
                            label="Set Speed Range?"
                      />
                      {showSpeedRange &&
                        <>
                          <Input
                            style={{width: "35px", marginRight: "4px", marginLeft:"-12px"}}
                            value={minSpeedRange}
                            onChange={(e) => {
                              setMinSpeedRange(e.target.value || null)
                            }}
                            placeholder={"Min"}
                          />
                          <Input
                            style={{width: "35px"}}
                            value={maxSpeedRange}
                            onChange={(e) => setMaxSpeedRange(e.target.value || null)}
                            placeholder={"Max"}
                          />
                          <Typography sx={{display:'inline-flex', mr: "12px"}} variant='body2'>(m/s)</Typography>
                        </>
                      }
                      <FormControlLabel 
                        control={
                          <Checkbox checked={detectOutliers} 
                            onClick={(e)=>{
                                if (e.target.checked){
                                  setDetectOutliers(true)
                                  setShowSpeedRange(false)
                                  setMinSpeedRange(null)
                                  setMaxSpeedRange(null)
                                }else {
                                  setDetectOutliers(false)
                                  setOutlierSpeedThreshold(null)
                                }
                              }}
                          />
                        } 
                        label="Detect Outliers?"
                      />
                      {detectOutliers &&
                      <>
                        <Input
                          style={{width: "130px", marginLeft:"-12px"}}
                          value={outlierSpeedThreshold}
                          onChange={(e) => setOutlierSpeedThreshold(e.target.value)}
                          placeholder={"Speed Threshold"}
                        />
                        <Typography sx={{display:'inline-flex', mr: "12px"}} variant='body2'>(m/s)</Typography>
                      </>
                      }
                    </Grid> 
                    <Grid item>
                      <LoadingButton variant='outlined' onClick={handleDownloadImage}>Save Map</LoadingButton>
                    </Grid> 
                  </Grid>
              </Stack>
              }
              <div ref={mapRef}>
                {resultMode===0 && 
                  <ResultMap generalStats={generalStats} userStats={userStats} minSpeedRange={minSpeedRange} maxSpeedRange={maxSpeedRange} outlierSpeedThreshold={outlierSpeedThreshold} showPoints={showPoints} showGeneralHeatmap={showGeneralHeatmap} showMedianUsers={showMedianUsers} showTrajectoryLines={showTrajectoryLines} formData={formData} setFormData={setFormData} latCenter={latCenter} lonCenter={lonCenter} pointsTest={pointsTest}/>
                }
              </div>
              {resultMode===1 &&
                <ResultTable pointsTest={pointsTest}/>
              }
              {resultMode===2 &&
                <ResultStats generalStats={generalStats} userStats={userStats} points={pointsTest}/>
              }
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
