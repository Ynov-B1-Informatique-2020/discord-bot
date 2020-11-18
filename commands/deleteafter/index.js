module.exports = function (event, args) {
  event.delete();
  let delay, message;
  if (typeof parseInt(args[0]) == 'number') {
    delay = args[0];
    message = args.splice(1).join(' ');
  }else{
    delay = 10;
    message = args.join(' ');
  }
  event.channel.send(" **"+ event.author.username + "** dit : " + message+"\n\n Ce message s'auto-detruira dans "+ delay +" secondes")
    .then(function(message) {
      setTimeout(function(){
        message.delete();
      }, delay*1000);
    })
    .catch(function() {
      console.log('error sending the message');
    })

  
}