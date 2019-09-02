import NavigationBar from '../source/NavigationBar.js';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import Banner from '../source/Banner.js';
import React from 'react';
import InfoCard from '../source/InfoCard.js';
import Footer from '../source/Footer.js';

export default function test() {
  return (
    <React.Fragment>
      <CssBaseline />
      <NavigationBar indexPage/>
      <Banner />
      <InfoCard />
      <Footer />
    </React.Fragment>
  )
}