# ember-dictionary

## **Release 2.9 replaces 2.8 which was prematurely released!!!**

This is a custom [Hunspell](http://hunspell.github.io) dictionary for
spellchecking the Ember guides. It has the common technical terms used by the
Ember community and helps enforce consistency across the guides.

For example, `emberobserver` and `EmberObserver` will be flagged as invalid,
with a suggestion of `Ember Observer`.

In addition to spell checking, the markdown will be linted for repeated words,
contraction errors and conssitency issues. See the documentation for the plugins
used in the configuration file.

## Dictionary

The Ember dictionary is merged with the `en_US` Hunspell
[dictionary](http://wordlist.sourceforge.net). This simplifies configuration of
`retext-spell`. The english dictionary will occasionally need to be remerged
(~12-18 months) to keep it in sync. See en_US.lic for license.

Whenever the `en_US` dictionary is updated check for duplicate words using the
command `REV` command discussed in [CONTRIBUTING](contributing#finally).

## Installation

```bash
npm install ember-dictionary
```

or

```bash
yarn add ember-dictionary
```

## Dependencies

All packages under the [unified](https://unifiedjs.com) umbrella have been
converted to ESM imports. The package versions below are the last versions
before the conversion.

Using later versions will require setting the project to `modules` in
`package.json` or updating the configuration. It's recommended that the versions
are pinned to prevent breaking changes to the configuration.

Install the following devDependencies:

```bash
npm i -D remark-cli@8.0.0
npm i -D ember-dictionary
npm i -D remark-lint@7.0.0
npm i -D remark-preset-lint-consistent@3.0.0
npm i -D remark-preset-lint-recommended@4.0.0
npm i -D remark-retext@4.0.0
npm i -D retext-contractions@4.0.0
npm i -D retext-english@3.0.0
npm i -D retext-indefinite-article@2.0.3
npm i -D retext-repeated-words@3.0.0
npm i -D retext-spell@4.0.1
npm i -D retext-syntax-urls@2.0.0
npm i -D unified@9.2.2
```

Create a `.remarkrc.js` file in the project root and paste the configuration
below into the file. A copy of `.remarkrc.js` is included in the repo.

```js
// ./remark.js
/* eslint-env node */
const unified = require('unified');
const read = require('fs').readFileSync;
const ember = require('ember-dictionary');

exports.plugins = [
  [
    require('remark-retext'),
    unified().use({
      plugins: [
        [require('retext-contractions'), { straight: true }],
        require('retext-english'),
        require('retext-indefinite-article'),
        require('retext-repeated-words'),
        require('retext-syntax-urls'),
        [
          require('retext-spell'),
          {
            dictionary: ember,
            personal: read('./.local.dic')
          }
        ]
      ]
    })
  ],
  'remark-preset-lint-consistent',
  'remark-preset-lint-recommended',
  ['remark-lint-list-item-indent', 'space']
];
```

Addtional `remark` rules and settings can be added to the configuration. See the
readme for
[remarkjs/remark-lint: plugins to check (lint) markdown code style](https://github.com/remarkjs/remark-lint)
for a complete listing. Additonal settings should be added to the end of the
configuartion.

## Local dictionary

Project specific words not included in the main dictionary can be added to a
local dictionary. In the proejct root, create a file named `.local.dic`.
Additonal words are added to this file with each word on its own line.

Note: The `.local.dic` file MUST be present even if they are not project
specific words!

## Ignore files

Ignore files during linting by adding them a `.remarkignore` file to the
project's root. Generally, `README.md` and `CONTRIBUTING.md` would be excluded.
Older documentation versions can also be added to save time during CI.

## Finally

Add the following npm script to `package.json`. The `--frail` flag will generate
errors causing the linting to fail. For warnings only remove `--frail`.

```json
"lint:md": "remark . --frail"
```

## Contributing

If you would like to add new words to the dictionary, read the
[contributing](./contributing.md) guide.
