import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import { AppProps } from 'next/app'
import { Provider , createClient } from 'urql'
function MyApp({ Component, pageProps }: AppProps) {
  const client = createClient({
    url: 'http://localhost:8000/graphql',
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
