function notify(color = '', title = '', message = '', time = 3500) {
  const content = $(`
    <div class="notification" style="border-bottom: 5px solid ${color}">
      <div class="notification-title">
        <p id="notfication-title-content" style="color: ${color}">${title}</p>
      </div>
      <div class="notification-message">
        <p id="notfication-message-content">${message}</p>
      </div>
    </div>
  `);
 
  content.fadeIn(300);
  $('#notifications').prepend(content);
 
  setTimeout(() => {
    content.fadeOut('slow');
  }, time);
}