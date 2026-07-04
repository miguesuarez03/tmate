import styles from "./TipsSection.module.css";
import { IconBombilla, IconExplorar, IconBeca, IconCasa, IconBici, IconFiesta } from "../icons";

const TIP_COLORS = [
  { bg: "#DBEAFE", accent: "#2563EB", text: "#0F172A", Icon: IconBombilla },
  { bg: "#EDE4FF", accent: "#9333EA", text: "#0F172A", Icon: IconExplorar },
  { bg: "#D7F7E0", accent: "#16A34A", text: "#0F172A", Icon: IconBeca },
  { bg: "#FFE4D6", accent: "#EA580C", text: "#0F172A", Icon: IconCasa },
  { bg: "#D6F1FF", accent: "#0284C7", text: "#0F172A", Icon: IconBici },
  { bg: "#FDE0F0", accent: "#DB2777", text: "#0F172A", Icon: IconFiesta },
];

export default function TipsSection({ tips = [], cityName }) {
  if (!tips.length) return null;
  return (
    <section className={styles.tips}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Consejos exclusivos</p>
          <h2 className={styles.title}>Tips insider para {cityName}</h2>
          <p className={styles.sub}>Lo que los Erasmus desearían haber sabido antes de llegar</p>
        </div>

        <div className={styles.grid}>
          {tips.map((tip, i) => {
            const theme = TIP_COLORS[i % TIP_COLORS.length];
            return (
              <div
                key={i}
                className={styles.card}
                style={{ "--card-bg": theme.bg, "--card-accent": theme.accent, "--card-text": theme.text }}
              >
                <div className={styles.cardTop}>
                  <span className={styles.cardIcon}><theme.Icon size={32} /></span>
                  <span className={styles.cardNum}>0{i + 1}</span>
                </div>
                <p className={styles.cardText}>{tip}</p>
                <div className={styles.cardGlow} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
