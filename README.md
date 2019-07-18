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

For complete markdown linting based on the above `remarkrc` configuration you need to npm install the following dependencies:

```bash
npm i remark-preset-lint-consistent
npm i remark-lint-list-item-indent
npm i remark-preset-lint-recommended 
npm i remark-retext
npm i retext-contractions
npm i retext-english
npm i retext-indefinite-article
npm i retext-repeated-words
npm i retext-spell
npm i retext-syntax-urls
```

## Ignore files

A `.remarkignore` file added to the project root directory can be used to ignore markdown files from linting.  Generally, README.md and CONTRIBUTING.md would be excluded.

## What to add

The dictionary (`index.dic`) should contain names, terms, variables, and/or properties that are common to the Ember ecosystem and community. Examples would include `addon`, `rootURL`, `LTS` and `codemod`.

Technical jargon and major packages such as `SemVar`, `QUnit`, and `minification` should also be included in the dictionary. Specifying names will keep spelling/capitalization consistent across the guides.

Ember words are added at the top of the `index.dic` file in alphanumerical order.  Capitalized words first, sentence cased next and lowercase or camelcase follow.

Generally, addon names would not be included in the dictionary.  The exception would be any core package, such as `ember-cli-dependency-checker` should be included.  Addons and packages under an Ember organization should be added to the dictionary.

## What not to add

Items that would be specific to a single guide should be added to the local project dictionary (`.local.dic`). Non-core packages and addons used in examples, such as `ember-moment` would also be in the local dictionary.

The local dictionary can also be used to force exclusion of words.  If a word in the dictionary is prefixed with and `*`, such as `*ember`, the spellchecker will always flag them as misspelt words.  This is good method for enforcing specific capitalization of common words

## Affix file

Hunspell dictionaries have an affix file (`index.aff`) that contains rules to pluralize, prefix and suffix dictionary words. This allows you to add the root form of the word and Hunspell can determine if other variants are spelled correctly.

For example, you can validate `addon` and `addons` but using `addon/S`. For certain technical terms, you have to put all variations in the dictionary because they may not follow english spelling rules.  `codemod` and `codemods` is an example of this, so both need to be included in the dictionary.

The affix file can also be used to offer alternatives when a word is misspelled.  For example, `QUnit` is the correct form of the library name. To enforce the correct proper name, spellings such as `qunit` and `Qunit` could offer `QUnit` as a replacement. This enforces consistency in the guides.

The `REP` section of the affix file is where replacements are placed. For the `QUnit` example above, two entries would be needed.

```sh
REP qunit QUnit
REP Qunit QUnit
```

All Ember REPS should go at the top of the list in alphabetical order.  Note the REP count at the top of the list must be **`exactly`** the number of REPS.


## Contributing

Fork, add word(s) to the `index.dic` file and if needed, create a REP in `index.aff` file.
Ask if not sure how to do the REP entry!!
