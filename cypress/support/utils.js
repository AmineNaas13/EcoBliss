export function resetCart(token) {
    if (!token) {
        return;
    }
    cy.request({
        method: 'GET',
        url: `${Cypress.env("apiUrl")}/orders`,
        headers: {
            'Authorization': 'Bearer ' + token,
        },

    }).then((response) => {

        for (const item of response.body.orderLines) {
            cy.request({
                method: 'DELETE',
                url: `${Cypress.env("apiUrl")}/orders/${item.id}/delete`,
                headers: {
                    'Authorization': 'Bearer ' + token,
                },

            }).then((response) => {
                expect(response.status).to.eq(200); // Vérifie que la requête réussit.


            });


        }

    });


}