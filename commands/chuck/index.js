const axios = require('axios');

const norris = ["https://tenor.com/view/chuck-norris-kicked-angry-kick-side-kick-gif-12127069", "https://tenor.com/view/chuck-norris-dont-care-sorry-gif-3557719"]

module.exports = async function (opts) {

    const arg1 = opts.argsRaw.join(" ")

    if (arg1) params.q = arg1

    axios.get('http://api.icndb.com/jokes/random').then(response => {

        const apiResponse = response.data.value.joke;

        const msgResponse = `${apiResponse} ${norris[apiResponse.length%2]}`
        opts.event.channel.send(msgResponse)

    }).catch(() => opts.event.channel.send(":x: Chuck Norris n'a trouvé aucune blague"))

}
