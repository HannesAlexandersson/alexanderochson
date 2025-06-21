import { gql } from '@apollo/client'

export const GET_FOOTER = gql`
  query getData($preview: Boolean) {
    footerSectionCollection(limit: 1, preview: $preview) {
      items {
        footerLogo {
          url
        }
      }
    }

    footerPartnerSectionCollection(limit: 5, preview: $preview) {
      items {
        partnerName
        partnerLogo {
          url
        }
      }
    }
    footerSectionSocialMediaCollectionCollection(limit: 5, preview: $preview) {
      items {
        socialMediaTitle
        socialMediaIcon {
          url
        }
        linkToSocialmedia
      }
    }
    modelTextCollection(limit: 1, preview: $preview) {
      items {
        backgroundText {
          url
        }
      }
    }
  }
`
