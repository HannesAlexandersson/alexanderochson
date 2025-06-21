type PageLinkProps = {
  title: string
  path: string
}[]

const pageLinks: PageLinkProps = [
  {
    title: 'Hem',
    path: '/',
  },
  {
    title: 'Tjänster',
    path: '/features',
  },
  {
    title: 'Om oss',
    path: '/about',
  },
  {
    title: 'Kontakt',
    path: '/contact',
  },
]

export default pageLinks
