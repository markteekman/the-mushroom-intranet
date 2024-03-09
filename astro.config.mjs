import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import compress from 'astro-compress'
import vue from '@astrojs/vue'

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [
    vue({ appEntrypoint: '/src/pages/_app' }),
    tailwind({
      applyBaseStyles: false,
    }),
    compress(),
  ],
  site: 'https://markteekman.github.io',
  base: '/the-mushroom-intranet',
})
