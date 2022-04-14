// .remarkrc.mjs
/* eslint-env node */
import fs from 'fs';
import  { unified }  from 'unified';

import remarkPresetLintConsistent from 'remark-preset-lint-consistent';
import remarkPresetLintRecommended from 'remark-preset-lint-recommended';
import remarkLintLintItemIndent from 'remark-lint-list-item-indent';
import remarkRetext from 'remark-retext';

import retextContractions from 'retext-contractions';
import retextEnglish from 'retext-english';
import retextIndefiniteArticle from 'retext-indefinite-article';
import retextRepeatedWords from 'retext-repeated-words';
import retextSpell from 'retext-spell';
import retextSyntaxUrls from 'retext-syntax-urls';

import emberDict from 'ember-dictionary';

const remarkConfig = {
  plugins: [
    [
      remarkRetext,
      unified().use({
        plugins: [
          [retextContractions, { straight: true }],
          retextEnglish,
          retextIndefiniteArticle,
          retextRepeatedWords,
          retextSyntaxUrls,
          [
            retextSpell,
            {
              dictionary: emberDict,
              personal: fs.readFileSync('./.local.dic')
            }
          ]
        ]
      })
    ],
    remarkPresetLintConsistent,
    remarkPresetLintRecommended,
    [remarkLintLintItemIndent, 'space']
  ]
};

export default remarkConfig;
