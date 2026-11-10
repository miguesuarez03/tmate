import { Link } from "react-router-dom";
import { Navbar, Footer, SectionLabel } from "../components/Layout";
import { useSEO } from "../hooks/useSEO";
import { getGuides, getGuidePath, getGuideReadingMinutes, GUIDES_INDEX_META, GUIDES_INDEX_JSON_LD } from "../lib/guides";
import styles from "./GuiasPage.module.css";

const GUIDES = getGuides();

export default function GuiasPage() {
  useSEO({ ...GUIDES_INDEX_META, jsonLd: GUIDES_INDEX_JSON_LD });

  return (
    <div className={styles.page}>
      <Navbar />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <SectionLabel color="var(--color-primary)">Guías Erasmus</SectionLabel>
          <h1 className={styles.title}>Todo lo que tienes que saber, explicado a fondo</h1>
          <p className={styles.sub}>
            Beca, Learning Agreement, elección de destino y papeles, con los datos oficiales enlazados en cada
            punto y ejemplos para que hagas tus propias cuentas.
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <ul className={styles.grid}>
          {GUIDES.map((g, i) => (
            <li key={g.slug}>
              <Link to={getGuidePath(g)} className={styles.card}>
                <span className={styles.cardNum}>0{i + 1}</span>
                <h2 className={styles.cardTitle}>{g.title}</h2>
                <p className={styles.cardText}>{g.summary}</p>
                <span className={styles.cardMeta}>{getGuideReadingMinutes(g)} min de lectura · Leer guía →</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className={styles.fine}>
          Las guías resumen fuentes oficiales (SEPIE, Comisión Europea, Seguridad Social, Ministerio de Asuntos
          Exteriores) enlazadas en cada guía. El dato que manda en tu caso es siempre el de tu universidad y su
          convocatoria. MAbroad no tiene relación con la Comisión Europea, el SEPIE ni las universidades.
        </p>
      </main>

      <Footer />
    </div>
  );
}
