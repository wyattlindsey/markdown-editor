import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

const __dirname = path.resolve();
let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.cjs'),
        },
    });

    mainWindow.loadURL('http://localhost:9000');
};

export const getFileFromUser = () => {
    const files = dialog.showOpenDialogSync({
        properties: ['openFile'],
        filters: [
            { name: 'Text Files', extensions: ['txt'] },
            { name: 'Markdown Files', extensions: ['md'] },
        ],
    });

    if (!files) return;

    const file = fs.readFileSync(files[0], 'utf-8').toString();
    mainWindow.webContents.send('file-opened', file);
};

app.on('ready', () => {
    ipcMain.on('open-file-dialog', getFileFromUser);
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
