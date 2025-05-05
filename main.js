// main.js
const { app, BrowserWindow, dialog } = require('electron')
const { autoUpdater } = require('electron-updater')
const path = require('path')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  })
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
  // فحص إصدار جديد وتنزيله في الخلفية
  autoUpdater.checkForUpdatesAndNotify()
})

// استمع لأحداث التحديث (مثال)
autoUpdater.on('update-available', info => {
  dialog.showMessageBox({
    type: 'info',
    title: 'تحديث متوفر',
    message: `الإصدار ${info.version} جاهز للتحميل.`,
  })
})
autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    type: 'question',
    buttons: ['نعم','لا'],
    title: 'تثبيت التحديث',
    message: 'هل تريد إعادة تشغيل التطبيق للتثبيت؟'
  }).then(({ response }) => {
    if (response === 0) autoUpdater.quitAndInstall()
  })
})
