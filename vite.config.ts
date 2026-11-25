import { defineConfig, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { clinicConfig } from './src/config/clinic.config.ts'
import { clinicSchema } from './src/config/schema.ts'
import { presets } from './src/config/presets.ts'
import { seoMetadata } from './src/lib/seo.ts'

function escape(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!)
}

function clinicSeo(): Plugin {
  const config = clinicSchema.parse(clinicConfig)
  const seo = seoMetadata(config)
  return {
    name: 'clinic-seo',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const tags = [
          '<title>' + escape(config.seo.title) + '</title>',
          '<meta name="description" content="' + escape(config.seo.description) + '">',
          '<meta name="theme-color" content="' + escape(config.colors.dark ?? presets[config.preset].dark) + '">',
          '<meta name="robots" content="' + seo.robots + '">',
          '<meta property="og:type" content="website">',
          '<meta property="og:locale" content="pt_BR">',
          '<meta property="og:title" content="' + escape(config.seo.title) + '">',
          '<meta property="og:description" content="' + escape(config.seo.description) + '">',
          '<meta property="og:site_name" content="' + escape(config.name) + '">',
        ]
        if (config.favicon) tags.push('<link rel="icon" href="' + escape(config.favicon) + '">')
        if (seo.canonical) tags.push('<link rel="canonical" href="' + escape(seo.canonical) + '">', '<meta property="og:url" content="' + escape(seo.canonical) + '">')
        if (seo.shareImage) tags.push('<meta property="og:image" content="' + escape(seo.shareImage) + '">')
        if (seo.schema) tags.push('<script type="application/ld+json">' + JSON.stringify(seo.schema).replace(/</g, '\\u003c') + '</script>')
        const { hero, heroMobile } = config.photos
        if (hero.src && !hero.src.startsWith('data:')) {
          tags.push('<link rel="preload" as="image" href="' + escape(hero.src) + '"' + (heroMobile ? ' media="(min-width: 691px)"' : '') + '>')
        }
        if (hero.src && heroMobile && !heroMobile.startsWith('data:')) {
          tags.push('<link rel="preload" as="image" href="' + escape(heroMobile) + '" media="(max-width: 690px)">')
        }
        return html.replace('</head>', '  ' + tags.join('\n    ') + '\n  </head>')
      },
    },
    generateBundle() {
      const listed = seo.canonical && !seo.noindex
      const robots = 'User-agent: *\nAllow: /\n' + (listed ? 'Sitemap: ' + escape(seo.canonical) + 'sitemap.xml\n' : '')
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + (listed ? '<url><loc>' + escape(seo.canonical) + '</loc></url>' : '') + '</urlset>\n' })
    },
  }
}

export default defineConfig({
  plugins: [tailwindcss(), clinicSeo()],
  server: { fs: { deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/studio.html', '**/src/studio.tsx', '**/src/components/studio/**', '**/dist-studio/**'] } },
})
