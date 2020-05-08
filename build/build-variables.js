const fs = require('fs')
const path = require('path')

const argv = require('minimist')(process.argv.slice(2), {
  string: ['type', 'prefix'],
  boolean: ['font']
})

const dataDir = path.join(__dirname, '../data')
const scssDir = path.join(__dirname, '../scss', argv.type.toLowerCase())

const json = path.join(dataDir, `${argv.type}.json`)

const unique = (array, key) => array.map(e => e[key]).map((e, i, final) => final.indexOf(e) === i && i).filter(e => array[e]).map(e => array[e])

const main = () => {
  const rawdata = fs.readFileSync(json)
  const icons = JSON.parse(rawdata).sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
  let content = `$coreui-icons-prefix: "${argv.prefix}-" !default;\n`

  if (argv.font) {
    content += `$coreui-icons-font-path: "../fonts" !default;\n`
  }

  content += `\n$icons: (\n`
  
  unique(icons, 'name').forEach(icon => {
    const name = icon.name
    const unicode = icon.unicode

    if (unicode) {
      content += `  "${name}": ${unicode},\n`
    } else {
      content += `  "${name}",\n`
    }
  })

  content += ') !default;'

  fs.writeFile(path.join(scssDir, '_variables.scss'), content, (err) => {
    if (err) throw err
    console.log('The _variables.scss file has been saved!')
  })
}

main()