import Icons from '../js/iconsGenerated.js'
import CIcon from './CIcon'

export { CIcon }

const VueCIconPlugin = {
  install (Vue) {
    CIcon.icons = Icons
    Vue.component('CIcon', CIcon)
  }
}
export { VueCIconPlugin }
