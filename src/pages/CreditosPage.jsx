import { Link } from "react-router-dom";
import { Navbar, Footer, SectionLabel } from "../components/Layout";
import { useSEO } from "../hooks/useSEO";
import { useNoIndex } from "../hooks/useNoIndex";
import { CITIES } from "../data/cities";
import { cityPhotoCredits } from "../lib/photoCredits";
import base from "./PrivacidadPage.module.css";
import styles from "./CreditosPage.module.css";

// Una fila por foto de Wikimedia Commons de cada ciudad. Sale de la misma
// tabla que los tamaños (src/data/wikimediaPhotos.js, npm run photos:meta):
// al cambiar una foto, esta página se actualiza sola.
const CREDITS = cityPhotoCredits(CITIES);

export default function CreditosPage() {
  useSEO({
    title: "Créditos de las fotos | MAbroad",
    description: "Autores y licencias de las fotos de las ciudades de MAbroad, de Wikimedia Commons.",
  });
  useNoIndex();

  return (
    <div className={base.page}>
      <Navbar />

      <section className={base.hero}>
        <div className={base.heroContent}>
          <SectionLabel>Créditos</SectionLabel>
          <h1 className={base.heroTitle}>Créditos de las fotos</h1>
          <p className={base.heroSub}>
            Gracias a quienes comparten sus fotos con licencias libres.
          </p>
        </div>
      </section>

      <main className={`${base.content} ${styles.content}`}>
        <p>
          Las fotos de las ciudades son de{" "}
          <a href="https://commons.wikimedia.org/" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>{" "}
          y se usan con licencias libres (Creative Commons, Arte Libre o dominio público). Cada foto
          lleva además su crédito en el pequeño icono ⓘ de una de sus esquinas.
        </p>
        <p>
          Las fotos genéricas restantes son de Unsplash (Licencia Unsplash) y el vídeo de la portada,
          de Pexels (Licencia Pexels): ninguna de las dos exige atribución.
        </p>

        <h2>Fotos de las ciudades ({CREDITS.length})</h2>
        <table className={styles.table}>
          <caption className="sr-only">Foto de cada ciudad: autor, licencia y enlace a Wikimedia Commons</caption>
          <thead>
            <tr>
              <th scope="col">Ciudad</th>
              <th scope="col">Autor</th>
              <th scope="col">Licencia</th>
              <th scope="col"><span className="sr-only">Original</span></th>
            </tr>
          </thead>
          <tbody>
            {CREDITS.map((c) => (
              <tr key={`${c.slug}-${c.sourceUrl}`}>
                <th scope="row" className={styles.city}>
                  <Link to={`/city/${c.slug}`}>{c.city}</Link>
                  <span className={styles.country}>{c.country}</span>
                </th>
                <td data-label="Autor">{c.author}</td>
                <td data-label="Licencia">
                  {c.licenseUrl
                    ? <a href={c.licenseUrl} target="_blank" rel="license noopener noreferrer">{c.license}</a>
                    : c.license}
                </td>
                <td>
                  <a href={c.sourceUrl} target="_blank" rel="noopener noreferrer">
                    Ver en Commons<span className="sr-only"> (foto de {c.city})</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <Footer />
    </div>
  );
}
