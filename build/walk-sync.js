'use strict'

const fs = require('fs')
const path = require('path')

// Get list of all files in directory
const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory() ? walkSync(path.join(dir, file), filelist) : filelist.concat(path.join(dir, file))
  })
  return filelist
}

module.exports = walkSync