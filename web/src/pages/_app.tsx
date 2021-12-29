import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import { AppProps } from 'next/app'
import { Provider , createClient } from 'urql'
import "../styles/style.css"

function MyApp({ Component, pageProps }: AppProps) {
  const client = createClient({
    url: 'http://localhost:8000/graphql',
    fetchOptions:{
        credentials: "include",  // allowing server to send cookie
    }
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
