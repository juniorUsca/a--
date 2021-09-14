import { Provider as SessionProvider } from 'next-auth/client'

import 'tailwindcss/tailwind.css'

/* eslint-disable react/jsx-props-no-spreading */
function MyApp ({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
