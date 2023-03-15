var KleidungBrowser = mp.browsers.new("package://files/Kleidung/index.html");
  KleidungBrowser.active = false;

mp.events.add("open:Kleidung", (player) => {
  mp.gui.cursor.show(true, true);
  mp.players.local.freezePosition(true);
  mp.game.controls.disableAllControlActions(0);
  KleidungBrowser.active = true;
});

mp.events.add("close:Kleidung", (player) => {
  KleidungBrowser.active = true;
  mp.gui.cursor.show(false, false);
  mp.players.local.freezePosition(false);
  mp.game.controls.enableAllControlActions(0);
});

mp.events.add("oberteiletrig", (player) => {
  KleidungBrowser.active = true;
  mp.events.call("customServerEvent", 'Oberteil:Server');
  mp.gui.cursor.show(false, false);
  mp.players.local.freezePosition(false);
  mp.game.controls.enableAllControlActions(0);
});
mp.events.add("unterteiletrig", (player) => {
  KleidungBrowser.active = true;
  mp.events.call("customServerEvent", 'Unterteil:Server');
  mp.gui.cursor.show(false, false);
  mp.players.local.freezePosition(false);
  mp.game.controls.enableAllControlActions(0);
});
mp.events.add("hosetrig", (player) => {
  KleidungBrowser.active = true;
  mp.events.call("customServerEvent", 'Hose:Server');
  mp.gui.cursor.show(false, false);
  mp.players.local.freezePosition(false);
  mp.game.controls.enableAllControlActions(0);
});
mp.events.add("schuhetrig", (player) => {
  KleidungBrowser.active = true;
  mp.events.call("customServerEvent", 'Schuhe:Server');
  mp.gui.cursor.show(false, false);
  mp.players.local.freezePosition(false);
  mp.game.controls.enableAllControlActions(0);
});

mp.events.add('render', () => {
mp.game.player.setHealthRechargeMultiplier(0.0);
});