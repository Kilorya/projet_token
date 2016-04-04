document.addEventListener('DOMContentLoaded', function() {

  var checkPageButton = document.getElementById('checkPage');

  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {

    var Username = document.getElementById('lusername');

    var Password = document.getElementById('lpassword');

    var IP = document.getElementById('lip');  

    var Port = document.getElementById('lport'); 

    //var parametre = new String(IP.value+":"+Port.value);
    //, {secure: true}
    var socket = io.connect('http://'+IP.value+':'+Port.value);

    //var ws = new WebSocket('ws://'+IP.value+':'+Port.value);

    document.write("Connection et envoi en cours...<br>");
    //var socket = require('socket.io').connect("http://127.0.0.1:8080");
    //socket.emit('message', 'TEST');
    //socket.emit('message', 'TEST2');
    //setTimeout(envoi, 5000);

    socket.on('connect', function(data) {
        socket.emit('join', 'Hello');
    });

    /*ws.onopen = function() {
      ws.send("TEST");
    };*/
    //socket = io.connect("http://127.0.0.1:8080");
    //socket.emit('message', 'TEST');

    document.write(tab.url+"<br>");
    document.write(Username.value+"<br>");
    document.write(Password.value+"<br>");
    document.write(IP.value);
    /*
    function envoi() {
    document.write(tab.url+"<br>");
    document.write(Username.value+"<br>");
    document.write(Password.value+"<br>");
    document.write(IP.value);
    socket.emit('message', 'TEST');
    }
 */   
    });
  }, false);
}, false);
