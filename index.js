let read = require("fs").readFile;
let path = require("path");
let util = require("util");

module.exports = load;

const readFile = util.promisify(read);

async function load(callback) {
  let result = {};

  try {
    result['aff'] = await readFile(path.join(__dirname, "index.aff"));
    result['dic'] = await readFile(path.join(__dirname, "index.dic"));
  } catch (e) {
    console.error(e.message);
  } finally {
    return result;
  }
}

