let updatemoney = (money) => {
  document.getElementById("content").innerHTML = new Intl.NumberFormat('de-DE').format(money);
  $('.newmoney').hide();
  var oldmoney = document.getElementById("content").value;
  var newmoney = money;
  if (oldmoney > newmoney) {
    $('.newmoney').css("color", "red");
    document.getElementById("newcontent").textContent = "-" + event.data.removeMoney + "$";
    $(".newmoney").fadeIn("slow")();
    setTimeout(() => {
      $(".newmoney").fadeOut("slow")();
    }, 2500)
  } else {
    $('.newmoney').css("color", "green");
    document.getElementById("newcontent").textContent = "-" + event.data.removeMoney + "$";
    $(".newmoney").fadeIn("slow")();
    setTimeout(() => {
      $(".newmoney").fadeOut("slow")();
    }, 2500)
  }
}

let toggleaduty = (bool) => {
  if (bool) {
    $(".aduty").show();
    $("#aduty").show();
  } else {
    $(".aduty").hide();
    $("#aduty").hide();
  }
}