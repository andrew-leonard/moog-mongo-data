// Module imports
const argv = require('minimist')(process.argv.slice(2));

const rollup_indexes_data = require('./rollup_indexes_insert');
const heatModule = require('./heat_insert');
const eventModule = require('./event_module');

if (!argv.rollup_indexes && !argv.heat_indexes && !argv.add_event) {
    console.error('Missing input parameters. Please read the README file to find out the parameters to pass to the module.');
    process.exit();
}

// Parse the arguments
if (argv.rollup_indexes) {
    const numberOfDocsToAdd = argv.rollup_indexes;
    if (numberOfDocsToAdd > 10000) {
        console.error('Number of documents requested to add exceeds limit of 10000.');
        process.exit();
    }
    if (numberOfDocsToAdd < 1) {
        console.error('Number of documents requested to add is below the minimum threshold of 1');
        process.exit();
    }
    rollup_indexes_data.addMultipleDocuments(numberOfDocsToAdd);
}

if (argv.heat_indexes) {
    const numberOfDocsToAdd = argv.heat_indexes;
    if (numberOfDocsToAdd > 10000) {
        console.error('Number of documents requested to add exceeds limit of 10000.');
        process.exit();
    }
    if (numberOfDocsToAdd < 1) {
        console.error('Number of documents requested to add is below the minimum threshold of 1');
        process.exit();
    }
    heatModule.addMultipleDocuments(numberOfDocsToAdd);
}

if (argv.add_event) {
    eventModule.addEvent();
}
