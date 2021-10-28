import { mount } from '@vue/test-utils'
import { CIcon } from './../'

describe('CIcon', () => {
  it('renders svg with class="icon"', () => {
    const container = mount(CIcon)
    expect(container.find('svg').classes('icon')).toBe(true)
  })

  // it('renders svg with icon', () => {
  //   const { container } = mount(<CIcon icon={cifAu} />)
  //   expect(container.firstChild).toContain(cifAu[1])
  // //   expect(render()).toContain(cifAu)
  // })

  it('renders svg with size', () => {
    const container = mount(CIcon, { props: { size: 'xl' } })
    expect(container.find('svg').classes('icon-xl')).toBe(true)
  })

  it('renders svg with custom size', () => {
    const container = mount(CIcon, { props: { height: 20 } })
    expect(container.find('svg').classes('icon-custom-size')).toBe(true)
  })

  it('renders svg with className', () => {
    const container = mount(CIcon, { props: { class: 'icon-test' } })
    expect(container.find('svg').classes('icon-test')).toBe(true)
  })

  // it('renders <svg> with <use>', () => {
  //   const { container } = mount(<CIcon use="xxx" />)
  //   expect(container.firstChild?.firstChild).toContain('<use href="xxx" />')
  // })
})
