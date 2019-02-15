# gh-chrome-extension-transition-hook
On GitHub, Chrome extension wasn't kicked contents script by common transition. 
This repository is sample chrome extension for GitHub contents script.

## How?

1. Extension hook chrome.tabs.onUpdated on background.js and observe URL.
2. If URL is GitHub PR or Issue, send Message to Tab.
3. Receive messege on main.js.
4. Message is type of page.

## TODO

When user goes to pr list with condition like "is:open", browser temporary transitions to issue list page.
So when user goes to pr list with condition, this extension kick contents script twice with "ISSUE_LIST" and "PR_LIST".
