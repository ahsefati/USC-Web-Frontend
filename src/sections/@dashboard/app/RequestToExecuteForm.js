import PropTypes from 'prop-types';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Grid, Container, Typography, Card, Link, FormControl, InputLabel, Select, MenuItem, Stack, Input, Button} from '@mui/material';
import {DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {LocalizationProvider} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LoadingButton } from '@mui/lab';
import sqlCommands from '../../../data/sqlCommands';

import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

RequestToExecuteForm.propTypes = {
 
};

export default function RequestToExecuteForm({sources, selectedSource, setSelectedSource, sqlCommand, setSqlCommand, formData, setFormData, executeLoading, handleGetPoints}) {

  return (
    <Grid item xs={12} md={12} lg={3}>
      <Stack direction="column" alignItems="center">
        {sources.length > 0 && 
          <FormControl style={{marginTop:'12px'}} fullWidth>
            <InputLabel id="Select Source to Explore">Select Source to Explore:</InputLabel>
            <Select
              fullWidth
              labelId="Select Source to Explore"
              id="Select Source to Explore"
              value={selectedSource}
              label="Select Source to Explore"
              onChange={(e) => {
                setSelectedSource(e.target.value)
              }}
            >
              <MenuItem value={-1}>ALL</MenuItem>
              {sources.map(source => {
                return (
                  <MenuItem key={source.sourceId} value={source.sourceId}>{source.name}</MenuItem>
                )
              })

              }
            </Select>
          </FormControl>
        }
        <FormControl style={{marginTop:'24px'}} fullWidth>
          <InputLabel id="Select The Command to Execute">Select The Command to Execute:</InputLabel>
          <Select
            fullWidth
            labelId="Select The Command to Execute"
            id="Select The Command to Execute"
            value={sqlCommand}
            label="Select The Command to Execute"
            onChange={(e) => {
              setSqlCommand(e.target.value)
            }}
          >
            <MenuItem value={-1}>Choose Your Command</MenuItem>
            {sqlCommands.map(command => {
              return (
                <MenuItem key={command.id} value={command.id}>{command.title}</MenuItem>
              )
            })

            }
          </Select>
        </FormControl>
      </Stack>
      <Stack direction="column" alignItems="center">
        {sqlCommand!==-1&&
          sqlCommands.filter(command=>command.id===sqlCommand)[0].variables.map(vars => {
            return (
              <div style={{width:'100%', marginTop:'24px'}} key={vars.varCode}>
                <Typography variant="subtitle2">
                  {vars.varTitle}
                </Typography>
                {vars.type==="normal_input"?
                  <Input
                    fullWidth
                    value={formData[vars.varCode]}
                    onChange={(e) =>
                      {
                        if (e.target.value!==''){
                          setFormData({
                            ...formData,
                            [vars.varCode]: e.target.value,
                          })
                        }else{
                          const updatedFormData = { ...formData };
                          delete updatedFormData[vars.varCode];
                          setFormData(updatedFormData);
                        }
                      }
                    }
                    placeholder={vars.varTitle}
                  />
                  :
                  vars.type==="datetime_input"?
                  <LocalizationProvider dateAdapter={AdapterDayjs} locale="en-US">
                    <DateTimePicker
                      value={formData[vars.varCode] ? new Date(formData[vars.varCode] * 1000) : null}
                      onChange={(newValue) => {
                        if (newValue!==''){
                          setFormData({
                            ...formData,
                            [vars.varCode]: newValue.unix()
                          })
                        }else{
                          const updatedFormData = { ...formData };
                          delete updatedFormData[vars.varCode];
                          setFormData(updatedFormData);
                        }
                      }
                      }
                    />
                  </LocalizationProvider>
                  :
                  'Nothing found. Contact me: ahsefati1998@gmail.com'
                }
              </div>
            )
          })
        }
      </Stack>
      {sqlCommand!==-1 &&
        <Stack style={{marginTop:'24px'}} direction="row" alignItems="center">
          <LoadingButton startIcon={<Iconify icon="material-symbols:play-circle-outline"/>} loading={executeLoading} onClick={handleGetPoints} color='secondary' type='submit' variant='contained' fullWidth>Execute</LoadingButton>
        </Stack>
      }
    </Grid>
  );
}
