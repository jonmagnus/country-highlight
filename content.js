let isEnabled = true;
let popup = null;

chrome.storage.local.get('isEnabled', (data) => {
  isEnabled = data.isEnabled;
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.isEnabled) {
    isEnabled = changes.isEnabled.newValue;
  }
});

document.addEventListener('mouseover', (event) => {
  if (!isEnabled) {
    return;
  }

  const text = event.target.textContent.trim();
  if (countries.includes(text)) {
    popup = document.createElement('div');
    popup.textContent = text;
    popup.style.position = 'absolute';
    popup.style.backgroundColor = 'yellow';
    popup.style.border = '1px solid black';
    popup.style.padding = '5px';
    popup.style.zIndex = '9999';
    popup.style.left = `${event.pageX + 10}px`;
    popup.style.top = `${event.pageY + 10}px`;
    document.body.appendChild(popup);
  }
});

document.addEventListener('mouseout', (event) => {
  if (popup) {
    popup.remove();
    popup = null;
  }
});