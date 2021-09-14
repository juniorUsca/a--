import Layout from '@components/Layout'
import Map from '@components/Map'
import useAWSAlmacen from 'hooks/useAWSAlmacen'
// eslint-disable-next-line no-unused-vars
// import { useSession, getSession, signIn } from 'next-auth/client'

function HomePage () {
  console.log('rendering')
  const initialMap = [
    [
      0,
      1,
      0,
      0,
    ],
    [
      0,
      1,
      0,
      0,
    ],
    [
      0,
      0,
      0,
      0,
    ],
    [
      0,
      0,
      0,
      0,
    ],
  ]

  const problemas = [
    {
      start: {
        x: 2,
        y: 2,
      },
      inventary: {
        x: 0,
        y: 0,
      },
      end: {
        x: 3,
        y: 3,
      },
    },
    {
      start: {
        x: 2,
        y: 2,
      },
      inventary: {
        x: 2,
        y: 0,
      },
      end: {
        x: 3,
        y: 2,
      },
    },
    {
      start: {
        x: 2,
        y: 2,
      },
      inventary: {
        x: 0,
        y: 3,
      },
      end: {
        x: 3,
        y: 1,
      },
    },
  ]

  const [map, path, problema] = useAWSAlmacen(initialMap, problemas)

  return (
    <Layout title="A*">
      <h1>Resolución de un problema mediante búsqueda heurística</h1>
      <h2>UNIR - Razonamiento y Planficación Automática</h2>
      <br />
      <h3>Junior Usca Huacasi</h3>
      <h3>Alberto Linares Lopez</h3>
      <h3>Arturo Garcia Sánchez</h3>
      <h3>Jorge Alejandro Canizares Cedeño</h3>
      <br />
      <h4>
        {problema + 1 < problemas.length ? `Problema ${problema + 1}` : 'Termino: Puede actualizar la página para reiniciar'}
      </h4>
      <br />
      <div>
        <Map
          map={map}
          width={4}
          height={4}
        />
        <section>
          {path && path.map(({ x, y, tag }) => (
            <span>
              {tag}
              (
              {tag === 'cargarR' || tag === 'descargarR' ? 'M,' : ''}
              {x}
              ,
              {y}
              )
            </span>
          ))}
        </section>
      </div>
      <style jsx>
        {`
        h1 {
          @apply text-4xl text-blue-800 font-bold text-center;
          padding-top: 60px;
        }
        h2 {
          @apply text-2xl text-blue-800 font-bold text-center;
        }
        h3 {
          @apply text-xl text-blue-400 text-center;
        }
        h4 {
          @apply text-2xl text-red-400 font-bold text-center;
          padding-bottom: 40px;
        }
        div {
          display: flex;
          justify-content: space-around;
        }
        section {
          width: 400px;
        }
        section span {
          display: block;
          text-align: center;
          color: #666;
          @apply text-xl;
        }
        `}
      </style>
    </Layout>
  )
}

export default HomePage
