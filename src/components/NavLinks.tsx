"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";

/** Liens du menu ; la page en cours est soulignée en rouge. */
export function NavLinks() {
  const chemin = usePathname();
  return (
    <ul>
      {site.navigation.map((l) => {
        const actif = chemin === l.href || chemin.startsWith(`${l.href}/`);
        return (
          <li key={l.href}>
            <Link href={l.href} aria-current={actif ? "page" : undefined}>
              {l.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
