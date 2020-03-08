const openWebsite = () => {
  chrome.tabs.create({
    'url': 'https://www.grpm.org/'
  });
};

const openNewTab = () => {
  chrome.tabs.create({
    'url': '/newtab.html'
  });
};

document.getElementById('open-website').addEventListener('click', openWebsite());
