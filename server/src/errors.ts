// Erro esperado pela aplicação, como dados inválidos ou registro inexistente.
export class HttpError extends Error {
  constructor(public readonly statusCode: number, message: string) {
    super(message);
  }
}
