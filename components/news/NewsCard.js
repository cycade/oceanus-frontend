import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Link from 'next/link';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  card: {
    width: '25vw',
    minWidth: 240,
    maxWidth: 320,
    margin: theme.spacing(2),
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  media: {
    height: 140,
  },
}));

export default function NewsCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.content}>
      <div>
        <CardMedia
          className={classes.media}
          image={`../static/img/N${props.num}.png`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="button" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.desc}
          </Typography>
        </CardContent>
      </div>
      <div>
      <CardActions>
        <Link href={props.link}>
          <a target='_blank' style={{textDecoration: 'none'}}>
            <Button size="small" color="secondary" variant='outlined'>Learn More</Button>
          </a>
        </Link>
      </CardActions>
      </div>
      </div>
    </Card>
  );
}