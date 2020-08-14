import { createAction, handleActions } from 'redux-actions'

const navigationLocations = [
  'Premium',
  'Risk',
  'Assurance Program',
  'Suggestions',
  'Weather'
].map(title => ({ title, itemId: `#${title.replace(/\s+/g, '-').toLowerCase()}` }))

const INITIAL_APP_STATE = {
  selectedYear: null,
  hoveredYear: null,
  navigationLocations,
  currentLocation: navigationLocations[0],
  selectedLLDs: []
}
export const setNavigationLocation = createAction('SET_NAVIGATION_LOCATION')
export const updateSelectedLLDs = createAction('UPDATE_SELECTED_LLD')
export const updatePlaygroundLLDs = createAction('UPDATE_PLAYGROUND_LLDS')
export const updateSelectedYear = createAction('UPDATE_SELECTED_YEAR')
export const updateHoverYear = createAction('UPDATE_HOVER_YEAR')

export const playgroundReducer = handleActions({
  [setNavigationLocation]: (state, { payload: currentLocation }) => ({
    ...state,
    currentLocation
  }),
  [updateSelectedLLDs]: (state, { payload: selectedLLDs }) => ({
    ...state,
    selectedLLDs
  }),
  [updatePlaygroundLLDs]: (state, { payload: llds }) => ({
    ...state,
    llds: llds.map(lld => ({ label: lld, id: lld }))
  }),
  [updateSelectedYear]: (state, { payload }) => ({
    ...state,
    selectedYear: parseInt(payload)
  }),
  [updateHoverYear]: (state, { payload }) => ({
    ...state,
    hoveredYear: parseInt(payload)
  })
}, INITIAL_APP_STATE)
