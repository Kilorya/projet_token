document.addEventListener('DOMContentLoaded', function() {

  var checkPageButton = document.getElementById('checkPage');

  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {

    var Username = document.getElementById('lusername');

    var Password = document.getElementById('lpassword');

    var Mapplet = document.getElementById('lapplet').setTest(2);

    //document.write(Mapplet);

    //var resultat = Mapplet.test;

    //var bonjour = document.lapplet.test;

    //document.write(resultat);      

	  document.write(tab.url+"<br>");
    document.write(Username.value+"<br>");
    document.write(Password.value);
    
    });
  }, false);
}, false);
