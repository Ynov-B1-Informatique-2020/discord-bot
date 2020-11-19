module.exports = function (opts) {
 opts.event.channel.send(
  opts.event.author.avatarURL()
)
}