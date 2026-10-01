export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const routes = ['', '/about', '/services', '/projects', '/gallery', '/packages', '/designs', '/testimonials', '/contact', '/privacy', '/terms'];
  return routes.map((r) => ({ url: base + r, lastModified: new Date(), changeFrequency: 'monthly', priority: r === '' ? 1 : 0.7 }));
}
