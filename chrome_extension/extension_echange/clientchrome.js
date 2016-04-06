window.addEventListener('DOMContentLoaded', function() {
   var checkPageButton = document.getElementById('checkPage');

  checkPageButton.addEventListener('click', function() {
  var MaSocket;
  var address = document.getElementById("lip");
  var port = document.getElementById("lport");

  
//'127.0.0.1', 1234, function() {
  chrome.sockets.tcp.create({}, function(createInfo) {
    MaSocket = createInfo.socketId;
    
    chrome.sockets.tcp.connect(MaSocket,
 //     '172.30.3.88', 2222, function() {
      address.value, parseInt(port.value, 10), function(){
      chrome.sockets.tcp.send(MaSocket, str2ab("Bonjour@Bonjour2@"), function(){
       })
      //});
   /* chrome.sockets.tcp.send(MaSocket, str2ab("Bonjour2"), function(){
       })
     // });
  chrome.sockets.tcp.send(MaSocket, str2ab("Bonjour3"), function(){
       })
      //});
  chrome.sockets.tcp.send(MaSocket, str2ab("Bonjour4"), function(){
       })*/
      });

     //chrome.sockets.tcp.close(MaSocket, function(){
     //});
     /*chrome.sockets.tcp.onReceive.addListener(function(recvInfo) {
        if (recvInfo.socketId != info.clientSocketId)
          return;
        document.getElementById("untexte").innerHTML = "RECU";
    });*/
    var socketId;
  chrome.sockets.tcpServer.create({}, function(createInfo) {
      listenAndAccept(createInfo.socketId);
  });

  function listenAndAccept(socketId) {
        chrome.sockets.tcpServer.listen(socketId,
        '0.0.0.0', parseInt(port.value, 10), function(resultCode) {
        //onListenCallback(socketId, resultCode)
    });
  }

  chrome.sockets.tcp.onReceive.addListener(function(recvInfo) {
    //if (recvInfo.socketId != info.clientSocketId)
     // return;
    // recvInfo.data is an arrayBuffer.
    document.getElementById("untexte").innerHTML = "RECU :" + ab2str(recvInfo.data);
  });
  //chrome.sockets.tcp.setPaused(false);

    setTimeout(function() {
            //chrome.sockets.tcp.disconnect(MaSocket, function(){
            //}); 
            chrome.sockets.tcp.close(MaSocket, function(){
            }); 
            //document.getElementById("untexte").innerHTML = "Voila";
            /*window.close();

            chrome.app.window.create('page2.html', {
            id: "mainwin2",
            innerBounds: {
            width: 380,
            height: 280
          }
        });*/

        //document.getElementById("bonjour").innerHTML = "New text!";

      }, 20000);

  });

  }, false);
  
});

function str2ab(str) {
  var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

/*
chrome.sockets.tcp.create({}, function(createInfo) {
  var MaSocket = createInfo.socketId;
  chrome.sockets.tcp.connect(MaSocket,
    '127.0.0.1', 1234, function() {
     chrome.sockets.tcp.send(MaSocket, str2ab("Bonjour"), function(){
     })
    });
});*/