interface Props {
  className?: string;
  color?: string;
  width?: number;
}

export default function BrushUnderline({ className = '', color = '#42767f', width = 140 }: Props) {
  const height = Math.round(width * (16 / 150));
  return (
    <svg
      viewBox="0 0 150 16"
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8,9 C28,4 44,14 64,8 C84,2 100,13 120,6 C130,3 137,9 142,7"
        stroke={color}
        strokeWidth={7}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
