import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

import EucalyptusTab from './EucalyptusTab.js';
import EucalyptusMap from './EucalyptusMap.js';
import { Typography } from '@material-ui/core';

const description = {
  'Eucalyptus regnans': {
    nickname: 'Mountain Ash',
    trunk: 'reg-trunk.jpg',
    leaves: 'reg-leaves.jpg',
    fruit: 'reg-fruit.jpg',
    desc: [
      'It is a species of Eucalyptus native in Tasmania and south eastern Australian sate of Victoria.',
      'In Victoria tall tress are found in the Otway, Dandenong, Yarra and Strzelecki ranges, as well as East Gippsland.',
      'It is the tallest flowering plants and the third tallest tree in the world.'
    ].join(' '),
    feature: [
      'A straight-trunked tree with smooth grey bark, but with a stocking of rough brown, fibrous or fragile bark from 5 to 20 metres (16 ft 5 in to 65 ft 7 in) above the ground.',
      'It regularly grows to 85 metres (280 ft), with peeled bark in the upper branch Ribbon.',
    ].join(' '),
  },
  'Eucalyptus delegatensis': {
    nickname: 'Alpine Ash',
    trunk: 'del-trunk.jpg',
    leaves: 'del-leaves.jpg',
    fruit: 'del-fruit.jpg',
    desc: [
      'Known as alpine ash, woollybutt, gum-topped stringybark, and white-top.',
      'It is a sub-alpine or temperate tree in Victoria, is a member of the Stringybark Group of eucalypts and the 10th tallest species of tree in the world.',
    ].join(' '),
    feature: [
      'A straight, grey-trunked tree, it reaches heights of over 90 metres in suitable conditions.',
      'The bark is thick, fibrous, and woolly at the base and smooth on the smaller branches.',
    ].join(' '),
  },
  'Eucalyptus nitens': {
    nickname: 'Shining Gum',
    trunk: 'nit-trunk.jpg',
    leaves: 'nit-leaves.jpg',
    fruit: 'nit-fruit.jpg',
    desc: [
      'It is a very tall forest tree growing to 60 m, in Victoria reach to 90m.',
      'Eucalyptus is one of the most important plantation species in Tasmania.',
      'The wood is mainly used in general construction but started to be used for furniture.',
    ].join(' '),
    feature: [
      'Eucalyptus nitens’ bark is persistent in the lower trunk, gray to grayish brown, flaky fibers, smooth on the top, white, gray or yellow, and stripped off.',
      'Young leaves opposite, ovate to elliptic, heart-shaped, sessile-lanceolate.',
    ].join(' '),
  },
  'Eucalyptus pauciflora': {
    nickname: 'Snow Gum',
    trunk: 'pau-trunk.jpg',
    leaves: 'pau-leaves.jpg',
    fruit: 'pau-fruit.jpg',
    desc: [
      'Known as snow gum or white sallee, it is a sub-alpine or temperate tree in Victoria, and a species of flowering plant in the family Myrtaceae.',
    ].join(' '),
    feature: [
      'The bark of the eucalyptus is smooth, white to light gray, sometimes brownish red, falling off into plaques or strips, showing a mottled appearance.',
      'Gray-green adult leaves are usually lanceolate to wide-lanceolate, with distinct parallel veins, but may be oval.',
    ].join(' '),
  },
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3),
  },
  title: {
    borderBottom: '1px solid #eee',
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  tab: {
    paddingBottom: theme.spacing(0),
  },
  desc: {
    padding: theme.spacing(2),
  },
  map: {
    padding: theme.spacing(2),
  },
  imgBox: {
    padding: theme.spacing(3),
  },
  subtitle: {
    paddingBottom: theme.spacing(1),
  },
  img: {
    minHeight: 240,
  }
}))

export default function EucalyptusInfo(props) {
  const [species, setSpecies] = useState(0);
  const classes = useStyles();

  const ariaTabProps = function(index) {
    return {
      'id': `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }
  
  const ariaPanelProps = function(index) {
    return {
      'id': `simple-tabpanel-${index}`,
      'aria-controls': `simple-tab-${index}`,
      'hidden': species !== index,
      'role': "tabpanel",
    }
  }  

  const handleChange = function(event, newValue) {
    setSpecies(newValue);
  }

  let speciesName = Object.keys(description)[species];

  return (
    <Paper className={classes.root}>
      <Typography variant='h4' color='secondary' className={classes.title}>Where to find Leadbeater's Possum?</Typography>
      <Tabs className={classes.tab} value={species} onChange={handleChange} centered={true}>
        <Tab label={description['Eucalyptus regnans']['nickname']} {...ariaTabProps(0)}/>
        <Tab label={description['Eucalyptus delegatensis']['nickname']} {...ariaTabProps(1)}/>
        <Tab label={description['Eucalyptus nitens']['nickname']} {...ariaTabProps(2)}/>
        <Tab label={description['Eucalyptus pauciflora']['nickname']} {...ariaTabProps(3)}/>
      </Tabs>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8} style={{display: 'flex', flexDirection:'column', justifyContent: 'space-between'}}>
          <div className={classes.desc} {...ariaPanelProps(0)}>
            <EucalyptusTab name='Eucalyptus regnans' {...description['Eucalyptus regnans']} />
          </div>
          <div className={classes.desc} {...ariaPanelProps(1)}>
            <EucalyptusTab name='Eucalyptus delegatensis' {...description['Eucalyptus delegatensis']} />
          </div>
          <div className={classes.desc} {...ariaPanelProps(2)}>
            <EucalyptusTab name='Eucalyptus nitens' {...description['Eucalyptus nitens']} />
          </div>
          <div className={classes.desc} {...ariaPanelProps(3)}>
            <EucalyptusTab name='Eucalyptus pauciflora' {...description['Eucalyptus pauciflora']} />
          </div>

          <div className={classes.desc}>
          <Typography variant='h5' className={classes.subtitle}>Galary</Typography>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <CardMedia className={classes.img} image={`../../static/img/forest/${description[speciesName]['trunk']}`} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CardMedia className={classes.img} image={`../../static/img/forest/${description[speciesName]['leaves']}`} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CardMedia className={classes.img} image={`../../static/img/forest/${description[speciesName]['fruit']}`} />
            </Grid>
          </Grid>
          </div>

        </Grid>
      
        <Grid item xs={12} md={4} className={classes.map}>
          <EucalyptusMap species={speciesName}/>
        </Grid>
      </Grid>

    </Paper>
  )
}