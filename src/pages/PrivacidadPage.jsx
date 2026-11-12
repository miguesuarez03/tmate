import { Navbar, Footer, SectionLabel } from "../components/Layout";
import { useSEO } from "../hooks/useSEO";
import styles from "./PrivacidadPage.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// Aviso legal (titular, art. 10 LSSI) + política de privacidad (art. 13 RGPD).
// /aviso-legal redirige aquí (vercel.json + <Navigate> en App y entry-server).
// Si cambias el título o la descripción, actualiza también STATIC_PAGE_META
// en src/entry-server.jsx.
// ─────────────────────────────────────────────────────────────────────────────

const OWNER_NAME = "Miguel Ángel Suárez Álvarez";
const CONTACT_EMAIL = "suarezalvarez.ma03@gmail.com";
const LAST_UPDATED = "10 de noviembre de 2026";

/** Una fila «Etiqueta: texto» de la ficha de cada tratamiento. */
function Item({ label, children }) {
  return <li><strong>{label}:</strong> {children}</li>;
}

export default function PrivacidadPage() {
  useSEO({
    title: "Aviso legal y privacidad | MAbroad",
    description:
      "Quién está detrás de MAbroad y qué datos trata: analítica sin cookies, formularios, plazos de conservación, destinatarios y cómo ejercer tus derechos.",
  });

  const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <SectionLabel>Legal</SectionLabel>
          <h1 className={styles.heroTitle}>Aviso legal y privacidad</h1>
          <p className={styles.heroSub}>
            Quién está detrás de MAbroad, qué datos tratamos, para qué y con quién. Sin letra pequeña.
          </p>
        </div>
      </section>

      <main className={styles.content}>
        <p className={styles.updated}>Última actualización: {LAST_UPDATED}</p>

        <h2>Resumen</h2>
        <ul>
          <li>MAbroad lo hace {OWNER_NAME}, un particular. Para cualquier cosa: {mail}.</li>
          <li>No necesitas cuenta para usar la web.</li>
          <li>No usamos cookies: ni de analítica, ni de publicidad, ni de ningún otro tipo.</li>
          <li>Medimos las visitas de forma anónima y agregada para saber qué partes de la web se usan.</li>
          <li>Solo recibimos datos tuyos si nos los mandas tú: el botón de feedback, «Comparte tu experiencia» o el asistente del Learning Agreement.</li>
          <li>No vendemos ni cedemos tus datos, ni los usamos para publicidad.</li>
        </ul>

        <h2>Titular de la web</h2>
        <p>
          MAbroad (www.mabroad.com) es una web gratuita e informativa para estudiantes que preparan un
          intercambio. Su titular, y responsable del tratamiento de los datos que se describen aquí, es:
        </p>
        <ul>
          <Item label="Titular">{OWNER_NAME}, particular residente en España.</Item>
          <Item label="Contacto">{mail}</Item>
          {/*
            Cuando haya actividad económica (afiliados, publicidad, ventas) o se
            cree la empresa, añadir aquí lo que exige el art. 10 de la LSSI:
              <Item label="NIF">…</Item>
              <Item label="Domicilio">…</Item>
            Y si el titular pasa a ser una sociedad: denominación social, CIF,
            domicilio social y datos de inscripción en el Registro Mercantil.
            Cambiar entonces también «particular residente en España».
          */}
        </ul>
        <p>
          Por ahora MAbroad no tiene actividad económica: no cobra nada, no tiene publicidad ni enlaces de
          afiliados.
        </p>

        <h2>1. Datos técnicos al visitar la web</h2>
        <ul>
          <Item label="Qué datos">
            tu dirección IP, el navegador y sistema operativo, la página que pides, la fecha y hora, y la
            página de la que vienes. Es lo que cualquier navegador envía al abrir una web.
          </Item>
          <Item label="Para qué">mostrarte la web, mantenerla segura y evitar abusos.</Item>
          <Item label="Base legal">
            interés legítimo en que la web funcione y sea segura (art. 6.1.f RGPD).
          </Item>
          <Item label="Cuánto tiempo">
            nosotros no guardamos ni consultamos registros con IP. Vercel los conserva el tiempo mínimo
            necesario para estos fines, según su política de privacidad.
          </Item>
          <Item label="Quién los recibe">
            Vercel Inc. (Estados Unidos), la empresa que aloja la web. Ver «Transferencias internacionales».
          </Item>
        </ul>

        <h2>2. Analítica: Vercel Web Analytics y Speed Insights</h2>
        <ul>
          <Item label="Qué datos">
            la página que visitas (su dirección completa, que puede incluir parámetros como las respuestas de
            City Match), la página de procedencia, el país o la zona aproximada, el tipo de dispositivo, el
            sistema operativo y el navegador, y métricas de velocidad de carga. Para no contar dos veces la
            misma visita, Vercel calcula un identificador a partir de la petición que se descarta a las
            24 horas. No usa cookies ni guarda nada en tu dispositivo, y nosotros no vemos tu IP ni sabemos
            quién eres.
          </Item>
          <Item label="Para qué">saber, en conjunto, qué partes de la web se usan y si carga rápido, para mejorarla.</Item>
          <Item label="Base legal">
            interés legítimo en medir el uso de la web de forma agregada (art. 6.1.f RGPD). Puedes oponerte
            bloqueando los scripts de analítica con tu navegador o con una extensión. Como no usa cookies ni
            accede a tu dispositivo, no te pedimos consentimiento con un banner.
          </Item>
          <Item label="Cuánto tiempo">
            las estadísticas se pueden consultar en el panel de Vercel durante el periodo de su plan (1 mes en
            el gratuito, 12 en los de pago); Vercel puede guardarlas más tiempo según su política.
          </Item>
          <Item label="Quién los recibe">Vercel Inc. (Estados Unidos).</Item>
        </ul>
        <p>
          Más información en la{" "}
          <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">
            política de privacidad de Vercel Web Analytics
          </a>.
        </p>

        <h2>3. Botón de feedback «¿Qué te falta?»</h2>
        <ul>
          <Item label="Qué datos">
            tu mensaje, la página desde la que escribes (su dirección completa) y, solo si lo indicas, tu
            email. Web3Forms registra además datos técnicos del envío, como la IP y la fecha y hora.
          </Item>
          <Item label="Para qué">leer tu sugerencia para mejorar la web y, si dejas email, contestarte.</Item>
          <Item label="Base legal">
            tu consentimiento, que das al enviar el mensaje (art. 6.1.a RGPD). Puedes retirarlo cuando quieras
            pidiéndonos que lo borremos.
          </Item>
          <Item label="Cuánto tiempo">
            lo guardamos en nuestro correo un máximo de 12 meses. Web3Forms conserva una copia hasta 3 años,
            como establece su contrato de tratamiento de datos.
          </Item>
          <Item label="Quién los recibe">
            <strong>Web3Forms</strong>, servicio de Web3Creative (India), que gestiona el envío por encargo
            nuestro. Aloja los datos en Amazon Web Services, Cloudflare y Hetzner (Unión Europea) y, para
            filtrar spam, pasa la IP y el email a CleanTalk y Akismet (Estados Unidos). Después el mensaje nos
            llega a nuestro correo, que es Gmail (Google). Ver «Transferencias internacionales».
          </Item>
        </ul>

        <h2>4. Formulario «Comparte tu experiencia»</h2>
        <ul>
          <Item label="Qué datos">
            la ciudad, el curso, tu universidad de origen y la de destino (si la indicas), el nombre o alias
            que elijas, si prefieres salir sin nombre, tu texto, la valoración (si la das), tu email (solo si
            lo indicas) y la fecha en que aceptas la casilla. Web3Forms
            registra además la IP y la fecha y hora del envío.
          </Item>
          <Item label="Para qué">
            revisar tu experiencia y, si la aprobamos, publicarla en la ficha de la ciudad y en la portada. El
            email solo lo usamos para avisarte cuando se publique o preguntarte algo sobre ella.
          </Item>
          <Item label="Qué se publica">
            tu nombre o alias (o «Estudiante de» tu universidad, si prefieres salir sin nombre), la ciudad, el
            curso, tus universidades, la valoración y el texto. Tu email, nunca. Lo publicado lo puede ver
            cualquier visitante.
          </Item>
          <Item label="Base legal">
            tu consentimiento, que das al marcar la casilla antes de enviar (art. 6.1.a RGPD). Puedes retirarlo
            cuando quieras y quitaremos tu experiencia de la web.
          </Item>
          <Item label="Cuánto tiempo">
            si se publica, mientras siga publicada o hasta que retires tu consentimiento. Si no se publica,
            borramos el envío de nuestro correo en un mes. Tu email lo borramos cuando ya no haga falta para
            avisarte, como máximo a los 12 meses. Web3Forms conserva una copia hasta 3 años.
          </Item>
          <Item label="Quién los recibe">
            Web3Forms y nuestro correo, igual que en el feedback. Una vez publicada, cualquier visitante.
          </Item>
        </ul>

        <h2>5. Asistente del Learning Agreement</h2>
        <p>
          Mientras rellenas el asistente, el borrador se guarda solo en tu navegador. Al pulsar «Enviar
          solicitud» nos llega a través de Web3Forms, como los demás formularios. Si el envío falla, puedes
          mandárnoslo desde tu propio correo con el texto ya escrito.
        </p>
        <ul>
          <Item label="Qué datos">
            tu universidad y grado de origen, la ciudad y universidad de destino, las asignaturas a convalidar,
            los créditos, el idioma, tu nombre y tu email. Web3Forms registra además la IP y la fecha y hora
            del envío.
          </Item>
          <Item label="Para qué">
            prepararte una propuesta orientativa de equivalencias y enviártela por email. No es el Learning
            Agreement oficial, que firmáis tú y las dos universidades.
          </Item>
          <Item label="Base legal">atender la solicitud que tú nos haces (art. 6.1.b RGPD).</Item>
          <Item label="Cuánto tiempo">
            borramos tu solicitud y nuestra respuesta de nuestro correo 6 meses después de contestarte.
            Web3Forms conserva una copia hasta 3 años, como establece su contrato de tratamiento de datos.
          </Item>
          <Item label="Quién los recibe">
            Web3Forms y nuestro correo, igual que en el feedback (ver apartado 3). Si usas el envío de respaldo
            desde tu correo, también tu proveedor de email.
          </Item>
        </ul>

        <h2>Lo que se guarda en tu navegador</h2>
        <p>
          <strong>No usamos cookies.</strong> Algunas cosas se guardan en el almacenamiento de tu navegador
          para que funcionen las opciones que tú usas. Nunca se envían a nuestros servidores y por eso no
          necesitan consentimiento:
        </p>
        <ul>
          <li>
            <strong>Hasta que borres los datos del sitio</strong> (localStorage): el tema claro u oscuro, tus
            ciudades favoritas, si pausaste el vídeo de la portada, el progreso del checklist del Learning
            Agreement y el borrador de su asistente (con tu nombre y email si los escribiste; se borra al
            enviar la solicitud).
          </li>
          <li>
            <strong>Hasta que cierras la pestaña</strong> (sessionStorage): las ciudades que estás comparando
            y la posición de scroll para volver atrás.
          </li>
        </ul>
        <p>Puedes borrarlo todo cuando quieras limpiando los datos del sitio en tu navegador.</p>

        <h2>Otros servicios que carga la web</h2>
        <p>
          Las tipografías y los datos del mapa se sirven desde nuestro propio dominio. Para mostrar la web, tu
          navegador solo se conecta directamente a estos servicios, que ven tu dirección IP como en cualquier
          web. No les enviamos otros datos tuyos:
        </p>
        <ul>
          <li><strong>Wikimedia Commons</strong> (Wikimedia Foundation, Estados Unidos) y <strong>Unsplash</strong>: las fotos.</li>
          <li>
            <strong>Nominatim</strong>, de la OpenStreetMap Foundation (Reino Unido): solo si pulsas «Calcular
            distancia» en la calculadora de la beca. Recibe la ciudad de origen que escribes.
          </li>
        </ul>

        <h2>Transferencias internacionales</h2>
        <p>Algunos de los servicios anteriores tratan datos fuera del Espacio Económico Europeo:</p>
        <ul>
          <li>
            <strong>Estados Unidos — Vercel Inc. y Google LLC (nuestro correo, Gmail):</strong> están adheridas al Marco de Privacidad
            de Datos UE-EE. UU. (Data Privacy Framework), reconocido por la Comisión Europea en la Decisión de
            Ejecución (UE) 2023/1795.
          </li>
          <li>
            <strong>India — Web3Creative (Web3Forms):</strong> con las cláusulas contractuales tipo de la
            Comisión Europea (Decisión de Ejecución (UE) 2021/914), incorporadas a su contrato de tratamiento
            de datos. Sus subencargados en Estados Unidos (CleanTalk y Akismet) están sujetos, según ese mismo
            contrato, a obligaciones de protección equivalentes.
          </li>
          <li>
            <strong>Reino Unido — OpenStreetMap Foundation:</strong> cuenta con una decisión de adecuación de
            la Comisión Europea, renovada en 2025 y vigente hasta 2031.
          </li>
        </ul>

        <h2>Tus derechos</h2>
        <p>Sobre los datos que nos hayas enviado, puedes pedirnos en cualquier momento:</p>
        <ul>
          <li><strong>Acceso:</strong> saber qué datos tuyos tenemos.</li>
          <li><strong>Rectificación:</strong> corregirlos si están mal.</li>
          <li><strong>Supresión:</strong> que los borremos.</li>
          <li><strong>Oposición:</strong> que dejemos de tratarlos cuando la base es el interés legítimo.</li>
          <li><strong>Limitación:</strong> que los conservemos sin usarlos mientras se resuelve una reclamación.</li>
          <li><strong>Portabilidad:</strong> recibirlos en un formato que puedas llevarte a otro sitio.</li>
          <li>
            <strong>Retirar tu consentimiento</strong> (feedback y experiencias) cuando quieras, sin que eso
            afecte a lo que hicimos antes con él.
          </li>
        </ul>
        <p>
          <strong>Cómo:</strong> escríbenos a {mail} con el asunto «Protección de datos», diciendo qué derecho
          quieres ejercer y con qué email o nombre nos enviaste los datos. Es gratis y te respondemos en un
          mes como máximo (ampliable dos meses más en casos complejos, avisándote). Solo te pediremos algo
          para comprobar tu identidad si tenemos dudas razonables de que eres tú. Los datos de la analítica no
          están asociados a ninguna persona, así que no podemos localizarlos.
        </p>
        <p>
          Si crees que no hemos tratado bien tus datos, puedes reclamar ante la{" "}
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
            Agencia Española de Protección de Datos
          </a>{" "}
          (C/ Jorge Juan, 6, 28001 Madrid). Si quieres, escríbenos antes y lo intentamos arreglar.
        </p>

        <h2>Edad mínima</h2>
        <p>
          Si tienes menos de 14 años, no nos envíes datos personales por los formularios ni por email: en
          España, por debajo de esa edad el consentimiento lo tienen que dar tus padres o tutores (art. 7
          LOPDGDD).
        </p>

        <h2>Recomendaciones automáticas</h2>
        <p>
          City Match calcula sus recomendaciones en tu navegador con tus respuestas. Es una sugerencia, no
          una decisión con efectos sobre ti, y no nos envía tus respuestas (solo aparecen en la dirección de
          la página que mide la analítica, ver apartado 2).
        </p>

        <h2>Cambios en este texto</h2>
        <p>
          Si cambiamos algo importante, lo verás aquí con una nueva fecha de última actualización.
        </p>
      </main>

      <Footer />
    </div>
  );
}
