import { CustomError, BadRequestError } from '../../utils/CustomErrors'; // Update with the correct path
import { HTTPStatusEnum } from '../../enums/HTTPStatusEnum';

describe('CustomError', () => {
  describe('BadRequestError', () => {
    it('should create an instance with the correct message and status code', () => {
      const errorMessage = 'Error message';
      const error = new BadRequestError(errorMessage);

      expect(error).toBeInstanceOf(BadRequestError);
      expect(error.message).toBe(errorMessage);
      expect(error.status).toBe(HTTPStatusEnum.BAD_REQUEST);
    });
  });

  describe('CustomError', () => {
    it('should create an instance with the specified message and status code', () => {
      const errorMessage = 'Custom error message';
      const statusCode = HTTPStatusEnum.INTERNAL_SERVER;
      const error = new CustomError(errorMessage, statusCode);

      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe(errorMessage);
      expect(error.status).toBe(statusCode);
    });
  });
});
