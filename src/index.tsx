import React from 'react';
import ReactDOM from 'react-dom';
import * as helper from 'utils/helpers';
import ReactGA from 'react-ga';
import App from './app';

// define helpers as global window scope
window.helpers = helper;

// initial GA in root
const gaId = process.env.REACT_APP_GA || 'G-8NZ3JBSLVH';
ReactGA.initialize(gaId);

ReactDOM.render(<App />, document.getElementById('root'));
