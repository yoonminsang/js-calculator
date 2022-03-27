import { CALCULATOR_VALIDATION } from '../../src/js/constants/calculator.constant';

const clickNumbers = (numbers) =>
  String(numbers)
    .split('')
    .forEach((number) => cy.get('.digit').contains(number).click());
const clickOperation = (operation) => cy.get('.operations').contains(operation).click();
const clickAC = () => cy.get('.modifier').click();
const checkTotal = (number) => cy.get('#total').should('have.text', number);

describe('calculator', () => {
  beforeEach(() => {
    cy.visit('index.html');
  });

  it('처음 렌더링시 기본 total 값은 0', () => {
    checkTotal(0);
  });

  describe('숫자 입력', () => {
    it('기본 숫자 입력', () => {
      clickNumbers(1);
      checkTotal(1);
      clickNumbers(2);
      checkTotal(12);
    });
    it('숫자는 한번에 최대 3자리 수까지 입력 가능', () => {
      clickNumbers(1234);
      checkTotal(123);
    });
    it('한번에 숫자를 3자리 수 초과 입력하면 에러 발생', () => {
      // 이런경우에 위의 checkTotal을 제외시켰는데 어떤게 좋은 방법일까??
      clickNumbers(1234);
      cy.on('window:alert', (text) => {
        expect(text).to.contains(CALCULATOR_VALIDATION.maxDigitLength);
      });
    });
  });

  it('2개의 숫자에 대한 덧셈', () => {
    clickNumbers(10);
    clickOperation('+');
    clickNumbers(20);
    clickOperation('=');
    checkTotal(10 + 20);
  });

  describe('2개의 숫자에 대한 뺄셈', () => {
    it('양수', () => {
      clickNumbers(20);
      clickOperation('-');
      clickNumbers(10);
      clickOperation('=');
      checkTotal(20 - 10);
    });
    it('음수', () => {
      clickNumbers(10);
      clickOperation('-');
      clickNumbers(20);
      clickOperation('=');
      checkTotal(10 - 20);
    });
  });

  it('2개의 숫자에 대한 곱셈', () => {
    clickNumbers(5);
    clickOperation('X');
    clickNumbers(10);
    clickOperation('=');
    checkTotal(5 * 10);
  });

  describe('2개의 숫자에 대한 나눗셈', () => {
    it('소수점없이 나누어지는 경우', () => {
      clickNumbers(4);
      clickOperation('/');
      clickNumbers(2);
      clickOperation('=');
      checkTotal(4 / 2);
    });
    it('소수점 이하는 버림', () => {
      clickNumbers(3);
      clickOperation('/');
      clickNumbers(2);
      clickOperation('=');
      checkTotal(Math.floor(3 / 2));
    });
  });

  it('누적 계산 가능', () => {
    clickNumbers(10);
    clickOperation('+');
    clickNumbers(20);
    clickOperation('=');
    checkTotal(30);
    clickOperation('-');
    clickNumbers(20);
    clickOperation('=');
    checkTotal(10);
  });

  describe('초기화', () => {
    it('처음에 초기화', () => {
      clickAC();
      checkTotal(0);
    });
    it('입력하고 초기화', () => {
      clickNumbers(12);
      clickAC();
      checkTotal(0);
    });
    it('계산하고 초기화', () => {
      clickNumbers(1);
      clickOperation('+');
      clickNumbers(2);
      clickOperation('=');
      clickAC();
      checkTotal(0);
    });
  });

  describe('맨 처음에 연산자를 클릭하면 에러', () => {
    it('+ 버튼', () => {
      clickOperation('+');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(CALCULATOR_VALIDATION.pressNumberFirst);
      });
    });
    it('- 버튼', () => {
      clickOperation('-');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(CALCULATOR_VALIDATION.pressNumberFirst);
      });
    });
    it('X 버튼', () => {
      clickOperation('X');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(CALCULATOR_VALIDATION.pressNumberFirst);
      });
    });
    it('/ 버튼', () => {
      clickOperation('/');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(CALCULATOR_VALIDATION.pressNumberFirst);
      });
    });
  });

  // 너무 불필요하게 많은 것 같은데 최대한 case를 많이 넣는게 좋은 것 같기도 하다...
  // 연산자를 상수로 빼지 않은 이유는 어차피 나는 타입스크립트를 사용하기 때문
  describe('연산자 이후에 연산자를 클릭하면 에러', () => {
    it('+ + 버튼', () => {
      clickNumbers(1);
      clickOperation('+');
      clickOperation('+');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(CALCULATOR_VALIDATION.pressNumberFirst);
      });
    });
    it('+ - 버튼', () => {
      clickNumbers(1);
      clickOperation('+');
      clickOperation('-');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(CALCULATOR_VALIDATION.pressNumberFirst);
      });
    });
    it('+ X 버튼', () => {
      clickNumbers(1);
      clickOperation('+');
      clickOperation('X');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(CALCULATOR_VALIDATION.pressNumberFirst);
      });
    });
    it('+ / 버튼', () => {
      clickNumbers(1);
      clickOperation('+');
      clickOperation('/');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(CALCULATOR_VALIDATION.pressNumberFirst);
      });
    });
    it('- + 버튼', () => {
      clickNumbers(1);
      clickOperation('-');
      clickOperation('+');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(CALCULATOR_VALIDATION.pressNumberFirst);
      });
    });
    it('- - 버튼', () => {
      clickNumbers(1);
      clickOperation('-');
      clickOperation('-');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(CALCULATOR_VALIDATION.pressNumberFirst);
      });
    });
    it('- X 버튼', () => {
      clickNumbers(1);
      clickOperation('-');
      clickOperation('X');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(CALCULATOR_VALIDATION.pressNumberFirst);
      });
    });
    it('- / 버튼', () => {
      clickNumbers(1);
      clickOperation('-');
      clickOperation('/');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(CALCULATOR_VALIDATION.pressNumberFirst);
      });
    });
    it('X + 버튼', () => {
      clickNumbers(1);
      clickOperation('X');
      clickOperation('+');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(CALCULATOR_VALIDATION.pressNumberFirst);
      });
    });
    it('X - 버튼', () => {
      clickNumbers(1);
      clickOperation('X');
      clickOperation('-');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(CALCULATOR_VALIDATION.pressNumberFirst);
      });
    });
    it('X X 버튼', () => {
      clickNumbers(1);
      clickOperation('X');
      clickOperation('X');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(CALCULATOR_VALIDATION.pressNumberFirst);
      });
    });
    it('X / 버튼', () => {
      clickNumbers(1);
      clickOperation('X');
      clickOperation('/');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(CALCULATOR_VALIDATION.pressNumberFirst);
      });
    });
    it('/ + 버튼', () => {
      clickNumbers(1);
      clickOperation('/');
      clickOperation('+');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(CALCULATOR_VALIDATION.pressNumberFirst);
      });
    });
    it('/ - 버튼', () => {
      clickNumbers(1);
      clickOperation('/');
      clickOperation('-');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(CALCULATOR_VALIDATION.pressNumberFirst);
      });
    });
    it('/ X 버튼', () => {
      clickNumbers(1);
      clickOperation('/');
      clickOperation('X');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(CALCULATOR_VALIDATION.pressNumberFirst);
      });
    });
    it('/ / 버튼', () => {
      clickNumbers(1);
      clickOperation('/');
      clickOperation('/');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(CALCULATOR_VALIDATION.pressNumberFirst);
      });
    });
  });
});
