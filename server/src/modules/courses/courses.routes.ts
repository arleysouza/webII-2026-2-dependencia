import { Router } from "express";
import { parseId } from "../../validation";
import { CoursesService } from "./courses.service";

export function coursesRoutes() {
  const service = new CoursesService();
  const router = Router();

  router.get("/", async (_req, res) => {
    res.json(await service.findAll());
  });

  router.post("/", async (req, res) => {
    res.status(201).json(await service.create(req.body));
  });

  router.get("/:id", async (req, res) => {
    res.json(await service.findOne(parseId(req.params.id, "id")));
  });

  
  return router;
}
