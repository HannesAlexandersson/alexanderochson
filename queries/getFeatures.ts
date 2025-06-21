import { gql } from '@apollo/client'

export const GET_FEATURES = gql`
  query getFeaturesData($preview: Boolean) {
    featureTextSectionsCollection(limit: 10, preview: $preview) {
      items {
        order
        sys {
          id
        }
        sectionTitle
        sectionText {
          json
        }
        sectionImage {
          sys {
            id
          }
          url
          title
        }
      }
    }
    featureCentreTextCollection(limit: 5, preview: $preview) {
      items {
        sys {
          id
        }
        title
        textSection {
          json
        }
      }
    }
    featureCardsCollection(limit: 10, preview: $preview) {
      items {
        sys {
          id
        }
        cardTitle
        cardText {
          json
        }
        nameOfIcon
        order
        price
        nameOfIconColor
      }
    }
  }
`
