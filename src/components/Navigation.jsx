import React, { useState } from 'react';
import { AppBar, Box, Tab, Tabs } from '@mui/material';
import CustomerList from './CustomerList';
import TrainingList from './TrainingList';
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
          </Tabs> 
        </Toolbar>
      { value === 0 && <CustomerList /> }
      { value === 1 && <TrainingList /> }
      </AppBar>
    </Box>
    );
  }
  
  export default Navigation;