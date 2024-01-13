import {
  AlternativeValidationError,
  GroupedAlternativeValidationError,
  FieldValidationError,
  UnknownFieldsError,
} from 'express-validator';

export const fieldValidationErrorOne = {
  type: 'field', location: 'body', path: 'email', msg: 'Invalid email', value: ''
} as FieldValidationError

export const fieldValidationErrorTwo = {
  type: 'field', location: 'body', path: 'password', msg: 'Invalid password', value: ''
} as FieldValidationError

export const alternativeValidationErrorOne = {
  type: 'alternative', msg: 'Invalid email', nestedErrors: [fieldValidationErrorOne, fieldValidationErrorTwo]
} as AlternativeValidationError

export const alternativeGroupedValidationErrorOne = {
  type: 'alternative_grouped', msg: 'Invalid email', nestedErrors: [[fieldValidationErrorOne, fieldValidationErrorTwo]]
} as GroupedAlternativeValidationError

export const unknownFieldsErrorOne = {
  type: 'unknown_fields', msg: 'unexpected error1', fields: [fieldValidationErrorOne]
} as UnknownFieldsError

export const unknownError = {
  type: 'unknown_error', msg: 'unexpected error1', fields: [fieldValidationErrorOne]
}
