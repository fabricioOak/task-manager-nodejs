import { readDB, writeDB } from "../../utils/database.mjs";

export const deleteTask = (router) => {
  router.delete("/api/tasks/:id", async (req, res) => {
    const tasks = await readDB();
    const updatedTasks = tasks.filter((t) => t.id !== req.params.id);

    if (tasks.length === updatedTasks.length) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Task not found" }));
      return;
    }

    await writeDB(updatedTasks);

    res.statusCode = 204;
    res.end();
  });
};
