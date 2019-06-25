const fs = require('fs-extra')
const { execSync } = require('child_process')

fs.emptyDirSync('dist')
fs.emptyDirSync('dist/components')
require('./update-index-file')
require('./copy-components')

fs.copy('src/store', 'dist/store')
fs.copy('src/base-styles.css', 'dist/base-styles.css')

console.info('🏗 Building main library')
execSync(
  `vue-cli-service build dist/index.js --target lib --name index --dest dist/cjs`
)

execSync(
  `vue-cli-service build src/store/test.js --target lib --name index --dest dist/cjs-store`
)

console.info('🚀  Nacelle component library built!')
;('')
