const mysql = require('mysql');

mp.events.addCommand("giveweapon", (player, fullText) => {
  var args = fullText.split(' ');
  if (player.getVariable("perms") >= 70) {
    if (args.length > 2) {
      mp.players.forEach(
        (_player) => {
          if (_player.name == args[0]) {
            _player.giveWeapon(mp.joaat(args[1]), parseInt(args[2]));
          }
        }
      );
    } else {
      player.call('notify', ["red", "Fehler", "Syntax: /giveweapon [Spieler] [Waffe] [Munition]"])
    }
  } else {
    player.call('notify', ["red", "Fehler", "Dafür hast du keine Rechte."])
  }
});

mp.events.addCommand("admin", (player) => {
  if (player.getVariable("perms") >= 60) {
    player.call('player:gui:support:open', [player.name, player.getVariable("perms")]);
    player.call('client:inventory:showInventory');
  } else {
    player.call('notify', ["red", "Fehler", "Dafür hast du keine Rechte."])
  }
});

mp.events.addCommand("char", (player) => {
  player.call('client:creator.show');
})

mp.events.addCommand('getclothes', (player, text, component) => {
  if (component == null || !parseInt(component)) {
    return player.outputChatBox('Use syntax: /getclothes [component_id]');
  } else {
    let clothes = player.getClothes(parseInt(component));
    player.outputChatBox('drawable: ' + clothes.drawable + ' texture: ' + clothes.texture + ' palette: ' + clothes.palette);
  }
});

mp.events.addCommand('car', (player, veh)=> {
  if (parseInt(player.getVariable("perms")) >= 60) {
    var car = mp.vehicles.new(veh, player.position)
    player.call('notify', ["green", "Administration", car.model + " gespawnt."]);
    player.taskWarpIntoVehicle(car, -1);
  } else {
    player.call('notify', ["red", "Fehler", "Dafür hast du keine Rechte."])
  }
});

mp.events.addCommand('dc', (player) => {
  if (player.getVariable("perms") >= 60) {
    player.call('notify', ["green", "Administration", player.vehicle.model + " despawnt."]);
    player.vehicle.destroy();
  }
})

mp.events.addCommand('coords', (player) => {
  player.call('client:player:ctc', ["[" + player.position.x + ", " + player.position.y + ", " + player.position.z + "] <> " + player.heading]);
  player.call('notify', ["#1d4ed8", "Gamedesign", "Koordinaten wurden in Zwischenablage kopiert."])
});

mp.events.addCommand('announce', (player, text) => {
  if (player.getVariable("perms") >= 60) {
    mp.players.call('announce', ["#1d4ed8", "Ankündigung", text])
  }
});

mp.events.add("playerDamage", (player, healthLoss, armorLoss) => {
  if (adutys.get(player.name)) {
    return true;
  }
});

mp.events.addCommand('kick', (player, asd) => {
  var args = asd.split(' ');
  var target = args[0];
  var ccc = args[1];
  var reason = args[1];
  if (args.length >= 2) {
    for (var i = 2; i < args.length; i++) {
      ccc = ccc + ' ' + args[i];
      reason = ccc;
    }
  }
  if (player.getVariable("perms") >= 50) {
    if (target != null) {
      mp.players.forEach(
        (_player) => {
          if (_player.name == target) {
            mp.players.call('announce', ["red", "", player.getVariable("rang") + " " + player.name + " hat " + _player.name + " gekickt. Grund: " + reason]);
            _player.kick("Du wurdest gekickt.");
          }
        }
      );
    }
  }
});

mp.events.addCommand('einparken', (player, txt) => {
  var args = txt.split(' ');
  var id = parseInt(args[0]);
  var gar = null;
  var ccc = args[1];
  for (var i = 2; i < args.length; i++) {
    ccc = ccc + ' ' + args[i];
    gar = ccc;
  }
  if (gar == null) {
    var nsql = "UPDATE garage SET inGarage = 1 WHERE id = " + mysql.escape(id);
    mp.events.call('server:mysql:task', nsql, (res) => {});
  } else {
    var nsql = "UPDATE garage SET inGarage = 1, garage = " + mysql.escape(gar) + " WHERE id = " + mysql.escape(id);
    mp.events.call('server:mysql:task', nsql, (res) => {});
  }
  if (player.getVariable("aduty")) {
    mp.vehicles.forEach(
      (veh) => {
        if (veh.getVariable("id") == id) {
          if (gar == null) {
            player.call('notify', ["green", "Administration", "Du hast das Fahrzeug " + veh.getVariable("model") + " mit der ID " + id + " eingeparkt."])
          } else {
            player.call('notify', ["green", "Administration", "Du hast das Fahrzeug " + veh.getVariable("model") + " mit der ID " + id + " in " + gar + " eingeparkt."]);
          }
          if (veh.doesExist == null) {
            veh.destroy();
          }
        }
      }
    )
  } else {
    player.call('notify', ["red", "Administration", "Du bist nicht im Admindienst."])
  }
});

mp.events.addCommand('tpc', (player, arr) => {
  var args = arr.split(' ');
  if (player.getVariable("perms") >= 60) {
    if (player.getVariable("aduty")) {
      mp.vehicles.forEach((veh) => {
        if (veh.getVariable("id") == parseInt(args[0])) {
          player.position = veh.position;
          player.call('notify', ["red", "Administration", "Du hast dich zu Fahrzeug-ID " + args[0] + " teleportiert."]);
        }
      })
    }
  } 
})