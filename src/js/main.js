
import React from 'react'
import ReactDOM from 'react-dom'

import { browserHistory } from 'react-router'

import { AppContainer } from 'react-hot-loader'
import Root from './container/Root'


// const render = Root => {
//   ReactDOM.render(
//     <AppContainer>
//       <Root history={browserHistory}/>
//     </AppContainer>,
//     document.getElementById('app')
//   )
// }

// render(Root)

// if (module.hot) {
//   module.hot.accept('./js/container/Root', () => { render(Root) })
// }


ReactDOM.render(
 <AppContainer>
     <Root history={browserHistory}/>
    </AppContainer>,
  document.getElementById('app')
)

if (module.hot) {
  
  const orgError = console.error; // eslint-disable-line no-console
  console.error = (message) => { // eslint-disable-line no-console
    if (message && message.indexOf('You cannot change <Router routes>;') === -1) {
      // Log the error as normally
      orgError.apply(console, [message]);
    }
  };

  module.hot.accept('./container/Root.js', () => {
    const NextRootContainer = require('./container/Root.js').default;

    ReactDOM.render((
      <AppContainer>
        <NextRootContainer history={browserHistory} />
      </AppContainer>
    ), document.getElementById('app'));
  })
}
