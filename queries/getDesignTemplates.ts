import { gql } from '@apollo/client'

export const GET_DESIGN_TEMPLATES = gql`
  query getPolicyData($preview: Boolean) {
    designTemplatesCollection(limit: 10, preview: $preview) {
      items {
        sys {
          id
        }
        designTitle
        slug
        description
        exampleLink
        keywords
        designImagesCollection {
          items {
            url
          }
        }
      }
    }
  }
`
