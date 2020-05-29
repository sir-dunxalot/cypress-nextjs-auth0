import Iron from '@hapi/iron';

Cypress.Commands.add('seal', (thingToEncrypt) => {
  return new Cypress.Promise((resolve, reject) => {
    try {
      Iron.seal(thingToEncrypt, Cypress.env('auth0CookieSecret'), Iron.defaults).then((encryptedThing) => {
        resolve(encryptedThing);
      });
    } catch (error) {
      reject(error);
    }
  });
});
