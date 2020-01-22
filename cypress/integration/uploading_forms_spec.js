import JSZip from 'jszip'

describe('Uploading forms from file', function() {
  it('resolves forms and exports first form to zip', function() {
    cy.visit('localhost:8080')

    cy.fixture('example.zip').as('file')
      .get('#chooseFile').then(el => {
      return Cypress.Blob.base64StringToBlob(this.file, 'application/zip')
        .then(blob => {
            const testfile = new File([blob], 'example.zip')
            var dataTransfer = new DataTransfer()
            dataTransfer.items.add(testfile)
            el[0].files = dataTransfer.files
            el[0].dispatchEvent(new Event('change'))
        })
    })

    cy.get('.uploadBtn > .row > :nth-child(2) > .btn').click()
    cy.url().should('include', '/schemas')
    cy.get('tbody').find('tr').should('have.length', 10)

    cy.get('tbody > :nth-child(1)').click()

    cy.get('#exportFormBtn').click().wait(100)
    cy.window().then(async (win) => {
      const zipBase64 = win.sessionStorage.getItem('zipBase64')

      await JSZip.loadAsync(zipBase64, { base64: true })
        .then(zip => {
          expect(Object.keys(zip.files)).to.have.lengthOf(7)
        }, e => {
          expect(e).not.to.be.an('Error')
        })
    })
  })
})
