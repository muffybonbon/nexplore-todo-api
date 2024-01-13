import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';

import { HTTPStatusEnum } from '../enums/HTTPStatusEnum';

const generateErrorMessages = (errors: ValidationError[]): string[] => {
  return errors.map(error => {
    switch (error.type) {
      case 'field':
        return `${error.location}.${error.path} - ${error.msg}`;
      case 'alternative':
        return error.nestedErrors.map(n => `${n.location}.${n.path} - ${n.msg}`).join('; ');
      case 'alternative_grouped':
          return error.nestedErrors.map(nested => nested.map(n => `${n.location}.${n.path} - ${n.msg}`).join('; ')).join('; ');
      case 'unknown_fields':
        return error.fields.map(f => `${f.location}.${f.path}`).join('; ');
      default:
        return `Unknown error - ${JSON.stringify(error)}`;
    }
  });
};

export const checkValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = generateErrorMessages(errors.array());
    const uniqueErrorMessage = [...new Set(errorMessages)].join('; ');
    return res.status(HTTPStatusEnum.BAD_REQUEST).send({ message: uniqueErrorMessage });
  }
  return next();
};
