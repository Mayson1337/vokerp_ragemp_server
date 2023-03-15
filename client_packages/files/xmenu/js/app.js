var progressbar = $('#progress_bar');
max = progressbar.attr('max');
value = progressbar.val();
$currentCommand = "";
$currentMoney = "";
var $ppc;
var animate;

var loading = function (farmingsuccess, animateinterval) {
	animate = animateinterval;
  value += 1;
  addValue = progressbar.val(value);

  $('.progress-value').html(value + '%');
  $ppc = $('.progress-pie-chart'),
    deg = 360 * value / 100;
  if (value > 50) {
    $ppc.addClass('gt-50');
  }

  $('.ppc-progress-fill').css('transform', 'rotate(' + deg + 'deg)');
  $('.ppc-percents span').html(value + '%');

  if (value == max) {
    clearInterval(animate);
    $ppc.removeClass('gt-50');
    $('.ppc-progress-fill').css('transform', 'rotate(1deg)');

    $('.ppc-percents span').html('0%');
    value = 1;
    deg = 360 * value / 100;
    $ppc.removeClass('visiblebar');
    $ppc.addClass('hidebar');
    iziToast.show({
      title: farmingsuccess,
      theme: 'dark', // dark
      color: 'blue', // blue, red, green, yellow
      close: false,
      titleSize: '20',
      closeOnEscape: false,
      closeOnClick: false,
      displayMode: 0, // once, replace
      position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
      timeout: 3500,
      animateInside: true,
      drag: false,
      pauseOnHover: false
    });
  }
};

function startFarming(farmingsuccess, time = 2) {
  time = (1000 / max) * time;
  $('.progress-pie-chart').removeClass('hidebar');
  $('.progress-pie-chart').addClass('visiblebar');

  var animate = setInterval(function () {
    loading(farmingsuccess, animate);
  }, time);
}

function setVoiceState(state){
	var el = document.querySelector('#voiceState');
	if(state == 3)
		el.setAttribute('data', 'img/flustern.svg');
	if(state == 8)
		el.setAttribute('data', 'img/reden.svg');
	if(state == 15)
		el.setAttribute('data', 'img/schreien.svg');
	if(state == 0)
		el.setAttribute('data', 'img/mute.svg');
}

function hotkeyE() {
  iziToast.show({
    title: 'Benutze die E-Taste um hier zu interagieren.',
    theme: 'dark', // dark
    color: 'blue', // blue, red, green, yellow
    close: false,
    titleSize: '20',
    closeOnEscape: false,
    closeOnClick: false,
    displayMode: 0, // once, replace
    position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
    timeout: 3500,
    animateInside: true,
    drag: false,
    pauseOnHover: false
  });
}

function messageNtf(ntf) {
  iziToast.show({
    title: ntf,
    theme: 'dark', // dark
    color: 'blue', // blue, red, green, yellow
    close: false,
    titleSize: '20',
    closeOnEscape: false,
    closeOnClick: false,
    displayMode: 0, // once, replace
    position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
    timeout: 7500,
    animateInside: true,
    drag: false,
    pauseOnHover: false
  });
}

function executeMoney(moneycount) {
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  document.getElementById("moneyCount").innerHTML = formatNumber(moneycount);

}

function toggleX() {
  document.getElementById("xMenu").classList.toggle('hidden');
}

function doCommand() {
iziToast.info({
    timeout: 99000000,
	theme: 'dark', // dark
	close: false,
    overlay: true,
    displayMode: 'once',
    id: 'inputs',
    zindex: 999,
    title: 'Command',
    position: 'center',
    drag: false,
    inputs: [
        ['<input style="color:white" type="text">', 'keyup', function (instance, toast, input, e) {
            $currentCommand = input.value;
        }, true],
    ],
	buttons: [
        ['<button style="font-family:BNT">SENDEN</button>', function (instance, toast) {
            mp.trigger('client:sendCommand', $currentCommand);
        }],
    ],
});	
}

function giveMoney() {
iziToast.info({
    timeout: 99000000,
	theme: 'dark', // dark
	close: true,
    overlay: true,
    displayMode: 'once',
    id: 'inputs',
    zindex: 999,
    title: 'Geld geben:',
	titleSize: '2vw',
	titleLineHeight: '2.25vw',
    position: 'center',
    drag: false,
    inputs: [
        ['<input maxlength="15" onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57" style="width: 14vw;text-align:center;padding:0.25vw;font-size:2vw;font-family:BNT;color:white" type="text">', 'keyup', function (instance, toast, input, e) {
            $currentMoney = input.value;
        }, true],
    ],
	buttons: [
        ['<button style="padding: 1vw;font-family:BNT">GEBEN</button>', function (instance, toast) {
            mp.trigger('client:giveMoney', $currentMoney);
			$currentMoney = "";
			instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
        }],
    ],
	onClosing: function(instance, toast, closedBy){
        mp.trigger('client:showCursor', false);
    }
});	
}

function fraktionInvite(inviter, fraktion) {
iziToast.info({
    timeout: 99000000,
	theme: 'dark', // dark
	close: false,
    overlay: true,
    displayMode: 'once',
    id: 'inputs',
    zindex: 999,
    title: 'Du wurdest in die Fraktion ' + fraktion + ' eingeladen<br>Willst du die Einladung von ' + inviter + ' akzeptieren?',
	titleSize: '1.7vw',
	titleLineHeight: '3.25vw',
    position: 'center',
    drag: false,
	buttons: [
        ['<button style="padding: 1vw;font-size: 1.35vw;font-family:BNT">Annehmen</button><br>', function (instance, toast) {
            mp.trigger('client:inviteFraktionState', inviter, fraktion, true);
			instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
        }],
		['<button style="padding: 1vw;font-size: 1.35vw;font-family:BNT">Ablehnen</button>', function (instance, toast) {
            mp.trigger('client:inviteFraktionState', inviter, fraktion, false);
			instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
        }],
    ],
	onClosing: function(instance, toast, closedBy){
        mp.trigger('client:showCursor', false);
    }
});	
}

function removentf(){
	$currentMoney = "";
	$currentCommand = "";
	iziToast.destroy();
}
var rgbtimer;

function playerDeath() {
  document.getElementById("deathscreen").classList.remove('hidden');

  var death = 300;
  setInterval(function () {
    death--;
    document.getElementById("deathtitle").innerHTML = "DU BIST GESTORBEN - RESPAWN IN " + death + " SEKUNDEN";
  }, 1000);
  var r = 255, g = 0, b = 0;

  rgbtimer = setInterval(function () {
    if (r > 0 && b == 0) {
      r--;
      g++;
    }
    if (g > 0 && r == 0) {
      g--;
      b++;
    }
    if (b > 0 && g == 0) {
      r++;
      b--;
    }
    $("#deathtitle").css("color", "rgb(" + r + "," + g + "," + b + ")");
  }, 8);
  
  $("body").css("background", "url(img/bg2.png)");
  startFarming("Du wurdest wiederbelebt", 300);
  setTimeout(function () {
    mp.trigger('client:revivePlayer'); 
  }, 300000);
}

function revivePlayer() {
    $("body").css("background", "none");
    clearInterval(rgbtimer);
    document.getElementById("deathscreen").classList.add('hidden');	
	clearInterval(animate);
    $ppc.removeClass('gt-50');
    $('.ppc-progress-fill').css('transform', 'rotate(1deg)');
    $('.ppc-percents span').html('0%');
    $ppc.removeClass('visiblebar');
    $ppc.addClass('hidebar');
}