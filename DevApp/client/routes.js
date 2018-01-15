import React from 'react';
import ReactDOM from 'react-dom';
import dotnetify from 'dotnetify';
import { App, FormDemo, HorizontalFormDemo } from 'app/views';

// Import all the routeable views into the global window variable.
Object.assign(window, {
   FormDemo,
   HorizontalFormDemo
});

// Hot module replacement.  
if (module.hot) {
  const render = (react, elemId) => {

     //dotnetify.react.getViewModels().forEach(vm => vm.$destroy());
     ReactDOM.unmountComponentAtNode(document.getElementById(elemId));
     ReactDOM.render(React.createElement(react), document.getElementById(elemId));
  }

  module.hot.accept('routes', _ => render(require('./app/views/App').default, 'App'));
  module.hot.accept('app/views/App', _ => render(require('./app/views/App').default, 'App'));
  module.hot.accept('app/views/FormDemo', _ => render(require('./app/views/FormDemo').default, 'NavMenuTarget'));
  module.hot.accept('app/views/HorizontalFormDemo', _ => render(require('./app/views/HorizontalFormDemo').default, 'NavMenuTarget'));
}

export default App;