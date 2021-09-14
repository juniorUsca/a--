import { useState, useEffect } from 'react'
import Image from 'next/image'
import Head from 'next/head'

export default function NavBar ({ title, src, children }) {
  return (
    <nav>
      <Logo title={title} src={src} />
      <div>
        {children}
      </div>
      <style jsx>
        {`
        nav {
          @apply flex justify-between;
          @apply py-2;
          @apply text-white;
        }
        div {
          @apply flex items-center;
        }
        `}
      </style>
      <style jsx global>
        {`
        div a {
          @apply ml-2 p-2;
        }
        `}
      </style>
    </nav>
  )
}

const faviconsBeios = [
  '💳',
  '🌝',
  '🏢',
  '🚀',
  '👽',
  '💰',
]
const faviconOptionsLength = faviconsBeios.length

function Logo ({ title, src }) {
  const [faviconIndex, setFaviconIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const toggleCraziness = () => setIsHovering(!isHovering)

  useEffect(() => {
    if (!isHovering) return undefined

    const intervalId = setInterval(() => {
      setFaviconIndex(previousValue => {
        const nextValue = previousValue + 1
        if (nextValue >= faviconOptionsLength) return 0
        return nextValue
      })
    }, 300)

    return () => clearTimeout(intervalId)
  }, [isHovering])

  const favicon = faviconsBeios[faviconIndex]

  return (
    <>
      <Head>
        <link
          rel="icon"
          href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${favicon}</text></svg>`}
        />
      </Head>
      <a
        href="/"
        onMouseEnter={toggleCraziness}
        onMouseLeave={toggleCraziness}
      >
        {src && <Image src={src} height={41} width={43} />}
        <h4>
          {title}
        </h4>
      </a>
      <style jsx>
        {`
        a {
          @apply flex items-center;
        }
        h4 {
          @apply ml-3;
          @apply text-xl;
        }
        `}
      </style>
    </>
  )
}
