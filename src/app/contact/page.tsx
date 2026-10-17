import type { Metadata } from "next";
import { site } from "@/config/site";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { Todo, Valeur } from "@/components/Todo";

export const metadata: Metadata = { title: "Contact" };

type Props = { searchParams: Promise<{ objet?: string }> };

export default async function Contact({ searchParams }: Props) {
  const { objet } = await searchParams;

  return (
    <>
      <PageHeader titre="Contact">
        <p>Une question, une demande d&apos;aide, une envie d&apos;agir&nbsp;? Écrivez-nous.</p>
      </PageHeader>

      <div className="contenu">
        <div className="conteneur deux-colonnes">
          <div className="bloc">
            <ContactForm objetInitial={objet} emailSecours={site.contact.email.valeur} />
          </div>

          <aside className="encadre bloc">
            <h2>Autres moyens de nous joindre</h2>
            <p>
              <strong>Téléphone</strong>
              <br />
              <Valeur v={site.contact.telephone} />
            </p>
            <p>
              <strong>Adresse</strong>
              <br />
              <Valeur v={site.contact.adresse} />
            </p>
            <p>
              <strong>Les messages du formulaire sont reçus à</strong>
              <br />
              <Valeur v={site.contact.email} />
            </p>
            <p className="texte-doux">
              <Todo>Délai de réponse habituel à préciser.</Todo>
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
