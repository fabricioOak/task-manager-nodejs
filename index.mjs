import http from "node:http";
import { Router } from "./utils/router.mjs";
import { applyHeaders } from "./middleware/headers.mjs";

// Routes
import { health, tasks } from "./config/routes.mjs";

// Init router
const router = new Router();
health(router);
tasks(router);

// Server setup
const server = http.createServer((req, res) => {
  if (applyHeaders(req, res)) {
    return;
  }

  router.handle(req, res);
});

// Start server
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
