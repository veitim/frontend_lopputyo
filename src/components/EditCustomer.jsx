import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function EditCustomer(props) {
    const [customer, setCustomer] = useState({firstname: '', lastname:'', streetaddress:'', postcode:'', city: '', email: '', phone: ''});
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setCustomer({
        firstname: props.customer.firstname, 
        lastname: props.customer.lastname, 
        streetaddress: props.customer.streetaddress, 
        postcode: props.customer.postcode, 
        city: props.customer.city, 
        email: props.customer.email,
        phone: props.customer.phone})
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const editCustomer = () => {
      props.editCustomer(customer, props.customer._links.self.href)
    };

    const handleInputChange = event => {
      setCustomer({...customer, [event.target.name]: event.target.value});
    }
  
    return (
      <React.Fragment>
        <Button onClick={handleClickOpen}>
          Edit
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
              editCustomer();
              handleClose();
            },
          }}
        >
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              name="firstname"
              value={customer.firstname}
              onChange={handleInputChange}
              label="Firstname"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              name="lastname"
              value={customer.lastname}
              onChange={handleInputChange}
              label="Lastname"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              name="email"
              value={customer.email}
              onChange={handleInputChange}
              label="Email"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              name="phone"
              value={customer.phone}
              onChange={handleInputChange}
              label="Phone"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              name="streetaddress"
              value={customer.streetaddress}
              onChange={handleInputChange}
              label="Streetaddress"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              name="postcode"
              value={customer.postcode}
              onChange={handleInputChange}
              label="Postcode"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              name="city"
              value={customer.city}
              onChange={handleInputChange}
              label="City"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Edit</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
}

export default EditCustomer;