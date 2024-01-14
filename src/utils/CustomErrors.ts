import { HTTPStatusEnum } from '../enums/HTTPStatusEnum';

class CustomError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, HTTPStatusEnum.BAD_REQUEST);
  }
}

export { CustomError, BadRequestError };
