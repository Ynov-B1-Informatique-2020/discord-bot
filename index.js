// require the config.json file
const Config = require('./config.json');

// require the commands folder
const Commands = require('./commands');

// require the utils folder
const Utils = require('./utils');

// require the discord.js module
const Discord = require('discord.js');


// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

// this event will trigger each time a message is sent
client.on('message', event => {
  

  // Check if the message start with our prefix and the author is not the bot
  if (event.content.startsWith(Config.prefix) && event.author.id != client.user.id) {
    console.log("-------------");
    console.log("Command :\t", event.content);

    // Slit the message on each whitespace
    let splitedMessage = event.content.substring(Config.prefix.length).split(' ');

    // Save the first element of the array as command
    // Transform the string to lower case: EcHO -> echo
    let command = splitedMessage[0].toLowerCase();

    // Save all the element after the first one as args
    let argsRaw = splitedMessage.splice(1);
    let args = Utils.argsParser(argsRaw);

    // If the command exist in the object Commands, execute it
    if ( command in Commands ) {
      Commands[command]({
        event,
        args,
        argsRaw,
        client
      });
    } else {
      event.channel.send('Raté cette commande n\'existe pas camarade.');
    }

    console.log("\n\n");

  }
});

// login to Discord with your app's token
client.login(Config.token)