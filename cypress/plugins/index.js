const encryptTask = require('../../encrypt');

module.exports = (on, config) => {
  on('task', encryptTask)
}
