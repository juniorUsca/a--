export default function Box ({
  x, y, size = 100, type = 0,
}) {
  const color = [
    '#fff', // blank
    '#000', // obstacle
    '#FF5252', // objective
    '#FFEB3B', // start
    '#9E9E9E', // visited
    '#4CAF50', // openList
    '#536DFE', // current
    '#03A9F4', // path
  ]
  return (
    <div>
      {x}
      {' '}
      ,
      {' '}
      {y}
      <style jsx>
        {`
        div {
          height: ${size}px;
          widht: ${size}px;
          background: ${color[type]};
          text-align: center;
          line-height: ${size}px;
          border: 1px solid #dddddd66;
        }
        `}
      </style>
    </div>
  )
}
