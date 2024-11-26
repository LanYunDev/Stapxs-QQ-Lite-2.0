import { ElectronAPI } from '@electron-toolkit/preload'
import { Shell } from 'electron'

declare module '@electron-toolkit/preload' {
    interface ElectronAPI {
        shell: Shell
    }
}

declare global {
    interface Window {
        electron: ElectronAPI
        api: unknown
    }
}
