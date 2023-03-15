mp.events.add('server:getInfoAboutCar', (player, veh) => {
  console.log(veh);
  console.log(veh.getVariable("id"));
})