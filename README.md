# ember-dictionary

This is a custom [Hunspell](http://hunspell.github.io) dictionary for spellchecking the Ember guides.  It has the common technical terms used by the Ember community and helps enforce consistency across the guides.

For example, `emberobserver` and `EmberObserver` will be flagged as invalid, with a suggestion of `Ember Observer`.

The dictionary is used with [retext-spell](https://github.com/retextjs/retext-spell) to spellcheck markdown files. `retext-spell` dictionary loading is demonstrated in [wooorm/dictionaries](https://github.com/wooorm/dictionaries).

This Ember dictionary is merged with the `en_US` Hunspell [dictionary](http://wordlist.sourceforge.net). This simplifies configuration of `retext-spell`.  The english dictionary will occasionally need to be remerged (12-18 months) to keep it in sync. See en_US.lic for license.

## Installation

```bash
npm install ember-dictionary
```

Create a local dictionary file `.local.dic` at the root of the project. This file can contain valid words that are specific to the project. The `.local.dic` file is required even if they are not any guide specific words.

## Configuration file

To use the dictionary, add it to `.remarkrc.js` file with the appropriate configuration options.


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

A copy of this `remarkrc.js` file is included in this project.

## Dependencies

For markdown linting based on the above `remarkrc` configuration install the following in devDependencies:

```bash
npm i remark-cli --save-dev
npm i ember-dictionary --save-dev
npm i remark-lint --save-dev
npm i remark-preset-lint-consistent --save-dev
npm i remark-lint-list-item-indent --save-dev
npm i remark-preset-lint-recommended  --save-dev
npm i remark-retext --save-dev
npm i retext-contractions --save-dev
npm i retext-english --save-dev
npm i retext-indefinite-article --save-dev
npm i retext-repeated-words --save-dev
npm i retext-spell --save-dev
npm i retext-syntax-urls --save-dev
npm i unified --save-dev
```

## Ignore files

To ignore files during lintng, a `.remarkignore` file can be added to the project's root directory. Generally, `README.md` and `CONTRIBUTING.md` would be excluded.

## Contributing

If you would like to add new words to the dictionary, read the [contributing](./contributing.md) guide.