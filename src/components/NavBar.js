import { Breadcrumbs } from 'baseui/breadcrumbs'
import { Button } from 'baseui/button'
import { ALIGN, HeaderNavigation, StyledNavigationItem as NavigationItem, StyledNavigationList as NavigationList } from 'baseui/header-navigation'
import * as React from 'react'
import { Link } from 'react-router-dom'
import Profile from '../components/Authentication/Profile'
import PlaygroundSearchBox from '../components/Playground/PlaygroundSearchBox'
import { useAuth0 } from './Authentication/auth0-spa'

const linkStyle = { textDecoration: 'none', color: 'white' }
const NavBar = ({
  right = [],
  hideSearch = false
}) => {
  const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0()
  return (
    <HeaderNavigation>
      {hideSearch ? null : (
        <NavigationList $align={ALIGN.left}>
          <NavigationItem>
            <PlaygroundSearchBox />
          </NavigationItem>
        </NavigationList>
      )}
      <NavigationList $align={ALIGN.center}>
        <NavigationItem>
          <Breadcrumbs>
            <Link to='/' style={linkStyle}>Home</Link>
            <Link to='/playground' style={linkStyle}>Playground</Link>
            <Link to='/pointcloud' style={linkStyle}>Point Cloud</Link>
            <Link to='/link/list' style={linkStyle}>List</Link>
          </Breadcrumbs>
        </NavigationItem>
      </NavigationList>
      <NavigationList $align={ALIGN.right}>
        {right.map((r, i) => <NavigationItem key={i}>{r}</NavigationItem>)}
      </NavigationList>
      <NavigationList $align={ALIGN.right}>
        <NavigationItem>
          {isAuthenticated
            ? <Button isLoading={loading} onClick={() => logout()}>Log Out</Button>
            : <Button onClick={() => loginWithRedirect({})}>Log In</Button>}
        </NavigationItem>
      </NavigationList>
      <NavigationList $align={ALIGN.right}>
        {isAuthenticated ? <NavigationItem><Profile /></NavigationItem> : null}
      </NavigationList>
    </HeaderNavigation>
  )
}

export default NavBar
