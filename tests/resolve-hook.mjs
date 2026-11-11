// Permite que `node --test` cargue src/ tal cual lo escribe Vite: imports
// relativos sin extensión ('../data/cities' → '../data/cities.js') y ficheros
// .js tratados como módulos ES. Sin dependencias nuevas.
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`
      export async function resolve(specifier, context, next) {
        try {
          return await next(specifier, context);
        } catch (err) {
          if (specifier.startsWith(".") && !/\\.[a-z]+$/i.test(specifier)) {
            return next(specifier + ".js", context);
          }
          throw err;
        }
      }
      export async function load(url, context, next) {
        if (url.includes("/src/") && url.endsWith(".js")) {
          return next(url, { ...context, format: "module" });
        }
        return next(url, context);
      }
    `),
  import.meta.url,
);
