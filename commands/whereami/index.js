module.exports = {
  description: "Give you the name of the voice channel you are currently in",
  aliases: ['whereiam'],
  author: "zaosoula",
  execute(opts) {
      let message;
      if(opts.event.member.voice.channelID != null) {
        message = `You are in #${opts.event.guild.channels.cache.get(opts.event.member.voice.channelID).name}`;
      }else{
        message = `You are not in a voice channel.`;
      }

      opts.event.channel.send(new opts.Discord.MessageEmbed().setTitle(message).setColor(6901247));
  }
}