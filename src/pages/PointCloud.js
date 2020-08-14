import { LinearInterpolator, OrbitView } from '@deck.gl/core'
import { COORDINATE_SYSTEM } from '@deck.gl/core/dist/es5/lib/constants'
import { PointCloudLayer } from '@deck.gl/layers'
import { load } from '@loaders.gl/core'
import { LASLoader } from '@loaders.gl/las'
import { PCDLoader } from '@loaders.gl/pcd'
import { PLYLoader } from '@loaders.gl/ply'
import { StyledNavigationItem as NavigationItem } from 'baseui/header-navigation'
import { Cell } from 'baseui/layout-grid'
import { Slider } from 'baseui/slider'
import { Table } from 'baseui/table'
import React, { useEffect, useState } from 'react'
import Stage from '../components/Stage'
import Popover from '../components/PointCloud/Popover'

const INITIAL_VIEW_STATE = {
  transitionDuration: 2400 * 3,
  transitionInterpolator: new LinearInterpolator(['rotationOrbit']),
  target: [0, 0, 0]
}
const INITIAL_POINT_CLOUDS = [
  ['Succelent', '/succulent_upright.ply', {
    ...INITIAL_VIEW_STATE,
    rotationOrbit: 0,
    zoom: 2.375
  }],
  ['Plant Leaves', '/plant_leaves.ply', {
    ...INITIAL_VIEW_STATE,
    rotationX: 23,
    rotationOrbit: 2.7,
    zoom: 2.5
  }],
  ['Plant with Pot', '/plant_in_pot.ply', {
    ...INITIAL_VIEW_STATE,
    rotationX: 2.75,
    rotationOrbit: 57.54,
    zoom: 2.25
  }],
  ['Rubicks Cube', '/cube_center.ply', {
    ...INITIAL_VIEW_STATE,
    rotationX: 5,
    rotationOrbit: 23,
    zoom: 0.84
  }]
]

const DEBUG = true
const PointCloud = () => {
  const [data, setData] = useState(null)
  const [currentItem, setCurrentItem] = useState(INITIAL_POINT_CLOUDS[0][0])
  const [uri, setUri] = useState(INITIAL_POINT_CLOUDS[0][1])
  const [viewState, setViewState] = useState(INITIAL_POINT_CLOUDS[0][2])
  const [radiusPixels, setRadiusPixels] = useState(3)

  useEffect(() => {
    const loadPCD = async () => {
      const { header, attributes } = await load(uri, [PCDLoader, LASLoader, PLYLoader])
      const { vertexCount: length } = header
      const { POSITION: getPosition, COLOR_0: getColor } = attributes
      setData({ length, attributes: { getPosition, getColor } })
      rotateCamera(viewState.rotationOrbit)
    }
    loadPCD()
  }, [uri])

  const rotateCamera = (oldRotationOrbit) => {
    const updatedRotationOrbit = oldRotationOrbit + 120
    setViewState({
      ...viewState,
      rotationOrbit: updatedRotationOrbit,
      onTransitionEnd: () => rotateCamera(updatedRotationOrbit)
    })
  }

  const layers = data ? new PointCloudLayer({
    id: 'point-cloud-layer',
    data,
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
    getNormal: [0, 1, 0],
    radiusPixels
  }) : null

  const right = [
    <NavigationItem key='popover'>
      <Popover
        items={INITIAL_POINT_CLOUDS}
        currentItem={currentItem}
        handleItemSelect={([name, uri, viewState]) => {
          setUri(uri)
          setViewState(viewState)
          setCurrentItem(name)
        }}
      />
    </NavigationItem>
  ]

  const layout = (
    <Cell skip={8} span={4}>
      <Slider
        min={0.01}
        max={10}
        step={0.01}
        value={[radiusPixels]}
        onChange={({ value }) => value && setRadiusPixels(value[0])}
      />
      <Table
        columns={['Key', 'Value']}
        data={Object.entries(viewState).map(([k, v]) => [k, JSON.stringify(v)])}
      />
    </Cell>
  )

  return (
    <Stage
      hideSearch
      views={new OrbitView()}
      viewState={viewState}
      controller
      onViewStateChange={({ viewState: v }) => setViewState(v)}
      layers={layers}
      parameters={{
        clearColor: [0.93, 0.86, 0.81, 1]
      }}
      right={right}
      noMap
    >{DEBUG ? layout : <Cell />}
    </Stage>
  )
}

export default PointCloud
