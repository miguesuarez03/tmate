import GuideText from "./GuideText";
import { IconCheck, IconInfo, IconBombilla } from "../icons";
import styles from "./GuideBlock.module.css";

/** Pinta un bloque de contenido de una guía (ver formato en src/data/guides.js). */
export default function GuideBlock({ block }) {
  switch (block.type) {
    case "p":
      return <p className={styles.p}><GuideText text={block.text} /></p>;

    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag className={block.ordered ? styles.ol : styles.ul}>
          {block.items.map((item, i) => <li key={i}><GuideText text={item} /></li>)}
        </Tag>
      );
    }

    case "checklist":
      return (
        <ul className={styles.checklist}>
          {block.items.map((item, i) => (
            <li key={i}>
              <span className={styles.check} aria-hidden="true"><IconCheck size={14} /></span>
              <span><GuideText text={item} /></span>
            </li>
          ))}
        </ul>
      );

    case "table":
      return (
        <div className={styles.tableWrap} role="region" aria-label={block.caption || "Tabla"} tabIndex={0}>
          <table className={styles.table}>
            {block.caption && <caption className={styles.caption}>{block.caption}</caption>}
            <thead>
              <tr>{block.head.map((h, i) => <th key={i} scope="col">{h ? <GuideText text={h} /> : <span className={styles.srOnly}>Concepto</span>}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => c === 0
                    ? <th key={c} scope="row"><GuideText text={cell} /></th>
                    : <td key={c}><GuideText text={cell} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "example":
      return (
        <aside className={styles.example} aria-label={block.title}>
          <p className={styles.exampleTitle}>
            <span aria-hidden="true"><IconBombilla size={18} /></span> {block.title}
          </p>
          {block.text && <p className={styles.p}><GuideText text={block.text} /></p>}
          {block.items && (
            <ul className={styles.ul}>
              {block.items.map((item, i) => <li key={i}><GuideText text={item} /></li>)}
            </ul>
          )}
          <p className={styles.exampleFine}>Ejemplo hipotético con una persona inventada: no es un caso ni una beca real.</p>
        </aside>
      );

    case "note":
      return (
        <p className={styles.note}>
          <span className={styles.noteIcon} aria-hidden="true"><IconInfo size={16} /></span>
          <span><GuideText text={block.text} /></span>
        </p>
      );

    default:
      return null;
  }
}
