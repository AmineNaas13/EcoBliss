import { faker } from '@faker-js/faker';

describe('API reviews tests', () => {
    const apiLogin = `${Cypress.env("apiUrl")}/login`;
    const apiReviews = `${Cypress.env("apiUrl")}/reviews`;
    let token



    it('Logged in', () => {
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
    it('add a review', () => {

        const titre = faker.lorem.lines(1)
        const commentaire = faker.lorem.paragraph()
        const rate = faker.number.int({ min: 0, max: 5 })

        cy.request({
            method: 'POST',
            url: apiReviews,
            headers: {
                'Authorization': 'Bearer ' + token,
            },

            body: {
                "title": titre,
                "comment": commentaire,
                "rating": rate

            }

        }).then((response) => {
            expect(response.status).to.be.eq(200)
            expect(response.body).to.have.property('title', titre);
            expect(response.body).to.have.property('comment', commentaire);
            expect(response.body).to.have.property('rating', rate);
        })

    });

})