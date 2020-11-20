module.exports = {
	description: 'Display the help section',
  aliases: ['h', 'commands'],
	execute(opts) {
		let message = "Help\n\n";
		opts.commands.forEach(i => {
			message += `**${opts.Config.prefix + i.name}**`
			if(i.aliases.length) message += ` (${i.aliases.join(', ')})`;
			message += `: ${i.description}\n`;
			if(i.usage) message += `\tUsage: *${opts.Config.prefix + i.name} ${i.usage}*\n`;
		});

		opts.event.channel.send(message);

	},
};