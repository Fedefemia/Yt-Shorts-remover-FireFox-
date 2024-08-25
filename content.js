(function () {
  const originalDisplay = new Map();

  function hideStyleScopeElements() {
    const elements = document.querySelectorAll('.style-scope ytd-reel-shelf-renderer');
    elements.forEach(el => {
      if (!originalDisplay.has(el)) {
        originalDisplay.set(el, el.style.display || '');
      }
      el.style.display = 'none';
    });
  }

  function hideShortsTitles() {
    const elements = document.querySelectorAll('[title="Shorts"]');
    elements.forEach(el => {
      if (!originalDisplay.has(el)) {
        originalDisplay.set(el, el.style.display || '');
      }
      el.style.display = 'none';
    });
  }

  function showElements() {
    originalDisplay.forEach((display, el) => {
      el.style.display = display;
    });
    originalDisplay.clear();
  }

  function checkStatus() {
    browser.storage.local.get(['styleScopeEnabled', 'shortsTitleEnabled']).then((data) => {
      if (data.styleScopeEnabled !== false) {
        hideStyleScopeElements();

        const observer1 = new MutationObserver(hideStyleScopeElements);
        observer1.observe(document.body, { childList: true, subtree: true });
      }

      if (data.shortsTitleEnabled !== false) {
        hideShortsTitles();

        const observer2 = new MutationObserver(hideShortsTitles);
        observer2.observe(document.body, { childList: true, subtree: true });
      }
    });
  }

  checkStatus();

  browser.runtime.onMessage.addListener((request) => {
    if (request.styleScopeEnabled !== undefined) {
      if (request.styleScopeEnabled) {
        hideStyleScopeElements();
      } else {
        showElements();
      }
    }

    if (request.shortsTitleEnabled !== undefined) {
      if (request.shortsTitleEnabled) {
        hideShortsTitles();
      } else {
        showElements();
      }
    }
  });
})();
