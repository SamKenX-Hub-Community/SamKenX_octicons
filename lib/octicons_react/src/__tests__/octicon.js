import '@testing-library/jest-dom'
import {render} from '@testing-library/react'
import React from 'react'
import Octicon, {AlertIcon} from '../index'

describe('Octicon component', () => {
  let mock

  beforeEach(() => {
    mock = jest.spyOn(console, 'warn').mockImplementation(() => jest.fn())
  })

  afterEach(() => {
    expect(mock).toHaveBeenCalledWith(
      expect.stringContaining(
        `<Octicon> is deprecated. Use icon components on their own instead (e.g. <Octicon icon={AlertIcon} /> → <AlertIcon />)`
      )
    )
    mock.mockRestore()
  })

  it('throws an error without a single child or icon prop', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => jest.fn())
    expect(() => render(<Octicon />)).toThrow()
    expect(() => render(<Octicon icon={null} />)).toThrow()
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining('React.Children.only expected to receive a single React element child')
      })
    )

    spy.mockRestore()
  })

  it('passes props to icon prop', () => {
    const {container} = render(
      <Octicon aria-label="icon" className="foo" size={20} verticalAlign="middle" icon={AlertIcon} />
    )
    expect(container.querySelector('svg')).toHaveAttribute('aria-label', 'icon')
    expect(container.querySelector('svg')).toHaveAttribute('class', 'foo')
    expect(container.querySelector('svg')).toHaveAttribute('width', '20')
    expect(container.querySelector('svg')).toHaveAttribute('height', '20')
    expect(container.querySelector('svg')).toHaveStyle({verticalAlign: 'middle'})
  })

  it('passes props to icon as child', () => {
    const {container} = render(
      <Octicon aria-label="icon" className="foo" size={20} verticalAlign="middle">
        <AlertIcon />
      </Octicon>
    )
    expect(container.querySelector('svg')).toHaveAttribute('aria-label', 'icon')
    expect(container.querySelector('svg')).toHaveAttribute('class', 'foo')
    expect(container.querySelector('svg')).toHaveAttribute('width', '20')
    expect(container.querySelector('svg')).toHaveAttribute('height', '20')
    expect(container.querySelector('svg')).toHaveStyle({verticalAlign: 'middle'})
  })
})

describe('An icon component', () => {
  it('matches snapshot', () => {
    const {container} = render(<AlertIcon />)
    expect(container.querySelector('svg')).toMatchSnapshot()
  })

  it('sets aria-hidden="false" if ariaLabel prop is present', () => {
    const {container} = render(<AlertIcon aria-label="icon" />)
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'false')
    expect(container.querySelector('svg')).toHaveAttribute('aria-label', 'icon')
  })

  it('set the focusable prop to false if tabIndex prop is not present', () => {
    const {container} = render(<AlertIcon />)
    expect(container.querySelector('svg')).toHaveAttribute('focusable', 'false')
  })

  it('sets focusable prop to true if tabIndex prop is present and greater than 0', () => {
    const {container} = render(<AlertIcon aria-label="icon" tabIndex={0} />)
    expect(container.querySelector('svg')).toHaveAttribute('tabindex', '0')
    expect(container.querySelector('svg')).toHaveAttribute('focusable', 'true')
  })

  it('sets focusable prop to false if tabIndex prop is -1', () => {
    const {container} = render(<AlertIcon aria-label="icon" tabIndex={-1} />)
    expect(container.querySelector('svg')).toHaveAttribute('tabindex', '-1')
    expect(container.querySelector('svg')).toHaveAttribute('focusable', 'false')
  })

  it('respects the className prop', () => {
    const {container} = render(<AlertIcon className="foo" />)
    expect(container.querySelector('svg')).toHaveAttribute('class', 'foo')
  })

  it('respects the fill prop', () => {
    const {container} = render(<AlertIcon fill="#f00" />)
    expect(container.querySelector('svg')).toHaveAttribute('fill', '#f00')
  })

  it('respects the verticalAlign prop', () => {
    const {container} = render(<AlertIcon verticalAlign="middle" />)
    expect(container.querySelector('svg')).toHaveStyle({verticalAlign: 'middle'})
  })

  describe('size props', () => {
    it('respects size="small"', () => {
      const {container} = render(<AlertIcon size="small" />)
      expect(container.querySelector('svg')).toHaveAttribute('width', '16')
      expect(container.querySelector('svg')).toHaveAttribute('height', '16')
    })

    it('respects size="medium"', () => {
      const {container} = render(<AlertIcon size="medium" />)
      expect(container.querySelector('svg')).toHaveAttribute('width', '32')
      expect(container.querySelector('svg')).toHaveAttribute('height', '32')
    })

    it('respects size="large"', () => {
      const {container} = render(<AlertIcon size="large" />)
      expect(container.querySelector('svg')).toHaveAttribute('width', '64')
      expect(container.querySelector('svg')).toHaveAttribute('height', '64')
    })

    it('respects size={number}', () => {
      const {container} = render(<AlertIcon size={128} />)
      expect(container.querySelector('svg')).toHaveAttribute('width', '128')
      expect(container.querySelector('svg')).toHaveAttribute('height', '128')
    })

    it('chooses the correct SVG given a size <24', () => {
      const {container} = render(<AlertIcon size={20} />)
      expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 16 16')
      expect(container.querySelector('svg')).toHaveAttribute('width', '20')
      expect(container.querySelector('svg')).toHaveAttribute('height', '20')
    })

    it('chooses the correct SVG given a size >=24', () => {
      const {container} = render(<AlertIcon size={24} />)
      expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 24 24')
      expect(container.querySelector('svg')).toHaveAttribute('width', '24')
      expect(container.querySelector('svg')).toHaveAttribute('height', '24')
    })
  })
})
