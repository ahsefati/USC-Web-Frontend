import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';

// ----------------------------------------------------------------------

const LANGS = [
  {
    id: 0,
    value: 'en',
    label: 'English',
    icon: '/assets/icons/ic_flag_en.svg',
    disabled: false
  },
  {
    id: 1,
    value: 'de',
    label: 'German',
    icon: '/assets/icons/ic_flag_de.svg',
    disabled: true
  },
  {
    id: 2,
    value: 'fr',
    label: 'French',
    icon: '/assets/icons/ic_flag_fr.svg',
    disabled: true
  },
  {
    id: 3,
    value: 'fa',
    label: 'Farsi',
    icon: '/assets/icons/ic_flag_fa.svg',
    disabled: true
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const [open, setOpen] = useState(null);
  const [selectedLang, setSelectedLang] = useState(0)

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };


  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={LANGS[selectedLang].icon} alt={LANGS[selectedLang].label} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem disabled={option.disabled} key={option.value} selected={option.value === LANGS[selectedLang].value} onClick={()=>{setSelectedLang(option.id);handleClose()}}>
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
