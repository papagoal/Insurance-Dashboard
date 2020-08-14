import { MapView } from '@deck.gl/core'
import { gql } from 'apollo-boost'
import { Cell } from 'baseui/layout-grid'
import 'mapbox-gl/dist/mapbox-gl.css'
import { EditableGeoJsonLayer, ViewMode } from 'nebula.gl'
import React from 'react'
import { useQuery } from 'react-apollo'
import { connect } from 'react-redux'
import { useAuth0 } from '../components/Authentication/auth0-spa'
import ChangeModeButton from '../components/ChangeModeButton'
import SelectionList from '../components/SelectionList'
import Stage from '../components/Stage'
import { addFields, updateVisualMode } from '../reducers/homeReducer'

export const GET_LLDS = gql`
  query GET_LLDS {
    llds
  }
`

export const GET_LLDS_BY_IDS = gql`
  query GET_LLDS_BY_IDS($ids: [ID!]!) {
    llds(ids: $ids)
  }
`

const App = ({
  visualMode, selectedFeatureIndexes,
  viewState, mapStyle,
  selectedLLDs,
  inSelectVisualMode,
  handleChangeMode,
  handleOnFeatureSelect,
  hasSelectedLLDs
}) => {
  const { data = { llds: [] } } = hasSelectedLLDs
    ? useQuery(GET_LLDS_BY_IDS, { variables: { ids: selectedLLDs } })
    : useQuery(GET_LLDS)
  const { isAuthenticated = false } = useAuth0()

  const { llds } = data

  const layer = new EditableGeoJsonLayer({
    id: 'geojson-view-layer',
    data: llds,
    mode: ViewMode,
    selectedFeatureIndexes: inSelectVisualMode ? selectedFeatureIndexes : [],
    onClick: (info) => {
      if (inSelectVisualMode) {
        handleOnFeatureSelect(info)
      }
    },
    getFillColor: (feature, isSelected) => (inSelectVisualMode && isSelected) ? [255, 255, 0, 125] : [0, 0, 0, 0],
    getLineColor: (feature, isSelected) => (inSelectVisualMode && isSelected) ? [0, 0, 0, 125] : [0, 0, 255, 255]
  })
  const mapView = new MapView({ controller: true })
  const changeModeButton = <ChangeModeButton onClick={() => handleChangeMode(visualMode)} inViewMode={!inSelectVisualMode} />

  return (
    <Stage
      layers={[layer]}
      viewState={viewState}
      mapStyle={mapStyle}
      views={[mapView]}
      right={isAuthenticated ? [changeModeButton] : []}
      hideSearch={!isAuthenticated}
    >
      <Cell span={6} skip={6}>
        {inSelectVisualMode ? <SelectionList selectedFeatureIndexes={selectedFeatureIndexes} /> : null}
      </Cell>
    </Stage>
  )
}

const mapStateToProps = state => {
  const {
    playground: { selectedLLDs },
    app: { viewState, mapStyle },
    home: { visualMode, selectedFeatureIndexes }
  } = state

  const inSelectVisualMode = visualMode === 'select'
  const hasSelectedLLDs = selectedLLDs.length > 0
  return {
    inSelectVisualMode,
    selectedLLDs,
    viewState,
    mapStyle,
    visualMode,
    selectedFeatureIndexes,
    hasSelectedLLDs
  }
}
const dispatchToProps = dispatch => ({
  handleOnFeatureSelect: ({ index }) => dispatch(addFields(index)),
  handleChangeMode: (mode) => dispatch(updateVisualMode(mode))
})

export default connect(mapStateToProps, dispatchToProps)(App)
