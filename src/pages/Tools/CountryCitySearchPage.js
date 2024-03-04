import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';


// Filter functionalities
import { filter } from 'lodash';

// @mui
import { Grid, Button, Container, Stack, Typography, Paper, TableContainer, Table, TableBody, TableRow, TableCell, TablePagination } from '@mui/material';
import { LoadingButton } from '@mui/lab'; 
import { tableCellClasses } from '@mui/material/TableCell';
import { Link } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

// api
import { getCountriesInfo } from '../../api/actions/tools';

// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';

// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';


// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'QofLife', label: 'Quality of Life', alignRight: false },
  // { id: 'Safety', label: 'Safety', alignRight: false },
  // { id: 'CLI', label:'Cost of Living Index', alignRight:false},
  // { id: 'RI', label: 'Rent Index', alignRight: false },
  { id: 'TFB', label: 'Tuition Fee (Bachelor)', alignRight: false },
  { id: 'TFG', label: 'Tuition Fee (Graduate)', alignRight: false },
  { id: 'VISA', label: 'VISA Fee', alignRight: false },
];

const TABLE_HEAD_CITY = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'QofLife', label: 'Quality of Life', alignRight: false },
  { id: 'country', label: 'Country', alignRight: false },
  // { id: 'Safety', label: 'Safety', alignRight: false },
  { id: 'CLI', label:'Cost of Living Index', alignRight:false},
  // { id: 'RI', label: 'Rent Index', alignRight: false },
  // { id: 'CI', label: 'Climate Index', alignRight: false },
  // { id: 'HCI', label: 'Health Care Index', alignRight: false },
  // { id: 'PPtoIR', label: 'Property Purchase Index', alignRight: false },
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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_university) => _university.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 || (_university.location?.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 && _university.location !== undefined));
  }
  return stabilizedThis.map((el) => el[0]);
}


