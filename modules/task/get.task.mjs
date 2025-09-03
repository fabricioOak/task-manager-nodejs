import { readDB } from "../../utils/database.mjs";

export const getTask = (router) => {
  router.get("/api/tasks/:id", async (req, res) => {
    const tasks = await readDB();
    const task = tasks.find((t) => t.id === req.params.id);

    if (task) {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(task));
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Task not found" }));
    }
  });
};
