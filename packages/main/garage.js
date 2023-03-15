var mysql = require('mysql');

var garage = null;

setTimeout(() => {
  var sql = "SELECT * FROM garagen";
  mp.events.call('server:mysql:task', sql, (result) => {
    console.log("Daten von 'garagen' wurden geladen.");
    garage = result;
    for (var key in garage){
      if (!garage[key].noBlip) {
        mp.blips.new(garage[key].blipType, new mp.Vector3(JSON.parse(garage[key].location)), {
          name: garage[key].blipName,
          scale: 0.8,
          color: 0,
          shortRange: true,
        });
      }
    }
  }, 1000);
});

var garagen_spawnpunkte = null;

setTimeout(() => {
  var sql = "SELECT * FROM garagen_spawnpunkte";
  mp.events.call('server:mysql:task', sql, (result) => {
    console.log("Daten von 'garagen_spawnpunkte' wurden geladen.");
    garagen_spawnpunkte = result;
    for (var key in result){
        mp.blips.new(300, new mp.Vector3(JSON.parse(result[key].location)), {
          name: "garagenspawn",
          scale: 0.8,
          color: 0,
          shortRange: true,
        });
    }
  });
}, 1000);

setTimeout(() => {
  var sql = "SELECT * FROM garage";
  mp.events.call('server:mysql:task', sql, (result) => {
    var cars = result;
    for (var key in cars) {
      if (cars[key].inGarage == 0) {
        car = mp.vehicles.new(cars[key].model, JSON.parse(cars[key].lastpos), {
          heading: cars[key].lastheading,
          numberPlate: cars[key].plate
        });
        car.setVariable("id", cars[key].id);
        if (result[0].faction == "no faction") {
          car.setVariable("owner", cars[key].owner);
        } else {
          car.setVariable("owner", cars[key].faction);
        }
        car.setVariable("isLocked", true);
        car.setVariable("model", cars[key].model);
        car.setVariable("nickname", cars[key].nickname);
        car.setVariable("isFav", cars[key].isFav)
        var c = JSON.parse(cars[key].color);
        car.setColorRGB(c.Red, c.Green, c.Blue, c.Red, c.Green, c.Blue);
      }
    }
  });
}, 1000);

mp.events.add('server:garage:checkpos', (player, callback) => {
  for (var key in garage) {
    var dist = player.dist(new mp.Vector3(JSON.parse(garage[key].location)));
    if (dist <= 2) {
      var sql = "SELECT * FROM garage WHERE owner = " + mysql.escape(player.getVariable("id")) + " AND garage = " + mysql.escape(garage[key].name);
      mp.events.call('server:mysql:task', sql, (result) => {
        if (garage[key].faction != null) {
          if (player.getVariable("faction") == garage[key].faction) {
            player.call('player:garage:open', [garage[key].name, garage[key].faction]);
          }
        } else {
          player.call('player:garage:open', [garage[key].name, garage[key].faction]);
        }
      });
      break;
    }
  }
});

mp.events.add('server:garage:loadCars', (player, gar, faction, callback) => {
  if (faction == "null") {
  var sql = "SELECT * FROM garage WHERE owner = " + mysql.escape(player.getVariable("id")) + " AND garage = " + mysql.escape(gar) + " AND inGarage = 1";
  mp.events.call('server:mysql:task', sql, (result) => {
    for (var key in result) {
      player.call('client:garage:appendCar', [result[key].model, result[key].id, result[key].nickname, result[key].isFav]);
    }
  });
  } else {
    var sql = "SELECT * FROM garage WHERE garage = " + mysql.escape(gar) + " AND inGarage = 1 AND faction = " + mysql.escape(faction);
  mp.events.call('server:mysql:task', sql, (result) => {
    for (var key in result) {
      player.call('client:garage:appendCar', [result[key].model, result[key].id, result[key].nickname, result[key].isFav]);
    }
  });
  }
});

mp.events.add('server:garage:parkout', (player, id) => {
  var sql = "SELECT * FROM garage WHERE id = " + mysql.escape(JSON.parse(id).id);
  mp.events.call('server:mysql:task', sql, (result) => {
    var car = null;
    for (var key in garagen_spawnpunkte) {
      if (garagen_spawnpunkte[key].name == result[0].garage) {
        console.log(garagen_spawnpunkte.length);
        console.log(result[0].garage, garagen_spawnpunkte[key].name);
        console.log(key);
        var vec = new mp.Vector3(JSON.parse(garagen_spawnpunkte[key].location));
        let getVehiclesNearbyMe = (vec) => {
          const returnVehicles = [];
          mp.vehicles.forEachInRange(vec, 1, (vehicle) => {
            returnVehicles.push(vehicle);
          });
          return returnVehicles;
        };
        let vehicles = getVehiclesNearbyMe(new mp.Vector3(JSON.parse(garagen_spawnpunkte[key].location)));
        console.log(vehicles.length);
        if (vehicles.length < 1) {
          car = mp.vehicles.new(result[0].model, JSON.parse(garagen_spawnpunkte[key].location), {
            heading: garagen_spawnpunkte[key].heading,
            numberPlate: result[0].plate
          });
          var nsql = "UPDATE garage SET inGarage = 0 WHERE id = " + mysql.escape(JSON.parse(id).id);
          mp.events.call('server:mysql:task', nsql, (res) => {});
          car.setVariable("id", result[0].id);
          if (result[0].faction == "no faction") {
            car.setVariable("owner", player.getVariable("id"));
          } else {
            car.setVariable("owner", result[0].faction);
          }
          car.setVariable("isLocked", true);
          car.setVariable("model", result[0].model);
          car.setVariable("nickname", result[0].nickname);
          car.setVariable("isFav", result[0].isFav)
          var c = JSON.parse(result[0].color);
          car.setColorRGB(c.Red, c.Green, c.Blue, c.Red, c.Green, c.Blue);
          break;
        }
      }
    }
  });
});

