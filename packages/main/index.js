require("./money.js");
require('./keyhandler.js');
require("./garage.js");
require('./medic.js');
require('./inventory.js');
require('./faction.js');
require('./business.js');
require('./phone.js');
require('./team.js');
require('./haus.js');
require('./xmenu.js');
const mysql = require('mysql');

var sqlconf = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "ragemp"
};

var pool = mysql.createPool(sqlconf)

var con = mysql.createConnection(sqlconf);

var npcs = null;
var blips = null;

con.connect(function(err) {
  if (err) throw err;
  console.log("Datenbank verbunden!");
  query = (sql, callback) => {
    con.query(sql, function(err, result) {
      if (err) {
        console.log("Fehler bei der Abfrage");
        console.log(err);
        throw err;
      } else {
        return callback(result);
      }
    });
  }
});

setTimeout(() => {
  pool.query("SELECT * FROM npc", (result) => {
    npcs = result;
    console.log("Daten von 'npc' wurden geladen.");
    for (var key in npcs) {
      console.log(npcs[key].heading);
      let nnpc = mp.peds.new(npcs[key].hash, new mp.Vector3(JSON.parse(npcs[key].location)), {
        heading: JSON.parse(npcs[key].heading),
        dynamic: false,
        frozen: true,
        invincible: true
      });
  }});
}, 1000);

mp.events.add("server:mysql:task", (sql, callback) => {
  pool.query(sql, function(err, result) {
    if(err) {
      console.log("Fehler bei der Abfrage");
      console.log(err);
      throw err;
    } else {
      return callback(result);
    }
  });
});

const adutys = new Map();
const perms = new Map();

var Rang = new Map([
  [100, "Projektleitung"],
  [90, "Manager"],
  [80, "Superadmin"],
  [70, "Administrator"],
  [60, "Moderator"],
  [50, "Supporter"],
  [40, "Guide"],
  [30, "Einreiseguide"],
  [20, "Gamedesign"],
  [10, "Mapper"],
  [0, "Spieler"]
]);

mp.events.add("playerReady", player => {
  player.call('client:notifications:createBrowser');
  player.call('client:login:createBrowser');
  player.call('client:player:login', [player.name]);
  console.log(player.name);
  console.log(player.socialClub);
  player.position = new mp.Vector3(699.81, 1148.54, 347.73);
  player.heading = 160.0;
});

mp.events.addCommand("setrank", (player, fullText) => {
  var args = fullText.split(' ');
  if (player.getVariable("perms") >= 90) {
    if (args.length > 1) {
      mp.players.forEach(
        (_player) => {
          if (_player.name == args[0]) {
            for (var key = 1; key < 11; key++) {
              var rk = Rang.get(key * 10);
              console.log(rk);
              if (rk == args[1]) {
                if (player.getVariable("perms") > key * 10) {
                  _player.setVariable("perms", key * 10);
                  _player.setVariable("rankg", Rang.get(key * 10));
                  var sql = "UPDATE players SET adminlevel = " + mysql.escape(key * 10) + " WHERE fullname = " + mysql.escape(args[0]);
                  player.call('notify', ["green", "Teammanagement", _player.name + " ist nun " + rk + "!"]);
                  _player.call('notify', ["green", "Team", "Du bist nun " + rk + "!"]);
                  mp.players.forEach(
                    (tp) => {
                      if(tp.getVariable("perms") >= 60) {
                        tp.call('notify', ["#ff8000", "Team", _player.name + " ist nun als " + rk + " im Team!", 6000])
                      }
                    })
                  query(sql, (result) => {})
                  break;
                }
              }
            }
          }
        }
      );
    } else {
      player.call('notify', ["red", "Fehler", "Syntax: /setrank [Spieler] [Rang]"])
    }
  } else {
    player.call('notify', ["red", "Fehler", "Dafür hast du keine Rechte."])
  }
});

mp.events.add("player:login:checkpw", (player, password) => {
  var sql = "SELECT * FROM `players` WHERE `fullname` = " + mysql.escape(player.name) + " AND `password` = " + mysql.escape(password);
  query(sql, (result) => {
    if (result[0].socialclub == player.socialClub) {
      if (result != null) {
        mp.events.call('player:login', player);
      } else {
        return false;
      }
    } else {
      if (result[0].bank == 0 && result[0].faction == "Zivilist" && result[0].business_grade == 0 && result[0].money == 50000) {
        mp.events.call('player:login', player);
      } else {
        player.kick();
      }
    }
  }) 
});

