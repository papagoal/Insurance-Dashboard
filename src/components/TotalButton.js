import ArrowRight from 'baseui/icon/arrow-right'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'baseui/button'
import { useStyletron } from 'baseui'

export default function TotalButton ({ children }) {
  const [css] = useStyletron()
  return (
    <NavLink exact to='/playground' style={{ textDecoration: 'none' }}>
      <Button className={css({ width: '100%' })} endEnhancer={() => <ArrowRight size={24} />}>
      The total is: ${children} / acre
      </Button>
    </NavLink>
  )
}
