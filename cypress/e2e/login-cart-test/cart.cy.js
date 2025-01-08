describe('Cart tests', () => {
    const username = 'test2@test.fr';
    const password = 'testtest';

    beforeEach(() => {
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

        // choisir un produit aleatoire
        cy.get('[data-cy="product"]').its('length').then((Count) => {

            // Générer un index aléatoire
            const randomIndex = Math.floor(Math.random() * Count);
            cy.get('[data-cy="product"]').eq(randomIndex).contains("Consulter").click();


            // Vérifier le stock du produit
            cy.get('[data-cy="detail-product-stock"]').invoke('text').then((stockText) => {
                const stock = 0;
                const match = stockText.match(/\d+/);
                if (match) {
                    const stock = parseInt(match[0], 10);
                    cy.log(`Stock initial: ${stock}`);
                }

                // const stock = parseInt(stockText.match(/\d+/)[0], 10); // // Extraire le nombre et le convertir en entier
                // cy.log(`Stock initial: ${stock}`);

                if (stock > 1) {

                    cy.contains('Ajouter au panier').click();

                    // Naviguer vers la page du panier
                    cy.get('[data-cy="nav-link-cart"]').click();

                    // verifier la présence du produit dans le panier
                    cy.get('#cart-content').should('exist');
                    cy.get('[data-cy="cart-product"]').should('have.length', 1);


                    // Retourner sur la page produit pour vérifier le stock mis à jour
                    cy.go('back'); // Retourner sur la page précédente
                    cy.reload(); // Recharger pour garantir les mises à jour du stock
                    cy.get('[data-cy="detail-product-stock"]').invoke('text')
                        .should('contain', `${stock - 1} en stock`);


                    // Ajouter le produit au panier
                    cy.get('[data-cy="detail-product-quantity"]').clear().type('1');
                    cy.contains('Ajouter au panier').click();

                    // Vérifier que le produit est ajouté au panier via l'API
                    cy.request({
                        method: 'GET',
                        url: "http://localhost:8081/orders",


                    }).then((response) => {
                        expect(response.status).to.eq(200);// Vérifie que l'API renvoie un statut 200

                    })

                } else {
                    cy.log('Le Stock est insuffisant')
                }

                // Vérification des limites : stock négatif
                cy.get('[data-cy="detail-product-quantity"]').clear().type('-1'); // Tester quantité négative
                cy.contains('Ajouter au panier').click();
                cy.get('[data-cy="detail-product-form"]').should('have.class', 'ng-invalid');

                // Vérification des limites : stock supérieur à 20

                cy.get('[data-cy="detail-product-quantity"]').clear().type('21'); // Tester quantité supérieure à 20
                cy.contains('Ajouter au panier').click();

            });

        });

    });

})