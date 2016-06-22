import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import { reducer as form } from 'redux-form'

import user from './user'
import panel from './panel'

export default combineReducers({
  routing,
  reduxAsyncConnect,
  form,
  user,
  panel
})
