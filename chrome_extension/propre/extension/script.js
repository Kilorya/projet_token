document.addEventListener('DOMContentLoaded', function() {

  var checkPageButton = document.getElementById('checkPage');

  checkPageButton.addEventListener('click', function() {


    var Haddress = document.getElementById('lip').value;
    var Hport = document.getElementById('lport').value;

    chrome.tabs.getSelected(null, function(tab) {

    document.write("YOLO");

    var Hurl = tab.url;

    document.write(Haddress);

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
    });
    
    });
  }, false);
}, false);