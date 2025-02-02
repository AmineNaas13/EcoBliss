describe('cart for connected', () => {

  const username = 'test2@test.fr';
  const password = 'testtest';

  before(() => {
    //vister la page de connexion
    cy.visit("http://localhost:8080/#");
    cy.contains("Connexion").click();
    cy.get('[data-cy="login-input-username"]').type(username);
    cy.get('[data-cy="login-input-password"]').type(password);
    cy.get('[data-cy="login-submit"]').click();

    //verifier que l'utlisateur est redirigé
    cy.url().should('eq', 'http://localhost:8080/#/');

  });
  it('find an add to cart button on product page', () => {
    // rediriger vers la page des produits
    cy.contains("Voir les produits").should('exist').click();

    //verifier que la page est bien chargé 
    cy.url().should('eq', 'http://localhost:8080/#/products');

    // Sélectionner un produit aléatoirement 
    // Récupérer le nombre total de produits affichés
    cy.get('[data-cy="product"]').its('length').then((productCount) => {
      // Générer un index aléatoire
      const randomIndex = Math.floor(Math.random() * productCount);
      cy.get('[data-cy="product"]').eq(randomIndex).contains("Consulter").click();
    });
    cy.get('[data-cy="detail-product-add"]').should('exist');
    cy.get('[data-cy="detail-product-add"]').should('be.visible').click();

  });

  after(() => {
    cy.get('[data-cy="nav-link-logout"]').click();
    cy.url().should('eq', 'http://localhost:8080/#/');

  })
})