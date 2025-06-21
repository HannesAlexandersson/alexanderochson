import ContactFormProvider from '@/components/ContactForm/ContactFormProvider'
import Menu from '@/components/Navbar/Menu'
import PageTitle from '@/components/PageTitle/PageTitle'
import TextBlock from '@/components/TextSections/TextSections'
import apolloClient from '@/lib/apolloClient'
import { customerData } from '@/lib/customerData'
import previewClient from '@/lib/previewClient'
import { GET_CONTACT_DATA } from '@/queries'
import { draftMode } from 'next/headers'
import { ContactDataProps } from './contact.types'

export const metadata = {
  title: 'Contact',
  description: `${customerData.contactMessage}`,
}

const Contact = async () => {
  const { isEnabled } = await draftMode()
  const client = isEnabled ? previewClient : apolloClient

  const { data } = await client.query({
    query: GET_CONTACT_DATA,
    variables: {
      preview: isEnabled,
    },
  })

  const contactData: ContactDataProps[] =
    data?.contactPageTextsectionsCollection?.items
  const mappedContactData = contactData?.map(section => ({
    sectionTitle: section.sectionTitle, // rename to what TextBlock expects
    sectionText: section.textSectionParagraf, // rename to what TextBlock expects
    sectionImage: section.sectionBild, // rename
    order: section.order, // keep the order for layout purposes
    sys: section.sys, // keep sys for Contentful Live Preview
  }))
  return (
    <>
      <Menu withBg={true} />
      <main className='section-contain mt-20'>
        <PageTitle>Kontakt</PageTitle>
        <div className='flex flex-col py-12 md:py-20'>
          {mappedContactData &&
            mappedContactData.map((section, idx) => (
              <TextBlock.Section
                key={idx}
                className='mx-auto my-16 max-w-[1440px] px-6 md:my-32 md:px-16'
                reverse={section.order % 2 === 0 ? true : false}
              >
                <TextBlock block={section} showImage={true} />
              </TextBlock.Section>
            ))}
        </div>
        <div id='form' className='flex flex-col items-center justify-center'>
          <ContactFormProvider classNames='mb-20' />
        </div>
      </main>
    </>
  )
}
export default Contact
