import { pool } from "../../database/connection";

export interface Enrollment {
  studentRa: number;
  courseId: number;
  enrolledAt: Date;
}

export class PgEnrollmentRepository {

  async create(studentRa: number, courseId: number) {
    return (
      await pool.query<Enrollment>(
        `INSERT INTO enrollments (student_ra, course_id) VALUES ($1, $2)
         RETURNING student_ra AS "studentRa", course_id AS "courseId", enrolled_at AS "enrolledAt"`,
        [studentRa, courseId],
      )
    ).rows[0];
  }

  async findAll() {
    return (
      await pool.query<Enrollment>(
        `SELECT student_ra AS "studentRa", course_id AS "courseId", enrolled_at AS "enrolledAt"
         FROM enrollments ORDER BY student_ra, course_id`,
      )
    ).rows;
  }

  async findOne(studentRa: number, courseId: number) {
    return (
      await pool.query<Enrollment>(
        `SELECT student_ra AS "studentRa", course_id AS "courseId", enrolled_at AS "enrolledAt"
         FROM enrollments WHERE student_ra = $1 AND course_id = $2`,
        [studentRa, courseId],
      )
    ).rows[0];
  }

}
