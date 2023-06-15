function addElements() {
  // Check if the required elements exist on the page
  const loginLink = document.querySelector('a.nav-link[title="Login"]');
  const joinLink = document.querySelector(
    'a.nav-link[href="https://join-lemmy.org"]'
  );
  const createPostLink = document.querySelector(
    'a.btn.btn-secondary.btn-block.mb-2[href^="/create_post?community_id="]'
  );
  const existingSubscribeLink = document.querySelector('#homeLemmyLink');

  if (loginLink && joinLink && createPostLink && !existingSubscribeLink) {
    // Extract current server and community name from the URL
    const currentURL = window.location.href;
    const regexResult = currentURL.match(/https?:\/\/([^/]+)\/c\/([^/]+)/);
    if (!regexResult) {
      console.error(
        'Unable to extract current server and community name from URL.'
      );
      return;
    }
    const currentServer = regexResult[1];
    const communityName = regexResult[2];

    // Get home server URL from extension options
    chrome.storage.sync.get({ homeServer: 'lemmy.world' }, function (result) {
      const homeServer = result.homeServer;
      if (!homeServer) {
        console.error('Home server URL not set in extension options.');
        return;
      }

      // Create the subscribe link
      const subscribeLink = document.createElement('a');
      subscribeLink.id = 'homeLemmyLink';
      subscribeLink.classList.add('btn', 'btn-secondary', 'btn-block', 'mb-2');
      subscribeLink.href = `https://${homeServer}/search/q/!${communityName}%40${currentServer}/type/All/sort/TopAll/listing_type/All/community_id/0/creator_id/0/page/1`;
      subscribeLink.textContent = `Search on ${homeServer}`;

      // Insert the subscribe link before the create post link
      createPostLink.parentNode.insertBefore(subscribeLink, createPostLink);
    });
  }
}
var previous_lemmy_url = '';
var mutationObserver = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (location.href != previous_lemmy_url) {
      previous_lemmy_url = location.href;
      setTimeout(addElements, 500);
    }
  });
});
mutationObserver.observe(document.documentElement, {
  childList: true,
  subtree: true
});
addElements();
