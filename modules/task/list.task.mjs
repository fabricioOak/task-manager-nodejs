import { readDB } from "../../utils/database.mjs";

export const listTasks = (router) => {
  router.get("/api/tasks", async (req, res) => {
    const tasks = await readDB();
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(tasks));
  });
};
