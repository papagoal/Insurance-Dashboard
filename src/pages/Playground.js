import { useStyletron } from 'baseui'
import { Cell } from 'baseui/layout-grid'
import React from 'react'
import LegalLandDescriptionList from '../components/Playground/LegalLandDescriptionList'
import PlaygroundNavigation from '../components/Playground/PlaygroundNavigation'
import PlaygroundStage from '../components/Playground/PlaygroundStage'

export default () => {
  return (
    <PlaygroundStage>
      <Cell span={2}>
        <Inner>
          <PlaygroundNavigation />
        </Inner>
      </Cell>
      <Cell span={2} skip={8}>
        <Inner>
          <LegalLandDescriptionList />
        </Inner>
      </Cell>
    </PlaygroundStage>
  )
}

export const Inner = ({ children }) => {
  const [css, theme] = useStyletron()
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.colors.primaryB,
        color: theme.colors.accent700,
        padding: '.25rem'
      })}
    >
      {children}
    </div>
  )
}
