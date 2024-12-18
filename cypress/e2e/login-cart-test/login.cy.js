describe('Login and logout ', () => {
    const username = 'test2@test.fr';
    const password = 'testtest';

    it('should connect the user', () => {

        cy.visit('http://localhost:8080/#/');
        cy.get('[data-cy="nav-link-login"]').click();
        cy.get('[data-cy="login-input-username"]').type(username);
        cy.get('[data-cy="login-input-password"]').type(password);
        cy.get('[data-cy="login-submit"]').click();

        //verifier que l'utlisateur est redirigé
        cy.url().should('eq', 'http://localhost:8080/#/');

        // vérifier que lebouton panier existe
        cy.get('[data-cy="nav-link-cart"]').should('exist');
        cy.get('[data-cy="nav-link-cart"]').should('have.text', "Mon panier");

        // Déconnexion
        cy.get('[data-cy="nav-link-logout"]').click();
        cy.get('[data-cy="nav-link-logout"]').should('not.exist');

    });

})