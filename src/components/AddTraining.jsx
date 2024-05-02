import React, { useState } from "react";
import { Button, TextField, MenuItem } from "@mui/material";
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function AddTraining(props) {
    const [training, setTraining] = useState({date: null, duration:'', activity:'', customer: ''});
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const newTraining = () => {
      props.addTraining(training)
      setTraining({date: null, duration:'', activity:'', customer:''})
    };

    const handleInputChange = event => {
      setTraining({...training, [event.target.name]: event.target.value});
    };

    const handleDateChange = date => {
      setTraining({...training, date})
    };

    return (
      <React.Fragment>
        <Button onClick={handleClickOpen}>
          Add new training session
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              newTraining();
              handleClose();
            },
          }}
        >
          <DialogTitle>New Training Session</DialogTitle>
          <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDateTimePicker
              autoFocus
              required
              margin="dense"
              name="date"
              value={training.date}
              onChange={date => handleDateChange(date)}
              valueType="date time"
              format="DD.MM.YYYY - hh.mm"
              fullWidth
              variant="standard"
            />
          </LocalizationProvider>
            <TextField
              required
              margin="dense"
              name="duration"
              value={training.duration}
              onChange={handleInputChange}
              type="number"
              label="Duration"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              name="activity"
              value={training.activity}
              onChange={handleInputChange}
              label="Activity"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              name="customer"
              value={training.customer}
              onChange={handleInputChange}
              label="Customer"
              select
              fullWidth
              variant="standard"
            >
              {props.customer.map((select) => (
                <MenuItem key={select._links.self.href} value={select._links.self.href}>
                  ID: {select._links.trainings.href.substr(-14, 4)}, Name: {select.firstname} {select.lastname}
                </MenuItem>
              ))}
              </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
}
export default AddTraining;