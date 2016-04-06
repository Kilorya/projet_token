chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('page.html', {
        id: "mainwin",
    innerBounds: {
      width: 380,
      height: 280
    }
  });

  chrome.app.window.create('page2.html', {
        id: "mainwin",
    innerBounds: {
      width: 380,
      height: 280
    }
  });

});

