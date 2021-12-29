import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import { AppProps } from 'next/app'
import { Provider , createClient, dedupExchange, fetchExchange } from 'urql'
import "../styles/style.css"
import { cacheExchange } from '@urql/exchange-graphcache';
function MyApp({ Component, pageProps }: AppProps) {
  // creating urql client 
  const client = createClient({
    url: 'http://localhost:8000/graphql',
    fetchOptions:{
        credentials: "include",  // allowing server to send cookie
    },
    exchanges: [dedupExchange, cacheExchange({}), fetchExchange],
  });
  return (
    <Provider
     value={client}
    >

    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    </Provider>
  )
}

export default MyApp
