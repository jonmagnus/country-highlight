let isEnabled = true;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ isEnabled: true });
});

chrome.action.onClicked.addListener((tab) => {
  isEnabled = !isEnabled;
  chrome.storage.local.set({ isEnabled: isEnabled });
});