var rollup_indexes_data = require('./rollup_indexes_insert');
var ea_data = require('./ea_rollup_indexes_insert');
const heatModule = require('./heat_insert');


// const numberOfDocsToAdd = process.argv[2] ? process.argv[2] : 10;
// rollup_indexes_data.addMultipleDocuments(numberOfDocsToAdd);
heatModule.addMultipleDocuments();
