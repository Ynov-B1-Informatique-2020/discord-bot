// require the config.json file
const Config = require('./config.json');

// require the config.json file
const Commands = require('./commands');

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
  console.log("-------------");
  console.log("Message :\t", event.content);

  // Check if the message start with our prefix
  if (event.content.startsWith(Config.prefix)) {

    // Slit the message on each whitespace
    splitedMessage = event.content.substring(1).split(' ');
    // Save the first element of the array as command
    command = splitedMessage[0].toLowerCase();

    // Save all the element after the first one as args
    args = splitedMessage.splice(1);


    // If the command exist in the object Commands, execute it
    if (command in Commands ) {
      Commands[command](event, args);
    } else {
      event.channel.send('Raté cette commande n\'existe pas camarade.');
    }
  }

});

// login to Discord with your app's token
client.login(Config.token)