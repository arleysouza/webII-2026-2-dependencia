import express, { type ErrorRequestHandler } from "express";
import { STATUS_CODES } from "node:http";
import { HttpError } from "./errors";
import type { Database } from "./database/connection";
import { PgStudentRepository } from "./modules/students/students.repository";
import { StudentsService } from "./modules/students/students.service";
import { studentsRoutes } from "./modules/students/students.routes";
import { coursesRoutes } from "./modules/courses/courses.routes";
import { enrollmentsRoutes } from "./modules/enrollments/enrollments.routes";

export function createApp(db: Database) {
  const app = express();
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Students recebe suas dependências na composição da aplicação.
  const studentRepository = new PgStudentRepository(db);

  const studentsService = new StudentsService(studentRepository);

  // Encaminha as requisições para as rotas de cada recurso.
  app.use("/api/students", studentsRoutes(studentsService));
  app.use("/api/courses", coursesRoutes());
  app.use("/api/enrollments", enrollmentsRoutes());

  app.use((_req, _res, next) => {
    next(new HttpError(404, "Rota não encontrada."));
  });

  // O Express identifica o tratamento de erros pelos quatro parâmetros.
  const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
    let statusCode = 500;
    let message = "Erro interno do servidor.";

    if (error instanceof HttpError) {
      statusCode = error.statusCode;
      message = error.message;
    } else if (error?.type === "entity.parse.failed") {
      statusCode = 400;
      message = "JSON inválido.";
    } else if (error?.type === "entity.too.large") {
      statusCode = 413;
      message = "Corpo da requisição muito grande.";
    } else {
      console.error(error);
    }

    res
      .status(statusCode)
      .json({ statusCode, message, error: STATUS_CODES[statusCode] });
  };
  app.use(errorHandler);

  return app;
}
