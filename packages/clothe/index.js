const mysql = require('mysql');

mp.events.add("server:player:loadClothes", (player) => {
 player.call('notify', ["red", "Debug", "Kleidung laden."])
  var sql = "SELECT * FROM `players` WHERE `fullname` = " + mysql.escape(player.name);
  player.resetClothes();
  mp.events.call('server:mysql:task', sql, (result) => {
    player.call('notify', ["red", "Debug", result[0].faction])
    var clothe = json.parse(result[0].clothes)
  });
});

mp.events.add("server:player:getCurrentClothes", (player) => {
  var clothes = new Map();
  var torso = player.getClothes(3);
  clothes.set(torso => ({drawable: torso.drawable, texture: torso.texture}));
  console.log(clothes);
  return JSON.stringify(clothes);
});

mp.events.add("server:player:saveClothes", (player)  => {
  var c = {
    head: player.getClothes(0).drawable,
    headText: player.getClothes(0).texture,
  };
  c.head = player.getClothes(0).drawable;
  c.headTex = player.getClothes(0).drawable;
  var sql = "UPDATE players SET clothes = " + clothes + " WHERE socialclub = " + mysql.escape(player.socialClub);
  mp.events.call('server:mysql:task', sql, (result) => {});
});

mp.events.add("server:player:saveSkin", (player)  => {
  var c = {
    head: player.getClothes(0).drawable,
    headText: player.getClothes(0).texture,
  };
  c.head = player.getClothes(0).drawable;
  c.headTex = player.getClothes(0).drawable;
  var sql = "UPDATE players SET skin = " + clothes + " WHERE socialclub = " + mysql.escape(player.socialClub);
  mp.events.call('server:mysql:task', sql, (result) => {});
});