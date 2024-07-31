import { IpcRenderer } from 'electron';

export interface IElectronAPI {
    openFileDialog: () => void;
}

declare global {
    interface Window {
        electronAPI: IElectronAPI;
        ipcRenderer: IpcRenderer;
    }
}

export const { ipcRenderer } = window;
