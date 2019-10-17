import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import NavigationBar from '../components/NavigationBar.js';
import Banner from '../components/Banner.js';
import Introduction from '../components/Introduction.js';
import Footer from '../components/Footer.js';

export default function index() {
  return (
    <React.Fragment>
      <CssBaseline />
      <NavigationBar currentPage='home'/>
      <Banner />
      <Introduction />
      <Footer />
    </React.Fragment>
  )
}