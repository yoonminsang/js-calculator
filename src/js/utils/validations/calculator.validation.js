import { CALCULATOR_VALIDATION, MAX_DIGITS_LENGTH } from '../../constants/calculator.constant.js';

export const digitLengthValidationFn = (digit) => {
  if (digit?.length >= MAX_DIGITS_LENGTH) return CALCULATOR_VALIDATION.maxDigitLength;
  return true;
};

export const operationValidationFn = (digits, operations) => {
  if (digits.length <= operations.length) return CALCULATOR_VALIDATION.pressNumberFirst;
  return true;
};
