import { useEffect, useState } from 'react';
// @mui
import { Grid, Button, Container, Stack, Typography, Paper, TableContainer, Table, TableBody, TableRow, TableCell, TablePagination } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

import { filter } from 'lodash';

import Scrollbar from '../../../components/scrollbar';
import { UserListHead, UserListToolbar } from '../user';


const TABLE_HEAD = [
  { id: 'pointid', label: 'Id', alignRight: false },
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'latitude', label:'Latitude', alignRight:false},
  { id: 'longitude', label: 'Longitude', alignRight: false },
  { id: 'datetime', label:'Date & Time', alignRight:false},
  { id: 'metadata', label:'Metadata', alignRight:false},
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
    return filter(array, (_point) => _point.username.toLowerCase().indexOf(query.toLowerCase()) !== -1 || (_point.metadata.toLowerCase().indexOf(query.toLowerCase()) !== -1 && _point.metadata !== undefined));
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ResultTable({pointsTest}) {
  const [filteredPoints, setFilteredPoints] = useState([])
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
    if (pointsTest.length > 0){
      console.log("ok!")
      const _filteredPoints = applySortFilter(pointsTest, getComparator(order, orderBy), filterName);
      setFilteredPoints(_filteredPoints)
    }
  }, [pointsTest, filterName, order, orderBy])

  return (
    <Grid container justifyContent='center' spacing={1}>
      <Grid item xs={12} justifyContent='center'>
        <Paper elevation={4} sx={{borderRadius:'25px'}}>
          <UserListToolbar filteredPoints={filteredPoints} filterName={filterName} onFilterName={handleFilterByName} />
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
                  {filteredPoints?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { pointid, username, longitude, latitude, datetime, metadata} = row;
                    
                    return (
                      <StyledTableRow key={pointid}>

                        <StyledTableCell  component="th" scope="row" padding="normal">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              <strong>{pointid}</strong>
                            </Typography>
                          </Stack>
                        </StyledTableCell >


                        <StyledTableCell  component="th" scope="row" padding="normal">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              <strong>{username}</strong>
                            </Typography>
                          </Stack>
                        </StyledTableCell >

                        <StyledTableCell  align="left">{latitude}</StyledTableCell >
                        <StyledTableCell  align="left">{longitude}</StyledTableCell >

                        <StyledTableCell  align="left">{datetime}</StyledTableCell >

                        <StyledTableCell  align="left">{metadata}</StyledTableCell >

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
            count={filteredPoints.length}
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
