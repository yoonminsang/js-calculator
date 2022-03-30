import { EQUAL, ZERO } from '../constants/calculator.constant.js';
import {
  calculateValidationFn,
  digitLengthValidationFn,
  operationValidationFn,
} from '../utils/validations/calculator.validation.js';

class Calculator {
  $calculator;
  $total;
  initialState;
  state;

  constructor($app) {
    this.$calculator = $app.querySelector('.calculator');
    this.$total = this.$calculator.querySelector('#total');
    this.initialState = { digits: [], operations: [], isEnd: false };
    this.state = this.initialState;
    this.addEvent();
  }

  addEvent() {
    const $digits = this.$calculator.querySelector('.digits');
    const $modifierBtn = this.$calculator.querySelector('.modifier');
    const $operations = this.$calculator.querySelector('.operations');
    $digits.addEventListener('click', this.onClickDigits);
    $modifierBtn.addEventListener('click', this.onClickModifier);
    $operations.addEventListener('click', this.onClickOperations);
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  render() {
    const { digits, operations } = this.state;
    const totalText = digits.reduce((acc, cur, index) => {
      if (operations[index]) return acc + cur + operations[index];
      return acc + cur;
    }, '');
    this.$total.textContent = totalText || ZERO;
  }

  onClickDigits = (e) => {
    const { digits, operations, isEnd } = this.state;
    const value = e.target.textContent;
    const lastDigit = digits[digits.length - 1];

    if (isEnd && operations.length === 0) return this.setState({ digits: [value], isEnd: false });

    if (digits.length > operations.length) {
      const digitLengthValidation = digitLengthValidationFn(lastDigit);
      if (digitLengthValidation !== true) {
        return alert(digitLengthValidation);
      }

      this.setState({ digits: [...digits.slice(0, digits.length - 1), lastDigit + value] });
    } else {
      if (lastDigit === undefined && value === ZERO) return;
      this.setState({ digits: [...digits, value] });
    }
  };

  onClickModifier = () => {
    this.setState(this.initialState);
  };

  onClickOperations = (e) => {
    const { digits, operations } = this.state;
    const value = e.target.textContent;
    const operationValidation = operationValidationFn(digits, operations);
    if (operationValidation !== true) {
      return alert(operationValidation);
    }

    if (value === EQUAL) {
      this.calculateTotal();
    } else {
      this.setState({ operations: [...operations, value] });
    }
  };

  calculateTotal() {
    // TODO: 일단 요구사항에 따라 2개의 숫자만 계산. 추후에 n개의 숫자로 수정
    const { digits, operations } = this.state;
    const digitsToNumbr = digits.map((digit) => Number(digit));
    if (operations.length === 0) {
      return this.setState({ digits: [digitsToNumbr[0]], operations: [] });
    }
    const calculateValidation = calculateValidationFn(digitsToNumbr, operations);
    if (calculateValidation !== true) {
      return alert(calculateValidation);
    }

    switch (operations[0]) {
      case '+':
        return this.setState({ digits: [digitsToNumbr[0] + digitsToNumbr[1]], operations: [], isEnd: true });
      case '-':
        return this.setState({ digits: [digitsToNumbr[0] - digitsToNumbr[1]], operations: [], isEnd: true });
      case 'X':
        return this.setState({ digits: [digitsToNumbr[0] * digitsToNumbr[1]], operations: [], isEnd: true });
      case '/':
        return this.setState({
          digits: [Math.floor(digitsToNumbr[0] / digitsToNumbr[1])],
          operations: [],
          isEnd: true,
        });
      default:
        console.error('연산자를 확인해주세요.');
    }
  }
}

export default Calculator;
