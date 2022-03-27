class Calculator {
  $calculator;
  $total;
  $digits;
  $modifierBtn;
  $operations;
  initialState;
  $state;

  constructor($app) {
    this.$calculator = $app.querySelector('.calculator');
    this.$total = this.$calculator.querySelector('#total');
    this.$digits = this.$calculator.querySelector('.digits');
    this.$modifierBtn = this.$calculator.querySelector('.modifier');
    this.$operations = this.$calculator.querySelector('.operations');
    this.initialState = { shows: [] };
    this.state = this.initialState;
    this.addEvent();
  }

  addEvent() {
    this.$digits.addEventListener('click', this.onClickDigits);
  }

  setState = (nextState) => {
    this.state = nextState;
    if (!this.state.shows.length) return (this.$total.textContent = '0');
    this.$total.textContent = this.state.shows.join('');
  };

  onClickDigits = (e) => {
    const { shows } = this.state;
    let lastShow = shows[shows.length - 1];
    if (lastShow?.length >= 3) {
      return alert('숫자는 최대 3자리 수까지 입력 가능합니다.');
    }
    const notIncludeCurrentShow = shows.length - 2 > 0 ? shows.slice(shows.length - 2) : [];
    const value = e.target.textContent;
    if (!lastShow) {
      if (value === '0') return;
      return this.setState({ shows: [...notIncludeCurrentShow, value] });
    }
    this.setState({ shows: [...notIncludeCurrentShow, lastShow + value] });
  };
}

export default Calculator;
