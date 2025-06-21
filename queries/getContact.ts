import { gql } from '@apollo/client'

export const GET_CONTACT_DATA = gql`
  query getContactData($preview: Boolean) {
    contactPageTextsectionsCollection(limit: 1, preview: $preview) {
      items {
        sys {
          id
        }
        sectionTitle
        textSectionParagraf {
          json
        }
        sectionBild {
          url
          sys {
            id
          }
          description
        }
        order
      }
    }
  }
`
