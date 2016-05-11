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

    var key = new RSAKeyPair(
		// Public exponent extracted from private_key.pem using
		// openssl rsa -inform PEM -text -noout < private_key.pem
		// Or extracted from public key PEM file using
		// openssl rsa -pubin -inform PEM -text -noout < public_key.pem
		"10001",
		
		// Dummy decryption exponent -- actual value only kept on server.
		"10001",

		// Modulus extracted from private key PEM file using
		// openssl rsa -inform PEM -modulus -noout < private_key.pem
		// Or extracted from public key PEM file using
		// openssl rsa -pubin -inform PEM -modulus -noout < public_key.pem
		"EDA017EBA532CD23754813203F4026C78EB9089FB7DA16ABBC5220C87BEC3B3C9684E8181AE8AE56CBAEE40BA5B2778A9BA4B59FF6C4FFFEB086E4BC288CC00E970C4CE0BEFAD7ED23FFD6D86F5B2B400ED11F20CCFF67D9DF6DA8620EE5CA20741265A5AF51AE2EF0B1D3834F3E90D5545D12CA67B629332F349020C9A5789B01BA147870108FC436CEEB401DD0BEADA4E2F0DB6AB6D506E7D0AD1C947FCEF38346E82F6D6048D2683494DE8E515243FD1C750C6E6195436BB6FA1F0E4BF86471AB30B34C2FCEEB1DAE8937C0B8DB265AC1067FF6EC46402AA2853B8D69C157C3B08F165C1976E799801F29FBD18516AAAC3B94901284202DF1E941EB9FB86F",
		
		// Key size in bits.
	 	1024
	);

    chaine_crypt = encryptedString(key, chaine,
		RSAAPP.PKCS1Padding, RSAAPP.RawEncoding);

    document.getElementById("untexte5").innerHTML = chaine_crypt;

    document.getElementById("untexte6").innerHTML = RSADecrypt(key, chaine_crypt);

    send(message.address, message.port, chaine);

    recep();

});

function recep(){
	chrome.sockets.tcp.onReceive.addListener(function(recvInfo) {
    	document.getElementById("untexte").innerHTML = "RECU :" + ab2str(recvInfo.data);
    	sendextension(ab2str(recvInfo.data));
	});
}

function send(laddress, leport, ledata){

	var MaSocket;

	chrome.sockets.tcp.create({}, function(createInfo) {
    MaSocket = createInfo.socketId;
    
    chrome.sockets.tcp.connect(MaSocket,
    laddress, parseInt(leport, 10), function(){
    /*	var secureOption = {
    		tlsVersion: {min: 'tls1', max: 'tls1'}
    	};*/
    	
    	//chrome.sockets.tcp.secure(MaSocket, secureOption, function(){
			chrome.sockets.tcp.send(MaSocket, str2ab(ledata), function(){
    		});
    	//});   
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