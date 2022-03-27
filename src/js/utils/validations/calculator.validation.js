import { MAX_DIGITS_LENGTH } from '../../constants/calculator.constant.js';

export const digitLengthValidationFn = (digit) => {
  if (digit?.length >= MAX_DIGITS_LENGTH) return '숫자는 최대 3자리 수까지 입력 가능합니다.';
  return true;
};
