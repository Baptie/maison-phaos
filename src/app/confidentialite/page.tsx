import type { Metadata } from "next";
import { site } from "@/config/site";
import { PageHeader } from "@/components/PageHeader";
import { Todo, Valeur } from "@/components/Todo";

export const metadata: Metadata = { title: "Confidentialité" };

export default function Confidentialite() {
  return (
    <>
      <PageHeader titre="Confidentialité">
        <p>Comment l&apos;association traite les informations que vous lui confiez.</p>
      </PageHeader>
      <div className="contenu">
        <div className="conteneur">
          <section className="bloc">
            <h2>Formulaire de contact</h2>
            <p>
              Les informations envoyées par le formulaire (nom, adresse e-mail, message) servent
              uniquement à répondre à votre demande. Elles ne sont ni vendues ni transmises à des
              tiers.
            </p>
            <p>
              Durée de conservation : <Todo>à fixer par l&apos;association (par exemple 12 mois)</Todo>.
            </p>
            <p>
              Responsable du traitement : <Todo>nom officiel de l&apos;association</Todo>.
            </p>
          </section>

          <section className="bloc">
            <h2>Mesure d&apos;audience et cookies</h2>
            <p>
              Ce site n&apos;utilise aucun outil de mesure d&apos;audience ni cookie publicitaire. Il
              ne nécessite donc pas de bandeau de consentement.
            </p>
          </section>

          <section className="bloc">
            <h2>Vos droits</h2>
            <p>
              Vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données en
              écrivant à <Valeur v={site.contact.email} />. Vous pouvez aussi adresser une
              réclamation à la CNIL (cnil.fr).
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
