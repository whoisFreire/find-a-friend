export class InvalidFilterFieldError extends Error {
  constructor(fieldName: string) {
    super(`Invalid Filtered field: ${fieldName}`)
  }
}
