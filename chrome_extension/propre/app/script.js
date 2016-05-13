chrome.runtime.onMessageExternal.addListener(
  function(message, sender, sendResponse) {

    var blob = new Blob([message.blob], {type: message.filetype});

    document.getElementById("untexte").innerHTML = message.url;
    document.getElementById("untexte2").innerHTML = message.address;
    document.getElementById("untexte3").innerHTML = message.port;

    sendResponse('Processed file');

    /*if(message.cas == "save")
        var chaine = "SAVE*"+message.url+";"+message.username+";"+message.mdp+"*EOF@";
    else
    	var chaine = "GET*"+message.url+"*EOF@";
	*/
    var chaine = "abcde";

    document.getElementById("untexte4").innerHTML = chaine;

    send(message.address, message.port, chaine);

    recep();

});

function recep(){
	chrome.sockets.tcp.onReceive.addListener(function(recvInfo) {

		pem_private = '-----BEGIN RSA PRIVATE KEY-----\n\
MIIEowIBAAKCAQEAz8oe+S3ea7NTVldSroB4RqIBzqV2QP15+CZAdz92M2UP6LQd\n\
qRY2NMpuFate2pA8UU80MBBzVaLgFF029h8XVgGOrir4Gj1dPFgNXzbc6hYDITQn\n\
5Ffequ0nhi5DmDc9CmpMxXwiQB6oSpS14Uf/qKS7pcBZIMxzgzH4kJE+hwplcfJ8\n\
keTQNG8S6pys/pICoRlnSU93lpAitHcJ1oaJ5KlL2To23Ba6jh+CSEYomutGiyeZ\n\
QuB9JbvakDVpIdxu5zugeIfnF8U+cFXDfmLRzdXl/g7T3+f9nhEN1D4v1UkiR3mE\n\
+xPYwqRVP1Rxi460wkI5J+QEV3LIuvtdcaJt4wIDAQABAoIBAFkPrvrqmBzdfejS\n\
ANReqC7OHawu62Krwm2EJ7l07/rTZGA/Yz8oEA/MfCa5jyxrCg9nvVykkGqyJw1T\n\
bs1LQjtQ65DnRfQpPR8yNnkLEOEckjbXHgoXR49Hmts+VSaW9ojSSxmSPTPyb/uX\n\
heWLcJ8eDHfc29bdCt2+u2Vre7txCT6NjsFNEnzw08suOEBt4sVdjCzFpOHe2fXb\n\
k2c+KCiDT19vbnrX356Hcad13v0AY4cu7FVws4avO2RMq/9xwJHtXFPFg4qnmqTN\n\
ZC/aq9+k9G4xcUZMh4BaJRos1GO6fSj/yGDpwfKFbr5iWkjYvzlYI4fm7KexPvQs\n\
mxwKPSECgYEA9MBYJGQSH1BkUvZirp34y6MPVn1Y2HYKNMtImEtIyrevsut2JYv7\n\
Bj44G43NAWerPv9KrmPkbFdWzlqmGNHPDyCO5DH175WvSK2KXDFcrYcYfzRPgeQ2\n\
ipihj+L3mzQfqlIRUlAoowLU1DVJJVVVCuDt/xUNvl/dbY2P07UQsksCgYEA2Vbl\n\
vPeZUFwcPb1FiV8aRSlhagipTiX5ulJWg3QmxJCXUVgTz+Ssn7+NuN6tOVQHNfAy\n\
/YhEzSJu3xVHbFhPuII227mxtN5EpWTQrizBEDk+hZTadx07nNzY0DLW3IMiR2yo\n\
lPEljBIFQzboyaPVc0CuUMjB/+omo4IIzucUs8kCgYA2dvcmYf6GaWVp8NpU8WKE\n\
Lm0jWhGDWgE7bmFhQp+YPPgkYLGR+WyLHx1tREjynxdElZsQ47nZQjZXBWUg8M+b\n\
Fiu2LEgGYND442V+zp1JIF8bL5Dh3t8kSILreh6PszG4vTqNjrj8TYz/DDySykJ6\n\
gUN1GEJOsxabYn03J3vnsQKBgQDIyop3OXzQDDkfJPTQRCeeC+vurU/VXipIY/d/\n\
fNiwMzFJOokbQRXmhG8ng7ofw6zhvScuqi1+IzixKxSQWUpVmR+bggRWqB5dezV8\n\
JOa82VYUzX/EGiLP+gzo1H9CvHf36sAY0m0w6hkojtskJxN1ZiVlhwQMLcRCvUjr\n\
9ftfWQKBgAto1VuXpHnBAb+sGvmZOzGsqlor8kLz1X6OaMdypaDLQkIh4hVJKPri\n\
YRQL8OiW9gO1yPnJ0JpUQpUbhvpjXozoRlnTfdbjow7q469e9r12KYJBcktp4YFc\n\
KwdgCXgjLDwueFEWT/LVucn4xY/C7nnNO2WshMRVtFQNA/9KN+tl\n\
-----END RSA PRIVATE KEY-----';

		var private = forge.pki.privateKeyFromPem(pem_private);

		var temp = ab2str(recvInfo.data);
		var data = private.decrypt(temp);;
    	document.getElementById("untexte").innerHTML = "RECU :" + data;
    	sendextension(ab2str(recvInfo.data));
	});
}

