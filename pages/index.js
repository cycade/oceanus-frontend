import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import NavigationBar from '../components/NavigationBar.js';
import Banner from '../components/Banner.js';
import InfoCard from '../components/InfoCard.js';
import Footer from '../components/Footer.js';

export default function index() {
  return (
    <React.Fragment>
      <CssBaseline />
      <NavigationBar indexPage currentPage=''/>
      <Banner />
      <InfoCard />
      <Footer />
    </React.Fragment>
  )
}