import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Typography, Hidden, Link, CardMedia, Box, Drawer, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const routes = [
  { name: 'home', route: './' },
  { name: 'explore', route: './explore' },
  { name: 'record map', route: './recordmap' },
  { name: 'quiz', route: './quiz' },
  { name: 'news', route: './news' },
  { name: 'nestbox', route: './nestbox' },
]

export default function NavigationBar(props) {
  const baseNavBarColor = '#404f3e';
  const [navBarColor, setNavBarColor] = useState(props.currentPage === 'home' ? 'transparent': baseNavBarColor);
  const [isDrawerOpen, setDrawer] = useState(false);

  const useStyles = makeStyles(theme => ({
    root: {
      boxShadow: 'none',
      backgroundColor: navBarColor,
    },
    logo: {
      height: 40,
      width: 20,
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    drawer: {
      backgroundColor: baseNavBarColor,
    },
    drawerItem: {
      color: theme.palette.basic.white,
    }
  }))

  const classes = useStyles();  

  const handleScroll = function() {
    if (true) {
      const lastScroll = window.scrollY;

      if (lastScroll > 160 && navBarColor === 'transparent') {
        setNavBarColor(baseNavBarColor);
      }

      if (lastScroll < 160 && navBarColor !== 'transparent') {
        setNavBarColor('transparent');
      }
    }
  }

  useEffect(() => {
    if (props.currentPage === 'home') {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return function cleanup() {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        {/* Render the application logo and name */}
        <CardMedia image='../static/img/logo.png' className={classes.logo}/>
        <Typography variant='h5' className={classes.title}>
          <Link href='/' underline='none' color='inherit'>PossumNest</Link>
        </Typography>

        {/* Render routes for sm or larger screen */}
        <Hidden xsDown>
          {
            routes.map((e, i) => (
              <Box key={i} borderBottom={props.currentPage === e.name ? 1 : 0}>
                <Button href={e.route} key={i} color='inherit'>{e.name}</Button>
              </Box>
            ))
          }
        </Hidden>

        {/* Render routes for screen less than sm */}
        <Hidden smUp>
          <Drawer open={isDrawerOpen} anchor='top' onClose={() => setDrawer(false)}>
            <List className={classes.drawer}>
              <ListItem className={classes.drawerItem} key={0} style={{borderBottom: '1px dotted white'}}>
                <CardMedia image='../static/img/logo.png' className={classes.logo}/>
                <Typography variant='h5' className={classes.title}>
                  <Link href='/' underline='none' color='inherit'>PossumNest</Link>
                </Typography>
              </ListItem>
              {
                routes.map((e, i) => (
                  <ListItem className={classes.drawerItem} key={i+1}>
                    <Link href={e.route} underline='none' color='inherit'>{e.name.toUpperCase()}</Link>
                  </ListItem>
                ))
              }
            </List>
          </Drawer>
          <Button onClick={() => setDrawer(true)} color='inherit'>Menu</Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}