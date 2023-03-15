var id = null;
var owner = null;
var locked = null;
var price = null;
var garage = null;
var keller = null;
var geld = null;
var interior = null;

let openHouse = (id, owner, locked, price, garage, keller, geld, interior) => {
  $('.wrapper').show();
  id = id;
  owner = owner;
  locked = locked;
  price = price;
  garage = garage;
  keller = keller;
  geld = geld;
  interior = interior;
  //document.getElementById("house_number").textContent = id;
  
};

let toggleDoor = (state) => {
  mp.trigger('client:haus:close');
  if (state == 0) {
    mp.trigger('client:haus:toggleDoor', [id, 0]);
  } else {
    mp.trigger('client:haus:toggleDoor', [id, 1]);
  }
};

let intoHouse = () => {
  mp.trigger('client:haus:intoHaus', id);
  mp.trigger('client:haus:close');
};

let intoKeller = () => {
  mp.trigger('client:haus:close');
};

let intoGeld = () => {
  mp.trigger('client:haus:close');
};

let leaveHouse = () => {
  mp.trigger('client:haus:close');
  mp.trigger('client:haus:leaveHaus');
};

let close = () => {
  mp.trigger('client:haus:close');
  $('.wrapper').hide();
  id = null;
  owner = null;
  locked = null;
  price = null;
  garage = null;
  keller = null;
  geld = null;
  interior = null;
}