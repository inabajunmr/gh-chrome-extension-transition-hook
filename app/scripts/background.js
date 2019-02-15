`use strict`;

class PageType {
  constructor(urlPattern, type) {
    this.urlPattern = urlPattern;
    this.type = type;
  }
}

class PageTypeMap {
  constructor(pageTypes) {
    this.pageTypes = pageTypes;
  }

  getMatchType(url) {
    let result = this.pageTypes.filter(t => t.urlPattern.test(url));
    if (result.length === 0) {
      return null;
    }

    return result[0].type;
  }
}

const PR_LIST_PATH_REGEX = /^https:\/\/github.com\/.*\/pulls.*/;
const PR_FILES_PATH_REGEX = /^https:\/\/github.com\/.*\/pull\/[0-9]+\/files.*/;
const PR_COMMITS_PATH_REGEX = /^https:\/\/github.com\/.*\/pull\/[0-9]+\/commits.*/;
const PR_CHECKS_PATH_REGEX = /^https:\/\/github.com\/.*\/pull\/[0-9]+\/checks.*/;
const PR_PATH_REGEX = /^https:\/\/github.com\/.*\/pull\/[0-9]+$/;

const ISSUE_LIST_PATH_REGEX = /^https:\/\/github.com\/.*\/issues[^\/]*$/;
const ISSUE_PATH_REGEX = /^https:\/\/github.com\/.*\/issues\/[0-9]+/;

const PAGE_TAPES = [
  new PageType(PR_LIST_PATH_REGEX, "PR_LIST"),
  new PageType(PR_FILES_PATH_REGEX, "PR_FILES"),
  new PageType(PR_COMMITS_PATH_REGEX, "PR_COMMITS"),
  new PageType(PR_CHECKS_PATH_REGEX, "PR_CHECKS"),
  new PageType(PR_PATH_REGEX, "PR"),
  new PageType(ISSUE_LIST_PATH_REGEX, "ISSUE_LIST"),
  new PageType(ISSUE_PATH_REGEX, "ISSUE")
];

const PAGE_TYPE_MAP = new PageTypeMap(PAGE_TAPES);

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url == null) {
    return;
  }

  kick(PAGE_TYPE_MAP.getMatchType(changeInfo.url));
});

function kick(type) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, type, function(response) {});
  });
}
