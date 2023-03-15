let browser = null;

mp.events.add('player:gui:support:open', (name, perms) => {
  if (browser == null) {
    browser = mp.browsers.new('package://files/xmenu/html/index.html');
  }
  browser.execute(`openMenu('${name}', ${perms});`);
  mp.gui.cursor.show(true, true);
});

mp.events.add('player:gui:support:close', () => {
  mp.gui.cursor.show(false, false);
});