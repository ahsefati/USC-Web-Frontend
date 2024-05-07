import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Chart from 'chart.js/auto';

// @mui
import { Grid, Input, Container, Stack, Typography, FormControl, Select, MenuItem, InputLabel, Button, Checkbox, FormControlLabel, Tooltip} from '@mui/material';
import { Link } from 'react-router-dom';

// api


// components
import Iconify from '../../components/iconify';
import { getAllSources, getHistogramInfo } from 'src/api/actions/points';
import { LoadingButton } from '@mui/lab';
import ResultHistogram from 'src/sections/@dashboard/app/ResultHistogram';

const isNumber = (n) => { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }



export default function GenerateHistogramPage() {
  const [hOfChart, setHOfChart] = useState(700)
  const [wOfChart, setWOfChart] = useState(1000)
  const [excludeZero, setExcludeZero] = useState(false)
  
  const [sources, setSources] = useState([])

  
  const [histogramInfo, setHistogramInfo] = useState([])
  const [histogramInfoExludeZero, setHistogramInfoExludeZero] = useState([])
  const [formData, setFormData] = useState({"mode": 'time', "limit": '', "precision": '', "sourceId": -1})
  const [histogramInfoAll, setHistogramInfoAll] = useState([])

  const [loading, setLoading] = useState(false)
  const [showMode, setShowMode] = useState(0)

  const _getInfo = async () => {
    setLoading(true)
    if (!isNumber(formData["limit"])){
      formData["limit"] = 5
    }
    if (!isNumber(formData["precision"])){
      formData["precision"] = 5
    }
    if (formData["sourceId"]===-1){
      delete formData["sourceId"]
    }

    const data = await getHistogramInfo(formData)
    const limitedData = data.slice(0, parseInt(formData["limit"]))
    
    limitedData.sort((a,b) => {
      return a.histo_value - b.histo_value
    })
    
    setHistogramInfo(limitedData)
    const dataExcludeZero = limitedData.filter(item => item.histo_value!==0)
    setHistogramInfoExludeZero(dataExcludeZero)

    setHistogramInfoAll(data)

    setLoading(false)

  }

  const handleGetSources = async () => {
    const sourcesData = await getAllSources()
    setSources(sourcesData)
  }

  useEffect(()=>{
    handleGetSources()
  },[])

  const createChart = (data) => {
    const existingChart = Chart.getChart('histogramChart');
    if (existingChart) {
      existingChart.destroy();
    }

    const ctx = document.getElementById('histogramChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(item => item.histo_value),
        datasets: [{
          label: 'Number of Points',
          data: data.map(item => item.point_count),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          datalabels: {
            display: false
          }
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: formData["mode"]==="time"?'Time Interval (Seconds)':'Distance Interval (Meters)'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Number of Points'
            },
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          },
          datalabels: {
            display: false
          }
        },
        backgroundColor: 'white'
      }
    });

    ctx.style.backgroundColor = 'white';
  };

  const downloadChart = () => {
    const chart = document.getElementById('histogramChart');
    const canvas = document.createElement('canvas');
    canvas.width = chart.width;
    canvas.height = chart.height;
    const ctx = canvas.getContext('2d');

    // Set canvas background color
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw chart on the new canvas
    ctx.drawImage(chart, 0, 0);

    // Generate image data URL
    const chartData = canvas.toDataURL('image/png');

    // Create a temporary link element and trigger download
    const link = document.createElement('a');
    link.href = chartData;
    link.download = 'histogram.png';
    link.click();
  };

  useEffect(()=>{
    if (histogramInfo.length > 0 && showMode===0) {
      if (excludeZero){
        createChart(histogramInfoExludeZero)
      }else{
        createChart(histogramInfo)
      }
    }
  }, [histogramInfo, excludeZero, showMode, hOfChart, wOfChart])

  useEffect(()=>{
    const limitedData = histogramInfoAll.slice(0, parseInt(formData["limit"]))
    
    limitedData.sort((a,b) => {
      return a.histo_value - b.histo_value
    })
    
    setHistogramInfo(limitedData)
    const dataExcludeZero = limitedData.filter(item => item.histo_value!==0)
    setHistogramInfoExludeZero(dataExcludeZero)
    
  },[formData["limit"]])

  return (
    <>
      <Helmet>
        <title> USC Web | Users Info </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="start" mb={1} mt={2}>
          <Link to={'/dashboard'} style={{textDecoration:'none'}}>
            <Iconify icon={'ic:round-arrow-back'} width={24} height={24} style={{color:'black', marginRight:'16px'}}/>
          </Link>
          <Typography variant="h4" gutterBottom>
            Generate Histogram
          </Typography>
        </Stack>
        <Typography variant="body2" gutterBottom sx={{mb:2}}>
          Here, you can generate different histogram figures based on various metrics such as time and distance.
        </Typography>

        <Stack direction={'row'} spacing={3} alignItems={'baseline'} overflow={"auto"}>
          <FormControl style={{marginTop:'12px', minWidth:'180px'}}>
            <InputLabel id="Histogram Mode">Mode</InputLabel>
            <Select
              labelId="Histogram Mode"
              id="Histogram Mode"
              value={formData['mode']}
              label="Histogram Mode"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  ['mode']: e.target.value,
                })
              }}
            >
              <MenuItem value={'time'}>Time Gap</MenuItem>
              <MenuItem value={'distance'}>Distance Gap</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={{marginTop:'12px', minWidth:'180px'}}>
            <InputLabel id="Select Source to Explore">Dataset</InputLabel>
            <Select
              labelId="Select Source to Explore"
              id="Select Source to Explore"
              value={formData['sourceId']}
              label="Select Source to Explore"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  ['sourceId']: e.target.value,
                })
              }}
            >
              <MenuItem value={-1}>All Sources</MenuItem>
              {sources.map(source => {
                return (
                  <MenuItem key={source.sourceId} value={source.sourceId}>{source.name}</MenuItem>
                )
              })

              }
            </Select>
          </FormControl>
          <Input
            sx={{width:"120px"}}
            value={formData['username']}
            onChange={(e) =>
              {
                if (e.target.value!==''){
                  setFormData({
                    ...formData,
                    ['username']: e.target.value,
                  })
                }else{
                  const updatedFormData = { ...formData };
                  delete updatedFormData['username'];
                  setFormData(updatedFormData);
                }
              }
            }
            placeholder={'Username'}
          />
          <Stack direction={"column"}>
            <Tooltip title="Number of top results to be shown on the chart.">
              <Input
                sx={{minWidth:"210px"}}
                value={formData['limit']}
                onChange={(e) =>
                  {
                    setFormData({
                      ...formData,
                      ['limit']: e.target.value,
                    })
                  }
                }
                placeholder={'Number of Bins (default: 5)'}
                
              />
            </Tooltip>
          </Stack>
          <Stack direction={"column"}>
            <Input
              sx={{minWidth:"180px"}}
              value={formData['precision']}
              onChange={(e) =>
                {
                  setFormData({
                    ...formData,
                    ['precision']: e.target.value,
                  })
                }
              }
              placeholder={'Bin Interval (default: 5)'}
            />
            <Typography variant='body2'>{formData['mode']==="time" ? 'Unit: Seconds' : 'Unit: Meters'}</Typography>
          </Stack>
          <LoadingButton sx={{minWidth:"180px"}} loading={loading} onClick={_getInfo} variant='contained' color='primary' size='large'>Generate</LoadingButton>
        </Stack>
        <Stack direction={'row'} spacing={1}>
          <Button onClick={()=>setShowMode(0)} variant={showMode?'outlined':'contained'}>Chart</Button>
          <Button onClick={()=>setShowMode(1)} variant={!showMode?'outlined':'contained'}>Table</Button>
        </Stack>

        {/* MODE == CHART */}
        {histogramInfo.length > 0 && showMode===0 &&
          <>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{mt:2}}>
              <Grid item>
                <Typography variant='body' sx={{mr:1}}>Chart Height:</Typography>
                <Input
                  sx={{mr:6, width:'60px'}}
                  value={hOfChart}
                  onChange={(e) => setHOfChart(e.target.value)}
                  placeholder={'Chart Height'}
                />
                <Typography variant='body' sx={{mr:1}}>Chart Width:</Typography>
                <Input
                  sx={{mr:6, width:'60px'}}
                  value={wOfChart}
                  onChange={(e) => setWOfChart(e.target.value)}
                  placeholder={'Chart Width'}
                />
                <FormControlLabel control={<Checkbox checked={excludeZero} onClick={(e)=>setExcludeZero(e.target.checked)}/>} label="Exclude Zero?"/>
              </Grid>
              <Grid item>
                <Button startIcon={<Iconify icon="material-symbols:cloud-download-outline"/>} sx={{minWidth:"180px"}} variant='outlined' onClick={downloadChart}>Download (PNG)</Button>
              </Grid>
            </Stack>
            {/* Show the results */}
            <Grid container sx={{mt:4, minWidth:'100%'}} justifyContent={'center'}>
              <canvas id="histogramChart" style={{minHeight: `${hOfChart}px`, maxHeight: `${hOfChart}px`, minWidth: `${wOfChart}px`, maxWidth: `${wOfChart}px`, backgroundColor: 'white'}}></canvas>
            </Grid>
          </>
        }
        {showMode===1 &&
          <ResultHistogram histogramInfo={histogramInfoAll}/>
        }
      </Container>
    </>
  );
}
