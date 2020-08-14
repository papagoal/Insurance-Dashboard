import { MapView } from '@deck.gl/core'
import { GeoJsonLayer, TextLayer } from '@deck.gl/layers'
import centroid from '@turf/centroid'
import 'mapbox-gl/dist/mapbox-gl.css'
import React from 'react'
import { useQuery } from 'react-apollo'
import { connect } from 'react-redux'
import { GET_LLDS, GET_LLDS_BY_IDS } from '../../pages/App'
import { updateHoverYear, updateSelectedYear } from '../../reducers/playgroundReducer'
import { colors, horizontalLines, randomHexGrid, randomSquareGrid, randomTin, randomTriangeGrid, randomVoronoi, verticalLines } from '../../utils/demo-utils'
import Stage from '../Stage'

const PlaygroundStage = props => {
  const {
    selectedLLDs = [], currentLocation, selectedYear,
    viewState, children
  } = props

  const QUERY = selectedLLDs.length === 0 ? GET_LLDS : GET_LLDS_BY_IDS
  const { loading, error, data } = useQuery(QUERY, { variables: { ids: selectedLLDs } })
  const llds = (loading || error) ? [] : data.llds
  const otherLayers = (loading || error) ? [] : generateLayers({ ...props, llds })
  const otherViews = (loading || error) ? [] : generateViews({ ...props, llds })

  const mainLayer = new GeoJsonLayer({
    id: 'main-geojson-layer',
    data: llds,
    getFillColor: colors(0.5, currentLocation)
  })

  const mainMapView = new MapView({
    id: 'main-map-view',
    controller: true
  })

  return (
    <Stage
      layers={[mainLayer, otherLayers]}
      layerFilter={layerFilter(selectedYear)}
      viewState={viewState}
      views={[mainMapView, otherViews]}
    >
      {children}
    </Stage>
  )
}

const layerFilter = (selectedYear) =>
  ({ layer: { id: layerId }, viewport: { id: viewportId } }) => {
    const isLayerForSelectedYear = selectedYear && layerId.indexOf(selectedYear) >= 0
    const isMainMap = viewportId.indexOf('main-map-view') >= 0
    const isMainLayer = layerId.indexOf('main-geojson-layer') >= 0
    const isTextLayer = layerId.indexOf('-YEAR-LABEL') >= 0
    if (isMainMap) {
      if (!isTextLayer) {
        if (isMainLayer || isLayerForSelectedYear) {
          return true
        }
      }
    }
    return layerId.indexOf(viewportId) >= 0
  }

const generateLayers = props => [
  generateMiniMapLayers,
  generateAnalysisLayers,
  generateTextLayers
].map(f => f(props))

const generateMiniMapLayers = ({ years, handleYearChange, handleHover, currentLocation, llds: data }) =>
  years.map((year, i) => new GeoJsonLayer({
    id: `${year}-MINI-MAP-LAYER`,
    data,
    getFillColor: colors(i / years.length, currentLocation),
    pickable: true,
    onClick: () => handleYearChange(year),
    onHover: () => handleHover(year)
  }))

const generateAnalysisLayers = ({ years, handleYearChange, handleHover, llds }) => {
  const layers = [
    verticalLines(80),
    horizontalLines(20),
    randomSquareGrid,
    randomHexGrid,
    randomVoronoi,
    randomTin,
    randomTriangeGrid
  ].map(f => f(llds))

  return years.map((year, i) => new GeoJsonLayer({
    id: `${year}-ANALYSIS-LAYER`,
    fill: true,
    data: layers[i],
    getLineColor: ({ properties: { lineColor = [0, 0, 0, 255] } }) => lineColor,
    getLineWidth: ({ properties: { lineWidth = 1 } }) => lineWidth,
    lineWidthMinPixels: 0.5,
    parameters: { depthTest: false },
    getFillColor: () => [0, 0, 0, 0],
    onClick: () => handleYearChange(year),
    onHover: () => handleHover(year)
  }))
}

const generateTextLayers = ({ years, handleYearChange, handleHover, selectedYear, hoveredYear, llds }) => {
  const { geometry: { coordinates } } = centroid(llds)
  return years.map(year => new TextLayer({
    id: `${year}-YEAR-LABEL-LAYER`,
    data: [{ year }],
    pickable: true,
    getSize: ({ year }) => year === selectedYear ? 60 : 30,
    getColor: ({ year }) => year === hoveredYear ? [255, 255, 0, 128] : [0, 0, 0, 255],
    billboard: false,
    getPosition: coordinates,
    getText: ({ year }) => year.toString(),
    onClick: () => handleYearChange(year),
    onHover: () => handleHover(year)
  }))
}

const generateViews = ({ years, llds }) => {
  const { geometry: { coordinates: [longitude, latitude] } } = centroid(llds)
  return years.map((year, i) => new MapView({
    id: `${year}`,
    x: `${i * 100 / years.length}%`,
    y: '80%',
    height: 200,
    width: `${Math.round(100 / years.length)}%`,
    clear: true,
    controller: true,
    zoom: 11.5,
    latitude,
    longitude
  }))
}

const mapStateToProps = (state, ownProps) => ({
  ...state.playground,
  ...state.app,
  ...ownProps
})
const dispatchToProps = dispatch => ({
  handleYearChange: year => dispatch(updateSelectedYear(year)),
  handleHover: year => dispatch(updateHoverYear(year))
})

export default connect(mapStateToProps, dispatchToProps)(PlaygroundStage)
