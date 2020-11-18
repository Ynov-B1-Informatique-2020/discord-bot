module.exports = function (opts) {
  opts.event.delete();
  let delay, message;
  if (typeof parseInt(opts.argsRaw[0]) == 'number') {
    delay = opts.argsRaw[0];
    message = opts.argsRaw.splice(1).join(' ');
  }else{
    delay = 10;
    message = opts.argsRaw.join(' ');
  }
  opts.event.channel.send(" **"+ opts.event.author.username + "** dit : " + message + "\n\n Ce message s'auto-detruira dans " + delay + " secondes")
    .then(function(message) {
      setTimeout(function(){
        message.delete();
      }, delay*1000);
    })
    .catch(function() {
      console.log('error sending the message');
    })

  
}
