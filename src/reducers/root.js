import { combineReducers } from 'redux'
import { playgroundReducer } from './playgroundReducer'
import { homeReducer } from './homeReducer'
import { appReducer } from './appReducer'
import { profileReducer } from './profileReducer'
import { formReducer } from './testFormReducer'

const rootReducer = combineReducers({
  app: appReducer,
  home: homeReducer,
  playground: playgroundReducer,
  profile: profileReducer,
  form: formReducer
})

export default rootReducer
