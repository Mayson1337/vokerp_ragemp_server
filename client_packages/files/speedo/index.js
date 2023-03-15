let browser = null
let showed = false;
let player = mp.players.local;

mp.events.add('render', () => {
  if (player.vehicle && player.vehicle.getPedInSeat(-1) === player.handle) {
    if(showed === false) {
      if (browser == null) {
        browser = mp.browsers.new("package://files/speedo/html/index.html");
      }
      browser.execute("toggleCar(true);");
      showed = true;
    } else {
      browser.execute("toggleCar(false);");
      showed = false;
    }

    let vel1 = player.vehicle.getSpeed() * 3.6;
    let vel = (vel1).toFixed(0);
    let gas = player.vehicle.getPetrolTankHealth();
    gas = gas < 0 ? 0: gas / 10;
    browser.execute(`updateGas(${gas});`);
    browser.execute(`setkmh(${vel});`)
  }
});