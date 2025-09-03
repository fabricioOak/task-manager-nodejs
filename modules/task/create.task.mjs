import { randomUUID } from "node:crypto";
import { readDB, writeDB } from "../../utils/database.mjs";

export const createTask = (router) => {
  router.post("/api/tasks", async (req, res) => {
    try {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      const bodyData = Buffer.concat(chunks).toString("utf8");
      const body = JSON.parse(bodyData);

      if (!body.title) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Title is required" }));
        return;
      }

      const newTask = {
        id: randomUUID(),
        title: body.title,
        description: body.description || "",
        completed: false,
        createdAt: new Date().toISOString(),
      };

      const tasks = await readDB();

      tasks.push(newTask);
      await writeDB(tasks);

      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify(newTask));
    } catch (error) {
      console.error("Create task error:", error);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Failed to create task." }));
      }
    }
  });
};
