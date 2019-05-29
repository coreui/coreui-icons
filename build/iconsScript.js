let fs = require('fs')
let dirname = 'svg/'
fs.readdir(dirname, function(e, filenames) {
  if (e) {
    return
  }
  let contents = {}
  filenames.forEach(function(filename) {
    fs.readFile(dirname + filename, 'utf-8', function(e, content) {
      if (e) {
        return
      } else {
        let name = filename.replace('.svg', '')
        let computedContent = content.replace(/(<svg([^>]+)>)|(<\/svg>)/ig, '')
                                     .replace(/\n/g, '')
                                     .split('</title>').pop()

        contents[name] = computedContent

        fs.writeFile(
          `js/${name}.js`,
          `export const ${toPascalCase(name)} = ` + JSON.stringify(computedContent),
          () => ''
        )
      }
    })
  })
  setTimeout(() => {
    fs.writeFile(
      'js/iconsGenerated.js',
      'export const Icons = ' + JSON.stringify(contents),
      () => ''
    )
    fs.writeFile(
      'js/index.js',
      getImports(Object.keys(contents)),
      () => ''
    )
  }, 1000)

})

const toPascalCase = function (name) {
  return name.match(/[A-Za-z0-9]+/gi)
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
    })
    .join('')
}

function getImports(filenames) {
  const defaultImport = "import { Icons } from './iconsGenerated.js' \n"
  const defaultExport = "export default Icons \n\n\n"
  const importString = filenames.map(name => {
    let computedName = toPascalCase(name)
    return `import { ${computedName} } from './${name}.js'`
  }).join('\n')
  const exportString = filenames.map(name => {
    let computedName = toPascalCase(name)
    return `export { ${computedName} }`
  }).join('\n')
  return defaultImport + defaultExport + importString + '\n' + exportString
}
