module.exports = {
  description: 'Reply with the arguments',
  usage: 'string...',
  aliases: ['print', 'say'],
  author: 'zaosoula',
	execute(opts) {
    opts.event.channel.send(opts.argsRaw.join(' '));
	},
};