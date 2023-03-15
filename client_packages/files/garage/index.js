let browser = null;

var cars = null;

mp.events.add('client:garage:createBrowser', () => {
  if (browser != null) return;
 
  browser = mp.browsers.new('package://files/garage/html/index.html');
});

mp.events.add('player:garage:open', (name, faction) => {
  browser.execute(`show('${name}', '${faction}');`);
  mp.gui.cursor.show(true, true);
});

mp.events.add('client:garage:loadcars', (garage, faction) => {
    mp.events.callRemote('server:garage:loadCars', String(garage), faction);
});

mp.events.add('client:garage:appendCar', (model, id, nickname, isFav) => {
  browser.execute(`AddCar('${model}', '${String(id)}', '${nickname}', ${isFav});`);
})

mp.events.add('player:garage:close', () => {
  mp.gui.cursor.show(false, false);
});

mp.events.add('player:garage:parkout', (vehicle) => {
  mp.events.callRemote('server:garage:parkout', vehicle);
});

mp.events.add('player:garage:parkin', (vehicle, faction) => {
  mp.events.callRemote('server:garage:parkin', vehicle);
});

mp.events.add('player:garage:enable-parkout', (garage, faction) => {
  mp.events.call('client:garage:loadcars', garage, faction);
});

mp.events.add('player:garage:enable-parkin', (faction) => {
  mp.events.callRemote('server:garage:loadOutVehicle', faction);
});

mp.events.add('client:garage:rename', (json) => {
  mp.events.callRemote('server:garage:rename', json);
});

mp.events.add('client:garage:togglefav', (json) => {
  mp.events.callRemote('server:garage:togglefav', json);
});