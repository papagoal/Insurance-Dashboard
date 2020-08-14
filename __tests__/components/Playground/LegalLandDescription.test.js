// import renderer from 'react-test-renderer'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import 'regenerator-runtime/runtime'
import { dispatchToProps, LegalLandDescriptionList, mapStateToProps } from '../../../src/components/Playground/LegalLandDescriptionList'
import { updateSelectedLLD } from '../../../src/reducers/playgroundReducer'
import { featureCollection, point } from '@turf/helpers'

const list = ['first', 'second', 'third']

describe('LegalLandDescriptionList', () => {
  it('has NO text when passed in an empty list', () => {
    const { queryByText } = render(
      <LegalLandDescriptionList list={[]} value='' />
    )

    expect(queryByText('All')).toBeTruthy()
    expect(queryByText(list[0])).toBeFalsy()
    expect(queryByText(list[1])).toBeFalsy()
    expect(queryByText(list[2])).toBeFalsy()
  })

  it('has text "first" when passed in list with 1 item', () => {
    const { queryByText } = render(
      <LegalLandDescriptionList list={[list[0]]} value='' />
    )

    expect(queryByText('All')).toBeTruthy()
    expect(queryByText(list[0])).toBeTruthy()
    expect(queryByText(list[1])).toBeFalsy()
    expect(queryByText(list[2])).toBeFalsy()
  })

  it('has text "first" and "second" when passed in list with 2 items', () => {
    const { queryByText } = render(
      <LegalLandDescriptionList list={[list[0], list[1]]} value='' />
    )

    expect(queryByText('All')).toBeTruthy()
    expect(queryByText(list[0])).toBeTruthy()
    expect(queryByText(list[1])).toBeTruthy()
    expect(queryByText(list[2])).toBeFalsy()
  })

  it('changes value of radio group when clicked', async () => {
    const { queryByText, getByLabelText } = render(
      <LegalLandDescriptionList list={list} />
    )

    expect(queryByText('All')).toBeTruthy()
    expect(queryByText(list[0])).toBeTruthy()
    expect(queryByText(list[1])).toBeTruthy()
    expect(queryByText(list[2])).toBeTruthy()

    const radio = getByLabelText(list[1])
    fireEvent.change(radio, { target: { value: 'Hello' } })
    expect(radio.value).toBe('Hello')
  })

  describe('mapStateToProps', () => {
    const input = { playground: { selectedLLD: [] }, app: { lld: [] } }

    it('sets value to empty string when given empty selectedLLD', () => {
      const { value: output } = mapStateToProps(input)
      expect(output).toBe('')
    })

    it('sets value to string of first array element', () => {
      const i = { ...input, playground: { selectedLLD: [{ label: 'Hello' }] } }
      const { value: output } = mapStateToProps(i)
      expect(output).toBe('Hello')
    })

    it('sets list to empty array when given empty lld', () => {
      const { list: output } = mapStateToProps(input)
      expect(output).toStrictEqual([])
    })

    it('sets list to array', () => {
      const lld = featureCollection([
        point([-75.343, 39.984], { name: 'A' }),
        point([-75.833, 39.284], { name: 'B' })
      ])
      const i = { ...input, app: { lld } }
      const { list: output } = mapStateToProps(i)
      expect(output).toStrictEqual(['A', 'B'])
    })
  })

  describe('dispatchToProps', () => {
    it('dispatches update selected lld with a single element array when given a value', () => {
      const dispatch = jest.fn()
      const { onChange } = dispatchToProps(dispatch)
      onChange({ target: { value: 'Hello' } })
      expect(dispatch).toHaveBeenCalledWith(updateSelectedLLD([{ label: 'Hello', id: 'Hello' }]))
    })

    it('dispatches update selected lld with empty array when NOT given a value', () => {
      const dispatch = jest.fn()
      const { onChange } = dispatchToProps(dispatch)
      onChange({ target: { value: '' } })
      expect(dispatch).toHaveBeenCalledWith(updateSelectedLLD([]))
    })
  })
})
