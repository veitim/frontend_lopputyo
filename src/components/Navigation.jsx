import React, { useState } from 'react';
import { AppBar, Box, Tab, Tabs } from '@mui/material';
import CustomerList from './CustomerList';
import TrainingList from './TrainingList';
import CalendarPage from './CalendarPage';
import Toolbar from '@mui/material/Toolbar';

function Navigation (props) {

    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    }
  
    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="background" sx={{width: 'auto', height: 'auto'}}>
        <Toolbar>
          <Tabs value={ value } onChange={ handleChange }  >
            <Tab label='Customers' />
            <Tab label='Training Sessions' />
            <Tab label='Calendar' />
          </Tabs> 
        </Toolbar>
      { value === 0 && <CustomerList /> }
      { value === 1 && <TrainingList /> }
      { value === 2 && <CalendarPage /> }
      </AppBar>
    </Box>
    );
  }
  
  export default Navigation;