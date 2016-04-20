document.addEventListener('DOMContentLoaded', function() {

  var checkPageButton = document.getElementById('checkPage');

  checkPageButton.addEventListener('click', function() {


    var Haddress = document.getElementById('lip').value;
    var Hport = document.getElementById('lport').value;

    chrome.tabs.getSelected(null, function(tab) {

    document.write("YOLO");

    var Hurl = tab.url;

    var message = {
        url: Hurl,
        address: Haddress,
        port: Hport
    };

    var laserExtensionId = "oogeieagcilknpjlabenfknbddpigkna";

	chrome.runtime.sendMessage(laserExtensionId, message, function(result) {
        if (chrome.runtime.lastError) {
            console.warn('Error: ' + chrome.runtime.lastError.message);
        } else {
            console.log('Reply from app: ', result);
        }
        jattend();
    });
    
    });
  }, false);
}, false);

function jattend()
{
    chrome.runtime.onMessageExternal.addListener(
    function(message, sender, sendResponse) {

      var blob = new Blob([message.blob], {type: message.filetype});

      document.write(message.string);

      sendResponse('Processed file');
    });
}