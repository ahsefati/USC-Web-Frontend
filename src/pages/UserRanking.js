import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Grid,
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

// mock
import USERRANKS from '../_mock/userRanks';

// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import Label from '../components/label';

// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'rank', label: 'Rank', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'points', label: 'Points', alignRight: false },
  { id: 'change', label: 'Change', alignRight: false },
];

// ----------------------------------------------------------------------

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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserRanking() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('id');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

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


  const filteredUsers = applySortFilter(USERRANKS, getComparator(order, orderBy), filterName);
  
  useEffect(()=>{
    const initialNumber = 2592000 // to be received from server!
    let rTime = initialNumber
    setInterval(() => {
      rTime -= 1
      handleSetRemainingTime(rTime)
    }, 1000); 
  },[])
  
  const [rDays, setRDays] = useState(0)
  const [rHours, setRHours] = useState(0)
  const [rMinutes, setRMinutes] = useState(0)
  const [rSeconds, setRSeconds] = useState(0)

  const handleSetRemainingTime = (rTimeInSeconds) => {
    const _rDays = parseInt(rTimeInSeconds / (24*60*60), 10)
    const _rHours = parseInt( (rTimeInSeconds - ( _rDays*(24*60*60) ) ) / (60*60) , 10)
    const _rMinutes = parseInt( (rTimeInSeconds - (_rDays*(24*60*60)) - (_rHours*(60*60)) ) / 60 , 10)
    const _rSeconds = parseInt( (rTimeInSeconds - (_rDays*(24*60*60)) - (_rHours*(60*60)) - (_rMinutes*60) ) , 10)
    setRDays(_rDays)
    setRHours(_rHours)
    setRMinutes(_rMinutes)
    setRSeconds(_rSeconds)
  }



  return (
    <>
      <Helmet>
        <title> Kooch | Awards </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Awards
          </Typography>
          <Button to='/awardsmoreinfo' component={RouterLink} variant="contained" startIcon={<Iconify icon="carbon:next-outline"/>}>
            Info
          </Button>
        </Stack>
  
        <Typography variant='subtitle1'>
          You can win $100 each month. 
        </Typography>

        <Grid container align={'center'} justifyContent='center' spacing={1} sx={{mt:2}}>
          <Typography>
            Next Awards:
          </Typography>
        </Grid>
        <Grid container align={'center'} justifyContent='center' spacing={1}>
          <Grid item xs={3} sm={3} md={2}>
            <Paper elevation={12} sx={{mb:3, mt:1, backgroundColor:(theme)=>theme.palette.primary.main}}>
              <Typography sx={{color:'white'}} variant='h6'>{rDays} <br/><Typography>Days</Typography></Typography>
            </Paper>
          </Grid>
          <Grid item xs={3} sm={3} md={1}>
            <Paper elevation={6} sx={{mb:3, mt:1}}>
              <Typography variant='h6'>{rHours} <br/><Typography>Hours</Typography></Typography>
            </Paper>
          </Grid>
          <Grid item xs={3} sm={3} md={1}>
            <Paper elevation={6} sx={{mb:3, mt:1}}>
              <Typography variant='h6'>{rMinutes} <br/><Typography>Minutes</Typography></Typography>
            </Paper>
          </Grid>
          <Grid item xs={3} sm={3} md={1}>
            <Paper elevation={6} sx={{mb:3, mt:1}}>
              <Typography variant='h6'>{rSeconds} <br/><Typography>Seconds</Typography></Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container justifyContent='center' spacing={1}>
          <Grid item xs={12} justifyContent='center'>
            <Paper elevation={3} >
              <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />

              <Scrollbar>
                <TableContainer>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                      {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { id, name, avatarUrl, points, change } = row;

                        return (
                          <TableRow key={id}>


                            <TableCell align="left"><strong>#{id}</strong></TableCell>

                            <TableCell component="th" scope="row" padding="normal">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar alt={name} src={avatarUrl} />
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{points}</TableCell>

                            <TableCell align="left">
                              <Label color={'success'}>
                                + {change}  
                              </Label>
                            </TableCell>
                            
                          </TableRow>
                        );
                      })}
                      
                    </TableBody>

                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={USERRANKS.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
        </Grid>
            
          
      </Container>

    </>
  );
}
