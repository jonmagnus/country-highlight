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

      const originalWidth = parseFloat(svgElement.getAttribute('width')) || 2000;
      const originalHeight = parseFloat(svgElement.getAttribute('height')) || 1000;
      const desiredAspectRatio = originalWidth / originalHeight;

      let targetElement = svgElement.querySelector(`#${isoCode}`);
      let elementsToHighlight = [];

      if (targetElement) {
        if (targetElement.tagName.toLowerCase() === 'g') {
          // If it's a group, highlight all its child paths
          elementsToHighlight = targetElement.querySelectorAll('path');
        } else if (targetElement.tagName.toLowerCase() === 'path') {
          // If it's a path, highlight it directly
          elementsToHighlight = [targetElement];
        }
      }

      if (elementsToHighlight.length > 0) {
        // Calculate bounding box for the entire country (group or single path)
        let bbox;
        if (targetElement.tagName.toLowerCase() === 'g') {
          bbox = targetElement.getBBox();
        } else { // It's a path
          bbox = targetElement.getBBox();
        }

        const padding = 50; // Padding in SVG units
        let viewBoxMinX = bbox.x - padding;
        let viewBoxMinY = bbox.y - padding;
        let viewBoxWidth = bbox.width + 2 * padding;
        let viewBoxHeight = bbox.height + 2 * padding;

        const currentAspectRatio = viewBoxWidth / viewBoxHeight;

        if (currentAspectRatio > desiredAspectRatio) {
          const newViewBoxHeight = viewBoxWidth / desiredAspectRatio;
          viewBoxMinY = bbox.y - (newViewBoxHeight - bbox.height) / 2;
          viewBoxHeight = newViewBoxHeight;
        } else if (currentAspectRatio < desiredAspectRatio) {
          const newViewBoxWidth = viewBoxHeight * desiredAspectRatio;
          viewBoxMinX = bbox.x - (newViewBoxWidth - bbox.width) / 2;
          viewBoxWidth = newViewBoxWidth;
        }

        svgElement.setAttribute('viewBox', `${viewBoxMinX} ${viewBoxMinY} ${viewBoxWidth} ${viewBoxHeight}`);

        highlightedGroup = targetElement; // Store the highlighted element (group or path)
        elementsToHighlight.forEach(path => {
          path.style.fill = '#FF0000'; // Red highlight
          path.style.stroke = '#000000';
          path.style.strokeWidth = '1px';
        });

        popup.style.left = `${popupX}px`;
        popup.style.top = `${popupY}px`;
      } else {
        // If no country element is found, remove popup and clear highlight
        if (popup) {
          popup.remove();
          popup = null;
        }
        if (highlightedGroup) {
          // Clear previous highlight if any
          if (highlightedGroup.tagName.toLowerCase() === 'g') {
            const paths = highlightedGroup.querySelectorAll('path');
            paths.forEach(path => {
              path.style.fill = '';
              path.style.stroke = '';
              path.style.strokeWidth = '';
            });
          } else if (highlightedGroup.tagName.toLowerCase() === 'path') {
            highlightedGroup.style.fill = '';
            highlightedGroup.style.stroke = '';
            highlightedGroup.style.strokeWidth = '';
          }
          highlightedGroup = null;
        }
      }
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
    if (highlightedGroup.tagName.toLowerCase() === 'g') {
      const paths = highlightedGroup.querySelectorAll('path');
      paths.forEach(path => {
        path.style.fill = ''; // Remove fill
        path.style.stroke = ''; // Remove stroke
        path.style.strokeWidth = ''; // Remove stroke width
      });
    } else if (highlightedGroup.tagName.toLowerCase() === 'path') {
      highlightedGroup.style.fill = '';
      highlightedGroup.style.stroke = '';
      highlightedGroup.style.strokeWidth = '';
    }
    highlightedGroup = null;
  }
});