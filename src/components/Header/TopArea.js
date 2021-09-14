import { useEffect, useRef, useState } from 'react'
import Button from '@ui/Button'

import { signIn, signOut, useSession } from 'next-auth/client'

export default function TopArea () {
  return (
    <div className="top-area">
      <div>
        <LoginLogout />
      </div>
      <style jsx>
        {`
          .top-area {
            @apply flex items-center;
            height: 36px;
          }
        `}
      </style>
    </div>
  )
}

function LoginLogout () {
  const [session, loading] = useSession()
  const [isHovering, setIsHovering] = useState(false)

  if (loading) {
    return null
  }

  if (session == null) {
    return <Button color="white" onClick={() => signIn()}>Iniciar Sesión</Button>
  }

  return (
    <Avatar
      image={session.user.image}
      name={session.user.name}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering ? (
        <Button onClick={() => signOut()}>Cerrar Sesión</Button>
      ) : (
        <span className="inline-block p-2">{session.user.name}</span>
      )}
    </Avatar>
  )
}

function Avatar ({
  image,
  name,
  children,
  onMouseEnter,
  onMouseLeave,
}) {
  const $container = useRef(null)
  useEffect(() => {
    if ($container.current) {
      $container.current.style.width = `${$container.current.offsetWidth}px`
    }
  }, [$container.current])
  return (
    <div ref={$container} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="flex items-center">
      {image && (
        <img
          alt={name}
          src={image}
          width={32}
          style={{ height: '32px' }}
          className="mr-1 rounded-full"
        />
      )}
      {children}
      <style jsx>
        {`
        div {
          height: 40px;
          min-width: ${image ? '170px' : '135px'}; /* incrementar si el boton de cerrar sesion se hace mas ancho */
        }
        `}
      </style>
    </div>
  )
}
