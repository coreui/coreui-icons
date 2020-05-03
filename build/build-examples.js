const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const rimraf = require('rimraf')
const walkSync = require('./walk-sync.js')

const dataDir = path.join(__dirname, '../data')
const examplesDir = path.join(__dirname, '../examples')

const prefixes = {
  brand:   'cib-',
  duotone: 'cid-',
  flag:    'cif-',
  free:    'cil-',
  linear:  'cil-',
  solid:   'cis-'
} 

const unique = (array, key) => array.map(e => e[key]).map((e, i, final) => final.indexOf(e) === i && i).filter(e => array[e]).map(e => array[e])

const main = () => {
  rimraf.sync(examplesDir)
  mkdirp(examplesDir, (err) => {
    if (err) {
      return
    }
    const files = walkSync(dataDir).filter(element => path.extname(element) === '.json')
    files.forEach(file => {
      const rawdata = fs.readFileSync(file)
      const icons = JSON.parse(rawdata).icons.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      
      const type = path.basename(file).replace('.json', '')
      const prefix = prefixes[type.toLowerCase()]
      
      let html = `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n`
      html += `  <title>CoreUI Icons - ${type}</title>\n`
      html += `  <link rel="stylesheet" type="text/css" href="https://unpkg.com/@coreui/coreui@3.0.0/dist/css/coreui.min.css">\n`
      html += `  <link rel="stylesheet" type="text/css" href="../css/${type.toLowerCase()}.min.css">\n`
      html += `</head>\n<body>\n`

      html += `  <div class="row">\n`
      unique(icons, 'name').forEach(icon => {
        const name = icon.name
        html += `    <div class="col-1 py-4 text-center"><i class="c-icon c-icon-2xl ${prefix}${name.toLowerCase()}"></i></div>\n`
      })
      html += `  </div>\n<hr>\n`
      html += `  <div class="row">\n`
      unique(icons, 'name').forEach(icon => {
        const name = icon.name
        html += `    <div class="col-1 py-4 text-center"><svg class="c-icon c-icon-2xl"><use xlink:href="../sprites/${type.toLowerCase()}.svg#${prefix}${name.toLowerCase()}"></use></svg></div>\n`
      })
      html += `  </div>\n<hr>\n`
      html += `  <div class="row">\n`
      unique(icons, 'name').forEach(icon => {
        const name = icon.name
        html += `    <div class="col-1 py-4 text-center"><object class="c-icon c-icon-2xl" type="image/svg+xml" data="../svg/${type.toLowerCase()}/${prefix}${name.toLowerCase()}.svg">Your browser does not support SVGs</object></div>\n`
      })
      html += `  </div>\n`
      html += `</body>\n</html>`
      
      fs.writeFileSync(path.join(examplesDir, path.basename(file).replace('.json', '.html')), html)
    })
  })
}

main()
