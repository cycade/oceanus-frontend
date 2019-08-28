import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '65vw',
    height: 485,
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}));

import image1 from '../../static/img/S1.jpg';
import image2 from '../../static/img/S2.jpg';
import image3 from '../../static/img/S3.jpg';
import image4 from '../../static/img/S4.jpg';

const tileData = [
  {type: 'img', img: image1, title: 'title', featured: true},
  {type: 'text', content: 'Broken sustainable forest logging rules, low habitats protection, bush fire and predator threats are the main endanger parameters', title: 'Survival Threats'},
  {type: 'img', img: image2, title: 'title', featured: true},
  {type: 'text', content: 'Ending logging of Mountain Ash forests for habitat protection is the best hope of survival.', title: 'Purpose'},
  {type: 'text', content: '20 million years ago the only species in the petaurid genus Gymnobelideus with an ancestral form.', title: 'Rare Species'},
  {type: 'img', img: image3, title: 'title', featured: true},
  {type: 'text', content: 'List of Threatened Animals 1994 endangered red lists in the IUCN (International Union for the Conservation of Nature).', title: 'Endanger Species'},
  {type: 'img', img: image4, title: 'title', featured: true},
]

export default function Species() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={120} spacing={1} cols={4} className={classes.gridList}>
        {tileData.map(tile => {
          if (tile.type == 'text') {
            return (
              <GridListTile key={0} cols={1} rows={2}>
                <div style={{'height': '100%'}} className='d-flex flex-column justify-content-center m-1 p-2'>
                  <p align='center' className='h4'>{tile.title}</p>
                  <p align='center'>{tile.content}</p>
                </div>
              </GridListTile>
            )
          } else {
            return (
              <GridListTile key={tile.img} cols={1} rows={tile.featured ? 2 : 1}>
                <img src={tile.img} alt={tile.title} />
                {/* <GridListTileBar
                  title={tile.title}
                  titlePosition="top"
                  actionIcon={
                    <IconButton aria-label={`star ${tile.title}`} className={classes.icon}>
                      <StarBorderIcon />
                    </IconButton>
                  }
                  actionPosition="left"
                  className={classes.titleBar}
                /> */}
              </GridListTile>
            )
          }
        })}
      </GridList>
    </div>
  );
}