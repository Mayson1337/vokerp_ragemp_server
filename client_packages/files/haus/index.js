var browser = null;  

mp.events.add('client:player:openHouse', (id, owner, locked, price, garage, keller, geld, interior) => {
  if (browser == null) {
    browser = mp.browsers.new('package://files/haus/html/index.html');
  }
  browser.execute(`openHouse(${id}, ${owner}, ${locked}, ${price}, ${garage}, ${keller}, ${geld}, ${interior})`);
  mp.gui.cursor.show(true, true);
});

mp.events.add('client:haus:intoHaus', (id) => {
  mp.events.callRemote('server:haus:intoHaus', id);
});

mp.events.add('client:haus:leaveHaus', () => {
  mp.events.callRemote('server:haus:leaveHaus');
});

mp.events.add('client:haus:toggleDoor', (id, state) => {
  mp.events.callRemote('server:haus:toggleDoor', [id, state]);
})

mp.events.add('client:haus:leaveHaus', () => {
  mp.events.callRemote('server:haus:leaveHaus');
});

mp.events.add('client:haus:close', () => {
  mp.gui.cursor.show(false, false);
});