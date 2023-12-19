import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

import { filter } from 'lodash';

// @mui
import { Grid, Container, Stack, Typography, Paper, TableContainer, Table, TableBody, TableRow, TableCell, TablePagination } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

// components
import { getTransactions } from '../api/actions/tools';

// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import Scrollbar from '../components/scrollbar';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'amount.$numberDecimal', label: 'Amount', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'happeningDate', label: 'Date', alignRight: false },
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
    return filter(array, (_transaction) => _transaction?.description?.toLowerCase().indexOf(query.toLowerCase()) !== -1 || (_transaction?.amount?.$numberDecimal?.toLowerCase().indexOf(query.toLowerCase()) !== -1) || (_transaction?.happeningDate?.toLowerCase().indexOf(query.toLowerCase()) !== -1));
  }
  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------------------
export default function SavedTools() {

  const [transactionsInfo, setTransactionsInfo] = useState([])
  const [loadingTransactions, setLoadingTransactions] = useState(0)
  const [filteredTransactions, setFilteredTransactions] = useState([])

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('happeningDate');

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
  
  const handleToolsInfo = async () => {
    setLoadingTransactions(1)
    const data = await getTransactions()
    console.log(data)
    setTransactionsInfo(data.transactions)
    setLoadingTransactions(0)
  }

  useEffect(()=>{
    handleToolsInfo()
  },[])

  useEffect(()=>{
    if (transactionsInfo?.length > 0){
      const _filteredTransactions = applySortFilter(transactionsInfo, getComparator(order, orderBy), filterName);
      setFilteredTransactions(_filteredTransactions)
    }
  }, [transactionsInfo.length, filterName, order, orderBy])

  

  return (
    <>
      <Helmet>
        <title> Transactions History | CoinSigma </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          Transactions History
        </Typography>

        {/* Uni Table */}
        {loadingTransactions===1 && filterName==='' ? 
            <>
              <div style={{marginBottom:'5px'}}>Loading...</div>
              <LinearProgress />
            </>
          :
          transactionsInfo.length === 0 ?
            <>
              There are no transactions to be loaded.
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
                        {filteredTransactions?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                          const { id, amount, description, happeningDate} = row;
                          
                          return (
                            <StyledTableRow key={id}>


                              <StyledTableCell align="left"><strong>${amount.$numberDecimal}</strong></StyledTableCell >

                              <StyledTableCell component="th" scope="row" padding="normal">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2" noWrap>
                                    {description}
                                  </Typography>
                                </Stack>
                              </StyledTableCell >

                              <StyledTableCell  component="th" scope="row" padding="normal">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2" noWrap>
                                    {happeningDate}
                                  </Typography>
                                </Stack>
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
                  count={filteredTransactions.length}
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
