let scrapingInterval = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startScraping") {
    console.log("Scraping started...");
    if (!scrapingInterval) {
      scrapingInterval = setInterval(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs.length > 0) {
            chrome.scripting.executeScript(
              {
                target: { tabId: tabs[0].id },
                function: scrapeData,
              },
              (result) => {
                if (results && results[0]?.result) {
                  sendToTelegram(results[0].result);
                }
              }
            );
          }
        });
      }, 15000); // Run every 15 seconds
    }
  } else if (message.action === "stopScraping") {
    console.log("Scraping stopped...");
    if (scrapingInterval) {
      clearInterval(scrapingInterval);
      scrapingInterval = null;
    }
  }
});

function scrapeData() {
  chrome.runtime.sendMessage({
    action: "scrapedData",
    data: window.location.href,
  });
}

function sendToTelegram(data) {
  const botToken = "YOUR_BOT_TOKEN";
  const chatId = "YOUR_CHAT_ID";
  const message = `Scraped Data: ${JSON.stringify(data)}`;

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  })
    .then((response) => response.json())
    .then((json) => console.log("Message sent to Telegram:", json))
    .catch((err) => console.error("Error sending to Telegram:", err));
}
