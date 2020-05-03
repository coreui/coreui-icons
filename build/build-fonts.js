const fs = require('fs')
const mkdirp = require('mkdirp');
const path = require('path')
const webfont = require('webfont').default

const argv = require('minimist')(process.argv.slice(2), {
  string: ['src', 'name', 'prefix']
})

const dataDir = path.join(__dirname, '../data')
const fontDir = path.join(__dirname, '../fonts')
const svgDir = path.join(__dirname, '../svg', argv.src.toLowerCase())

webfont({
  files: `${svgDir}/**/*.svg`,
  fontName: argv.name,
  fontHeight: 5000,
  startUnicode: 'ec0f',
  verbose: true,
}).then(result => {

  mkdirp(fontDir, (err) => {
    if (err) throw err

    fs.writeFile(`${path.join(fontDir, argv.name)}.eot`, result.eot, (err) => {
      if (err) throw err
      console.log(`The ${path.join(fontDir, argv.name)}.eot file has been saved!`)
    })
  
    fs.writeFile(`${path.join(fontDir, argv.name)}.svg`, result.svg, (err) => {
      if (err) throw err
      console.log(`The ${path.join(fontDir, argv.name)}.eot file has been saved!`)
    })
  
    fs.writeFile(`${path.join(fontDir, argv.name)}.ttf`, result.ttf, (err) => {
      if (err) throw err
      console.log(`The ${path.join(fontDir, argv.name)}.eot file has been saved!`)
    })
  
    fs.writeFile(`${path.join(fontDir, argv.name)}.woff`, result.woff, (err) => {
      if (err) throw err
      console.log(`The ${path.join(fontDir, argv.name)}.eot file has been saved!`)
    })
  
    fs.writeFile(`${path.join(fontDir, argv.name)}.woff2`, result.woff2, (err) => {
      if (err) throw err
      console.log(`The ${path.join(fontDir, argv.name)}.eot file has been saved!`)
    })
  })
  

  const iconsList = []

  result.glyphsData.forEach(element => {
    const name = element.metadata.name
    const unicode = element.metadata.unicode

    iconsList.push({
      name: name.replace(`${argv.prefix}-`,''),
      unicode: `\\${unicode[0].codePointAt(0).toString(16)}`
    })
  })

  // Add unicodes to icons lists
  fs.readFile(`${dataDir}/${argv.name.replace('CoreUI-Icons-', '')}.json`, 'utf8', function readFileCallback(err, data){
    if (err) throw err
    obj = JSON.parse(data)

    const mergeByName = (a1, a2) =>
    a1.map(itm => ({
        ...a2.find((item) => (item.name === itm.name) && item),
        ...itm
    }))

    json = JSON.stringify({
      "icons": mergeByName(obj.icons, iconsList)
    }, null, 2)

    fs.writeFileSync(`${dataDir}/${argv.name.replace('CoreUI-Icons-', '')}.json`, json)
  })
})
.catch(error => {
  throw error
})


// formats: [ 'svg', 'ttf', 'eot', 'woff', 'woff2' ]
// Bufer ttf, eot, woff