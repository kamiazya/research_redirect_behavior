import { serve } from "https://deno.land/std/http/server.ts";
const port = 9000;
console.log(`http://localhost:${port}/`);
for await (const req of serve({ port })) {
  console.log(req.method, req.url);
  switch (req.url) {
    case "/":
      req.respond({ body: Deno.readFileSync("./index.html") });
      break;
    case "/favicon.ico":
      req.respond({ status: 404 });
      break;
    case "/redirected":
      req.respond({ body: "redirected" });
      break;
    case "/300":
    case "/301":
    case "/302":
    case "/303":
    case "/304":
    case "/305":
    case "/306":
    case "/307":
    case "/308":
      req.respond({
        status: +req.url.slice(1),
        headers: new Headers({
          Location: "/redirected",
        }),
      });
      break;
  }
}
