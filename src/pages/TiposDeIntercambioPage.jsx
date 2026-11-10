import { useNavigate } from "react-router-dom";
import { Navbar, Footer, SectionLabel } from "../components/Layout";
import { IconGlobo, IconBeca, IconDocumento, IconMaleta, IconViajes } from "../components/icons";
import { useSEO } from "../hooks/useSEO";
import styles from "./TiposDeIntercambioPage.module.css";

/* ─── DATA ──────────────────────────────────────────────────────────────── */

// Fuentes (consultadas en noviembre de 2026): Comisión Europea (learning
// agreement, 19/12/2025), GOV.UK (Standard Visitor y ETA), SEM suiza (FAQ
// UE/AELC, 06/07/2026), SERI suiza (estado de Suiza en Erasmus+), Ministerio
// de Exteriores de Türkiye (información de visados), UDI noruega (registro
// UE/EEE) y SEPIE (convocatoria 2026, KA131 y KA171). Lo que no se ha podido
// verificar para cada caso remite al consulado.
const PROGRAM_TYPES = [
  {
    id: "erasmus",
    Icon: IconBeca,
    color: "#10B981",
    title: "Erasmus+",
    tag: "Programa europeo",
    what: "El programa de la Unión Europea para estudiar en otra universidad europea con la que la tuya tenga convenio. Es el más extendido: tiene detrás las becas Erasmus+ y un Learning Agreement que fija qué estudiarás fuera para que te lo reconozcan.",
    visa: "Si tienes nacionalidad de un país de la UE, no necesitas visado para estudiar en otro país de la UE ni en Noruega, Islandia o Liechtenstein, aunque para estancias de más de 3 meses suele haber que registrarse como residente (en Noruega, por ejemplo, es obligatorio). Turquía es distinto: entrar como turista no es lo mismo que una estancia de estudios. Su Ministerio de Exteriores indica que los visados para estudiar los dan sus embajadas y consulados, y para quedarte más de 90 días necesitarás un permiso de residencia. Consulta en el consulado de Turquía, y en el de tu destino si no tienes nacionalidad de la UE.",
    financing: "Beca Erasmus+ (el importe depende del grupo del país de destino y lo fija tu universidad dentro del rango del SEPIE) y posibles ayudas autonómicas o de tu universidad. El Learning Agreement sirve para que te reconozcan las asignaturas que apruebes según lo acordado.",
  },
  {
    id: "uk_bilateral",
    Icon: IconMaleta,
    color: "#3F7A7D",
    title: "Reino Unido",
    tag: "Convenio bilateral",
    what: "Desde el Brexit, Reino Unido no participa en Erasmus+. Ir a universidades como Londres, Edimburgo o Mánchester se hace a través de convenios bilaterales que tu universidad haya firmado directamente con la universidad británica.",
    visa: "Depende de la duración. Para estudiar hasta 6 meses puedes entrar como visitante (Standard Visitor); con pasaporte europeo, normalmente necesitas una ETA, una autorización electrónica de viaje de pago. Para más de 6 meses necesitas el visado de estudiante (Student visa). Confírmalo en GOV.UK antes de aceptar la plaza.",
    financing: "La mayoría de plazas son convenios bilaterales sin beca Erasmus+: cuenta con becas de tu universidad o comunidad autónoma, o con financiación propia. Algunas universidades financian estancias en Reino Unido con fondos Erasmus+ para países no asociados (la convocatoria del SEPIE lo incluye en el grupo 1): pregunta en tu oficina de relaciones internacionales. El papeleo de equivalencias lo define tu universidad de origen.",
  },
  {
    id: "switzerland_bilateral",
    Icon: IconGlobo,
    color: "#F59E0B",
    title: "Suiza",
    tag: "Convenio bilateral",
    what: "Suiza no está asociada a Erasmus+ 2021-2027: tiene su propio programa de movilidad, compatible con Erasmus+ (la «solución suiza»). Los intercambios a Ginebra, Lausana, Zúrich, Basilea o Berna funcionan con convenios entre universidades. Su gobierno prevé asociarse a Erasmus+ en 2027, pero depende de que el Parlamento apruebe la financiación.",
    visa: "Con nacionalidad de la UE no necesitas visado. Si vas a estudiar más de 3 meses, tienes que registrarte como máximo 14 días después de llegar y te darán un permiso para la duración de tus estudios; además, tendrás que contratar un seguro médico suizo. Si no tienes nacionalidad de la UE, consulta en el consulado de Suiza.",
    financing: "Normalmente no hay beca Erasmus+: Suiza suele compensar con sus propias ayudas (a veces gestionadas por la universidad de destino), pero no sustituyen a la beca Erasmus+. Algunas universidades usan fondos Erasmus+ para países no asociados (la convocatoria del SEPIE incluye a Suiza en el grupo 1): pregunta en tu oficina de relaciones internacionales.",
  },
  {
    id: "international",
    Icon: IconViajes,
    color: "#2F5073",
    title: "Fuera de Europa",
    tag: "Convenio bilateral",
    what: "Estados Unidos, Canadá, Latinoamérica… Se va con los convenios bilaterales que tu universidad haya firmado con universidades de fuera de Europa.",
    visa: "Casi siempre necesitas un visado o permiso de estudiante, distinto de la entrada como turista, y los requisitos cambian según el país, la duración y tu nacionalidad. Consúltalo en el consulado del país de destino antes de aceptar la plaza: suele llevar semanas.",
    financing: "Normalmente no hay beca Erasmus+. Depende de las ayudas de tu universidad; algunas tienen plazas de movilidad internacional Erasmus+ (KA171) para países concretos, con sus propias condiciones.",
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
