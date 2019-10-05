import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';

export default function EucalyptusTab(props) {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant='h5'>{props.name}</Typography>
          <Typography variant='overline'>Also known as {props.nickname}</Typography>
          <Typography>{props.desc}</Typography>
          <Typography>{props.feature}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <CardMedia style={{height: 240}} image={`../../static/img/forest/${props.trunk}`} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardMedia style={{height: 240}} image={`../../static/img/forest/${props.leaves}`} />
            </Grid>      
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}