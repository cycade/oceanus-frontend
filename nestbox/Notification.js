import { Dialog, DialogTitle, Typography, DialogContent, DialogActions, Button } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3),
    }
}))

export default function(props) {
    const [open, setStatus] = useState(true);
    const classes = useStyles();
    
    const handleClose = () => {
        setStatus(false);
    }

    return (
        <Dialog open={open} onClose={handleClose} className={classes.root}>
            <DialogTitle>Help us to build a Possum Nest!</DialogTitle>
            <DialogContent>
                You could get some hint from the right side.
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Start now!</Button>
            </DialogActions>
        </Dialog>
    )
}