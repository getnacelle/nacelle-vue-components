const fs = require("fs-extra");
fs.emptyDirSync("dist");
fs.emptyDirSync("dist/components");
require("./update-index-file");
require("./copy-components");
console.info("🚀  Nacelle component library built!");
