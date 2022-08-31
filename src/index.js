const {app, BrowserWindow} = require('electron');
const path = require('path');

function createWindow () {

  const mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    resizable: false,
    autoHideMenuBar: true, //в видео я ошибся, нужно прописать true
    icon: 'src/images/hot.ico',
  });

  mainWindow.loadFile('./src/index.html');

  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
})
