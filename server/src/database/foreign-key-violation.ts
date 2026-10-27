// SQLSTATE 23503: violação de chave estrangeira no PostgreSQL.
export function isForeignKeyViolation(error: unknown): boolean {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  return 'code' in error && error.code === '23503';
}
