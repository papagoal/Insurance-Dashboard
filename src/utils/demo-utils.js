import bbox from '@turf/bbox'
import { featureCollection, lineString } from '@turf/helpers'
import hexGrid from '@turf/hex-grid'
import { randomPoint } from '@turf/random'
import squareGrid from '@turf/square-grid'
import tin from '@turf/tin'
import triangleGrid from '@turf/triangle-grid'
import voronoi from '@turf/voronoi'
import { interpolateRgb } from 'd3-interpolate'

// Utilities - Useful for Sprint Demo Purposes
export const verticalLines = (n = 50) => (lld) => {
  const [minX, minY, maxX, maxY] = bbox(lld)
  const dx = Math.abs(minX - maxX) / n
  const coordinates = []
  for (let i = 0; i < n; i++) {
    const lineColor = lineColors(i / n)
    const lineWidth = 5
    const properties = { lineColor, lineWidth }
    coordinates[i] = lineString([[minX + i * dx, minY], [minX + i * dx, maxY]], properties)
  }
  return featureCollection(coordinates)
}
export const horizontalLines = (n = 50) => (lld) => {
  const [minX, minY, maxX, maxY] = bbox(lld)
  const dy = Math.abs(minY - maxY) / n
  const coordinates = []
  for (let i = 0; i < n; i++) {
    coordinates[i] = lineString([[minX, minY + i * dy], [maxX, minY + i * dy]])
  }
  return featureCollection(coordinates)
}
const _randomPoints = new WeakMap()
const randomPoints = lld => {
  if (_randomPoints.has(lld)) { return _randomPoints.get(lld) }
  _randomPoints.set(lld, randomPoint(100, { bbox: bbox(lld) }))
  return _randomPoints.get(lld)
}
export const randomVoronoi = lld => voronoi(randomPoints(lld), { bbox: bbox(lld) })
const cellSide = 0.5
const navToColor = {
  '#premium': ['green', 'yellow'],
  '#risk': ['red', 'green'],
  '#assurance-program': ['#a10ea1', '#9c9c0d'],
  '#suggestions': ['#2C3E50', '#FD746C'],
  '#weather': ['#9e0505', '#059c05']
}
const generateColorMap = () => (i, nav) => {
  const colors = (nav && nav.itemId && nav.itemId in navToColor)
    ? navToColor[nav.itemId]
    : ['green', 'yellow']
  return generateColors(...colors)(i, nav)
}
const generateColors = (a, c) => (i) => {
  const interpolateColor = interpolateRgb(a, c)
  const [, r, g, b] = interpolateColor(i).match(/^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/)
  return [parseInt(r), parseInt(g), parseInt(b)]
}
export const colors = generateColorMap()
const lineColors = generateColors('brown', 'aqua')
export const randomSquareGrid = lld => squareGrid(bbox(lld), cellSide)
export const randomTriangeGrid = lld => triangleGrid(bbox(lld), cellSide / 5, {
  properties: {
    // lineWidth: 10,
    lineColor: [255, 0, 0, 255]
  }
})

const generateSingleLLD = () => {
  const rand = ls => ls[Math.floor(Math.random() * ls.length)]
  const quarter = rand(['NW', 'NE', 'SW', 'SE', 'N', 'S', 'E', 'W', ...Array.from({ length: 16 }, (v, k) => k + 1)])
  const section = 1 + Math.floor(Math.random() * 35) + (Math.random() > 0.5 ? 'A' : '')
  const township = 1 + Math.floor(Math.random() * 126) + (Math.random() > 0.5 ? 'A' : '')
  const range = 1 + Math.floor(Math.random() * 33) + (Math.random() > 0.5 ? 'A' : '')
  const meridian = rand(['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'E1', 'E2', 'COAST', '6', '5', '4'])
  return `${quarter} ${section}-${township}-${range}-${meridian}`
}

export const randomHexGrid = lld => hexGrid(bbox(lld), cellSide / 10)
export const randomTin = lld => tin(randomPoints(lld), 'z')

export const generateLLD = (n = 1) => Array.from({ length: n }, generateSingleLLD)
