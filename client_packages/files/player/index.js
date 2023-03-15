mp.nametags.enabled = false;

setInterval(() => {
  mp.events.callRemote('server:level:addminute');
}, 60000)

setInterval(() => {
  mp.game.invoke('0x9E4CFFF989258472');
  mp.game.invoke('0xF4F2C0D4EE209E20');
}, 25000);

var cursor = false;

mp.events.add({'client:player.ready': () => {
  mp.discord.update('Voke Roleplay', 'www.voke-rp.de');
}
              });

mp.events.add('client:chatmessage', (message) => {
  mp.gui.chat.push(message);
});

mp.keys.bind(0x77, true, () => {
  if (cursor) {
    mp.gui.cursor.show(false, false);
    cursor = false;
  } else {
    mp.gui.cursor.show(true, true);
    cursor = true;
  }
});

mp.gui.chat.show(false); //Disables default RageMP Chat
const chat = mp.browsers.new('package://files/player/html/index.html');
chat.markAsChat();

mp.events.add('client:player:ctc', (text) => {
  chat.execute(`ctc('${text}')`);
});