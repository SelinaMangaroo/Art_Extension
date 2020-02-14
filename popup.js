function openWebsite() {
  chrome.tabs.create({
    'url': 'https://www.brooklynmuseum.org/'
  });
}

function openNewTab() {
  chrome.tabs.create({
    'url': '/newtab.html'
  });
}

document.getElementById('open-website').addEventListener('click', openWebsite());
