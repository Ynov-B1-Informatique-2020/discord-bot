const axios = require('axios');
const emojis = require('./emojis');
const params = require('./params')

function getFlag(zone) {
    return ":flag_" + zone.toLowerCase() + ":"
}

function generateEmbed(opts, street, flag, temp, temp_like, weather_icon, wind) {
    return new opts.Discord.MessageEmbed()
        .setTitle("Voici la météo pour **" + street + "** " + flag)
        .setDescription(`**Température**  :point_right:  ${temp} ℃ ( ressentie ${temp_like} ℃ )
        **Météo**  :point_right:  ${weather_icon}
        **Vent**  :point_right: ${wind}  Km/h`)
        .setColor(15790320)
}

module.exports = {
    description: "Bot gives the weather at the desired location",
    usage: "",
    aliases: [],
    async execute(opts) {
        const arg1 = opts.argsRaw.join(" ")

        if (arg1) params.q = arg1

        axios.get('http://api.openweathermap.org/data/2.5/weather', {params}).then(response => {

            const apiResponse = response.data;
            const flag = getFlag(apiResponse.sys.country)

            const embed = generateEmbed(
                opts,
                apiResponse.name,
                flag,
                apiResponse.main.temp.toFixed(1),
                apiResponse.main.feels_like.toFixed(1),
                emojis[apiResponse.weather[0].icon],
                apiResponse.wind.speed.toFixed(1))

            opts.event.channel.send(embed)

        }).catch(() => opts.event.channel.send(new opts.Discord.MessageEmbed().setTitle(":x: Cette ville n'existe pas")))

    }

}
