import document from 'global/document'
import React from 'react'
import { render } from 'react-dom'
import store from './store'
import Root from './Root'

render(<Root store={store} />, document.body.appendChild(document.createElement('div')))
