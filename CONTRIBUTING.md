# Contributing


## What to add

The dictionary (`index.dic`) should contain names, terms, variables, and/or properties that are common to the Ember ecosystem and community. Examples would include `addon`, `rootURL`, `LTS` and `codemod`.

Technical jargon and major packages such as `SemVar`, `QUnit`, and `minification` should also be included in the dictionary. Specifying proper nouns/names will keep spelling/capitalization consistent across the guides.

New words are added at the top of the `index.dic` file in alphanumerical order. Acronyms, all caps names and similar words are placed at top of the file. Other words are placed below these with capitalized words first, sentence cased next and lowercase or camelcase following.

If a word can start with either a lowercase and uppercase letter, you only need to add the lowercase version. The spellchecker assumes words can be either case. If a word (such as a name) can only start with a capital add that to the dictionary file.

Generally, addon names would not be included in the dictionary.  The exception would be any core package, such as `ember-cli-dependency-checker` should be included. Addons and packages under the Ember organization should also be added to the dictionary.

## What not to add

Items that would be specific to a single guide should be added to the local project dictionary (`.local.dic`). Non-core packages and addons used in examples, such as `ember-moment` would also be included in the local dictionary.

## Word exclusion

The local dictionary can also be used to force exclusion of words. If a word in the dictionary is prefixed with and `*`, such as `*ember`, the spellchecker will always flag it as a misspelt word.  This is good method for enforcing specific capitalization of common words

## Affix file

[Hunspell](http://hunspell.github.io) dictionaries have an affix file (`index.aff`) that contains rules to pluralize, prefix and suffix dictionary words. This allows you to add the root form of the word and Hunspell can determine if other variants are spelled correctly.

For example, you can validate `addon` and `addons` but using `addon/S`. For certain technical terms, you have to put all variations in the dictionary because they may not follow english spelling rules.  `codemod` and `codemods` is an example of this, so both need to be included in the dictionary.

The affix file can also be used to offer alternatives when a word is misspelled.  For example, `QUnit` is the correct form of the library name. To enforce the correct proper name, spellings such as `qunit` and `Qunit` could offer `QUnit` as a replacement. This enforces consistency in the guides.

The `REP` section of the affix file is where replacements are placed. For the `QUnit` example above, two entries would be needed.

```sh
REP qunit QUnit
REP Qunit QUnit
```

All Ember REPS should go at the top of the list in alphabetical order.  Note the REP count at the top of the list must be **`exactly`** the number of REPS.

See the Hunspell [man pages](https://www.systutorials.com/docs/linux/man/4-hunspell/) to learn more about the dictionary and affix file formats

## Finally

When making updates to `index.dic`:

* _All new custom words must be added to the file before the word "`0/nm`"._
* The first line of the file is the number of words in the file. It doesn't need to be exact but it should be close. Most ides have line numbers making it easy to count the words
* Find and remove any duplicate words using the command (macOS/Linux) ```rev index.dic | cut -f1 -d/ | rev | sort | uniq -d```

You can ignore the seemingly nonsense words at the beginning of the list. The `real` duplicates will be at the end of the list.  

Fork, add word(s) to the `index.dic` file and if needed, create a REP in `index.aff` file. Open an issue
if you're unsure how to add words or work with the affix file.
