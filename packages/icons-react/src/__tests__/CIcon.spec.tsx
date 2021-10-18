import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CIcon from './../'

// import { cifAu } from './../../../icons/js/flag/cif-au'

describe('CIcon', () => {

  it('renders svg with class="icon"', () => {
    const { container } = render(<CIcon />)
    expect(container.firstChild).toHaveClass('icon')
  })

  // it('renders svg with icon', () => {
  //   const { container } = render(<CIcon icon={cifAu} />)
  //   expect(container.firstChild).toContain(cifAu[1])
  // //   expect(render()).toContain(cifAu)
  // })

  it('renders svg with size', () => {
    const { container } = render(<CIcon size="xl"/>)
    expect(container.firstChild).toHaveClass('icon-xl')
  })

  it('renders svg with custom size', () => {
    const { container } = render(<CIcon height={20} />)
    expect(container.firstChild).toHaveClass('icon-custom-size')
  })

  it('renders svg with className', () => {
    const { container } = render(<CIcon className="icon-test" />)
    expect(container.firstChild).toHaveClass('icon-test')
  })

  // it('renders <svg> with <use>', () => {
  //   const { container } = render(<CIcon use="xxx" />)
  //   expect(container.firstChild?.firstChild).toContain('<use href="xxx" />')
  // })
})
