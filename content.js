chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "scrapeData") {
    const data = extractDataFromPage();
    sendResponse({ data });
  }
});

function extractDataFromPage() {
  // Example: scrape all links from the page
  const links = Array.from(document.querySelectorAll("a")).map(
    (link) => link.href
  );
  return { links };
}
