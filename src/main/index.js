'use strict'

import { app, globalShortcut, ipcMain, BrowserWindow, Notification } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1240,
    height: 800,
    minWidth: 1000,
    minHeight: 600,
    maxWidth: 1240,
    maxHeight: 800,
    useContentSize: true,
    frame: false,
    show: false,
    title: 'PicMagic',
    backgroundColor: '#fff'
  })

  mainWindow.loadURL(winURL)
  globalShortcut.register('CTRL+F5', function () {
    mainWindow.webContents.openDevTools()
  })
  mainWindow.once('ready-to-show', function () {
    mainWindow.show()
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  ipcMain.on('setWallpaperSuccessful', () => {
    const notification = new Notification({
      title: '设置成功',
      body: '已经为您设置好桌面壁纸'
    })
    setTimeout(() => {
      notification.show()
    }, 100)
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
