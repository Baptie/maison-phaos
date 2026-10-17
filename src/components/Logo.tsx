/** Logo provisoire : carré marine, croix blanche. Couleurs issues du thème. */
export function LogoIcone({ taille = 44 }: { taille?: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={taille}
      height={taille}
      aria-hidden="true"
      focusable="false"
      className="logo-icone"
    >
      <rect width="100" height="100" rx="6" fill="var(--color-marine)" />
      <rect x="40.5" y="24.8" width="19" height="50.4" fill="var(--color-blanc)" />
      <rect x="24.8" y="40.6" width="50.4" height="19" fill="var(--color-blanc)" />
    </svg>
  );
}
