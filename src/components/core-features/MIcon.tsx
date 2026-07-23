export const MIcon = ({
  name,
  size = 16,
  className = '',
}: {
  name: string
  size?: number
  className?: string
}) => (
  <span
    className={`material-symbols-rounded ${className}`}
    style={{
      fontSize: size,
      fontVariationSettings: `"FILL" 0, "wght" 400, "GRAD" 0, "opsz" ${size}`,
    }}
  >
    {name}
  </span>
)
