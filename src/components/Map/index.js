import Box from '@components/Box'

export default function Map ({
  width, height, boxSize = 100, map,
}) {
  return (
    <section>
      {
        map.map(
          (row, x) => row.map(
            (type, y) => (
              <Box
                key={`${x}-${y}`}
                x={x}
                y={y}
                size={boxSize}
                type={type}
              />
            ),
          ),
        )
      }
      <style jsx>
        {`
        section {
          display: grid;
          grid-template-columns: repeat(${width}, 1fr);
          grid-template-rows: repeat(${height}, 1fr);
          width: ${width * boxSize}px;
        }
        `}
      </style>
    </section>
  )
}
