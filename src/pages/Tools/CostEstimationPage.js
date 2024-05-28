import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { ceil } from 'lodash';

// @mui
import { Grid, Button, Container, Stack, Typography, Paper, Table, TableCell, TableRow, TableContainer, TableBody, FormControl, InputLabel, Select, MenuItem, TextField, Modal, Chip, Fade, Box, List, ListSubheader, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';

// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import { fShortenNumber } from '../../utils/formatNumber';

// sections
import { UserListHead} from '../../sections/@dashboard/user';
import { getCountriesInfo, getGeneralCosts } from '../../api/actions/tools';

const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'input', label: 'Your Situation', alignRight: false },
  { id: 'price', label: 'Estimated Cost', alignRight: false },
  // { id: 'description', label: 'Description', alignRight: false },
];

// StyledTable
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.grey[300]
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const styledModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '350px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: '10px',
  border: '0px solid black',
};



export default function CostEstimationPage() {
  const theme = useTheme()
  
  // General Info needed for cost estimation
  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])
  const [costs, setCosts] = useState({})

  // User Input Parameters - Degree
  const [openModalToAddDegree, setOpenModalToAddDegree] = useState(false)
  const [selectedFieldToAdd, setSelectedFieldToAdd] = useState("")
  const [selectedDegreeLevelToAdd, setSelectedDegreeLevelToAdd] = useState("")
  const [semestersOfDegree, setSemestersOfDegree] = useState(0)
  const [degreesData, setDegrees] = useState([]);
  const handleDeleteDegree = (degreeToDelete) => {
    setDegrees((degrees) => degrees.filter((degree) => degree.key !== degreeToDelete.key));
  }
  const handleAddingNewDegree = () => {
    const key = degreesData.length + 1
    const label = `${selectedDegreeLevelToAdd} of ${selectedFieldToAdd}`
    const price = costs.free_degree[selectedFieldToAdd][selectedDegreeLevelToAdd] * semestersOfDegree
    
    const newDegree = {
      key,
      label,
      price
    }

    setDegrees([...degreesData, newDegree])
    setOpenModalToAddDegree(false)
  }
  const handleDisplayDegreesPrice = () => {

    let sum = 0
    degreesData.forEach(data => {sum += data.price})
    console.log(degreesData)
    return (
      <>
        {fShortenNumber(sum)}T
        <br/>
        {degreesData.length > 0 &&
          `(${
              degreesData.map((data)=>{
                return(
                  `${fShortenNumber(data.price)}`
                )
              })
            })`
        }
      </>
    )
  }


  const [monthlyCostsInDollar, setMonthlyCostsInDollar] = useState(0)
  const [onetimeBCostsInDollar, setOnetimeBCostsInDollar] = useState(0)
  const [onetimeBCostsInToman, setOnetimeBCostsInToman] = useState(0)
  const [onetimeACostsInDollar, setOnetimeACostsInDollar] = useState(0)
  const [onetimeACostsInToman, setOnetimeACostsInToman] = useState(0)
  
  
  const calculateCosts = () => {
    let sumBCostsDollar = 0
    let sumBCostsToman = 0
    let sumACostsDollar = 0
    let sumACostsToman = 0
    let sumMonthlyDollar = 0
    
    // English Exam
    if (engExam==='' || engExam==="unknown") sumBCostsDollar+= (200 + ((numUniversities-4)*25))
    else if (engExam==='noCost') sumBCostsDollar=0
    else sumBCostsDollar += (costs?.english_exam[engExam]?.official + (numUniversities-4)*costs?.english_exam[engExam]?.mailing_grades)

    // Degree
    if (degreesData.length>0){
      degreesData.forEach(degree=>{
        sumBCostsToman+=degree.price
      })
    }

    // Military Services
    if (military==="yes"){
      sumACostsToman += costs?.military
    }

    // Application Fee Costs
    sumBCostsDollar+=numUniversities*(costs?.unknown_destination?.appFee)


    // Monthly Costs
    if ((typeOfAdmission==="unknown" || typeOfAdmission==="self") && selectedCountry===0){
      sumMonthlyDollar += ((ceil(costs?.unknown_destination?.tuition/12)) + costs?.unknown_destination?.rent + costs?.unknown_destination?.grocery)
    } else if ((typeOfAdmission==="unknown" || typeOfAdmission==="self") && selectedCountry!==0){
      sumMonthlyDollar += (ceil(countries.filter((country)=>country?.cid===selectedCountry)[0]?.TFB/12)) + ceil(20*countries.filter((country)=>country?.cid===selectedCountry)[0]?.RI) + ceil(8*countries.filter((country)=>country?.cid===selectedCountry)[0]?.CLI)
    }else{
      sumMonthlyDollar=0
    }


    // Country - VISA and initial costs
    if (selectedCountry===0){
      sumACostsDollar += costs?.unknown_destination?.visa + costs?.unknown_destination?.rent + costs?.unknown_destination?.deposit + costs?.unknown_destination?.grocery + costs?.unknown_destination?.ticket
    } else {
      sumACostsDollar += countries.filter((country)=>country?.cid===selectedCountry)[0]?.VISA + ceil(20*(countries.filter((country)=>country?.cid===selectedCountry)[0]?.RI)) + ceil(20*(countries.filter((country)=>country?.cid===selectedCountry)[0]?.RI)) + ceil(8*(countries.filter((country)=>country?.cid===selectedCountry)[0]?.CLI)) + ceil(500*(countries.filter((country)=>country?.cid===selectedCountry)[0]?.FA))
    }


    setOnetimeACostsInDollar(sumACostsDollar)
    setOnetimeACostsInToman(sumACostsToman)
    setOnetimeBCostsInDollar(sumBCostsDollar)
    setOnetimeBCostsInToman(sumBCostsToman)
    setMonthlyCostsInDollar(sumMonthlyDollar)


  }

  // Other User Input Parameters
  const [engExam, setEngExam] = useState('')
  const [military, setMilitary] = useState('')
  const [numUniversities, setNumUniversities] = useState(0)
  const [typeOfAdmission, setTypeOfAdmission] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(0)
  const [selectedCity, setSelectedCity] = useState(0)


  const handleGettingInfo = async () => {
    const costsData = await getGeneralCosts()
    console.log(costsData)
    setCosts(costsData.costs[0])
    const countriesData = await getCountriesInfo()
    setCountries(countriesData.countries)
    setCities(countriesData.cities)

    calculateCosts()
  }

  useEffect(()=>{
    handleGettingInfo()
  },[])

  useEffect(()=>{
   calculateCosts() 
  },[engExam, military, numUniversities, typeOfAdmission, selectedCountry, degreesData.length])


  return (
    <>
      <Helmet>
        <title> USC: TrajDash | Cost Estimation </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="start" mb={1}>
          <Link to={'/dashboard'} style={{textDecoration:'none'}}>
            <Iconify icon={'ic:round-arrow-back'} width={24} height={24} style={{color:'black', marginRight:'16px'}}/>
          </Link>
          <Typography variant="h4" gutterBottom>
            Cost Estimation
          </Typography>
        </Stack>
        <Typography variant="body2" gutterBottom sx={{mb:2}}>
          Fill the table below and KoochAI estimates your costs instantly. Costs are devided into categories and sub-categories for an easier use.
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="start" mb={1}>
          <Paper elevation={3} style={{width:'360px', padding:'10px 10px 1px 10px', backgroundColor:`${theme.palette.green.lighter}`}}>
            <Typography variant="subtitle1" gutterBottom sx={{mb:2}}>
              <span>One-Time Costs: <strong>${fShortenNumber(onetimeACostsInDollar+onetimeBCostsInDollar) || 0} + {fShortenNumber(onetimeACostsInToman+onetimeBCostsInToman) || 0}</strong> Tomans</span><br/>
              <span style={{marginLeft:'24px'}}>&#8212; Before Admission: ${fShortenNumber(onetimeBCostsInDollar) || 0} + {fShortenNumber(onetimeBCostsInToman) || 0} Tomans</span><br/>
              <span style={{marginLeft:'24px'}}>&#8212; After Admission: ${fShortenNumber(onetimeACostsInDollar) || 0} + {fShortenNumber(onetimeACostsInToman) || 0} Tomans</span><br/>
            </Typography>
          </Paper>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="start" mb={1}>
          <Paper elevation={3} style={{width:'360px', padding:'10px 10px 1px 10px', backgroundColor:`${theme.palette.green.lighter}`}}>
            <Typography variant="subtitle1" gutterBottom sx={{mb:2}}>
              <span>Monthly-Costs: <strong>${fShortenNumber(monthlyCostsInDollar) || 0}</strong></span>
            </Typography>
          </Paper>
        </Stack>

        <Grid container justifyContent='center' spacing={1} sx={{mt:1}}>
            <Grid item xs={12} justifyContent='center'>
              <Paper elevation={4} sx={{borderRadius:'15px'}}>

                <Scrollbar>
                  <TableContainer sx={{borderRadius:'15px'}}>
                    <Table>
                      <UserListHead
                        color={'#5BAE82'}
                        headLabel={TABLE_HEAD}
                      />
                      <TableBody>

                        <StyledTableRow>
                          <StyledTableCell sx={{maxWidth:'60px'}} align="left"><strong>Degrees</strong></StyledTableCell >
                          <StyledTableCell sx={{minWidth:'350px'}} component="th" scope="row" padding="normal">
                            <Stack direction="row" alignItems="center" spacing={2} sx={{mb:1}}>
                              <LoadingButton onClick={()=>setOpenModalToAddDegree(true)} size='large' startIcon={<Iconify icon="material-symbols:add-circle-outline-rounded"/>} sx={{borderRadius:'15px',}}>Add Degree</LoadingButton><span style={{marginLeft:'12px'}}>(Only if you didn't pay for it yet.)</span>
                            </Stack>
                            <Grid spacing={1} container sx={{minWidth:'350px',maxWidth:'550px', maxHeight:'140px', overflowX:'auto'}}>
                              {degreesData.map((data) => {
                                return (
                                  <Grid key={data.key} item>
                                    <Chip
                                      sx={{ml:'5px'}}
                                      label={data.label}
                                      variant={'filled'}
                                      onDelete={()=>handleDeleteDegree(data)}
                                    />
                                  </Grid>
                                );
                              })}
                            </Grid>
                          </StyledTableCell >
                          <StyledTableCell sx={{maxWidth:'50px'}} component="th" scope="row" padding="normal">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                  {
                                    degreesData.length === 0 ? 
                                      "0 (No Degrees to Pay)" 
                                    : 
                                    handleDisplayDegreesPrice()
                                  }
                              </Typography>
                            </Stack>
                          </StyledTableCell >
                        </StyledTableRow>


                        <StyledTableRow>
                          <StyledTableCell align="left"><strong>Language Exam</strong></StyledTableCell >
                          <StyledTableCell component="th" scope="row" padding="normal">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <FormControl fullWidth>
                                <InputLabel id="Which language exam are you going to take?">Select the Language Exam</InputLabel>
                                <Select
                                  labelId="Select the Language Exam"
                                  id="Which language exam are you going to take?"
                                  value={engExam}
                                  label="Select the Language Exam"
                                  onChange={(e) => setEngExam(e.target.value)}
                                >
                                  <MenuItem value={"unknown"}>I don't know yet!</MenuItem>
                                  <MenuItem value={"noCost"}>I did it before and it's still valid.</MenuItem>
                                  <MenuItem value={"toefl"}>TOEFL</MenuItem>
                                  <MenuItem value={"ielts"}>IELTS</MenuItem>
                                  <MenuItem value={"duolingo"}>Duolingo</MenuItem>
                                </Select>
                              </FormControl>
                              
                            </Stack>
                          </StyledTableCell >
                          <StyledTableCell component="th" scope="row" padding="normal">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              {numUniversities <= 4 ? 
                                <Typography variant="subtitle2" noWrap>
                                  ${(engExam==='' || engExam==="unknown") ? 200 : 
                                  (engExam==="noCost") ? 0 :
                                  costs.english_exam[engExam]?.official 
                                  }
                                </Typography>
                              :
                                <Typography variant="subtitle2" noWrap>
                                  ${
                                  (engExam==='' || engExam==="unknown") ?
                                    <>
                                      {200 + (numUniversities-4)*25}
                                      <br/>
                                      <Typography variant='body2'>
                                        {`($200 + $${(numUniversities-4)*25})`}
                                      </Typography>
                                    </>
                                  : 
                                  (engExam==="noCost") ? 
                                    0
                                  :
                                    <>
                                      {costs.english_exam[engExam]?.official + (numUniversities-4)*costs.english_exam[engExam]?.mailing_grades}
                                      <br/>
                                      <Typography variant='body2'>
                                        {`($${costs.english_exam[engExam]?.official} + $${(numUniversities-4)*costs.english_exam[engExam]?.mailing_grades})`}
                                      </Typography>
                                    </>
                                  }
                                </Typography>
                                
                              }
                            </Stack>
                          </StyledTableCell >
                        </StyledTableRow>

                        <StyledTableRow>
                          <StyledTableCell align="left"><strong>Military Services</strong></StyledTableCell >
                          <StyledTableCell  component="th" scope="row" padding="normal">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <FormControl fullWidth>
                                <InputLabel id="Do you have to do the military services?">Should you do the military services?</InputLabel>
                                <Select
                                  labelId="Do you have to do the military services?"
                                  id="Do you have to do the military services?"
                                  value={military}
                                  label="Do you have to do the military services?"
                                  onChange={(e) => setMilitary(e.target.value)}
                                >
                                  <MenuItem value={"no"}>No, I am exempt from it. (Girls, Done Before, Exempts)</MenuItem>
                                  <MenuItem value={"yes"}>Yes, I have to do it.</MenuItem>
                                </Select>
                              </FormControl>
                              
                            </Stack>
                          </StyledTableCell >
                          <StyledTableCell  component="th" scope="row" padding="normal">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {military==='' || military==="no" ? 0 :
                                  fShortenNumber(costs.military)
                                }T
                              </Typography>
                              
                            </Stack>
                          </StyledTableCell >
                        </StyledTableRow>

                        <StyledTableRow>
                          <StyledTableCell align="left"><strong>Number of Universities to apply</strong></StyledTableCell >
                          <StyledTableCell component="th" scope="row" padding="normal">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <FormControl fullWidth>
                                <TextField fullWidth label="Number of universities to apply" onChange={(e)=>setNumUniversities(e.target.value)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                              </FormControl>
                              
                            </Stack>
                          </StyledTableCell >
                          <StyledTableCell  component="th" scope="row" padding="normal">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                ${numUniversities * costs?.unknown_destination?.appFee}
                              </Typography>
                            </Stack>
                          </StyledTableCell >
                        </StyledTableRow>
                        
                        <StyledTableRow>
                          <StyledTableCell align="left"><strong>Admission Type</strong></StyledTableCell >
                          <StyledTableCell component="th" scope="row" padding="normal">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <FormControl fullWidth>
                                <InputLabel id="Do you know the type your admission exactly?">Select Type of Your Admission</InputLabel>
                                <Select
                                  labelId="Do you know the type your admission exactly?"
                                  id="Do you know the type your admission exactly?"
                                  value={typeOfAdmission}
                                  label="Select Type of Your Admission"
                                  onChange={(e)=>setTypeOfAdmission(e.target.value)}
                                >
                                  <MenuItem value={"unknown"}>I don't know yet!</MenuItem>
                                  <MenuItem value={"full"}>I have (will get) a Fully-funded admission.</MenuItem>
                                  {/* <MenuItem value={"scholarship"}>I have (will get) some scholarships/funds.</MenuItem> */}
                                  <MenuItem value={"self"}>I have (will get) a Self-funded admission.</MenuItem>
                                </Select>
                              </FormControl>
                              
                            </Stack>
                          </StyledTableCell >
                          <StyledTableCell component="th" scope="row" padding="normal">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                ${
                                  ((typeOfAdmission==="unknown" || typeOfAdmission==="self") && selectedCountry===0) ? 
                                     
                                    <>
                                      {(ceil(costs?.unknown_destination?.tuition/12)) + costs?.unknown_destination?.rent + costs?.unknown_destination?.grocery}/month
                                      <br/>
                                      <Typography variant='body2'>
                                        {`($${(ceil(costs?.unknown_destination?.tuition/12))} + $${costs?.unknown_destination?.rent} + $${costs?.unknown_destination?.grocery})`}
                                      </Typography>
                                    </>
                                                                 
                                  :

                                  ((typeOfAdmission==="unknown" || typeOfAdmission==="self" ) && selectedCountry!==0) ? 

                                    <>
                                      {(ceil(countries.filter((country)=>country?.cid===selectedCountry)[0]?.TFB/12)) + ceil(20*countries.filter((country)=>country?.cid===selectedCountry)[0]?.RI) + ceil(8*countries.filter((country)=>country?.cid===selectedCountry)[0]?.CLI)}/month
                                      <br/>
                                      <Typography variant='body2'>
                                        {`($${(ceil(countries.filter((country)=>country?.cid===selectedCountry)[0]?.TFB/12))} + $${ceil(20*countries.filter((country)=>country?.cid===selectedCountry)[0]?.RI)} + $${ceil(8*countries.filter((country)=>country?.cid===selectedCountry)[0]?.CLI)})`}
                                      </Typography>
                                    </>
                                  
                                  :  
                                  (typeOfAdmission)==="full" ? 0 : 0
                                }
                              </Typography>
                            </Stack>
                          </StyledTableCell >
                        </StyledTableRow>

                        <StyledTableRow>
                          <StyledTableCell align="left"><strong>Destination Country</strong></StyledTableCell >
                          <StyledTableCell component="th" scope="row" padding="normal">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <FormControl fullWidth>
                                <InputLabel id="Which country is your destination?">Which country is your destination?</InputLabel>
                                <Select
                                  labelId="Which country is your destination?"
                                  id="Which country is your destination?"
                                  value={selectedCountry}
                                  label="Which country is your destination?"
                                  onChange={(e)=>setSelectedCountry(e.target.value)}
                                >
                                  <MenuItem value={0}>I don't know yet! (I will go anywhere I can)</MenuItem>
                                  {
                                    countries.map((country)=>
                                      {return (
                                          country.Valid===1 &&
                                          <MenuItem key={country.cid} value={country.cid}>{country.name}</MenuItem>
                                      )
                                      }
                                    )
                                  }
                                </Select>
                              </FormControl>
                              
                            </Stack>
                          </StyledTableCell >
                          <StyledTableCell component="th" scope="row" padding="normal">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {
                                  selectedCountry===0 ? 
                                    <>
                                      {
                                        `$${costs?.unknown_destination?.visa + costs?.unknown_destination?.rent + costs?.unknown_destination?.deposit + costs?.unknown_destination?.grocery + costs?.unknown_destination?.ticket}`
                                      }
                                    <br/>
                                    <Typography variant='body2'>
                                      {
                                      `($${costs?.unknown_destination?.visa} + $${costs?.unknown_destination?.rent} + $${costs?.unknown_destination?.deposit} + $${costs?.unknown_destination?.grocery} + $${costs?.unknown_destination?.ticket})`
                                      }
                                    </Typography>
                                    </>
                                  : 
                                    <>
                                        {
                                          `$${countries.filter((country)=>country?.cid===selectedCountry)[0]?.VISA + ceil(20*(countries.filter((country)=>country?.cid===selectedCountry)[0]?.RI)) + ceil(20*(countries.filter((country)=>country?.cid===selectedCountry)[0]?.RI)) + ceil(8*(countries.filter((country)=>country?.cid===selectedCountry)[0]?.CLI)) + ceil(500*(countries.filter((country)=>country?.cid===selectedCountry)[0]?.FA))}`
                                        }
                                      <br/>
                                      <Typography variant='body2'>
                                        {
                                        `($${countries.filter((country)=>country?.cid===selectedCountry)[0]?.VISA} + $${ceil(20*(countries.filter((country)=>country?.cid===selectedCountry)[0]?.RI))} + $${ceil(20*(countries.filter((country)=>country?.cid===selectedCountry)[0]?.RI))} + $${ceil(8*(countries.filter((country)=>country?.cid===selectedCountry)[0]?.CLI))} + $${ceil(500*(countries.filter((country)=>country?.cid===selectedCountry)[0]?.FA))})`
                                        }
                                      </Typography>
                                    </>
                                }
                              </Typography>
                            </Stack>
                          </StyledTableCell >
                        </StyledTableRow>
                        

                        {(selectedCountry===1000) &&
                          <StyledTableRow>
                            <StyledTableCell align="left"><strong>Destination City</strong></StyledTableCell >
                            <StyledTableCell component="th" scope="row" padding="normal">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <FormControl fullWidth>
                                  <InputLabel id="Which city is your destination?">Which city is your destination?</InputLabel>
                                  <Select
                                    labelId="Which city is your destination?"
                                    id="Which city is your destination?"
                                    value={selectedCity}
                                    label="Which city is your destination?"
                                    onChange={(e)=>setSelectedCity(e.target.value)}
                                  >
                                    <MenuItem value={0}>I don't know yet! (or it's not in the list)</MenuItem>
                                    {
                                      cities.map((city)=>
                                        {return (
                                            city.country===selectedCountry &&
                                            <MenuItem value={city.name}>{city.name}</MenuItem>
                                        )
                                        }
                                      )
                                    }
                                  </Select>
                                </FormControl>
                                
                              </Stack>
                            </StyledTableCell >
                            <StyledTableCell component="th" scope="row" padding="normal">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="subtitle2" noWrap>
                                  $200
                                </Typography>
                              </Stack>
                            </StyledTableCell >
                          </StyledTableRow>
                        }
                      </TableBody>



                    </Table>
                  </TableContainer>
                </Scrollbar>
              </Paper>
            </Grid>
          </Grid>


          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModalToAddDegree}
            onClose={()=>setOpenModalToAddDegree(false)}
            closeAfterTransition
          >
            <Fade in={openModalToAddDegree}>
              <Box sx={styledModal}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  Add a Degree
                </Typography>
                <Grid container justifyContent='space-between' spacing={1} sx={{mt:2, maxHeight:'450px', overflow:'auto',}}>
                  <List
                    sx={{ width: '100%', maxWidth: 320, bgcolor: 'background.paper' }}
                  >
                    <ListItem>
                      <ListItemIcon>
                        <Iconify icon='uil:university'/>
                      </ListItemIcon>
                      <FormControl fullWidth>
                        <InputLabel id="General Field">Select General Field</InputLabel>
                        <Select
                          fullWidth
                          labelId="General Field"
                          id="General Field"
                          value={selectedFieldToAdd}
                          label="Select General Field"
                          onChange={(e)=>setSelectedFieldToAdd(e.target.value)}
                        >
                          <MenuItem value={"engineering"}>Engineering</MenuItem>
                          <MenuItem value={"pezeshki_pirapezeshki"}>Medical and Paramedical Sciences</MenuItem>
                          <MenuItem value={"humanities"}>Humanities</MenuItem>
                          <MenuItem value={"art"}>Art</MenuItem>
                          <MenuItem value={"oloom_paye"}>Base Sciences</MenuItem>
                        </Select>
                      </FormControl>
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <Iconify icon='mdi:university-outline'/>
                      </ListItemIcon>
                      <FormControl fullWidth>
                        <InputLabel id="Degree Level">Select Degree Level</InputLabel>
                        <Select
                          fullWidth
                          labelId="Degree Level"
                          id="Degree Level"
                          value={selectedDegreeLevelToAdd}
                          label="Select Degree Level"
                          onChange={(e)=>setSelectedDegreeLevelToAdd(e.target.value)}
                        >
                          {

                          }
                          <MenuItem value={"bachelor"}>Bachelor</MenuItem>
                          <MenuItem value={"masters"}>Master</MenuItem>
                          {selectedFieldToAdd==="pezeshki_pirapezeshki" ?
                            <MenuItem value={"dental"}>Dental</MenuItem>    
                          :
                            <MenuItem value={"phd"}>PhD</MenuItem>
                          }
                          {selectedFieldToAdd==="pezeshki_pirapezeshki" &&
                            <MenuItem value={"pharmacy"}>Pharmacy</MenuItem>  
                          }
                        </Select>
                      </FormControl>
                    </ListItem>

                    <ListItem>
                      <ListItemText>
                        Number of Semesters:
                      </ListItemText>
                      <FormControl fullWidth>
                        <TextField fullWidth defaultValue={0} onChange={(e)=>setSemestersOfDegree(e.target.value)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                      </FormControl>
                    </ListItem>

                  </List>
                </Grid>
                <Grid container spacing={2} sx={{mt:1}} justifyContent="space-around">
                    <Grid item>
                      <LoadingButton color='error' onClick={()=>setOpenModalToAddDegree(false)}>
                        Close
                      </LoadingButton>
                    </Grid>
                    <Grid item xs={8}>
                      <LoadingButton sx={{width:'100%'}} variant="contained" onClick={handleAddingNewDegree}>
                        Add
                      </LoadingButton>
                    </Grid>
                </Grid>
              </Box>
            </Fade>
          </Modal>

      </Container>
    </>
  );
}
