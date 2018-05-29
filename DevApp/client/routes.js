import React from 'react';
import ReactDOM from 'react-dom';
import dotnetify from 'dotnetify';
import App from 'app/views/App';
import * as views from 'app/views';

// Import all the routeable views into the global window variable.
Object.assign(window, { ...views });

export default App;
