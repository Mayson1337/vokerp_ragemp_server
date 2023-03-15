let browser = null;
 
mp.events.add('client:announce:createBrowser', () => {
  if (browser != null) return;
 
  browser = mp.browsers.new('package://files/announce/html/index.html');
});

mp.events.add('announce', (color, title, message, time) => {
  if (browser == null) return;
 
  browser.execute(`announce('${color}', '${title}', '${message}', ${time});`);
  mp.game.audio.playSoundFrontend(-1, "Out_Of_Bounds_Timer", "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", true);
});