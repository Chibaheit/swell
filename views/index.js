import React from 'react'
import ReactDOM from 'react-dom'

import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { asyncConnect, ReduxAsyncConnect } from 'redux-connect'


import store from './redux/store'

import App from './App'
import MainPage from './MainPage'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'

const history = syncHistoryWithStore(browserHistory, store)

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={MainPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(router, document.getElementById('root'))
