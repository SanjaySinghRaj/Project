describe('Data from the JSON file', () => {
  it('Data from the JSON file', () => {
    cy.log('Opening Web Page')
    cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html')

    cy.log('Data from the JSON file And Enter in UI')
    cy.contains('Table Data').click();
    cy.fixture('data').then((jsonData) => {
      const jsonString = JSON.stringify(jsonData);
      cy.log('')
      cy.get('[id="jsondata"]').clear().type(jsonString, { parseSpecialCharSequences: false });
    })
    cy.contains('Refresh Table').click();

    cy.log('Verify Data from the JSON file')
    cy.fixture('data.json').then((data) => {

      cy.get('table > tr').each((ele, index) => {
        if (!index == 0) {
          cy.wrap(ele).find('td:nth-child(1)').should('have.text', data[index - 1].name)

          cy.wrap(ele).find('td:nth-child(2)').should('have.text', data[index - 1].age)
        }
      })
    })
  })
})