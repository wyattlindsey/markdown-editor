export interface IElectronAPI {
    openFileDialog: () => void;
}

declare global {
    interface Window {
        electronAPI: IElectronAPI;
    }
}
