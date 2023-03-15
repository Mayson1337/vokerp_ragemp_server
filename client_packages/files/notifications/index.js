let browser = null;
 
mp.events.add('client:notifications:createBrowser', () => {
  if (browser != null) return;
 
  browser = mp.browsers.new('package://files/notifications/html/index.html');
});
 
mp.events.add('notify', (color, title, message, time) => {
  if (browser == null) return;
 
  browser.execute(`notify('${color}', '${title}', '${message}', ${time});`);
  //mp.game.audio.playSoundFrontend(-1, "DELETE", "HUD_DEATHMATCH_SOUNDSET", true);
  mp.game.audio.playSoundFrontend(-1, "ATM_WINDOW", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);
});