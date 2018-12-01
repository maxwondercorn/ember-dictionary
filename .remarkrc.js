// .remarkrc.js
const unified = require("unified");

// .remarkrc.js
exports.plugins = [
  [
    require("remark-retext"),
    unified().use({
      plugins: [
        require("retext-english"),
        [
          require("retext-spell"), 
            { 
              dictionary: require("dictionary-en-us"), 
    
            }
        ],
      ]
    })
  ]
];


