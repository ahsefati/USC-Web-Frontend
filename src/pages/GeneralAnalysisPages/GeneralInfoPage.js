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
import { getAllSources, getAllUsers } from '../../api/actions/points';

// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';

// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';


// ----------------------------------------------------------------------
const TABLE_HEAD_USERS = [
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'name', label: 'Source Name', alignRight: false },
  { id: 'metadata', label: 'Metadata', alignRight: false },
  { id: 'speed_90th_percentile_mps', label: '90th Speed (m/s)', alignRight: false },
  { id: 'speed_95th_percentile_mps', label:'95th Speed (m/s)', alignRight:false},
  { id: 'speed_99th_percentile_mps', label: '99th Speed (m/s)', alignRight: false },
  { id: 'speed_99_5th_percentile_mps', label: '99.5th Speed (m/s)', alignRight: false },
  { id: 'speed_99_9th_percentile_mps', label: '99.9th Speed (m/s)', alignRight: false },
];

const TABLE_HEAD_SOURCES = [
  { id: 'sourceId', label: 'Source ID', alignRight: false },
  { id: 'name', label: 'Source Name', alignRight: false },
  { id: 'link', label: 'Source Reference', alignRight: false },
  { id: 'speed_90th_percentile_mps', label: '90th Speed (m/s)', alignRight: false },
  { id: 'speed_95th_percentile_mps', label:'95th Speed (m/s)', alignRight:false},
  { id: 'speed_99th_percentile_mps', label: '99th Speed (m/s)', alignRight: false },
  { id: 'speed_99_5th_percentile_mps', label: '99.5th Speed (m/s)', alignRight: false },
  { id: 'speed_99_9th_percentile_mps', label: '99.9th Speed (m/s)', alignRight: false },
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

function applySortFilter(showMode, array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query && showMode===1) {
    return filter(array, (_data) => _data.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 || _data.username.toLowerCase().indexOf(query.toLowerCase()) !== -1 || (_data?.metadata?.toLowerCase().indexOf(query?.toLowerCase()) !== -1 && _data?.metadata!==null) );
  }
  if (query && showMode===0) {
    return filter(array, (_data) => _data.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 || _data.link.toLowerCase().indexOf(query.toLowerCase()) !== -1 );
  }
  return stabilizedThis.map((el) => el[0]);
}


export default function GeneralInfoPage() {
  const [showMode, setShowMode] = useState(0)

  const [usersInfo, setUsersInfo] = useState([])
  const [sourcesInfo, setSourcesInfo] = useState([])
  const [filteredData, setFilteredData] = useState([])

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

  const _getInfo = async () => {
    const usersData = await getAllUsers()
    setUsersInfo(usersData)
    const sourcesData = await getAllSources()
    setSourcesInfo(sourcesData)
  }

  useEffect(()=>{
    _getInfo()
  },[])

  useEffect(()=>{
    if (usersInfo.length > 0 || sourcesInfo.length > 0){
      const _filteredData = applySortFilter(showMode, showMode===0?sourcesInfo:usersInfo, getComparator(order, orderBy), filterName);
      setFilteredData(_filteredData)
    }
  }, [usersInfo.length, sourcesInfo.length, filterName, order, orderBy, showMode])
  


  return (
    <>
      <Helmet>
        <title> USC Web | Users Info </title>
      </Helmet>

      <Container maxWidth="xxl">
        <Stack direction="row" alignItems="center" justifyContent="start" mb={1} mt={2}>
          <Link to={'/dashboard/generalanalysis'} style={{textDecoration:'none'}}>
            <Iconify icon={'ic:round-arrow-back'} width={24} height={24} style={{color:'black', marginRight:'16px'}}/>
          </Link>
          <Typography variant="h4" gutterBottom>
            Sources & Users
          </Typography>
        </Stack>
        <Typography variant="body2" gutterBottom sx={{mb:2}}>
          You can see all the general information related to the sources and their users in this page.
        </Typography>

        {/* Uni Table */}
        { filteredData.length === 0 && filterName==='' ? 
            <>
              <div style={{marginBottom:'5px'}}>Loading...</div>
              <LinearProgress />
            </>
          :
          <>
            <Stack direction={'row'} spacing={1}>
              <Button onClick={()=>setShowMode(0)} variant={showMode?'outlined':'contained'}>Sources</Button>
              <Button onClick={()=>setShowMode(1)} variant={!showMode?'outlined':'contained'}>Users</Button>
            </Stack>

            <Grid container justifyContent='center' spacing={1}>
              <Grid item xs={12} justifyContent='center'>
                <Paper elevation={4} sx={{borderRadius:'25px'}}>
                  <UserListToolbar filteredData={filteredData} filterName={filterName} onFilterName={handleFilterByName} />

                  <Scrollbar>
                    <TableContainer>
                      <Table>
                        <UserListHead
                          color={'#2065D1'}
                          order={order}
                          orderBy={orderBy}
                          headLabel={showMode===0?TABLE_HEAD_SOURCES:TABLE_HEAD_USERS}
                          onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                          {filteredData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            const { sourceId, link, username, name, metadata, speed_90th_percentile_mps, speed_95th_percentile_mps, speed_99th_percentile_mps, speed_99_5th_percentile_mps, speed_99_9th_percentile_mps} = row;
                            
                            return (
                              <StyledTableRow key={username || sourceId}>


                                <StyledTableCell  align="left"><strong>{username || sourceId}</strong></StyledTableCell >

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
                                      {link? <a target='_blank' href={link}>Explore & Download</a> : metadata}
                                    </Typography>
                                  </Stack>
                                </StyledTableCell >

                                <StyledTableCell  align="left">{speed_90th_percentile_mps}</StyledTableCell >
                                <StyledTableCell  align="left">{speed_95th_percentile_mps}</StyledTableCell >
                                <StyledTableCell  align="left">{speed_99th_percentile_mps}</StyledTableCell >
                                <StyledTableCell  align="left">{speed_99_5th_percentile_mps}</StyledTableCell >
                                <StyledTableCell  align="left">{speed_99_9th_percentile_mps}</StyledTableCell >
                                

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
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </Grid>
            </Grid>
          </>
        }
      </Container>
    </>
  );
}
