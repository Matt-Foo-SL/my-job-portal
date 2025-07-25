describe('Click on the apply button and applied job should show up on the applications tab', () => {
  it('login', () => {
    //login
    cy.visit('https://my-job-portal-client.vercel.app/login')
    cy.get('#email').clear().type('user1@gmail.com')
    cy.get(':nth-child(2) > .form-control').clear().type('Abc123!')
    cy.get('button[type=submit]').click()
    cy.contains('Logout')
    //go to jobs page
    cy.get('[href="/jobs"]').click()
    cy.location('pathname').should('eq', '/jobs')
    //apply job
    cy.get('[data-testid="job-0"]').then(($ele) => {
      const jobTitleText = $ele.find('.col > h6').text()
      const companyText = $ele.find('.col > .mb-0').text()
      //click on Apply button
      cy.get('button[type=button]').then(($btn) => {
        const txt = $btn.text()
        cy.get('button[type=button]').contains('Apply').click()
        cy.get('button[type=button]').should(($btn2) => {
          expect($btn2.text()).not.to.eq(txt)
        })
      })
      //go to job applications page
      cy.get('[href="/job-applications"]').click()
      cy.get('select').select('InProgress')
      cy.get('[data-testid="job-application-0"]').then(($ele) => {
        const appliedJobTitle = $ele.find('.col > h6').text()
        const appliedCompanyText = $ele.find('.col > p').text()
        cy.log(appliedJobTitle)
        cy.log(appliedCompanyText)
        expect(jobTitleText).to.eq(appliedJobTitle)
        expect(companyText).to.eq(appliedCompanyText)
      })
    })
  })
})
