const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'pages', 'blog', 'posts');
const sitemapPath = path.join(__dirname, 'sitemap.xml');

const siteURL = 'https://byte-journey.github.io';

function generateSitemap() {
  const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
  const urls = files.map(file => {
    const slug = file.replace(/\.md$/, '');
    return `
  <url>
    <loc>${siteURL}/pages/blog/posts/${slug}.html</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.6</priority>
  </url>`;
  });

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteURL}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteURL}/pages/blog/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
  </url>
  ${urls.join('\n')}
</urlset>`;

  fs.writeFileSync(sitemapPath, sitemapContent.trim());
  console.log('✅ Sitemap updated successfully.');
}

generateSitemap();

