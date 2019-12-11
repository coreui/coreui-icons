const fs = require('fs')
const dirnames = process.mainModule.filename.includes('pro') ? 
  ['solid', 'linear'] :
  ['flag', 'brand', 'free']

const prefixes = {
  brand: 'cib-',
  flag: 'cif-',
  free: 'cil-',
  linear: 'cil-',
  solid: 'cis-'
}
console.log(dirnames)
dirnames.forEach(name => {
  const dirname = `svg/${name}/`
  fs.readdir(dirname, (e, filenames) => {
    if (e) {
      return
    }
    filenames.forEach(filename => {
      fs.readFile(dirname + filename, 'utf-8', function (e, content) {
        if (e) {
          return
        }
        
        fs.writeFile(
          `svg/${name}/${prefixes[name]}${filename.toLowerCase()}`,
          content,
          () => fs.unlink(`svg/${name}/${filename}`, () => '')
        )
      })
    })
  })
})

