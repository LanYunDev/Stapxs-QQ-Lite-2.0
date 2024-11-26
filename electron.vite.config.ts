import { defineConfig, externalizeDepsPlugin } from 'electron-vite'

import * as viteConfig from './vite.config.ts'

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()],
    },
    preload: {
        plugins: [externalizeDepsPlugin()],
    },
    renderer: {
        server: viteConfig.default.server,
        resolve: viteConfig.default.resolve,
        plugins: viteConfig.default.plugins,
        build: {
            ...viteConfig.default.build,
            outDir: 'out/renderer',
        }
    },
})
