chrome.runtime.onMessageExternal.addListener(
  function(message, sender, sendResponse) {

    var blob = new Blob([message.blob], {type: message.filetype});

    document.getElementById("untexte").innerHTML = message.url;
    document.getElementById("untexte2").innerHTML = message.address;
    document.getElementById("untexte3").innerHTML = message.port;

    sendResponse('Processed file');

    //send(message.address, message.port, message.url);
    sendextension("Bonjour");

});

function recep(){
	chrome.sockets.tcp.onReceive.addListener(function(recvInfo) {
    	document.getElementById("untexte").innerHTML = "RECU :" + ab2str(recvInfo.data);
    	sendextension(ab2str(recvInfo.data));
	});
}

function send(laddress, leport, ledata){

	chrome.sockets.tcp.create({}, function(createInfo) {
    MaSocket = createInfo.socketId;
    
    chrome.sockets.tcp.connect(MaSocket,
    laddress, parseInt(leport, 10), function(){
      chrome.sockets.tcp.send(MaSocket, str2ab(ledata), function(){
    });
    var socketId;
  	chrome.sockets.tcpServer.create({}, function(createInfo) {
      listenAndAccept(createInfo.socketId);
  });
  });
  });
}

function sendextension(str){

    var message = {
        string: str
    };

    var laserExtensionId = "jdbfodaemkpodjhlpofbccpmjpajebcc";

	chrome.runtime.sendMessage(laserExtensionId, message, function(result) {
        if (chrome.runtime.lastError) {
            console.warn('Error: ' + chrome.runtime.lastError.message);
        } else {
            console.log('Reply from app: ', result);
        }
    });
    i++;
}


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