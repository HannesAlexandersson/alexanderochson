import { ApolloClient, InMemoryCache } from '@apollo/client'

const previewClient = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_CMS_SPACE_ID}/?access_token=${process.env.NEXT_CMS_PREVIEW_KEY}`,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-first',
    },
  },
})

export default previewClient