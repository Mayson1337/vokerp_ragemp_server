let browser = null;
 
mp.events.add('client:login:createBrowser', () => {
  if (browser != null) return;
 
  browser = mp.browsers.new('package://files/login/html/index.html');
});

mp.events.add('client:player:login', (name) => {
  mp.players.local.freezePosition(true);
  mp.game.cam.setGameplayCamRelativeHeading(0.0);
  mp.game.graphics.transitionToBlurred(1000);
  mp.game.ui.displayRadar(false);
  mp.gui.cursor.show(true, true);
  mp.players.local.setVisible(false, false);
  browser.execute(`document.getElementById("name").textContent = '` + name + `';`);
  mp.discord.update('Voke Roleplay', 'Im Loginscreen')
});

mp.events.add('client:player:loggedIn', () => {
  mp.game.graphics.transitionFromBlurred(1000);
  mp.players.local.freezePosition(false);
  mp.game.ui.displayRadar(true);
  mp.gui.cursor.show(false, false);
  mp.players.local.setVisible(true, true);
  browser.execute(`hide();`);
})

mp.events.add('client:player:login:check', (password) => {
  if (mp.events.callRemote('player:login:checkpw', password)) {
    mp.events.call('client:player:loggedIn');
  }
})