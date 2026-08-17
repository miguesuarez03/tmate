import { useNavigate } from "react-router-dom";
import { Navbar, Footer, SectionLabel } from "../components/Layout";
import { IconGlobo, IconBeca, IconDocumento, IconMaleta } from "../components/icons";
import { useSEO } from "../hooks/useSEO";
import styles from "./TiposDeIntercambioPage.module.css";

/* ─── DATA ──────────────────────────────────────────────────────────────── */

const PROGRAM_TYPES = [
  {
    id: "erasmus",
    Icon: IconBeca,
    color: "#10B981",
    title: "Erasmus+",
    tag: "Programa europeo",
    what: "El programa oficial de la Unión Europea para estudiar en otra universidad europea con convenio. Es el más extendido y el que tiene detrás toda la maquinaria de becas, convalidaciones automáticas y soporte institucional.",
    visa: "No hace falta visado — te mueves dentro del Espacio Erasmus+ (UE + países asociados como Noruega, Islandia o Turquía) con tu DNI/pasaporte.",
    financing: "Beca Erasmus+ (importe según grupo de país de destino) + posibles ayudas autonómicas/MEC. El Learning Agreement garantiza que las asignaturas que curses fuera se convalidan automáticamente.",
  },
  {
    id: "uk_bilateral",
    Icon: IconMaleta,
    color: "#0EA5E9",
    title: "Reino Unido",
    tag: "Convenio bilateral",
    what: "Desde el Brexit, Reino Unido salió del programa Erasmus+. Ir a universidades como Londres, Edimburgo o Mánchester se hace a través de convenios bilaterales que tu universidad haya firmado directamente con la universidad británica.",
    visa: "Sí hace falta visado de estudiante (Student Route), con sus propios requisitos económicos y de matrícula — infórmate con tiempo en la web oficial del gobierno británico.",
    financing: "No hay beca Erasmus+ asociada. La financiación depende de fondos propios, becas específicas de tu universidad o comunidad autónoma, o financiación propia. El papeleo de equivalencias de asignaturas lo define tu universidad de origen, no un Learning Agreement estándar.",
  },
  {
    id: "switzerland_bilateral",
    Icon: IconGlobo,
    color: "#F59E0B",
    title: "Suiza",
    tag: "Convenio bilateral",
    what: "Suiza tampoco participa en Erasmus+ como país miembro de pleno derecho. Los intercambios a ciudades como Ginebra, Lausana, Zúrich, Basilea o Berna funcionan mediante convenios bilaterales o el programa suizo equivalente (Swiss-European Mobility Programme).",
    visa: "Depende de la duración de la estancia y tu nacionalidad — para estancias largas suele requerirse permiso de residencia para estudiantes. Consulta con la embajada suiza con antelación.",
    financing: "No hay beca Erasmus+ asociada. Suiza suele compensar con sus propias ayudas (a veces gestionadas por la universidad de destino), pero no sustituyen a la beca Erasmus+ — cuenta con financiación propia o de tu universidad.",
  },
];

/* ─── PÁGINA ────────────────────────────────────────────────────────────── */

export default function TiposDeIntercambioPage() {
  const navigate = useNavigate();

  useSEO({
    title: "Tipos de intercambio: Erasmus+, UK y Suiza | MAbroad",
    description: "Erasmus+, Reino Unido y Suiza explicados con detalle: qué es cada programa, si necesitas visado y cómo funciona la financiación en cada caso.",
  });

  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <SectionLabel color="#10B981">Guía rápida</SectionLabel>
          <h1 className={styles.heroTitle}>Tipos de intercambio</h1>
          <p className={styles.heroSub}>
            No todos los destinos de MAbroad son Erasmus+. Aquí te explicamos qué significa cada tipo de programa,
            si necesitas visado y cómo funciona la financiación, para que sepas a qué atenerte antes de elegir destino.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          {PROGRAM_TYPES.map((p) => (
            <div key={p.id} className={styles.card} style={{ "--accent": p.color }}>
              <div className={styles.cardHead}>
                <span className={styles.cardIcon} style={{ background: p.color }}>
                  <p.Icon size={24} />
                </span>
                <div>
                  <span className={styles.cardTag}>{p.tag}</span>
                  <h2 className={styles.cardTitle}>{p.title}</h2>
                </div>
              </div>

              <div className={styles.cardBlock}>
                <h3 className={styles.cardBlockLabel}>Qué es</h3>
                <p className={styles.cardBlockText}>{p.what}</p>
              </div>
              <div className={styles.cardBlock}>
                <h3 className={styles.cardBlockLabel} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <IconDocumento size={16} /> Visado
                </h3>
                <p className={styles.cardBlockText}>{p.visa}</p>
              </div>
              <div className={styles.cardBlock}>
                <h3 className={styles.cardBlockLabel} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <IconBeca size={16} /> Financiación
                </h3>
                <p className={styles.cardBlockText}>{p.financing}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>¿Ya sabes qué tipo de destino buscas?</h2>
        <p className={styles.ctaSub}>Explora los destinos de MAbroad o haz el City Match para encontrar el tuyo.</p>
        <div className={styles.ctaBtns}>
          <button className="btn-primary" onClick={() => navigate("/")}>
            Explorar destinos →
          </button>
          <button className="btn-ghost" onClick={() => navigate("/city-match")}>
            Hacer el City Match
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
