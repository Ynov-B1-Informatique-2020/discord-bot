module.exports = function (event, args) {
  event.channel.send(args.join(' '));
}