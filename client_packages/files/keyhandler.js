mp.keys.bind(0x45, true, () => {
  mp.events.callRemote('server:garage:checkpos', (result) => {});
  mp.events.call('client:player:bank:checkpos');
  mp.events.callRemote('server:haus:checkpos');
});

mp.keys.bind(0x71, true, () => {
  //mp.events.callRemote('server:player:phone:open')
})