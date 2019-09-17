import React from 'react';
import NavigationBar from '../components/NavigationBar.js';
import Quiz from '../components/Quiz.js';



export default function quiz(props) {
  return (
    <React.Fragment>
      <NavigationBar currentPage='quiz'/>
      <Quiz />
    </React.Fragment>
  )
}