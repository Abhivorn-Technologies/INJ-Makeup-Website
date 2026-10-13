/** Fine gold divider with a small diamond, used under section titles. */
export function Ornament({ className = "", light = false }: { className?: string; light?: boolean }) {
  const stroke = light ? "#e2c891" : "#c9a45c";
  return (
    <svg
      className={className}
      width="132"
      height="12"
      viewBox="0 0 132 12"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 6h56M76 6h56" stroke={stroke} strokeWidth="0.75" />
      <path d="M66 1.5 70.5 6 66 10.5 61.5 6z" stroke={stroke} strokeWidth="0.9" />
      <circle cx="56" cy="6" r="1.1" fill={stroke} />
      <circle cx="76" cy="6" r="1.1" fill={stroke} />
    </svg>
  );
}
