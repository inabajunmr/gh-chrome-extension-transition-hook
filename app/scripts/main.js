`use strict`;

// GitHub has async compile dom so kick script by ajax http access via background
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log(message);
  return;
});
