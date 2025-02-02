import { faker } from '@faker-js/faker';

// Requete POST Login 

describe('API login Tests', () => {
    const apiLogin = `${Cypress.env("apiUrl")}/login`;
    let token

    it('should return 401 for unkown user', () => {
        const fakeUsername = faker.internet.email()
        const fakePasword = faker.internet.password()

        cy.log(fakeUsername)
        cy.log(fakePasword)
        cy.request({
            method: 'POST',
            url: apiLogin,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            body: {
                username: fakeUsername,
                password: fakePasword
            }

        }).then((response) => {
            expect(response.status).to.eq(401);
        })
    });

    it('should return 200 if user is logged in ', () => {
        cy.request({
            method: 'POST',
            url: apiLogin,
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            body: {
                username: 'test2@test.fr',
                password: 'testtest',
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            token = response.body.token;
            cy.log(token);
        })

    });
})