import { pool } from "../../database/connection";

export interface Course {
  id: number;
  name: string;
}

export class PgCourseRepository {

  async create(data: { name: string }) {
    const { rows } = await pool.query<Course>(
      "INSERT INTO courses (name) VALUES ($1) RETURNING id, name",
      [data.name],
    );
    return rows[0];
  }

  async findAll() {
    return (
      await pool.query<Course>("SELECT id, name FROM courses ORDER BY id")
    ).rows;
  }

  async findOne(id: number) {
    return (
      await pool.query<Course>(
        "SELECT id, name FROM courses WHERE id = $1",
        [id],
      )
    ).rows[0];
  }

}
