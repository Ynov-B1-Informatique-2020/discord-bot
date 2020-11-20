const axios = require('axios');
const discord = require('discord.js');

const params = {
    q: 'Toulouse',
    appid: '7ee839f37f95f9bab1ded9b034c50b28',
    units: 'metric'
}

const emojis = {
    "01d": ':sunny:',
    "01n": ':last_quarter_moon_with_face:',

    "02d": ':white_sun_small_cloud:',
    "02n": ':cloud: :first_quarter_moon_with_face:',

    "03d": ':white_sun_cloud:',
    "03n": ':cloud:',

    "04d": ':cloud: ',
    "04n": ':cloud:',

    "09d": ':white_sun_rain_cloud: ',
    "09n": ':white_sun_rain_cloud:',

    "10d": ':cloud_rain:',
    "10n": ':cloud_rain:',

    "11d": ':thunder_cloud_rain:',
    "11n": ':thunder_cloud_rain:',

    "13d": ':cloud_snow:',
    "13n": ':cloud_snow:',

    "50d": ':ocean:',
    "50n": ':ocean:',
}

function getFlag(zone) {
    return ":flag_" + zone.toLowerCase() + ":"
}

function generateEmbed(street, flag, temp, temp_like, weather_icon, wind) {
    return new discord.MessageEmbed()
        .setTitle("Voici la météo pour **" + street + "** " + flag)
        .setDescription(`**Température**  :point_right:  ${temp} ℃ ( ressentie ${temp_like} ℃ )
        **Météo**  :point_right:  ${weather_icon}
        **Vent**  :point_right: ${wind}  Km/h`)
        .setColor(15790320)
}

module.exports = async function (opts) {

    const arg1 = opts.argsRaw.join(" ")

    if (arg1) params.q = arg1

    axios.get('http://api.openweathermap.org/data/2.5/weather', {params}).then(response => {

        const apiResponse = response.data;
        const flag = getFlag(apiResponse.sys.country)

        const embed = generateEmbed(apiResponse.name, flag, apiResponse.main.temp.toFixed(1),
            apiResponse.main.feels_like.toFixed(1), emojis[apiResponse.weather[0].icon], apiResponse.wind.speed.toFixed(1))

        opts.event.channel.send(embed)

    }).catch(() => opts.event.channel.send(":x: Cette ville n'existe pas"))

}
