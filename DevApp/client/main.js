import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes';
import './fonts/fa-svg-with-js.css';
import './fonts/fontawesome';
import './fonts/fa-regular';
import './app/styles/app.css';
import './app/styles/prism.css';
import dotnetify from 'dotnetify';

dotnetify.debug = true;

ReactDOM.render(<App />, document.getElementById('App'));