export default function CountryCitySearchPage() {

  const [showCity, setShowCity] = useState(false)

  const [countriesInfo, setCountriesInfo] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [citiesInfo, setCitiesInfo] = useState([])
  const [filteredCities, setFilteredCities] = useState([])

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('desc');

  const [orderBy, setOrderBy] = useState('QofLife');

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

  const _getCountriesCitiesInfo = async () => {
    const data = await getCountriesInfo()
    setCountriesInfo(data.countries)
    setCitiesInfo(data.cities)
  }

  useEffect(()=>{
    _getCountriesCitiesInfo()
  },[])

  useEffect(()=>{
    if (countriesInfo.length > 0){
      const _filteredCountries = applySortFilter(countriesInfo, getComparator(order, orderBy), filterName);
      const _filteredCities = applySortFilter(citiesInfo, getComparator(order, orderBy), filterName);
      setFilteredCountries(_filteredCountries)
      setFilteredCities(_filteredCities)
    }
  }, [countriesInfo.length, filterName, order, orderBy])



  return (
    <>
      <Helmet>
        <title> USC-WEB | Countries & Cities </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="start" mb={1}>
          <Link to={'/dashboard'} style={{textDecoration:'none'}}>
            <Iconify icon={'ic:round-arrow-back'} width={24} height={24} style={{color:'black', marginRight:'16px'}}/>
          </Link>
          <Typography variant="h4" gutterBottom>
            <LoadingButton style={{fontSize:'20px', marginRight:'8px',}} onClick={()=>setShowCity(false)} variant={showCity?"outlined":"contained"}>
              Country
            </LoadingButton>
            &
            <LoadingButton style={{fontSize:'20px', marginRight:'8px', marginLeft:'8px'}} onClick={()=>setShowCity(true)} variant={showCity?"contained":"outlined"}>
              City
            </LoadingButton>
            Search
          </Typography>
        </Stack>
        <Typography variant="body2" gutterBottom sx={{mb:2}}>
          Below is the list of all important {showCity?'cities':'countries'} around the world.
        </Typography>

        {/* Uni Table */}
        { filteredCountries.length === 0 && filterName==='' ? 
            <>
              <div style={{marginBottom:'5px'}}>Loading...</div>
              <LinearProgress />
            </>
          :
          showCity?
          <Grid container justifyContent='center' spacing={1}>
            <Grid item xs={12} justifyContent='center'>
              <Paper elevation={4} sx={{borderRadius:'25px'}}>
                <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />

                <Scrollbar>
                  <TableContainer>
                    <Table>
                      <UserListHead
                        color={"#FFC107"}
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD_CITY}
                        onRequestSort={handleRequestSort}
                      />
                      <TableBody>
                        {filteredCities?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                          const { _id, name, country, QofLife, Safety, CLI, RI, CI, PPtoIR, HCI} = row;
                          
                          return (
                            <StyledTableRow key={_id}>

                              <StyledTableCell  component="th" scope="row" padding="normal">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2" noWrap>
                                    <strong>{name}</strong>
                                  </Typography>
                                </Stack>
                              </StyledTableCell >


                              <StyledTableCell  component="th" scope="row" padding="normal">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2" noWrap>
                                    <strong>{QofLife}</strong>
                                  </Typography>
                                </Stack>
                              </StyledTableCell >

                              <StyledTableCell  component="th" scope="row" padding="normal">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2" noWrap>
                                    {countriesInfo.filter(c=>c.cid===country)[0]?.name}
                                  </Typography>
                                </Stack>
                              </StyledTableCell >

                              {/* <StyledTableCell  align="left">{Safety}</StyledTableCell > */}
                              <StyledTableCell  align="left">{CLI}</StyledTableCell >
                              {/* <StyledTableCell  align="left">
                                {RI}
                              </StyledTableCell >

                              <StyledTableCell  align="left">
                                {CI}
                              </StyledTableCell >
                              
                              <StyledTableCell  align="left">
                                {HCI}
                              </StyledTableCell >

                              <StyledTableCell  align="left">
                                {PPtoIR}
                              </StyledTableCell > */}

                            </StyledTableRow>
                          );
                        })}
                        
                      </TableBody>

                    </Table>
                  </TableContainer>
                </Scrollbar>

                <TablePagination
                  rowsPerPageOptions={[10, 50, 100, 300]}
                  component="div"
                  count={filteredCities.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Grid>
          </Grid>
          :
          <Grid container justifyContent='center' spacing={1}>
            <Grid item xs={12} justifyContent='center'>
              <Paper elevation={4} sx={{borderRadius:'25px'}}>
                <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />

                <Scrollbar>
                  <TableContainer>
                    <Table>
                      <UserListHead
                        color={"#FFC107"}
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        onRequestSort={handleRequestSort}
                      />
                      <TableBody>
                        {filteredCountries?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                          const { _id, name, QofLife, Safety, CLI, RI, TFB, TFG, VISA} = row;
                          
                          return (
                            <StyledTableRow key={_id}>

                              <StyledTableCell  component="th" scope="row" padding="normal">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2" noWrap>
                                    <strong>{name}</strong>
                                  </Typography>
                                </Stack>
                              </StyledTableCell >

                              <StyledTableCell  component="th" scope="row" padding="normal">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2" noWrap>
                                    <strong>{QofLife}</strong>
                                  </Typography>
                                </Stack>
                              </StyledTableCell >

                              {/* <StyledTableCell  align="left">{Safety}</StyledTableCell >
                              <StyledTableCell  align="left">{CLI}</StyledTableCell >
                              <StyledTableCell  align="left">
                                {RI}
                              </StyledTableCell > */}

                              <StyledTableCell  align="left">
                                ${TFB}
                              </StyledTableCell >
                              
                              <StyledTableCell  align="left">
                                ${TFG}
                              </StyledTableCell >

                              <StyledTableCell  align="left">
                                ${VISA}
                              </StyledTableCell >

                            </StyledTableRow>
                          );
                        })}
                        
                      </TableBody>

                    </Table>
                  </TableContainer>
                </Scrollbar>

                <TablePagination
                  rowsPerPageOptions={[10, 100, 250, 500]}
                  component="div"
                  count={filteredCountries.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Grid>
          </Grid>
        }
      </Container>
    </>
  );
}
