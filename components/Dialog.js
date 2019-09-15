import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

export default function DialogComponent(props) {
  return (
    <Dialog
      open={props.open}
      keepMounted
      onClose={props.onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{"Congratulation"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          You have found {props.count} Leadbeater’s {props.count === 1 ? 'Possum' : 'Possums'}.
        </DialogContentText>
        <DialogContentText id="alert-dialog-slide-description">
        {
          false
          ? `It's amazing to see it here!`
          : `It's a popular area!`
        }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Explore More
        </Button>
      </DialogActions>
    </Dialog>
  )
} 