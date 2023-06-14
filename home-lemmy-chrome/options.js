// options.js
document.addEventListener('DOMContentLoaded', function() {
  var optionsForm = document.getElementById('optionsForm');
  var homeServerInput = document.getElementById('homeServerInput');

  if (optionsForm && homeServerInput) {
    // Load the current value of homeServer from Chrome storage
    chrome.storage.sync.get({ homeServer: 'lemmy.world' }, function(result) {
      homeServerInput.value = result.homeServer;
    });

    optionsForm.addEventListener('submit', function(event) {
      event.preventDefault();
      var homeServer = homeServerInput.value;

      // Save homeServer to Chrome storage
      chrome.storage.sync.set({ homeServer: homeServer }, function() {
        alert('Options saved successfully!');
      });
    });
  } else {
    console.error('Options form or homeServer input element not found.');
  }
});
