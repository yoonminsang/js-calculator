import { MAX_DIGITS_LENGTH } from '../../constants/calculator.constant.js';

export const digitLengthValidationFn = (digit) => {
  if (digit?.length >= MAX_DIGITS_LENGTH) return '숫자는 최대 3자리 수까지 입력 가능합니다.';
  return true;
};

export const operationValidationFn = (digits, operations) => {
  if (digits.length <= operations.length) return '연산자 이후에는 숫자를 먼저 입력해주세요.';
  return true;
};
