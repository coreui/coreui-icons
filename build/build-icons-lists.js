const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const walkSync = require('./walk-sync.js')

const dataDir = path.join(__dirname, '../data')
const rawDir = path.join(__dirname, '../raw')

const prefixes = {
  brand:   'cib-',
  duotone: 'cid-',
  flag:    'cif-',
  free:    'cil-',
  linear:  'cil-',
  solid:   'cis-'
} 

const main = () => {
  const types = fs.readdirSync(rawDir).filter(element => fs.statSync(path.join(rawDir, element)).isDirectory())
  const allIconsList = {
    icons: []
  }

  types.forEach(type => {
    const icons = walkSync(path.join(rawDir, type)).filter(element => path.extname(element) === '.svg').map(element => path.relative(path.join(rawDir, type), element).replace('SVG/', ''))
    const iconsList = {
      icons: []
    }
    icons.forEach(icon => {
      const category = icon.split('/').length > 1 ? icon.split('/')[0] : type
      const filename = icon.split('/').length > 1 ? icon.split('/')[1] : icon.split('/')[0]
      const prefix = prefixes[type.toLowerCase()]

      if (filename.indexOf(',') !== -1) {
        throw `${type} - ${category} - ${filename}`
      }

      if (filename.indexOf('#') !== -1) {
        filename.split('#').forEach(element => {
          let iconDetails = {
            name: element.replace('.svg', ''),
            category,
            type,
            prefix
          }
          iconsList.icons.push(iconDetails)
          allIconsList.icons.push(iconDetails)
        })
      } else {
        let iconDetails = {
          name: filename.replace('.svg', ''),
          category,
          type,
          prefix
        }
        iconsList.icons.push(iconDetails)
        allIconsList.icons.push(iconDetails)
      }
    })

    let data = JSON.stringify(iconsList, null, 2)

    mkdirp(dataDir, (err) => {
      if (err) {
        return
      }

      fs.writeFileSync(path.join(dataDir, `${type}.json`), data)
    })
  })
  
  let data = JSON.stringify(allIconsList, null, 2)
  fs.writeFileSync(path.join(dataDir, 'All.json'), data)
}

main()