import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { profile } from './src/data/content.js'

const PLACEHOLDER_URL = 'https://your-domain.example'

// JSON-LD Person: only the public fields below, and only those that are filled in.
function personSchema() {
  const [locality, country] = profile.location.split(',').map((part) => part.trim())
  const sameAs = [profile.github, profile.linkedin].filter(Boolean)

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title.replace(/\s*\(.*\)\s*$/, ''),
    ...(profile.email && { email: profile.email }),
    ...(sameAs.length > 0 && { sameAs }),
    address: { '@type': 'PostalAddress', addressLocality: locality, addressCountry: country },
  }
}

// Everything that depends on VITE_SITE_URL: canonical + absolute share URLs in the page,
// plus robots.txt and sitemap.xml, generated at build time so they can never go stale.
function seo(siteUrl) {
  const head = (tag, attrs) => ({ tag, attrs, injectTo: 'head' })
  const image = `${siteUrl}/og-image.png`
  const base = siteUrl || PLACEHOLDER_URL
  const placeholderNote = 'Placeholder domain: set VITE_SITE_URL and rebuild'

  return {
    name: 'portfolio-seo',
    transformIndexHtml() {
      return [
        ...(siteUrl
          ? [
              head('link', { rel: 'canonical', href: `${siteUrl}/` }),
              head('meta', { property: 'og:url', content: `${siteUrl}/` }),
            ]
          : []),
        head('meta', { property: 'og:image', content: image }),
        head('meta', { name: 'twitter:image', content: image }),
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(personSchema()).replace(/</g, '\\u003c'),
          injectTo: 'head',
        },
      ]
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `${siteUrl ? '' : `# ${placeholderNote}\n`}User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n${siteUrl ? '' : `<!-- ${placeholderNote} -->\n`}<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${base}/</loc>\n  </url>\n</urlset>\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const { VITE_SITE_URL = '' } = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [react(), seo(VITE_SITE_URL.trim().replace(/\/+$/, ''))],
  }
})