mp.events.add("player:login", player => {
  player.call('client:player.ready');
  player.call('client:hud:createBrowser');
  player.call('client:announce:createBrowser');
  player.call('client:garage:createBrowser');
  var sql = "SELECT * FROM `players` WHERE `fullname` = " + mysql.escape(player.name);
  query(sql, (result) => {
    if (result != null) {
      if (result[0].socialclub != null) {
        let adminlevel = result[0].adminlevel;
        player.position = JSON.parse(result[0].lastpos);
        player.heading = JSON.parse(result[0].lastheading);
        player.call('client:player:loggedIn');
        perms.set(player.name, adminlevel);
        //player.call('client:player:createnpc', JSON.stringify(npcs));
        player.setVariable("perms", adminlevel);
        player.setVariable("rang", Rang.get(adminlevel));
        player.setVariable("bank", parseInt(result[0].bank));
        player.setVariable("money", parseInt(result[0].money));
        player.setVariable("blackmoney", parseInt(result[0].blackmoney));
        player.setVariable("faction", result[0].faction);
        player.setVariable("faction_rank", result[0].faction_rank);
        player.setVariable("business", result[0].business);
        player.setVariable("business_rank", result[0].business_rank);
        player.setVariable("id", result[0].id);
        player.setVariable("isDead", result[0].isDead);
        player.setVariable("isKoma", result[0].isKoma);
        player.setVariable("isLoaded", true);
        player.setVariable("isLeader", result[0].isLeader);
        player.call('client:hud:money:update', [player.getVariable("money")]);
        if (result[0].isKoma >= 1 || result[0].isDead >= 1) {
          console.log(player.name + " war tot");
          player.health = 0;
        };
        player.bank = result[0].bank;
        var weapons = JSON.parse(result[0].loadout);
        for (const [key, value] of Object.entries(weapons)) {
          player.giveWeapon(parseInt(key), parseInt(value));
        }
        if (result[0].faction != "Zivilist") {
          var nsql = "SELECT * FROM `faction` WHERE `name` = " + mysql.escape(result[0].faction);
          query(nsql, (res) => {
            player.setVariable("faction_color", res[0].color);
            player.setVariable("faction_fullname", res[0].fullname)
          })
        }
      } else {
        player.call('client:creator.show');
        player.call('client:player:loggedIn');
      }
      player.call('client:player:banking:updateMoney', [parseInt(player.getVariable("money"))]);
      player.call('client:player:banking:updateBalance', [parseInt(player.getVariable("bank"))]);
    } else {
      player.kick("Account " + player.name + " konnte nicht gefunden werden.");
    }
  }) 
});

var suite = new Map([
  ["Projektleitung", 2],
  ["Manager", 1],
  ["Superadmin", 12],
  ["Administrator", 12],
  ["Moderator", 4],
  ["Supporter", 5]
])

mp.events.addCommand("aduty", (player) => {
  if (perms.get(player.name) >= 50) {
    if (adutys.get(player.name)) {
      adutys.delete(player.name);
      player.call('client:aduty', [false]);
      player.setVariable("aduty", false)
      player.call('notify', ["red", "Administration", "Du bist nun nicht mehr im Admindienst"]);
      mp.events.call('server:player:loadClothes', player);
    } else {
      adutys.set(player.name, true);
      player.setVariable("aduty", true);
      player.call('client:aduty', [true]);
      player.call('notify', ["red", "Administration", "Du bist nun im Admindienst"]);
      var color = suite.get(Rang.get(perms.get(player.name)));
      player.setClothes(1, 135, color, 2); //mask
      player.setClothes(4, 114, color, 2); //leg
      player.setClothes(11, 287, color, 2); //torso
      player.setClothes(6, 78, color, 2); //shoes
      player.setClothes(3, 9, 0, 2); //arms
      player.setClothes(8, 15, 0, 2); // undershirt
    }
  } else {
    player.call('notify', ["red", "Fehler", "Dafür hast du keine Rechte."]);
  }
});

mp.events.add("playerDamage", (player) => {
  if (player.getVariable("aduty")) {
    return true;
  }
});

mp.events.addCommand("setfaction", (player, fullText) => {
  if (perms.get(player.name) >= 80) {
    var args = fullText.split(' ');
    var sql = "UPDATE players SET faction = " + mysql.escape(args[1]) + ", faction_rank = " + mysql.escape(args[2]) + " WHERE fullname = " + mysql.escape(args[0]);
    query(sql, (result) => {
      if (result != null) {
        player.call('notify', ["green", "Fraktionsmanagement", "Du hast " + args[0] + " in die Fraktion " + args[1] + " (Rang " + args[2] + ") gesetzt.", 7000])
        mp.players.forEach(
          (_player) => {
            if (_player.name == args[0]) {
              _player.call('notify', ["red", "Fraktionsmanagement", player.getVariable("rang") + " " + player.name + " hat dich in die Fraktion " + args[1] + " gesetzt.", 7000]);
              _player.setVariable("faction", args[1]);
              _player.setVariable("faction_rank", args[2]);
            }
          }
        );
      }
    }) 
  }
});


