# ember-dictionary

This is a custom [Hunspell](http://hunspell.github.io) dictionary for spellchecking the Ember guides.  It has the common technical terms used by the Ember community and helps enforce consistency across the guides.

For example, `emberobserver` and `EmberObserver` will be flagged as invalid, with a suggestion of `Ember Observer`.

The dictionary is used with [retext-spell](https://github.com/retextjs/retext-spell) to spellcheck markdown files. `retext-spell` dictionary loading is demonstrated in [wooorm/dictionaries](https://github.com/wooorm/dictionaries).

This dictionary merges in the `en_US` Hunspell [dictionary](http://wordlist.sourceforge.net) with the Ember words. This simplifies configuration of `retext-spell`.  The english dictionary will need to be occossionally remerged (12-18 months) to keep it in sync. See en_US.lic for license.

## Installation

```sh
npm add ember-dictionary
```

Note: Some `retext` plugins have dependencies that require Node v8.  Specifically, the `remark-lint-no-dead-urls` plugin. 

## Configuration file

To use the dictionary, add it to `.remarkrc.js` file with the appropriate configuration options

```js
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
  ["remark-lint-list-item-indent", "space"],
  "remark-lint-no-dead-urls"
];
```

## Ignore files

A `.remarkignore` file added to the project root directory can be used to ignore markdown files from linting.  Generally, README.md and CONTRIBUTING.ms would be included in the file.

## What to add

The dictionary (`index.dic`) should contain names, terms, variables, and/or properties that are common to the Ember ecosystem and community. Examples would include `addon`, `rootURL`, `LTS` and `codemod`.

Technical jargon and major packages such as `SemVar`, `QUnit`, and `minification` should also be included in the dictionary. Specifying names will keep spelling/capitalization consistent across the guides.

Ember words are added at the time of the `index.dic` file in alphanumerical order.  Capitalized words first, sentence cased next and lowercase or camelcase follow.

Generally, addon names would not be included in the dictionary.  The exception would be any core package, such as `ember-cli-dependency-checker` should be included.  Addons and packages under an Ember organization should be added to the dictionary.

## What not to add

Items that would be specific to a single guide should be added to the local project dictionary.  The project dictionary is named `.ember.dic` and should be located in the project root directory. Non-core packages and addons used in examples, such as `ember-moment` would also be in the local dictionary.

The local dictionary can also be used to force exclusion of words.  If a word in the dictionary is prefixed with and `*`, spellcheck will always flag those as misspelt words.

## Affix file

Hunspell dictionaries have an affix file (`index.aff`) that contains rules to pluralize, prefix and suffix dictionary words. This allows you to add the root form of the word and Hunspell can determine if other variants are spelled correctly.

For example, you can validate `addon` and `addons` but using `addon/S`. For certain technical terms, you have to put all variations in the dictionary, as the rules may not work.  `Codemod` and `codemods` is an example of this, so both need to be in the dictionary.

The affix file can also be used to offer alternatives when a word is misspelled.  For example, if `QUnit` is the correct form to use in the guides, spellings such as `qunit` and `Qunit` could offer `QUnit` as a replacement.  This enforces consistency in the guides.

The `REP` section of the affix file is where replacements are put. For the `QUnit` example above, two entries would be needed.

```sh
REP qunit QUnit
REP Qunit QUnit
```

All Ember REPS should go at the top of the list in alphabetical order.  Note the REP count at the top of the list must be **`exactly`** the number of REPS.


## Contributing

Fork, add word(s) to the `index.dic` file and create a REP in `index.aff` file, if needed.
Ask if not sure how to do the REP entry!!
