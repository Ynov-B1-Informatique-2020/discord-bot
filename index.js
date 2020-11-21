const path = require('path');

// require the config.json file
const Config = require('./config.json');

// require the utils folder
const Utils = require('./utils');

// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

// Load commands
const commands = Utils.loadCommands();

// Load database
let databaseDefaults = {};
commands.forEach((i)=>{
  databaseDefaults[i.name] = {
    cache: {},
    data: {}
  }
});

const db = new Utils.database(path.join(__dirname, 'storage/main.json'), databaseDefaults);
db.load();




// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', (event) => {
  console.log('Discord ready!');
  const commandInits = commands.map(x => x.init({
    Discord,
    Config,
    db,
    event,
    client,
    commands,
    commandName: x.name
  }));
});

// this event will trigger each time a message is sent
client.on('messageUpdate', (oldMessage, newMessage)=>{
  newMessage.oldMessage = oldMessage;
  messageHandler(newMessage);
});
client.on('message', messageHandler);

function messageHandler(event) {
  
  if (event.content == '!pingallbot') {
    event.channel.send(`**${Config.prefix}**: I'm up, ${commands.length} commands loaded`);
  }
  // Check if the message start with our prefix and the author is not the bot
  if (!event.content.startsWith(Config.prefix)) return;
  if (event.author.bot) return;

  console.log("-------------");
  console.log("Command :\t", event.content);

  // Slit the message on each whitespace
  let splitedMessage = event.content.substring(Config.prefix.length).split(' ');

  // Save the first element of the array as commandName
  // Transform the string to lower case: EcHO -> echo
  let commandName = splitedMessage[0].toLowerCase();

  // Save all the element after the first one as args
  let argsRaw = splitedMessage.splice(1);
  let args = Utils.argsParser(argsRaw);

  // Find the command by its name or aliases
  let commandObject = commands.find((i) => {
    return i.name == commandName || i.aliases.includes(commandName)
  });


  if(typeof commandObject === 'undefined') {
    event.channel.send('Raté cette commande n\'existe pas camarade.');
  } else {

    let opts = {
      commandName,
      Discord,
      Config,
      db,
      event,
      args,
      argsRaw,
      client,
      commands,
    }
    commandObject.execute(opts);
  }
  console.log("\n\n");
};

// login to Discord with your app's token
client.login(Config.token)

process.on('SIGUSR2', code => {
  console.log(`Saving db...`)
  db.save();
  console.log('Saved !');
  process.kill(process.pid);
});
