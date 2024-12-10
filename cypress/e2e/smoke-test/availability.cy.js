describe('Availability field', () => {
    it('should exist on product page ', () => {
        cy.visit("http://localhost:8080/#")
        cy.contains("Consulter").click()
        cy.get('[data-cy="detail-product-stock"]').should('exist');
        cy.get('[data-cy="detail-product-stock"]').should('be.visible');

    });
});