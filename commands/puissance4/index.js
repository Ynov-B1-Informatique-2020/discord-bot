const Connect4 = require('./connect4');

module.exports = {
  description: '',
  usage: '',
  aliases: ['connect4'],
  games: {},
	async execute(opts) {
    if(Array.from(opts.event.mentions.members).length!=1) {
      opts.event.channel.send(':x: Tag one user please');
      return;
    }

    let player1 = opts.event.member;
    let player2 = Array.from(opts.event.mentions.members)[0][1]
    let gameId = player1.user.id+'-'+player2.user.id;
    let game = this.games[gameId] = {
      message: await opts.event.channel.send('Loading...'),
      connect4: new Connect4(),
      player1, 
      player2
    };

    await game.message.react('1️⃣');
    await game.message.react('2️⃣');
    await game.message.react('3️⃣');
    await game.message.react('4️⃣');
    await game.message.react('5️⃣');
    await game.message.react('6️⃣');
    await game.message.react('7️⃣');
    
    this.turn(game);
  },
  async turn(game){

    let player;
    switch (game.connect4.player) {
      case 1:
        player = game.player1;
        break;
      case 2:
        player = game.player2;
        break;
    }

    let playerId = player.user.id;
    let playerName = player.nickname ?? player.user.username;

    console.log('Turn ->', playerId);
    let message = `${player}'s turn\n`;
    let printingGrid = game.connect4.getPrintingGrid();
    message += `1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣\n`;
    for (const line of printingGrid) {
      for (let x of line) {
        if (x === 0) x = ":black_square_button:";
        if (x === 1) x = ":x:";
        if (x === 2) x = ":blue_circle:";
        message += x + ' ';
      }
      message += '\n';
    }
    
    await game.message.edit(message);


    game.message.awaitReactions((reaction, user) => {
        return user.id === playerId;
      }, 
      { max: 1 })
      .then(async (collected) => {
        const reaction = collected.first();
        // let reactionUser = Array.from(reaction.users.cache).find((user) => user[1].id == playerId)
        reaction.users.remove(player);

        game.connect4.play(this.emojiToNumber(reaction.emoji.name)-1);

        this.turn(game);
      })
      .catch(collected => {
        console.log(collected);
        game.message.channel.send('error');
      });
  },
  emojiToNumber(emoji) {
    switch (emoji) {
        case '1️⃣':
          return 1;
        case '2️⃣':
          return 2;
        case '3️⃣':
          return 3;
        case '4️⃣':
          return 4;
        case '5️⃣':
          return 5;
        case '6️⃣':
          return 6;
        case '7️⃣':
          return 7;
    }
  }
};