import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/styles';

const labelmap = {
  'distribution': 'Occurrence',
  'bushwalking': 'Bushwalking',
  'heatmap': 'Heatmap',
}

const useStyles = makeStyles(theme => ({
  switch: {
    '&$checked': {
      color: '#aaaa11'
    }
  },
}))

export default function MapControlLabel(props) {
  const classes = useStyles();
  return (
    <FormControlLabel
      control={
        <Switch
          checked={props.state}
          onChange={props.setState}
          className={classes.switch}
          // color='primary'
        />
      }
      label={labelmap[props.name]}
    />
  )
}