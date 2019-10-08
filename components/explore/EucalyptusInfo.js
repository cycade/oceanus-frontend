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
      'This is a species of Eucalyptus native in Tasmania and south eastern Australian sate of Victoria.',
      'It is the tallest flowering plants and the third tallest tree in the world.',
    ].join(' '),
    feature: [
      'In the Leadbeater’s Possum habitats, the trees with shedding bark and hanging ribbons are important for the possum’s living.',
      'Its source of food such as spider, moths, tree crickets and beetles can be claws out from underneath tree bark, or the hang on the bark.',
      'Eucalyptus regnans is a straight-trunked tree with smooth grey bark, but with a stocking of rough brown, fibrous or fragile bark from 5 to 20 metres (16 ft 5 into 65 ft 7 in) above the ground.',
      'It regularly grows to 85 metres (280 ft), with peeled bark in the upper branch Ribbon, the environment and dense understory suitable for the Leadbeater’s Possum living.',
    ].join(' '),
  },
  'Eucalyptus delegatensis': {
    nickname: 'Alpine Ash',
    trunk: 'del-trunk.jpg',
    leaves: 'del-leaves.jpg',
    fruit: 'del-fruit.jpg',
    desc: [
      'Alpine Ash is known as alpine ash, woollybutt, gum-topped stringybark, and white-top.',
      'It is a sub-alpine or temperate tree in Victoria, is a member of the Stringybark Group of eucalypts and the 10th tallest species of tree in the world.',
    ].join(' '),
    feature: [
      'For the Leadbeater’s Possum living, with shedding bark and hanging ribbons are suitable for them to move from one tree to another.',
      'Alpine Ash is a straight and grey-trunked tree reached over 90 metres.',
      'Its bark is thick, fibrous and woolly at the base and smooth on the smaller branches, which is easy for the Leadbeater’s Possum running along branches and move from one tree jumping up to 1 meter to another tree in search of food.'
    ].join(' '),
  },
  'Eucalyptus nitens': {
    nickname: 'Shining Gum',
    trunk: 'nit-trunk.jpg',
    leaves: 'nit-leaves.jpg',
    fruit: 'nit-fruit.jpg',
    desc: [
      'It is a very tall forest tree reach 90m in Victoria.',
      'Eucalyptus is one of the most important plantation species in Tasmania, as the wood is mainly used in general construction but started to be used for furniture.'
    ].join(' '),
    feature: [
      'The species of Eucalyptus native, it nectar and juice is a sugar-rich energy food for The Leadbeater\'s possum, such as the Eucalyptus nitens.',
      'Eucalyptus nitens\' bark is persistent in the lower trunk with flaky fibres, smooth on the top and stripped off.',
      'Its young leaves are opposite with ovate to elliptic or heart-shaped, sessile-lanceolate.',
      'The Leadbeater\'s possum threw the leaves of the tree off for sugar, as some sap-sucking insects exude a sweet liquid called “honeydew” in the leaves.',
      'They also like the gum, nectar and juice of wattle and eucalyptus.',
    ].join(' '),
  },
  'Eucalyptus pauciflora': {
    nickname: 'Snow Gum',
    trunk: 'pau-trunk.jpg',
    leaves: 'pau-leaves.jpg',
    fruit: 'pau-fruit.jpg',
    desc: [
      'Snow Gum known as snow gum or white sallee, it is a sub-alpine or temperate tree in Victoria, and a species of flowering plant in the family Myrtaceae.',
    ].join(' '),
    feature: [
      'The most common predator for the Leadbeater\'s Possums would be the largest Owl in the habitats, and when they came nearer to the ground predators include feral species such as foxes and cats.',
      'Thus the Leadbeater\'s Possums need dense bushes that perch under the trees to provide connectivity, so they can safely cross the forest and forage without being preyed by owls. The bark of the snow gum is smooth and white to light grey, sometimes brownish red, and it falling off into plaques or strips.',
      'It helps to cover and protect the possum for moving.',
      // 'Its leaves are usually grey-green lanceolate to wide-lanceolate, with distinct parallel veins, this eucalyptus also provides gum, nectar and juice for the possum as food.',
    ].join(' '),
  },
}

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(6),
    margin: theme.spacing(3),
  },
  title: {
    textAlign: 'center',
    padding: theme.spacing(1),
  },
  titleDesc: {
    margin: theme.spacing(3),
    borderBottom: '1px solid #eee',
    paddingBottom: theme.spacing(2),
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
      <Typography variant='subtitle1' className={classes.titleDesc}>
        The Leadbeater’s Possum lives almost exclusively in the Central Highlands in the state of Victoria, within the native forests 700m above sea level, including the <strong>Mountain Ash</strong>, <strong>Alpine Ash</strong>, <strong>Shining Gum</strong> and <strong>Snow Gum</strong>.
        In Victoria tall trees are found in the Otway, Dandenong, Yarra and Strzelecki ranges, as well as East Gippsland.
        The dead or alive large old trees hollows which over 150 years old are suitable for the Leadbeater’s Possum to build their nest for rest and breeding.
        In the dense and understory of branch enable the possum to safely pass through the forest for food searching and living.
      </Typography>
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