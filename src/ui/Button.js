function Button ({
  filled, color, children, onClick,
}) {
  const styleProps = {
    filled,
  }

  // convert styleProps y className
  const className = Object.entries(styleProps)
    .map(([key, val]) => val && key)
    .join(' ')

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
      <style jsx>
        {`
        button {
          @apply border border-gray-500 rounded;
          @apply px-4 py-1;
          color: ${color || 'unset'};
          border-color: ${color || 'rgb(107,114,128)'};
        }
        .filled {
          @apply bg-indigo-400 text-white border-indigo-400;
        }
        `}
      </style>
    </button>
  )
}

export default Button
