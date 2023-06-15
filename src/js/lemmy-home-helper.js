function addElements() {
  // Check if the required elements exist on the page
  const loginLink = document.querySelector('a.nav-link[title="Login"]');
  const joinLink = document.querySelector(
    'a.nav-link[href="https://join-lemmy.org"]'
  );
  const createPostLink = document.querySelector(
    'div.card > div.card-body > a.btn.btn-secondary.btn-block.mb-2[href^="/create_post?community"]'
  );
  const existingSubscribeLink = document.querySelector('#homeLemmyLink');
  const communityLink = document.querySelector(
    'div.card > div.card-body > div > a.text-muted[href^="/c/"][title^="!"][rel="noopener nofollow"]'
  );

  if (loginLink && joinLink && createPostLink && communityLink && !existingSubscribeLink) {
    // Extract current server and community name from the community link
    const communityResult = communityLink.href.match(/https?:\/\/([^/]+)\/c\/([^/@]+)/);
    if (!communityResult) {
      console.error(
        'Unable to extract community from sidebar link.'
      );
      return;
    }
    const currentServer = communityResult[1];
    const communityName = communityResult[2];

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
