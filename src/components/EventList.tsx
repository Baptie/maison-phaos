import { dateLongue, heure, jourEtMois } from "@/lib/format";
import type { Evenement, Resultat } from "@/lib/types";

export function EventList({ resultat }: { resultat: Resultat<Evenement[]> }) {
  const { donnees, factice, erreur } = resultat;

  if (erreur) return <p className="vide">{erreur}</p>;
  if (donnees.length === 0)
    return <p className="vide">Aucun événement n&apos;est prévu pour le moment.</p>;

  return (
    <div className={factice ? "zone-factice" : undefined}>
      {factice ? (
        <p className="zone-factice__note bloc">
          Événements de démonstration : l&apos;agenda Google de l&apos;association n&apos;est pas
          encore branché.
        </p>
      ) : null}
      <ol className="agenda">
        {donnees.map((ev) => {
          const { jour, mois } = jourEtMois(ev.debut);
          return (
            <li key={ev.id} className="agenda__item bloc">
              <p className="agenda__date" aria-hidden="true">
                <span className="agenda__jour">{jour}</span>
                <span className="agenda__mois">{mois}</span>
              </p>
              <div className="agenda__corps">
                <h3 className="agenda__titre">{ev.titre}</h3>
                <p className="agenda__quand">
                  <time dateTime={ev.debut}>{dateLongue(ev.debut)}</time>
                  {ev.journeeEntiere ? (
                    ", toute la journée"
                  ) : (
                    <>
                      , {heure(ev.debut)}
                      {ev.fin ? <> à {heure(ev.fin)}</> : null}
                    </>
                  )}
                </p>
                {ev.lieu ? <p className="agenda__lieu">{ev.lieu}</p> : null}
                {ev.description ? <p className="agenda__desc">{ev.description}</p> : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
