document.addEventListener('DOMContentLoaded', () => {
    const toggleStyleScopeCheckbox = document.getElementById('toggleStyleScope');
    const toggleShortsTitleCheckbox = document.getElementById('toggleShortsTitle');
  
    browser.storage.local.get(['styleScopeEnabled', 'shortsTitleEnabled']).then((data) => {
      toggleStyleScopeCheckbox.checked = data.styleScopeEnabled !== false;
      toggleShortsTitleCheckbox.checked = data.shortsTitleEnabled !== false;
    });
  
    toggleStyleScopeCheckbox.addEventListener('change', () => {
      const styleScopeEnabled = toggleStyleScopeCheckbox.checked;
      browser.storage.local.set({ styleScopeEnabled });
      
      browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, { styleScopeEnabled });
      });
    });
  
    toggleShortsTitleCheckbox.addEventListener('change', () => {
      const shortsTitleEnabled = toggleShortsTitleCheckbox.checked;
      browser.storage.local.set({ shortsTitleEnabled });
  
      browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, { shortsTitleEnabled });
      });
    });
  });
  document.getElementById('linkButton').addEventListener('click', () => {
    window.open('https://github.com/Fedefemia/Yt-Shorts-remover-FireFox-', '_blank');
  });