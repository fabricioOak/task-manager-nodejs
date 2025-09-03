import http from "node:http";
import { Router } from './utils/router.mjs';
import headers from "./headers.json" with { type: "json" };

// Routes
import { health, tasks } from './routes.mjs'

// Init router
const router = new Router();
health(router);
tasks(router);

// Server setup
const server = http.createServer((req, res) => {
  for (const [key, value] of Object.entries(headers.headers)) {
    res.setHeader(key, value);
  }

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  router.handle(req, res);
});

// Start server
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
