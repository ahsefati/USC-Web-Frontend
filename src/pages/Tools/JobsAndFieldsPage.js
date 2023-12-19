import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ReactApexChart from "react-apexcharts";

// Filter functionalities
import { filter } from 'lodash';

// @mui
import { Grid, Button, Container, Stack, Typography, Paper, FormControl, TableCell, Autocomplete, TextField, TableContainer, Table, TableBody, TableRow, TablePagination } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';

// API
import { searchFieldsByNF, searchJobsByNJ } from '../../api/actions/tools';

// Data
import degreeTypes from '../../_mock/degreeTypes'
import fieldNames from '../../_mock/fieldNames';
import jobNames from '../../_mock/jobNames';

// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';

// sections
import { AppDonutCharts, AppBarCharts } from '../../sections/@dashboard/app';
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';


// ----------------------------------------------------------------------
const TABLE_HEAD_JOBS = [
  { id: 'nJ', label: 'Job Title', alignRight: false },
  { id: 'minS', label: 'Minimum Salary', alignRight: false },
  { id: 'avgS', label: 'Average Salary', alignRight: false },
  { id: 'maxS', label: 'Maximum Salary', alignRight: false },
];

const TABLE_HEAD_FIELDS = [
  { id: 'nF', label: 'Field Title', alignRight: false },
  { id: 'minS', label: 'Minimum Salary', alignRight: false },
  { id: 'avgS', label: 'Average Salary', alignRight: false },
  { id: 'maxS', label: 'Maximum Salary', alignRight: false },
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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query, isField) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query && isField) {
    return filter(array, (_job) => _job.nF.toLowerCase().indexOf(query.toLowerCase()) !== -1 );
  }
  if (query && !isField){
    return filter(array, (_job) => _job.nJ.toLowerCase().indexOf(query.toLowerCase()) !== -1 );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function JobsAndFieldsPage() {
  const theme = useTheme()
  const [selectedDegreeType, setSelectedDegreeType] = useState(degreeTypes[0].label)
  const [valueDT, setValueDT] = useState(degreeTypes[0].label)

  const [selectedFieldName, setSelectedFieldName] = useState(fieldNames[0].label)
  const [valueNF, setValueNF] = useState(fieldNames[0].label)

  const [selectedJobName, setSelectedJobName] = useState(jobNames[0].label)
  const [valueNJ, setValueNJ] = useState(jobNames[0].label)

  const config = {
    series: [{
      name: "Salary in US$",
      data: [
        {y:30, x:'Below High School', fillColor:'#2065d1'}, 
        {y:38, x: 'High School', fillColor:'#ffc107'}, 
        {y:43, x: 'College', fillColor:'#1890ff'}, 
        {y:46, x: 'Associate', fillColor:'#ff4842'}, 
        {y:63, x: 'Bachelor', fillColor:'#54d62c'}, 
        {y:79, x: 'Masters', fillColor:'#b78103'}, 
        {y:91, x: 'PhD', fillColor:'#08660d'}
      ]
    }],
    options: {
      legend:{show:false},
      toolbar:{show:false},
      plotOptions: {
        bar: {
          distributed: true,
          horizontal: true,
          columnWidth: '100%',
          borderRadius: 10
        }
      },
    }
  }

  // For tables of jobs and fields
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('rank');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [isField, setIsField] = useState(false)
  const [searched, setSearched] = useState(false)
  const [jobsloading, setJobsloading] = useState(false)
  const [fieldsloading, setFieldsloading] = useState(false)

  const handleSearchFieldsByNF = async (formData) => {
    setJobs([])
    setFilteredJobs([])
    setIsField(false)
    setSearched(false)
    setJobsloading(true)
    setPage(0);
    const data = await searchFieldsByNF(formData)
    setJobsloading(false)
    setSearched(true)
    setJobs(data?.field?.Jobs)
  }

  const handleSearchJobsByNJ = async (formData) => {
    setJobs([])
    setFilteredJobs([])
    setIsField(true)
    setSearched(false)
    setFieldsloading(true)
    setPage(0);
    const data = await searchJobsByNJ(formData)
    setFieldsloading(false)
    setSearched(true)
    setJobs(data?.job?.Fields)
  }

  useEffect(()=>{
    if (jobs?.length > 0){
      const _filteredJobs = applySortFilter(jobs, getComparator(order, orderBy), filterName, isField);
      setFilteredJobs(_filteredJobs)
    }
  }, [jobs?.length, filterName, order, orderBy])

  return (
    <>
      <Helmet>
        <title> CoinSigma | Compare Salaries </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="start" mb={1}>
          <Link to={'/dashboard'} style={{textDecoration:'none'}}>
            <Iconify icon={'ic:round-arrow-back'} width={24} height={24} style={{color:'black', marginRight:'16px'}}/>
          </Link>
          <Typography variant="h4" gutterBottom>
            Compare Salaries
          </Typography>
        </Stack>
        <Typography variant="body2" gutterBottom sx={{mb:6}}>
          Play with the graph below to get an understanding about how your job and field of study can affect your average income.
        </Typography>

        <Grid container justifyContent={'center'} spacing={3}>
          <Grid xs={12} sm={12} md={7} item>
            {/* <ReactApexChart options={config.options} series={config.series} type="bar" />   */}
            <AppBarCharts
              title=" Annual Salary by Degree Level (US$)"
              config={config}
            />
          </Grid>

          <Grid xs={12} sm={12} md={5} item>
            <AppDonutCharts 
              title="Percentage of Each Degree Level"
              chartData={[
                { label: 'Below High School', value: 4},
                { label: 'High School', value: 29 },
                { label: 'College', value: 17 },
                { label: 'Associate', value: 13 },
                { label: 'Bachelor', value: 28 },
                { label: 'Master', value: 6 },
                { label: 'PhD', value: 3 },
              ]}
              // chartColors={}
            />
          </Grid>          
        </Grid>

        <Grid container justifyContent={"center"} spacing={3} sx={{mt:1, }}>
          <Grid item xs={12} sm={12} md={6}>
            <Paper elevation={3} sx={{padding:'12px'}}>
              <Typography variant="h4" sx={{ color: 'text.primary' }} noWrap>
                Field to Job Search
              </Typography>
              <Typography variant="p">
                See what jobs you can have after your graduation!
              </Typography>
              <br/><br/>
              <FormControl fullWidth sx={{mb:2}}>
                <Autocomplete
                  disablePortal
                  id="fieldlevel"
                  fullWidth
                  options={degreeTypes}
                  value={valueDT}
                  onChange={(event, newValue) => {
                    setValueDT(newValue);
                    setValueNF(fieldNames[0].label)
                  }}
                  inputValue={selectedDegreeType}
                  onInputChange={(event, newInputValue) => {
                    setSelectedDegreeType(newInputValue);
                  }}
                  renderInput={(params) => <TextField {...params} label="Type your field level here" />}
                />
              </FormControl>
              <FormControl fullWidth sx={{mb:2}}>
                <Autocomplete
                  disablePortal
                  id="fieldnames"
                  fullWidth
                  options={fieldNames.filter((fieldName)=>fieldName.dts.includes(valueDT?.label))}
                  value={valueNF}
                  onChange={(event, newValue) => {
                    setValueNF(newValue);
                    
                  }}
                  inputValue={selectedFieldName}
                  onInputChange={(event, newInputValue) => {
                    setSelectedFieldName(newInputValue);
                  }}
                  renderInput={(params) => <TextField {...params} label="Type your desired field name here" />}
                />
              </FormControl>

              <LoadingButton loading={jobsloading} sx={{width:'100%'}} variant="contained" onClick={()=>handleSearchFieldsByNF({nf:valueNF.label, dt:valueDT.label})}>
                Search Related Jobs
              </LoadingButton>
              
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Paper elevation={3} sx={{padding:'12px'}}>
              <Typography variant="h4" sx={{ color: 'text.primary' }} noWrap>
                Job to Field Search
              </Typography>
              <Typography variant="p">
                See what fields can get you the job you always wanted!
              </Typography>
              <br/><br/>
              <FormControl fullWidth sx={{mb:2}}>
                <Autocomplete
                  disablePortal
                  id="jobsearch"
                  fullWidth
                  options={jobNames}
                  value={valueNJ}
                  onChange={(event, newValue) => {
                    setValueNJ(newValue);
                  }}
                  inputValue={selectedJobName}
                  onInputChange={(event, newInputValue) => {
                    setSelectedJobName(newInputValue);
                  }}
                  renderInput={(params) => <TextField {...params} label="Type your desired job here" />}
                />
              </FormControl>

              <LoadingButton loading={fieldsloading} sx={{width:'100%',}} variant="contained" color='warning' onClick={()=>handleSearchJobsByNJ({nj:valueNJ.label})}>
                Search Related Fields
              </LoadingButton>
            </Paper>
          </Grid>
        </Grid>

        {/* TABLE FOR JOBS and FIELDS. Note: to avoid duplication, I used both with the same name as the only differece was nJ and nF! */}
        <Paper elevation={6} sx={{mt:4, display:searched?'inherit':'none'}}>
          <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />
          <Scrollbar>
            <TableContainer>
              <Table>
                <UserListHead
                  color={isField?'#ffc107':'#2065D1'}
                  order={order}
                  orderBy={orderBy}
                  headLabel={isField?TABLE_HEAD_FIELDS:TABLE_HEAD_JOBS}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredJobs?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { avgS, minS, maxS, nF, nJ} = row;
            
                    return (
                      <StyledTableRow key={isField?(nF+avgS):(nJ+avgS)}>

                        <StyledTableCell  align="left"><strong>{isField?nF:nJ}</strong></StyledTableCell>

                        <StyledTableCell  align="left">{minS}</StyledTableCell>
                        <StyledTableCell  align="left">{avgS}</StyledTableCell>
                        <StyledTableCell  align="left">{maxS}</StyledTableCell>

                      </StyledTableRow>
                    );
                  })}
                  
                </TableBody>

              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={filteredJobs?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>


      </Container>
    </>
  );
}
