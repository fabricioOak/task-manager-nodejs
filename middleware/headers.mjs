import { headers } from "../config/headers.mjs";

export const applyHeaders = (req, res) => {
  for (const [key, value] of Object.entries(headers)) {
    res.setHeader(key, value);
  }

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return true;
  }

  return false;
};