let parkoutVeh = (id) => {
  var sql = "SELECT * FROM garage WHERE id = " + mysql.escape(JSON.parse(id).id);
  mp.events.call('server:mysql:task', sql, (result) => {
    var car = null;
    for (var key in garagen_spawnpunkte) {
      if (garagen_spawnpunkte[key].name == result[0].garage) {
        console.log(garagen_spawnpunkte.length);
        console.log(result[0].garage, garagen_spawnpunkte[key].name);
        console.log(key);
        var vec = new mp.Vector3(JSON.parse(garagen_spawnpunkte[key].location));
        let getVehiclesNearbyMe = (vec) => {
          const returnVehicles = [];
          mp.vehicles.forEachInRange(vec, 1, (vehicle) => {
            returnVehicles.push(vehicle);
          });
          return returnVehicles;
        };
        let vehicles = getVehiclesNearbyMe(new mp.Vector3(JSON.parse(garagen_spawnpunkte[key].location)));
        console.log(vehicles.length);
        if (vehicles.length < 1) {
          car = mp.vehicles.new(result[0].model, JSON.parse(garagen_spawnpunkte[key].location), {
            heading: garagen_spawnpunkte[key].heading,
            numberPlate: result[0].plate
          });
          var nsql = "UPDATE garage SET inGarage = 0 WHERE id = " + mysql.escape(JSON.parse(id).id);
          mp.events.call('server:mysql:task', nsql, (res) => {});
          car.setVariable("id", result[0].id);
          if (result[0].faction == "no faction") {
            car.setVariable("owner", player.getVariable("id"));
          } else {
            car.setVariable("owner", result[0].faction);
          }
          car.setVariable("isLocked", true);
          car.setVariable("model", result[0].model);
          car.setVariable("nickname", result[0].nickname);
          car.setVariable("isFav", result[0].isFav)
          var c = JSON.parse(result[0].color);
          car.setColorRGB(c.Red, c.Green, c.Blue, c.Red, c.Green, c.Blue);
          break;
        }
      }
    }
  });
}

mp.events.add('server:garage:parkin', (player, id) => {
  mp.vehicles.forEachInRange(player.position, 25, (vehicle) => {
    if ((vehicle.getVariable("owner") == player.getVariable("id") || player.getVariable("faction") == vehicle.getVariable("owner")) && vehicle.getVariable("id") == JSON.parse(id).id && mp.vehicles.exists(vehicle)) {
      var nsql = "UPDATE garage SET inGarage = 1 WHERE id = " + mysql.escape(JSON.parse(id).id);
      mp.events.call('server:mysql:task', nsql, (res) => {});
      vehicle.setVariable("id", null);
      setTimeout(()=>{vehicle.destroy();},100);
    };
  });
});

mp.events.add('server:garage:loadOutVehicle', (player, faction) => {
  if (faction == "null") {
    mp.vehicles.forEachInRange(player.position, 25, (vehicle) => {
      if (vehicle.getVariable("owner") == player.getVariable("id")) {
        player.call('client:garage:appendCar', [vehicle.getVariable("model"), vehicle.getVariable("id"), vehicle.getVariable("nickname"), vehicle.getVariable("isFav")]);
      }
    });
  } else {
    mp.vehicles.forEachInRange(player.position, 25, (vehicle) => {
      if (vehicle.getVariable("owner") == player.getVariable("faction")) {
        player.call('client:garage:appendCar', [vehicle.getVariable("model"), vehicle.getVariable("id"), vehicle.getVariable("nickname"), vehicle.getVariable("isFav")]);
      }
    });
  }
});

mp.events.add('server:garage:rename', (player, json) => {
  var id = parseInt(JSON.parse(json).id);
  var nickname = JSON.parse(json).nickname;
  var sql = "UPDATE garage SET nickname = " + mysql.escape(nickname) + " WHERE id = " + mysql.escape(id);
  mp.events.call('server:mysql:task', sql, (result) => {});
});

mp.events.add('server:garage:togglefav', (player, json) => {
  var id = parseInt(JSON.parse(json).id);
  var status = JSON.parse(json).state;
  var sql = "UPDATE garage SET isFav = " + mysql.escape(status) + " WHERE id = " + mysql.escape(id);
  mp.events.call('server:mysql:task', sql, (result) => {});
});