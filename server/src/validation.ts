import { HttpError } from './errors';

export function positiveInteger(value: unknown, field: string): number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value <= 0 || value > 2147483647) {
    throw new HttpError(400, field + ' deve ser um inteiro positivo de até 2147483647.');
  }
  return value;
}

export function parseId(value: unknown, field: string): number {
  if (typeof value !== 'string' || !/^\d+$/.test(value)) {
    throw new HttpError(400, field + ' deve ser um inteiro positivo.');
  }
  return positiveInteger(Number(value), field);
}

export function validateName(value: unknown): string {
  if (typeof value !== 'string' || value.trim().length < 3 || value.length > 100) {
    throw new HttpError(400, 'O nome deve ter no máximo 100 caracteres e pelo menos 3 caracteres sem contar espaços nas extremidades.');
  }
  return value;
}

export function validateBody(value: unknown): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new HttpError(400, 'O corpo deve ser um objeto JSON.');
  }
  return value as Record<string, unknown>;
}
