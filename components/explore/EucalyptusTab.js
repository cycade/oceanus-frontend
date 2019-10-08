import Typography from '@material-ui/core/Typography';

export default function EucalyptusTab(props) {
  return (
    <div>
        <Typography variant='h5'>{props.nickname}</Typography>
        <Typography variant='overline'>Also known as {props.name}</Typography>
        <Typography style={{marginTop: '4px'}}><strong>Description: </strong>{props.desc}</Typography>
        <Typography style={{marginTop: '4px'}}><strong>Features: </strong>{props.feature}</Typography>
    </div>
  )
}