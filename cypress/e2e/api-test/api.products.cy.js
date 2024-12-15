
describe('Products API', () => {
    let productId;



    it("Get products and extract ID", () => {
        cy.request({
            method: 'GET',
            url: "http://localhost:8081/products/"

        }).then((response) => {
            productId = response.body[Math.floor(Math.random() * response.body.length)].id;
            cy.log(response.body)
            cy.log(productId)
        });
    });


    it('return details of product by ID', () => {

        const propertyToCheck = ["name", "availableStock", "skin", "aromas", "ingredients", "description", "price", "picture", "varieties"]
        cy.request("http://localhost:8081/products/" + `${productId}`)
            .then((response) => {
                expect(response.status).to.eq(200);
                for (const property of propertyToCheck) {
                    expect(response.body).to.have.property(property)
                }

            })


    });
})