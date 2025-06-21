import { gql } from '@apollo/client'

export const GET_LANDING_DATA = gql`
  query GetData($preview: Boolean) {
    heroSectionCollection(limit: 1, preview: $preview) {
      items {
        heroTitle
        heroText {
          json
        }
        heroImage {
          url
        }
        heroCtaPrimary
        heroCtaSecondary
        sys {
          __typename
        }
      }
    }
    frontPageTextSectionsCollection(limit: 5, preview: $preview) {
      items {
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
        }
        order
      }
    }
    partnerLogoSliderPreTextCollection(limit: 1, preview: $preview) {
      items {
        textSectionHeader
        textSectionParagraf {
          json
        }
        order
      }
    }
    landingPageQuoteCollection(limit: 1, preview: $preview) {
      items {
        sys {
          id
        }
        quoteTitle
        quoteText {
          json
        }
        quoteAuthor
      }
    }
    serviceCardsCollection(limit: 10, preview: $preview) {
      items {
        sys {
          id
        }
        cardTitle
        cardText
        nameOfIcon
        order
      }
    }
  }
`
/*
export const GET_LANDING_CARDS = gql`
  query GetData($preview: Boolean) {
    serviceCardsCollection(limit: 10, preview: $preview) {
      items {
        sys {
          id
        }
        cardTitle
        cardText
        nameOfIcon
        order
      }
    }
  }
`

export const GET_LANDING_QUOTE = gql`
  query GetData($preview: Boolean) {
    landingPageQuoteCollection(limit: 1, preview: $preview) {
      items {
        sys {
          id
        }
        quoteTitle
        quoteText {
          json
        }
        quoteAuthor
      }
    }
  }
`
*/
