describe('API tests for unthorized acces', () => {

  const apiOrders = `${Cypress.env("apiUrl")}/orders`;

  it('return 401 if not logged in', () => {

    cy.request({
      method: 'GET',
      url: apiOrders,
      failOnStatusCode: false //permet de continuer même si la réponse contient un code d'erreur 

    }).then((response) => {
      expect(response.status).to.eq(401);
      // anomalie devrait retourner une 403

    })
  })
})