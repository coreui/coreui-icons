'use strict'

module.exports = context => {
  return {
    plugins: {
      autoprefixer: {
        cascade: false
      }
    }
  }
}