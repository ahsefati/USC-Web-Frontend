import { useEffect, useState } from 'react';
// @mui
import { Grid, Button, Container, Stack, Typography, Paper, TableContainer, Table, TableBody, TableRow, TableCell, TablePagination } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

import { filter } from 'lodash';

import Scrollbar from '../../../components/scrollbar';
import { UserListHead, UserListToolbar } from '../user';


const TABLE_HEAD = [
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'medianlatitude', label: 'Median Latitude', alignRight: false },
  { id: 'medianlongitude', label:'Median Longitude', alignRight:false},
  { id: 'mintime', label:'Minimum Date & Time', alignRight:false},
  { id: 'maxtime', label:'Maximum Date & Time', alignRight:false},
  { id: 'pointscount', label:'#Reported Points', alignRight:false},
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
    return filter(array, (_user) => _user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ResultStats({generalStats, userStats, points}) {
  const [filteredUsers, setFilteredUsers] = useState([])
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('pointid');
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

  useEffect(()=>{
    if (userStats.length > 0){
      const _filteredUsers = applySortFilter(userStats, getComparator(order, orderBy), filterName);
      setFilteredUsers(_filteredUsers)
    }
  }, [userStats, filterName, order, orderBy])

  return (
    <Grid container justifyContent='center' spacing={1} style={{marginTop:'12px'}}>
      <Grid item xs={3} justifyContent='center'>
        <h3 style={{margin:0}}>#Points</h3>
        <h2 style={{marginTop:0}}>{points && points.length}</h2>
      </Grid>
      <Grid item xs={3} justifyContent='center'>
        <h3 style={{margin:0}}>#Users</h3>
        <h2 style={{marginTop:0}}>{userStats && userStats.length}</h2>
      </Grid>
      <Grid item xs={4} justifyContent='center'>
        <h3 style={{margin:0}}>Boundary Box:</h3>
        <h3 style={{marginTop:0}}>({generalStats?.minlatitude}, {generalStats?.minlongitude}) ({generalStats?.maxlatitude}, {generalStats?.maxlongitude})</h3>
      </Grid>
      <Grid item xs={12} justifyContent='center'>
        <Paper elevation={4} sx={{borderRadius:'25px'}}>
          <UserListToolbar filteredData={filteredUsers} filterName={filterName} onFilterName={handleFilterByName} />
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
                  {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { username, medianlatitude, medianlongitude, mintime, maxtime, pointscount} = row;
                    
                    return (
                      <StyledTableRow key={username}>

                        <StyledTableCell  component="th" scope="row" padding="normal">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              <strong>{username}</strong>
                            </Typography>
                          </Stack>
                        </StyledTableCell >

                        <StyledTableCell  align="left">{medianlatitude}</StyledTableCell >
                        <StyledTableCell  align="left">{medianlongitude}</StyledTableCell >

                        <StyledTableCell  align="left">{mintime}</StyledTableCell >
                        <StyledTableCell  align="left">{maxtime}</StyledTableCell >

                        <StyledTableCell  align="left">{pointscount}</StyledTableCell >

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
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
