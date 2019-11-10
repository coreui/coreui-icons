const sharp = require('sharp')
const fs = require('fs')
const mkdirp = require('mkdirp');
const dirnames = process.mainModule.filename.includes('pro') ?
    ['solid', 'linear']
  : ['free', 'brand', 'flag']
const dest = 'png/'
const sizes = [16, 32, 64, 128, 256]


dirnames.forEach(setName => {
  const dirname = `svg/${setName}/`
  const svgs = fs.readdirSync(dirname)

  sizes.forEach(size => {
    mkdirp(`${dest}${setName}/${size}x${size}/`, function(err) {
      if (err) {
        return
      } 
  
      svgs.forEach((svg) => {
        const file = dirname + svg
        sharp(file, { density: 72 * size / 16 })
        .png()
        .resize(size, size, {fit: 'inside'})
        .toFile(`${dest}${setName}/${size}x${size}/${svg.replace('svg', 'png')}`)
        .then(function(info) {
          console.log(info)
        })
        .catch(function(err) {
          console.log(err)
        })
      })
    })
  })
})