mp.events.addCommand("tp", (player, target) => {
  if (player.getVariable("aduty")) {
    var args = target.split(' ');
    if (args.length > 0) {
      mp.players.forEach(
        (_player) => {
          if (_player.name == target) {
            player.position = _player.position;
            player.call('notify', ["green", "Administration", "Du hast dich zu " + _player.name + " teleportiert."]);
            _player.call('notify', ["red", "Administration", player.getVariable("rang") + " " + player.name + " hat sich zu dir Teleportiert."]);
          }
        }
      );
    } else {
      mp.players.forEach(
        (_player) => {
          if (_player.name == args[0]) {
            mp.players.forEach(
              (_player2) => {
                if (_player2.name == args[1]) {
                  _player.position = _player2.position;
                  _player.call('notify', ["green", "Administration", "Du wurdest zu " + _player.name + " teleportiert."]);
                  _player2.call('notify', ["red", "Administration", player.getVariable("rang") + " " + player.name + " wurde zu dir Teleportiert."]);
                  player.call('notify', ["green", "Administration", "Du hast " + _player.name + " zu " + _player2.name + " teleportiert!"]);
                }
              }
            );
          }
        }
      );
    }
  } else {
    player.call('notify', ["red", "Fehler", "Dafür hast du keine Rechte."]);
  }
});


// Spieler speichern beim Leave
mp.events.add("playerQuit", (player) => {
  player.stopAnimation();
  //var clothes = mp.events.call("server:player:getCurrentClothes", player);
  console.log("money: " + player.getVariable("money") + " | bank: " + player.getVariable("bank") + " | blackmoney: " + player.getVariable("blackmoney") + " | isDead: " + player.getVariable("isDead") + " | isKoma: " + player.getVariable("isKoma") + " | SocialClub: " + player.socialClub);
  var lastpos = mysql.escape(JSON.stringify(player.position));
  var lastheading = mysql.escape(JSON.stringify(player.heading));
  var money = mysql.escape(player.getVariable("money"));
  var bank = mysql.escape(player.getVariable("bank"));
  var blackmoney = mysql.escape(player.getVariable("blackmoney"));
  var isDead = mysql.escape(parseInt(player.getVariable("isDead")));
  var isKoma = mysql.escape(parseInt(player.getVariable("isKoma")));
  var ip = mysql.escape(player.ip);
  var weapons = mysql.escape(JSON.stringify(player.allWeapons));
  var socialclub = mysql.escape(player.socialClub);
  mp.events.call('player:revive', player);
  player.removeAllWeapons();
  if (player.getVariable("isLoaded")) {
    var sql = "UPDATE players SET lastpos = " + lastpos + ", lastheading = " + lastheading + ", money = " + money + ", bank = " + bank + ", blackmoney = " + blackmoney + ", isDead = " + isDead + ", isKoma = " + isKoma + ", ip = " + ip + ", loadout = " + weapons + " WHERE socialclub = " + socialclub;
    query(sql, (result) => {}) 
  };
});

let shutdown_vehicle = async () => {
  mp.vehicles.forEach(
    (veh) => {
      setTimeout(() => {
        var lastpos = mysql.escape(JSON.stringify(veh.position));
        var lastheading = mysql.escape(JSON.stringify(veh.heading));
        var id = mysql.escape(parseInt(veh.getVariable("id")));
        var sql = "UPDATE garage SET lastpos = " + lastpos + ", lastheading = " + lastheading + " WHERE id = " + id;
        console.log(lastpos);
        console.log(lastheading);
        console.log(id);
        if (mp.vehicles.exists(veh)) {
          console.log("is da");
          query(sql, (result) => {});
        }
      }, 100)
    }
  );
  setTimeout(()=>{resolve("Fertig");},1000);
}

