# ember-dictionary

Dictionary loading mocked from [wooorm/dictionaries](https://github.com/wooorm/dictionaries)

This is a custom [hunspell](http://hunspell.github.io) dictionary for spellchecking the Ember guides.  It has the common technical terms used by the Ember community and helps enforce consistency across the guides.

For example, `emberobserver` and `EmberObserver` will be flagged as invalid, with a suggestion of `Ember Observer`.

The dictionary will use [retext-spell](https://github.com/retextjs/retext-spell) to spell check the markdown files.

It does not include common addon or package names, for example `ember-cli-addon-docs` because they are not likely to be in every guide.  These should be defined in the local `.ember.dic` file located a the root of the project.

## Installation`

`yarn add ember-dictionary

## Table of Dictionaries

To use the dictionary, it can be added the `.remarkrc.js` file with the appropriate configuration options

```js
// .remarkrc.js
exports.plugins = [
  [
    "remark-retext",
    require("unified")().use({
      plugins: [
        [require("retext-contractions"), { straight: true }],
        require("retext-english"),
        require("retext-indefinite-article"),
        require("retext-repeated-words"),
        require("retext-syntax-urls"),
        [
          require("retext-spell"), 
            { 
              dictionary: require("ember-dictionary"), 
              personal: require("./dictionary/local.dic").join('\n')
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

The dictionary should contain names, terms, variables, and/or propetiies that are common to the Ember community that would be used in guides text. Items that would be specific to a single guide should be added to the local dictionary.  

This would include names of addons e.g. `ember-moment` used in guide examples. Addons that are in the Ember namespace e.g. `ember-cli-dependency-checker` can be included in the dictionary.

## Contributing

Fork, add word(s) to the index.dic file and REP if needed to index.aff.  Add words to the `test.md` file and make it works as expected.

Ask if not sure how to do the REP entry
