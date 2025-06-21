import { gql } from '@apollo/client'

export const GET_ABOUT = gql`
  query getData($preview: Boolean) {
    aboutCenterPreTextCollection(limit: 1, preview: $preview) {
      items {
        sys {
          id
        }
        sectionTitle
        sectionSubTitle
        sectionText {
          json
        }
        sectionImage {
          sys {
            id
          }
          url
          description
        }
      }
    }
    aboutTextSectionsCollection(limit: 10, preview: $preview) {
      items {
        sectionTitle
        sectionText {
          json
        }
        sectionImage {
          sys {
            id
          }
          url
        }
        order
      }
    }
    roadmapTextsCollection(limit: 10, preview: $preview) {
      items {
        sys {
          id
        }
        title
        subTitle
        points {
          json
        }
        sectionIcon {
          sys {
            id
          }
          url
        }
        dates
        order
      }
    }
  }
`
