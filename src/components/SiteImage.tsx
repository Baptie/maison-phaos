import Image from "next/image";
import type { ImageSite } from "@/config/images";

/** Image du site, ou emplacement jaune « à compléter » si aucune image n'est encore fournie. */
export function SiteImage({
  image,
  ratio = "3 / 2",
  priority = false,
  className = "",
}: {
  image: ImageSite;
  ratio?: string;
  priority?: boolean;
  className?: string;
}) {
  if (!image.src) {
    return (
      <div
        className={`image-todo ${className}`}
        style={{ aspectRatio: ratio }}
        role="img"
        aria-label={`Image à fournir : ${image.consigne}`}
      >
        <span>
          <strong>Image à fournir</strong>
          {image.consigne}
        </span>
      </div>
    );
  }
  return (
    <div className={`image-cadre ${className}`} style={{ aspectRatio: ratio }}>
      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 48rem) 100vw, 50vw" priority={priority} />
    </div>
  );
}
