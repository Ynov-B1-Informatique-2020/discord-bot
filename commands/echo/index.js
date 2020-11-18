module.exports = function (opts) {
  opts.event.channel.send(opts.argsRaw.join(' '));
}
