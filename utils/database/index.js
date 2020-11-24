const fs = require('fs-extra')

class Database {
  constructor(path, defaults) {
    this.path = path;
    this.defaults = defaults;
    this.data = null;
  }

  load() {
    if (!fs.existsSync(this.path)) {
      fs.outputJsonSync(this.path, this.defaults)
    }

    let data = fs.readJsonSync(this.path);
    this.data = Object.assign({}, this.defaults, data);
    return this;
  }

  save() {
    fs.outputJsonSync(this.path, this.data)
    return this;
  }

  self(opts) {
    return this.data[opts.commandName];
  }

}

module.exports = Database
