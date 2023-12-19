import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';


// Filter functionalities
import { filter } from 'lodash';

// @mui
import { Grid, Button, Container, Stack, Typography, Paper, TableContainer, Table, TableBody, TableRow, TableCell, TablePagination } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { Link } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

// api
import { getUniversitiesInfo } from '../../api/actions/tools';


// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';

// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';


// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'rank', label: 'Rank', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'location', label: 'Location', alignRight: false },
  { id: 'overal', label: 'Overal Score', alignRight: false },
  { id: 'appfee', label:'Application Fee', alignRight:false},
  { id: 'ISR', label: 'International Students', alignRight: false },
  { id: 'AR', label: 'Academic Reputation', alignRight: false },
  { id: 'ER', label: 'Employment Reputation', alignRight: false },
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
  if (orderBy==="location"){
    if (b[orderBy]?.name < a[orderBy]?.name) {
      return -1;
    }
    if (b[orderBy]?.name > a[orderBy]?.name) {
      return 1;
    }
  }else{
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
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


export default function UniversitySearchPage() {

  const [universitiesInfo, setUniversitiesInfo] = useState([])
  const [filteredUniversities, setFilteredUniversities] = useState([])

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

  const _getUniversitiesInfo = async () => {
    const data = await getUniversitiesInfo()
    setUniversitiesInfo(data.universities)
  }

  useEffect(()=>{
    _getUniversitiesInfo()
  },[])

  useEffect(()=>{
    if (universitiesInfo.length > 0){
      const _filteredUniversities = applySortFilter(universitiesInfo, getComparator(order, orderBy), filterName);
      setFilteredUniversities(_filteredUniversities)
    }
  }, [universitiesInfo.length, filterName, order, orderBy])
  


  return (
    <>
      <Helmet>
        <title> Kooch | Universities </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="start" mb={1}>
          <Link to={'/dashboard'} style={{textDecoration:'none'}}>
            <Iconify icon={'ic:round-arrow-back'} width={24} height={24} style={{color:'black', marginRight:'16px'}}/>
          </Link>
          <Typography variant="h4" gutterBottom>
            University Search
          </Typography>
        </Stack>
        <Typography variant="body2" gutterBottom sx={{mb:2}}>
          Below is the list of the top 1200 universities in the world according to QS. For more information you can visit <a target={'_blank'} rel="noreferrer" href='https://www.topuniversities.com/university-rankings/world-university-rankings/2023'>here</a>.
        </Typography>

        {/* Uni Table */}
        { filteredUniversities.length === 0 && filterName==='' ? 
            <>
              <div style={{marginBottom:'5px'}}>Loading...</div>
              <LinearProgress />
            </>
          :
          <Grid container justifyContent='center' spacing={1}>
            <Grid item xs={12} justifyContent='center'>
              <Paper elevation={4} sx={{borderRadius:'25px'}}>
                <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />

                <Scrollbar>
                  <TableContainer>
                    <Table>
                      <UserListHead
                        color={'#2065D1'}
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        onRequestSort={handleRequestSort}
                      />
                      <TableBody>
                        {filteredUniversities?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                          const { _id, name, AR, ER, overal, rank, ISR, location, AppFee} = row;
                          
                          return (
                            <StyledTableRow key={_id}>


                              <StyledTableCell  align="left"><strong>#{rank}</strong></StyledTableCell >

                              <StyledTableCell  component="th" scope="row" padding="normal">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2" noWrap>
                                    {name}
                                  </Typography>
                                </Stack>
                              </StyledTableCell >

                              <StyledTableCell  component="th" scope="row" padding="normal">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2" noWrap>
                                    {location?.name}
                                  </Typography>
                                </Stack>
                              </StyledTableCell >

                              <StyledTableCell  align="left">{overal}</StyledTableCell >
                              <StyledTableCell  align="left"><strong>${AppFee}</strong></StyledTableCell >
                              <StyledTableCell  align="left">
                                {ISR}
                              </StyledTableCell >

                              <StyledTableCell  align="left">
                                {AR}
                              </StyledTableCell >
                              
                              <StyledTableCell  align="left">
                                {ER}
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
                  count={filteredUniversities.length}
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
