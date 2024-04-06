import PropTypes from 'prop-types';
import Papa from 'papaparse';

// @mui
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment, Button } from '@mui/material';
// component
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems:'center',
  padding: theme.spacing(0, 0, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 200,
  transition: theme.transitions.create(['box-shadow', 'width', 'border'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 340,
    boxShadow: theme.customShadows.z24,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  filteredPoints: PropTypes.array,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({filteredData, filterName, onFilterName }) {
  
  const handleDownload = () => {
    const csvFormatted = Papa.unparse(filteredData)
    const element = document.createElement('a');
    const file = new Blob([csvFormatted], { type: 'text/csv' });
    element.href = URL.createObjectURL(file);
    element.download = 'data.csv';
    document.body.appendChild(element);
    element.click();
  }

  return (
    <StyledRoot>
      <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
      />
      <Button startIcon={<Iconify icon="material-symbols:cloud-download-outline"/>} variant='outlined' onClick={handleDownload}>CSV Export</Button>

    </StyledRoot>
  );
}
