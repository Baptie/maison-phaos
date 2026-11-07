/** Pictogrammes « en construction » (décoratifs, la couleur suit le texte). */
type Props = { taille?: number };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  focusable: false,
} as const;

/** Casque de chantier */
export function IconeChantier({ taille = 20 }: Props) {
  return (
    <svg {...base} width={taille} height={taille}>
      <path d="M3 18h18" />
      <path d="M5 18a7 7 0 0 1 14 0" />
      <path d="M10 11V6.5h4V11" />
    </svg>
  );
}

/** Appareil photo, pour les photos à venir */
export function IconePhoto({ taille = 28 }: Props) {
  return (
    <svg {...base} width={taille} height={taille}>
      <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}
