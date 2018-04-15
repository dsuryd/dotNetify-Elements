import React from 'react';
import ReactDOM from 'react-dom';
import dotnetify from 'dotnetify';
import App from 'app/views/App';
import Overview from 'app/views/Overview';
import FormDemo from 'app/views/FormDemo';
import FormValidationDemo from 'app/views/FormValidationDemo';
import DataGridDemo from 'app/views/DataGridDemo';
import CustomerInfoPage from 'app/views/examples__customer-info/CustomerInfoPage';

// Import all the routeable views into the global window variable.
Object.assign(window, {
   Overview,
   FormDemo,
   FormValidationDemo,
   DataGridDemo,
   CustomerInfoPage
});

// Hot module replacement.
if (module.hot) {
   const render = (react, elemId) => {
      ReactDOM.unmountComponentAtNode(document.getElementById(elemId));
      ReactDOM.render(React.createElement(react), document.getElementById(elemId));
   };

   module.hot.accept('routes', _ => render(require('./app/views/App').default, 'App'));
   module.hot.accept('app/views/App', _ => render(require('./app/views/App').default, 'App'));
   module.hot.accept('app/views/Overview', _ => render(require('./app/views/Overview').default, 'NavMenuTarget'));
   module.hot.accept('app/views/FormDemo', _ => render(require('./app/views/FormDemo').default, 'NavMenuTarget'));
   module.hot.accept('app/views/FormValidationDemo', _ => render(require('./app/views/FormValidationDemo').default, 'NavMenuTarget'));
   module.hot.accept('app/views/DataGridDemo', _ => render(require('./app/views/DataGridDemo').default, 'NavMenuTarget'));
   module.hot.accept('app/views/examples__customer-info/CustomerInfoPage', _ =>
      render(require('./app/views/examples__customer-info/CustomerInfoPage').default, 'NavMenuTarget')
   );
}

export default App;
