import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import RuleComponent from './components/RuleComponent';
import ModalWrapperComponent from './components/ModalWrappercomponent';

const App = () => {

  return ( <div className="container">


    <RuleComponent></RuleComponent>
  </div> )
}

export default App;
