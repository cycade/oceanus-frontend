import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function MapControlLabel(props) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={props.state}
          onChange={props.setState}
          color='primary'
        />
      }
      label={props.name}
    />
  )
}