import Footer from '@/components/Footer/Footer'
import MenuList from '@/components/Navbar/MenuList'
import LivePreviewProvider from '@/context/LivePreviewProvider'
import { MenuContextProvider } from '@/context/MenuProvider'
import apolloClient from '@/lib/apolloClient'
import previewClient from '@/lib/previewClient'
import { GET_FOOTER, GET_NAVBAR } from '@/queries'
import { GET_CUSTOMER } from '@/queries/getCustomerSpecefics'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import type { Metadata } from 'next'
import { Bebas_Neue, Inria_Serif, Poppins } from 'next/font/google'
import { draftMode } from 'next/headers'
import Script from 'next/script'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})
const bebasNeue = Bebas_Neue({
  variable: '--font-bebas-neue',
  subsets: ['latin'],
  weight: ['400'],
})
const inriaSerif = Inria_Serif({
  variable: '--font-inria-serif',
  subsets: ['latin'],
  weight: ['300', '400', '700'],
})

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = await draftMode()
  const client = isEnabled ? previewClient : apolloClient

  const { data: metaKeywordsData } = await client.query({
    query: GET_CUSTOMER,
    variables: { preview: isEnabled },
  })
  const customerKeyWords =
    metaKeywordsData.metaKeywordsCollection?.items[0]?.keywordsArray || []
  const metadataBase =
    process.env.NEXT_LOCAL_BASE_URL ||
    process.env.NEXT_PUBLIC_URL ||
    'http://localhost:3000'
  const metaCustomer =
    process.env.NEXT_PUBLIC_META_CUSTOMER || 'Alexander&son customer'

  return {
    title: {
      template: 'Minimalistic Elegance | %s',
      default: 'Minimalistic Elegance',
    },
    description: `Created by Alexander&son for ${metaCustomer}`,
    keywords: customerKeyWords,
    metadataBase: new URL(metadataBase),
    authors: [{ name: 'Alexander&son' }],
    creator: 'Alexander&son',
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Await the draftMode promise to get isEnabled
  const { isEnabled } = await draftMode()
  const client = isEnabled ? previewClient : apolloClient

  const { data } = await client.query({
    query: GET_FOOTER,
    variables: { preview: isEnabled },
  })

  const footerData = {
    sections: data.footerTextSectionsCollection?.items || [],
    partners: data.footerPartnerSectionCollection?.items || [],
    socialMedia: data.footerSectionSocialMediaCollectionCollection?.items || [],
    logo: data.footerSectionCollection?.items || '',
    backgroundText:
      data.modelTextCollection?.items[0]?.backgroundText?.url || '',
  }

  const navbarLogos = await client.query({
    query: GET_NAVBAR,
    variables: { preview: isEnabled },
  })
  const navbarData = {
    logo:
      navbarLogos.data.navbarLogotypeCollection?.items[0]?.logotype?.url || '',
    logoDark:
      navbarLogos.data.navbarLogotypeCollection?.items[0]?.logotypeDarkmode
        ?.url || '',
  }
  return (
    <html
      lang='sv'
      className={`${poppins.variable} ${bebasNeue.variable} ${inriaSerif} antialiased`}
    >
      <body className={'max-w-[100vw] overflow-x-hidden'}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <MenuContextProvider navbarData={navbarData}>
            <MenuList />
            <LivePreviewProvider isEnabled={isEnabled}>
              {children}
            </LivePreviewProvider>
          </MenuContextProvider>
          <Footer footerData={footerData} />
        </AppRouterCacheProvider>
      </body>
      {isEnabled && <Script src='/live-preview.mjs' />}
    </html>
  )
}
