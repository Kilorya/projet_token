chrome.runtime.onMessageExternal.addListener(
  function(message, sender, sendResponse) {

    var blob = new Blob([message.blob], {type: message.filetype});

    document.getElementById("untexte").innerHTML = message.url;
    document.getElementById("untexte2").innerHTML = message.address;
    document.getElementById("untexte3").innerHTML = message.port;

    sendResponse('Processed file');

    send(message.url);
});

chrome.sockets.tcp.onReceive.addListener(function(recvInfo) {
    document.getElementById("untexte").innerHTML = "RECU :" + ab2str(recvInfo.data);
});

function send(cequejenvois){

	document.getElementById("untexte4").innerHTML = cequejenvois;

	/*chrome.sockets.tcp.create({}, function(createInfo) {
    MaSocket = createInfo.socketId;
    
    chrome.sockets.tcp.connect(MaSocket,
    address.value, parseInt(port.value, 10), function(){
      chrome.sockets.tcp.send(MaSocket, str2ab("Bonjour@Bonjour2@"), function(){
    })
    var socketId;
  	chrome.sockets.tcpServer.create({}, function(createInfo) {
      listenAndAccept(createInfo.socketId);
  });*/
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