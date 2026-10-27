import { isUniqueViolation } from "../../database/unique-violation";
import { HttpError } from "../../errors";
import { positiveInteger, validateBody, validateName } from "../../validation";
import { PgCourseRepository } from "./courses.repository";

export class CoursesService {
  private readonly repository = new PgCourseRepository();

  async create(input: unknown) {
    const data = validateBody(input);
    const name = validateName(data.name);

    try {
      return await this.repository.create({ name });
    } catch (error) {
      if (isUniqueViolation(error))
        throw new HttpError(409, "Já existe um curso com este nome.");
      throw error;
    }
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    positiveInteger(id, "id");
    const record = await this.repository.findOne(id);
    if (!record)
      throw new HttpError(404, "Curso com ID " + id + " não encontrado.");
    return record;
  }
  
}
