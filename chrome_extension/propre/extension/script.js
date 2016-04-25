document.addEventListener('DOMContentLoaded', function() {

  var insertButton = document.getElementById('insert');
  var recupButton = document.getElementById('recup');

  var situation;
  var laserExtensionId = "oogeieagcilknpjlabenfknbddpigkna";

  /**********************************************
  **********************************************/

  insertButton.addEventListener('click', function() {


    var Huser = document.getElementById('lusername').value;
    var Hmdp = document.getElementById('lpassword').value;
    var Haddress = document.getElementById('lip').value;
    var Hport = document.getElementById('lport').value;

    chrome.tabs.getSelected(null, function(tab) {

    document.write("YOLO");

    var Hurl = tab.url;

    situation = "save";

    var message = {
        username: Huser,
        mdp: Hmdp,
        url: Hurl,
        address: Haddress,
        port: Hport,
        cas: situation
    };
    
    envoiapp(message, laserExtensionId);

    });
  }, false);

  /**********************************************
  **********************************************/

  recupButton.addEventListener('click', function() {

    var Haddress = document.getElementById('lip').value;
    var Hport = document.getElementById('lport').value;

    chrome.tabs.getSelected(null, function(tab) {

    document.write("YOLO2");

    var Hurl = tab.url;

    situation = "get";

    var message = {
        url: Hurl,
        address: Haddress,
        port: Hport,
        cas: situation
    };
    
    envoiapp(message, laserExtensionId);

    });

    /**********************************************
    **********************************************/

  }, false);
}, false);


function envoiapp(ledata, lid){
    chrome.runtime.sendMessage(lid, ledata, function(result) {
        if (chrome.runtime.lastError) {
            console.warn('Error: ' + chrome.runtime.lastError.message);
        } else {
            console.log('Reply from app: ', result);
        }
        jattend();
    });

}



function jattend()
{
    chrome.runtime.onMessageExternal.addListener(
    function(message, sender, sendResponse) {

      var blob = new Blob([message.blob], {type: message.filetype});

      document.write(message.string);

      sendResponse('Processed file');
    });
}