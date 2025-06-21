import { gql } from '@apollo/client'

export const GET_INTEGRETY_POLICY = gql`
  query getPolicyData($preview: Boolean) {
    integretyPolicyCollection(limit: 5, preview: $preview) {
      items {
        sys {
          id
        }
        title
        policy {
          json
        }
      }
    }
  }
`
