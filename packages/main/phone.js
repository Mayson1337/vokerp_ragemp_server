const mysql = require('mysql');

mp.events.add('server:player:phone:open', (player) => {
  player.call('client:player:phone:open');
  player.playAnimation("amb@world_human_stand_mobile@male@text@idle_a", "idle_a", -1, 1);
});

mp.events.add('server:player:phone:close', (player) => {
  player.stopAnimation();
})