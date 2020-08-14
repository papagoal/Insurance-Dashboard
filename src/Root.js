import { ApolloProvider } from '@apollo/react-hooks'
import loadable from '@loadable/component'
import { BaseProvider, LightTheme } from 'baseui'
import React from 'react'
import { Provider } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { Auth0Provider } from './components/Authentication/auth0-spa'
import Callback from './components/Authentication/Callback'
import CreateLink from './components/Link/CreateLink'
import ListLink from './components/Link/ListLink'
import UpdateLink from './components/Link/UpdateLink'
import apolloClient from './graphql/client'
import config from './utils/auth_config.json'
import history from './utils/history'

const App = loadable(() => import('./pages/App'))
const Playground = loadable(() => import(/* webpackPrefetch: true */'./pages/Playground'))
const PointCloud = loadable(() => import(/* webpackPrefetch: true */'./pages/PointCloud'))
const Profile = loadable(() => import('./pages/Profile'))
const IndexProfile = loadable(() => import('./pages/IndexProfile'))
const application = loadable(() => import('./pages/Profile_m'))

const engine = new Styletron()

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  )
}

const CustomProviderWrapper = ({ store, children }) => (
  <StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>
      <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        redirect_uri={window.location.href}
        audience={config.audience}
        onRedirectCallback={onRedirectCallback}
      >
        <Provider store={store}>
          <ApolloProvider client={apolloClient}>
            {children}
          </ApolloProvider>
        </Provider>
      </Auth0Provider>
    </BaseProvider>
  </StyletronProvider>

)

const AppRouter = () =>
  <Router history={history}>
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/playground' component={Playground} />
      <Route exact path='/callback' component={Callback} />
      <Route exact path='/pointcloud' component={PointCloud} />
      <Route exact path='/link/list' component={ListLink} />
      <Route exact path='/link/create' component={CreateLink} />
      <Route exact path='/link/update/:id' component={UpdateLink} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/indexProfile' component={IndexProfile} />
      <Route exact path='/application' component={application} />
    </Switch>
  </Router>

const Root = ({ store }) => (
  <CustomProviderWrapper store={store}>
    <AppRouter />
  </CustomProviderWrapper>
)

export default Root
