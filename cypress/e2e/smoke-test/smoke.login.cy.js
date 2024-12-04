

describe('Login page', () => { 

   it('check elements of login page', () => {
    cy.visit("http://localhost:8080/#/login")
    cy.get('#username').should('exist');
    cy.get('#password').should('exist');
    cy.get('[data-cy="login-submit"]').should('exist');
   });
})


