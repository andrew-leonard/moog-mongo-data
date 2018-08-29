const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const url = 'mongodb://localhost:27017/';

var dbObj;
var dbClient;

var connect = function() {
    return new Promise((res, rej) => {
        if (dbObj) {
            res();
        }
        MongoClient.connect(url, function(err, client) {
            if (err) {
                throw err;
                rej();
            }
            dbClient = client;
            dbObj = dbClient.db('moog');
            console.log('connected to mongodb');
            res();
        });
    });
};

module.exports = {
    /**
     * Insert a single document to mongo rollup_indexes collection;
     */
    addDocument: function() {
        connect().then(() => {
            dbObj.collection('rollup_indexes').remove({}).then(() => {
                const newObj = {
                    fully_qualified_moob: "moog:test:availableMoobels",
                    moobel: 'rollup_indexes',
                    source: 'abc',
                    key: '',
                    tags: null
                };

                dbObj.collection('rollup_indexes').insertOne(newObj, function(err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    dbClient.close();
                });
            });
        })
    },
    /**
     * Insert a number of documents to mongo rollup_indexes collection
     * @param {Integer} numberOfDocs - number of documents to insert
     */
    addMultipleDocuments: function(numberOfDocs) {
        // Do a multiple insert
        connect().then(() => {
            dbObj.collection('rollup_indexes').remove({}).then(() => {
                fs.readFile('./google-10000-english.txt', 'utf-8', (err, data) => {
                    if (err) throw err;
                    const words = data.split('\n');
                    const docs = [];
                    for (let i = 0; i < numberOfDocs; i += 1) {
                        docs.push({
                            fully_qualified_moob: 'moog:test:availableMoobels',
                            moobel: 'test',
                            source: words[i],
                            key: '',
                            tags: null,
                        });
                    }
                    dbObj.collection('rollup_indexes').insertMany(docs, (err, res) => {
                        if (err) throw err;
                        console.log(`${numberOfDocs} documents inserted`);
                        dbClient.close();
                    });
                })
            });
        })
    }
}
