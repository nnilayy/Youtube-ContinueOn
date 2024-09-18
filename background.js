// background.js

chrome.action.onClicked.addListener((tab) => {
    // Check if the current tab is a YouTube video page
    if (tab.url && tab.url.includes('youtube.com/watch')) {
      // Send a message to the content script to trigger the QR code overlay
      chrome.tabs.sendMessage(tab.id, { action: 'showQRCodeOverlay' });
    } else {
      // Optional: Show a notification if not on a YouTube video page
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'YouTube QR Generator',
        message: 'Please navigate to a YouTube video page to use this extension.'
      });
    }
  });
  