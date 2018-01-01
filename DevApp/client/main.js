import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import './app/styles/app.css';
import 'bootstrap/dist/css/bootstrap.css';

// Import all the routeable views into the global window variable.
Object.assign(window, {

});

// Hot module replacement.  
if (module.hot) {
   const render = (react, elemId) => {
      ReactDOM.unmountComponentAtNode(document.getElementById(elemId));
      ReactDOM.render(React.createElement(react), document.getElementById(elemId));
   }

   module.hot.accept('./app/App.js', _ => render(require('./app/App').default, 'App'));
}

ReactDOM.render(
    <App />,
    document.getElementById('App'));

