/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {AppContext} from '../Provider/StateProvider'
import RadioButton from '.'

/**
 * A custom render to setup providers. Extends regular
 * render options with `providerProps` to allow injecting
 * different scenarios to test with.
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 */
 const customRender = (ui, {providerProps, ...renderOptions}) => render(
      <AppContext.Provider {...providerProps}>
        {ui}
        </AppContext.Provider>,
      renderOptions,
    )
  
  test('RadioButton active', () => {
    const providerProps = {
      value: 'asd',
    }

    customRender(<RadioButton  
        value="Siguiente"
        status="active"
    className="is-light is-link" />, {providerProps})
   
    expect(screen.getByText(/^Siguiente/)).toHaveTextContent('Siguiente')
  })

  test('RadioButton has a callback', () => {
    const providerProps = {
      value: 'asd',
    }

    customRender(<RadioButton  
        value="Siguiente"
        status="active"
    className="is-light is-link" />, {providerProps})
   
    expect(screen.getByText('Siguiente'))
  })