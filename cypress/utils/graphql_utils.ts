import baseUrl from './config'

const performGraphqlRequest = (method: string, endpoint:string, body:object) => {
  return cy.request({
    method: method,
    url: `${baseUrl}/${endpoint}`,
    body: body
  })
};

export default performGraphqlRequest