export class Router {
  constructor() {
    this.routes = [];
  }

  addRoute(method, pattern, handler) {
    const paramNames = [];
    const regex = new RegExp(
      "^" +
        pattern.replace(/:([^/]+)/g, (_, paramName) => {
          paramNames.push(paramName);
          return "([^/]+)";
        }) +
        "$"
    );
    this.routes.push({ method, regex, paramNames, handler });
  }

  get(path, handler) {
    this.addRoute("GET", path, handler);
  }
  post(path, handler) {
    this.addRoute("POST", path, handler);
  }
  put(path, handler) {
    this.addRoute("PUT", path, handler);
  }
  delete(path, handler) {
    this.addRoute("DELETE", path, handler);
  }

  async handle(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const { pathname } = url;

    for (const route of this.routes) {
      if (route.method === req.method) {
        const match = pathname.match(route.regex);
        if (match) {
          req.params = {};
          route.paramNames.forEach((name, i) => {
            req.params[name] = match[i + 1];
          });
          try {
            return await route.handler(req, res);
          } catch (error) {
            return this.handleError(error, req, res);
          }
        }
      }
    }
    this.notFound(req, res);
  }

  handleError(error, req, res) {
    console.error(error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
  }

  notFound(req, res) {
    if (!res.headersSent) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Route Not Found" }));
    }
  }
}
