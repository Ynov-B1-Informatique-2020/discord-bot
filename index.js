// require the config.json file
const Config = require('./config.json');

// require the utils folder
const Utils = require('./utils');

// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

// Load commands
var commands = Utils.loadCommands();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

// this event will trigger each time a message is sent
client.on('message', event => {
  
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
      event,
      args,
      argsRaw,
      client,
      Discord,
      commands,
      Config
    }
    commandObject.execute(opts);
  }
  console.log("\n\n");
});

// login to Discord with your app's token
client.login(Config.token)
