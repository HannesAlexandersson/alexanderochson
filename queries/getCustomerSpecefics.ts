import { gql } from '@apollo/client'

export const GET_CUSTOMER = gql`
  query getPolicyData($preview: Boolean) {
    metaKeywordsCollection(limit: 1, preview: $preview) {
      items {
        sys {
          id
        }
        keywordsArray
      }
    }
  }
`