let shutdown_player = async () => {
  mp.players.forEach(
    (player) => {
      setTimeout(() => {
        player.stopAnimation();
        var lastpos = mysql.escape(JSON.stringify(player.position));
        var lastheading = mysql.escape(JSON.stringify(player.heading));
        var money = mysql.escape(player.getVariable("money"));
        var bank = mysql.escape(player.getVariable("bank"));
        var blackmoney = mysql.escape(player.getVariable("blackmoney"));
        var isDead = mysql.escape(parseInt(player.getVariable("isDead")));
        var isKoma = mysql.escape(parseInt(player.getVariable("isKoma")));
        var ip = mysql.escape(player.ip);
        var weapons = mysql.escape(JSON.stringify(player.allWeapons));
        var socialclub = mysql.escape(player.socialClub);
        mp.events.call('player:revive', player);
        player.removeAllWeapons();
        if (player.getVariable("isLoaded")) {
          var sql = "UPDATE players SET lastpos = " + lastpos + ", lastheading = " + lastheading + ", money = " + money + ", bank = " + bank + ", blackmoney = " + blackmoney + ", isDead = " + isDead + ", isKoma = " + isKoma + ", ip = " + ip + ", loadout = " + weapons + " WHERE socialclub = " + socialclub;
          query(sql, (result) => {}) 
        };
      }, 100)
    }
  );
  setTimeout(()=>{resolve("Fertig");},1000);
}

mp.events.add("serverShutdown", async () => {
  mp.events.delayShutdown = true;
  await shutdown_vehicle();
  await shutdown_player();
  setTimeout(()=>{mp.events.delayShutdown = false;},1000);
});

mp.events.add('server:level:addminute', (player) => {
  var sql = "SELECT * FROM `players` WHERE `socialclub` = " + mysql.escape(player.socialClub);
  query(sql, (result) => {
    if (result != null) {
      if (result[0].minutes < 60) {
        var newmin = result[0].minutes + 1;
        var update = "UPDATE players SET minutes = " + mysql.escape(newmin) + " WHERE socialclub = " + mysql.escape(player.socialClub);
        query(update, (res) => {
        })
      } else {
        var newhour = parseInt(result[0].current_hours) + 1;
        var sozialbonus = parseInt(result[0].visum) * 30;
        sozialbonus = sozialbonus + parseInt(result[0].sozialbonus);
        if (result[0].current_hours >= result[0].needed_hours) {
          var level = parseInt(result[0].visum) + 1;
          var stunden = parseInt(result[0].needed_hours) + 4;
          var update = "UPDATE players SET minutes = 0, current_hours = 0, visum = " + mysql.escape(level) + ", needed_hours = " + mysql.escape(stunden) + ", sozialbonus = " + mysql.escape(sozialbonus) + " WHERE socialclub = " + mysql.escape(player.socialClub);
          player.call('notify', ["green", "", "Dein Sozialbonus ist eingetroffen. Begib dich zum Würfelpark um diesen auszuzahlen.", 6000]);
            player.call('notify', ["#ff8000", "Level", "Aufgrund deiner Spielzeit hat sich dein Level auf " + level + " erhöht.", 6000]);
          query(update, (res) => {});
        } else {
          var update = "UPDATE players SET minutes = 0, current_hours = " + mysql.escape(newhour) + ", sozialbonus = " + mysql.escape(sozialbonus) + " WHERE socialclub = " + mysql.escape(player.socialClub);
          query(update, (res) => {
            player.call('notify', ["green", "", "Dein Sozialbonus ist eingetroffen. Begib dich zum Würfelpark um diesen auszuzahlen.", 6000]);
          })
        }
      }
    } else {
      player.kick("Account " + player.name + " konnte nicht gefunden werden.");
    }
  })
});

mp.events.addCommand('ooc', (player, text) => {
  mp.players.forEachInRange(player.position, 8, (_player) => {
      _player.call('notify', ["#ff8000", player.name + " - OOC", text]);
    });
});

mp.events.addCommand('tc', (player, text) => {
  if (text != null) {
    if (player.getVariable("perms") >= 10) {
      mp.players.forEach(
        (_player) => {
          if (_player.getVariable("perms") >= 10) {
            _player.call('notify', ["#ff8000", "Teamchat", Rang.get(player.getVariable("perms")) + " " + player.name + ": " + text]);
          }
        });
    }
  } else {
    _player.call('notify', ["red", "Fehler", "Syntax: /tc [Nachricht]"])
  }
});

mp.events.addCommand('ac', (player, text) => {
  if (text != null) {
    if (player.getVariable("perms") >= 70) {
      mp.players.forEach(
        (_player) => {
          if (_player.getVariable("perms") >= 70) {
            _player.call('notify', ["red", "Adminchat", player.name + ": " + text])
          }
        });
    }
  } else {
    _player.call('notify', ["red", "Fehler", "Syntax: /ac [Nachricht]"])
  }
});

setTimeout(() => {
  var sql = "SELECT * FROM blips";
  pool.query(sql, (result) => {
    console.log("Daten von 'blips' wurden geladen.");
    blips = result;
    for (var key in blips) {
      mp.blips.new(blips[key].type, new mp.Vector3(JSON.parse(blips[key].location)), {
        name: blips[key].name,
        scale: blips[key].scale,
        color: blips[key].color,
        shortRange: true,
      });
    }
  });
}, 1000);