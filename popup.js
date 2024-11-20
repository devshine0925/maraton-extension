document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start");
  const stopButton = document.getElementById("stop");

  startButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "startScraping" });
  });

  stopButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "stopScraping" });
  });
});
