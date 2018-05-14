import React from 'react';
import ReactDOM from 'react-dom';
import dotnetify from 'dotnetify';
import App from 'app/views/App';
import * as views from 'app/views';

// Import all the routeable views into the global window variable.
Object.assign(window, { ...views });

// Hot module replacement.
if (module.hot) {
   const render = (react, elemId) => {
      ReactDOM.unmountComponentAtNode(document.getElementById(elemId));
      ReactDOM.render(React.createElement(react), document.getElementById(elemId));
   };

   module.hot.accept('routes', _ => render(require('./app/views/App').default, 'App'));
   module.hot.accept('app/views/App', _ => render(require('./app/views/App').default, 'App'));
   module.hot.accept('app/views/Introduction', _ => render(require('./app/views/Introduction').default, 'NavMenuTarget'));
   module.hot.accept('app/views/form/FormTextField', _ => render(require('./app/views/form/FormTextField').default, 'NavMenuTarget'));
   module.hot.accept('app/views/form/FormTextAreaField', _ => render(require('./app/views/form/FormTextAreaField').default, 'NavMenuTarget'));
   module.hot.accept('app/views/form/FormDemo', _ => render(require('./app/views/form/FormDemo').default, 'NavMenuTarget'));
   module.hot.accept('app/views/form/FormValidationDemo', _ => render(require('./app/views/form/FormValidationDemo').default, 'NavMenuTarget'));
   module.hot.accept('app/views/list/DataGridDemo', _ => render(require('./app/views/list/DataGridDemo').default, 'NavMenuTarget'));
   module.hot.accept('app/views/examples__customer-info/CustomerInfoPage', _ =>
      render(require('./app/views/examples__customer-info/CustomerInfoPage').default, 'NavMenuTarget')
   );
}

export default App;
