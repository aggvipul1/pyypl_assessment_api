import performGraphqlRequest from '../utils/graphql_utils'

describe('Retrieve country details api tests', () => {
  let testData = [{ code: 'AE' }, { code: 'SA' }, { code: 'ZA' }]
  testData.forEach(({ code }) => {
    it(`get country api should return correct details for country code ${code} without any errors`, () => {
      cy.fixture('countryInformation.json').then((data) => {
        data.query = data.query.replace('{{countryCode}}', code)
        performGraphqlRequest('POST', 'graphql', { query: data.query }).then((response) => {
          expect(response.status).to.deep.eq(200)
          let actualCountryDetails = response.body.data.country
          let expectedCountryDetails = data.response[code]
          expect(actualCountryDetails.name).to.deep.eq(expectedCountryDetails.name)
          expect(actualCountryDetails.capital).to.deep.eq(expectedCountryDetails.capital)
          expect(actualCountryDetails.currency).to.deep.eq(expectedCountryDetails.currency)
          expect(actualCountryDetails.code).to.deep.eq(expectedCountryDetails.code)
          expect(actualCountryDetails.languages).to.deep.eq(expectedCountryDetails.languages)
        })
      })
    })
  })

  it('get country api should not return country details when an invalid country code is passed', () => {
    const countryCode = 'ABCDEFG'
    cy.fixture('countryInformation.json').then((data) => {
      data.query = data.query.replace('{{countryCode}}', countryCode)
      performGraphqlRequest('POST', 'graphql', { query: data.query }).then((response) => {
        expect(response.status).to.deep.eq(200)
        expect(response.body.data.country).to.be.null
      })
    })
  })
})