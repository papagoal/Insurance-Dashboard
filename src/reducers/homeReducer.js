import { createAction, handleActions } from 'redux-actions'

const INITIAL_APP_STATE = {
  visualMode: 'view',
  highlightedMonth: null,
  selectedMonth: null,
  selectedFeatureIndexes: new Set()
}

export const highlightMonth = createAction('HIGHLIGHT_MONTH')
export const selectMonth = createAction('SELECT_MONTH')
export const addFields = createAction('ADD_FIELD')
export const removeQuarterSection = createAction('UPDATE_REMOVE_MODE')
export const updateVisualMode = createAction('UPDATE_VISUAL_MODE')

export const homeReducer = handleActions({
  [highlightMonth]: (state, { payload: highlightedMonth }) => ({
    ...state,
    highlightedMonth
  }),
  [selectMonth]: (state, { payload: selectedMonth }) => ({
    ...state,
    selectedMonth
  }),
  [updateVisualMode]: (state, { payload }) => ({
    ...state,
    visualMode: (payload === 'view') ? 'select' : 'view'
  }),
  [addFields]: (state, { payload: currentIndex }) => {
    const { selectedFeatureIndexes } = state
    if (selectedFeatureIndexes.has(currentIndex)) {
      selectedFeatureIndexes.delete(currentIndex)
      return ({
        ...state,
        selectedFeatureIndexes
      })
    } else {
      return ({
        ...state,
        selectedFeatureIndexes: selectedFeatureIndexes.add(currentIndex)
      })
    }
  },
  [removeQuarterSection]: (state, { payload: index }) => {
    const { selectedFeatureIndexes } = state
    selectedFeatureIndexes.delete(index)
    return {
      ...state,
      selectedFeatureIndexes
    }
  }
}, INITIAL_APP_STATE)
