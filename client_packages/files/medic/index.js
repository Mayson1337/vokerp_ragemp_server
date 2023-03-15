let browser = null;

var isKoma = false;

mp.events.add('client:medic:createBrowser', () => {
  if (browser != null) return;
 
  browser = mp.browsers.new('package://files/medic/html/index.html');
});

mp.events.add('client:player:death', () => {
  mp.players.local.freezePosition(true);
  mp.game.graphics.transitionToBlurred(1000);
  mp.game.ui.displayRadar(false);
  browser.execute(`setDead()`);
});

mp.events.add('client:player:revive', () => {
  mp.players.local.freezePosition(false);
  mp.game.graphics.transitionFromBlurred(1000);
  mp.game.ui.displayRadar(true);
  browser.execute(`resetDead()`);
  if (isKoma) {
    isKoma = false;
    browser.execute(`resetKoma()`);
  }
});

mp.events.add('client:player:koma', () => {
  if (!isKoma) {
    browser.execute(`setKoma();`);
    isKoma = true;
  }
});