/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example to-do app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000/')
  })

  it('should render a list', () => {
    cy.get('.active').should('contain.text', 'Home')
    cy.get('.grid').should('be.visible')

    cy.get(':nth-child(1)').should('contain.text', '1.').should('be.visible')
    cy.get(':nth-child(50)').should('contain.text', '50.')


  })

  it('should change page', () => {
    cy.get('.btm-nav > :nth-child(1)').click()
    cy.get('.hero').scrollTo('bottom')
    cy.get('.justify-center > :nth-child(2)').should('be.visible').click()
    cy.get(':nth-child(50)').should('contain.text', '100.')
    cy.get('[aria-disabled="false"]').should('be.visible').click()
    cy.get(':nth-child(50)').should('contain.text', '50.')
  })

})
