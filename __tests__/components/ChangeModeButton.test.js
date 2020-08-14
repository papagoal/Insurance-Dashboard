// import renderer from 'react-test-renderer'
import 'regenerator-runtime/runtime'
import { fireEvent, render, waitForElement, wait } from '@testing-library/react'
import React from 'react'
import ChangeModeButton from '../../src/components/ChangeModeButton'

describe('ChangeModeButton', () => {
  it('has text "Make Selection" when in view mode', () => {
    const { queryByText } = render(
      <ChangeModeButton inViewMode />
    )

    expect(queryByText(/Make Selection/i)).toBeTruthy()
    expect(queryByText(/Exit Selection/i)).toBeFalsy()
  })

  it('has text "Exit Selection" when NOT in view mode', () => {
    const { queryByText } = render(
      <ChangeModeButton inViewMode={false} />
    )

    expect(queryByText(/Make Selection/i)).toBeFalsy()
    expect(queryByText(/Exit Selection/i)).toBeTruthy()
  })

  it('is in view mode by default with no prop', () => {
    const { queryByText } = render(
      <ChangeModeButton />
    )

    expect(queryByText(/Make Selection/i)).toBeTruthy()
    expect(queryByText(/Exit Selection/i)).toBeFalsy()
  })

  it('calls onClick handler with boolean indicating mode', async () => {
    const spy = jest.fn()
    const { queryByText, getByText } = render(
      <ChangeModeButton onClick={spy} />
    )

    expect(queryByText(/Make Selection/i)).toBeTruthy()
    fireEvent.click(getByText(/Make Selection/i))

    await wait(() => {
      expect(spy).toHaveBeenCalledWith(true)
      fireEvent.click(getByText(/Make Selection/i))
      expect(spy).toHaveBeenCalledTimes(2)
    })
  })
})
