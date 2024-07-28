import { contextBridge } from 'electron';

// Expose a safe API to the renderer process
contextBridge.exposeInMainWorld('myAPI', {
  // Define your API here
});