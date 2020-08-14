import { propReduce } from '@turf/meta'
import { Checkbox } from 'baseui/checkbox'
import React from 'react'
import { useQuery } from 'react-apollo'
import { connect } from 'react-redux'
import { GET_LLDS } from '../../pages/App'
import { updateSelectedLLDs } from '../../reducers/playgroundReducer'

export const LegalLandDescriptionList = ({ value, onChange }) => {
  const { loading, error, data } = useQuery(GET_LLDS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  const { llds } = data
  const names = propReduce(llds, (acc, { name }) => [...acc, name], [])
  const selectedLLDs = new Set(value)
  return (
    <ul>
      {names.map(lld => (
        <Checkbox
          key={lld}
          checked={selectedLLDs.has(lld)}
          onChange={() => onChange(
            selectedLLDs.has(lld)
              ? [...selectedLLDs].filter(s => s !== lld)
              : [...selectedLLDs, lld])}
        >
          {lld}
        </Checkbox>)
      )}
    </ul>
  )
}

export const mapStateToProps = ({ playground: { selectedLLDs } }) => ({
  value: selectedLLDs
})

export const dispatchToProps = dispatch => ({
  onChange: llds => dispatch(updateSelectedLLDs(llds))
})

export default connect(mapStateToProps, dispatchToProps)(LegalLandDescriptionList)
