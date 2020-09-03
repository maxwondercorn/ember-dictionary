# ember-dictionary

This is a custom [Hunspell](http://hunspell.github.io) dictionary for spellchecking the Ember guides.  It has the common technical terms used by the Ember community and helps enforce consistency across the guides.

For example, `emberobserver` and `EmberObserver` will be flagged as invalid, with a suggestion of `Ember Observer`.

In addition to spellchecking, linting for repeated words, contraction errors and other markdown issues is also performed.

## Dictionary
The Ember dictionary is merged with the `en_US` Hunspell [dictionary](http://wordlist.sourceforge.net). This simplifies configuration of `retext-spell`.  The english dictionary will occasionally need to be remerged (~12-18 months) to keep it in sync. See en_US.lic for license. 

Whenever the `en_US` dictionary is updated check for duplicate words using the command `REV` command discussed in [CONTRIBUTING](contributing#finally).

## Installation

```bash
npm install ember-dictionary
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

Create a `.remarkrc.js` file in the project root and copy this configuration below into the file. A copy of this file is included in the repo.

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

A local dictionary file can be used for project specific words not included in the dictionary.

Create a local dictionary file named `.local.dic` in the project root. Each word should be on its own line in the file

The `.local.dic` file is _REQUIRED_ even if they are not any guide specific words.

## Ignore files

To ignore files during lintng add a `.remarkignore` file to the project's root directory. Generally, `README.md` and `CONTRIBUTING.md` would be excluded.

## Finally

Add the following script command to your `package.json`. For warnings only do use `--frail`. 

```json
"lint:md": "remark . --frail"
```


## Contributing

If you would like to add new words to the dictionary, read the [contributing](./contributing.md) guide.
