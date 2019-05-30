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
        // let pascalName = toPascalCase(name)
        let camelName = toCamel(name)
        let computedContent = content.replace(/(<svg([^>]+)>)|(<\/svg>)/ig, '')
                                     .replace(/\n/g, '')
                                     .split('</title>').pop()

        contents[camelName] = computedContent

        fs.writeFile(
          `js/${camelName}.js`,
          `export const ${camelName} = ` + JSON.stringify(computedContent),
          () => ''
        )
      }
    })
  })
  setTimeout(() => {
    fs.writeFile(
      'js/iconsGenerated.js',
      'export const icons = ' + JSON.stringify(contents),
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

const toCamel = (str) => {
  return str.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase().replace('-', '')
  })
}

function getImports(filenames) {
  const defaultImport = "import { icons } from './iconsGenerated.js' \n"
  const defaultExport = "export default icons \n\n\n"
  const importString = filenames.map(name => {
    return `import { ${name} } from './${name}.js'`
  }).join('\n')
  const exportString = filenames.map(name => {
    return `export { ${name} }`
  }).join('\n')
  return defaultImport + defaultExport + importString + '\n' + exportString
}
