import apolloClient from '@/lib/apolloClient'
import previewClient from '@/lib/previewClient'
import { cn } from '@/utils/utils'
import { gql } from '@apollo/client'
import { draftMode } from 'next/headers'
import ContactForm from './ContactForm'
import { ContactFormData, ContactFormProviderProps } from './ContactForm.types'

const GET_DATA = gql`
  query GetData($preview: Boolean) {
    contactFormCollection(limit: 5, preview: $preview) {
      items {
        formTitle
        subTitle
        from
        email
        message
        feedback
        receiverName
        receiverEmail
      }
    }
  }
`

const ContactFormProvider = async ({
  classNames,
  ...props
}: ContactFormProviderProps) => {
  const { isEnabled } = await draftMode()
  const client = isEnabled ? previewClient : apolloClient

  const { data } = await client.query({
    query: GET_DATA,
    variables: {
      preview: isEnabled,
    },
  })

  const formData: ContactFormData = data.contactFormCollection.items[0]

  return (
    <ContactForm
      classNames={cn(`${classNames}`, { props })}
      formData={formData}
    />
  )
}

export default ContactFormProvider
