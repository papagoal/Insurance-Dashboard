import DeckGL from '@deck.gl/react'
import { ALIGNMENT, BEHAVIOR, Cell, Grid } from 'baseui/layout-grid'
import 'mapbox-gl/dist/mapbox-gl.css'
import React from 'react'
import { StaticMap } from 'react-map-gl'
import { connect } from 'react-redux'
import NavBar from '../components/NavBar'
import { updateViewState } from '../reducers/appReducer'

const Stage = ({ children, viewState, layers, layerFilter, views, handleViewStateChange, mapStyle, right, noMap = false, ...rest }) =>
  <DeckGL
    layers={layers}
    layerFilter={layerFilter}
    viewState={viewState}
    onViewStateChange={handleViewStateChange}
    views={views}
    {...rest}
  >
    {noMap ? null : <StaticMap mapStyle={mapStyle} />}
    <Grid align={ALIGNMENT.center} behavior={BEHAVIOR.fluid} gridGaps={10} gridGutters={20} gridMargins={1}>
      <Cell span={12}>
        <NavBar right={right} {...rest} />
      </Cell>
      {children}
    </Grid>

  </DeckGL>

const mapStateToProps = (state, ownProps) => ({ ...state, ...ownProps })
const dispatchToProps = dispatch => ({
  handleViewStateChange: ({ viewState }) => dispatch(updateViewState(viewState))
})

export default connect(mapStateToProps, dispatchToProps)(Stage)
