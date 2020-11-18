module.exports = function (event, args, client) {
  event.channel.send({
    embed: {
      color: 3447003,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL()
      },
      title: "About",
      url: "https://github.com/Ynov-B1-Informatique-2020/discord-bot",
      fields: [{
          name: "EN",
          value: "A discord bot made by the *Toulouse Ynov Campus B1 Informatique G2 (2020/2021)* to improve our skills in **GIT** and **JavaScript**/**NodeJS**"
        },
        {
          name: "FR",
          value: "Un bot discord réalisé par la classe *Toulouse Ynov Campus B1 Informatique G2 (2020/2021)* pour améliorer nos compétences en **GIT** et **JavaScript**/**NodeJS**"
        }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL(),
      }
    }
  });
}