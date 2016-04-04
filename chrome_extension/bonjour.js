document.addEventListener('DOMContentLoaded', function() {

  var checkPageButton = document.getElementById('checkPage');

  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {

    var socket = io.connect('http://localhost:8080');

    document.write("Je suis dans le JS");

    socket.emit('message', 'Hello toi');
    
    });
  }, false);
}, false);