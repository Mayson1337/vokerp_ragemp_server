let browser = null;

mp.events.add("client:player:button_menu:open", () => {
  if (browser == null) {
    browser = mp.browsers.new('package://files/button_menu/html/index.html');
  }
  browser.execute(`openMenu();`);
  mp.gui.cursor.show(true, true);
  return true;
});