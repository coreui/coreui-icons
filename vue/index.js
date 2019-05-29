import Icons from '../js/iconsGenerated.js'
import CIcon from './CIcon'

export { CIcon }

const CIconPlugin = {
  install (Vue) {
    CIcon.icons = Icons
    Vue.component('CIcon', CIcon)
  }
}
export { CIconPlugin }
