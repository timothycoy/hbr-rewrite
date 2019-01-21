chrome.browserAction.onClicked.addListener(() => {
  chrome.history.deleteAll(() => {});
  fetch('http://feeds.hbr.org/harvardbusiness')
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(data => {
      data.querySelectorAll("feed>entry").forEach(entry => {
        chrome.history.addUrl({
          url: entry.lastChild.innerHTML
        }, () => {})
      });
    })
});
