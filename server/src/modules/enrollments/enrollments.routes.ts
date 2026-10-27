import { Router } from "express";
import { parseId } from "../../validation";
import { EnrollmentsService } from "./enrollments.service";

export function enrollmentsRoutes() {
  const service = new EnrollmentsService();
  const router = Router();

  router.get("/", async (_req, res) => {
    res.json(await service.findAll());
  });

  router.post("/", async (req, res) => {
    res.status(201).json(await service.create(req.body));
  });

  router.get("/student/:studentRa/course/:courseId", async (req, res) => {
    res.json(
      await service.findOne(
        parseId(req.params.studentRa, "RA"),
        parseId(req.params.courseId, "ID do curso"),
      ),
    );
  });

  
  return router;
}
