

describe('Login page', () => { 

   it('check elements of login page', () => {
    cy.visit("http://localhost:8080/#/login")
    cy.get('[data-cy="login-input-username"]').should('exist');
    cy.get('[data-cy="login-input-password"]').should('exist');
    cy.get('[data-cy="login-submit"]').should('exist');
   });
})


