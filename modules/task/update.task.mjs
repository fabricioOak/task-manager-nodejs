import { readDB, writeDB } from "../../utils/database.mjs";

export const updateTask = (router) => {
  router.put("/api/tasks/:id", async (req, res) => {
    const tasks = await readDB();
    const taskIndex = tasks.findIndex((t) => t.id === req.params.id);

    if (taskIndex === -1) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Task not found" }));
      return;
    }

    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));

    const updatedTask = {
      ...tasks[taskIndex],
      title: body.title ?? tasks[taskIndex].title,
      description: body.description ?? tasks[taskIndex].description,
      completed: body.completed ?? tasks[taskIndex].completed,
    };

    tasks[taskIndex] = updatedTask;
    await writeDB(tasks);

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(updatedTask));
  });
};
