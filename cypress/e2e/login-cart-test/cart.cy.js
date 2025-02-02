describe("Cart tests", () => {
    const username = "test2@test.fr";
    const password = "testtest";


    beforeEach(() => {
        //vister la page de connexion
        cy.visit("http://localhost:8080/#/login");
        cy.get('[data-cy="login-input-username"]').type(username);
        cy.get('[data-cy="login-input-password"]').type(password);
        cy.get('[data-cy="login-submit"]').click();

        //verifier que l'utlisateur est redirigé
        cy.url().should("eq", "http://localhost:8080/#/");

    });


    it("add product in the cart", () => {
        cy.get('[data-cy="nav-link-products"]').click();
        // verifier qu on est sur la bonne page
        cy.url().should("eq", "http://localhost:8080/#/products");

        // choisir un produit aleatoire
        cy.get('[data-cy="product"]')
            .its("length")
            .then((Count) => {
                // Générer un index aléatoire
                const randomIndex = Math.floor(Math.random() * Count);
                cy.get('[data-cy="product"]')
                    .eq(randomIndex)
                    .contains("Consulter")
                    .click();

                cy.wait(3000);
                // Vérifier le stock du produit
                cy.get('[data-cy="detail-product-stock"]')
                    .invoke("text")
                    .then((stockText) => {
                        const stock = parseInt(stockText);
                        cy.log(`Stock initial: ${stock}`);

                        if (stock > 1) {
                            cy.get('[data-cy="detail-product-add"]').click();
                            // verifier la présence du produit dans le panier
                            cy.get("#cart-content").should("exist");
                            cy.get('[data-cy="cart-line"]').should("have.length", 1);

                            // Retourner sur la page produit pour vérifier le stock mis à jour
                            cy.go("back"); // Retourner sur la page précédente
                            cy.reload(); // Recharger pour garantir les mises à jour du stock
                            cy.get('[data-cy="detail-product-stock"]')
                                .invoke("text")
                                .then((newStock) => {
                                    expect(parseInt(newStock)).to.eq(stock - 1);
                                });

                            //Ajouter le produit au panier
                            cy.get('[data-cy="detail-product-quantity"]').clear().type("1");
                            cy.contains("Ajouter au panier").click();

                        } else {
                            cy.log("Le Stock est insuffisant");
                        }
                    });
            });
    });
    it("don't change the cart with negative number", () => {
        cy.get('[data-cy="nav-link-products"]').click();
        cy.get('[data-cy="product-link"]').first().click();
        cy.get('[data-cy="detail-product-quantity"]').clear().type("-1"); // Tester quantité négative
        cy.get('[data-cy="detail-product-add"]').click();
        cy.get('[data-cy="detail-product-form"]').should('have.class', 'ng-invalid');
        cy.get("#cart-content").should("not.exist");

    });

    it("don't change the cart with 20+ number", () => {
        cy.get('[data-cy="nav-link-products"]').click();
        cy.get('[data-cy="product-link"]').first().click();
        cy.get('[data-cy="detail-product-quantity"]').clear().type("21"); // Tester quantité supérieure à 20
        cy.get('[data-cy="detail-product-add"]').click();
        cy.get("#cart-content").should("exist");


    });

    it("should add a product to the cart and verify it in the API", () => {
        cy.get('[data-cy="nav-link-products"]').click();
        cy.get('[data-cy="product-link"]').first().click();
        cy.get('[data-cy="detail-product-add"]').click();
        cy.request({
            method: "POST",
            url: "http://localhost:8081/login",
            body: {
                username: "test2@test.fr",
                password: "testtest",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            const token = response.body.token;
            cy.wrap(token).as('authToken'); // Stocker le jeton dans un alias Cypress
        });

        // Utiliser le même jeton pour les requêtes suivantes
        cy.get('@authToken').then((token) => {
            cy.request({
                method: "GET",
                url: "http://localhost:8081/orders",
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
            }).then((response) => {
                expect(response.status).to.eq(200);

                cy.log(' TEST Response:', JSON.stringify(response.body));
                expect(response.body).to.have.property("orderLines");
                expect(response.body.orderLines).to.be.an("array").and.not.to.be.empty;
                const productInCart = response.body.orderLines.find(orderLine => orderLine.product.id === 3);
                expect(productInCart).to.not.be.undefined;

            });
        });

    });
});
