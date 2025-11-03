let popup = null;
let svgData = null;
let highlightedGroup = null;
const svgUrl = chrome.runtime.getURL('svg/BlankMap-World.svg');

// Fetch SVG data once
fetch(svgUrl)
  .then(response => response.text())
  .then(data => {
    svgData = data;
  })
  .catch(error => {
    console.error('Error fetching SVG:', error);
  });

document.addEventListener('mouseover', (event) => {
  let matchedCountryName = null;
  let isoCode = null;
  let popupX = event.pageX + 10;
  let popupY = event.pageY + 10;

  if (document.caretRangeFromPoint) {
    const range = document.caretRangeFromPoint(event.clientX, event.clientY);
    if (range && range.startContainer.nodeType === Node.TEXT_NODE) {
      const textNode = range.startContainer;
      const fullText = textNode.textContent;
      const currentOffset = range.startOffset;

      // Sort countries by length in descending order to prioritize longer matches
      const countries = Object.keys(countryNameToAlpha2).sort((a, b) => b.length - a.length);

      for (const country of countries) {
        // Create a regex to match the whole word, case-insensitive
        const regex = new RegExp(`\\b${country}\\b`, 'gi'); // 'g' for global to find all matches
        let match;
        while ((match = regex.exec(fullText)) !== null) {
          const matchStart = match.index;
          const matchEnd = match.index + match[0].length;

          // Check if the current hover offset is within this matched country name
          if (currentOffset >= matchStart && currentOffset <= matchEnd) {
            matchedCountryName = country;
            isoCode = countryNameToAlpha2[country];

            // Get bounding rectangle of the matched word for precise popup positioning
            const wordRange = document.createRange();
            wordRange.setStart(textNode, matchStart);
            wordRange.setEnd(textNode, matchEnd);
            const rect = wordRange.getBoundingClientRect();
            popupX = rect.right + window.scrollX + 5;
            popupY = rect.top + window.scrollY + 5;
            break; // Found the longest match, exit inner loop
          }
        }
        if (matchedCountryName) break; // Found a match, exit outer loop
      }
    }
  }

  console.log('Matched Country Name:', matchedCountryName); // Debugging

  if (matchedCountryName && isoCode && svgData) {
    if (popup) {
      popup.remove();
      popup = null;
    }

    popup = document.createElement('div');
    popup.style.position = 'absolute';
    popup.style.backgroundColor = 'yellow';
    popup.style.border = '1px solid black';
    popup.style.padding = '5px';
    popup.style.zIndex = '9999';
    popup.style.maxWidth = '300px'; // Limit popup width
    popup.style.height = 'auto';

    // Add country name to popup
    const countryNameElement = document.createElement('div');
    countryNameElement.textContent = matchedCountryName; // Use the matched name
    countryNameElement.style.marginBottom = '5px';
    popup.appendChild(countryNameElement);

    // Create SVG container within popup
    const svgContainer = document.createElement('div');
    svgContainer.innerHTML = svgData;
    svgContainer.style.width = '100%';
    svgContainer.style.height = 'auto';
    popup.appendChild(svgContainer);

    document.body.appendChild(popup);

    // Apply scaling to the SVG element itself within the container
    const svgElement = svgContainer.querySelector('svg');
    if (svgElement) {
      svgElement.style.width = '100%';
      svgElement.style.height = '100%';
      svgElement.setAttribute('viewBox', '0 0 2000 1000'); // Assuming a viewBox, adjust if necessary
    }

    // Highlight country within the newly added SVG
    const countryGroup = popup.querySelector(`#${isoCode}`);
    console.log('Country group element:', countryGroup); // Debugging

    if (countryGroup) {
      highlightedGroup = countryGroup; // Store the highlighted group
      const paths = countryGroup.querySelectorAll('path');
      paths.forEach(path => {
        path.style.fill = '#FF0000'; // Red highlight
        path.style.stroke = '#000000';
        path.style.strokeWidth = '1px';
      });

      // Position the popup near the hovered text
      popup.style.left = `${popupX}px`;
      popup.style.top = `${popupY}px`;
    }
  } else {
    // If no country is matched, ensure any existing popup is removed
    if (popup) {
      popup.remove();
      popup = null;
    }
    if (highlightedGroup) {
      const paths = highlightedGroup.querySelectorAll('path');
      paths.forEach(path => {
        path.style.fill = ''; // Remove fill
        path.style.stroke = ''; // Remove stroke
        path.style.strokeWidth = ''; // Remove stroke width
      });
      highlightedGroup = null;
    }
  }
});

document.addEventListener('mouseout', (event) => {
  // Only remove popup and highlight if the mouse is truly leaving the country name
  // This is a simplified mouseout, a more robust solution would track relatedTarget
  if (popup) {
    popup.remove();
    popup = null;
  }
  if (highlightedGroup) {
    const paths = highlightedGroup.querySelectorAll('path');
    paths.forEach(path => {
      path.style.fill = ''; // Remove fill
      path.style.stroke = ''; // Remove stroke
      path.style.strokeWidth = ''; // Remove stroke width
    });
    highlightedGroup = null;
  }
});