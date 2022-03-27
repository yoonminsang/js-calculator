import { ZERO } from '../constants/calculator.constant.js';
import { digitLengthValidationFn } from '../utils/validations/calculator.validation.js';

class Calculator {
  $calculator;
  $total;
  initialState;
  state;

  constructor($app) {
    this.$calculator = $app.querySelector('.calculator');
    this.$total = this.$calculator.querySelector('#total');
    this.initialState = { digits: [], operations: [] };
    this.state = this.initialState;
    this.addEvent();
  }

  addEvent() {
    const $digits = this.$calculator.querySelector('.digits');
    const $modifierBtn = this.$calculator.querySelector('.modifier');
    const $operations = this.$calculator.querySelector('.operations');
    $digits.addEventListener('click', this.onClickDigits);
    $modifierBtn.addEventListener('click', this.onClickModifier);
  }

  setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  render = () => {
    const { digits, operations } = this.state;
    const totalText = digits.reduce((acc, cur, index) => {
      if (operations[index]) return acc + cur + operations[index];
      return acc + cur;
    }, '');
    this.$total.textContent = totalText || ZERO;
  };

  onClickDigits = (e) => {
    const { digits, operations } = this.state;
    const value = e.target.textContent;
    if (digits.length > operations.length) {
      const lastDigit = digits[digits.length - 1];
      const digitLengthValidation = digitLengthValidationFn(lastDigit);
      if (digitLengthValidation !== true) {
        return alert(digitLengthValidation);
      }

      this.setState({ digits: [...digits.slice(0, digits.length - 2), lastDigit + value] });
    } else {
      if (value === ZERO) return;
      this.setState({ digits: [...digits, value] });
    }
  };

  onClickModifier = () => {
    this.setState(this.initialState);
  };
}

export default Calculator;
