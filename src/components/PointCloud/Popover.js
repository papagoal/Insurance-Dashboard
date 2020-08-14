import { Button } from 'baseui/button'
import ChevronDown from 'baseui/icon/chevron-down'
import { StatefulMenu } from 'baseui/menu'
import { PLACEMENT, StatefulPopover } from 'baseui/popover'
import React from 'react'

const Popover = ({ currentItem, handleItemSelect, items }) =>
  <StatefulPopover
    placement={PLACEMENT.bottomLeft}
    content={({ close }) => (
      <StatefulMenu
        items={items}
        onItemSelect={({ item }) => {
          handleItemSelect(item)
          close()
        }}
        overrides={{
          List: {
            style: {
              width: '138px'
            }
          },
          Option: {
            props: {
              getItemLabel: item => item[0]
            }
          }
        }}
      />
    )}
  >
    <Button endEnhancer={() => <ChevronDown size={24} />}>
      {currentItem}
    </Button>
  </StatefulPopover>

export default Popover
