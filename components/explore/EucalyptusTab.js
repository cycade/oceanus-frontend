import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';

export default function EucalyptusTab(props) {
  return (
    <div>
        <Typography variant='h5'>{props.nickname}</Typography>
        <Typography variant='overline'>Also known as {props.name}</Typography>
        <Typography>{props.desc}</Typography>
        <Typography>{props.feature}</Typography>
    </div>
  )
}