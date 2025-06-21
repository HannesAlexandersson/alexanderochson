export default async function sitemap() {
  const currentDate = new Date()
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_LOCAL_BASE_URL

  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
  return [...staticRoutes]
  //return [...staticRoutes, ...dynamicRoutes];
}
