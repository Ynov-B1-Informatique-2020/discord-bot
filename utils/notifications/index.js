const path = require('path');
const fs = require('fs-extra');
const { type } = require('os');
const notificationsFolder = path.join(__dirname, '../../.notifications');

module.exports = {
  displayAll: ()=>{
    let read = module.exports.loadRead();

    fs.readdirSync(notificationsFolder, { withFileTypes: true }).forEach(item => {
      if(!item.isFile()) return;
      if(path.extname(item.name)!='.txt') return;
  
      let name = path.basename(item.name, '.txt').toLowerCase();

      if(!read.includes(name)) {
        module.exports.display(name);
        if (!name.startsWith('p')) read.push(name);
      }
    });

    module.exports.saveRead(read);
  },
  display: (id)=>{
    let content = fs.readFileSync(path.join(notificationsFolder, id+'.txt'), "utf8");
    console.log(content);
  },
  maskAsRead: (id)=>{
    let read = module.exports.loadRead();
    read.push(id);
    module.exports.saveRead(read)
  },
  saveRead: (read)=>{
    fs.outputJSONSync(path.join(notificationsFolder, 'read.json'), read);
  },
  loadRead: ()=>{
    fs.ensureFileSync(path.join(notificationsFolder, 'read.json'));
    try {
      let read = fs.readJsonSync(path.join(notificationsFolder, 'read.json'));
      if (Array.isArray(read)) return read;
    } catch (error) {
      return [];
    }
  }
}