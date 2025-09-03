import { createTask } from "../modules/task/create.task.mjs";
import { deleteTask } from "../modules/task/delete.task.mjs";
import { getTask } from "../modules/task/get.task.mjs";
import { listTasks } from "../modules/task/list.task.mjs";
import { updateTask } from "../modules/task/update.task.mjs";

export const health = (router) => {
  router.get("/api/health", (_, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ status: "Running" }));
  });
};

export const tasks = (router) => {
  createTask(router);
  deleteTask(router);
  getTask(router);
  listTasks(router);
  updateTask(router);
};
