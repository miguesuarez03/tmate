import { Link } from "react-router-dom";
import { Navbar, Footer, SectionLabel } from "../components/Layout";
import { useSEO } from "../hooks/useSEO";
import { UNIVERSITY_REGISTRY } from "../data/universities/registry";
import { UNIVERSITY_INDEX } from "../data/generated/universityIndex";
import {
  UNIVERSITIES_INDEX_META, UNIVERSITIES_INDEX_JSON_LD, formatTotals, formatExtractedAt, getUniversityPath,
} from "../lib/universities";
import styles from "./UniversityPage.module.css";

/* /universidades — índice de las universidades del registro, con sus cifras
   (src/data/generated/universityIndex.js, de scripts/city-data.mjs). */

const TOTALS = new Map(UNIVERSITY_INDEX.map((u) => [u.id, u]));

export default function UniversidadesPage() {
  useSEO({ ...UNIVERSITIES_INDEX_META, jsonLd: UNIVERSITIES_INDEX_JSON_LD });

  return (
    <div className={styles.page}>
      <Navbar />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <nav aria-label="Migas de pan" className={styles.crumbs}>
            <Link to="/">Inicio</Link> <span aria-hidden="true">›</span> <span aria-current="page">Universidades</span>
          </nav>
          <SectionLabel color="var(--color-primary)">Mi universidad</SectionLabel>
          <h1 className={styles.title}>Destinos Erasmus por universidad</h1>
          <p className={styles.sub}>
            Los convenios de intercambio de cada universidad, por grado y por país, con el idioma que pide cada
            destino y la ficha de la ciudad. Salen del portal de movilidad oficial de cada universidad.
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <ul className={styles.grid}>
          {UNIVERSITY_REGISTRY.map((u) => {
            const t = TOTALS.get(u.id);
            return (
              <li key={u.id}>
                <Link to={getUniversityPath(u.id)} className={styles.card}>
                  <h2 className={styles.cardTitle}>{u.name}</h2>
                  {t && <p className={styles.cardText}>{formatTotals(t.totals)} fuera de España.</p>}
                  {u.campuses?.length > 0 && (
                    <p className={styles.cardText}>Campus: {u.campuses.map((c) => c.name).join(", ")}</p>
                  )}
                  <span className={styles.cardMeta}>
                    {t ? `Datos del ${formatExtractedAt(t.extractedAt)} · ` : ""}Ver destinos →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className={styles.fine} style={{ marginTop: 32 }}>
          Iremos añadiendo más universidades. Cada convenio es un acuerdo con una universidad de destino, no un número
          de plazas: las plazas, fechas y requisitos los da tu Oficina de Relaciones Internacionales.
        </p>
      </main>

      <Footer />
    </div>
  );
}
