import { Component } from 'react';
import { AppBar, Toolbar, Button, Typography, Hidden, IconButton, Menu, MenuItem, Link, CardMedia } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/menu';
import { withStyles } from '@material-ui/core/styles';

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
  }
})

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    let initialColor = props.indexPage ?  'transparent' : '#435749';
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
        this.setState({ navBarColor: '#435749' })
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
            <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={this.handleClick.bind(this)}>
              {/* <MenuIcon /> */}
            </IconButton>
            <Menu anchorEl={this.state.anchorEl} keepMounted open={Boolean(this.state.anchorEl)} onClose={this.handleClose.bind(this)}>
              <MenuItem onClick={this.handleClose.bind(this)} href='/distributionMap'>Distribution Map</MenuItem>
              <MenuItem onClick={this.handleClose.bind(this)} href='/clusteringMap'>Clustering Map</MenuItem>
              <MenuItem onClick={this.handleClose.bind(this)} href='/news'>News</MenuItem>
              <MenuItem onClick={this.handleClose.bind(this)}>Logout</MenuItem>
            </Menu>
            <Typography variant='h6' className={classes.title}>
              <Link href='/' underline='none' color='inherit'>PossumNest</Link>
            </Typography>
          </Hidden>
          <Hidden xsDown>
            <CardMedia image='../static/img/logo.png' className={classes.logo}/>
            <Typography variant='h5' className={classes.title}>
              <Link href='/' underline='none' color='inherit'>PossumNest</Link>
            </Typography>
            <Button color='inherit' href='/distributionMap'>Distribution Map</Button>
            <Button color='inherit' href='/clusteringMap'>Clustering Map</Button>
            <Button color='inherit' href='/news'>News</Button>
            <Button variant='outlined' color='inherit' className={classes.button}>Logout</Button>
          </Hidden>
        </Toolbar>
      </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(NavigationBar);