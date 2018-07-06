import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes';
import './app/styles/app.css';
import './app/styles/prism.css';
import { dotnetify } from 'dotnetify-elements';

dotnetify.debug = true;

ReactDOM.render(<App />, document.getElementById('App'));
