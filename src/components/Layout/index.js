import Head from 'next/head'

const siteTitle = 'Razonamiento y Planificacion Automatica'

/**
 * @param {{title: string}} params
 */
export default function Layout ({ children, title }) {
  return (
    <>
      <Head>
        <title>{!title ? siteTitle : `${title} | ${siteTitle}`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="local-container container mx-auto max-w-screen-xl">
        <main>{children}</main>
      </div>
      <style jsx>
        {`
        `}
      </style>
      <style jsx global>
        {`
        #__next {
          min-height: 100vh;
          position: relative;
        }
      `}

      </style>
    </>
  )
}
