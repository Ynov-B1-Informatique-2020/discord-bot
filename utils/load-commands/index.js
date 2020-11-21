const fs = require('fs');
const { request } = require('http');
const path = require('path');

module.exports = () => {
  let dirname = path.join(__dirname, '../../commands');
  let defaultCommandObject = {
    description: 'No description provided',
    usage: null,
    aliases: [],
    init(opts) {},
    execute(opts) {},
  };
  let commands = [];

  fs.readdirSync(dirname, { withFileTypes: true }).forEach(item => {
    if(item.isFile() && item.name == 'index.js') return;
    if(item.isFile() && path.extname(item.name)!='.js') return;

    let name, required, commandObject;

    if(item.isFile()) {
      name = path.basename(item.name, '.js').toLowerCase();
    }else if(item.isDirectory()) {
      name = item.name.toLowerCase();
    }

    required = require(path.join(dirname, item.name));

    commandObject = Object.assign({}, defaultCommandObject);
    commandObject.name = name;

    if (typeof required === 'function') {
      Object.assign(commandObject, {
        execute: required
      });
    } else if (typeof required === 'object') {
      Object.assign(commandObject, required);
    }

    commands.push(commandObject)
  });

  console.log(`${commands.length} commands found`)

  return commands;
}