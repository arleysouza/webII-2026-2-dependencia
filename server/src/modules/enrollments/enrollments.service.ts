import { HttpError } from "../../errors";
import { positiveInteger, validateBody } from "../../validation";
import { isUniqueViolation } from "../../database/unique-violation";
import { isForeignKeyViolation } from "../../database/foreign-key-violation";
import { PgEnrollmentRepository } from "./enrollments.repository";

export class EnrollmentsService {
  private readonly repository = new PgEnrollmentRepository();

  async create(input: unknown) {
    const data = validateBody(input);
    const studentRa = positiveInteger(data.studentRa, "RA");
    const courseId = positiveInteger(data.courseId, "ID do curso");
    try {
      return await this.repository.create(studentRa, courseId);
    } catch (error) {
      if (isForeignKeyViolation(error))
        throw new HttpError(
          404,
          "Estudante ou curso não encontrado para realizar a matrícula.",
        );
      if (isUniqueViolation(error))
        throw new HttpError(
          409,
          "Este estudante já está matriculado neste curso.",
        );
      throw error;
    }
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(studentRa: number, courseId: number) {
    positiveInteger(studentRa, "RA");
    positiveInteger(courseId, "ID do curso");
    const record = await this.repository.findOne(studentRa, courseId);
    if (!record) throw new HttpError(404, "Matrícula não encontrada.");
    return record;
  }

}
