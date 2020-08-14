import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'baseui/button'
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from 'baseui/header-navigation'

class IndexProfile extends Component {
  render () {
    return (
      <div>
        Hi, this is index profile.
        There is a button here. Click it to create a insurance form.
        <br /><br />
        <NavLink exact to='/application'>
          <NavigationList $align={ALIGN.right}>
            <Button>Add a new form </Button>
          </NavigationList>
        </NavLink>
      </div>
    )
  }
}

export default IndexProfile