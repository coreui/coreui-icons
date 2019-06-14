let fs = require('fs')
let dirname = '1x1/'
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
        const name = filename.replace('.svg', 'q.svg')
        fs.writeFile(
          `1x1/${name}`,
          content,
          () => ''
        )
      }
    })
  })
})
