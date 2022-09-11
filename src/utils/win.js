module.exports = (o, n) => {
  const w = new (require('electron').BrowserWindow)({
    frame: false,
    resizable: false,
    center: true,
    backgroundColor: '#2f3136',
    webPreferences: {
      preload: require('path').join(__dirname, '..', n, 'preload.js')
    },
    ...o
  });

  const c = w.webContents;
  c.once('dom-ready', () => {
    if (oaConfig.themeSync !== false) try {
      c.insertCSS(JSON.parse(require('fs').readFileSync(require('path').join(userData, 'userDataCache.json'), 'utf8')).openasarSplashCSS);
    } catch { }
  });

  // w.loadURL('https://cdn.openasar.dev/' + n);
  w.loadURL('https://openasar.dev/cdn_alpha/' + n);
  // w.loadURL('http://localhost:1337/' + n);

  return w;
};