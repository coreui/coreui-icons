const sharp = require('sharp')
const fs = require('fs')
const mkdirp = require('mkdirp');
const dirnames = process.mainModule.filename.includes('pro') ?
    ['solid', 'linear', 'duotone', 'brand', 'flag']
  : ['free', 'brand', 'flag']
const dest = 'png/'
let sizes

const argv = require('minimist')(process.argv.slice(2), {
  array: ['sizes']
})

argv.sizes ? sizes = argv.sizes : sizes = [16, 32, 64]

dirnames.forEach(setName => {
  const dirname = `svg/${setName}/`
  const svgs = fs.readdirSync(dirname)

  sizes.forEach(size => {
    mkdirp(`${dest}${setName}/${size}x${size}/`).then(() => {
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