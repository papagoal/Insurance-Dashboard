import centroid from '@turf/centroid'
import { createAction, handleActions } from 'redux-actions'
import { updateVisualMode } from './homeReducer'

const currentYear = (new Date()).getFullYear()
const numberOfYears = 5
const years = Array.from({ length: numberOfYears }, (v, k) => currentYear - numberOfYears + k)

const INITIAL_APP_STATE = {
  years,
  viewState: {
    longitude: -97.32156089186546,
    latitude: 49.828363659109264,
    zoom: 13.5,
    minZoom: 10,
    maxZoom: 16
  },
  mapStyle: 'mapbox://styles/mapbox/satellite-v9'
}

export const searchLLD = createAction('SEARCH_LLD')
export const updateViewState = createAction('UPDATE_VIEW_STATE')

export const appReducer = handleActions({
  [updateVisualMode]: (state, { payload }) => ({
    ...state,
    mapStyle: `mapbox://styles/mapbox/${payload === 'view' ? 'light-v10' : 'satellite-v9'}`
  }),
  [searchLLD]: (state, { payload: polygon }) => {
    const { geometry: { coordinates: [longitude, latitude] } } = centroid(polygon)
    return {
      ...state,
      viewState: { ...state.viewState, longitude, latitude }
    }
  },
  [updateViewState]: (state, { payload: viewState }) => ({
    ...state,
    viewState
  })
}, INITIAL_APP_STATE)
