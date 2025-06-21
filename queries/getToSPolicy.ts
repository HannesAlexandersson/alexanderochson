import { gql } from '@apollo/client'

export const GET_TOS_POLICY = gql`
  query getPolicyData($preview: Boolean) {
    termsOfServiceCollection(limit: 5, preview: $preview) {
      items {
        sys {
          id
        }
        title
        termsOfService {
          json
        }
      }
    }
  }
`
