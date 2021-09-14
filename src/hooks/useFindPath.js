import { useState, useEffect } from 'react'

const isValid = (x, y, map) => {
  const maxX = map[0].length
  const maxY = map.length
  if (x < 0 || y < 0) return false
  if (x >= maxX || y >= maxY) return false
  if (map[x][y] !== 0) return false
  return true
}

const getAdjacents = (current, map) => {
  const { x, y, cost } = current
  const adjacents = []
  if (isValid(x, y - 1, map)) adjacents.push({ x, y: y - 1, cost: cost + 1 })
  if (isValid(x - 1, y, map)) adjacents.push({ x: x - 1, y, cost: cost + 1 })
  if (isValid(x + 1, y, map)) adjacents.push({ x: x + 1, y, cost: cost + 1 })
  if (isValid(x, y + 1, map)) adjacents.push({ x, y: y + 1, cost: cost + 1 })
  return adjacents
}

// distancia manhattan
const heuristic = (current, end) => Math.abs(current.x - end.x) + Math.abs(current.y - end.y)

const calculateF = (current, end) => {
  const g = current.cost + 1 // el coste es 1
  const f = g + heuristic(current, end)
  return f
}

const updateCosts = (adjacent, openList, position, f, current) => {
  const currentAdjacent = openList[position]
  if (adjacent.cost < currentAdjacent) {
    currentAdjacent.cost = adjacent.cost
    currentAdjacent.f = f
    currentAdjacent.back = current
  }
}

const elementsToAddInOpenList = (current, map, openList, closedList, end) => {
  const elements = {}
  getAdjacents(current, map).forEach(adjacent => {
    const position = `${adjacent.x}-${adjacent.y}`
    if (closedList[position]) return

    const f = calculateF(adjacent, end)

    if (openList[position]) {
      updateCosts(adjacent, openList, position, f, current)
      return
    }
    elements[position] = adjacent
    elements[position].f = f
    elements[position].back = current
  })
  return elements
}

const searchLowestF = openList => {
  let lowest = 10000000000
  let position = null
  Object.keys(openList).forEach(key => {
    if (openList[key].f < lowest) {
      lowest = openList[key].f
      position = key
    }
  })
  return position
}

const isEndInClosedList = (closedList, end) => Object.keys(closedList).find(e => e === `${end.x}-${end.y}`)

const getPath = (closedList, end) => {
  const path = []

  let curr = closedList[`${end.x}-${end.y}`]
  while (1) {
    path.push({
      x: curr.x,
      y: curr.y,
    })
    curr = curr.back
    if (!curr) break
  }
  return path
}

/**
 * @param {Array.<Array.<number>>} initialMap
 * @param {{x: number, y: number, cost: number}} start
 * @param {{x: number, y: number}} end
 * @param {boolean} begin
 * @param {number} speed
 */
export default function useFindPath (initialMap, start, end, begin, speed = 1200) {
  const [map, setMap] = useState(initialMap)
  const [ended, setEnded] = useState(false)
  const [path, setPath] = useState([])

  useEffect(() => {
    if (!begin) return
    if (!start) return
    setEnded(false)
    setPath([])
    let current = { ...start }

    setMap(map => {
      const newMap = JSON.parse(JSON.stringify(map))
      newMap[start.x][start.y] = 3
      newMap[end.x][end.y] = 2
      return newMap
    })

    const steps = []
    const closedList = {}
    let openList = {}
    let i = 0
    const interval = setInterval(() => {
      const currentPosition = `${current.x}-${current.y}`
      closedList[currentPosition] = current
      openList = {
        ...openList,
        ...elementsToAddInOpenList(current, initialMap, openList, closedList, end),
      }

      setMap(map => {
        const newMap = JSON.parse(JSON.stringify(map))
        Object.values(closedList).forEach(el => {
          if (newMap[el.x][el.y] !== 3 && newMap[el.x][el.y] !== 2) { newMap[el.x][el.y] = 4 }
        })
        Object.values(openList).forEach(el => {
          if (newMap[el.x][el.y] !== 3 && newMap[el.x][el.y] !== 2) { newMap[el.x][el.y] = 5 }
        })
        // current
        newMap[current.x][current.y] = 6
        return newMap
      })

      const lowestCostKey = searchLowestF(openList)
      if (!lowestCostKey) {
        clearInterval(interval)
        setEnded(true)
      }

      console.log('menor', JSON.stringify(openList[lowestCostKey]))

      closedList[lowestCostKey] = JSON.parse(JSON.stringify(openList[lowestCostKey]))
      // closedList[lowestCostKey].back = closedList[currentPosition]
      delete openList[lowestCostKey]

      const step = {
        iteration: i,
        openList,
        closedList,
        current,
      }
      if (isEndInClosedList(closedList, end)) {
        clearInterval(interval)
        setTimeout(() => {
          const path = getPath(closedList, end)
          console.log(path)
          setPath(path)
          setMap(map => {
            const newMap = JSON.parse(JSON.stringify(map))
            path.forEach(el => {
              if (newMap[el.x][el.y] !== 2) { newMap[el.x][el.y] = 7 }
            })
            return newMap
          })
          setTimeout(() => {
            setEnded(true)
          }, speed * 5)
        }, speed)
      }

      current = closedList[lowestCostKey]

      console.log(JSON.stringify(step))
      steps.push(step)

      if (++i > 10000) {
        clearInterval(interval)
        setEnded(true)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [begin])

  useEffect(() => {
    if (ended) setMap(initialMap)
  }, [ended])

  return [map, ended, path]
}
