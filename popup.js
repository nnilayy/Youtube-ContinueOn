document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
  
      if (tab.url && tab.url.includes('youtube.com/watch')) {
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            func: getCurrentTime,
          },
          (results) => {
            if (results && results[0] && results[0].result !== undefined) {
              const currentTime = results[0].result;
              const url = new URL(tab.url);
              url.searchParams.set('t', Math.floor(currentTime));
              generateQRCode(url.toString());
            } else {
              document.getElementById('qrcode').innerText =
                'Could not retrieve video time.';
            }
          }
        );
      } else {
        document.getElementById('qrcode').innerText =
          'This is not a YouTube video page.';
      }
    });
  });
  
  function getCurrentTime() {
    const video = document.querySelector('video');
    if (video) {
      return video.currentTime;
    } else {
      return 0;
    }
  }
  
  function generateQRCode(url) {
    const qrcodeContainer = document.getElementById('qrcode');
    qrcodeContainer.innerHTML = '';
    new QRCode(qrcodeContainer, {
      text: url,
      width: 256,
      height: 256,
    });
  }
  