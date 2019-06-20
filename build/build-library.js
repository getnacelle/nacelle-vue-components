const fs = require('fs-extra')
const { execSync } = require('child_process')

fs.emptyDirSync('dist')
fs.emptyDirSync('dist/components')
require('./update-index-file')
require('./copy-components')

fs.copy('src/store', 'dist/store')

console.info('🏗 Building main library')
execSync(
  `vue-cli-service build src/components/index.js --target lib --name index --dest dist/cjs`
)

console.info('🚀  Nacelle component library built!')
;('')
