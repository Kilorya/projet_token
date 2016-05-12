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

   // var pair = generateRSAKeyPair(1024);

   pem = '-----BEGIN RSA PRIVATE KEY-----MIIEowIBAAKCAQEAz8oe+S3ea7NTVldSroB4RqIBzqV2QP15+CZAdz92M2UP6LQdqRY2NMpuFate2pA8UU80MBBzVaLgFF029h8XVgGOrir4Gj1dPFgNXzbc6hYDITQn5Ffequ0nhi5DmDc9CmpMxXwiQB6oSpS14Uf/qKS7pcBZIMxzgzH4kJE+hwplcfJ8keTQNG8S6pys/pICoRlnSU93lpAitHcJ1oaJ5KlL2To23Ba6jh+CSEYomutGiyeZQuB9JbvakDVpIdxu5zugeIfnF8U+cFXDfmLRzdXl/g7T3+f9nhEN1D4v1UkiR3mE+xPYwqRVP1Rxi460wkI5J+QEV3LIuvtdcaJt4wIDAQABAoIBAFkPrvrqmBzdfejSANReqC7OHawu62Krwm2EJ7l07/rTZGA/Yz8oEA/MfCa5jyxrCg9nvVykkGqyJw1Tbs1LQjtQ65DnRfQpPR8yNnkLEOEckjbXHgoXR49Hmts+VSaW9ojSSxmSPTPyb/uXheWLcJ8eDHfc29bdCt2+u2Vre7txCT6NjsFNEnzw08suOEBt4sVdjCzFpOHe2fXbk2c+KCiDT19vbnrX356Hcad13v0AY4cu7FVws4avO2RMq/9xwJHtXFPFg4qnmqTNZC/aq9+k9G4xcUZMh4BaJRos1GO6fSj/yGDpwfKFbr5iWkjYvzlYI4fm7KexPvQsmxwKPSECgYEA9MBYJGQSH1BkUvZirp34y6MPVn1Y2HYKNMtImEtIyrevsut2JYv7Bj44G43NAWerPv9KrmPkbFdWzlqmGNHPDyCO5DH175WvSK2KXDFcrYcYfzRPgeQ2ipihj+L3mzQfqlIRUlAoowLU1DVJJVVVCuDt/xUNvl/dbY2P07UQsksCgYEA2VblvPeZUFwcPb1FiV8aRSlhagipTiX5ulJWg3QmxJCXUVgTz+Ssn7+NuN6tOVQHNfAy/YhEzSJu3xVHbFhPuII227mxtN5EpWTQrizBEDk+hZTadx07nNzY0DLW3IMiR2yolPEljBIFQzboyaPVc0CuUMjB/+omo4IIzucUs8kCgYA2dvcmYf6GaWVp8NpU8WKELm0jWhGDWgE7bmFhQp+YPPgkYLGR+WyLHx1tREjynxdElZsQ47nZQjZXBWUg8M+bFiu2LEgGYND442V+zp1JIF8bL5Dh3t8kSILreh6PszG4vTqNjrj8TYz/DDySykJ6gUN1GEJOsxabYn03J3vnsQKBgQDIyop3OXzQDDkfJPTQRCeeC+vurU/VXipIY/d/fNiwMzFJOokbQRXmhG8ng7ofw6zhvScuqi1+IzixKxSQWUpVmR+bggRWqB5dezV8JOa82VYUzX/EGiLP+gzo1H9CvHf36sAY0m0w6hkojtskJxN1ZiVlhwQMLcRCvUjr9ftfWQKBgAto1VuXpHnBAb+sGvmZOzGsqlor8kLz1X6OaMdypaDLQkIh4hVJKPriYRQL8OiW9gO1yPnJ0JpUQpUbhvpjXozoRlnTfdbjow7q469e9r12KYJBcktp4YFcKwdgCXgjLDwueFEWT/LVucn4xY/C7nnNO2WshMRVtFQNA/9KN+tl-----END RSA PRIVATE KEY-----';

    var private = forge.pki.privateKeyFromPem(pem);
    //var private = forge.pki.encryptedPrivateKeyFromPem(pem);
    
    var pub = forge.pki.setRsaPublicKey(private.n, private.e);

    var buffer = forge.util.createBuffer(chaine, 'utf8');

    var binaryString = buffer.getBytes();

    /*var encrypted = pub.encrypt(binaryString, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: {
            md: forge.md.sha256.create()
        }
    });*/

    var encrypted = pub.encrypt(binaryString);

    //var res = doRSA(chaine, pub);

    document.getElementById("untexte5").innerHTML = encrypted;

    //var nouveau = decryptRSA(res, pair);

    /*var decrypted = private.decrypt(forge.util.decode64(encrypted), 'RSA-OAEP', {
         md: forge.md.sha256.create(),
         mgf1: {
             md: forge.md.sha256.create()
         }
     });*/

    var decrypted = private.decrypt(encrypted);

    document.getElementById("untexte6").innerHTML = decrypted;

    //document.getElementById("untexte6").innerHTML = nouveau;

    //send(message.address, message.port, chaine);

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