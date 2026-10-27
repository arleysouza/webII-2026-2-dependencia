import type { Database } from "../../database/connection";

export interface Student {
  ra: number;
  name: string;
}

export interface StudentRepository {
  create(data: { ra: number; name: string }): Promise<Student>;
  findAll(): Promise<Student[]>;
  findOne(id: number): Promise<Student | undefined>;
}

export class PgStudentRepository implements StudentRepository {
  constructor(private readonly db: Database) {}

  async create(data: { ra: number; name: string }) {
    const { rows } = await this.db.query<Student>(
      "INSERT INTO students (ra, name) VALUES ($1, $2) RETURNING ra, name",
      [data.ra, data.name],
    );
    return rows[0];
  }

  async findAll() {
    return (
      await this.db.query<Student>(
        "SELECT ra, name FROM students ORDER BY name",
      )
    ).rows;
  }

  async findOne(id: number) {
    return (
      await this.db.query<Student>(
        "SELECT ra, name FROM students WHERE ra = $1",
        [id],
      )
    ).rows[0];
  }

}
