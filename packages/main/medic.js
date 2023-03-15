mp.events.add("playerDeath", (player, reason, killer) => {
  player.call('client:medic:createBrowser');
  player.spawn(player.position);
  player.call('client:player:death');
  player.playAnimation("combat@damage@rb_writhe", "rb_writhe_loop", 1, 1);
  if (player.getVariable("isDead") == 0 || player.getVariable("isKoma") == 0) {
    if (player.getVariable("isDead") == 0) {
      player.setVariable("isDead", 600);
    } else if (player.getVariable("isKoma") == 0) {
      player.setVariable("isDead", 600);
    }
  }
  let inter = setInterval(() => {
    if (mp.players.exists(player)) {
      if (player.getVariable("isDead") >= 1) {
        var time = player.getVariable("isDead");
        player.setVariable("isDead", time - 1);
        console.log("DeathTime: " + time);
      } else if (player.getVariable("isKoma") >= 1) {
        var time = player.getVariable("isKoma");
        player.setVariable("isKoma", time - 1);
        console.log("KomaTime: " + time);
        player.call('client:player:koma');
      } else {
        console.log("revive");
        clearInterval(inter);
        mp.events.call('player:revive', player);
      }
    }
  }, 1000)
});

mp.events.addCommand("revive", (player, target) => {
  if (player.getVariable("perms") >= 50) {
    mp.players.forEach(
      (_player) => {
        if (_player.name == target) {
          mp.events.call('player:revive', _player);
          player.call('notify', ["green", "Administration", "Du hast " + target + " wiederbelebt."]);
          _player.call('notify', ["green", "", player.getVariable("rang") + " " + player.name + " hat dich wiederbelebt."]);
        }
      }
    );
  }
})

mp.events.add("player:revive", (player) => {
  player.call('client:player:revive');
  player.setVariable("isDead", 0);
  player.setVariable("isKoma", 0);
  player.stopAnimation();
});