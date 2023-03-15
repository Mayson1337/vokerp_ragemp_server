let login = () => {
  let password = document.getElementById("password").value;
  if (password != '') {
    mp.trigger('client:player:login:check', password);
  }
}

let hide = () => {
  $('.container').hide();
}

var input = document.getElementById("password");

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    mp.trigger('client:chatmessage', "ASD");
    login();
  }
});