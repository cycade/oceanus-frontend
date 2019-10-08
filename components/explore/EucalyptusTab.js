import Typography from '@material-ui/core/Typography';

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