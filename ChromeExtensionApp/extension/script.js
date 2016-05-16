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

    document.write("Attente...");

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

    document.write("Attente...");

    var Hurl = tab.url;

    situation = "get";

    var message = {
        url: Hurl,
        address: Haddress,
        port: Hport,
        cas: situation
    };
    
    envoiapp(message, AppID);

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

    document.write("<br>");
    document.write(message.string);
    document.write("<br>");
    var temp = message.string.split("*");

    if (temp[0] == "SAVE")
    {
      if(temp[1] == "DONE")
        document.write("Sauvegarde reussie !");
      else
        document.write("Erreur durant la sauvegarde !");
    }
    else if(temp[0] == "GET")
    {
      if(temp[1] == "ERROR")
        document.write("Erreur de recuperation !");
      else
      {
        var decoupe = temp[1].split(";");
        document.write("Login = " + decoupe[0]);
        document.write("<br>");
        var decoupesuite = decoupe[1].split("$");
        document.write("Mot de passe = " + decoupesuite[0]);
      }
    }
    else
      document.write("Erreur : Serveur Java");

      sendResponse('Processed file');
    });
}