describe('Availability field', () => {
    it('should exist on product page ', () => {
        cy.visit("http://localhost:8080/#")
        cy.get('[data-cy="product-home-link"]').first().click();
        cy.get('[data-cy="detail-product-stock"]').should('exist');
        cy.get('[data-cy="detail-product-stock"]').should('be.visible');

    });
});