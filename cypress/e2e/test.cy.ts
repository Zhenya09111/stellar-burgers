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
    cy.get('[data-cy=ingredient-list]')
      .find('li')
      .each(($ingredient) => {
        cy.wrap($ingredient).within(() => {
          cy.contains('Добавить').click();
        });
      });
  });
  it('модальное окно открыто', () => {
    cy.get('[data-cy=ingredient-list]').within(() => {
      cy.contains('Краторная булка N-200i').parent().click();
    });
    cy.get('[data-cy=modal]').should('be.visible');
  });
  it('закртыие модалки ингредиента кликом по оверлею', () => {
    cy.get('[data-cy=ingredient-list]').within(() => {
      cy.contains('Краторная булка N-200i').parent().click();
    });
    cy.get('[data-cy=overlay]').click({ force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });
  it('закрытие модалки кликом по кнопке закрытия', () => {
    cy.get('[data-cy=ingredient-list]').within(() => {
      cy.contains('Биокотлета из марсианской Магнолии').parent().click();
    });
    // cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=closeIcon]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });
  it('все ингредиенты добавились', () => {
    cy.get('[data-cy=basket-list]').children().should('have.length', 2);
  });
  it('Верхний слой булки добавился', () => {
    cy.get('[data-cy=bun-up]').should('be.visible');
  });
  it('при отправке заказа показывается модальное окно', () => {
    cy.get('[data-cy=order-button]').click();
    cy.get('[data-cy=modal]').should('be.visible');
  });
  it('номер заказа указан верно', () => {
    cy.get('[data-cy=order-button]').click();
    cy.get('[data-cy=test]').should('contain.text', '1');
  });
  it('успешность закрытия модалки заказа', () => {
    cy.get('[data-cy=order-button]').click();
    cy.get('[data-cy=closeIcon]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });
  it('после закртия модалки заказа корзина пуста', () => {
    cy.get('[data-cy=order-button]').click();
    cy.get('[data-cy=closeIcon]').click();
    cy.get('[data-cy=hidden-order]').should('be.visible');
  });
  it('после закртия модалки заказа булок нет', () => {
    cy.get('[data-cy=order-button]').click();
    cy.get('[data-cy=closeIcon]').click();
    cy.get('[data-cy=buns-hidden]').should('be.visible');
  });
});
