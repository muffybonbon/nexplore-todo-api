import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';

import { checkValidation, generateErrorMessages } from '../../middlewares/validationMiddleware';
import { HTTPStatusEnum } from '../../enums/HTTPStatusEnum';

import {
  alternativeGroupedValidationErrorOne,
  alternativeValidationErrorOne,
  fieldValidationErrorOne,
  unknownFieldsErrorOne,
  unknownError,
} from '../__data__/validationResult';

jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
}));

const mockRequest = (errors: ValidationError[]) => {
  return {
    ...errors,
  } as unknown as Request;
};

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.send = jest.fn();
  return res;
};

const mockNext = jest.fn() as NextFunction;

describe('validationMiddleware', () => {
  describe('checkValidation', () => {
    it('should pass validation with no errors', () => {
      (validationResult as unknown as jest.Mock).mockReturnValue({ isEmpty: () => true });
      const req = mockRequest([]);
      const res = mockResponse();

      checkValidation(req, res, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should return error response on validation failure', () => {
      const mockErrors = [fieldValidationErrorOne];
      (validationResult as unknown as jest.Mock).mockReturnValue({ isEmpty: () => false, array: () => mockErrors });
      const req = mockRequest(mockErrors);
      const res = mockResponse();

      checkValidation(req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(HTTPStatusEnum.BAD_REQUEST);
      expect(res.send).toHaveBeenCalledWith({ message: expect.any(String) });
    });
  });

  describe('generateErrorMessages', () => {
    it('should format field type errors correctly', () => {
      const errors = [fieldValidationErrorOne];
      const result = generateErrorMessages(errors);

      expect(result).toEqual(['body.email - Invalid email']);
    });

    it('should format alternative error type correctly', () => {
      const errors = [alternativeValidationErrorOne];
      const result = generateErrorMessages(errors);

      expect(result).toEqual(['body.email - Invalid email; body.password - Invalid password']);
    });

    it('should format alternative grouped error type correctly', () => {
      const errors = [alternativeGroupedValidationErrorOne];
      const result = generateErrorMessages(errors);

      expect(result).toEqual(['body.email - Invalid email; body.password - Invalid password']);
    });

    it('should format unknown fields error type correctly', () => {
      const errors = [unknownFieldsErrorOne];
      const result = generateErrorMessages(errors);

      expect(result).toEqual(['body.email']);
    });

    it('should format unknown fields error type correctly', () => {
      const errors = [unknownError as unknown as ValidationError];
      const result = generateErrorMessages(errors);

      expect(result).toEqual([`Unknown error - ${JSON.stringify(unknownError)}`]);
    });
  });
});
