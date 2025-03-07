chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkTab') {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const isYouTube = tabs[0]?.url?.includes('youtube.com/watch') || false;
      
      if (isYouTube) {
        try {
          await chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['content.js']
          });
        } catch (error) {
          console.error('Failed to inject content script:', error);
        }
      }
      
      sendResponse({ isYouTube });
    });
    return true;
  }
});
