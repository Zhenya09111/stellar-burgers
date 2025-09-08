import { should } from 'chai';

describe('работы с ингредиентами', () => {
  const mockRefreshToken = 'abcdef12345';
  beforeEach(() => {
    cy.fixture('ingredients.json').then((data) => {
      cy.intercept('/api/ingredients', data).as('getIngredients');
    });
    cy.fixture('auth.json').then((data) => {
      cy.intercept('/api/auth/user', data).as('getUser');
    });
    cy.fixture('order.json').then((data) => {
      cy.intercept('/api/orders', data).as('postOrder');
    });
    window.localStorage.clear();
    window.localStorage.setItem('refreshToken', mockRefreshToken);
    cy.visit('http://localhost:4000/');
  });
  afterEach(() => {
    window.localStorage.removeItem('refreshToken');
  });
  it('модальное окно открыто', () => {
    cy.get('[data-cy=modal]').should('not.exist');
    cy.get('[data-cy=ingredient-list]').within(() => {
      cy.contains('Краторная булка N-200i').parent().click();
    });
    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=modal]').contains('Краторная булка N-200i');
  });
  it('закртыие модалки ингредиента кликом по оверлею', () => {
    cy.get('[data-cy=modal]').should('not.exist');
    cy.get('[data-cy=ingredient-list]').within(() => {
      cy.contains('Краторная булка N-200i').parent().click();
    });
    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=overlay]').click({ force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });
  it('закрытие модалки кликом по кнопке закрытия', () => {
    cy.get('[data-cy=modal]').should('not.exist');
    cy.get('[data-cy=ingredient-list]').within(() => {
      cy.contains('Биокотлета из марсианской Магнолии').parent().click();
    });
    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=closeIcon]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });
  it('все ингредиенты добавились', () => {
    cy.get('[data-cy=hidden-order]').should('be.visible');
    cy.get('[data-cy=buns-hidden]').should('be.visible');
    cy.get('[data-cy=ingredient-list]')
      .find('li')
      .each(($ingredient) => {
        cy.wrap($ingredient).within(() => {
          cy.contains('Добавить').click();
        });
      });
    cy.get('[data-cy=basket-list]').contains(
      'Биокотлета из марсианской Магнолии'
    );
    cy.get('[data-cy=basket-list]').contains('Соус Spicy-X');
    cy.get('[data-cy=bun-up]').contains('Краторная булка N-200i');
    cy.get('[data-cy=basket-list]').children().should('have.length', 2);
    cy.get('[data-cy=hidden-order]').should('not.exist');
    cy.get('[data-cy=buns-hidden]').should('not.exist');
  });
  it('при отправке заказа показывается модальное окно c верным номером заказа', () => {
    cy.get('[data-cy=test]').should('not.exist');
    cy.get('[data-cy=ingredient-list]')
      .find('li')
      .each(($ingredient) => {
        cy.wrap($ingredient).within(() => {
          cy.contains('Добавить').click();
        });
      });
    cy.get('[data-cy=order-button]').click();
    cy.get('[data-cy=test]').should('be.visible');
    cy.get('[data-cy=test]').should('contain.text', '1');
  });
  it('успешность закрытия модалки заказа', () => {
    cy.get('[data-cy=test]').should('not.exist');
    cy.get('[data-cy=ingredient-list]')
      .find('li')
      .each(($ingredient) => {
        cy.wrap($ingredient).within(() => {
          cy.contains('Добавить').click();
        });
      });
    cy.get('[data-cy=order-button]').click();
    cy.get('[data-cy=test]').should('be.visible');
    cy.get('[data-cy=closeIcon]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });
  it('после закртия модалки заказа корзина пуста', () => {
    //корзина пуста
    cy.get('[data-cy=hidden-order]').should('be.visible');
    cy.get('[data-cy=buns-hidden]').should('be.visible');
    //добавили ингредиенты
    cy.get('[data-cy=ingredient-list]')
      .find('li')
      .each(($ingredient) => {
        cy.wrap($ingredient).within(() => {
          cy.contains('Добавить').click();
        });
      });
    //проверяем что ингредиенты и правда добавились
    cy.get('[data-cy=basket-list]').contains(
      'Биокотлета из марсианской Магнолии'
    );
    cy.get('[data-cy=basket-list]').contains('Соус Spicy-X');
    cy.get('[data-cy=bun-up]').contains('Краторная булка N-200i');
    cy.get('[data-cy=basket-list]').children().should('have.length', 2);
    cy.get('[data-cy=hidden-order]').should('not.exist');
    cy.get('[data-cy=buns-hidden]').should('not.exist');
    //отправили заказ
    cy.get('[data-cy=order-button]').click();
    //получаем модалку и проверяем что это именно она 
    cy.get('[data-cy=test]').should('be.visible');
    //закрываем модалку
    cy.get('[data-cy=closeIcon]').click();
    //проверям, что корзина пуста
    cy.get('[data-cy=hidden-order]').should('be.visible');
    cy.get('[data-cy=basket-list]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('not.exist');
    cy.get('[data-cy=basket-list]')
      .contains('Соус Spicy-X')
      .should('not.exist');
    cy.get('[data-cy=bun-up]').should('not.exist');
    cy.get('[data-cy=buns-hidden]').should('be.visible');
  });
});
