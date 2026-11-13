import { Fragment } from "react";
import { Link } from "react-router-dom";

// Formato inline de src/data/guides.js (y de las respuestas de src/data/faqs.js):
//   [texto](/ruta)       → <Link> interno
//   [texto](#ancla)      → salto dentro de la misma página
//   [texto](https://…)   → enlace externo a la fuente (pestaña nueva)
//   **texto**            → <strong>
// plainInline (src/lib/seo.js) quita este mismo formato para el JSON-LD.
const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

export default function GuideText({ text = "" }) {
  const out = [];
  let last = 0;
  let key = 0;
  for (const m of String(text).matchAll(TOKEN)) {
    if (m.index > last) out.push(<Fragment key={key++}>{text.slice(last, m.index)}</Fragment>);
    if (m[3] != null) {
      out.push(<strong key={key++}>{m[3]}</strong>);
    } else if (m[2].startsWith("/")) {
      out.push(<Link key={key++} to={m[2]}>{m[1]}</Link>);
    } else if (m[2].startsWith("#")) {
      out.push(<a key={key++} href={m[2]}>{m[1]}</a>);
    } else {
      out.push(
        <a key={key++} href={m[2]} target="_blank" rel="noopener noreferrer">
          {m[1]}
        </a>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  return <>{out}</>;
}
