const fs = require('fs')

module.exports = {
    fileLinesToArray: path => fs.readFileSync(path, 'utf8').split('\n')
}