mp.events.add('money:add', (player, amount) => {
  var money = player.getVariable("money");
  player.setVariable("money", money + amount);
  player.call('client:hud:money:update', [parseInt(player.getVariable("money"))]);
  player.call('client:player:banking:updateMoney', [parseInt(player.getVariable("money"))]);
});

mp.events.add('money:remove', (player, amount) => {
  var money = player.getVariable("money");
  player.setVariable("money", money - amount);
  player.call('client:hud:money:update', [parseInt(player.getVariable("money"))]);
  player.call('client:player:banking:updateMoney', [parseInt(player.getVariable("money"))]);
});

mp.events.add('bank:remove', (player, amount) => {
  var bank = player.getVariable("bank");
  player.setVariable("bank", bank - amount);
  player.bank = bank - amount;
  player.call('client:player:banking:updateBalance', [parseInt(player.getVariable("bank"))]);
});

mp.events.add('bank:add', (player, amount) => {
  var bank = player.getVariable("bank");
  player.setVariable("bank", bank + amount);
  player.bank = bank + amount;
  player.call('client:player:banking:updateBalance', [parseInt(player.getVariable("bank"))]);
});

mp.events.add('money:set', (player, amount) => {
  player.setVariable("money", amount);
  player.call('client:hud:money:update', [parseInt(player.getVariable("money"))]);
  player.call('client:player:banking:updateMoney', [parseInt(player.getVariable("money"))]);
});

mp.events.add('server:player:banking:withdrawall', (player) => {
  player.call('notify', ["green", "", "Du hast " + player.getVariable("bank") + "$ ausgezahlt."]);
  mp.events.call('money:add', player, player.getVariable("bank"));
  mp.events.call('bank:set', player, 0);
  player.call('client:hud:money:update', [parseInt(player.getVariable("money"))]);
  player.call('client:player:banking:updateBalance', [parseInt(player.getVariable("bank"))]);
  player.call('client:player:banking:updateMoney', [parseInt(player.getVariable("money"))]);
});

mp.events.add('server:player:banking:depositall', (player) => {
  player.call('notify', ["green", "", "Du hast " + player.getVariable("money") + "$ eingezahlt."]);
  mp.events.call('bank:add', player, player.getVariable("money"));
  mp.events.call('money:set', player, 0);
  player.call('client:player:banking:updateBalance', [parseInt(player.getVariable("bank"))]);
  player.call('client:player:banking:updateMoney', [parseInt(player.getVariable("money"))]);
});

mp.events.add('bank:set', (player, amount) => {
  player.setVariable("bank", amount);
  player.bank = amount;
  player.call('client:player:banking:updateBalance', [parseInt(player.getVariable("bank"))]);
});

mp.events.add('bank:transfer', (player, amount, target) => {
  var found = false;
  var amount = parseInt(amount);
  if (amount > 0) {
    mp.players.forEach(
      (_player) => {
        if (_player.name == target) {
          found = true;
          mp.events.call('bank:add', _player, amount);
          mp.events.call('bank:remove', player, amount);
          _player.call('notify', ["green", "", player.name + " hat dir " + amount + "$ überwiesen."]);
          player.call('notify', ["green", "", "Du hast " + _player.name + " " + amount + "$ überwiesen."]);
        }
      })
    if (!found) {
      player.call('notify', ["red", "", "Der Spieler " + target + " wurde nicht gefunden."])
    }
  } else {
    player.call('notify', ["red", "", "Der Betrag ist zu niedrig."])
  }
})

mp.events.addCommand('setaccountmoney', (player, text) => {
  args = text.split(' ');
  if (player.getVariable("perms") >= 90) {
    if (args[0] == "bank") {
       mp.events.call('bank:set', player, parseInt(args[1]));
      player.call('notify', ["red", "Administration", "Du hast dir " + args[1] + "$ Bankguthaben gesetzt."])
    } else if (args[0] == "money") {
      mp.events.call('money:set', player, parseInt(args[1]));
      player.call('notify', ["red", "Administration", "Du hast dir " + args[1] + "$ Bargeld gesetzt."])
    } else if (args[0] == "blackmoney") {
      //todo
    }
  } else {
    player.call('notify', ["red", "Fehler", "Dafür hast du keine Rechte."])
  }
});