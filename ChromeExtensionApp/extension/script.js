  /**********************************************
  Mis en place du listener pour detecter les
  elements et evenements de la page web de
  l'extension
  **********************************************/
document.addEventListener('DOMContentLoaded', function() {

  var insertButton = document.getElementById('insert');
  var recupButton = document.getElementById('recup');

  var situation;
  var AppID = "aeohpfnohkhjdofoohedjehheidmobeb";

  /**********************************************
  Detection du clic de l'utilisateur pour inserer
  un nouveau mot de passe
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
    
    envoiapp(message, AppID);

    });
  }, false);

  /**********************************************
  Detection du clic de l'utilisateur pour recupere
  un mot de passe
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

  }, false);
}, false);

  /**********************************************
  Envoi des informations vers l'application
  Google Chrome
  **********************************************/


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

  /**********************************************
  Attente de la réponse de l'application
  Google Chrome
  **********************************************/

function jattend()
{
    chrome.runtime.onMessageExternal.addListener(
    function(message, sender, sendResponse) {

      var blob = new Blob([message.blob], {type: message.filetype});

      document.write(message.string);

      sendResponse('Processed file');
    });
}