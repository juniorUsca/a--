import { useEffect, useState } from 'react'
import useFindPath from './useFindPath'

export default function useAWSAlmacen (initialMap, problemas) {
  const [iteration, setIteration] = useState(0)
  const [begin1, setBegin1] = useState(true)
  const [begin2, setBegin2] = useState(false)
  const problema = problemas[iteration]

  const start1 = problema?.start
  if (start1) start1.cost = 0
  const end1 = problema?.inventary
  const [map, ended1, path1] = useFindPath(initialMap, start1, end1, begin1, 1000)

  const start2 = problema?.inventary
  if (start2) start2.cost = 0
  const end2 = problema?.end
  const [map2, ended2, path2] = useFindPath(initialMap, start2, end2, begin2, 1000)

  useEffect(() => {
    if (ended1) {
      setBegin1(false)
      setBegin2(true)
    }
  }, [ended1])

  useEffect(() => {
    if (ended2) {
      setIteration(iteration => iteration + 1)

      setBegin2(false)
      setBegin1(true)
    }
  }, [ended2])

  useEffect(() => {
    if (iteration >= problemas.length && ended1 && ended2) {
      setBegin1(false)
      setBegin2(false)
    }
  }, [iteration, ended1, ended2])

  let path = []
  let fase = 0
  if (begin1 && !begin2) {
    path = []
    console.log('---------fase0')
    fase = 0
  }
  if (!begin1 && begin2) {
    const path1Tagged = path1.map((e, index) => {
      if (index === 0) return { ...e, tag: 'cargarR' }
      return { ...e, tag: 'moverR' }
    }).reverse()
    const path2Tagged = path2.map((e, index) => {
      if (index === 0) return { ...e, tag: 'descargarR' }
      return { ...e, tag: 'moverR' }
    }).reverse()
    path = [...path1Tagged, ...path2Tagged]
    console.log('---------fase1111')
    fase = 1
  }

  if (ended1 && !ended2) { return [map2, path, iteration, fase] }
  return [map, path, iteration, fase]
}
