const read = require('fs').readFile;
const readFile = util.promisify(read);
const path = require('path');
const util = require('util');

module.exports = load;

async function load(callback) {
  let result = {};
  let exception = null;

  // need v8 for async/await
  if (process.versions.node.split('.')[0] < 8) {
    throw new Error('Node version not supported. Need v8');
  }

  try {
    result['aff'] = await readFile(path.join(__dirname, 'index.aff'));
    result['dic'] = await readFile(path.join(__dirname, 'index.dic'));
  } catch (e) {
    exception = exception || e;
  } finally {
    callback(exception, exception ? null : result);
  }
}
