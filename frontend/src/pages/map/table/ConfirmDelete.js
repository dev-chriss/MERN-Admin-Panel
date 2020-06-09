import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from '@material-ui/core/Slide';
import { IconButton } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDelete = (props) => {
  const {
    title, 
    message, 
    openConfirmDelete, 
    setOpenConfirmDelete, 
    onDelete
  } = props;

  return (
    <React.Fragment>
      
      <IconButton style={{ color: 'red' }} onClick={() => setOpenConfirmDelete(true)} >
          <DeleteIcon />
      </IconButton>
      
      <Dialog  
        open={openConfirmDelete}
        onClick={() => setOpenConfirmDelete(false)}
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
            <DialogTitle id="form-dialog-title" style={{padding: "30px 30px 0px 30px"}}>
              {title}
            </DialogTitle>

            <DialogContent style={{padding: "30px 30px 10px 30px"}}>
                <DialogContentText>
                  {message}
                </DialogContentText>
            </DialogContent>

            <DialogActions style={{padding: 30}}>
                <Button variant="contained" color="primary"
                  onClick={() => setOpenConfirmDelete(false)} >
                    No
                </Button>
                <Button variant="contained" onClick={() => onDelete()} color="secondary">
                    Yes
                </Button>
            </DialogActions>

      </Dialog>
    </React.Fragment>
  );
}

export default ConfirmDelete;