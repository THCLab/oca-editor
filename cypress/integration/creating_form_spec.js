import JSZip from 'jszip'

describe('Creating form from scratch', function() {
  it('adds control and exports to zip', function() {
    const name = "testName"
    const description = "Description for test schema"

    cy.visit('localhost:8080')
    cy.get('#nameInput').type(name)
    cy.get('#descInput').type(description)
    cy.get('.createBtn > .row > :nth-child(2) > .btn').click()
    cy.url().should('include', '/schemas')

    cy.get('tbody > :nth-child(1)').click()
    cy.url().should('include', `/schemas/${name}`)

    cy.get('[data-control-type="text"]')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { which: 1, pageX: 400, pageY:300 })
      .trigger('mouseup')

    cy.get('.col-md-12 > :nth-child(3)').as('exportBtn')
      .click()

    cy.get('.noty_text')
      .invoke('text')
      .should('eq', 'Attribute name cannot be empty')

    cy.get('.mb-2').contains('Text Input')
      .get('.options > .fa-pencil-alt')
      .click()

    cy.get('.input-group > .form-control').eq(1)
      .type('test')

    cy.get('@exportBtn').click().wait(100)

    cy.window().then(async (win) => {
      const zipBase64 = win.sessionStorage.getItem('zipBase64')

      await JSZip.loadAsync(zipBase64, { base64: true })
        .then(zip => {
          expect(Object.keys(zip.files)).to.have.lengthOf(5)
          expect(zip.files).to.have.property(`${name}.json`)
        }, e => {
          expect(e).not.to.be.an('Error')
        })
    })
  })
})
