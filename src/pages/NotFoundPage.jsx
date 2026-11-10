import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer, SectionLabel } from "../components/Layout";
import { useNoIndex } from "../hooks/useNoIndex";
import styles from "./PrivacidadPage.module.css";

export default function NotFoundPage() {
  // En navegación dentro de la SPA (enlace roto interno) el HTML ya cargado
  // es el de otra página: noindex y sin canonical mientras esta vista esté
  // montada (useNoIndex). La 404.html prerenderizada ya lo trae de serie.
  useNoIndex();
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Página no encontrada | MAbroad";
    return () => { document.title = prevTitle; };
  }, []);

  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <SectionLabel>Error 404</SectionLabel>
          <h1 className={styles.heroTitle}>Esta página no existe</h1>
          <p className={styles.heroSub}>
            Puede que el enlace esté mal escrito o que la página se haya movido.
          </p>
        </div>
      </section>

      <main className={styles.content}>
        <h2>¿Dónde quieres ir?</h2>
        <ul>
          <li><Link to="/">Explorar los 150 destinos</Link></li>
          <li><Link to="/city-match">City Match: encuentra tu ciudad ideal</Link></li>
          <li><Link to="/comparar">Comparar ciudades lado a lado</Link></li>
          <li><Link to="/beca-erasmus">Beca Erasmus+: cuánto se cobra</Link></li>
          <li><Link to="/proceso">Cómo funciona el Erasmus, paso a paso</Link></li>
        </ul>
      </main>

      <Footer />
    </div>
  );
}
