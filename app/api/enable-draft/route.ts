// route handler with secret and slug
import { cookies, draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  // This secret should only be known to this route handler and the CMS
  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !slug) {
    return new Response('Invalid token', { status: 401 })
  }

  // Enable Draft Mode by setting the cookie
  (await draftMode()).enable()

  // Override cookie header for draft mode for usage in live-preview
  // https://github.com/vercel/next.js/issues/49927
  const cookieStore = await cookies()
  const cookie = cookieStore.get('__prerender_bypass')
  if (!cookie?.value) {
    return new Response('Cookie value missing', { status: 500 })
  }
  cookieStore.set(
    '__prerender_bypass',
    cookie.value,
    {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'none',
    }
  )

  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  redirect(slug)
}

