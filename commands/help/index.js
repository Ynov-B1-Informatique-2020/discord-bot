module.exports = {
	description: 'Display the help section',
	aliases: ['h', 'commands'],
	author: 'zaosoula',
	execute(opts) {
		let message = "";
		if(opts.argsRaw.length == 0) {
			message += "Help\n\n"
			opts.commands.forEach(i => {
				message += `**${opts.Config.prefix + i.name}**`
				if(i.aliases.length) message += ` (${i.aliases.join(', ')})`;
				message += `: ${i.description}\n`;
				if(i.usage) message += `\tUsage: *${opts.Config.prefix + i.name} ${i.usage}*\n`;
			});
		}else if(opts.argsRaw[0]) {
			let commandName = opts.argsRaw[0].replace(opts.Config.prefix, '').toLowerCase();
			let command = opts.commands.find((x)=> x.name == commandName || x.aliases.includes(commandName));
			message += `Help for **${opts.Config.prefix + command.name}**\n`;
			message += `**Aliases**: ${command.aliases.join(', ')}\n`;
			message += `**Description**: ${command.description}\n`;
			message += `**Usage**: ${opts.Config.prefix + command.name} ${command.usage}\n`;
			message += `**Author**: ${command.author}\n`;
		}

		opts.event.channel.send(message);

	},
};