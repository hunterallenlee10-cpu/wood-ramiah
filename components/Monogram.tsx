// The W&R square monogram, drawn in SVG after the firm's logo:
// a navy square, a pewter keyline inside it, a paper W, a small italic ampersand and a pewter R.
type Props = { size?: number; className?: string; title?: string };

export function Monogram({ size = 32, className, title }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <rect width="48" height="48" fill="#192451" />
      <rect x="3.5" y="3.5" width="41" height="41" fill="none" stroke="#8C91A1" strokeWidth="1" />
      <text
        x="24"
        y="30.6"
        textAnchor="middle"
        fontFamily="var(--font-display), 'Cormorant Garamond', Georgia, serif"
        fontWeight="700"
        fontSize="18.5"
        letterSpacing="-0.3"
      >
        <tspan fill="#F6F3EC">W</tspan>
        <tspan fill="#F6F3EC" fontStyle="italic" fontWeight="500" fontSize="10.5" dy="-5.2">
          &amp;
        </tspan>
        <tspan fill="#C9CCD5" dy="5.2">
          R
        </tspan>
      </text>
    </svg>
  );
}
