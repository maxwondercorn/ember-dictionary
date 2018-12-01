# ember-dictionary

This is a custom [hunspell](http://hunspell.github.io) dictionary for spellchecking the Ember guides.  It has the common technical terms used by the Ember community and helps enforce consistency across the guides.

For example, `emberobserver` and `EmberObserver` will be flagged as invalid, with a suggestion of `Ember Observer`.

The dictionary will use [retext-spell](https://github.com/retextjs/retext-spell) to spellcheck markdown files. `retext-spell` dictionary loading is demonstrated in [wooorm/dictionaries](https://github.com/wooorm/dictionaries).


## Installation`

`yarn add ember-dictionary

## Table of Dictionaries

To use the dictionary, add it to `.remarkrc.js` file with the appropriate configuration options

```js
// .remarkrc.js
const unified = require("unified");
const engUs = require("dictionary-en-us");
const dicEmber = require("ember-dictionary")

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
              dictionary: engUs, 
              // dictionary: dicEmber, 
              // personal: require("./dictionary/local.dic").join('\n')
            }
        ],
      ]
    })
  ],
  "remark-preset-lint-consistent",
  "remark-preset-lint-recommended",
  ["remark-lint-list-item-indent", "space"],
  "remark-lint-no-dead-urls",
  "remark-validate-links"
];
```
## What to add

The dictionary should contain names, terms, variables, and/or properties that are common to the Ember ecosystem and community. Examples would include `addon`, `rootURL`, `LTS` and `codemod`.

Technical jargon such as `SemVar`, `QUnit`, and `minification` would also be included in the dictionary.

Generally, packages or addon names would not be included in the dictionary.  The exception would be any core package, such as `ember-cli-dependency-checker` would be included.  Any package or addon in the Ember namespace would be in the dictionary,. 

## What not to add

Items that would be specific to a single guide should be added to the local dictionary - `.ember.dic`, which should be located at the root of the project directory. Non-core packages and addons used in examples such as `ember-moment` should also be in the local dictionary.

## Plurals

Hunspell dictionaries have an affix file (`index.aff`) that contains rules to pluralize, prefix and suffix dictionary words. This means you only need to add the non-pluralized word form to the dictionary. For example, you can validate `addon` and `addons` but using `addon/S`. Pluralization may not work on certain technical terms and you need to add both to the dictionary.  `Codemod` and `codemods` is an example of this, so both need to be in the dictionary.

## Contributing

Fork, add word(s) to the index.dic file and create REP in the index.aff file, if needed. Add words to the `test.md`. `yarn test` to verify changes work as expected.

Ask if not sure how to do the REP entry.
