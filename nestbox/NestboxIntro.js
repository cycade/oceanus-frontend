import { Dialog, DialogTitle, Typography, DialogContent, DialogActions, Button } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(10, 10, 17, 0.7)',
        zIndex: 1000,
        visible: false,
    },
    title: {
        fontWeight: 600,
        color: 'white',
        margin: theme.spacing(1),
    },
    desc: {
        color: 'white',
        margin: theme.spacing(0.5),
    },
    button: {
        marginTop: theme.spacing(3),
        color: theme.palette.basic.white,
        borderColor: theme.palette.basic.white,
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }
    }
}))

export default function(props) {
    const [stage, setStage] = useState(0);
    const classes = useStyles();
    
    const handleNext = () => {
        if (stage < descriptions.length - 1) {
            setStage(stage + 1);
        } else {
            setStage(-1);
        }
    }

    const descriptions = [
        [
            'Drag boards from left to middle',
            'Hold the mouse in the blank space to rotate the lens',
            'Zoom using the scroll wheel',
        ]
    ];

    return (
        <div>
        {
            stage >= 0
            ? <div className={classes.root}>
                <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography variant='h5' className={classes.title}>Help us to build a nest box!</Typography>
                    {
                        descriptions[stage].map((e, i)=> {
                            return <Typography key={i} variant='subtitle1' className={classes.desc}>+ {e}</Typography>
                        })
                    }
                    <Button variant='outlined' className={classes.button} onClick={handleNext}>
                        Start
                    </Button>
                </div>
            </div>
            : <div></div>
        }
        </div>
    )
}