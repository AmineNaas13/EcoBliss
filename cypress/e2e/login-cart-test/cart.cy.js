describe('Cart tests', () => {
    const username = 'test2@test.fr';
    const password = 'testtest';
    before(() => {
        //vister la page de connexion
        cy.visit("http://localhost:8080/#/login");
        cy.get('[data-cy="login-input-username"]').type(username);
        cy.get('[data-cy="login-input-password"]').type(password);
        cy.get('[data-cy="login-submit"]').click();

        //verifier que l'utlisateur est redirigé
        cy.url().should('eq', 'http://localhost:8080/#/');

    });
    it('add product in the cart', () => {
        cy.get('[data-cy="nav-link-products"]').click();
        // verifier qu on est sur la bonne page
        cy.url().should('eq', 'http://localhost:8080/#/products');

        // choisir un produit aleatoir
        cy.get('[data-cy="product"]').its('length').then((Count) => {

            // Générer un index aléatoire
            const randomIndex = Math.floor(Math.random() * Count);
            cy.get('[data-cy="product"]').eq(randomIndex).contains("Consulter").click();



            cy.get('[data-cy="detail-product-stock"]').invoke('text').then((stockText) => {
                const stock = parseInt(stockText, 10); // Convertir le texte en entier
                if (stock > 1) {
                    // cy.contains('Consulter').click();
                    cy.contains('Ajouter au panier').click();
                    cy.get('[data-cy="nav-link-cart"]').should('contain', '1 article'); // Vérification
                    cy.contains("Validez votre commande").click()
                } else {
                    cy.log('Stock insuffisant pour ajouter ce produit au panier');
                }
            });



        });


    });



})