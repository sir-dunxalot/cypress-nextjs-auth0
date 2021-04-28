const encrypt = require('../../encrypt');

module.exports = (on, config) => {
  on('task', { encrypt });
}
