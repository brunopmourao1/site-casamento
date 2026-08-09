type RamoEucaliptoProps = {
  className?: string;
};

/**
 * Ornamento de canto — folhagem de eucalipto em marca d'água — docs/07-DESIGN.md.
 * Usar no máximo uma vez por seção, com `text-eucalipto` e opacidade ~15%.
 */
export function RamoEucalipto({ className = "" }: RamoEucaliptoProps) {
  return (
    <svg viewBox="0 0 100 140" fill="none" aria-hidden="true" className={className}>
      <path d="M90 135 L25 15" stroke="currentColor" strokeWidth="1.5" />
      <ellipse
        cx="80"
        cy="118"
        rx="10"
        ry="6"
        fill="currentColor"
        transform="rotate(-40 80 118)"
      />
      <ellipse
        cx="68"
        cy="98"
        rx="10"
        ry="6"
        fill="currentColor"
        transform="rotate(140 68 98)"
      />
      <ellipse
        cx="56"
        cy="78"
        rx="10"
        ry="6"
        fill="currentColor"
        transform="rotate(-40 56 78)"
      />
      <ellipse
        cx="44"
        cy="58"
        rx="9"
        ry="5.5"
        fill="currentColor"
        transform="rotate(140 44 58)"
      />
      <ellipse
        cx="33"
        cy="38"
        rx="8"
        ry="5"
        fill="currentColor"
        transform="rotate(-40 33 38)"
      />
    </svg>
  );
}
