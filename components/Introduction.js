import { Hidden, Paper, GridList, GridListTile, Typography, Button, CardMedia, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import image1 from '../static/img/S1.jpg'
import image2 from '../static/img/S2.jpg'
import image3 from '../static/img/S3.jpg'
import image4 from '../static/img/S4.jpg'


// const useStyles = makeStyles(theme => ({
//   root: {
//     marginTop: theme.spacing(1),
//     display: 'flex',
//     justifyContent: 'center',
//   },
//   paper: {
//     width: '78vw',
//     padding: theme.spacing(3),
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     overflow: 'hidden',
//     backgroundColor: theme.palette.background.paper,
//   },
//   gridList: {
//     width: '72vw',
//     // height: 485,
//     transform: 'translateZ(0)',
//   },
//   titleBar: {
//     background:
//       'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
//       'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
//   },
//   title: {
//     marginTop: theme.spacing(2),
//     marginBottom: theme.spacing(8),
//   },
//   icon: {
//     color: 'white',
//   },
//   buttonContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     marginTop: theme.spacing(1),
//   },
//   button: {
//     width: '60%',
//     backgroundColor: theme.palette.primary.light,
//     color: 'white',
//     '&:hover': {
//       backgroundColor: theme.palette.primary.dark,
//     },
//   },
// }));

// const tileData = [
//   {type: 'img', img: image1, title: 'title', featured: true},
//   {type: 'text', content: "I'm the only species in the petaurid genus Gymnobelideus in an ancestral form.", title: 'Rarity', button: 'Find Me', href: './recordmap'},
//   {type: 'img', img: image2, title: 'title', featured: true},
//   {type: 'text', content: 'The greatest threats to my conservation in the wild are logging, low habitats protection, bush fire and predator threats.', title: 'Threats', button: 'Attempt Quiz', href: './quiz'},
//   {type: 'text', content: 'I\'m listed as a "critically endangered" species under the EPBC Act in 2015.', title: 'Endanger', button: 'Explore', href: './explore'},
//   {type: 'img', img: image3, title: 'title', featured: true},
//   {type: 'text', content: 'My conservation includes montane ash forest (i.e. Mt Ritchie) and sub-alpine woodland (i.e. Mount Baw Baw).', title: 'Conservation', button: 'News', href: './news'},
//   {type: 'img', img: image4, title: 'title', featured: true},
// ]

// export default function InfoCard() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//     <Paper className={classes.paper}>
//       <Hidden smDown>
//         <Typography variant='h4' className={classes.title}>Do you know me?</Typography>
//         <GridList cellHeight={120} spacing={1} cols={4} className={classes.gridList}>
//           {tileData.map((tile, i) => {
//             if (tile.type == 'text') {
//               return (
//                 <GridListTile key={i} cols={1} rows={2} style={{padding: 5}}>
//                   <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
//                     <Typography align='center' gutterBottom variant="h5" component="h2">
//                       {tile.title}
//                     </Typography>
//                     <Typography align='center' variant="body2" color="textSecondary" component="p">
//                       {tile.content}
//                     </Typography>
//                     <div className={classes.buttonContainer}>
//                       <Button variant='contained' className={classes.button} href={tile.href}>{tile.button}</Button>
//                     </div>
//                   </div>
//                 </GridListTile>
//               )
//             } else {
//               return (
//                 <GridListTile key={tile.img} cols={1} rows={tile.featured ? 2 : 1}>
//                   <img src={tile.img} alt={tile.title} />
//                 </GridListTile>
//               )
//             }
//           })}
//         </GridList>
//       </Hidden>

//       <Hidden mdUp xsDown>
//       <Typography variant='h5' className={classes.title}>What is Leadbeater's Possum?</Typography>
//         <GridList cellHeight={120} spacing={1} cols={2} className={classes.gridList}>
//           {tileData.map((tile, i) => {
//             if (tile.type == 'text') {
//               return (
//                 <GridListTile key={i} cols={1} rows={2} style={{padding: 5}}>
//                   <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
//                     <Typography align='center' gutterBottom variant="h6">
//                       {tile.title}
//                     </Typography>
//                     <Typography align='center' color="textSecondary" component="p">
//                       {tile.content}
//                     </Typography>
//                   </div>
//                 </GridListTile>
//               )
//             } else {
//               return (
//                 <GridListTile key={tile.img} cols={1} rows={tile.featured ? 2 : 1}>
//                   <img src={tile.img} alt={tile.title} />
//                 </GridListTile>
//               )
//             }
//           })}
//         </GridList>
//       </Hidden>

//       <Hidden smUp>
//       <Typography variant='h6' className={classes.title}>What is Leadbeater's Possum?</Typography>
//         <GridList cellHeight={100} spacing={1} cols={1} className={classes.gridList}>
//           {tileData.map((tile, i) => {
//             if (tile.type == 'text') {
//               return (
//                 <GridListTile key={i} cols={1} rows={2} style={{padding: 5}}>
//                   <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
//                     <Typography align='center' gutterBottom variant="h6">
//                       {tile.title}
//                     </Typography>
//                     <Typography align='center' color="textSecondary" component="p">
//                       {tile.content}
//                     </Typography>
//                   </div>
//                 </GridListTile>
//               )
//             } else {
//               return (
//                 <GridListTile key={tile.img} cols={1} rows={tile.featured ? 2 : 1}>
//                   <img src={tile.img} alt={tile.title} />
//                 </GridListTile>
//               )
//             }
//           })}
//         </GridList>
//       </Hidden>

//     </Paper>
//     </div>
//   );
// }

const introData = [
  {
    title: 'Rarity',
    desc: "I'm the only species in the petaurid genus Gymnobelideus in an ancestral form.",
    img: image1,
    button: 'Find Me',
    href: './recordmap',
  },
  {
    title: 'Threats',
    desc: 'The greatest threats to my conservation in the wild are logging, low habitats protection, bush fire and predator threats.',
    img: image2,
    button: 'Attempt Quiz',
    href: './quiz'
  },
  {
    title: 'Endanger',
    desc: 'I\'m listed as a "critically endangered" species under the EPBC Act in 2015.',
    img: image3,
    button: 'Explore',
    href: './explore'
  },
  {
    title: 'Conservation',
    desc: 'My conservation includes montane ash forest (i.e. Mt Ritchie) and sub-alpine woodland (i.e. Mount Baw Baw).',
    img: image4,
    button: 'News',
    href: './news'
  },
]

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: theme.spacing(18),
    // marginRight: theme.spacing(18),
  },
  grid: {
    width: '95vw',
  },
  title: {
    textAlign: 'center',
    fontWeight: 500,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  intro: {
    // padding: theme.spacing(10),
  },
  introImg: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    minHeight: '240px',
    borderRadius: 4,
    boxShadow: '2px 2px 5px #aaa',
  },
  introText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
  },
  introTitle: {
    fontWeight: 500,
    margin: theme.spacing(2),
    marginBottom: theme.spacing(0),
    // borderBottom: 'thick green',
  },
  introDesc: {
    fontWeight: 300,
    margin: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    lineHeight: 1.25,
    flexGrow: 1,
  },
  button: {
    width: '180px',
    marginTop: theme.spacing(1),
    margin: theme.spacing(2),
    backgroundImage: 'linear-gradient(0.25turn, #404f3e, #6b7b69)',
    '&:hover': {
      backgroundImage: 'linear-gradient(0.25turn, #192718, #6b7b69)',
    }
  },
}))

export default function InfoCard(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant='h3' className={classes.title}>Do you know me?</Typography>
      <Grid container spacing={6} className={classes.grid}>
        {
          introData.map((e, i) => {
            return (
              <Grid item key={i} className={classes.intro} xs={12} md={6} xl={3}>
                <CardMedia image={e.img} className={classes.introImg}/>
                <div className={classes.introText}>
                  <Typography variant='h4' className={classes.introTitle}>{e.title}</Typography>
                  <Typography variant='h6' className={classes.introDesc}>{e.desc}</Typography>
                  <Button href={e.href} variant='contained' color='primary' className={classes.button}>{e.button}</Button>
                </div>
              </Grid>
            )
          })
        }
      </Grid>
    </div>
  )
}