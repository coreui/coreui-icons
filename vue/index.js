import CIcon from './CIcon'
export { CIcon }

const CIconPlugin = {
  install (Vue, customIconSet) {
    CIcon.icons = customIconSet
    Vue.component('CIcon', CIcon)
  }
}
export { CIconPlugin }
