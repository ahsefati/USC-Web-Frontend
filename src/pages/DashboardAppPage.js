import { Helmet } from 'react-helmet-async';
import 'chart.js/auto';
import 'moment';
import 'chartjs-adapter-moment';

// @mui
import { Grid, Container, Stack, Button, Table} from '@mui/material';

import { useEffect, useState } from 'react';

// Needed Sections
import UserNotLoggedIn from '../sections/@dashboard/user/UserNotLoggedInMsg';
import RequestToExecuteForm from '../sections/@dashboard/app/RequestToExecuteForm';
import ResultMap from '../sections/@dashboard/app/ResultMap';
import ResultTable from '../sections/@dashboard/app/ResultTable';

// data
import sqlCommands from '../data/sqlCommands';

// API for Points Test
import { getAllSources, getPoints } from '../api/actions/points';

import Iconify from '../components/iconify';

export default function DashboardAppPage() {
  
  const user = JSON.parse(localStorage.getItem('profile'))
  const [sources, setSources] = useState([])
  const [selectedSource, setSelectedSource] = useState(-1)
  const [sqlCommand, setSqlCommand] = useState(-1)
  const [pointsTest, setPointsTest] = useState([])
  const [executeLoading, setExecuteLoading] = useState(false)
  const [latCenter, setLatCenter] = useState(39)
  const [lonCenter, setLonCenter] = useState(-122)

  // Result Mode
  const [resultMode, setResultMode] = useState(1)
  
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

  const handleResultMode = (id) => {
    setResultMode(id)

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
          <Grid container sx={{mt:1}} spacing={2}>
            <RequestToExecuteForm sources={sources} selectedSource={selectedSource} setSelectedSource={setSelectedSource} sqlCommand={sqlCommand} setSqlCommand={setSqlCommand} formData={formData} setFormData={setFormData} executeLoading={executeLoading} handleGetPoints={handleGetPoints}/>
            <Grid item xs={12} md={12} lg={9}>
              <Stack direction={"row"} spacing={1} sx={{mb:1}}>
                <Button startIcon={<Iconify icon="material-symbols:map-outline"/>} variant={resultMode===0?'contained':'outlined'} color={resultMode===0?'primary':'secondary'} onClick={()=>handleResultMode(0)}>Map</Button>
                <Button startIcon={<Iconify icon="material-symbols:table-rows-outline"/>} variant={resultMode===1?'contained':'outlined'} color={resultMode===1?'primary':'secondary'} onClick={()=>handleResultMode(1)}>Table</Button>
                <Button startIcon={<Iconify icon="material-symbols:bar-chart-rounded"/>} variant={resultMode===2?'contained':'outlined'} color={resultMode===2?'primary':'secondary'} onClick={()=>handleResultMode(2)}>Statistics</Button>
              </Stack>
              {resultMode===0 && (
                pointsTest.length <= 5000? 
                <ResultMap formData={formData} setFormData={setFormData} latCenter={latCenter} lonCenter={lonCenter} pointsTest={pointsTest}/>
                :
                <h3>Too many points to show. Use the Table section instead.</h3>
              )
              }
              {resultMode===1 &&
                <ResultTable pointsTest={pointsTest}/>
              }
              {resultMode===2 &&
                <h3>To be developed...</h3>
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
