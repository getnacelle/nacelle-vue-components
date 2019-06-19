const fs = require('fs')
const path = require('path')
const componentNames = require('./component-names')

componentNames.map(componentName => {
  fs.copyFileSync(
    path.resolve(__dirname, `../src/components/${componentName}.vue`),
    path.resolve(__dirname, `../dist/components/${componentName}.vue`),
    err => {
      if (err) throw err
    }
  )
})
