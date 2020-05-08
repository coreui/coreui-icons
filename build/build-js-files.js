const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const { extname } = path

const dirnames = process.mainModule.filename.includes('pro') ?
    ['solid', 'linear', 'duotone', 'brand', 'flag']
  : ['free', 'brand', 'flag']

let allNames = {}
dirnames.forEach(setName => {
  mkdirp(`js/${setName}/`).then(() => {
    const dirname = `svg/${setName}/`
    let contents = {}
    let names = []
    fs.readdirSync(dirname).forEach(filename => {
      console.log(filename)
      if (extname(filename) === '.svg') {
        const content = fs.readFileSync(dirname + filename, {encoding:'utf8'})
        const variableName = toCamel(filename.replace('.svg', ''))
        const jsFilename = filename.replace('.svg', '.js')
        const tsFilename = filename.replace('.svg', '.d.ts')
        const viewBox = getAttributeValue(content, 'viewBox').split(' ')
        const dimensions = `${viewBox[2]} ${viewBox[3]}`

        let iconData = []
        if (dimensions !== '64 64') {
          iconData.push(dimensions)
        }
        const computedContent = 
          content
            .replace(/(<svg([^>]+)>)|(<\/svg>)/ig, '')
            .replace(/\n\s\s+/g, '')
            .replace(/\n/g, '')
            .replace(/"/g, '\'')
        iconData.push(computedContent)

        contents[variableName] = iconData

        importName = validate(variableName)

        names.push({
          jsFilename,
          variableName,
          importName
        })

        // Create single icon
        fs.writeFileSync(
          `js/${setName}/${jsFilename}`,
          `export const ${importName} = ` + JSON.stringify(iconData)
        )

        // Create typings for single icon
        fs.writeFileSync(
          `js/${setName}/${tsFilename}`,
          `export declare const ${importName}: any[];`
        )
      }
    })

    fs.writeFileSync(`js/${setName}/${setName}-set.js`, `export const ${setName}Set = ` + JSON.stringify(contents))
    fs.writeFileSync(`js/${setName}/${setName}-set.d.ts`, typings(names, setName, false))
    fs.writeFileSync(`js/${setName}/index.js`, getImports(names, setName))
    fs.writeFileSync(`js/${setName}/index.d.ts`, typings(names, setName))

    allNames[setName] = names
  })
})

let imports = ''
Object.keys(allNames).forEach(set => {
  imports += getImports(allNames[set], set, true)
  imports += '\n\n\n'
})
fs.writeFileSync(`index.js`, imports)

const getAttributeValue = (string, attribute) => {
  const regex = new RegExp(`${attribute}="([^"]+)"`, 'g')
  return string.match(regex, '')[0]
               .match(/"(.*?)"/ig, '')[0]
               .replace(/"/g, '')
}

const toCamel = (str) => {
  return str.replace(/([-_][a-z0-9])/ig, ($1) => {
    return $1.toUpperCase().replace('-', '')
  })
}

const validate = (str) => {
  if (!isNaN(str.charAt(0))) {
    return 'n' + str
  } else {
    return str
  }
}

const getImports = (names, setName, deep = false) => {
  const folder = deep ? `/js/${setName}/` : '/'
  const defaultImport = `import { ${setName}Set } from '.${folder}${setName}-set.js' \n`
  const defaultExport = `export { ${setName}Set } \n\n`
  const importString = names.map(name => {
    return `import { ${name.importName} } from '.${folder}${name.jsFilename}'`
  }).join('\n')
  const exportString = names.map(name => {
    return `export { ${name.importName} }`
  }).join('\n')
  return defaultImport + defaultExport + importString + '\n' + exportString
}

const typings = (names, setName, all = true) => {
  const icons = names.map(name => {
    return `  "${name.importName}": any[];`
  }).join('\n')
  const set = `export declare const ${setName}Set: {\n${icons}\n}`

  const exportString = names.map(name => {
    return `export declare const ${name.importName}: any[];`
  }).join('\n')
  
  return all ? set + '\n' + exportString : set
}
