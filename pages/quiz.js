import React from 'react';
import NavigationBar from '../source/NavigationBar.js';
import Quiz from '../source/Quiz.js';



export default function quiz(props) {
  return (
    <React.Fragment>
      <NavigationBar />
      <Quiz />
    </React.Fragment>
  )
}