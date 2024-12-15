describe('API Orders', () => {

  const apiOrders = `${Cypress.env("apiUrl")}/orders`;
  const apiOrdersAdd = `${Cypress.env("apiUrl")}/orders/add`;
  const apiLogin = `${Cypress.env("apiUrl")}/login`;
  let token;

  it('return 401 if not logged in', () => {

    cy.request({
      method: 'GET',
      url: apiOrders,
      failOnStatusCode: false //permet de continuer même si la réponse contient un code d'erreur 

    }).then((response) => {
      expect(response.status).to.eq(401);// anomalie devrait retourner une 403

    })
  })

  // Retourner la list des produit qui sont dans le panier

  before(() => {
    cy.request({
      method: 'POST',
      url: apiLogin,
      body: {
        username: 'test2@test.fr',
        password: 'testtest',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");// Vérifie que le token est défini.
      token = response.body.token;
    })

  })


  it('should return products in the cart after logged in', () => {
    //ajouter un produit
    cy.request({
      method: 'PUT',
      url: apiOrdersAdd,
      headers: {
        'Authorization': 'Bearer ' + token,
        // Authorization: `Bearer ${token}`, // Ajout du token JWT.
      },
      body: {
        product: 3,
        quantity: 1,
      },
    }).then((response) => {
      expect(response.status).to.eq(200); // Vérifie que la requête réussit.

      cy.request({
        method: 'GET',
        url: apiOrders,
        headers: {
          'Authorization': 'Bearer ' + token,
        },

      }).then((response) => {
        expect(response.status).to.eq(200); // Vérifie que la requête réussit.
        expect(response.body).to.have.property("orderLines")
        expect(response.body.orderLines).to.be.an("array").and.not.to.be.empty
        expect(response.body.orderLines[0].product).to.have.property("id", 5)

      });

    });



  });


})