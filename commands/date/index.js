const moment = require("moment-timezone")
const discord = require("discord.js")

const timezone = {
    "us": "America/Los_Angeles",
    "fr": "Europe/Paris",
    "jp": "Asia/Tokyo",
    "ru": "Europe/Moscow",
    "au": "Australia/Sydney"
}

function getTimeZone(tz) {

    if (timezone.hasOwnProperty(tz)) {
        return {
            flag: tz,
            zone: timezone[tz],
            street: timezone[tz].split("/")[1].replace("_", " ")
        }
    }

    return false

}

function getTime(zone) {

    let info = getTimeZone("fr")
    if (zone) info = getTimeZone(zone)

    return "It is " + moment().tz(info.zone).format("MMMM DD YYYY, HH[:]mm[:]ss ") + info.street + " :flag_" + info.flag + ":"

}

function generateEmbed(time) {
    return new discord.MessageEmbed().setTitle(time).setColor(6901247)
}

module.exports = {
    description: "Return the current date of the desired location",
    usage: "",
    aliases: [],
    async execute(opts) {
        await opts.event.channel.send(generateEmbed(getTime(opts.argsRaw[0])))
    }
}
