export default function Box ({
  x, y, size = 100, type = 0, problema,
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
      <span>
        {x}
        {' '}
        ,
        {' '}
        {y}
      </span>
      {type === 2 && (
        <span>
          {`M${problema + 1}`}
        </span>
      )}
      {type === 3 && (
        <span>
          {`Ini${problema + 1}`}
        </span>
      )}
      {type === 6 && (
        <span className="robot">
          R
        </span>
      )}
      <style jsx>
        {`
        div {
          height: ${size}px;
          widht: ${size}px;
          background: ${color[type]};
          border: 1px solid #dddddd66;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .robot {
          color: #fff;
        }
        `}
      </style>
    </div>
  )
}
