chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('page.html', {
    'bounds': {
      'width': 400,
      'height': 400,
      'left': 0,
      'top': 0
    }
  });

  /*chrome.app.window.create('page2.html', {
    'bounds': {
      'width': 400,
      'height': 400,
      'left': 400,
      'top': 0
    }
  });*/
});