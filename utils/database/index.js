const jsonfile = require('jsonfile')
const fs = require('fs')

class Database {
  constructor(path, defaults) {
    this.path = path;
    this.defaults = defaults;
    this.data = null;
  }

  load() {
    if (!fs.existsSync(this.path)) {
      jsonfile.writeFileSync(this.path, this.defaults)
    }

    let data = jsonfile.readFileSync(this.path);
    this.data = Object.assign({}, this.defaults, data);
  }

  save() {
    jsonfile.writeFileSync(this.path, this.data)
  }

  self(opts) {
    return this.data[opts.commandName];
  }

}

module.exports = Database
