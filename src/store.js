import window from 'global/window'
import { taskMiddleware } from 'react-palm/tasks'
import { applyMiddleware, compose, createStore } from 'redux'
import 'regenerator-runtime/runtime'
import reducers from './reducers/root'

const initialState = {}

export const middlewares = [
  taskMiddleware
]

export const enhancers = [applyMiddleware(...middlewares)]

// add redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  reducers,
  initialState,
  composeEnhancers(...enhancers)
)
