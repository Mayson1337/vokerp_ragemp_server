var balance;
var money;
$('#bankui').hide();

let openMenu = (bal, mon) => {
  $('#bankui').fadeTo(0, 1.0)
  //$('#bankui').fadeIn(300);
  $('#bankui').show();
  $('#depositval').val('');
  $('#withdrawval').val('');
  $('.balance').html(bal);
  mp.trigger('client:chatmessage', String(bal));
}

let closeMenu = () => {
  $('#bankui').fadeTo(0, 0.0);
  $('#bankui').hide();
}

let updateBalance = (cash) => {
  $('.balance').html(cash);
  balance = cash;
}

let updateMoney = (cash) => {
  cash = cash;
}

$('.close').click(function () {
  //$('#bankui').fadeTo(10, 0.0);
  $('#bankui').hide();
  mp.trigger('client:player:bank:close');
});

$('#withdraw').click(function (e) {
  e.preventDefault();
  var val = parseInt($('#withdrawval').val());
  if (val > balance) {
    mp.trigger('notify', "red", "", "Du hast nicht genug Bankguthaben für diesen Vorgang.");
  } else {
    mp.trigger('client:player:banking:withdraw', val);
    balance = balance - val;
    money = money + val;
    mp.trigger('notify', "green", "", "Du hast " + val + "$ ausgezahlt.");
  }
});

$('#deposit').click(function (e) {
  e.preventDefault();
  var val = parseInt($('#depositval').val());
  if (val > money) {
    mp.trigger('notify', "red", "", "Du hast nicht genug Bargeld für diesen Vorgang.");
  } else {
    mp.trigger('client:player:banking:deposit', val);
    money = money - val;
    balance = balance + val;
    mp.trigger('notify', "green", "", "Du hast " + val + "$ eingezahlt.");
  }
});

$('#withdraw-all').click(function (e) {
    e.preventDefault();
    mp.trigger('client:player:banking:withdrawall')
});

$('#deposit-all').click(function (e) {
    e.preventDefault();
    mp.trigger('client:player:banking:depositall');
});

$('#faction_konto').click(function (e) {
    e.preventDefault();
    //todo
});

$('#transfer').click(function (e) {
  e.preventDefault();
  mp.trigger('client:player:banking:transfer', $('#transferval').val(), $('#idval').val());
});

document.onkeyup = function (data) {
    if (data.which == 27) {
        // $('bankui').hide();
        $('#bankui').fadeTo(0, 0.0)
        mp.trigger('client:player:bank:close');
    }
}

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});