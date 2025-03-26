import { Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button, } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
 
const FormDetailDialog = ({open, setOpen}) => {
    const [formName, setFormName] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
 
 
     const handleClose = () => {
        setOpen(false);
      };
   
      const handleOk = () => {
        navigate("/buildform", {
          state: { formName, description },
        });
        setOpen(false);
      };
  return (
    <div>
       <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Custom Form</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Form Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
 
export default FormDetailDialog