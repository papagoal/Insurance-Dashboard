import { Button } from 'baseui/button'
import { DeleteAlt, Filter } from 'baseui/icon'
import React from 'react'

const ChangeModeButton = ({ inViewMode = true, onClick }) =>
  <Button
    endEnhancer={inViewMode ? <Filter size={24} /> : <DeleteAlt size={24} />}
    onClick={() => onClick(inViewMode)}
  >{(inViewMode ? 'Make' : 'Exit') + ' Selection'}
  </Button>

export default ChangeModeButton
