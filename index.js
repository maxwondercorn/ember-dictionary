const util = require('util');
const read = require('fs').readFile;
const readFile = util.promisify(read);
const path = require('path');

module.exports = load;

async function load(callback) {
  let result = {};
  let exception = null;

  try {
    result['aff'] = await readFile(path.join(__dirname, 'index.aff'));
    result['dic'] = await readFile(path.join(__dirname, 'index.dic'));
  } catch (e) {
    exception = exception || e;
  } finally {
    callback(exception, exception ? null : result);
  }
}
