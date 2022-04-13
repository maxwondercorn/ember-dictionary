# ember-dictionary

## **Release 2.9 replaces 2.8 which was prematurely released!!!**

This is a custom [Hunspell](http://hunspell.github.io) dictionary for spellchecking the Ember guides.  It has the common technical terms used by the Ember community and helps enforce consistency across the guides.

For example, `emberobserver` and `EmberObserver` will be flagged as invalid, with a suggestion of `Ember Observer`.

In addition to spell checking, the markdown will be linted for repeated words, contraction errors and conssitency issues. See the documentation for the plugins used in the configuration file.

## Dictionary
The Ember dictionary is merged with the `en_US` Hunspell [dictionary](http://wordlist.sourceforge.net). This simplifies configuration of `retext-spell`.  The english dictionary will occasionally need to be remerged (~12-18 months) to keep it in sync. See en_US.lic for license. 

Whenever the `en_US` dictionary is updated check for duplicate words using the command `REV` command discussed in [CONTRIBUTING](contributing#finally).

## Installation

```bash
npm install ember-dictionary
```
or

```bash
yarn add ember-dictionary
```
## Dependencies

Install the following devDependencies:

```bash
npm i -D remark-cli
npm i -D ember-dictionary
npm i -D remark-lint
npm i -D remark-preset-lint-consistent
npm i -D remark-lint-list-item-indent
npm i -D remark-preset-lint-recommended
npm i -D remark-retext
npm i -D retext-contractions
npm i -D retext-english
npm i -D retext-indefinite-article
npm i -D retext-repeated-words
npm i -D retext-spell
npm i -D retext-syntax-urls
npm i -D unified
```

Create a `.remarkrc.js` file in the project root and paste the configuration below into the file. A copy of `.remarkrc.js` is included in the repo.

```js
// ./remark.js
/* eslint-env node */
const unified = require("unified");
const read = require("fs").readFileSync;
const ember = require("ember-dictionary");

exports.plugins = [
  [
    require("remark-retext"),
    unified().use({
      plugins: [
        [require("retext-contractions"), { straight: true }],
        require("retext-english"),
        require("retext-indefinite-article"),
        require("retext-repeated-words"),
        require("retext-syntax-urls"),
        [
          require("retext-spell"),
          {
            dictionary: ember,
            personal: read("./.local.dic")
          }
        ]
      ]
    })
  ],
  "remark-preset-lint-consistent",
  "remark-preset-lint-recommended",
  ["remark-lint-list-item-indent", "space"]
];
```

## Local dictionary

Project specific words not included in the main dictionary can be added to a local dictionary. In the proejct root, create a file named `.local.dic`. Additonal words are added to this file with each word on its own line.

Note: The `.local.dic` file needs to be present even if they are not any project specific words!

## Ignore files

Ignore files during linting by adding them a `.remarkignore` file to the project's root. Generally, `README.md` and `CONTRIBUTING.md` would be excluded. Older documentation versions can also be added to save time during CI.

## Finally

Add the following npm script to `package.json`. The `--frail` flag will generate errors causing the linting to fail. For warnings only remove `--frail`.

```json
"lint:md": "remark . --frail"
```
## Contributing

If you would like to add new words to the dictionary, read the [contributing](./contributing.md) guide.
