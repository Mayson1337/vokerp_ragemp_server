const mysql = require('mysql');

mp.events.addCommand('invite', (player, text) => {
  if (text == null){ args = null}else{var args = text.split(' ');};
  if (player.getVariable("faction") != "Zivilist" && player.getVariable("isLeader") == 1) {
    if (args != null) {
      if (args.length > 0){
      mp.players.forEach(
          (_player) => {
            if (_player.name == args[0]) {
              if (_player.getVariable("faction") != "Zivilist") {
                player.call('notify', [player.getVariable("faction_color"), player.getVariable("faction_fullname"), "Du hast " + _player.name + " in deine Fraktion eingeladen."])
                _player.call('client:player:button_menu:open', [(result) => {
                  if (result) {
                    console.log("angenommen");
                    _player.setVariable("faction", player.getVariable("faction"));
                    _player.setVariable("faction_fullname", player.getVariable("faction_fullname"));
                    _player.setVariable("faction_color", player.getVariable("faction_color"));
                    mp.players.forEach((_fplayers) => {
                      if (_fplayers.getVariable("faction") == _player.getVariable("faction")) {
                        _fplayers.call('notify', [_player.getVariable("faction_color"), _player.getVariable("faction_fullname"), _player.name + " ist nun Mitglied deiner Fraktion.", 8000]);
                      }
                    })
                  } else {
                    player.call('notify', ["red", player.getVariable("faction_fullname"), _player.name + " hat die einladung abgelehnt."]);
                  }
                }]);
              } else {
                player.call('notify', ["red", player.getVariable("faction_fullname"), _player.name + " ist bereits in einer Fraktion."]);
              }
            }
          }
        );
    }}
  } else {
    player.call('notify', ["red", "Fehler", "Dafür hast du keine Rechte."]);
  }
});