function send(laddress, leport, ledata){

	var MaSocket;

	pem_public = '-----BEGIN PUBLIC KEY-----\n\
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4Y/5p8td5Xr22l+O9Oz7\n\
gw8h/p1W7ixusYgYz3tffGEJJODf0mO5Cc1F8u6/Szmj0m0ELmWo2xLEJ0pNJvu1\n\
+u+omn6vcAYXtQfVbpxBY7194+gcBD3ZqQWne29fxfyMfm80lUZO6RCnRIY97tsP\n\
RS2eTKqq3sSilBeyB7TQTnk+4lrLhEatvI9PQsZQCLrk0RrrnZVQCx7R15CJLi5H\n\
R1FvrryrvtKMto/cQPyztYQ/XeG9BzVn6jTArG0nScd5Sujls7W8p4VFv1Up7PXC\n\
RZyP3KXbvVsP6VujNVQGSuWBrifnDmKj8tF9iTJCdvYxzT0wwcLinnb5JWbrtYt4\n\
DQIDAQAB\n\
-----END PUBLIC KEY-----';

	/*pem_private_aur = '-----BEGIN RSA PRIVATE KEY-----\n\
MIIEogIBAAKCAQEA4Y/5p8td5Xr22l+O9Oz7gw8h/p1W7ixusYgYz3tffGEJJODf\n\
0mO5Cc1F8u6/Szmj0m0ELmWo2xLEJ0pNJvu1+u+omn6vcAYXtQfVbpxBY7194+gc\n\
BD3ZqQWne29fxfyMfm80lUZO6RCnRIY97tsPRS2eTKqq3sSilBeyB7TQTnk+4lrL\n\
hEatvI9PQsZQCLrk0RrrnZVQCx7R15CJLi5HR1FvrryrvtKMto/cQPyztYQ/XeG9\n\
BzVn6jTArG0nScd5Sujls7W8p4VFv1Up7PXCRZyP3KXbvVsP6VujNVQGSuWBrifn\n\
DmKj8tF9iTJCdvYxzT0wwcLinnb5JWbrtYt4DQIDAQABAoIBABFZkrl+YhWRtMUt\n\
ToC2bc4x7sp37cTaNBWBw27KLZkSmbJ1faHgO85uNLAv/xTZNSmtawHqnedj9SSU\n\
iYSzHddUceKYVgRG47HwDVG5wSnb3IAYTXdiDoj6v1w2P+apu2DKSwAkbVNuDX+u\n\
17q0rOMEVEXPZt9Fvr+nZvFCzjcK5XykoSz0LGYebonF+8APJbJ4GmAepLdOt1GA\n\
1ro1BLbXVqnNKJ9HiGwLV6ex8xWkyQNnM3bnNtu8QGqpPC13TYOJrdpwoDFUueXb\n\
a3+XInsG50hNvNbPaalq35pd4YyT1qq3zhOqYFMrzV9IFHQ1BlxH/CD90We6IOnq\n\
NMWHbwECgYEA8SUb0KzFXkfTog+kixPAzpbQby2rbzHfMdTE4sYt90gp1NwlwKkj\n\
erLWuU3bRuGyjGcirRIlsdb8EzokrqdDbianc283FD/nSPgiKoasalYLL20ffjDm\n\
vo7GRPmgeKIKblUreZ5b6z65yi8ezhsUcGpqrE43hILonn7NEDmST80CgYEA73Ug\n\
ntfXxuJVKXTrwoRlGaZRWYmb7xINrEoWcUjIQFzMBDEBVtNARpjV8jISTYO9dC+P\n\
8SBYZQbtGpWyafk60IukJlcOpd4mbmbyvQZf/Udnaevxj/LsPp+SN+4hWgpKLXkO\n\
q1Gieac85bmTskzgWv2k15XTdcu/euVqCP/zCUECgYA+63vSewIUk5E42/QHBeRt\n\
AxTnrXbp0I14JxgoQ6WCvCWOENMY7gj/3uH//7yTRhicYdy+Y9nKCVpEegtQNvx1\n\
JUjT6dTpR7NFatkfV3xtUn4gpcxt1LygRAifvrKMR1uJZletqBA71WYMxza2eIJg\n\
wqOKye3aeX3QvS0sapkukQKBgEdRbDDC+moquNCLGTiq8+2KwonXWVD/4ICi5EJD\n\
OhkpSj4pVkvEyUz9ciMbVKYviXqUO9vGFW2pfW7AjQ3RA/pezLn6jctK+clB8iPo\n\
RSiLXrqGYkDMSh5wqjzsOJS3odYfSwYtXyW6cIG/HsUo7l1LVBA9eGiKEXKJ52Xc\n\
zUbBAoGAR46BfFtaO3HUQfUdKJglt5ngfDqv9YC7U3qAcXTYik3XUDaPmFLWtFl3\n\
qo3xDEF/JA6Idjv1/PzVyvFsos0sZf1aFwnmlULnerD16Q8yZOiTeQTkWLHrQdSx\n\
VHsP7F7POMOOgynBDRgl/QKWaDYnxOptBY7tAMFV+eENxuSs8hE=\n\
-----END RSA PRIVATE KEY-----';*/

	var pub = forge.pki.publicKeyFromPem(pem_public);

	//var private_aur = forge.pki.privateKeyFromPem(pem_private_aur);

	//var pub = forge.pki.setRsaPublicKey(private_aur.n, private_aur.e);

    /*var buffer = forge.util.createBuffer(ledata, 'utf8');

    var binaryString = buffer.getBytes();

    var encrypted = pub.encrypt(binaryString);*/
    
    var encrypted = pub.encrypt(ledata);

    var base = forge.util.encode64(encrypted);

    document.getElementById("untexte5").innerHTML = toHex(encrypted);
    document.getElementById("untexte6").innerHTML = toHex(base);

	chrome.sockets.tcp.create({}, function(createInfo) {
    MaSocket = createInfo.socketId;
    
    chrome.sockets.tcp.connect(MaSocket,
    laddress, parseInt(leport, 10), function(){
			chrome.sockets.tcp.send(MaSocket, str2ab(base), function(){
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

function toHex(str) {
	var hex = '';
	for(var i=0;i<str.length;i++) {
		hex += ''+str.charCodeAt(i).toString(16);
	}
	return hex;
}