import { gql } from '@apollo/client'


export const GET_NAVBAR = gql`
  query GetData($preview: Boolean) {
 navbarLogotypeCollection(preview: $preview){
  items{
    logotype{
      url
    }
    logotypeDarkmode{
      url
    }
  }
}
}
`