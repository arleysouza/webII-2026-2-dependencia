import { HttpError } from "../../errors";
import { positiveInteger, validateBody, validateName } from "../../validation";
import { isUniqueViolation } from "../../database/unique-violation";
import type { StudentRepository } from "./students.repository";

export class StudentsService {
  constructor(private readonly repository: StudentRepository) {}

  async create(input: unknown) {
    const data = validateBody(input);
    const name = validateName(data.name);
    const ra = positiveInteger(data.ra, "RA");
    try {
      return await this.repository.create({ ra, name });
    } catch (error) {
      if (isUniqueViolation(error))
        throw new HttpError(409, "Já existe um estudante com este RA.");
      throw error;
    }
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    positiveInteger(id, "ra");
    const record = await this.repository.findOne(id);
    if (!record)
      throw new HttpError(404, "Estudante com RA " + id + " não encontrado.");
    return record;
  }

}
