import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
    appId: 'cn.stapxs.webqq',
    appName: 'Stapxs QQ Lite',
    webDir: 'dist',
    loggingBehavior: 'none',
    ios: {
        path: 'src/mobile/ios'
    },
    android: {
        path: 'src/mobile/android'
    },
    // server: {
    //   url: 'http://localhost:8080',
    //   cleartext: true
    // }
}

export default config
