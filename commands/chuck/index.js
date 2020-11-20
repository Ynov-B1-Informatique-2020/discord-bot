const axios = require('axios');

const norris = ["https://tenor.com/view/chuck-norris-kicked-angry-kick-side-kick-gif-12127069", "https://tenor.com/view/chuck-norris-dont-care-sorry-gif-3557719"]

module.exports = {
  description: 'Tell a chuck norris joke',
  usage: '[search_query]',
  aliases: ['norris', 'chucknorris'],
	execute(opts) {
    axios.get('http://api.icndb.com/jokes/random').then(response => {

        const joke = response.data.value.joke;
        const gif = norris[joke.length%2];
        
        opts.event.channel.send(joke)
        opts.event.channel.send(gif)

    }).catch((err) => {
        console.log(err);
        opts.event.channel.send(":x: Chuck Norris n'a trouvé aucune blague")
    })

	},
};