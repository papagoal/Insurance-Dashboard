import { Avatar } from 'baseui/avatar'
import { Button, KIND, SHAPE, SIZE } from 'baseui/button'
import ChevronDown from 'baseui/icon/chevron-down'
import { StatefulMenu } from 'baseui/menu'
import { PLACEMENT, StatefulPopover } from 'baseui/popover'
import React from 'react'
import { useAuth0 } from './auth0-spa'

const ITEMS = [
  { label: 'Settings' }
]

const Profile = () => {
  const { loading, user } = useAuth0()

  const style = ({ $theme }) => ({
    borderTopLeftRadius: $theme.borders.radius100,
    borderTopRightRadius: $theme.borders.radius100,
    borderBottomRightRadius: $theme.borders.radius100,
    borderBottomLeftRadius: $theme.borders.radius100
  })

  return (
    <StatefulPopover
      placement={PLACEMENT.bottomLeft}
      content={({ close }) => (
        <StatefulMenu
          items={ITEMS}
          onItemSelect={() => close()}
          overrides={{
            List: { style: { height: '50px', width: '138px' } }
          }}
        />
      )}
    >

      <Button
        shape={SHAPE.square}
        size={SIZE.mini}
        kind={KIND.minimal}
        isLoading={loading || !user}
        endEnhancer={() => <ChevronDown size={24} />}
      >
        {user && (
          <Avatar
            overrides={{
              Avatar: { style },
              Root: { style }
            }}
            name={user.name}
            size='scale1400'
            src={user.picture}
          />
        )}
      </Button>
    </StatefulPopover>
  )
}

export default Profile
