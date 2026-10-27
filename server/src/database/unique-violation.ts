// SQLSTATE 23505: violação de unicidade no PostgreSQL.
export function isUniqueViolation(error: unknown): boolean {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  return 'code' in error && error.code === '23505';
}
