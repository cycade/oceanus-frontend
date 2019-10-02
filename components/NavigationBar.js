import { Component } from 'react';
import { AppBar, Toolbar, Button, Typography, Hidden, IconButton, Menu, MenuItem, Link, CardMedia, Box } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/menu';
import { withStyles } from '@material-ui/core/styles';

const routes = [
  { name: 'Home', route: './' },
  { name: 'Record Map', route: './recordmap' },
  { name: 'Quiz', route: './quiz' },
  { name: 'News', route: './news' },
  { name: 'Explore', route: './explore' },
]

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  link: {
    border: '1px solid white',
    color: '#333333',
  }
})

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    let initialColor = props.indexPage ?  'transparent' : 'primary';
    this.state = { anchorEl: null, navBarColor: initialColor };
  }

  setAnchorEl(value) { this.setState({ anchorEl: value }); }

  componentDidMount() {
    if (this.props.indexPage) {
      window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
    }
  }

  componentWillUnmount() {
    if (this.props.indexPage) {
      window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
  }

  handleScroll() {
    if (this.props.indexPage) {
      const lastScroll = window.scrollY;
      if (lastScroll > 160 && this.state.navBarColor === 'transparent') {
        this.setState({ navBarColor: '#404f3e' })
      }
      if (lastScroll < 160 && this.state.navBarColor !== 'transparent') {
        this.setState({ navBarColor: 'transparent' })
      }
    }
  }

  handleClick(event) {
    this.setAnchorEl(event.currentTarget);
  }

  handleClose() {
    this.setAnchorEl(null)
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <AppBar style={{background: `${this.state.navBarColor}`, boxShadow: 'none'}}>
        <Toolbar>
          <Hidden smUp>
          <Typography variant='h6' className={classes.title}>
              <Link href='/' underline='none' color='inherit'>PossumNest</Link>
            </Typography>
            <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={this.handleClick.bind(this)}>
              {/* <MenuIcon /> */}
              <Button color='inherit'>Menu</Button>
            </IconButton>
            <Menu anchorEl={this.state.anchorEl} keepMounted open={Boolean(this.state.anchorEl)} onClose={this.handleClose.bind(this)}>
              {
                routes.map((e, i) => {
                  return (
                    <MenuItem key={i+1} onClick={this.handleClose.bind(this)}>
                      <Button href={e.route}>{e.name}</Button>
                    </MenuItem>
                  )
                })
              }
              <MenuItem onClick={this.handleClose.bind(this)}><Button>Logout</Button></MenuItem>
            </Menu>
          </Hidden>
          <Hidden xsDown>
            <CardMedia image='../static/img/logo.png' className={classes.logo}/>
            <Typography variant='h5' className={classes.title}>
              <Link href='/' underline='none' color='inherit'>PossumNest</Link>
            </Typography>
            {
              routes.map((e, i) => 
                <Box key={i+1} borderBottom={this.props.currentPage === e.route.slice(2) ? 1 : 0}>
                  <Button key={i+1} color='inherit' href={e.route}>
                    {e.name}
                  </Button>
                </Box>
              )
            }
            <Button variant='contained' color='secondary' className={classes.button}>Logout</Button>
          </Hidden>
        </Toolbar>
      </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(NavigationBar);