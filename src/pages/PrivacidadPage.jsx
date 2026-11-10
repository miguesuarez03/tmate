import { Navbar, Footer, SectionLabel } from "../components/Layout";
import { useSEO } from "../hooks/useSEO";
import { GA_MEASUREMENT_ID } from "../lib/analytics";
import styles from "./PrivacidadPage.module.css";

const CONTACT_EMAIL = "suarezalvarez.ma03@gmail.com";
const LAST_UPDATED = "9 de noviembre de 2026";

export default function PrivacidadPage() {
  useSEO({
    title: "Privacidad y cookies | MAbroad",
    description:
      "Qué datos trata MAbroad y para qué: analítica anónima sin cookies (Vercel Web Analytics), formulario de feedback y preferencias guardadas en tu navegador.",
  });

  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <SectionLabel>Legal</SectionLabel>
          <h1 className={styles.heroTitle}>Privacidad y cookies</h1>
          <p className={styles.heroSub}>
            Qué datos tratamos, para qué y con quién. Corto y sin letra pequeña.
          </p>
        </div>
      </section>

      <main className={styles.content}>
        <p className={styles.updated}>Última actualización: {LAST_UPDATED}</p>

        <h2>Resumen</h2>
        <ul>
          <li>No necesitas cuenta para usar MAbroad.</li>
          <li>
            {GA_MEASUREMENT_ID
              ? "La analítica principal (Vercel Web Analytics) no usa cookies; Google Analytics sí, ver más abajo."
              : "No usamos cookies de analítica ni de publicidad."}
          </li>
          <li>Medimos visitas de forma anónima y agregada para saber qué partes de la web se usan.</li>
          <li>Solo recibimos datos tuyos si nos los mandas tú (por ejemplo, en el formulario de feedback).</li>
        </ul>

        <h2>Analítica: Vercel Web Analytics y Speed Insights</h2>
        <p>
          Usamos <strong>Vercel Web Analytics</strong> para contar visitas y <strong>Vercel Speed
          Insights</strong> para medir la velocidad de carga de la web. Ambos servicios son de Vercel
          Inc., el proveedor que aloja MAbroad.
        </p>
        <ul>
          <li><strong>Sin cookies:</strong> no instalan cookies ni guardan identificadores en tu dispositivo.</li>
          <li>
            <strong>Datos anónimos y agregados:</strong> páginas vistas, página de procedencia, país,
            tipo de dispositivo, sistema operativo y navegador, y métricas de rendimiento (tiempos de carga).
            No vemos quién eres ni podemos seguirte entre webs.
          </li>
          <li>
            Para no contar dos veces la misma visita, Vercel usa un identificador temporal calculado a
            partir de la petición que se descarta automáticamente al cabo de un día.
          </li>
        </ul>
        <p>
          Al no usar cookies ni acceder a información de tu dispositivo, esta analítica no requiere
          banner de consentimiento. Más información en la{" "}
          <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">
            política de privacidad de Vercel Web Analytics
          </a>.
        </p>

        {GA_MEASUREMENT_ID && (
          <>
            <h2>Google Analytics</h2>
            <p>
              También usamos Google Analytics 4, que sí utiliza cookies propias de Google para
              distinguir visitas. Puedes bloquearlas desde la configuración de tu navegador o con el{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                complemento de inhabilitación de Google
              </a>.
            </p>
          </>
        )}

        <h2>Formulario de feedback «¿Qué te falta?»</h2>
        <p>
          Si nos escribes desde el botón de feedback, recibimos tu mensaje, la página desde la que lo
          envías y, solo si lo indicas, tu email (para poder responderte). El envío se gestiona a través
          de <strong>Web3Forms</strong>, que nos lo reenvía por correo. Usamos esa información únicamente
          para mejorar la web y, si nos dejas email, para contestarte. No la cedemos a terceros con otros
          fines ni la usamos para enviarte publicidad.
        </p>

        <h2>Formulario «Comparte tu experiencia»</h2>
        <p>
          Si nos cuentas tu experiencia, recibimos la ciudad, el año, tu universidad de origen, el nombre
          o alias que elijas, tu texto, la valoración (si la das) y, solo si lo indicas, tu email. El
          envío se gestiona a través de <strong>Web3Forms</strong>. La leemos a mano antes de decidir si
          se publica.
        </p>
        <ul>
          <li>
            <strong>Qué se publica:</strong> tu nombre o alias, la ciudad, el año, tu universidad de
            origen, la valoración y el texto. Tu email nunca se publica: solo lo usamos para avisarte o
            preguntarte algo sobre tu experiencia.
          </li>
          <li>
            <strong>Base:</strong> tu consentimiento, que das al marcar la casilla antes de enviar. Puedes
            retirarlo cuando quieras escribiéndonos y quitaremos tu experiencia de la web.
          </li>
          <li>
            Si no la publicamos, borramos el envío. No la usamos para nada más ni la cedemos a terceros.
          </li>
        </ul>

        <h2>Lo que se guarda en tu navegador</h2>
        <p>
          Algunas preferencias se guardan en el almacenamiento local de tu navegador (localStorage), no
          en cookies, y nunca se envían a nuestros servidores: el tema claro/oscuro, tus ciudades
          favoritas, el progreso del checklist y el borrador del Learning Agreement, y la posición de
          scroll al volver atrás. Puedes borrarlas cuando quieras limpiando los datos del sitio en tu
          navegador.
        </p>

        <h2>Otros servicios externos</h2>
        <p>
          Para mostrar la web cargamos tipografías de Google Fonts, imágenes de Unsplash y Wikimedia, y
          datos de mapas de jsDelivr y OpenStreetMap. Al cargarlas, tu navegador se conecta a esos
          servicios, que pueden ver tu dirección IP como en cualquier petición web.
        </p>

        <h2>Tus derechos y contacto</h2>
        <p>
          Puedes pedirnos acceder, rectificar o borrar cualquier dato que nos hayas enviado escribiendo a{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Si crees que no hemos tratado bien tus
          datos, también puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).
        </p>
      </main>

      <Footer />
    </div>
  );
}
