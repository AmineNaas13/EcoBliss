

describe('Login page', () => {

   it('check elements of login page', () => {
      cy.visit("http://localhost:8080");
      cy.get('[data-cy="nav-link-login"]').should('exist').click();
      cy.get('[data-cy="login-input-username"]').should('exist');
      cy.get('[data-cy="login-input-password"]').should('exist');
      cy.get('[data-cy="login-submit"]').should('exist');
   });
})


