const fs = require('fs')

const file = fs.createReadStream('./temp/my-uploads/myrecord-1581770919891')
const flacFile = fs.createReadStream('./audio/audio-file.flac')
const readFile = fs.readFileSync('./temp/my-uploads/myrecord-1581770919891')
const flacReadFile = fs.readFileSync('./audio/audio-file.flac')
const txtFile = fs.createReadStream('./readme.txt')
console.log('file:', file)
console.log('flacFile:', flacFile)
console.log('txtFile:', txtFile)
console.log(Buffer.isBuffer(file))
console.log(Buffer.isBuffer(readFile))
console.log(Buffer.isBuffer(flacFile))
console.log(Buffer.isBuffer(flacReadFile))