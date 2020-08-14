import React from 'react'
import { Navigation } from 'baseui/side-navigation'
import { connect } from 'react-redux'
import { setNavigationLocation } from '../../reducers/playgroundReducer'

export const PlaygroundNavigation = ({ items, activeItemId, onChange }) => (
  <Navigation
    items={items}
    activeItemId={activeItemId}
    onChange={onChange}
    overrides={{
      NavItem: {
        style: ({ $active, $theme: { colors: { positive400, mono900 } } }) =>
          !$active ? ({ ':hover': { color: positive400 } })
            : ({
              backgroundColor: positive400,
              borderLeftColor: mono900,
              color: mono900,
              ':hover': {
                color: positive400
              }
            })
      }
    }}
  />
)

const mapStateToProps = ({ playground: { navigationLocations, currentLocation } }) => ({
  items: navigationLocations,
  activeItemId: currentLocation.itemId
})
const dispatchToProps = dispatch => ({
  onChange: ({ item }) => dispatch(setNavigationLocation(item))
})

export default connect(mapStateToProps, dispatchToProps)(PlaygroundNavigation)
