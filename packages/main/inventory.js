const mysql = require('mysql');
const invAPI = require("lodash.isequal");

// Items registrieren

mp.events.addCommand('giveitem', (player, text) => {
  args = text.split(' ');
  if (player.getVariable("perms") > 70) {
    if (args.length > 2) {
      mp.players.forEach(
        (_player) => {
          if (_player.name == args[0]) {
            _player.giveItem(args[1], parseInt(args[2]));
            player.call('notify', ["red", "Administration", "Du hast " + _player.name + " " + args[2] + " " + args[1] + " gegeben!"]);
          }
        }
      );
    } else {
      player.call('notify', ["red", "Fehler", "Syntax: /giveitem [Spieler] [Item] [Anzahl]"])
    }
  }
})