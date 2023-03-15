let toggleCar = (bool) => {
  if (bool){
    $('.carStats').fadeIn();
    $('.other').fadeIn();

  } else{
    $('.carStats').fadeOut();
    $('.other').fadeOut();
  }
}

let engineSwitch = (status) {
  if(status){
    $('#engine').css('color','green');
  } else{
    $('#engine').css('color','red');
  }
}

let lockSwitch = (status) => {
  if(event.data.status){
    $('#lock').css('color','green');
  } else {
    $('#lock').css('color','red');
  }
}

let updateGas = (value) {
  setProgressFuel(value,'.progress-fuel');
}

let updateKM = (value) {
  setProgressKM(event.data.value,'.progress-km');
}

let setstreet = (street) {
  document.getElementById('street').innerHTML = event.data.street;
}

let setkmh = (kmh) => {
  document.getElementById('kmh').innerHTML = event.data.kmh + "kmh";
}

function setProgressFuel(percent, element){

  document.getElementById('fueltext').innerHTML = percent + ".0 L";
}

function setProgressKM(km, element){

  document.getElementById('kmtext').innerHTML = km + " KM";
}