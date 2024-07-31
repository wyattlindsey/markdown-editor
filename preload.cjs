const ipcRenderer = window.require('electron').ipcRenderer;
const contextBridge = window.require('electron').contextBridge;

console.log('preload:::');

// Expose a safe API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    openFileDialog: () => {
        ipcRenderer.send('open-file-dialog');
    },
});
