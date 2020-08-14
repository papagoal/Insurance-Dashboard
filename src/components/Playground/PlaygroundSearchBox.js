import { propReduce } from '@turf/meta'
import { Select, SIZE, TYPE } from 'baseui/select'
import React from 'react'
import { useQuery } from 'react-apollo'
import { connect } from 'react-redux'
import { GET_LLDS } from '../../pages/App'
import { updateSelectedLLDs } from '../../reducers/playgroundReducer'

const PlaygroundSearchBox = ({ value, onChange }) => {
  const { loading, error, data } = useQuery(GET_LLDS)
  const options = data && data.llds
    ? propReduce(data.llds, (acc, { name }) => [...acc, { lld: name }], [])
    : []

  return (
    <Select
      autoFocus
      size={SIZE.large}
      options={options}
      labelKey='lld'
      valueKey='lld'
      placeholder='Legal Land Description'
      type={TYPE.search}
      multi
      onChange={({ value }) => onChange(value.map(({ lld }) => lld))}
      value={value}
      creatable
      isLoading={loading}
      error={error}
    />
  )
}

export const mapStateToProps = ({ playground: { selectedLLDs } }) => ({
  value: selectedLLDs.map(lld => ({ lld }))
})

export const dispatchToProps = dispatch => ({
  onChange: llds => dispatch(updateSelectedLLDs(llds))
})

export default connect(mapStateToProps, dispatchToProps)(PlaygroundSearchBox)
