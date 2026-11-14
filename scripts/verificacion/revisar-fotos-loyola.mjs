// Coteja las fotos de Loyola con Commons y descarga miniaturas para revisarlas.
// Evidencias transitorias dentro del repo; conclusiones en VERIFICACION.md.
import { mkdirSync, writeFileSync } from "node:fs";
import { CITIES } from "../../src/data/cities.js";
import { WIKIMEDIA_PHOTOS } from "../../src/data/wikimediaPhotos.js";
const slugs = ["caserta", "covilha", "cosenza", "modena", "trento", "pavia", "braganza", "newcastle", "geel", "kleve"];
const out = new URL("../../.verificacion-loyola.local/", import.meta.url);
mkdirSync(out, { recursive: true });
const cities = CITIES.filter(c => slugs.includes(c.slug));
const titles = cities.map(c => "File:" + decodeURIComponent(c.img.split("/").at(-2)).replaceAll("_", " "));
const url = "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams({action:"query",format:"json",formatversion:"2",prop:"imageinfo",iiprop:"size|extmetadata|url",iiurlwidth:"500",titles:titles.join("|")});
const res = await fetch(url);
if (!res.ok) throw new Error(`Commons: ${res.status}`);
const data = await res.json();
writeFileSync(new URL("commons.json", out), JSON.stringify(data, null, 2));
for (let i = 0; i < cities.length; i++) {
  const c = cities[i];
  const info = data.query.pages.find(p => p.title === titles[i])?.imageinfo?.[0];
  if (!info) throw new Error(`Sin foto: ${c.slug}`);
  const key = c.img.match(/thumb\/(.+)\/1920px/)[1];
  const saved = WIKIMEDIA_PHOTOS[key];
  if (info.width !== saved[0] || info.height !== saved[1] || info.size !== saved[2]) throw new Error(`Metadatos distintos: ${c.slug}`);
  if (info.width < 1920 || info.height < 1080) throw new Error(`Original pequeño: ${c.slug}`);
  console.log(c.slug, JSON.stringify({ width:info.width, height:info.height, author:info.extmetadata.Artist?.value, license:info.extmetadata.LicenseShortName?.value, description:info.extmetadata.ImageDescription?.value }));
  const thumb = await fetch(info.thumburl);
  if (!thumb.ok) { console.log(`Miniatura ${c.slug}: HTTP ${thumb.status}`); continue; }
  writeFileSync(new URL(`${c.slug}.jpg`, out), Buffer.from(await thumb.arrayBuffer()));
}
