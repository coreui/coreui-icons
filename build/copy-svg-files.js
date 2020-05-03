const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const rimraf = require('rimraf')
const { basename } = path
const walkSync = require('./walk-sync.js')

const argv = require('minimist')(process.argv.slice(2), {
  string: ['src', 'prefix']
})

const rawDir = path.join(__dirname, '../raw', argv.src)
const svgDir = path.join(__dirname, '../svg', argv.src.toLowerCase())
 
const main = () => {
  rimraf.sync(svgDir)
  mkdirp(svgDir, (err) => {
    if (err) {
      return
    }

    const files = walkSync(rawDir).filter(element => path.extname(element) === '.svg')
    files.forEach(file => {
      if (basename(file).indexOf('#') !== -1) {
        const arrayOfFiles = basename(file).replace('.svg', '').split('#')
        arrayOfFiles.forEach(singleFile => {
          fs.copyFile(file, path.join(svgDir, `${argv.prefix}-${singleFile}.svg`), (err) => {
            if (err) throw err
            console.log(`${basename(file)} was copied ${svgDir}`)
          })
        })
      } else {
        fs.copyFile(file, path.join(svgDir, `${argv.prefix}-${basename(file)}`), (err) => {
          if (err) throw err
          console.log(`${basename(file)} was copied ${svgDir}`)
        })
      }
    })
  })
} 

main()