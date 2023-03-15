let browser = null;


mp.events.add('client:hud:createBrowser', () => {
  if (browser != null) return;
 
  browser = mp.browsers.new('package://files/hud/html/index.html');
  browser.execute(`toggleaduty(false);`);
});

mp.events.add('client:hud:money:update', (newmoney) => {
  browser.execute(`updatemoney(${newmoney});`);
});

mp.events.add('client:hud:toggleaduty', (bool) => {
  browser.execute(`toggleaduty(${bool});`);
});