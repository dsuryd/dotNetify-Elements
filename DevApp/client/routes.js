import React from 'react';
import ReactDOM from 'react-dom';
import dotnetify from 'dotnetify';
import App from 'app/views/App';
import FormDemo from 'app/views/FormDemo';
import HorizontalFormDemo from 'app/views/HorizontalFormDemo';
import ValidationFormDemo from 'app/views/ValidationFormDemo';
import DataGridDemo from 'app/views/DataGridDemo';

// Import all the routeable views into the global window variable.
Object.assign(window, {
   FormDemo,
   HorizontalFormDemo,
   ValidationFormDemo,
   DataGridDemo
});

// Hot module replacement.  
if (module.hot) {
  const render = (react, elemId) => {

     ReactDOM.unmountComponentAtNode(document.getElementById(elemId));
     ReactDOM.render(React.createElement(react), document.getElementById(elemId));
  }

  module.hot.accept('routes', _ => render(require('./app/views/App').default, 'App'));
  module.hot.accept('app/views/App', _ => render(require('./app/views/App').default, 'App'));
  module.hot.accept('app/views/FormDemo', _ => render(require('./app/views/FormDemo').default, 'NavMenuTarget'));
  module.hot.accept('app/views/HorizontalFormDemo', _ => render(require('./app/views/HorizontalFormDemo').default, 'NavMenuTarget'));
  module.hot.accept('app/views/ValidationFormDemo', _ => render(require('./app/views/ValidationFormDemo').default, 'NavMenuTarget'));
  module.hot.accept('app/views/DataGridDemo', _ => render(require('./app/views/DataGridDemo').default, 'NavMenuTarget'));
}

export default App;