import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';
import dotnetify from 'dotnetify';
import * as views from './views';
import 'dotnetify-elements/dotnetify-elements.css';

dotnetify.debug = true;

// Import all the routeable views into the global window variable.
Object.assign(window, { ...views });

ReactDOM.render(<App />, document.getElementById('App'));
