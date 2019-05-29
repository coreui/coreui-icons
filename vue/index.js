import Icons from '../js'
import CIcon from './CIcon'

export { CIcon }

const CIconPlugin = {
  install (Vue) {
    CIcon.icons = Icons
    Vue.component('CIcon', CIcon)
  }
}
export { CIconPlugin }
