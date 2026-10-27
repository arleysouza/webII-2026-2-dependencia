import { Router } from "express";
import { parseId } from "../../validation";
import type { StudentsService } from "./students.service";

export function studentsRoutes(service: StudentsService) {
  const router = Router();

  router.get("/", async (_req, res) => {
    res.json(await service.findAll());
  });

  router.post("/", async (req, res) => {
    res.status(201).json(await service.create(req.body));
  });

  router.get("/:ra", async (req, res) => {
    res.json(await service.findOne(parseId(req.params.ra, "ra")));
  });

  
  return router;
}
