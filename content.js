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

function matchCountry(event) {
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

      const countries = Object.keys(countryNameToAlpha2).sort((a, b) => b.length - a.length);

      for (const country of countries) {
        const regex = new RegExp(`\\b${country}\\b`, 'gi');
        let match;
        while ((match = regex.exec(fullText)) !== null) {
          const matchStart = match.index;
          const matchEnd = match.index + match[0].length;

          if (currentOffset >= matchStart && currentOffset <= matchEnd) {
            matchedCountryName = country;
            isoCode = countryNameToAlpha2[country];

            const wordRange = document.createRange();
            wordRange.setStart(textNode, matchStart);
            wordRange.setEnd(textNode, matchEnd);
            const rect = wordRange.getBoundingClientRect();
            popupX = rect.right + window.scrollX + 5;
            popupY = rect.top + window.scrollY + 5;
            break;
          }
        }
        if (matchedCountryName) break;
      }
    }
  }
  return { matchedCountryName, isoCode, popupX, popupY };
}

function setupSvgHighlighting(svgElement, isoCode, popupX, popupY, isOverviewMap = false, zoomedViewBox = null) {
  svgElement.style.width = '100%';
  svgElement.style.height = '100%';

  const originalWidth = parseFloat(svgElement.getAttribute('width')) || 2000;
  const originalHeight = parseFloat(svgElement.getAttribute('height')) || 1000;
  const desiredAspectRatio = originalWidth / originalHeight;

  let targetElement = svgElement.querySelector(`#${isoCode}`);
  let elementsToHighlight = [];

  if (targetElement) {
    if (targetElement.tagName.toLowerCase() === 'g') {
      elementsToHighlight = targetElement.querySelectorAll('path');
    } else if (targetElement.tagName.toLowerCase() === 'path') {
      elementsToHighlight = [targetElement];
    }
  }

  if (!isOverviewMap && elementsToHighlight.length > 0) {
    let bbox;
    if (targetElement.tagName.toLowerCase() === 'g') {
      bbox = targetElement.getBBox();
    } else {
      bbox = targetElement.getBBox();
    }

    const padding = 50;
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

    highlightedGroup = targetElement;
    elementsToHighlight.forEach(path => {
      path.style.fill = '#FF0000';
      path.style.stroke = '#000000';
      path.style.strokeWidth = '1px';
    });

    popup.style.left = `${popupX}px`;
    popup.style.top = `${popupY}px`;
    return { minX: viewBoxMinX, minY: viewBoxMinY, width: viewBoxWidth, height: viewBoxHeight };
  } else if (isOverviewMap && zoomedViewBox) {
    // For the overview map, draw a bounding box
    svgElement.setAttribute('viewBox', `0 0 ${originalWidth} ${originalHeight}`); // Show full map

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', zoomedViewBox.minX);
    rect.setAttribute('y', zoomedViewBox.minY);
    rect.setAttribute('width', zoomedViewBox.width);
    rect.setAttribute('height', zoomedViewBox.height);
    rect.setAttribute('fill', 'none');
    rect.setAttribute('stroke', 'blue');
    rect.setAttribute('stroke-width', '5');
    svgElement.appendChild(rect);

    // Highlight the country on the overview map as well
    if (targetElement) {
      highlightedGroup = targetElement;
      elementsToHighlight.forEach(path => {
        path.style.fill = '#FF0000';
        path.style.stroke = '#000000';
        path.style.strokeWidth = '1px';
      });
    }
  }
  return null; // Return null if no viewBox was set (e.g., for overview map or no country found)
}

function displayCountryPopup(matchedCountryName, isoCode, svgData, popupX, popupY) {
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
  popup.style.maxWidth = '650px';
  popup.style.height = 'auto';
  popup.style.display = 'flex';
  popup.style.flexDirection = 'column';

  const countryNameElement = document.createElement('div');
  countryNameElement.textContent = matchedCountryName;
  countryNameElement.style.marginBottom = '5px';
  popup.appendChild(countryNameElement);

  const mapsContainer = document.createElement('div');
  mapsContainer.style.display = 'flex';
  mapsContainer.style.gap = '10px';
  popup.appendChild(mapsContainer);

  // Zoomed Map Container
  const zoomedMapContainer = document.createElement('div');
  zoomedMapContainer.innerHTML = svgData;
  zoomedMapContainer.style.width = '300px';
  zoomedMapContainer.style.height = '300px';
  zoomedMapContainer.style.border = '1px solid grey';
  mapsContainer.appendChild(zoomedMapContainer);

  // Overview Map Container
  const overviewMapContainer = document.createElement('div');
  overviewMapContainer.innerHTML = svgData;
  overviewMapContainer.style.width = '300px';
  overviewMapContainer.style.height = '300px';
  overviewMapContainer.style.border = '1px solid grey';
  mapsContainer.appendChild(overviewMapContainer);

  document.body.appendChild(popup);

  const zoomedSvgElement = zoomedMapContainer.querySelector('svg');
  const overviewSvgElement = overviewMapContainer.querySelector('svg');

  if (zoomedSvgElement && overviewSvgElement) {
    // Setup zoomed map and get its viewBox for the overview map
    const zoomedViewBox = setupSvgHighlighting(zoomedSvgElement, isoCode, popupX, popupY, false);

    // Setup overview map
    setupSvgHighlighting(overviewSvgElement, isoCode, popupX, popupY, true, zoomedViewBox);

    popup.style.left = `${popupX}px`;
    popup.style.top = `${popupY}px`;
  }
}

function hideCountryPopup() {
  if (popup) {
    popup.remove();
    popup = null;
  }
  if (highlightedGroup) {
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

document.addEventListener('mouseover', (event) => {
  const { matchedCountryName, isoCode, popupX, popupY } = matchCountry(event);
  if (matchedCountryName && isoCode && svgData) {
    displayCountryPopup(matchedCountryName, isoCode, svgData, popupX, popupY);
  }
  else {
    hideCountryPopup();
  }
});

document.addEventListener('mouseout', hideCountryPopup);