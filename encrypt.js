const hkdf = require('futoin-hkdf');
const { JWK, JWE } = require('jose');

const BYTE_LENGTH = 32;
const ENCRYPTION_INFO = 'JWE CEK';
const options = { hash: 'SHA-256' };

const deriveKey = secret =>
  hkdf(secret, BYTE_LENGTH, { info: ENCRYPTION_INFO, ...options });

module.exports = function encrypt(arg) {
  const { secret, ...thingToEncrypt } = arg;
  const key = JWK.asKey(deriveKey(secret));
  const epochNow = (Date.now() / 1000) | 0;
  return Promise.resolve(
    JWE.encrypt(JSON.stringify(thingToEncrypt), key, {
      alg: 'dir',
      enc: 'A256GCM',
      uat: epochNow,
      iat: epochNow,
      exp: epochNow + 7 * 24 * 60 * 60,
    }),
  );
};
