import { Hidden, Paper, GridList, GridListTile, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import image1 from '../static/img/S1.jpg'
import image2 from '../static/img/S2.jpg'
import image3 from '../static/img/S3.jpg'
import image4 from '../static/img/S4.jpg'


const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(-5),
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    width: '78vw',
    padding: theme.spacing(3),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '72vw',
    // height: 485,
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(8),
  },
  icon: {
    color: 'white',
  },
}));

const tileData = [
  {type: 'img', img: image1, title: 'title', featured: true},
  {type: 'text', content: 'Broken sustainable forest logging rules, low habitats protection, bush fire and predator threats are the main endanger parameters', title: 'Survival Threats'},
  {type: 'img', img: image2, title: 'title', featured: true},
  {type: 'text', content: 'Ending logging of Mountain Ash forests for habitat protection is the best hope of survival.', title: 'Conservation'},
  {type: 'text', content: '20 million years ago the only species in the petaurid genus Gymnobelideus with an ancestral form.', title: 'Rare Species'},
  {type: 'img', img: image3, title: 'title', featured: true},
  {type: 'text', content: 'List of Threatened Animals 1994 endangered red lists in the IUCN (International Union for the Conservation of Nature).', title: 'Endanger Species'},
  {type: 'img', img: image4, title: 'title', featured: true},
]

export default function InfoCard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <Paper className={classes.paper}>
      <Hidden smDown>
        <Typography variant='h4' className={classes.title}>What is Leadbeater's Possum?</Typography>
        <GridList cellHeight={120} spacing={1} cols={4} className={classes.gridList}>
          {tileData.map((tile, i) => {
            if (tile.type == 'text') {
              return (
                <GridListTile key={i} cols={1} rows={2} style={{padding: 5}}>
                  <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <Typography align='center' gutterBottom variant="h5" component="h2">
                      {tile.title}
                    </Typography>
                    <Typography align='center' variant="body2" color="textSecondary" component="p">
                      {tile.content}
                    </Typography>
                  </div>
                </GridListTile>
              )
            } else {
              return (
                <GridListTile key={tile.img} cols={1} rows={tile.featured ? 2 : 1}>
                  <img src={tile.img} alt={tile.title} />
                </GridListTile>
              )
            }
          })}
        </GridList>
      </Hidden>

      <Hidden mdUp xsDown>
      <Typography variant='h5' className={classes.title}>What is Leadbeater's Possum?</Typography>
        <GridList cellHeight={120} spacing={1} cols={2} className={classes.gridList}>
          {tileData.map((tile, i) => {
            if (tile.type == 'text') {
              return (
                <GridListTile key={i} cols={1} rows={2} style={{padding: 5}}>
                  <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <Typography align='center' gutterBottom variant="h6">
                      {tile.title}
                    </Typography>
                    <Typography align='center' color="textSecondary" component="p">
                      {tile.content}
                    </Typography>
                  </div>
                </GridListTile>
              )
            } else {
              return (
                <GridListTile key={tile.img} cols={1} rows={tile.featured ? 2 : 1}>
                  <img src={tile.img} alt={tile.title} />
                </GridListTile>
              )
            }
          })}
        </GridList>
      </Hidden>

      <Hidden smUp>
      <Typography variant='h6' className={classes.title}>What is Leadbeater's Possum?</Typography>
        <GridList cellHeight={100} spacing={1} cols={1} className={classes.gridList}>
          {tileData.map((tile, i) => {
            if (tile.type == 'text') {
              return (
                <GridListTile key={i} cols={1} rows={2} style={{padding: 5}}>
                  <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <Typography align='center' gutterBottom variant="h6">
                      {tile.title}
                    </Typography>
                    <Typography align='center' color="textSecondary" component="p">
                      {tile.content}
                    </Typography>
                  </div>
                </GridListTile>
              )
            } else {
              return (
                <GridListTile key={tile.img} cols={1} rows={tile.featured ? 2 : 1}>
                  <img src={tile.img} alt={tile.title} />
                </GridListTile>
              )
            }
          })}
        </GridList>
      </Hidden>

    </Paper>
    </div>
  );
}