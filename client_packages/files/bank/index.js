let browser = null;

if (browser == null) {
    browser = mp.browsers.new('package://files/bank/html/index.html');
  }

mp.events.add("client:player:bank:open", (bal) => {
  browser.execute(`openMenu();`);
  mp.gui.cursor.show(true, true);
});

mp.events.add('client:player:bank:close', () => {
    mp.gui.cursor.show(false, false);
});

atms = [
  mp.game.joaat("prop_atm_01"), 
  mp.game.joaat("prop_atm_02"),
  mp.game.joaat("prop_atm_03"),
  mp.game.joaat("prop_fleeca_atm")
];
mp.events.add('client:player:bank:checkpos', () => {
  const player = mp.players.local;
  for (let i = 0; i < atms.length; i++) {
    const atmHash = atms[i];
    var check = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 1.5, atmHash, false, true, true);
    if (check) {
      mp.events.call('client:player:bank:open');
    }
  };
});

mp.events.add('client:player:banking:updateMoney', (amount) => {
  browser.execute(`updateMoney(${amount});`);
});

mp.events.add('client:player:banking:updateBalance', (amount) => {
  browser.execute(`updateBalance(${amount});`);
});

mp.events.add('client:player:banking:withdraw', (amount) => {
  mp.events.callRemote('bank:remove', amount);
  mp.events.callRemote('money:add', amount);
});

mp.events.add('client:player:banking:deposit', (amount) => {
  mp.events.callRemote('bank:add', amount);
  mp.events.callRemote('money:remove', amount);
});

mp.events.add('client:player:banking:transfer', (amount, player) => {
  mp.events.callRemote('bank:transfer', amount, player);
});

mp.events.add('client:player:banking:withdrawall', () => {
  mp.events.callRemote('server:player:banking:withdrawall');
});

mp.events.add('client:player:banking:depositall', () => {
  mp.events.callRemote('server:player:banking:depositall');
});