const mysql = require('mysql');

var haus = null;

var pos_Keller = [178.9477, -1000.258, -98.99989];
var pos_Geld = [1138.139, -3199.105, -39.66572];

var stat_Interior = [
  // Appartments
  {id: 1, coords: [-786.8663, 315.7642, 217.6385], versteck: 1}, //Main
  {id: 2, coords: [-786.9563, 315.6229, 187.9136], versteck: 1},
  {id: 3, coords: [-774.0126, 342.0428, 196.6864], versteck: 1},
  {id: 4, coords: [261.4586, -998.8196, -99.00863], versteck: 1},
  {id: 5, coords: [-31.21161, -595.137, 80.03086], versteck: 1},
  {id: 6, coords: [-17.94069, -589.0593, 90.11489], versteck: 1},
  {id: 9, coords: [151.6058, -1007.653, -99.00001], versteck: 1},




  // Häuser
  {id: 7, coords: [-174.3954, 497.7056, 137.6543], versteck: 1, geld: true, keller: true},
  {id: 8, coords: [373.8008, 423.8303, 145.9079], versteck: 1, geld: true, keller: true},
  {id: 10, coords: [266.0308, -1007.61, -101.0085], versteck: 1, keller: true},
  {id: 11, coords: [346.3801, -1013.137, -99.19623], versteck: 1, keller: true},
  {id: 12, coords: [-14.35035, -1440.41, 31.10155], versteck: 1, keller: true},
  {id: 13, coords: [1274.294, -1719.575, 54.77148], versteck: 1, keller: true},

  // Villa
  {id: 14, coords: [-815.7518, 178.571, 72.15314], versteck: 1, geld: true, keller: true},
  {id: 15, coords: [-815.7518, 178.571, 72.15314], versteck: 1, geld: true, keller: true} //RIESEN VILLEN
];

setTimeout(() => {
  mp.events.call('server:mysql:task', "SELECT * FROM haus", (result) => {
    haus = result;
    console.log("Daten von 'haus' wurden geladen.");
  });
}, 1000);

mp.events.add('server:haus:checkpos', (player) => {
  for (var key in haus) {
    var dist = player.dist(new mp.Vector3(haus[key].x, haus[key].y, haus[key].z));
    if (dist <= 2) {
      console.log("haus gefunden");
      player.call('client:player:openHouse', [haus[key].id, haus[key].owner, haus[key].locked, haus[key].price, haus[key].garage, haus[key].keller, haus[key].geld, haus[key].interior]);
      break;
    }
  }
});

mp.events.add('server:haus:intoHaus', (player, id) => {
  for (var k in haus) {
    if (haus[k].id == id) {
      if (haus[k].locked == 0) {
        for (var j in stat_Interior) {
          player.position = new mp.Vector3(JSON.parse(stat_Interior[haus[k].interior].coords));
          player.inHouse = parseInt(id);
        }
      } else {
        player.call('notify', ["red", "Haus " + id, "Dieses Haus ist abgeschlossen."]);
      }
    }
  }
});

mp.events.add('server:haus:leaveHaus', (player) => {
  for (var k in haus) {
    if (haus[k].id == player.inHouse) {
      player.inHouse = null;
      player.position = new mp.Vector3(JSON.parse(haus[k].location));
    }
  }
});

mp.events.add('server:haus:toggleDoor', (player, id, state) => {
  for (var k in haus) {
    if (haus[k].owner == player.getVariable("id")) {
      if (state == 0) {
        player.call('notify', ["green", "Haus " + id, "Du hast dein Haus aufgeschlossen."]);
        if (haus[k].id == parseInt(id)) {
          haus[k].locked = 0;
        }
      } else {
        player.call('notify', ["red", "Haus " + id, "Du hast dein Haus abgeschlossen."]);
        if (haus[k].id == parseInt(id)) {
          haus[k].locked = 1;
        }
      }
    }
  }
});