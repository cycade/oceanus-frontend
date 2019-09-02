import { Component } from 'react';
import { AppBar, Toolbar, Button, Typography, Hidden, IconButton, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/menu';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
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
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={this.state.anchorEl} keepMounted open={Boolean(this.state.anchorEl)} onClose={this.handleClose.bind(this)}>
              <MenuItem onClick={this.handleClose.bind(this)}>Distribution Map</MenuItem>
              <MenuItem onClick={this.handleClose.bind(this)}>Clustering Map</MenuItem>
              <MenuItem onClick={this.handleClose.bind(this)}>News</MenuItem>
              <MenuItem onClick={this.handleClose.bind(this)}>Logout</MenuItem>
            </Menu>
            <Typography variant='h6' className={classes.title}>PossumNest</Typography>
          </Hidden>
          <Hidden xsDown>
            <Typography variant='h5' className={classes.title}>PossumNest</Typography>
            <Button color='inherit'>Distribution Map</Button>
            <Button color='inherit'>Clustering Map</Button>
            <Button color='inherit'>News</Button>
            <Button variant='outlined' color='inherit' className={classes.button}>Logout</Button>
          </Hidden>
        </Toolbar>
      </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(NavigationBar);