document.addEventListener('DOMContentLoaded', function() {

  var checkPageButton = document.getElementById('checkPage');

  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {

    var Username = document.getElementById('lusername');

    var Password = document.getElementById('lpassword');

    var IP = document.getElementById('lip');  

    var Port = document.getElementById('lport'); 

    //var parametre = new String(IP.value+":"+Port.value);

    var socket = io.connect('http://'+IP.value+':'+Port.value, {secure: true});

    //var socket = require('socket.io').connect("http://127.0.0.1:8080");

    //socket = io.connect("http://127.0.0.1:8080");
    socket.emit('message', 'Yolo JAJ');

    document.write(tab.url+"<br>");
    document.write(Username.value+"<br>");
    document.write(Password.value+"<br>");
    document.write(IP.value);
    
    });
  }, false);
}, false);