Lemmy Home Instance Helper
----

This extension adds a "Search on [instancename]" button to community pages when you are not logged in to a lemmy instance.

Currently the extension checks for a nav link to https://join-lemmy.org in the footer, the "Login" link in the header, and the "Create a post" link.  The "Search on [instancename]" button is added above the create a post link and uses the same theme as the site you're on.

Thanks to @ayan4m1 for the Firefox port!  It's now available here: https://addons.mozilla.org/en-US/firefox/addon/lemmy-home-helper/

I'm still working on getting it approved for Chrome.  They really don't like the `*://*/*` host permision.
