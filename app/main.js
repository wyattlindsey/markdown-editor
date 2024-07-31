import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import * as path from 'path';

const __dirname = path.resolve();

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: false,
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
            { name: 'Markdown Files', extensions: ['md'] },
            { name: 'Text Files', extensions: ['txt'] },
        ],
    });

    if (!files) return;

    const file = files[0];
    console.log(file);
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
