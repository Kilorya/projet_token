/**********************************************
Permet de recevoir des informations de l'extension
**********************************************/

chrome.runtime.onMessageExternal.addListener(
  function(message, sender, sendResponse) {

    var blob = new Blob([message.blob], {type: message.filetype});

    document.getElementById("untexte").innerHTML = message.url;
    document.getElementById("untexte2").innerHTML = message.address;
    document.getElementById("untexte3").innerHTML = message.port;

    sendResponse('Processed file');

    if(message.cas == "save")
        var chaine = "SAVE*"+message.url+";"+message.username+";"+message.mdp+"*EOF@";
    else
    	var chaine = "GET*"+message.url+"*EOF@";

    document.getElementById("untexte4").innerHTML = chaine;

    send(message.address, message.port, chaine);

    recep();

});

/**********************************************
Fonction de reception de la reponse du Token
**********************************************/

function recep(){
	chrome.sockets.tcp.onReceive.addListener(function(recvInfo) {

    	document.getElementById("untexte").innerHTML = "RECU :" + ab2str(recvInfo.data);
    	sendextension(ab2str(recvInfo.data));

	});
}

/**********************************************
Envoi une chaine de caractère sur le réseau
**********************************************/

function send(laddress, leport, ledata){

	var MaSocket;    

	chrome.sockets.tcp.create({}, function(createInfo) {
    MaSocket = createInfo.socketId;
    document.getElementById("untexte5").innerHTML = "Bonjour";
    chrome.sockets.tcp.connect(MaSocket,
    laddress, parseInt(leport, 10), function(){
			chrome.sockets.tcp.send(MaSocket, str2ab(ledata), function(){
    		}); 
  });
  });
}

/**********************************************
Envoi une chaine de caractère vers l'extension
**********************************************/

function sendextension(str){

    var message = {
        string: str
    };

    var ExtensionID = "dpgogjkhbgabofdhhkacnajokhdjpkjf";

	chrome.runtime.sendMessage(ExtensionID, message, function(result) {
        if (chrome.runtime.lastError) {
            console.warn('Error: ' + chrome.runtime.lastError.message);
        } else {
            console.log('Reply from app: ', result);
        }
    });
}

/**********************************************
String vers Array Buffer
**********************************************/

function str2ab(str) {
  var buf = new ArrayBuffer(str.length*2);
  var bufView = new Uint16Array(buf);
  for (var i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

/**********************************************
Array Buffer vers String
**********************************************/

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

/**********************************************
String vers Hexa
**********************************************/

function toHex(str) {
	var hex = '';
	for(var i=0;i<str.length;i++) {
		hex += ''+str.charCodeAt(i).toString(16);
	}
	return hex;
}